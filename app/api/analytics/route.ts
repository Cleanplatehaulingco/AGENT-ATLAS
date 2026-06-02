import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import type { Sale, Product, SaleItem } from '@/lib/db';

// ── helpers ────────────────────────────────────────────────────────────────────

function parseItems(raw: string): SaleItem[] {
  try { return JSON.parse(raw) || []; } catch { return []; }
}

function dow(dateStr: string): string {
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  return days[new Date(dateStr + 'T12:00:00').getDay()];
}

function monthKey(dateStr: string): string {
  return dateStr.slice(0, 7); // "2025-03"
}

// Normalize a product name from a sale item to match product catalog
function normalizeName(name: string): string {
  return name.toLowerCase().trim();
}

// ── Main analytics engine ──────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  try {
    const db = getDb();
    const { searchParams } = new URL(req.url);
    const year = searchParams.get('year') || new Date().getFullYear().toString();

    const sales = db.prepare(
      `SELECT * FROM sales WHERE date >= ? AND date <= ? ORDER BY date ASC`
    ).all(`${year}-01-01`, `${year}-12-31`) as Sale[];

    const products = db.prepare(`SELECT * FROM products WHERE is_active = 1`).all() as Product[];

    // Build a lookup: normalized name → product
    const productByName = new Map<string, Product>();
    const productById = new Map<number, Product>();
    for (const p of products) {
      productByName.set(normalizeName(p.name), p);
      productById.set(p.id, p);
    }

    // ── Per-product aggregation ──────────────────────────────────────────────
    type ProdAgg = {
      product_id: number | null;
      product_name: string;
      category: string | null;
      color: string | null;
      materials: string | null;
      design_style: string | null;
      cost_to_make: number;
      time_to_make_minutes: number;
      current_price: number;
      total_units: number;
      total_revenue: number;
      sale_count: number;
      platforms: Record<string, number>;
      monthly: Record<string, number>;
      last_sold: string | null;
    };

    const productAgg = new Map<string, ProdAgg>();

    // ── Color / material / style aggregations ────────────────────────────────
    const colorAgg: Record<string, { units: number; revenue: number }> = {};
    const materialAgg: Record<string, { units: number; revenue: number }> = {};
    const styleAgg: Record<string, { units: number; revenue: number }> = {};
    const categoryAgg: Record<string, { units: number; revenue: number }> = {};
    const platformAgg: Record<string, { units: number; revenue: number; sales: number }> = {};
    const dowAgg: Record<string, { units: number; revenue: number; sales: number }> = {};
    const monthAgg: Record<string, { revenue: number; sales: number }> = {};
    const hourlyAgg: Record<number, { revenue: number; sales: number }> = {};
    const priceRangeAgg: Record<string, { units: number; revenue: number }> = {
      'Under $10': { units: 0, revenue: 0 },
      '$10–$25': { units: 0, revenue: 0 },
      '$25–$50': { units: 0, revenue: 0 },
      '$50–$100': { units: 0, revenue: 0 },
      'Over $100': { units: 0, revenue: 0 },
    };

    // Customer repeat analysis
    const customerPurchases: Record<string, { count: number; revenue: number; items: string[] }> = {};

    for (const sale of sales) {
      const items = parseItems(sale.items);
      const saleMonth = monthKey(sale.date);
      const saleDow = dow(sale.date);
      const plat = sale.platform || 'other';

      // Platform aggregation
      if (!platformAgg[plat]) platformAgg[plat] = { units: 0, revenue: 0, sales: 0 };
      platformAgg[plat].sales += 1;

      // Day of week
      if (!dowAgg[saleDow]) dowAgg[saleDow] = { units: 0, revenue: 0, sales: 0 };
      dowAgg[saleDow].sales += 1;
      dowAgg[saleDow].revenue += sale.total || 0;

      // Month
      if (!monthAgg[saleMonth]) monthAgg[saleMonth] = { revenue: 0, sales: 0 };
      monthAgg[saleMonth].revenue += sale.total || 0;
      monthAgg[saleMonth].sales += 1;

      // Customer
      const custKey = sale.client_name || `unknown_${sale.id}`;
      if (sale.client_name) {
        if (!customerPurchases[custKey]) customerPurchases[custKey] = { count: 0, revenue: 0, items: [] };
        customerPurchases[custKey].count += 1;
        customerPurchases[custKey].revenue += sale.total || 0;
      }

      for (const item of items) {
        const key = normalizeName(item.name);
        const matched = productByName.get(key) || (item.product_id ? productById.get(item.product_id) : undefined);
        const qty = item.quantity || 1;
        const rev = item.price * qty;

        // Product aggregation
        if (!productAgg.has(key)) {
          productAgg.set(key, {
            product_id: matched?.id ?? null,
            product_name: matched?.name ?? item.name,
            category: matched?.category ?? null,
            color: matched?.color ?? null,
            materials: matched?.materials ?? null,
            design_style: matched?.design_style ?? null,
            cost_to_make: matched?.cost_to_make ?? 0,
            time_to_make_minutes: matched?.time_to_make_minutes ?? 0,
            current_price: matched?.current_price ?? item.price,
            total_units: 0,
            total_revenue: 0,
            sale_count: 0,
            platforms: {},
            monthly: {},
            last_sold: null,
          });
        }
        const agg = productAgg.get(key)!;
        agg.total_units += qty;
        agg.total_revenue += rev;
        agg.sale_count += 1;
        agg.platforms[plat] = (agg.platforms[plat] || 0) + qty;
        agg.monthly[saleMonth] = (agg.monthly[saleMonth] || 0) + qty;
        if (!agg.last_sold || sale.date > agg.last_sold) agg.last_sold = sale.date;

        // Color breakdown
        if (matched?.color) {
          const c = matched.color.toLowerCase();
          if (!colorAgg[c]) colorAgg[c] = { units: 0, revenue: 0 };
          colorAgg[c].units += qty;
          colorAgg[c].revenue += rev;
        }

        // Material breakdown
        if (matched?.materials) {
          for (const mat of matched.materials.split(',').map(m => m.trim().toLowerCase()).filter(Boolean)) {
            if (!materialAgg[mat]) materialAgg[mat] = { units: 0, revenue: 0 };
            materialAgg[mat].units += qty;
            materialAgg[mat].revenue += rev;
          }
        }

        // Style breakdown
        if (matched?.design_style) {
          const s = matched.design_style.toLowerCase();
          if (!styleAgg[s]) styleAgg[s] = { units: 0, revenue: 0 };
          styleAgg[s].units += qty;
          styleAgg[s].revenue += rev;
        }

        // Category
        if (matched?.category) {
          const cat = matched.category;
          if (!categoryAgg[cat]) categoryAgg[cat] = { units: 0, revenue: 0 };
          categoryAgg[cat].units += qty;
          categoryAgg[cat].revenue += rev;
        }

        // Platform item-level
        platformAgg[plat].units += qty;
        platformAgg[plat].revenue += rev;

        // DOW item-level
        dowAgg[saleDow].units += qty;

        // Price range
        const unitPrice = item.price;
        if (unitPrice < 10) priceRangeAgg['Under $10'].units += qty, priceRangeAgg['Under $10'].revenue += rev;
        else if (unitPrice < 25) priceRangeAgg['$10–$25'].units += qty, priceRangeAgg['$10–$25'].revenue += rev;
        else if (unitPrice < 50) priceRangeAgg['$25–$50'].units += qty, priceRangeAgg['$25–$50'].revenue += rev;
        else if (unitPrice < 100) priceRangeAgg['$50–$100'].units += qty, priceRangeAgg['$50–$100'].revenue += rev;
        else priceRangeAgg['Over $100'].units += qty, priceRangeAgg['Over $100'].revenue += rev;

        // Customer item tracking
        if (sale.client_name) {
          customerPurchases[sale.client_name].items.push(item.name);
        }
      }
    }

    // ── Build sorted product leaderboard ──────────────────────────────────────
    const productList = Array.from(productAgg.values())
      .map(p => ({
        ...p,
        profit_per_unit: p.current_price - p.cost_to_make,
        total_profit: (p.current_price - p.cost_to_make) * p.total_units,
        revenue_per_hour: p.time_to_make_minutes > 0
          ? ((p.current_price - p.cost_to_make) / (p.time_to_make_minutes / 60))
          : null,
        margin_pct: p.current_price > 0
          ? Math.round(((p.current_price - p.cost_to_make) / p.current_price) * 100)
          : 0,
        velocity: p.last_sold
          ? (() => {
              const daysSince = Math.max(1, Math.floor((Date.now() - new Date(p.last_sold).getTime()) / 86400000));
              return Math.round((p.total_units / daysSince) * 30 * 10) / 10; // units/month
            })()
          : 0,
      }))
      .sort((a, b) => b.total_revenue - a.total_revenue);

    // Dead stock: in catalog, zero sales this year
    const soldNames = new Set(productAgg.keys());
    const deadStock = products.filter(p => !soldNames.has(normalizeName(p.name)) && p.inventory_count > 0);

    // Low inventory alerts
    const lowInventory = products.filter(p => p.inventory_count > 0 && p.inventory_count <= 3);

    // Repeat customers
    const repeatCustomers = Object.entries(customerPurchases)
      .filter(([, v]) => v.count > 1)
      .sort((a, b) => b[1].revenue - a[1].revenue)
      .slice(0, 10)
      .map(([name, v]) => ({ name, ...v }));

    // Best selling day
    const bestDow = Object.entries(dowAgg).sort((a, b) => b[1].revenue - a[1].revenue)[0]?.[0] ?? null;

    // Totals
    const totalRevenue = sales.reduce((s, sale) => s + (sale.total || 0), 0);
    const totalUnits = productList.reduce((s, p) => s + p.total_units, 0);

    return NextResponse.json({
      year,
      summary: {
        total_revenue: totalRevenue,
        total_units: totalUnits,
        total_sales: sales.length,
        avg_order_value: sales.length ? totalRevenue / sales.length : 0,
        best_selling_day: bestDow,
      },
      products: productList,
      colors: Object.entries(colorAgg)
        .map(([color, v]) => ({ color, ...v }))
        .sort((a, b) => b.units - a.units),
      materials: Object.entries(materialAgg)
        .map(([material, v]) => ({ material, ...v }))
        .sort((a, b) => b.units - a.units),
      styles: Object.entries(styleAgg)
        .map(([style, v]) => ({ style, ...v }))
        .sort((a, b) => b.units - a.units),
      categories: Object.entries(categoryAgg)
        .map(([category, v]) => ({ category, ...v }))
        .sort((a, b) => b.revenue - a.revenue),
      platforms: Object.entries(platformAgg)
        .map(([platform, v]) => ({ platform, ...v }))
        .sort((a, b) => b.revenue - a.revenue),
      days_of_week: dowAgg,
      monthly: monthAgg,
      price_ranges: Object.entries(priceRangeAgg)
        .map(([range, v]) => ({ range, ...v })),
      dead_stock: deadStock.map(p => ({ id: p.id, name: p.name, category: p.category, inventory_count: p.inventory_count })),
      low_inventory: lowInventory.map(p => ({ id: p.id, name: p.name, inventory_count: p.inventory_count })),
      repeat_customers: repeatCustomers,
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
