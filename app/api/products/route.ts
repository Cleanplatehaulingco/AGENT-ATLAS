import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  try {
    const db = getDb();
    const products = db.prepare('SELECT * FROM products ORDER BY name ASC').all();
    return NextResponse.json(products);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const db = getDb();
    const body = await req.json();
    const { name, category, cost_to_make, current_price, inventory_count, platforms, description } = body;
    if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });

    const result = db.prepare(`
      INSERT INTO products (name, category, cost_to_make, current_price, inventory_count, platforms, description)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      name,
      category || null,
      cost_to_make || 0,
      current_price || 0,
      inventory_count || 0,
      JSON.stringify(platforms || []),
      description || null
    );

    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(result.lastInsertRowid);
    return NextResponse.json(product, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const db = getDb();
    const body = await req.json();
    const { id, name, category, cost_to_make, current_price, inventory_count, platforms, description } = body;
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    db.prepare(`
      UPDATE products SET name=?, category=?, cost_to_make=?, current_price=?,
        inventory_count=?, platforms=?, description=?, updated_at=datetime('now')
      WHERE id=?
    `).run(name, category || null, cost_to_make || 0, current_price || 0,
      inventory_count || 0, JSON.stringify(platforms || []), description || null, id);

    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
    return NextResponse.json(product);
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
    db.prepare('DELETE FROM products WHERE id = ?').run(id);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
