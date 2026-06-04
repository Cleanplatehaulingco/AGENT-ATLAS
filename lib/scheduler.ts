// CarePing Scheduler — logic for check-ins, medication reminders, and summaries
import db from '@/lib/db';
import type { CareLogEntry, Medication } from '@/lib/db';

export function scheduleCheckIn(recipientId: number, time: string): void {
  db.prepare('INSERT INTO care_log (recipient_id, member_name, type, title, notes, logged_at) VALUES (?, ?, ?, ?, ?, ?)'
  ).run(recipientId, 'CarePing System', 'checkin', 'Check-in reminder sent', `Scheduled at ${time}`, new Date().toISOString());
}

export function checkMissedCheckIns(recipientId = 1): boolean {
  const today = new Date().toISOString().slice(0, 10);
  const result = db.prepare(
    "SELECT COUNT(*) as c FROM care_log WHERE recipient_id = ? AND type = 'checkin' AND date(logged_at) = ? AND title NOT LIKE '%reminder sent%'"
  ).get(recipientId, today) as { c: number };
  return result.c === 0;
}

export function getMedicationsDueNow(recipientId = 1): Medication[] {
  const meds = db.prepare('SELECT * FROM medications WHERE recipient_id = ? AND is_active = 1').all(recipientId) as Medication[];
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  return meds.filter(med => {
    const times: string[] = JSON.parse(med.times || '[]');
    return times.some(t => {
      const match = t.match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (!match) return false;
      let hours = parseInt(match[1]);
      const mins = parseInt(match[2]);
      const period = match[3].toUpperCase();
      if (period === 'PM' && hours !== 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;
      return Math.abs(hours * 60 + mins - currentMinutes) <= 30;
    });
  });
}

export function generateWeeklySummary(recipientId = 1) {
  const sevenDaysAgo = new Date(); sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const since = sevenDaysAgo.toISOString();
  const entries = db.prepare('SELECT type, title, logged_at FROM care_log WHERE recipient_id = ? AND logged_at >= ?').all(recipientId, since) as Pick<CareLogEntry, 'type' | 'logged_at'> & { title: string }[];
  const checkInDays = new Set(entries.filter(e => e.type === 'checkin' && !e.title.includes('reminder')).map(e => e.logged_at.slice(0, 10)));
  const meds = db.prepare('SELECT * FROM medications WHERE recipient_id = ? AND is_active = 1').all(recipientId) as Medication[];
  const totalDailyDoses = meds.reduce((s, m) => s + JSON.parse(m.times || '[]').length, 0);
  const medicationDosesExpected = totalDailyDoses * 7;
  const medicationDosesGiven = entries.filter(e => e.type === 'medication').length;
  const entryCountByType: Record<string, number> = {};
  for (const e of entries) entryCountByType[e.type] = (entryCountByType[e.type] ?? 0) + 1;
  const today = new Date().toISOString().slice(0, 10);
  const nextWeek = new Date(); nextWeek.setDate(nextWeek.getDate() + 7);
  const { c: upcomingAppointmentCount } = db.prepare('SELECT COUNT(*) as c FROM appointments WHERE recipient_id = ? AND date >= ? AND date <= ? AND completed = 0').get(recipientId, today, nextWeek.toISOString().slice(0, 10)) as { c: number };
  const checkInsCompleted = checkInDays.size;
  return {
    checkInRate: Math.round((checkInsCompleted / 7) * 100),
    checkInsCompleted, checkInsTotal: 7,
    medicationAdherenceRate: medicationDosesExpected > 0 ? Math.round((medicationDosesGiven / medicationDosesExpected) * 100) : 0,
    medicationDosesGiven, medicationDosesExpected,
    careLogEntryCount: entries.length,
    entryCountByType, upcomingAppointmentCount,
  };
}
