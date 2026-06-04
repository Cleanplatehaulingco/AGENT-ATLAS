'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, Legend,
} from 'recharts';
import {
  TrendingUp, Sparkles, AlertTriangle, Package, Users,
  Loader2, RefreshCw, ChevronUp, ChevronDown, Minus,
  Crown, Flame, Zap, Eye, DollarSign,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

// ── Raven color palette ────────────────────────────────────────────────────────
const RAVEN_COLORS = ['#7c3aed','#a855f7','#c084fc','#e9d5ff','#f59e0b','#fbbf24','#fde68a','#10b981','#6366f1','#ec4899'];
const PLATFORM_COLORS: Record<string, string> = {
  etsy: '#f27c2e',
  'south lyon market': '#7c3aed',
  'facebook marketplace': '#1877f2',
  other: '#6b7280',
};

interface AnalyticsData {
  year: string;
  summary: {
    total_revenue: number;
    total_units: number;
    total_sales: number;
    avg_order_value: number;
    best_selling_day: string | null;
  };
  products: ProductStat[];
  colors: { color: string; units: number; revenue: number }[];
  materials: { material: string; units: number; revenue: number }[];
  styles: { style: string; units: number; revenue: number }[];
  categories: { category: string; units: number; revenue: number }[];
  platforms: { platform: string; units: number; revenue: number; sales: number }[];
  days_of_week: Record<string, { units: number; revenue: number; sales: number }>;
  monthly: Record<string, { revenue: number; sales: number }>;
  price_ranges: { range: string; units: number; revenue: number }[];
  dead_stock: { id: number; name: string; category: string | null; inventory_count: number }[];
  low_inventory: { id: number; name: string; inventory_count: number }[];
  repeat_customers: { name: string; count: number; revenue: number }[];
}

interface ProductStat {
  product_id: number | null;
  product_name: string;
  category: string | null;
  color: string | null;
  materials: string | null;
  design_style: string | null;
  total_units: number;
  total_revenue: number;
  sale_count: number;
  platforms: Record<string, number>;
  margin_pct: number;
  profit_per_unit: number;
  total_profit: number;
  revenue_per_hour: number | null;
  velocity: number;
  last_sold: string | null;
}

const DOW_ORDER = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

// ── Stat card ──────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, icon: Icon, accent = false }: {
  label: string; value: string; sub?: string; icon: React.ElementType; accent?: boolean;
}) {
  return (
    <div className={`rounded-2xl p-5 border ${accent
      ? 'bg-gradient-to-br from-violet-900/40 to-purple-950/60 border-violet-700/40'
      : 'bg-[#1a0a2e]/60 border-violet-900/30'} backdrop-blur-sm`}>
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-medium text-violet-300/70 uppercase tracking-widest">{label}</span>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${accent ? 'bg-amber-500/20' : 'bg-violet-800/40'}`}>
          <Icon className={`w-4 h-4 ${accent ? 'text-amber-400' : 'text-violet-400'}`} />
        </div>
      </div>
      <p className={`text-2xl font-bold ${accent ? 'text-amber-300' : 'text-white'}`}>{value}</p>
      {sub && <p className="text-xs text-violet-400/60 mt-1">{sub}</p>}
    </div>
  );
}

// ── Product rank badge ─────────────────────────────────────────────────────────
function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return <span className="flex items-center gap-1 text-amber-400 font-bold text-sm"><Crown className="w-4 h-4" />#1</span>;
  if (rank === 2) return <span className="text-violet-300 font-semibold text-sm">#2</span>;
  if (rank === 3) return <span className="text-amber-600/80 font-semibold text-sm">#3</span>;
  return <span className="text-violet-500/60 text-sm">#{rank}</span>;
}

// ── Velocity indicator ─────────────────────────────────────────────────────────
function VelocityBadge({ v }: { v: number }) {
  if (v >= 5) return <span className="flex items-center gap-1 text-emerald-400 text-xs font-medium"><Flame className="w-3 h-3" />Hot</span>;
  if (v >= 2) return <span className="flex items-center gap-1 text-amber-400 text-xs font-medium"><Zap className="w-3 h-3" />Active</span>;
  if (v > 0) return <span className="text-violet-400/60 text-xs">Slow</span>;
  return <span className="text-red-500/70 text-xs">Stalled</span>;
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [sortBy, setSortBy] = useState<'revenue' | 'units' | 'margin' | 'velocity'>('revenue');
  const [sortDir, setSortDir] = useState<'desc' | 'asc'>('desc');
  const [insightLoading, setInsightLoading] = useState(false);
  const [insight, setInsight] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'attributes' | 'performance'>('products');

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/analytics?year=${year}`);
    const json = await res.json();
    setData(json);
    setLoading(false);
  }, [year]);

  useEffect(() => { fetchData(); }, [fetchData]);

  async function getInsights() {
    if (!data) return;
    setInsightLoading(true);
    setInsight('');
    const res = await fetch('/api/ai/insights', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    setInsight(json.report || json.error || '');
    setInsightLoading(false);
  }

  function toggleSort(field: typeof sortBy) {
    if (sortBy === field) setSortDir(d => d === 'desc' ? 'asc' : 'desc');
    else { setSortBy(field); setSortDir('desc'); }
  }

  const sortedProducts = data?.products ? [...data.products].sort((a, b) => {
    const val = (p: ProductStat) => {
      if (sortBy === 'revenue') return p.total_revenue;
      if (sortBy === 'units') return p.total_units;
      if (sortBy === 'margin') return p.margin_pct;
      return p.velocity;
    };
    return sortDir === 'desc' ? val(b) - val(a) : val(a) - val(b);
  }) : [];

  const dowData = DOW_ORDER.map(day => ({
    day: day.slice(0, 3),
    revenue: data?.days_of_week?.[day]?.revenue || 0,
    sales: data?.days_of_week?.[day]?.sales || 0,
  }));

  const monthData = Object.entries(data?.monthly || {})
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, v]) => ({
      month: new Date(month + '-15').toLocaleString('default', { month: 'short' }),
      revenue: v.revenue,
      sales: v.sales,
    }));

  const SortIcon = ({ field }: { field: typeof sortBy }) => {
    if (sortBy !== field) return <Minus className="w-3 h-3 text-violet-600" />;
    return sortDir === 'desc' ? <ChevronDown className="w-3 h-3 text-amber-400" /> : <ChevronUp className="w-3 h-3 text-amber-400" />;
  };

  const years = Array.from({ length: 4 }, (_, i) => (new Date().getFullYear() - i).toString());

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0d0520 0%, #1a0a2e 50%, #0d0520 100%)' }}>
      {/* Raven header */}
      <div className="relative overflow-hidden border-b border-violet-900/40 bg-gradient-to-r from-violet-950/80 via-purple-950/60 to-violet-950/80 backdrop-blur-sm">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M30 5 L35 20 L50 20 L38 29 L42 44 L30 35 L18 44 L22 29 L10 20 L25 20Z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="relative px-6 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-purple-900 flex items-center justify-center shadow-lg shadow-violet-900/50">
                <Eye className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Intelligence Report</h1>
                <p className="text-violet-400/70 text-xs tracking-widest uppercase">Raven&apos;s Baubles & Gifts · Product Analytics</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={year}
              onChange={e => setYear(e.target.value)}
              className="bg-violet-950/60 border border-violet-700/40 text-violet-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
            <button onClick={fetchData} className="p-2 rounded-lg bg-violet-800/30 border border-violet-700/40 text-violet-300 hover:bg-violet-700/40 transition-colors">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={getInsights}
              disabled={insightLoading || !data}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-sm transition-all shadow-lg shadow-amber-900/40 disabled:opacity-50"
            >
              {insightLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              AI Intelligence Report
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-6 space-y-6 max-w-7xl mx-auto">

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-violet-800/30 flex items-center justify-center">
                <Loader2 className="w-7 h-7 animate-spin text-violet-400" />
              </div>
              <p className="text-violet-400/60 text-sm">Gathering your data…</p>
            </div>
          </div>
        ) : (
          <>
            {/* Summary cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Total Revenue" value={formatCurrency(data?.summary.total_revenue || 0)} icon={DollarSign} accent />
              <StatCard label="Units Sold" value={(data?.summary.total_units || 0).toString()} sub={`${data?.summary.total_sales || 0} transactions`} icon={Package} />
              <StatCard label="Avg Order" value={formatCurrency(data?.summary.avg_order_value || 0)} icon={TrendingUp} />
              <StatCard label="Best Day" value={data?.summary.best_selling_day || '—'} sub="by revenue" icon={Crown} />
            </div>

            {/* Alerts row */}
            {((data?.dead_stock?.length ?? 0) > 0 || (data?.low_inventory?.length ?? 0) > 0) && (
              <div className="grid sm:grid-cols-2 gap-4">
                {(data?.dead_stock?.length ?? 0) > 0 && (
                  <div className="rounded-2xl border border-red-800/40 bg-red-950/20 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                      <span className="text-red-300 font-semibold text-sm">Dead Stock — Not Selling</span>
                    </div>
                    <div className="space-y-2">
                      {data?.dead_stock.slice(0, 4).map(p => (
                        <div key={p.id} className="flex items-center justify-between text-sm">
                          <span className="text-red-200/70">{p.name}</span>
                          <span className="text-red-400/60">{p.inventory_count} in stock</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {(data?.low_inventory?.length ?? 0) > 0 && (
                  <div className="rounded-2xl border border-amber-800/40 bg-amber-950/20 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Package className="w-4 h-4 text-amber-400" />
                      <span className="text-amber-300 font-semibold text-sm">Low Stock — Restock Soon</span>
                    </div>
                    <div className="space-y-2">
                      {data?.low_inventory.slice(0, 4).map(p => (
                        <div key={p.id} className="flex items-center justify-between text-sm">
                          <span className="text-amber-200/70">{p.name}</span>
                          <span className="text-amber-400">{p.inventory_count} left</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* AI Insight Report */}
            {insight && (
              <div className="rounded-2xl border border-amber-700/40 bg-gradient-to-br from-amber-950/30 to-violet-950/40 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <h2 className="text-amber-300 font-bold text-lg">AI Business Intelligence Report</h2>
                </div>
                <div className="text-sm text-violet-100/80 leading-relaxed whitespace-pre-wrap prose prose-invert max-w-none">
                  {insight}
                </div>
              </div>
            )}

            {/* Tab nav */}
            <div className="flex gap-1 p-1 rounded-xl bg-violet-950/40 border border-violet-900/30 w-fit">
              {(['products', 'attributes', 'performance'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === tab
                    ? 'bg-violet-700/60 text-white shadow'
                    : 'text-violet-400/60 hover:text-violet-300'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* ── Products Tab ── */}
            {activeTab === 'products' && (
              <div className="rounded-2xl border border-violet-900/30 bg-[#1a0a2e]/60 backdrop-blur-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-violet-900/30 flex items-center justify-between">
                  <h2 className="font-bold text-white flex items-center gap-2">
                    <Crown className="w-5 h-5 text-amber-400" />Product Performance Leaderboard
                  </h2>
                  <span className="text-violet-400/60 text-xs">{sortedProducts.length} products</span>
                </div>
                {sortedProducts.length === 0 ? (
                  <div className="py-16 text-center text-violet-400/50 text-sm">
                    No sales data yet. Log sales with items to see product performance.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-violet-900/30">
                          <th className="text-left px-6 py-3 text-violet-400/50 font-medium text-xs uppercase tracking-widest w-8">#</th>
                          <th className="text-left px-3 py-3 text-violet-400/50 font-medium text-xs uppercase tracking-widest">Product</th>
                          <th className="text-left px-3 py-3 text-violet-400/50 font-medium text-xs uppercase tracking-widest">Attributes</th>
                          <th
                            className="text-right px-3 py-3 text-violet-400/50 font-medium text-xs uppercase tracking-widest cursor-pointer hover:text-violet-300 select-none"
                            onClick={() => toggleSort('revenue')}
                          >
                            <span className="flex items-center gap-1 justify-end">Revenue <SortIcon field="revenue" /></span>
                          </th>
                          <th
                            className="text-right px-3 py-3 text-violet-400/50 font-medium text-xs uppercase tracking-widest cursor-pointer hover:text-violet-300 select-none"
                            onClick={() => toggleSort('units')}
                          >
                            <span className="flex items-center gap-1 justify-end">Units <SortIcon field="units" /></span>
                          </th>
                          <th
                            className="text-right px-3 py-3 text-violet-400/50 font-medium text-xs uppercase tracking-widest cursor-pointer hover:text-violet-300 select-none"
                            onClick={() => toggleSort('margin')}
                          >
                            <span className="flex items-center gap-1 justify-end">Margin <SortIcon field="margin" /></span>
                          </th>
                          <th
                            className="text-right px-3 py-3 text-violet-400/50 font-medium text-xs uppercase tracking-widest cursor-pointer hover:text-violet-300 select-none"
                            onClick={() => toggleSort('velocity')}
                          >
                            <span className="flex items-center gap-1 justify-end">Velocity <SortIcon field="velocity" /></span>
                          </th>
                          <th className="text-left px-6 py-3 text-violet-400/50 font-medium text-xs uppercase tracking-widest">Platforms</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedProducts.map((p, i) => {
                          const rank = sortedProducts.indexOf(p) + 1;
                          return (
                            <tr key={p.product_id ?? p.product_name} className={`border-b border-violet-900/20 transition-colors hover:bg-violet-900/10 ${rank === 1 ? 'bg-amber-950/10' : ''}`}>
                              <td className="px-6 py-4"><RankBadge rank={rank} /></td>
                              <td className="px-3 py-4">
                                <p className="font-medium text-white">{p.product_name}</p>
                                {p.category && <p className="text-violet-400/50 text-xs mt-0.5">{p.category}</p>}
                              </td>
                              <td className="px-3 py-4">
                                <div className="flex flex-wrap gap-1">
                                  {p.color && <span className="px-2 py-0.5 rounded-full bg-violet-800/40 text-violet-300 text-xs">{p.color}</span>}
                                  {p.design_style && <span className="px-2 py-0.5 rounded-full bg-amber-900/30 text-amber-300/80 text-xs">{p.design_style}</span>}
                                  {p.materials && <span className="px-2 py-0.5 rounded-full bg-indigo-900/30 text-indigo-300/80 text-xs">{p.materials}</span>}
                                </div>
                              </td>
                              <td className="px-3 py-4 text-right">
                                <p className="font-semibold text-emerald-400">{formatCurrency(p.total_revenue)}</p>
                                <p className="text-violet-400/50 text-xs">{formatCurrency(p.profit_per_unit)} profit/unit</p>
                              </td>
                              <td className="px-3 py-4 text-right">
                                <p className="text-white font-medium">{p.total_units}</p>
                                <p className="text-violet-400/50 text-xs">{p.sale_count} txns</p>
                              </td>
                              <td className="px-3 py-4 text-right">
                                <span className={`font-semibold ${p.margin_pct >= 60 ? 'text-emerald-400' : p.margin_pct >= 40 ? 'text-amber-400' : 'text-red-400'}`}>
                                  {p.margin_pct}%
                                </span>
                              </td>
                              <td className="px-3 py-4 text-right">
                                <div className="flex flex-col items-end gap-1">
                                  <VelocityBadge v={p.velocity} />
                                  <span className="text-violet-400/50 text-xs">{p.velocity}/mo</span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex flex-wrap gap-1">
                                  {Object.entries(p.platforms).map(([plat, qty]) => (
                                    <span
                                      key={plat}
                                      className="px-2 py-0.5 rounded-full text-xs font-medium text-white"
                                      style={{ backgroundColor: (PLATFORM_COLORS[plat.toLowerCase()] || '#6b7280') + '40', border: `1px solid ${PLATFORM_COLORS[plat.toLowerCase()] || '#6b7280'}60` }}
                                    >
                                      {plat.split(' ')[0]} ×{qty}
                                    </span>
                                  ))}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* ── Attributes Tab ── */}
            {activeTab === 'attributes' && (
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Color performance */}
                <div className="rounded-2xl border border-violet-900/30 bg-[#1a0a2e]/60 p-5">
                  <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-violet-500 inline-block" />
                    Color Performance
                  </h3>
                  {(data?.colors?.length ?? 0) === 0 ? (
                    <p className="text-violet-400/50 text-sm">Add colors to your products to track color performance.</p>
                  ) : (
                    <div className="space-y-3">
                      {data?.colors.slice(0, 8).map((c, i) => {
                        const maxUnits = data.colors[0]?.units || 1;
                        return (
                          <div key={c.color}>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-violet-200 capitalize font-medium">{c.color}</span>
                              <span className="text-violet-400/60">{c.units} units · {formatCurrency(c.revenue)}</span>
                            </div>
                            <div className="h-2 rounded-full bg-violet-950/60 overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all"
                                style={{ width: `${(c.units / maxUnits) * 100}%`, backgroundColor: RAVEN_COLORS[i % RAVEN_COLORS.length] }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Materials */}
                <div className="rounded-2xl border border-violet-900/30 bg-[#1a0a2e]/60 p-5">
                  <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                    Material Performance
                  </h3>
                  {(data?.materials?.length ?? 0) === 0 ? (
                    <p className="text-violet-400/50 text-sm">Add materials (comma-separated) to products to track what sells.</p>
                  ) : (
                    <div className="space-y-3">
                      {data?.materials.slice(0, 8).map((m, i) => {
                        const maxUnits = data.materials[0]?.units || 1;
                        return (
                          <div key={m.material}>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-violet-200 capitalize font-medium">{m.material}</span>
                              <span className="text-violet-400/60">{m.units} units · {formatCurrency(m.revenue)}</span>
                            </div>
                            <div className="h-2 rounded-full bg-violet-950/60 overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{ width: `${(m.units / maxUnits) * 100}%`, backgroundColor: RAVEN_COLORS[(i + 4) % RAVEN_COLORS.length] }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Design styles */}
                <div className="rounded-2xl border border-violet-900/30 bg-[#1a0a2e]/60 p-5">
                  <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-pink-500 inline-block" />
                    Design Style
                  </h3>
                  {(data?.styles?.length ?? 0) === 0 ? (
                    <p className="text-violet-400/50 text-sm">Add design styles to products (e.g. "Boho", "Gothic", "Minimalist") to track what resonates.</p>
                  ) : (
                    <>
                      <ResponsiveContainer width="100%" height={180}>
                        <PieChart>
                          <Pie data={data?.styles} dataKey="units" nameKey="style" cx="50%" cy="50%" outerRadius={70} label={({ style, percent }) => `${style} ${(percent * 100).toFixed(0)}%`} labelLine={false} fontSize={10}>
                            {data?.styles.map((_, i) => (
                              <Cell key={i} fill={RAVEN_COLORS[i % RAVEN_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(v) => [`${v} units`]} contentStyle={{ background: '#1a0a2e', border: '1px solid #4c1d95', borderRadius: 8, color: '#e9d5ff' }} />
                        </PieChart>
                      </ResponsiveContainer>
                    </>
                  )}
                </div>

                {/* Category breakdown */}
                <div className="rounded-2xl border border-violet-900/30 bg-[#1a0a2e]/60 p-5 lg:col-span-2">
                  <h3 className="font-bold text-white mb-4">Revenue by Category</h3>
                  {(data?.categories?.length ?? 0) === 0 ? (
                    <p className="text-violet-400/50 text-sm">No category data yet.</p>
                  ) : (
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={data?.categories} barSize={32}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2d1a4e" />
                        <XAxis dataKey="category" tick={{ fill: '#a78bfa', fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: '#7c3aed', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
                        <Tooltip contentStyle={{ background: '#1a0a2e', border: '1px solid #4c1d95', borderRadius: 8, color: '#e9d5ff' }} formatter={(v) => [formatCurrency(Number(v))]} />
                        <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
                          {data?.categories.map((_, i) => <Cell key={i} fill={RAVEN_COLORS[i % RAVEN_COLORS.length]} />)}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>

                {/* Price range */}
                <div className="rounded-2xl border border-violet-900/30 bg-[#1a0a2e]/60 p-5">
                  <h3 className="font-bold text-white mb-4">Price Sweet Spots</h3>
                  <div className="space-y-3">
                    {data?.price_ranges.map((r, i) => {
                      const maxUnits = Math.max(...(data?.price_ranges.map(x => x.units) || [1]));
                      return (
                        <div key={r.range}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-violet-200 font-medium">{r.range}</span>
                            <span className="text-violet-400/60">{r.units} units</span>
                          </div>
                          <div className="h-2 rounded-full bg-violet-950/60 overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{ width: maxUnits > 0 ? `${(r.units / maxUnits) * 100}%` : '0%', backgroundColor: RAVEN_COLORS[i % RAVEN_COLORS.length] }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ── Performance Tab ── */}
            {activeTab === 'performance' && (
              <div className="space-y-6">
                {/* Day of week chart */}
                <div className="rounded-2xl border border-violet-900/30 bg-[#1a0a2e]/60 p-5">
                  <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                    <Flame className="w-5 h-5 text-amber-400" />Sales by Day of Week
                    {data?.summary.best_selling_day && (
                      <span className="ml-2 px-2 py-0.5 rounded-full bg-amber-900/40 text-amber-300 text-xs">
                        Best: {data.summary.best_selling_day}
                      </span>
                    )}
                  </h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={dowData} barSize={36}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#2d1a4e" />
                      <XAxis dataKey="day" tick={{ fill: '#a78bfa', fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: '#7c3aed', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
                      <Tooltip contentStyle={{ background: '#1a0a2e', border: '1px solid #4c1d95', borderRadius: 8, color: '#e9d5ff' }} formatter={v => [formatCurrency(Number(v)), 'Revenue']} />
                      <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
                        {dowData.map((d, i) => (
                          <Cell key={i} fill={d.day === data?.summary.best_selling_day?.slice(0, 3) ? '#f59e0b' : '#7c3aed'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Monthly revenue */}
                <div className="rounded-2xl border border-violet-900/30 bg-[#1a0a2e]/60 p-5">
                  <h3 className="font-bold text-white mb-4">Monthly Revenue — {year}</h3>
                  {monthData.length === 0 ? (
                    <p className="text-violet-400/50 text-sm py-8 text-center">No sales data for {year} yet.</p>
                  ) : (
                    <ResponsiveContainer width="100%" height={220}>
                      <BarChart data={monthData} barSize={28}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2d1a4e" />
                        <XAxis dataKey="month" tick={{ fill: '#a78bfa', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: '#7c3aed', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
                        <Tooltip contentStyle={{ background: '#1a0a2e', border: '1px solid #4c1d95', borderRadius: 8, color: '#e9d5ff' }} formatter={v => [formatCurrency(Number(v)), 'Revenue']} />
                        <Bar dataKey="revenue" fill="#7c3aed" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>

                {/* Platform radar */}
                {(data?.platforms?.length ?? 0) > 1 && (
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="rounded-2xl border border-violet-900/30 bg-[#1a0a2e]/60 p-5">
                      <h3 className="font-bold text-white mb-4">Platform Comparison</h3>
                      <ResponsiveContainer width="100%" height={220}>
                        <RadarChart data={data?.platforms.map(p => ({ subject: p.platform.split(' ')[0], Revenue: p.revenue, Units: p.units * 10 }))}>
                          <PolarGrid stroke="#2d1a4e" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: '#a78bfa', fontSize: 11 }} />
                          <Radar name="Revenue" dataKey="Revenue" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} />
                          <Radar name="Units×10" dataKey="Units" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.2} />
                          <Legend wrapperStyle={{ color: '#a78bfa', fontSize: 11 }} />
                          <Tooltip contentStyle={{ background: '#1a0a2e', border: '1px solid #4c1d95', borderRadius: 8, color: '#e9d5ff' }} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="rounded-2xl border border-violet-900/30 bg-[#1a0a2e]/60 p-5">
                      <h3 className="font-bold text-white mb-4">Platform Breakdown</h3>
                      <div className="space-y-4">
                        {data?.platforms.map(p => {
                          const totalRev = data.summary.total_revenue || 1;
                          const pct = Math.round((p.revenue / totalRev) * 100);
                          return (
                            <div key={p.platform}>
                              <div className="flex justify-between text-xs mb-1.5">
                                <span className="text-violet-200 font-medium capitalize">{p.platform}</span>
                                <span className="text-violet-400/60">{pct}% · {formatCurrency(p.revenue)}</span>
                              </div>
                              <div className="h-2.5 rounded-full bg-violet-950/60 overflow-hidden">
                                <div
                                  className="h-full rounded-full transition-all"
                                  style={{ width: `${pct}%`, backgroundColor: PLATFORM_COLORS[p.platform.toLowerCase()] || '#7c3aed' }}
                                />
                              </div>
                              <p className="text-violet-500/50 text-xs mt-1">{p.units} units · {p.sales} transactions</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Repeat customers */}
                {(data?.repeat_customers?.length ?? 0) > 0 && (
                  <div className="rounded-2xl border border-violet-900/30 bg-[#1a0a2e]/60 p-5">
                    <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-violet-400" />Your Loyal Customers
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {data?.repeat_customers.map((c, i) => (
                        <div key={c.name} className="flex items-center gap-3 p-3 rounded-xl bg-violet-950/40 border border-violet-900/20">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-600 to-purple-900 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                            {i < 3 ? ['👑','⭐','💜'][i] : c.name[0].toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="text-violet-100 text-sm font-medium truncate">{c.name}</p>
                            <p className="text-violet-400/60 text-xs">{c.count} purchases · {formatCurrency(c.revenue)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
