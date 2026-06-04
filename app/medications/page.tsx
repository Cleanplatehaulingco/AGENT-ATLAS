'use client';

import { useState, useEffect, useCallback } from 'react';
import { Pill, Plus, CheckCircle, X, Trash2, ToggleLeft, ToggleRight, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Medication } from '@/lib/db';

const FREQUENCIES = ['daily', 'twice daily', 'three times daily', 'as needed', 'weekly', 'monthly'];

function MedCard({ med, onMarkGiven, onToggle, onDelete }: { med: Medication; onMarkGiven: (med: Medication) => void; onToggle: (med: Medication) => void; onDelete: (id: number) => void; }) {
  const times: string[] = JSON.parse(med.times || '[]');
  return (
    <div className={cn('card !p-4', !med.is_active && 'opacity-60')}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-care-100 dark:bg-care-900/30 flex items-center justify-center">
          <Pill className="w-5 h-5 text-care-600 dark:text-care-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-semibold text-slate-800 dark:text-slate-200">{med.name} <span className="font-normal text-slate-500">{med.dosage}</span></p>
              <p className="text-sm text-slate-500 capitalize">{med.frequency}</p>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              {med.is_active && <button onClick={() => onMarkGiven(med)} className="flex items-center gap-1 text-xs bg-care-50 hover:bg-care-100 text-care-700 dark:bg-care-900/30 dark:text-care-300 px-2.5 py-1.5 rounded-lg font-medium"><CheckCircle className="w-3.5 h-3.5" />Mark Given</button>}
              <button onClick={() => onToggle(med)} className="p-1.5 rounded-lg text-slate-400 hover:text-care-600 hover:bg-care-50 transition-colors" title={med.is_active ? 'Mark inactive' : 'Mark active'}>{med.is_active ? <ToggleRight className="w-5 h-5 text-care-600" /> : <ToggleLeft className="w-5 h-5" />}</button>
              <button onClick={() => onDelete(med.id)} className="p-1.5 rounded-lg text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
          {times.length > 0 && <div className="flex flex-wrap gap-1.5 mt-2">{times.map(t => <span key={t} className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full">{t}</span>)}</div>}
          <div className="grid grid-cols-2 gap-x-4 mt-2 text-xs text-slate-500">
            {med.prescriber && <span>Prescriber: {med.prescriber}</span>}
            {med.refill_date && <span>Refill: {med.refill_date}</span>}
          </div>
          {med.instructions && <p className="text-xs text-slate-400 mt-1 italic">{med.instructions}</p>}
        </div>
      </div>
    </div>
  );
}

export default function MedicationsPage() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showInactive, setShowInactive] = useState(false);
  const [form, setForm] = useState({ name: '', dosage: '', frequency: 'daily', times: '', instructions: '', prescriber: '', refill_date: '' });
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    const data = await fetch('/api/medications').then(r => r.json());
    setMedications(Array.isArray(data) ? data : []);
  }, []);

  useEffect(() => { load(); }, [load]);

  const activeMeds = medications.filter(m => m.is_active);
  const inactiveMeds = medications.filter(m => !m.is_active);

  async function markGiven(med: Medication) {
    await fetch('/api/care-log', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'medication', title: `${med.name} ${med.dosage} given`, member_name: 'Care Team', logged_at: new Date().toISOString() }) });
    alert('Medication logged!');
  }

  async function toggleActive(med: Medication) {
    await fetch(`/api/medications?id=${med.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ is_active: med.is_active ? 0 : 1 }) });
    await load();
  }

  async function deleteMed(id: number) {
    if (!confirm('Delete this medication?')) return;
    await fetch(`/api/medications?id=${id}`, { method: 'DELETE' }); await load();
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setSubmitting(true);
    const timesArr = form.times.split(',').map(t => t.trim()).filter(Boolean);
    await fetch('/api/medications', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, times: timesArr }) });
    setForm({ name: '', dosage: '', frequency: 'daily', times: '', instructions: '', prescriber: '', refill_date: '' });
    setShowForm(false); setSubmitting(false); await load();
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3"><Pill className="w-6 h-6 text-care-600" /><h1 className="page-title">Medications</h1></div>
        <button onClick={() => setShowForm(s => !s)} className="btn-primary"><Plus className="w-4 h-4" /><span className="hidden sm:inline">Add Medication</span></button>
      </div>
      {showForm && (
        <div className="card">
          <div className="flex items-center justify-between mb-4"><h2 className="section-title">New Medication</h2><button onClick={() => setShowForm(false)} className="btn-ghost p-1"><X className="w-4 h-4" /></button></div>
          <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="label">Medication Name *</label><input className="input" required placeholder="e.g. Lisinopril" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
            <div><label className="label">Dosage</label><input className="input" placeholder="e.g. 10mg" value={form.dosage} onChange={e => setForm(f => ({ ...f, dosage: e.target.value }))} /></div>
            <div><label className="label">Frequency</label><select className="input" value={form.frequency} onChange={e => setForm(f => ({ ...f, frequency: e.target.value }))}>{FREQUENCIES.map(f => <option key={f} value={f}>{f}</option>)}</select></div>
            <div><label className="label">Times (comma-separated)</label><input className="input" placeholder="e.g. 8:00 AM, 8:00 PM" value={form.times} onChange={e => setForm(f => ({ ...f, times: e.target.value }))} /></div>
            <div><label className="label">Prescriber</label><input className="input" placeholder="e.g. Dr. Sarah Chen" value={form.prescriber} onChange={e => setForm(f => ({ ...f, prescriber: e.target.value }))} /></div>
            <div><label className="label">Refill Date</label><input className="input" type="date" value={form.refill_date} onChange={e => setForm(f => ({ ...f, refill_date: e.target.value }))} /></div>
            <div className="sm:col-span-2"><label className="label">Instructions</label><input className="input" placeholder="e.g. Take with food" value={form.instructions} onChange={e => setForm(f => ({ ...f, instructions: e.target.value }))} /></div>
            <div className="sm:col-span-2 flex gap-3"><button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button><button type="submit" disabled={submitting} className="btn-primary">{submitting ? 'Saving...' : 'Add Medication'}</button></div>
          </form>
        </div>
      )}
      <div>
        <h2 className="section-title mb-3">Active Medications ({activeMeds.length})</h2>
        {activeMeds.length === 0 ? <div className="card text-center py-8"><Pill className="w-8 h-8 text-slate-300 mx-auto mb-2" /><p className="text-slate-400 text-sm">No active medications.</p></div> : <div className="space-y-3">{activeMeds.map(med => <MedCard key={med.id} med={med} onMarkGiven={markGiven} onToggle={toggleActive} onDelete={deleteMed} />)}</div>}
      </div>
      {inactiveMeds.length > 0 && (
        <div>
          <button onClick={() => setShowInactive(s => !s)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 font-medium py-1">{showInactive ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}Inactive Medications ({inactiveMeds.length})</button>
          {showInactive && <div className="space-y-3 mt-3">{inactiveMeds.map(med => <MedCard key={med.id} med={med} onMarkGiven={markGiven} onToggle={toggleActive} onDelete={deleteMed} />)}</div>}
        </div>
      )}
    </div>
  );
}
