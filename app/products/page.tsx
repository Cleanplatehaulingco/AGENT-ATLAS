'use client';

import { useEffect, useState, useCallback } from 'react';
import { Plus, Edit2, Trash2, Loader2, X, Sparkles, TrendingUp, DollarSign } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface Product {
  id: number;
  name: string;
  category: string | null;
  color: string | null;
  materials: string | null;
  design_style: string | null;
  cost_to_make: number;
  time_to_make_minutes: number;
  current_price: number;
  inventory_count: number;
  platforms: string;
  description: string | null;
}

const CATEGORIES = ['Bracelet','Necklace','Earrings','Ring','Anklet','Set','Keychain','Gift Item','Home Decor','Other'];
const ALL_PLATFORMS = ['Etsy','South Lyon Market','Facebook Marketplace','Other'];
const DESIGN_STYLES = ['Boho','Gothic','Minimalist','Cottagecore','Witchy','Nature','Celestial','Vintage','Modern','Rustic','Colorful','Custom'];

const EMPTY_FORM = {
  name: '', category: 'Bracelet', color: '', materials: '', design_style: '',
  cost_to_make: '', current_price: '', time_to_make_minutes: '30',
  inventory_count: '0', platforms: [] as string[], description: '',
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  // AI pricing
  const [pricingProduct, setPricingProduct] = useState<Product | null>(null);
  const [timeMinutes, setTimeMinutes] = useState('30');
  const [pricingResult, setPricingResult] = useState('');
  const [pricingLoading, setPricingLoading] = useState(false);

  // Trends
  const [trends, setTrends] = useState('');
  const [trendsLoading, setTrendsLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  function openAdd() {
    setEditProduct(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  }

  function openEdit(p: Product) {
    setEditProduct(p);
    setForm({
      name: p.name,
      category: p.category || 'Other',
      color: p.color || '',
      materials: p.materials || '',
      design_style: p.design_style || '',
      cost_to_make: p.cost_to_make.toString(),
      current_price: p.current_price.toString(),
      time_to_make_minutes: (p.time_to_make_minutes || 30).toString(),
      inventory_count: p.inventory_count.toString(),
      platforms: JSON.parse(p.platforms || '[]'),
      description: p.description || '',
    });
    setShowModal(true);
  }

  async function save() {
    if (!form.name.trim()) return;
    setSaving(true);
    const body = {
      name: form.name,
      category: form.category,
      color: form.color || null,
      materials: form.materials || null,
      design_style: form.design_style || null,
      cost_to_make: parseFloat(form.cost_to_make) || 0,
      current_price: parseFloat(form.current_price) || 0,
      time_to_make_minutes: parseInt(form.time_to_make_minutes) || 0,
      inventory_count: parseInt(form.inventory_count) || 0,
      platforms: form.platforms,
      description: form.description,
    };
    if (editProduct) {
      await fetch('/api/products', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...body, id: editProduct.id }) });
    } else {
      await fetch('/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    }
    setSaving(false);
    setShowModal(false);
    fetchProducts();
  }

  async function deleteProduct(id: number) {
    if (!confirm('Delete this product?')) return;
    await fetch('/api/products?id=' + id, { method: 'DELETE' });
    fetchProducts();
  }

  function togglePlatform(p: string) {
    setForm(f => ({
      ...f,
      platforms: f.platforms.includes(p) ? f.platforms.filter(x => x !== p) : [...f.platforms, p],
    }));
  }

  async function analyzePrice(product: Product) {
    setPricingProduct(product);
    setPricingResult('');
    setPricingLoading(true);
    const res = await fetch('/api/ai/pricing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: product.name,
        category: product.category,
        cost_to_make: product.cost_to_make,
        time_minutes: timeMinutes,
        description: product.description,
        platforms: JSON.parse(product.platforms || '[]'),
      }),
    });
    const data = await res.json();
    setPricingResult(data.analysis || data.error || 'Error getting analysis');
    setPricingLoading(false);
  }

  async function fetchTrends() {
    setTrendsLoading(true);
    setTrends('');
    const res = await fetch('/api/ai/pricing');
    const data = await res.json();
    setTrends(data.trends || data.error || '');
    setTrendsLoading(false);
  }

  const marginPercent = (p: Product) => {
    if (!p.current_price) return 0;
    return Math.round(((p.current_price - p.cost_to_make) / p.current_price) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Product Analyzer</h1>
          <p className="text-warm-500 text-sm mt-1">{products.length} products in catalog</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={fetchTrends} disabled={trendsLoading} className="btn-secondary">
            {trendsLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <TrendingUp className="w-4 h-4" />}
            What&apos;s Trending
          </button>
          <button onClick={openAdd} className="btn-primary">
            <Plus className="w-4 h-4" />Add Product
          </button>
        </div>
      </div>

      {/* Trends panel */}
      {trends && (
        <div className="card bg-gradient-to-r from-gold-50 to-brand-50 dark:from-gold-950/20 dark:to-brand-950/20 border-gold-200 dark:border-gold-900/30">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-warm-900 dark:text-warm-100 mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-gold-500" />What&apos;s Trending Now
              </h3>
              <div className="text-sm text-warm-700 dark:text-warm-300 leading-relaxed whitespace-pre-wrap">{trends}</div>
            </div>
            <button onClick={() => setTrends('')} className="btn-ghost p-2 flex-shrink-0"><X className="w-4 h-4" /></button>
          </div>
        </div>
      )}

      {/* AI Pricing panel */}
      {pricingProduct && (
        <div className="card">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h3 className="font-semibold text-warm-900 dark:text-warm-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-500" />
              AI Pricing Analysis: {pricingProduct.name}
            </h3>
            <button onClick={() => setPricingProduct(null)} className="btn-ghost p-2 flex-shrink-0"><X className="w-4 h-4" /></button>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <label className="label mb-0 whitespace-nowrap">Time to make (min):</label>
            <input className="input w-24" type="number" value={timeMinutes} onChange={e => setTimeMinutes(e.target.value)} />
            <button onClick={() => analyzePrice(pricingProduct)} disabled={pricingLoading} className="btn-primary">
              {pricingLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {pricingResult ? 'Re-analyze' : 'Analyze Pricing'}
            </button>
          </div>
          {pricingLoading && (
            <div className="flex items-center gap-2 text-warm-400 text-sm">
              <Loader2 className="w-4 h-4 animate-spin" />Analyzing with Claude AI…
            </div>
          )}
          {pricingResult && (
            <div className="bg-brand-50 dark:bg-brand-950/20 rounded-xl p-4 text-sm text-warm-700 dark:text-warm-300 leading-relaxed whitespace-pre-wrap border border-brand-100 dark:border-brand-900/30">
              {pricingResult}
            </div>
          )}
        </div>
      )}

      {/* Product grid */}
      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-brand-500" /></div>
      ) : products.length === 0 ? (
        <div className="card text-center py-16">
          <p className="text-warm-400 mb-4">No products yet. Add your first product to the catalog!</p>
          <button onClick={openAdd} className="btn-primary mx-auto"><Plus className="w-4 h-4" />Add Product</button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map(p => {
            const margin = marginPercent(p);
            const parsedPlatforms: string[] = JSON.parse(p.platforms || '[]');
            return (
              <div key={p.id} className="card hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-warm-900 dark:text-warm-100 truncate">{p.name}</p>
                    {p.category && <p className="text-xs text-warm-400 mt-0.5">{p.category}</p>}
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg hover:bg-brand-100 dark:hover:bg-brand-900/30 text-brand-600"><Edit2 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => deleteProduct(p.id)} className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-warm-50 dark:bg-warm-900/20 rounded-lg p-2.5">
                    <p className="text-xs text-warm-400 mb-0.5">Cost to Make</p>
                    <p className="font-semibold text-warm-800 dark:text-warm-200">{formatCurrency(p.cost_to_make)}</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2.5">
                    <p className="text-xs text-warm-400 mb-0.5">Sale Price</p>
                    <p className="font-semibold text-green-700 dark:text-green-400">{formatCurrency(p.current_price)}</p>
                  </div>
                  <div className={`rounded-lg p-2.5 ${margin >= 50 ? 'bg-brand-50 dark:bg-brand-900/20' : margin >= 30 ? 'bg-gold-50 dark:bg-gold-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                    <p className="text-xs text-warm-400 mb-0.5">Margin</p>
                    <p className={`font-semibold ${margin >= 50 ? 'text-brand-700 dark:text-brand-400' : margin >= 30 ? 'text-gold-700 dark:text-gold-400' : 'text-red-600 dark:text-red-400'}`}>{margin}%</p>
                  </div>
                  <div className="bg-warm-50 dark:bg-warm-900/20 rounded-lg p-2.5">
                    <p className="text-xs text-warm-400 mb-0.5">In Stock</p>
                    <p className={`font-semibold ${p.inventory_count <= 2 ? 'text-red-600' : 'text-warm-800 dark:text-warm-200'}`}>{p.inventory_count}</p>
                  </div>
                </div>

                {parsedPlatforms.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {parsedPlatforms.map(pl => (
                      <span key={pl} className="badge bg-warm-100 dark:bg-warm-900/30 text-warm-600 dark:text-warm-400 text-xs">{pl}</span>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => analyzePrice(p)}
                  className="btn-secondary w-full justify-center text-sm py-2"
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  AI Price Analysis
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-lg bg-white dark:bg-[#2d1a2d] rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="section-title">{editProduct ? 'Edit Product' : 'Add Product'}</h2>
                <button onClick={() => setShowModal(false)} className="btn-ghost p-2"><X className="w-5 h-5" /></button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="label">Product Name *</label>
                  <input className="input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Amethyst Beaded Bracelet" />
                </div>
                <div>
                  <label className="label">Category</label>
                  <select className="input" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">Design Style</label>
                  <select className="input" value={form.design_style} onChange={e => setForm(f => ({ ...f, design_style: e.target.value }))}>
                    <option value="">— Select —</option>
                    {DESIGN_STYLES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">Color</label>
                  <input className="input" value={form.color} onChange={e => setForm(f => ({ ...f, color: e.target.value }))} placeholder="e.g. Purple, Multi, Black" />
                </div>
                <div>
                  <label className="label">Materials</label>
                  <input className="input" value={form.materials} onChange={e => setForm(f => ({ ...f, materials: e.target.value }))} placeholder="e.g. Amethyst, Sterling Silver" />
                </div>
                <div>
                  <label className="label">Cost to Make ($)</label>
                  <input className="input" type="number" min="0" step="0.01" placeholder="0.00" value={form.cost_to_make} onChange={e => setForm(f => ({ ...f, cost_to_make: e.target.value }))} />
                </div>
                <div>
                  <label className="label">Sale Price ($)</label>
                  <input className="input" type="number" min="0" step="0.01" placeholder="0.00" value={form.current_price} onChange={e => setForm(f => ({ ...f, current_price: e.target.value }))} />
                </div>
                <div>
                  <label className="label">Time to Make (min)</label>
                  <input className="input" type="number" min="0" value={form.time_to_make_minutes} onChange={e => setForm(f => ({ ...f, time_to_make_minutes: e.target.value }))} placeholder="30" />
                </div>
                <div>
                  <label className="label">Inventory Count</label>
                  <input className="input" type="number" min="0" value={form.inventory_count} onChange={e => setForm(f => ({ ...f, inventory_count: e.target.value }))} />
                </div>
                <div className="col-span-2">
                  <label className="label">Description</label>
                  <textarea className="input" rows={2} placeholder="Notes about this piece…" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
                </div>
                <div className="col-span-2">
                  <label className="label">Sold On</label>
                  <div className="flex flex-wrap gap-2">
                    {ALL_PLATFORMS.map(pl => (
                      <button
                        key={pl}
                        type="button"
                        onClick={() => togglePlatform(pl)}
                        className={`badge cursor-pointer transition-all ${form.platforms.includes(pl) ? 'bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 ring-2 ring-brand-400 ring-offset-1' : 'bg-warm-100 dark:bg-warm-900/30 text-warm-600 dark:text-warm-400'}`}
                      >
                        {pl}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {form.cost_to_make && form.current_price && (
                <div className="bg-brand-50 dark:bg-brand-950/20 rounded-lg p-3 text-sm">
                  <p className="text-warm-600 dark:text-warm-400">
                    Profit: <strong className="text-warm-900 dark:text-warm-100">{formatCurrency(parseFloat(form.current_price) - parseFloat(form.cost_to_make))}</strong>
                    {' '}· Margin: <strong>{Math.round(((parseFloat(form.current_price) - parseFloat(form.cost_to_make)) / parseFloat(form.current_price)) * 100)}%</strong>
                  </p>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowModal(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
                <button onClick={save} disabled={saving || !form.name.trim()} className="btn-primary flex-1 justify-center">
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editProduct ? 'Update' : 'Add Product'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
