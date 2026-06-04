import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const db = getDb();
    const { searchParams } = new URL(req.url);
    const platform = searchParams.get('platform');
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const limit = searchParams.get('limit');

    let query = `
      SELECT s.*, c.name as client_display_name
      FROM sales s
      LEFT JOIN clients c ON s.client_id = c.id
    `;
    const conditions: string[] = [];
    const params: (string | number)[] = [];

    if (platform) { conditions.push('s.platform = ?'); params.push(platform); }
    if (from) { conditions.push('s.date >= ?'); params.push(from); }
    if (to) { conditions.push('s.date <= ?'); params.push(to); }
    if (conditions.length) query += ' WHERE ' + conditions.join(' AND ');
    query += ' ORDER BY s.date DESC, s.created_at DESC';
    if (limit) { query += ' LIMIT ?'; params.push(parseInt(limit)); }

    const sales = db.prepare(query).all(...params);
    return NextResponse.json(sales);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const db = getDb();
    const body = await req.json();
    const { date, client_id, client_name, items, subtotal, total, payment_method, platform, notes } = body;

    if (!date) return NextResponse.json({ error: 'Date is required' }, { status: 400 });

    const result = db.prepare(`
      INSERT INTO sales (date, client_id, client_name, items, subtotal, total, payment_method, platform, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      date,
      client_id || null,
      client_name || null,
      JSON.stringify(items || []),
      subtotal || 0,
      total || 0,
      payment_method || null,
      platform || 'other',
      notes || null
    );

    // Update client last_contacted if linked
    if (client_id) {
      db.prepare(`UPDATE clients SET last_contacted = ?, updated_at = datetime('now') WHERE id = ?`)
        .run(date, client_id);
    }

    const sale = db.prepare('SELECT * FROM sales WHERE id = ?').get(result.lastInsertRowid);
    return NextResponse.json(sale, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const db = getDb();
    const body = await req.json();
    const { id, date, client_id, client_name, items, subtotal, total, payment_method, platform, notes } = body;
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    db.prepare(`
      UPDATE sales SET date=?, client_id=?, client_name=?, items=?, subtotal=?, total=?,
        payment_method=?, platform=?, notes=?, updated_at=datetime('now')
      WHERE id=?
    `).run(date, client_id || null, client_name || null, JSON.stringify(items || []),
      subtotal || 0, total || 0, payment_method || null, platform || 'other', notes || null, id);

    const sale = db.prepare('SELECT * FROM sales WHERE id = ?').get(id);
    return NextResponse.json(sale);
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
    db.prepare('DELETE FROM sales WHERE id = ?').run(id);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
