import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const recipientId = parseInt(searchParams.get('recipient_id') ?? '1');
  const meds = db.prepare('SELECT * FROM medications WHERE recipient_id = ? ORDER BY is_active DESC, name').all(recipientId);
  return NextResponse.json(meds);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, dosage, frequency, times, instructions, prescriber, refill_date } = body;
  if (!name) return NextResponse.json({ error: 'name is required' }, { status: 400 });
  const result = db.prepare('INSERT INTO medications (recipient_id, name, dosage, frequency, times, instructions, prescriber, refill_date) VALUES (1, ?, ?, ?, ?, ?, ?, ?)').run(name, dosage ?? null, frequency ?? null, times ? JSON.stringify(times) : '[]', instructions ?? null, prescriber ?? null, refill_date ?? null);
  const med = db.prepare('SELECT * FROM medications WHERE id = ?').get(result.lastInsertRowid);
  return NextResponse.json(med, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  const body = await req.json();
  const current = db.prepare('SELECT * FROM medications WHERE id = ?').get(id) as Record<string, unknown>;
  if (!current) return NextResponse.json({ error: 'not found' }, { status: 404 });
  if ('is_active' in body) {
    db.prepare('UPDATE medications SET is_active = ? WHERE id = ?').run(body.is_active ? 1 : 0, id);
  } else {
    const { name, dosage, frequency, times, instructions, prescriber, refill_date } = body;
    db.prepare('UPDATE medications SET name=?, dosage=?, frequency=?, times=?, instructions=?, prescriber=?, refill_date=? WHERE id=?').run(name ?? current.name, dosage ?? current.dosage, frequency ?? current.frequency, times ? JSON.stringify(times) : (current.times as string), instructions ?? current.instructions, prescriber ?? current.prescriber, refill_date ?? current.refill_date, id);
  }
  const updated = db.prepare('SELECT * FROM medications WHERE id = ?').get(id);
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  db.prepare('DELETE FROM medications WHERE id = ?').run(id);
  return NextResponse.json({ ok: true });
}
