import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const db = getDb();
    const { searchParams } = new URL(req.url);
    const tag = searchParams.get('tag');
    const search = searchParams.get('search');

    let query = 'SELECT * FROM clients';
    const conditions: string[] = [];
    const params: string[] = [];

    if (tag) {
      conditions.push(`tags LIKE ?`);
      params.push(`%"${tag}"%`);
    }
    if (search) {
      conditions.push(`(name LIKE ? OR email LIKE ? OR phone LIKE ?)`);
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }
    if (conditions.length) query += ' WHERE ' + conditions.join(' AND ');
    query += ' ORDER BY name ASC';

    const clients = db.prepare(query).all(...params);
    return NextResponse.json(clients);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const db = getDb();
    const body = await req.json();
    const { name, email, phone, address, notes, tags, follow_up_date, follow_up_note } = body;
    if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });

    const result = db.prepare(`
      INSERT INTO clients (name, email, phone, address, notes, tags, follow_up_date, follow_up_note)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(name, email || null, phone || null, address || null, notes || null,
      JSON.stringify(tags || []), follow_up_date || null, follow_up_note || null);

    const client = db.prepare('SELECT * FROM clients WHERE id = ?').get(result.lastInsertRowid);
    return NextResponse.json(client, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const db = getDb();
    const body = await req.json();
    const { id, name, email, phone, address, notes, tags, follow_up_date, follow_up_note, last_contacted } = body;
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    db.prepare(`
      UPDATE clients SET name=?, email=?, phone=?, address=?, notes=?, tags=?,
        follow_up_date=?, follow_up_note=?, last_contacted=?, updated_at=datetime('now')
      WHERE id=?
    `).run(name, email || null, phone || null, address || null, notes || null,
      JSON.stringify(tags || []), follow_up_date || null, follow_up_note || null,
      last_contacted || null, id);

    const client = db.prepare('SELECT * FROM clients WHERE id = ?').get(id);
    return NextResponse.json(client);
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
    db.prepare('DELETE FROM clients WHERE id = ?').run(id);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
