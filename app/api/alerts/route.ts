import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import type { Alert } from '@/lib/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const all = searchParams.get('all') === 'true';
  const alerts = all
    ? db.prepare('SELECT * FROM alerts WHERE recipient_id = 1 ORDER BY created_at DESC LIMIT 50').all()
    : db.prepare('SELECT * FROM alerts WHERE recipient_id = 1 AND resolved = 0 ORDER BY created_at DESC').all();
  return NextResponse.json(alerts);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { type, description, severity } = body;
  if (!type || !description) return NextResponse.json({ error: 'type and description are required' }, { status: 400 });
  const result = db.prepare(
    'INSERT INTO alerts (recipient_id, type, description, severity) VALUES (1, ?, ?, ?)'
  ).run(type, description, severity ?? 'medium');
  const alert = db.prepare('SELECT * FROM alerts WHERE id = ?').get(result.lastInsertRowid) as Alert;
  return NextResponse.json(alert, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  const body = await req.json();
  if (body.resolved) {
    db.prepare('UPDATE alerts SET resolved = 1, resolved_at = ? WHERE id = ?').run(new Date().toISOString(), id);
  }
  const updated = db.prepare('SELECT * FROM alerts WHERE id = ?').get(id);
  return NextResponse.json(updated);
}
