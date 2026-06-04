'use client';

import { useState, useEffect, useCallback } from 'react';
import { Users, Phone, Mail, Plus, Trash2, X, Heart, AlertTriangle, Stethoscope, Pill } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import type { Member, Recipient } from '@/lib/db';

const ROLES = ['primary', 'backup', 'coordinator'];
const ROLE_STYLES: Record<string, string> = {
  primary: 'bg-care-100 text-care-800 dark:bg-care-900/30 dark:text-care-300',
  coordinator: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  backup: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
};

export default function CirclePage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [recipient, setRecipient] = useState<Recipient | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', relationship: '', phone: '', email: '', role: 'backup' });
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    const [m, r] = await Promise.all([fetch('/api/members').then(r => r.json()), fetch('/api/recipient').then(r => r.json())]);
    setMembers(Array.isArray(m) ? m : []);
    setRecipient(r?.id ? r : null);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function addMember(e: React.FormEvent) {
    e.preventDefault(); setSubmitting(true);
    await fetch('/api/members', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setForm({ name: '', relationship: '', phone: '', email: '', role: 'backup' });
    setShowForm(false); setSubmitting(false); await load();
  }

  async function deleteMember(id: number) {
    if (!confirm('Remove this team member?')) return;
    await fetch(`/api/members?id=${id}`, { method: 'DELETE' }); await load();
  }

  const conditions: string[] = recipient ? JSON.parse(recipient.conditions || '[]') : [];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3"><Users className="w-6 h-6 text-care-600" /><h1 className="page-title">Care Circle</h1></div>
        <button onClick={() => setShowForm(s => !s)} className="btn-primary"><Plus className="w-4 h-4" /><span className="hidden sm:inline">Add Member</span></button>
      </div>
      {showForm && (
        <div className="card">
          <div className="flex items-center justify-between mb-4"><h2 className="section-title">Add Team Member</h2><button onClick={() => setShowForm(false)} className="btn-ghost p-1"><X className="w-4 h-4" /></button></div>
          <form onSubmit={addMember} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="label">Name *</label><input className="input" required placeholder="Full name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
            <div><label className="label">Relationship</label><input className="input" placeholder="e.g. Son, Daughter" value={form.relationship} onChange={e => setForm(f => ({ ...f, relationship: e.target.value }))} /></div>
            <div><label className="label">Phone</label><input className="input" type="tel" placeholder="(555) 555-5555" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} /></div>
            <div><label className="label">Email</label><input className="input" type="email" placeholder="email@example.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} /></div>
            <div><label className="label">Role</label><select className="input" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}>{ROLES.map(r => <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>)}</select></div>
            <div className="flex items-end gap-3"><button type="button" onClick={() => setShowForm(false)} className="btn-secondary flex-1">Cancel</button><button type="submit" disabled={submitting} className="btn-primary flex-1 justify-center">{submitting ? 'Saving...' : 'Add Member'}</button></div>
          </form>
        </div>
      )}
      {recipient && (
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-care-300 to-care-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">{recipient.name.charAt(0)}</div>
            <div><h2 className="section-title">{recipient.name}</h2>{recipient.dob && <p className="text-sm text-slate-500">Born {formatDate(recipient.dob)}</p>}</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {conditions.length > 0 && <div><p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1.5"><Heart className="w-3.5 h-3.5" />Conditions</p><div className="flex flex-wrap gap-1.5">{conditions.map(c => <span key={c} className="badge bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-300">{c}</span>)}</div></div>}
            {(recipient.emergency_contact || recipient.emergency_phone) && <div><p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5 text-amber-500" />Emergency Contact</p>{recipient.emergency_contact && <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{recipient.emergency_contact}</p>}{recipient.emergency_phone && <a href={`tel:${recipient.emergency_phone}`} className="text-sm text-care-600 hover:underline flex items-center gap-1"><Phone className="w-3.5 h-3.5" />{recipient.emergency_phone}</a>}</div>}
            {(recipient.doctor_name || recipient.doctor_phone) && <div><p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1.5"><Stethoscope className="w-3.5 h-3.5" />Primary Doctor</p>{recipient.doctor_name && <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{recipient.doctor_name}</p>}{recipient.doctor_phone && <a href={`tel:${recipient.doctor_phone}`} className="text-sm text-care-600 hover:underline flex items-center gap-1"><Phone className="w-3.5 h-3.5" />{recipient.doctor_phone}</a>}</div>}
            {recipient.pharmacy && <div><p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1.5"><Pill className="w-3.5 h-3.5" />Pharmacy</p><p className="text-sm text-slate-700 dark:text-slate-300">{recipient.pharmacy}</p></div>}
          </div>
          {recipient.notes && <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-800/30"><p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1">Notes</p><p className="text-sm text-amber-800 dark:text-amber-300">{recipient.notes}</p></div>}
        </div>
      )}
      <div>
        <h2 className="section-title mb-3">Care Team ({members.length})</h2>
        {members.length === 0 ? <div className="card text-center py-8"><Users className="w-8 h-8 text-slate-300 mx-auto mb-2" /><p className="text-slate-400 text-sm">No team members yet.</p></div> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {members.map(member => (
              <div key={member.id} className="card !p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-care-300 to-care-500 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">{member.name.charAt(0)}</div>
                    <div className="min-w-0"><p className="font-semibold text-slate-800 dark:text-slate-200">{member.name}</p>{member.relationship && <p className="text-sm text-slate-500">{member.relationship}</p>}<span className={cn('badge mt-1', ROLE_STYLES[member.role] ?? ROLE_STYLES.backup)}>{member.role.charAt(0).toUpperCase() + member.role.slice(1)}</span></div>
                  </div>
                  <button onClick={() => deleteMember(member.id)} className="flex-shrink-0 p-1.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
                <div className="mt-3 space-y-1.5">
                  {member.phone && <a href={`tel:${member.phone}`} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-care-600"><Phone className="w-3.5 h-3.5" />{member.phone}</a>}
                  {member.email && <a href={`mailto:${member.email}`} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-care-600"><Mail className="w-3.5 h-3.5" />{member.email}</a>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
