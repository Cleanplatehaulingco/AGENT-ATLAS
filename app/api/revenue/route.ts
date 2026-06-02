import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const db = getDb();
    const { searchParams } = new URL(req.url);
    const year = searchParams.get('year') || new Date().getFullYear().toString();
    const type = searchParams.get('type') || 'monthly';

    if (type === 'summary') {
      const today = new Date().toISOString().split('T')[0];
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      const monthStart = `${today.slice(0, 7)}-01`;
      const yearStart = `${today.slice(0, 4)}-01-01`;

      const todayTotal = (db.prepare('SELECT COALESCE(SUM(total),0) as v FROM sales WHERE date = ?').get(today) as { v: number }).v;
      const weekTotal = (db.prepare('SELECT COALESCE(SUM(total),0) as v FROM sales WHERE date >= ?').get(weekStart.toISOString().split('T')[0]) as { v: number }).v;
      const monthTotal = (db.prepare('SELECT COALESCE(SUM(total),0) as v FROM sales WHERE date >= ?').get(monthStart) as { v: number }).v;
      const yearTotal = (db.prepare('SELECT COALESCE(SUM(total),0) as v FROM sales WHERE date >= ?').get(yearStart) as { v: number }).v;

      const platformBreakdown = db.prepare(`
        SELECT platform, SUM(total) as total, COUNT(*) as count
        FROM sales WHERE date >= ?
        GROUP BY platform
      `).all(yearStart);

      const topProducts = db.prepare(`
        SELECT items FROM sales WHERE date >= ? ORDER BY date DESC LIMIT 100
      `).all(yearStart) as { items: string }[];

      // Count product occurrences from JSON items
      const productCounts: Record<string, number> = {};
      for (const sale of topProducts) {
        try {
          const items = JSON.parse(sale.items);
          for (const item of items) {
            if (item.name) {
              productCounts[item.name] = (productCounts[item.name] || 0) + (item.quantity || 1);
            }
          }
        } catch { /* skip */ }
      }
      const topProductsList = Object.entries(productCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, count]) => ({ name, count }));

      return NextResponse.json({ todayTotal, weekTotal, monthTotal, yearTotal, platformBreakdown, topProducts: topProductsList });
    }

    if (type === 'monthly') {
      const rows = db.prepare(`
        SELECT strftime('%m', date) as month, platform, SUM(total) as total, COUNT(*) as count
        FROM sales
        WHERE strftime('%Y', date) = ?
        GROUP BY month, platform
        ORDER BY month
      `).all(year);

      const expenses = db.prepare(`
        SELECT strftime('%m', date) as month, SUM(amount) as total
        FROM expenses
        WHERE strftime('%Y', date) = ?
        GROUP BY month
      `).all(year) as { month: string; total: number }[];

      return NextResponse.json({ rows, expenses });
    }

    if (type === 'expenses') {
      const expenses = db.prepare(`
        SELECT * FROM expenses
        WHERE strftime('%Y', date) = ?
        ORDER BY date DESC
      `).all(year);
      return NextResponse.json(expenses);
    }

    if (type === 'addExpense') {
      return NextResponse.json({ error: 'Use POST for adding expenses' }, { status: 400 });
    }

    return NextResponse.json({ error: 'Unknown type' }, { status: 400 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const db = getDb();
    const body = await req.json();
    const { date, category, description, amount } = body;
    if (!date || !category || !amount) {
      return NextResponse.json({ error: 'date, category, amount required' }, { status: 400 });
    }
    const result = db.prepare('INSERT INTO expenses (date, category, description, amount) VALUES (?, ?, ?, ?)')
      .run(date, category, description || null, amount);
    const expense = db.prepare('SELECT * FROM expenses WHERE id = ?').get(result.lastInsertRowid);
    return NextResponse.json(expense, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const db = getDb();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    db.prepare('DELETE FROM expenses WHERE id = ?').run(id);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
