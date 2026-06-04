import { NextRequest, NextResponse } from 'next/server';
import db, { getRecipient } from '@/lib/db';

export async function GET() {
  const recipient = getRecipient(1);
  if (!recipient) return NextResponse.json({ error: 'not found' }, { status: 404 });
  return NextResponse.json(recipient);
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { name, dob, conditions, phone, emergency_contact, emergency_phone, doctor_name, doctor_phone, pharmacy, notes, checkin_time, checkin_method } = body;
  db.prepare(`UPDATE recipients SET
    name = COALESCE(?, name), dob = COALESCE(?, dob), conditions = COALESCE(?, conditions),
    phone = COALESCE(?, phone), emergency_contact = COALESCE(?, emergency_contact),
    emergency_phone = COALESCE(?, emergency_phone), doctor_name = COALESCE(?, doctor_name),
    doctor_phone = COALESCE(?, doctor_phone), pharmacy = COALESCE(?, pharmacy),
    notes = COALESCE(?, notes), checkin_time = COALESCE(?, checkin_time),
    checkin_method = COALESCE(?, checkin_method)
    WHERE id = 1`).run(name ?? null, dob ?? null, conditions ? JSON.stringify(conditions) : null, phone ?? null, emergency_contact ?? null, emergency_phone ?? null, doctor_name ?? null, doctor_phone ?? null, pharmacy ?? null, notes ?? null, checkin_time ?? null, checkin_method ?? null);
  return NextResponse.json(getRecipient(1));
}
