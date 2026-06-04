'use client';

import { useEffect, useState, useCallback } from 'react';
import { Plus, Search, Edit2, Trash2, Mail, Phone, Tag, Calendar, Loader2, X, Download, UserCheck } from 'lucide-react';
import { formatDate, getTagColor, CLIENT_TAGS } from '@/lib/utils';

interface Client {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  notes: string | null;
  tags: string;
  last_contacted: string | null;
  follow_up_date: string | null;
  follow_up_note: string | null;
  created_at: string;
}

const EMPTY_FORM = {
  name: '', email: '', phone: '', address: '', notes: '',
  tags: [] as string[], follow_up_date: '', follow_up_note: '',
};

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterTag, setFilterTag] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editClient, setEditClient] = useState<Client | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [viewClient, setViewClient] = useState<Client | null>(null);

  const fetchClients = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filterTag) params.set('tag', filterTag);
    if (search) params.set('search', search);
    const res = await fetch('/api/clients?' + params.toString());
    const data = await res.json();
    setClients(Array.isArray(data) ? data : []);
    setLoading(false);
  }, [filterTag, search]);

  useEffect(() => { fetchClients(); }, [fetchClients]);

  function openAdd() {
    setEditClient(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  }

  function openEdit(c: Client) {
    setEditClient(c);
    setForm({
      name: c.name,
      email: c.email || '',
      phone: c.phone || '',
      address: c.address || '',
      notes: c.notes || '',
      tags: JSON.parse(c.tags || '[]'),
      follow_up_date: c.follow_up_date || '',
      follow_up_note: c.follow_up_note || '',
    });
    setShowModal(true);
  }

  async function save() {
    if (!form.name.trim()) return;
    setSaving(true);
    const method = editClient ? 'PUT' : 'POST';
    const body = editClient ? { ...form, id: editClient.id } : form;
    await fetch('/api/clients', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    setSaving(false);
    setShowModal(false);
    fetchClients();
  }

  async function deleteClient(id: number) {
    if (!confirm('Delete this client?')) return;
    await fetch('/api/clients?id=' + id, { method: 'DELETE' });
    fetchClients();
    if (viewClient?.id === id) setViewClient(null);
  }

  function toggleTag(tag: string) {
    setForm(f => ({
      ...f,
      tags: f.tags.includes(tag) ? f.tags.filter(t => t !== tag) : [...f.tags, tag],
    }));
  }

  function exportEmailList() {
    const emails = clients.filter(c => c.email).map(c => `${c.name} <${c.email}>`).join('\n');
    const blob = new Blob([emails], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `clients-email-list${filterTag ? '-' + filterTag : ''}.txt`;
    a.click();
  }

  async function markContacted(c: Client) {
    const today = new Date().toISOString().split('T')[0];
    await fetch('/api/clients', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...c, tags: JSON.parse(c.tags || '[]'), last_contacted: today }),
    });
    fetchClients();
  }

  const parsedClients = clients.map(c => ({ ...c, parsedTags: JSON.parse(c.tags || '[]') as string[] }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Clients / CRM</h1>
          <p className="text-warm-500 text-sm mt-1">{clients.length} customers</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={exportEmailList} className="btn-secondary">
            <Download className="w-4 h-4" />
            Export Emails
          </button>
          <button onClick={openAdd} className="btn-primary">
            <Plus className="w-4 h-4" />
            Add Client
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400" />
          <input
            className="input pl-9"
            placeholder="Search by name, email, phone…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select
          className="input w-auto"
          value={filterTag}
          onChange={e => setFilterTag(e.target.value)}
        >
          <option value="">All Tags</option>
          {CLIENT_TAGS.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-brand-500" /></div>
      ) : parsedClients.length === 0 ? (
        <div className="card text-center py-16">
          <p className="text-warm-400 mb-4">No clients yet. Add your first customer!</p>
          <button onClick={openAdd} className="btn-primary mx-auto">
            <Plus className="w-4 h-4" /> Add Client
          </button>
        </div>
      ) : (
        <div className="card p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-warm-50 dark:bg-warm-900/20 border-b border-warm-100 dark:border-warm-900/50">
                <tr>
                  <th className="table-header text-left px-4 py-3">Name</th>
                  <th className="table-header text-left px-4 py-3 hidden sm:table-cell">Contact</th>
                  <th className="table-header text-left px-4 py-3 hidden md:table-cell">Tags</th>
                  <th className="table-header text-left px-4 py-3 hidden lg:table-cell">Last Contacted</th>
                  <th className="table-header text-left px-4 py-3 hidden lg:table-cell">Follow-up</th>
                  <th className="table-header px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-warm-100 dark:divide-warm-900/30">
                {parsedClients.map(c => (
                  <tr key={c.id} className="hover:bg-warm-50 dark:hover:bg-warm-900/10 transition-colors cursor-pointer" onClick={() => setViewClient(c)}>
                    <td className="px-4 py-3">
                      <p className="font-medium text-warm-900 dark:text-warm-100">{c.name}</p>
                      <p className="text-xs text-warm-400 sm:hidden">{c.email || c.phone}</p>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <div className="space-y-0.5">
                        {c.email && <div className="flex items-center gap-1.5 text-xs text-warm-600 dark:text-warm-400"><Mail className="w-3 h-3" />{c.email}</div>}
                        {c.phone && <div className="flex items-center gap-1.5 text-xs text-warm-600 dark:text-warm-400"><Phone className="w-3 h-3" />{c.phone}</div>}
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {c.parsedTags.map(t => (
                          <span key={t} className={`badge ${getTagColor(t)}`}>{t}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-xs text-warm-500 dark:text-warm-400">
                      {c.last_contacted ? formatDate(c.last_contacted) : <span className="text-warm-300">Never</span>}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      {c.follow_up_date && (
                        <div>
                          <p className="text-xs font-medium text-brand-600 dark:text-brand-400">{formatDate(c.follow_up_date)}</p>
                          {c.follow_up_note && <p className="text-xs text-warm-400 truncate max-w-[140px]">{c.follow_up_note}</p>}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center gap-1 justify-end">
                        <button onClick={() => markContacted(c)} className="p-1.5 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 text-green-600" title="Mark contacted today">
                          <UserCheck className="w-4 h-4" />
                        </button>
                        <button onClick={() => openEdit(c)} className="p-1.5 rounded-lg hover:bg-brand-100 dark:hover:bg-brand-900/30 text-brand-600">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => deleteClient(c.id)} className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Client detail panel */}
      {viewClient && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="fixed inset-0 bg-black/30" onClick={() => setViewClient(null)} />
          <div className="relative w-full max-w-md bg-white dark:bg-[#2d1a2d] h-full shadow-2xl overflow-y-auto">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="section-title">{viewClient.name}</h2>
                <button onClick={() => setViewClient(null)} className="btn-ghost p-2"><X className="w-5 h-5" /></button>
              </div>
              {viewClient.email && <div className="flex items-center gap-2 text-sm"><Mail className="w-4 h-4 text-warm-400" /><a href={`mailto:${viewClient.email}`} className="text-brand-600 hover:underline">{viewClient.email}</a></div>}
              {viewClient.phone && <div className="flex items-center gap-2 text-sm"><Phone className="w-4 h-4 text-warm-400" />{viewClient.phone}</div>}
              {viewClient.address && <div className="flex items-start gap-2 text-sm"><span className="text-warm-400 mt-0.5">📍</span>{viewClient.address}</div>}

              {(JSON.parse(viewClient.tags || '[]') as string[]).length > 0 && (
                <div>
                  <p className="label flex items-center gap-1"><Tag className="w-3 h-3" />Tags</p>
                  <div className="flex flex-wrap gap-1.5">
                    {(JSON.parse(viewClient.tags || '[]') as string[]).map(t => (
                      <span key={t} className={`badge ${getTagColor(t)}`}>{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {viewClient.notes && (
                <div>
                  <p className="label">Notes</p>
                  <p className="text-sm text-warm-700 dark:text-warm-300 bg-warm-50 dark:bg-warm-900/20 rounded-lg p-3 whitespace-pre-wrap">{viewClient.notes}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="label flex items-center gap-1"><Calendar className="w-3 h-3" />Last Contacted</p>
                  <p className="text-warm-700 dark:text-warm-300">{viewClient.last_contacted ? formatDate(viewClient.last_contacted) : 'Never'}</p>
                </div>
                {viewClient.follow_up_date && (
                  <div>
                    <p className="label">Follow-up</p>
                    <p className="text-brand-600 dark:text-brand-400 font-medium">{formatDate(viewClient.follow_up_date)}</p>
                    {viewClient.follow_up_note && <p className="text-warm-500 text-xs">{viewClient.follow_up_note}</p>}
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <button onClick={() => { setViewClient(null); openEdit(viewClient); }} className="btn-primary flex-1 justify-center">
                  <Edit2 className="w-4 h-4" /> Edit
                </button>
                <button onClick={() => markContacted(viewClient)} className="btn-secondary flex-1 justify-center">
                  <UserCheck className="w-4 h-4" /> Mark Contacted
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-lg bg-white dark:bg-[#2d1a2d] rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="section-title">{editClient ? 'Edit Client' : 'Add Client'}</h2>
                <button onClick={() => setShowModal(false)} className="btn-ghost p-2"><X className="w-5 h-5" /></button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="label">Name *</label>
                  <input className="input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Full name" />
                </div>
                <div>
                  <label className="label">Email</label>
                  <input className="input" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="email@example.com" />
                </div>
                <div>
                  <label className="label">Phone</label>
                  <input className="input" type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="(555) 555-5555" />
                </div>
                <div className="col-span-2">
                  <label className="label">Address</label>
                  <input className="input" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} placeholder="Street, City, State" />
                </div>
                <div className="col-span-2">
                  <label className="label">Notes</label>
                  <textarea className="input" rows={3} value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Any notes about this customer…" />
                </div>
                <div className="col-span-2">
                  <label className="label">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {CLIENT_TAGS.map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => toggleTag(t)}
                        className={`badge cursor-pointer transition-all ${form.tags.includes(t) ? getTagColor(t) + ' ring-2 ring-offset-1 ring-current' : 'bg-warm-100 dark:bg-warm-900/30 text-warm-600 dark:text-warm-400'}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="label">Follow-up Date</label>
                  <input className="input" type="date" value={form.follow_up_date} onChange={e => setForm(f => ({ ...f, follow_up_date: e.target.value }))} />
                </div>
                <div>
                  <label className="label">Follow-up Note</label>
                  <input className="input" value={form.follow_up_note} onChange={e => setForm(f => ({ ...f, follow_up_note: e.target.value }))} placeholder="e.g. Send holiday catalog" />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowModal(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
                <button onClick={save} disabled={saving || !form.name.trim()} className="btn-primary flex-1 justify-center">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {editClient ? 'Update' : 'Add Client'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
