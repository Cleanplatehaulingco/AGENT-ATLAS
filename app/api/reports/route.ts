import { NextResponse } from 'next/server';
import { generateWeeklySummary } from '@/lib/scheduler';
import db from '@/lib/db';
import type { Appointment } from '@/lib/db';

export async function GET() {
  const summary = generateWeeklySummary(1);

  // Get upcoming appointments next week
  const today = new Date().toISOString().slice(0, 10);
  const nextWeek = new Date(); nextWeek.setDate(nextWeek.getDate() + 7);
  const upcomingAppts = db.prepare(
    'SELECT * FROM appointments WHERE recipient_id = 1 AND date >= ? AND date <= ? AND completed = 0 ORDER BY date, time'
  ).all(today, nextWeek.toISOString().slice(0, 10)) as Appointment[];

  const report = {
    generated_at: new Date().toISOString(),
    period: 'last_7_days',
    check_ins: {
      completed: summary.checkInsCompleted,
      total: summary.checkInsTotal,
      rate_percent: summary.checkInRate,
    },
    medications: {
      doses_given: summary.medicationDosesGiven,
      doses_expected: summary.medicationDosesExpected,
      adherence_percent: summary.medicationAdherenceRate,
    },
    care_log: {
      total_entries: summary.careLogEntryCount,
      by_type: summary.entryCountByType,
    },
    upcoming_appointments: upcomingAppts.map(a => ({
      title: a.title,
      provider: a.provider,
      date: a.date,
      time: a.time,
      type: a.type,
    })),
  };

  return NextResponse.json(report);
}
