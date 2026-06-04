import { NextRequest, NextResponse } from 'next/server';
import db, { getMembers } from '@/lib/db';

export async function GET() {
  return NextResponse.json(getMembers(1));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, relationship, phone, email, role } = body;
  if (!name) return NextResponse.json({ error: 'name is required' }, { status: 400 });
  const result = db.prepare('INSERT INTO members (recipient_id, name, relationship, phone, email, role) VALUES (1, ?, ?, ?, ?, ?)').run(name, relationship ?? null, phone ?? null, email ?? null, role ?? 'backup');
  const member = db.prepare('SELECT * FROM members WHERE id = ?').get(result.lastInsertRowid);
  return NextResponse.json(member, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  db.prepare('DELETE FROM members WHERE id = ?').run(id);
  return NextResponse.json({ ok: true });
}
