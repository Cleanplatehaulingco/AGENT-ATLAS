'use client';

import { useEffect, useState, useCallback } from 'react';
import { Plus, Trash2, Edit2, Loader2, X, Camera, Search } from 'lucide-react';
import { formatCurrency, formatDate, getPlatformColor, PLATFORMS, PAYMENT_METHODS } from '@/lib/utils';

interface SaleItem { name: string; quantity: number; price: number; }
interface Sale {
  id: number;
  date: string;
  client_id: number | null;
  client_name: string | null;
  items: string;
  subtotal: number;
  total: number;
  payment_method: string | null;
  platform: string;
  notes: string | null;
}
interface Client { id: number; name: string; email: string | null; }

const platformKey: Record<string, string> = {
  'Etsy': 'etsy',
  'South Lyon Market': 'market',
  'Facebook Marketplace': 'facebook',
  'Other': 'other',
};

const EMPTY_ITEM: SaleItem = { name: '', quantity: 1, price: 0 };

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editSale, setEditSale] = useState<Sale | null>(null);
  const [search, setSearch] = useState('');
  const [filterPlatform, setFilterPlatform] = useState('');

  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    client_id: '',
    client_name: '',
    items: [{ ...EMPTY_ITEM }] as SaleItem[],
    payment_method: 'Cash',
    platform: 'market',
    notes: '',
  });
  const [saving, setSaving] = useState(false);

  const fetchSales = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filterPlatform) params.set('platform', filterPlatform);
    const res = await fetch('/api/sales?' + params.toString());
    const data = await res.json();
    setSales(Array.isArray(data) ? data : []);
    setLoading(false);
  }, [filterPlatform]);

  useEffect(() => {
    fetchSales();
    fetch('/api/clients').then(r => r.json()).then(d => setClients(Array.isArray(d) ? d : []));
  }, [fetchSales]);

  const subtotal = form.items.reduce((s, i) => s + i.quantity * i.price, 0);

  function openAdd() {
    setEditSale(null);
    setForm({
      date: new Date().toISOString().split('T')[0],
      client_id: '', client_name: '',
      items: [{ ...EMPTY_ITEM }],
      payment_method: 'Cash', platform: 'market', notes: '',
    });
    setShowModal(true);
  }

  function openEdit(s: Sale) {
    setEditSale(s);
    setForm({
      date: s.date,
      client_id: s.client_id?.toString() || '',
      client_name: s.client_name || '',
      items: JSON.parse(s.items || '[]'),
      payment_method: s.payment_method || 'Cash',
      platform: s.platform,
      notes: s.notes || '',
    });
    setShowModal(true);
  }

  function updateItem(idx: number, field: keyof SaleItem, value: string | number) {
    setForm(f => {
      const items = [...f.items];
      items[idx] = { ...items[idx], [field]: field === 'name' ? value : Number(value) };
      return { ...f, items };
    });
  }

  function addItem() { setForm(f => ({ ...f, items: [...f.items, { ...EMPTY_ITEM }] })); }
  function removeItem(idx: number) { setForm(f => ({ ...f, items: f.items.filter((_, i) => i !== idx) })); }

  async function save() {
    setSaving(true);
    const validItems = form.items.filter(i => i.name.trim());
    const body = {
      ...form,
      client_id: form.client_id ? parseInt(form.client_id) : null,
      items: validItems,
      subtotal,
      total: subtotal,
    };
    if (editSale) {
      await fetch('/api/sales', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...body, id: editSale.id }) });
    } else {
      await fetch('/api/sales', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    }
    setSaving(false);
    setShowModal(false);
    fetchSales();
  }

  async function deleteSale(id: number) {
    if (!confirm('Delete this sale?')) return;
    await fetch('/api/sales?id=' + id, { method: 'DELETE' });
    fetchSales();
  }

  const filteredSales = sales.filter(s => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (s.client_name || '').toLowerCase().includes(q) ||
      s.platform.toLowerCase().includes(q) ||
      (s.notes || '').toLowerCase().includes(q) ||
      s.items.toLowerCase().includes(q);
  });

  const totalRevenue = filteredSales.reduce((s, sale) => s + sale.total, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Sales Log</h1>
          <p className="text-warm-500 text-sm mt-1">{filteredSales.length} records · {formatCurrency(totalRevenue)} total</p>
        </div>
        <button onClick={openAdd} className="btn-primary">
          <Plus className="w-4 h-4" /> Log Sale
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400" />
          <input className="input pl-9" placeholder="Search sales…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="input w-auto" value={filterPlatform} onChange={e => setFilterPlatform(e.target.value)}>
          <option value="">All Platforms</option>
          {Object.entries(platformKey).map(([label, val]) => <option key={val} value={val}>{label}</option>)}
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-brand-500" /></div>
      ) : filteredSales.length === 0 ? (
        <div className="card text-center py-16">
          <p className="text-warm-400 mb-4">No sales logged yet.</p>
          <button onClick={openAdd} className="btn-primary mx-auto"><Plus className="w-4 h-4" />Log First Sale</button>
        </div>
      ) : (
        <div className="card p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-warm-50 dark:bg-warm-900/20 border-b border-warm-100 dark:border-warm-900/50">
                <tr>
                  <th className="table-header text-left px-4 py-3">Date</th>
                  <th className="table-header text-left px-4 py-3">Customer</th>
                  <th className="table-header text-left px-4 py-3 hidden sm:table-cell">Platform</th>
                  <th className="table-header text-left px-4 py-3 hidden md:table-cell">Items</th>
                  <th className="table-header text-left px-4 py-3 hidden md:table-cell">Payment</th>
                  <th className="table-header text-right px-4 py-3">Total</th>
                  <th className="table-header px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-warm-100 dark:divide-warm-900/30">
                {filteredSales.map(s => {
                  const items: SaleItem[] = JSON.parse(s.items || '[]');
                  return (
                    <tr key={s.id} className="hover:bg-warm-50 dark:hover:bg-warm-900/10 transition-colors">
                      <td className="px-4 py-3 text-sm text-warm-700 dark:text-warm-300 whitespace-nowrap">{formatDate(s.date)}</td>
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-warm-900 dark:text-warm-100">{s.client_name || <span className="text-warm-400 italic">Walk-in</span>}</p>
                        <p className="text-xs text-warm-400 sm:hidden">{s.platform}</p>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span className={`badge ${getPlatformColor(s.platform)}`}>
                          {s.platform === 'market' ? 'Market' : s.platform === 'etsy' ? 'Etsy' : s.platform === 'facebook' ? 'Facebook' : 'Other'}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <p className="text-xs text-warm-600 dark:text-warm-400 max-w-[200px] truncate">
                          {items.map(i => `${i.name} ×${i.quantity}`).join(', ') || '—'}
                        </p>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell text-xs text-warm-500 dark:text-warm-400">{s.payment_method}</td>
                      <td className="px-4 py-3 text-right font-semibold text-warm-900 dark:text-warm-100 whitespace-nowrap">{formatCurrency(s.total)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 justify-end">
                          <button onClick={() => openEdit(s)} className="p-1.5 rounded-lg hover:bg-brand-100 dark:hover:bg-brand-900/30 text-brand-600"><Edit2 className="w-4 h-4" /></button>
                          <button onClick={() => deleteSale(s.id)} className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-warm-50 dark:bg-warm-900/20 border-t border-warm-200 dark:border-warm-900/50">
                <tr>
                  <td colSpan={5} className="px-4 py-3 text-sm font-semibold text-warm-700 dark:text-warm-300 text-right hidden md:table-cell">Total:</td>
                  <td colSpan={3} className="px-4 py-3 text-sm font-semibold text-warm-700 dark:text-warm-300 text-right md:hidden">Total:</td>
                  <td className="px-4 py-3 text-right font-bold text-warm-900 dark:text-warm-100">{formatCurrency(totalRevenue)}</td>
                  <td />
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-2xl bg-white dark:bg-[#2d1a2d] rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="section-title">{editSale ? 'Edit Sale' : 'Log Sale'}</h2>
                <button onClick={() => setShowModal(false)} className="btn-ghost p-2"><X className="w-5 h-5" /></button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Date *</label>
                  <input className="input" type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
                </div>
                <div>
                  <label className="label">Platform</label>
                  <select className="input" value={form.platform} onChange={e => setForm(f => ({ ...f, platform: e.target.value }))}>
                    {Object.entries(platformKey).map(([label, val]) => <option key={val} value={val}>{label}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="label">Customer</label>
                  <div className="flex gap-2">
                    <select className="input flex-1" value={form.client_id} onChange={e => {
                      const id = e.target.value;
                      const client = clients.find(c => c.id.toString() === id);
                      setForm(f => ({ ...f, client_id: id, client_name: client?.name || '' }));
                    }}>
                      <option value="">Walk-in / No account</option>
                      {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                    {!form.client_id && (
                      <input className="input flex-1" placeholder="Or type name" value={form.client_name} onChange={e => setForm(f => ({ ...f, client_name: e.target.value }))} />
                    )}
                  </div>
                </div>
              </div>

              {/* Items */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="label mb-0">Items Sold</label>
                  <button onClick={addItem} className="text-xs text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1">
                    <Plus className="w-3 h-3" />Add Item
                  </button>
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-12 gap-2 text-xs text-warm-400 font-medium px-1">
                    <span className="col-span-6">Item Name</span>
                    <span className="col-span-2">Qty</span>
                    <span className="col-span-3">Price</span>
                    <span className="col-span-1"></span>
                  </div>
                  {form.items.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                      <input className="input col-span-6 text-sm" placeholder="Item name" value={item.name} onChange={e => updateItem(idx, 'name', e.target.value)} />
                      <input className="input col-span-2 text-sm" type="number" min="1" value={item.quantity} onChange={e => updateItem(idx, 'quantity', e.target.value)} />
                      <input className="input col-span-3 text-sm" type="number" min="0" step="0.01" placeholder="0.00" value={item.price || ''} onChange={e => updateItem(idx, 'price', e.target.value)} />
                      <button onClick={() => removeItem(idx)} className="col-span-1 p-1 rounded hover:bg-red-100 text-red-400 flex items-center justify-center">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-2">
                  <p className="text-sm font-semibold text-warm-900 dark:text-warm-100">Subtotal: {formatCurrency(subtotal)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Payment Method</label>
                  <select className="input" value={form.payment_method} onChange={e => setForm(f => ({ ...f, payment_method: e.target.value }))}>
                    {PAYMENT_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">Notes</label>
                  <input className="input" placeholder="Any notes…" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
                </div>
              </div>

              {/* Receipt photo placeholder */}
              <div className="border-2 border-dashed border-warm-200 dark:border-warm-700 rounded-xl p-6 text-center">
                <Camera className="w-8 h-8 text-warm-300 mx-auto mb-2" />
                <p className="text-sm text-warm-400">Receipt photo upload</p>
                <p className="text-xs text-warm-300 mt-1">Photo storage coming soon</p>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowModal(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
                <button onClick={save} disabled={saving} className="btn-primary flex-1 justify-center">
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editSale ? 'Update Sale' : 'Log Sale'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
