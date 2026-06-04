import { NextRequest, NextResponse } from 'next/server';
import { ask } from '@/lib/ai';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const { summary, products, colors, materials, styles, categories, platforms, days_of_week, price_ranges, dead_stock, repeat_customers } = data;

    const top5 = (products || []).slice(0, 5).map((p: Record<string, unknown>, i: number) =>
      `  ${i + 1}. ${p.product_name} — ${p.total_units} units, $${Number(p.total_revenue).toFixed(2)} revenue, ${p.margin_pct}% margin, ${p.velocity} units/month velocity`
    ).join('\n');

    const topColors = (colors || []).slice(0, 6).map((c: Record<string, unknown>) =>
      `  ${c.color}: ${c.units} units, $${Number(c.revenue).toFixed(2)}`
    ).join('\n');

    const topMaterials = (materials || []).slice(0, 6).map((m: Record<string, unknown>) =>
      `  ${m.material}: ${m.units} units, $${Number(m.revenue).toFixed(2)}`
    ).join('\n');

    const topStyles = (styles || []).slice(0, 5).map((s: Record<string, unknown>) =>
      `  ${s.style}: ${s.units} units`
    ).join('\n');

    const platformSummary = (platforms || []).map((p: Record<string, unknown>) =>
      `  ${p.platform}: ${p.units} units, $${Number(p.revenue).toFixed(2)}, ${p.sales} transactions`
    ).join('\n');

    const dowSummary = Object.entries(days_of_week || {})
      .sort((a: [string, unknown], b: [string, unknown]) => (b[1] as Record<string, number>).revenue - (a[1] as Record<string, number>).revenue)
      .map(([day, v]) => `  ${day}: $${Number((v as Record<string, number>).revenue).toFixed(2)}, ${(v as Record<string, number>).sales} sales`)
      .join('\n');

    const priceRangeSummary = (price_ranges || []).map((r: Record<string, unknown>) =>
      `  ${r.range}: ${r.units} units, $${Number(r.revenue).toFixed(2)}`
    ).join('\n');

    const deadStockList = (dead_stock || []).slice(0, 5).map((p: Record<string, unknown>) =>
      `  ${p.name} (${p.inventory_count} in stock, 0 sold)`
    ).join('\n');

    const prompt = `You are a senior retail analyst and business strategist for Raven's Baubles & Gifts, a handmade jewelry and gifts shop that sells on Etsy, at the South Lyon Saturday Farmers Market, and Facebook Marketplace.

Here is the complete business intelligence data for this period:

**OVERALL PERFORMANCE**
- Total Revenue: $${Number(summary?.total_revenue || 0).toFixed(2)}
- Total Units Sold: ${summary?.total_units || 0}
- Total Transactions: ${summary?.total_sales || 0}
- Average Order Value: $${Number(summary?.avg_order_value || 0).toFixed(2)}
- Best Selling Day: ${summary?.best_selling_day || 'Unknown'}

**TOP PRODUCTS BY REVENUE**
${top5 || '  No product data yet'}

**COLOR PERFORMANCE** (which colors sell best)
${topColors || '  No color data yet — add colors to products to track this'}

**MATERIAL PERFORMANCE**
${topMaterials || '  No material data yet — add materials to products to track this'}

**DESIGN STYLE PERFORMANCE**
${topStyles || '  No style data yet'}

**PLATFORM BREAKDOWN**
${platformSummary || '  No platform data'}

**SALES BY DAY OF WEEK**
${dowSummary || '  No day data'}

**PRICE RANGE PERFORMANCE** (what price points move the most)
${priceRangeSummary || '  No price data'}

**DEAD STOCK** (in inventory but not selling)
${deadStockList || '  None — great!'}

**REPEAT CUSTOMERS**: ${(repeat_customers || []).length} repeat buyers identified

---

Based on this real business data, provide a detailed business intelligence report with EXACTLY these sections:

## 🏆 What's Working (Keep Doing This)
List 3-5 specific findings with exact numbers. Which products, colors, materials, or price points are performing best and why.

## 📈 Biggest Opportunities Right Now
List 3-4 specific actionable opportunities based on the data — e.g., "Your [color] pieces sell at 3x the rate of [color], make more of them" or "Your Saturday market brings [X]% of revenue but only [Y]% of transactions — raise your booth prices."

## ⚠️ Fix These First
List 2-3 specific problems — underperforming items, dead stock recommendations, pricing issues, or platform gaps. Be direct.

## 🎯 What to Make More Of (Production Recommendations)
Based on velocity and margins, tell her specifically which product types/colors/styles to prioritize in her next production run.

## 💡 Hidden Insight
One non-obvious finding from the data that she probably hasn't noticed.

Be specific with numbers. Reference actual product names, colors, and dollar amounts from the data. Do NOT give generic advice — every point must reference her specific data.`;

    const report = await ask(prompt);
    return NextResponse.json({ report });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
