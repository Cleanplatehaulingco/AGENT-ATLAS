'use client';

import { useState, useEffect, useCallback } from 'react';
import { CheckCircle2, Send, Settings, Flame, Calendar } from 'lucide-react';
import { cn, formatDateTime } from '@/lib/utils';
import type { CareLogEntry } from '@/lib/db';

interface CheckInDay { date: string; checked_in: boolean; time: string | null; method: string | null; }

function CalendarHeatmap({ days }: { days: CheckInDay[] }) {
  return (
    <div>
      <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(7, minmax(0, 1fr))' }}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div key={d} className="text-center text-xs text-slate-400 font-medium pb-1">{d}</div>
        ))}
        {days.map(day => {
          const d = new Date(day.date + 'T00:00:00');
          const isToday = day.date === new Date().toISOString().slice(0, 10);
          return (
            <div key={day.date} title={`${day.date}${day.checked_in ? ` — checked in${day.time ? ' at ' + day.time : ''}` : ' — no check-in'}`}
              className={cn('aspect-square rounded-md flex items-center justify-center text-xs font-medium transition-colors cursor-default',
                day.checked_in ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500',
                isToday && 'ring-2 ring-care-500 ring-offset-1'
              )}>
              {d.getDate()}
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-500 inline-block" />Checked in</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-slate-200 dark:bg-slate-700 inline-block" />No data</span>
      </div>
    </div>
  );
}

export default function CheckInPage() {
  const [history, setHistory] = useState<CheckInDay[]>([]);
  const [recentLogs, setRecentLogs] = useState<CareLogEntry[]>([]);
  const [sending, setSending] = useState(false);
  const [streak, setStreak] = useState(0);
  const [settings, setSettings] = useState({ time: '09:00', method: 'sms' });
  const [showSettings, setShowSettings] = useState(false);

  const load = useCallback(async () => {
    const [h, logs] = await Promise.all([
      fetch('/api/checkin').then(r => r.json()),
      fetch('/api/care-log?limit=50').then(r => r.json()),
    ]);
    setHistory(Array.isArray(h) ? h : []);
    const checkinLogs = (Array.isArray(logs) ? logs : []).filter((e: CareLogEntry) => e.type === 'checkin' && !e.title.includes('reminder sent'));
    setRecentLogs(checkinLogs.slice(0, 10));
    // Calculate streak
    const checkedDays = new Set((Array.isArray(h) ? h : []).filter((d: CheckInDay) => d.checked_in).map((d: CheckInDay) => d.date));
    let s = 0;
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const d = new Date(today); d.setDate(d.getDate() - i);
      if (checkedDays.has(d.toISOString().slice(0, 10))) s++;
      else break;
    }
    setStreak(s);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function sendManualCheckIn() {
    setSending(true);
    await fetch('/api/checkin', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ member_name: 'Manual', method: 'app', notes: 'Manual check-in from Check-in page' }),
    });
    await load(); setSending(false);
  }

  // Pad history to start on Sunday
  const paddedDays = (() => {
    if (history.length === 0) return [];
    const first = new Date(history[0].date + 'T00:00:00');
    const dayOfWeek = first.getDay();
    const padded: (CheckInDay | null)[] = Array(dayOfWeek).fill(null);
    return [...padded, ...history];
  })();

  const filledDays = paddedDays.filter(Boolean) as CheckInDay[];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3"><CheckCircle2 className="w-6 h-6 text-care-600" /><h1 className="page-title">Check-ins</h1></div>
        <div className="flex gap-2">
          <button onClick={() => setShowSettings(s => !s)} className="btn-secondary flex items-center gap-2"><Settings className="w-4 h-4" /><span className="hidden sm:inline">Settings</span></button>
          <button onClick={sendManualCheckIn} disabled={sending} className="btn-primary"><Send className="w-4 h-4" /><span className="hidden sm:inline">{sending ? 'Sending...' : 'Manual Check-in'}</span></button>
        </div>
      </div>

      {/* Streak */}
      {streak > 0 && (
        <div className="card bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-700">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-400 flex items-center justify-center flex-shrink-0">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold text-amber-800 dark:text-amber-200">{streak} day streak! {streak >= 7 ? '🎉' : '🔥'}</p>
              <p className="text-sm text-amber-600 dark:text-amber-400">Keep it going — consistency is key to peace of mind.</p>
            </div>
          </div>
        </div>
      )}

      {/* Settings panel */}
      {showSettings && (
        <div className="card">
          <h2 className="section-title mb-4 flex items-center gap-2"><Settings className="w-5 h-5" />Check-in Settings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Preferred Check-in Time</label>
              <input type="time" className="input" value={settings.time} onChange={e => setSettings(s => ({ ...s, time: e.target.value }))} />
            </div>
            <div>
              <label className="label">Check-in Method</label>
              <select className="input" value={settings.method} onChange={e => setSettings(s => ({ ...s, method: e.target.value }))}>
                <option value="sms">SMS Text Message</option>
                <option value="call">Phone Call</option>
                <option value="app">App Only</option>
              </select>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-3">Note: SMS and call delivery requires Twilio configuration. See .env.example.</p>
        </div>
      )}

      {/* Calendar heatmap */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4"><Calendar className="w-5 h-5 text-care-600" /><h2 className="section-title">Last 30 Days</h2></div>
        {filledDays.length > 0 ? <CalendarHeatmap days={filledDays} /> : <p className="text-slate-400 text-sm">No check-in history yet.</p>}
      </div>

      {/* Recent check-in log */}
      <div className="card">
        <h2 className="section-title mb-4">Recent Check-ins</h2>
        {recentLogs.length === 0 ? (
          <p className="text-slate-400 text-sm">No check-ins recorded yet. Send the first one above.</p>
        ) : (
          <div className="space-y-3">
            {recentLogs.map(log => (
              <div key={log.id} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{log.title}</p>
                  {log.notes && <p className="text-xs text-slate-500 mt-0.5">{log.notes}</p>}
                  <p className="text-xs text-slate-400 mt-1">{formatDateTime(log.logged_at)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
