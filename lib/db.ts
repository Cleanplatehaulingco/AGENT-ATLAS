import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DATA_DIR = path.join(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const DB_PATH = path.join(DATA_DIR, 'carepingapp.db');
const db = new Database(DB_PATH);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS recipients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    dob TEXT,
    photo_url TEXT,
    conditions TEXT DEFAULT '[]',
    phone TEXT,
    emergency_contact TEXT,
    emergency_phone TEXT,
    doctor_name TEXT,
    doctor_phone TEXT,
    pharmacy TEXT,
    notes TEXT,
    checkin_time TEXT DEFAULT '09:00',
    checkin_method TEXT DEFAULT 'sms',
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    recipient_id INTEGER NOT NULL DEFAULT 1,
    name TEXT NOT NULL,
    relationship TEXT,
    phone TEXT,
    email TEXT,
    role TEXT DEFAULT 'backup',
    notify_alerts INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS medications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    recipient_id INTEGER NOT NULL DEFAULT 1,
    name TEXT NOT NULL,
    dosage TEXT,
    frequency TEXT,
    times TEXT DEFAULT '[]',
    instructions TEXT,
    prescriber TEXT,
    refill_date TEXT,
    is_active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS care_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    recipient_id INTEGER NOT NULL DEFAULT 1,
    member_name TEXT,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    notes TEXT,
    mood INTEGER,
    data TEXT,
    logged_at TEXT DEFAULT (datetime('now')),
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    recipient_id INTEGER NOT NULL DEFAULT 1,
    title TEXT NOT NULL,
    provider TEXT,
    location TEXT,
    date TEXT NOT NULL,
    time TEXT,
    type TEXT DEFAULT 'doctor',
    notes TEXT,
    completed INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS alerts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    recipient_id INTEGER NOT NULL DEFAULT 1,
    type TEXT NOT NULL,
    description TEXT NOT NULL,
    severity TEXT DEFAULT 'medium',
    resolved INTEGER DEFAULT 0,
    resolved_at TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );
`);

const recipientCount = (db.prepare('SELECT COUNT(*) as c FROM recipients').get() as { c: number }).c;
if (recipientCount === 0) {
  db.prepare(`
    INSERT INTO recipients (name, dob, conditions, phone, emergency_contact, emergency_phone, doctor_name, doctor_phone, pharmacy, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    'Margaret Johnson', '1942-03-15',
    JSON.stringify(['Type 2 Diabetes', 'Hypertension', 'Mild Arthritis']),
    '(734) 555-0123', 'David Johnson', '(734) 555-0847',
    'Dr. Sarah Chen', '(734) 555-0192', 'CVS Pharmacy - 123 Main St',
    'Mom prefers her medications with food. She enjoys morning walks and afternoon TV. Allergic to penicillin.'
  );
  const im = db.prepare('INSERT INTO members (recipient_id, name, relationship, phone, email, role) VALUES (1, ?, ?, ?, ?, ?)');
  im.run('David Johnson', 'Son', '(734) 555-0847', 'david.johnson@email.com', 'primary');
  im.run('Lisa Johnson', 'Daughter-in-law', '(734) 555-0921', 'lisa.johnson@email.com', 'backup');
  im.run('Karen Mitchell', 'Daughter', '(734) 555-0334', 'karen.mitchell@email.com', 'coordinator');
  const imd = db.prepare('INSERT INTO medications (recipient_id, name, dosage, frequency, times, instructions, prescriber, refill_date) VALUES (1, ?, ?, ?, ?, ?, ?, ?)');
  imd.run('Metformin', '500mg', 'twice daily', JSON.stringify(['8:00 AM', '8:00 PM']), 'Take with meals', 'Dr. Sarah Chen', '2025-08-15');
  imd.run('Lisinopril', '10mg', 'daily', JSON.stringify(['8:00 AM']), 'Take at same time daily', 'Dr. Sarah Chen', '2025-09-01');
  imd.run('Aspirin', '81mg', 'daily', JSON.stringify(['8:00 AM']), 'Take with water', 'Dr. Sarah Chen', '2025-10-01');
  const now = new Date();
  const yesterday = new Date(now); yesterday.setDate(yesterday.getDate() - 1);
  const twoDaysAgo = new Date(now); twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  const il = db.prepare('INSERT INTO care_log (recipient_id, member_name, type, title, notes, mood, logged_at) VALUES (1, ?, ?, ?, ?, ?, ?)');
  il.run('CarePing System', 'checkin', 'Daily check-in completed', 'Margaret replied 1 — doing well today.', null, twoDaysAgo.toISOString());
  il.run('David Johnson', 'medication', 'Morning medications given', 'All 3 morning medications administered with breakfast.', null, twoDaysAgo.toISOString());
  il.run('Lisa Johnson', 'mood', 'Mood check', 'Mom seemed cheerful today.', 4, yesterday.toISOString());
  il.run('CarePing System', 'checkin', 'Daily check-in completed', 'Margaret replied 1 via SMS at 9:14 AM.', null, now.toISOString());
  il.run('Karen Mitchell', 'note', 'Called to check in', 'Spoke with Mom for 20 minutes. In good spirits.', null, now.toISOString());
  const fd1 = new Date(now); fd1.setDate(fd1.getDate() + 3);
  const fd2 = new Date(now); fd2.setDate(fd2.getDate() + 10);
  const ia = db.prepare('INSERT INTO appointments (recipient_id, title, provider, location, date, time, type, notes) VALUES (1, ?, ?, ?, ?, ?, ?, ?)');
  ia.run('Quarterly diabetes checkup', 'Dr. Sarah Chen', 'University Medical Center, Suite 204', fd1.toISOString().split('T')[0], '10:30 AM', 'doctor', 'Bring blood glucose log.');
  ia.run('Blood work - fasting labs', 'University Lab Services', 'University Medical Center, Lab B', fd2.toISOString().split('T')[0], '8:00 AM', 'lab', 'Fast 12 hours before.');
}

export interface Recipient { id: number; name: string; dob: string | null; photo_url: string | null; conditions: string; phone: string | null; emergency_contact: string | null; emergency_phone: string | null; doctor_name: string | null; doctor_phone: string | null; pharmacy: string | null; notes: string | null; checkin_time: string; checkin_method: string; created_at: string; }
export interface Member { id: number; recipient_id: number; name: string; relationship: string | null; phone: string | null; email: string | null; role: string; notify_alerts: number; created_at: string; }
export interface Medication { id: number; recipient_id: number; name: string; dosage: string | null; frequency: string | null; times: string; instructions: string | null; prescriber: string | null; refill_date: string | null; is_active: number; created_at: string; }
export interface CareLogEntry { id: number; recipient_id: number; member_name: string | null; type: string; title: string; notes: string | null; mood: number | null; data: string | null; logged_at: string; created_at: string; }
export interface Appointment { id: number; recipient_id: number; title: string; provider: string | null; location: string | null; date: string; time: string | null; type: string; notes: string | null; completed: number; created_at: string; }
export interface Alert { id: number; recipient_id: number; type: string; description: string; severity: string; resolved: number; resolved_at: string | null; created_at: string; }

export function getRecipient(id = 1): Recipient | undefined { return db.prepare('SELECT * FROM recipients WHERE id = ?').get(id) as Recipient | undefined; }
export function getMembers(recipientId = 1): Member[] { return db.prepare('SELECT * FROM members WHERE recipient_id = ? ORDER BY role, name').all(recipientId) as Member[]; }
export function getMedications(recipientId = 1, activeOnly = true): Medication[] {
  if (activeOnly) return db.prepare('SELECT * FROM medications WHERE recipient_id = ? AND is_active = 1 ORDER BY name').all(recipientId) as Medication[];
  return db.prepare('SELECT * FROM medications WHERE recipient_id = ? ORDER BY is_active DESC, name').all(recipientId) as Medication[];
}
export function getCareLog(limit = 50, recipientId = 1): CareLogEntry[] { return db.prepare('SELECT * FROM care_log WHERE recipient_id = ? ORDER BY logged_at DESC LIMIT ?').all(recipientId, limit) as CareLogEntry[]; }
export function getAppointments(upcomingOnly = false, recipientId = 1): Appointment[] {
  if (upcomingOnly) return db.prepare("SELECT * FROM appointments WHERE recipient_id = ? AND date >= date('now') AND completed = 0 ORDER BY date, time").all(recipientId) as Appointment[];
  return db.prepare('SELECT * FROM appointments WHERE recipient_id = ? ORDER BY date DESC, time').all(recipientId) as Appointment[];
}
export function getAlerts(recipientId = 1, unresolvedOnly = true): Alert[] {
  if (unresolvedOnly) return db.prepare('SELECT * FROM alerts WHERE recipient_id = ? AND resolved = 0 ORDER BY created_at DESC').all(recipientId) as Alert[];
  return db.prepare('SELECT * FROM alerts WHERE recipient_id = ? ORDER BY created_at DESC LIMIT 50').all(recipientId) as Alert[];
}
export default db;
