'use client';

import { useState, useEffect, useCallback } from 'react';
import { Pill, ClipboardList, Calendar, Plus, CheckCircle, Clock, ChevronRight, Bell, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';
import Link from 'next/link';
import { cn, formatDate, timeAgo, getLogTypeStyle, getLogTypeLabel, MOOD_LABELS, MOOD_EMOJIS } from '@/lib/utils';
import type { Recipient, Medication, CareLogEntry, Appointment } from '@/lib/db';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function DashboardPage() {
  const [recipient, setRecipient] = useState<Recipient | null>(null);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [careLog, setCareLog] = useState<CareLogEntry[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showQuickLog, setShowQuickLog] = useState(false);
  const [logForm, setLogForm] = useState({ type: 'note', title: '', notes: '', member_name: '', mood: '' });
  const [submitting, setSubmitting] = useState(false);
  const [checkedInToday, setCheckedInToday] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [sendingCheckIn, setSendingCheckIn] = useState(false);

  const load = useCallback(async () => {
    const [r, m, l, a] = await Promise.all([
      fetch('/api/recipient').then(r => r.json()),
      fetch('/api/medications').then(r => r.json()),
      fetch('/api/care-log?limit=5').then(r => r.json()),
      fetch('/api/appointments?upcoming=true').then(r => r.json()),
    ]);
    setRecipient(r);
    setMedications(Array.isArray(m) ? m.filter((x: Medication) => x.is_active) : []);
    setCareLog(Array.isArray(l) ? l : []);
    setAppointments(Array.isArray(a) ? a.slice(0, 3) : []);
    // Check today's check-in
    const today = new Date().toISOString().slice(0, 10);
    const checkins = (Array.isArray(l) ? l : []).filter((e: CareLogEntry) =>
      e.type === 'checkin' && e.logged_at.slice(0, 10) === today && !e.title.includes('reminder sent')
    );
    if (checkins.length > 0) {
      setCheckedInToday(true);
      const t = new Date(checkins[0].logged_at);
      setCheckInTime(t.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
    } else {
      setCheckedInToday(false); setCheckInTime(null);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function sendCheckIn() {
    setSendingCheckIn(true);
    await fetch('/api/checkin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ member_name: 'Manual', method: 'app', notes: 'Manual check-in from dashboard' }),
    });
    await load();
    setSendingCheckIn(false);
  }

  async function markMedGiven(med: Medication) {
    await fetch('/api/care-log', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'medication', title: `${med.name} ${med.dosage} given`, member_name: 'Care Team', logged_at: new Date().toISOString() }),
    });
    await load();
  }

  async function submitQuickLog(e: React.FormEvent) {
    e.preventDefault(); setSubmitting(true);
    await fetch('/api/care-log', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...logForm, mood: logForm.mood ? parseInt(logForm.mood) : null, logged_at: new Date().toISOString() }),
    });
    setLogForm({ type: 'note', title: '', notes: '', member_name: '', mood: '' });
    setShowQuickLog(false); setSubmitting(false);
    await load();
  }

  const todayStr = new Date().toISOString().slice(0, 10);
  const todayMedLogs = careLog.filter(e => e.type === 'medication' && e.logged_at.slice(0, 10) === todayStr);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Hero bar */}
      <div className="bg-gradient-to-r from-care-600 to-care-700 rounded-2xl p-6 text-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-care-200 text-sm font-medium">{getGreeting()} — {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
            <h1 className="text-2xl font-bold mt-1">
              Caring for <span className="text-care-100">{recipient?.name ?? 'your loved one'}</span>
            </h1>
            {recipient?.conditions && (() => {
              try {
                const conds = JSON.parse(recipient.conditions) as string[];
                return conds.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {conds.map(c => <span key={c} className="bg-care-700/60 text-care-100 text-xs px-2 py-0.5 rounded-full">{c}</span>)}
                  </div>
                ) : null;
              } catch { return null; }
            })()}
          </div>
          <button onClick={() => setShowQuickLog(true)} className="flex-shrink-0 bg-white/20 hover:bg-white/30 text-white rounded-lg px-4 py-2 font-medium flex items-center gap-2 transition-colors text-sm">
            <Plus className="w-4 h-4" /><span className="hidden sm:inline">Log Entry</span>
          </button>
        </div>
      </div>

      {/* Check-in status card */}
      <div className={cn('rounded-2xl p-6 border-2', checkedInToday ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-700' : 'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-700')}>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={cn('w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0', checkedInToday ? 'bg-emerald-500' : 'bg-amber-400')}>
              {checkedInToday
                ? <CheckCircle2 className="w-8 h-8 text-white" />
                : <AlertTriangle className="w-7 h-7 text-white" />}
            </div>
            <div>
              <p className={cn('text-lg font-bold', checkedInToday ? 'text-emerald-800 dark:text-emerald-200' : 'text-amber-800 dark:text-amber-200')}>
                {checkedInToday ? `Checked in today at ${checkInTime}` : 'No check-in yet today'}
              </p>
              <p className={cn('text-sm mt-0.5', checkedInToday ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400')}>
                {checkedInToday ? `${recipient?.name ?? 'Your loved one'} confirmed they\'re okay` : `${recipient?.name ?? 'Your loved one'} hasn\'t responded to today\'s check-in`}
              </p>
            </div>
          </div>
          {!checkedInToday && (
            <button onClick={sendCheckIn} disabled={sendingCheckIn}
              className="flex-shrink-0 bg-amber-500 hover:bg-amber-600 text-white rounded-lg px-4 py-2.5 font-semibold text-sm transition-colors disabled:opacity-60">
              {sendingCheckIn ? 'Sending...' : 'Send Check-in Now'}
            </button>
          )}
        </div>
      </div>

      {/* Quick Log Modal */}
      {showQuickLog && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fadeIn">
            <h2 className="section-title mb-4">Add Care Log Entry</h2>
            <form onSubmit={submitQuickLog} className="space-y-3">
              <div>
                <label className="label">Type</label>
                <select className="input" value={logForm.type} onChange={e => setLogForm(f => ({ ...f, type: e.target.value }))}>
                  <option value="checkin">Check-in</option>
                  <option value="medication">Medication Given</option>
                  <option value="meal">Meal</option>
                  <option value="mood">Mood Check</option>
                  <option value="note">Note</option>
                  <option value="vitals">Vitals</option>
                  <option value="activity">Activity</option>
                </select>
              </div>
              <div>
                <label className="label">Title *</label>
                <input className="input" required placeholder="Brief description" value={logForm.title} onChange={e => setLogForm(f => ({ ...f, title: e.target.value }))} />
              </div>
              {logForm.type === 'mood' && (
                <div>
                  <label className="label">Mood (1–5)</label>
                  <select className="input" value={logForm.mood} onChange={e => setLogForm(f => ({ ...f, mood: e.target.value }))}>
                    <option value="">Select mood</option>
                    {[1,2,3,4,5].map(n => <option key={n} value={n}>{MOOD_EMOJIS[n]} {MOOD_LABELS[n]}</option>)}
                  </select>
                </div>
              )}
              <div>
                <label className="label">Notes</label>
                <textarea className="input" rows={2} placeholder="Optional details..." value={logForm.notes} onChange={e => setLogForm(f => ({ ...f, notes: e.target.value }))} />
              </div>
              <div>
                <label className="label">Logged by</label>
                <input className="input" placeholder="Your name" value={logForm.member_name} onChange={e => setLogForm(f => ({ ...f, member_name: e.target.value }))} />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowQuickLog(false)} className="btn-secondary flex-1">Cancel</button>
                <button type="submit" disabled={submitting} className="btn-primary flex-1 justify-center">{submitting ? 'Saving...' : 'Save Entry'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Today's Medications */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2"><Pill className="w-5 h-5 text-care-600" /><h2 className="section-title">Today&apos;s Medications</h2></div>
            <Link href="/medications" className="text-xs text-care-600 hover:text-care-700 flex items-center gap-0.5">View all <ChevronRight className="w-3 h-3" /></Link>
          </div>
          {medications.length === 0 ? (
            <p className="text-slate-400 text-sm">No active medications</p>
          ) : (
            <div className="space-y-3">
              {medications.map(med => {
                const times: string[] = JSON.parse(med.times || '[]');
                const givenToday = todayMedLogs.some(l => l.title.includes(med.name));
                return (
                  <div key={med.id} className="flex items-start justify-between gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-slate-800 dark:text-slate-200 text-sm">{med.name} {med.dosage}</p>
                        {givenToday && <span className="text-xs bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-medium">Given</span>}
                      </div>
                      <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                        {times.map(t => <span key={t} className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400"><Clock className="w-3 h-3" />{t}</span>)}
                      </div>
                    </div>
                    {!givenToday && (
                      <button onClick={() => markMedGiven(med)} className="flex-shrink-0 flex items-center gap-1 text-xs bg-care-50 hover:bg-care-100 text-care-700 dark:bg-care-900/30 dark:text-care-300 px-2.5 py-1.5 rounded-lg transition-colors font-medium">
                        <CheckCircle className="w-3.5 h-3.5" />Log Given
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2"><ClipboardList className="w-5 h-5 text-care-600" /><h2 className="section-title">Recent Activity</h2></div>
            <Link href="/care-log" className="text-xs text-care-600 hover:text-care-700 flex items-center gap-0.5">View all <ChevronRight className="w-3 h-3" /></Link>
          </div>
          {careLog.length === 0 ? <p className="text-slate-400 text-sm">No log entries yet</p> : (
            <div className="space-y-3">
              {careLog.map(entry => (
                <div key={entry.id} className="flex items-start gap-3">
                  <span className={cn('badge mt-0.5 flex-shrink-0', getLogTypeStyle(entry.type))}>{getLogTypeLabel(entry.type)}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-tight">{entry.title}</p>
                    {entry.member_name && <p className="text-xs text-slate-400 mt-0.5">{entry.member_name} · {timeAgo(entry.logged_at)}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Appointments */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2"><Calendar className="w-5 h-5 text-care-600" /><h2 className="section-title">Upcoming Appointments</h2></div>
            <Link href="/appointments" className="text-xs text-care-600 hover:text-care-700 flex items-center gap-0.5">View all <ChevronRight className="w-3 h-3" /></Link>
          </div>
          {appointments.length === 0 ? <p className="text-slate-400 text-sm">No upcoming appointments</p> : (
            <div className="space-y-3">
              {appointments.map(appt => (
                <div key={appt.id} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                  <div className="flex-shrink-0 text-center bg-care-100 dark:bg-care-900/30 rounded-lg px-2.5 py-1.5 min-w-[48px]">
                    <p className="text-xs font-semibold text-care-700 dark:text-care-300 uppercase">{new Date(appt.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short' })}</p>
                    <p className="text-lg font-bold text-care-800 dark:text-care-200 leading-none">{new Date(appt.date + 'T00:00:00').getDate()}</p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{appt.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{appt.provider} · {appt.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h2 className="section-title mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button onClick={() => setShowQuickLog(true)} className="flex flex-col items-center gap-2 p-4 bg-care-50 hover:bg-care-100 dark:bg-care-900/20 dark:hover:bg-care-900/40 rounded-xl transition-colors border border-care-100 dark:border-care-800">
              <ClipboardList className="w-7 h-7 text-care-600" />
              <span className="text-sm font-semibold text-care-700 dark:text-care-300">Log Activity</span>
            </button>
            <button onClick={() => { setLogForm(f => ({ ...f, type: 'note' })); setShowQuickLog(true); }} className="flex flex-col items-center gap-2 p-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-700/30 dark:hover:bg-slate-700/50 rounded-xl transition-colors border border-slate-200 dark:border-slate-600">
              <FileText className="w-7 h-7 text-slate-500" />
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Add Note</span>
            </button>
            <Link href="/alerts" className="flex flex-col items-center gap-2 p-4 bg-amber-50 hover:bg-amber-100 dark:bg-amber-900/20 dark:hover:bg-amber-900/40 rounded-xl transition-colors border border-amber-100 dark:border-amber-800">
              <Bell className="w-7 h-7 text-amber-600" />
              <span className="text-sm font-semibold text-amber-700 dark:text-amber-300">View Alerts</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
