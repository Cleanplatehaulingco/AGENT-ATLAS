'use client';

import { useState, useEffect, useCallback } from 'react';
import { Calendar, Plus, CheckCircle, X, Trash2, MapPin, Clock, User, ChevronDown, ChevronUp } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import type { Appointment } from '@/lib/db';

const APPT_TYPES = ['doctor', 'specialist', 'therapy', 'lab', 'other'];
const TYPE_STYLES: Record<string, string> = {
  doctor: 'bg-care-100 text-care-800 dark:bg-care-900/30 dark:text-care-300',
  specialist: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  therapy: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  lab: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
  other: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400',
};

function ApptCard({ appt, onComplete, onDelete }: { appt: Appointment; onComplete: (a: Appointment) => void; onDelete: (id: number) => void; }) {
  return (
    <div className={cn('card !p-4', appt.completed && 'opacity-60')}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 text-center bg-care-50 dark:bg-care-900/20 rounded-xl px-3 py-2 min-w-[54px]">
          <p className="text-xs font-semibold text-care-600 dark:text-care-400 uppercase">{new Date(appt.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short' })}</p>
          <p className="text-2xl font-bold text-care-800 dark:text-care-200 leading-none">{new Date(appt.date + 'T00:00:00').getDate()}</p>
          <p className="text-xs text-care-500">{new Date(appt.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short' })}</p>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-semibold text-slate-800 dark:text-slate-200">{appt.title}</p>
              <span className={cn('badge mt-1', TYPE_STYLES[appt.type] ?? TYPE_STYLES.other)}>{appt.type.charAt(0).toUpperCase() + appt.type.slice(1)}</span>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              {!appt.completed && <button onClick={() => onComplete(appt)} className="flex items-center gap-1 text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-2.5 py-1.5 rounded-lg font-medium"><CheckCircle className="w-3.5 h-3.5" />Done</button>}
              {appt.completed && <span className="text-xs text-emerald-600 font-medium flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" />Completed</span>}
              <button onClick={() => onDelete(appt.id)} className="p-1.5 rounded-lg text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
          <div className="mt-2 space-y-1">
            {appt.provider && <p className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400"><User className="w-3.5 h-3.5" />{appt.provider}</p>}
            {appt.location && <p className="flex items-center gap-1.5 text-sm text-slate-500"><MapPin className="w-3.5 h-3.5" />{appt.location}</p>}
            {appt.time && <p className="flex items-center gap-1.5 text-sm text-slate-500"><Clock className="w-3.5 h-3.5" />{appt.time}</p>}
          </div>
          {appt.notes && <p className="text-xs text-slate-400 mt-2 italic">{appt.notes}</p>}
        </div>
      </div>
    </div>
  );
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showPast, setShowPast] = useState(false);
  const [form, setForm] = useState({ title: '', provider: '', location: '', date: '', time: '', type: 'doctor', notes: '' });
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => { const data = await fetch('/api/appointments').then(r => r.json()); setAppointments(Array.isArray(data) ? data : []); }, []);
  useEffect(() => { load(); }, [load]);

  const today = new Date().toISOString().slice(0, 10);
  const upcoming = appointments.filter(a => !a.completed && a.date >= today).sort((a, b) => a.date.localeCompare(b.date));
  const past = appointments.filter(a => a.completed || a.date < today).sort((a, b) => b.date.localeCompare(a.date));

  async function markComplete(appt: Appointment) { await fetch(`/api/appointments?id=${appt.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ completed: 1 }) }); await load(); }
  async function deleteAppt(id: number) { if (!confirm('Delete?')) return; await fetch(`/api/appointments?id=${id}`, { method: 'DELETE' }); await load(); }

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setSubmitting(true);
    await fetch('/api/appointments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setForm({ title: '', provider: '', location: '', date: '', time: '', type: 'doctor', notes: '' });
    setShowForm(false); setSubmitting(false); await load();
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3"><Calendar className="w-6 h-6 text-care-600" /><h1 className="page-title">Appointments</h1></div>
        <button onClick={() => setShowForm(s => !s)} className="btn-primary"><Plus className="w-4 h-4" /><span className="hidden sm:inline">Add Appointment</span></button>
      </div>
      {showForm && (
        <div className="card">
          <div className="flex items-center justify-between mb-4"><h2 className="section-title">New Appointment</h2><button onClick={() => setShowForm(false)} className="btn-ghost p-1"><X className="w-4 h-4" /></button></div>
          <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2"><label className="label">Title *</label><input className="input" required placeholder="e.g. Quarterly checkup" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
            <div><label className="label">Provider</label><input className="input" placeholder="e.g. Dr. Sarah Chen" value={form.provider} onChange={e => setForm(f => ({ ...f, provider: e.target.value }))} /></div>
            <div><label className="label">Type</label><select className="input" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>{APPT_TYPES.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}</select></div>
            <div><label className="label">Date *</label><input className="input" type="date" required value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} /></div>
            <div><label className="label">Time</label><input className="input" placeholder="e.g. 10:30 AM" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} /></div>
            <div className="sm:col-span-2"><label className="label">Location</label><input className="input" placeholder="e.g. University Medical Center, Suite 204" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} /></div>
            <div className="sm:col-span-2"><label className="label">Notes</label><textarea className="input" rows={2} placeholder="Things to bring, questions to ask..." value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} /></div>
            <div className="sm:col-span-2 flex gap-3"><button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button><button type="submit" disabled={submitting} className="btn-primary">{submitting ? 'Saving...' : 'Add Appointment'}</button></div>
          </form>
        </div>
      )}
      <div>
        <h2 className="section-title mb-3">Upcoming ({upcoming.length})</h2>
        {upcoming.length === 0 ? <div className="card text-center py-8"><Calendar className="w-8 h-8 text-slate-300 mx-auto mb-2" /><p className="text-slate-400 text-sm">No upcoming appointments.</p></div> : <div className="space-y-3">{upcoming.map(a => <ApptCard key={a.id} appt={a} onComplete={markComplete} onDelete={deleteAppt} />)}</div>}
      </div>
      {past.length > 0 && (
        <div>
          <button onClick={() => setShowPast(s => !s)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 font-medium py-1">{showPast ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}Past & Completed ({past.length})</button>
          {showPast && <div className="space-y-3 mt-3">{past.map(a => <ApptCard key={a.id} appt={a} onComplete={markComplete} onDelete={deleteAppt} />)}</div>}
        </div>
      )}
    </div>
  );
}
