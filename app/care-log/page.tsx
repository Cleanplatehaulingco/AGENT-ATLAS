'use client';

import { useState, useEffect, useCallback } from 'react';
import { ClipboardList, Plus, Trash2, X } from 'lucide-react';
import { cn, formatDateTime, getLogTypeStyle, getLogTypeLabel, LOG_TYPES, MOOD_LABELS, MOOD_EMOJIS, MOOD_COLORS } from '@/lib/utils';
import type { CareLogEntry } from '@/lib/db';

const ALL_FILTERS = ['all', 'checkin', 'medication', 'meal', 'mood', 'note', 'vitals', 'activity'];

export default function CareLogPage() {
  const [entries, setEntries] = useState<CareLogEntry[]>([]);
  const [filter, setFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ type: 'note', title: '', notes: '', member_name: '', mood: '' });
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    const data = await fetch('/api/care-log?limit=100').then(r => r.json());
    setEntries(Array.isArray(data) ? data : []);
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = filter === 'all' ? entries : entries.filter(e => e.type === filter);

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setSubmitting(true);
    await fetch('/api/care-log', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, mood: form.mood ? parseInt(form.mood) : null, logged_at: new Date().toISOString() }) });
    setForm({ type: 'note', title: '', notes: '', member_name: '', mood: '' });
    setShowForm(false); setSubmitting(false); await load();
  }

  async function deleteEntry(id: number) {
    if (!confirm('Delete this entry?')) return;
    await fetch(`/api/care-log?id=${id}`, { method: 'DELETE' }); await load();
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3"><ClipboardList className="w-6 h-6 text-care-600" /><h1 className="page-title">Care Log</h1></div>
        <button onClick={() => setShowForm(true)} className="btn-primary"><Plus className="w-4 h-4" /><span className="hidden sm:inline">Add Entry</span></button>
      </div>
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {ALL_FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)} className={cn('px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors', filter === f ? 'bg-care-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600')}>
            {f === 'all' ? 'All' : LOG_TYPES.find(t => t.value === f)?.label ?? f}
          </button>
        ))}
      </div>
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <h2 className="section-title">Add Care Log Entry</h2>
              <button onClick={() => setShowForm(false)} className="btn-ghost p-1"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={submit} className="space-y-3">
              <div><label className="label">Type</label>
                <select className="input" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                  {LOG_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
              <div><label className="label">Title *</label><input className="input" required placeholder="Brief description" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
              {form.type === 'mood' && (
                <div><label className="label">Mood Rating</label>
                  <select className="input" value={form.mood} onChange={e => setForm(f => ({ ...f, mood: e.target.value }))}>
                    <option value="">Select mood</option>
                    {[1,2,3,4,5].map(n => <option key={n} value={n}>{MOOD_EMOJIS[n]} {MOOD_LABELS[n]}</option>)}
                  </select>
                </div>
              )}
              <div><label className="label">Notes</label><textarea className="input" rows={3} placeholder="Additional details..." value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} /></div>
              <div><label className="label">Logged by</label><input className="input" placeholder="Your name" value={form.member_name} onChange={e => setForm(f => ({ ...f, member_name: e.target.value }))} /></div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary flex-1">Cancel</button>
                <button type="submit" disabled={submitting} className="btn-primary flex-1 justify-center">{submitting ? 'Saving...' : 'Save Entry'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {filtered.length === 0 ? (
        <div className="card text-center py-12"><ClipboardList className="w-10 h-10 text-slate-300 mx-auto mb-3" /><p className="text-slate-400">No log entries yet.</p></div>
      ) : (
        <div className="space-y-3">
          {filtered.map(entry => (
            <div key={entry.id} className="card !p-4 flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className={cn('badge', getLogTypeStyle(entry.type))}>{getLogTypeLabel(entry.type)}</span>
                  {entry.type === 'mood' && entry.mood && <span className={cn('text-sm font-medium', MOOD_COLORS[entry.mood])}>{MOOD_EMOJIS[entry.mood]} {MOOD_LABELS[entry.mood]}</span>}
                </div>
                <p className="font-medium text-slate-800 dark:text-slate-200 text-sm">{entry.title}</p>
                {entry.notes && <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{entry.notes}</p>}
                <p className="text-xs text-slate-400 mt-2">
                  {entry.member_name && <><span className="font-medium">{entry.member_name}</span> · </>}{formatDateTime(entry.logged_at)}
                </p>
              </div>
              <button onClick={() => deleteEntry(entry.id)} className="flex-shrink-0 p-1.5 text-slate-300 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
