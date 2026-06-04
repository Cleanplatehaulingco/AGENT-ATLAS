import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import type { CareLogEntry } from '@/lib/db';

export async function GET() {
  // Return check-in history for last 30 days
  const days: { date: string; checked_in: boolean; time: string | null; method: string | null }[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    const entry = db.prepare(
      "SELECT * FROM care_log WHERE recipient_id = 1 AND type = 'checkin' AND date(logged_at) = ? AND title NOT LIKE '%reminder sent%' ORDER BY logged_at DESC LIMIT 1"
    ).get(dateStr) as CareLogEntry | undefined;
    if (entry) {
      const t = new Date(entry.logged_at);
      days.push({ date: dateStr, checked_in: true, time: t.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }), method: entry.notes?.includes('SMS') ? 'sms' : entry.notes?.includes('voice') ? 'voice' : 'app' });
    } else {
      days.push({ date: dateStr, checked_in: false, time: null, method: null });
    }
  }
  return NextResponse.json(days);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { member_name, method, notes } = body;
  const result = db.prepare(
    "INSERT INTO care_log (recipient_id, member_name, type, title, notes, logged_at) VALUES (1, ?, 'checkin', 'Daily check-in completed', ?, ?)"
  ).run(member_name ?? 'App', notes ?? `Manual check-in via ${method ?? 'app'}`, new Date().toISOString());
  const entry = db.prepare('SELECT * FROM care_log WHERE id = ?').get(result.lastInsertRowid);
  return NextResponse.json(entry, { status: 201 });
}
