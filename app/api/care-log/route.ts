import { NextRequest, NextResponse } from 'next/server';
import db, { getCareLog } from '@/lib/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get('limit') ?? '50');
  const recipientId = parseInt(searchParams.get('recipient_id') ?? '1');
  const entries = getCareLog(limit, recipientId);
  return NextResponse.json(entries);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { member_name, type, title, notes, mood, data, logged_at } = body;
  if (!type || !title) return NextResponse.json({ error: 'type and title are required' }, { status: 400 });
  const stmt = db.prepare('INSERT INTO care_log (recipient_id, member_name, type, title, notes, mood, data, logged_at) VALUES (1, ?, ?, ?, ?, ?, ?, ?)');
  const result = stmt.run(member_name ?? null, type, title, notes ?? null, mood ?? null, data ? JSON.stringify(data) : null, logged_at ?? new Date().toISOString());
  const entry = db.prepare('SELECT * FROM care_log WHERE id = ?').get(result.lastInsertRowid);
  return NextResponse.json(entry, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  db.prepare('DELETE FROM care_log WHERE id = ?').run(id);
  return NextResponse.json({ ok: true });
}
