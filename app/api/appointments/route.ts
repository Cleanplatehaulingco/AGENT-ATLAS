import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const upcoming = searchParams.get('upcoming') === 'true';
  const recipientId = parseInt(searchParams.get('recipient_id') ?? '1');
  const appts = upcoming
    ? db.prepare("SELECT * FROM appointments WHERE recipient_id = ? AND date >= date('now') AND completed = 0 ORDER BY date, time").all(recipientId)
    : db.prepare('SELECT * FROM appointments WHERE recipient_id = ? ORDER BY date DESC, time').all(recipientId);
  return NextResponse.json(appts);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, provider, location, date, time, type, notes } = body;
  if (!title || !date) return NextResponse.json({ error: 'title and date are required' }, { status: 400 });
  const result = db.prepare('INSERT INTO appointments (recipient_id, title, provider, location, date, time, type, notes) VALUES (1, ?, ?, ?, ?, ?, ?, ?)').run(title, provider ?? null, location ?? null, date, time ?? null, type ?? 'doctor', notes ?? null);
  const appt = db.prepare('SELECT * FROM appointments WHERE id = ?').get(result.lastInsertRowid);
  return NextResponse.json(appt, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  const body = await req.json();
  if ('completed' in body) db.prepare('UPDATE appointments SET completed = ? WHERE id = ?').run(body.completed ? 1 : 0, id);
  const updated = db.prepare('SELECT * FROM appointments WHERE id = ?').get(id);
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  db.prepare('DELETE FROM appointments WHERE id = ?').run(id);
  return NextResponse.json({ ok: true });
}
