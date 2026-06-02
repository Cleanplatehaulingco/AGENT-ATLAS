'use client';

import { useEffect, useState, useCallback } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Plus, Download, Trash2, Loader2, X, DollarSign, TrendingDown, TrendingUp } from 'lucide-react';
import { formatCurrency, EXPENSE_CATEGORIES } from '@/lib/utils';

interface MonthlyRow { month: string; platform: string; total: number; count: number; }
interface Expense { id: number; date: string; category: string; description: string | null; amount: number; }

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const PLATFORM_COLORS: Record<string, string> = {
  etsy: '#f97316',
  market: '#22c55e',
  facebook: '#3b82f6',
  other: '#a855f7',
};

export default function RevenuePage() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [monthlyData, setMonthlyData] = useState<{ name: string; etsy: number; market: number; facebook: number; other: number; expenses: number }[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [expenseForm, setExpenseForm] = useState({ date: new Date().toISOString().split('T')[0], category: 'Supplies/Materials', description: '', amount: '' });
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const [monthlyRes, expensesRes] = await Promise.all([
      fetch(`/api/revenue?type=monthly&year=${year}`),
      fetch(`/api/revenue?type=expenses&year=${year}`),
    ]);
    const monthlyJson = await monthlyRes.json();
    const expensesJson = await expensesRes.json();

    // Build chart data
    const byMonth: Record<string, Record<string, number>> = {};
    for (let i = 1; i <= 12; i++) {
      byMonth[String(i).padStart(2, '0')] = { etsy: 0, market: 0, facebook: 0, other: 0 };
    }
    (monthlyJson.rows as MonthlyRow[]).forEach(row => {
      if (byMonth[row.month]) {
        byMonth[row.month][row.platform] = (byMonth[row.month][row.platform] || 0) + row.total;
      }
    });

    const expenseByMonth: Record<string, number> = {};
    (monthlyJson.expenses as { month: string; total: number }[]).forEach(e => {
      expenseByMonth[e.month] = e.total;
    });

    const chartData = Object.entries(byMonth).map(([m, vals]) => ({
      name: MONTHS[parseInt(m) - 1],
      ...vals,
      expenses: expenseByMonth[m] || 0,
    }));

    setMonthlyData(chartData);
    setExpenses(Array.isArray(expensesJson) ? expensesJson : []);
    setLoading(false);
  }, [year]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const totalRevenue = monthlyData.reduce((s, m) => s + m.etsy + m.market + m.facebook + m.other, 0);
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const profit = totalRevenue - totalExpenses;

  const platformPieData = [
    { name: 'Etsy', value: monthlyData.reduce((s, m) => s + m.etsy, 0), color: PLATFORM_COLORS.etsy },
    { name: 'Market', value: monthlyData.reduce((s, m) => s + m.market, 0), color: PLATFORM_COLORS.market },
    { name: 'Facebook', value: monthlyData.reduce((s, m) => s + m.facebook, 0), color: PLATFORM_COLORS.facebook },
    { name: 'Other', value: monthlyData.reduce((s, m) => s + m.other, 0), color: PLATFORM_COLORS.other },
  ].filter(p => p.value > 0);

  async function saveExpense() {
    if (!expenseForm.amount) return;
    setSaving(true);
    await fetch('/api/revenue', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...expenseForm, amount: parseFloat(expenseForm.amount) }),
    });
    setSaving(false);
    setShowExpenseModal(false);
    setExpenseForm({ date: new Date().toISOString().split('T')[0], category: 'Supplies/Materials', description: '', amount: '' });
    fetchData();
  }

  async function deleteExpense(id: number) {
    if (!confirm('Delete expense?')) return;
    await fetch('/api/revenue?id=' + id, { method: 'DELETE' });
    fetchData();
  }

  function exportCSV() {
    const rows = [
      ['Month', 'Etsy', 'Market', 'Facebook', 'Other', 'Total Revenue', 'Expenses', 'Profit'],
      ...monthlyData.map(m => {
        const rev = m.etsy + m.market + m.facebook + m.other;
        return [m.name, m.etsy, m.market, m.facebook, m.other, rev, m.expenses, rev - m.expenses];
      }),
      ['TOTAL', ...['etsy','market','facebook','other'].map(k => monthlyData.reduce((s, m) => s + (m as Record<string, number>)[k], 0)), totalRevenue, totalExpenses, profit],
    ];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ravens-revenue-${year}.csv`;
    a.click();
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Revenue Tracker</h1>
          <p className="text-warm-500 text-sm mt-1">Financial overview for {year}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <select className="input w-auto" value={year} onChange={e => setYear(parseInt(e.target.value))}>
            {[2023, 2024, 2025, 2026].map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          <button onClick={() => setShowExpenseModal(true)} className="btn-secondary">
            <Plus className="w-4 h-4" />Log Expense
          </button>
          <button onClick={exportCSV} className="btn-secondary">
            <Download className="w-4 h-4" />Export CSV
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-brand-500" /></div>
      ) : (
        <>
          {/* Summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="stat-card">
              <div className="w-9 h-9 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
                <TrendingUp className="w-5 h-5" />
              </div>
              <p className="stat-value text-green-700 dark:text-green-400">{formatCurrency(totalRevenue)}</p>
              <p className="stat-label">Total Revenue {year}</p>
            </div>
            <div className="stat-card">
              <div className="w-9 h-9 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600">
                <TrendingDown className="w-5 h-5" />
              </div>
              <p className="stat-value text-red-600 dark:text-red-400">{formatCurrency(totalExpenses)}</p>
              <p className="stat-label">Total Expenses {year}</p>
            </div>
            <div className="stat-card">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center ${profit >= 0 ? 'bg-brand-100 dark:bg-brand-900/30 text-brand-600' : 'bg-red-100 dark:bg-red-900/30 text-red-600'}`}>
                <DollarSign className="w-5 h-5" />
              </div>
              <p className={`stat-value ${profit >= 0 ? 'text-brand-700 dark:text-brand-400' : 'text-red-600 dark:text-red-400'}`}>{formatCurrency(profit)}</p>
              <p className="stat-label">Net Profit {year}</p>
            </div>
          </div>

          {/* Monthly Revenue Chart */}
          <div className="card">
            <h2 className="section-title mb-6">Monthly Revenue by Platform</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5d0b0" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#d96f2a' }} />
                <YAxis tickFormatter={v => `$${v}`} tick={{ fontSize: 11, fill: '#d96f2a' }} />
                <Tooltip formatter={(val: number) => formatCurrency(val)} />
                <Legend />
                <Bar dataKey="etsy" name="Etsy" stackId="a" fill={PLATFORM_COLORS.etsy} />
                <Bar dataKey="market" name="Market" stackId="a" fill={PLATFORM_COLORS.market} />
                <Bar dataKey="facebook" name="Facebook" stackId="a" fill={PLATFORM_COLORS.facebook} />
                <Bar dataKey="other" name="Other" stackId="a" fill={PLATFORM_COLORS.other} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Platform pie */}
            {platformPieData.length > 0 && (
              <div className="card">
                <h2 className="section-title mb-4">Platform Breakdown</h2>
                <div className="flex items-center gap-6">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={platformPieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                        {platformPieData.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(val: number) => formatCurrency(val)} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2 flex-shrink-0">
                    {platformPieData.map(p => (
                      <div key={p.name} className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: p.color }} />
                        <span className="text-warm-700 dark:text-warm-300">{p.name}</span>
                        <span className="font-medium text-warm-900 dark:text-warm-100 ml-auto pl-4">{formatCurrency(p.value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Expenses list */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="section-title">Expenses</h2>
                <button onClick={() => setShowExpenseModal(true)} className="btn-secondary text-sm py-1.5">
                  <Plus className="w-3.5 h-3.5" />Add
                </button>
              </div>
              {expenses.length === 0 ? (
                <p className="text-warm-400 text-sm">No expenses logged for {year}.</p>
              ) : (
                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {expenses.map(e => (
                    <div key={e.id} className="flex items-center gap-3 py-2 border-b border-warm-100 dark:border-warm-900/30 last:border-0">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-warm-800 dark:text-warm-200 truncate">{e.category}</p>
                        {e.description && <p className="text-xs text-warm-400 truncate">{e.description}</p>}
                        <p className="text-xs text-warm-300">{e.date}</p>
                      </div>
                      <p className="text-sm font-semibold text-red-600 dark:text-red-400 flex-shrink-0">{formatCurrency(e.amount)}</p>
                      <button onClick={() => deleteExpense(e.id)} className="p-1 rounded hover:bg-red-100 text-red-400 flex-shrink-0">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Expense Modal */}
      {showExpenseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40" onClick={() => setShowExpenseModal(false)} />
          <div className="relative w-full max-w-md bg-white dark:bg-[#2d1a2d] rounded-2xl shadow-2xl">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="section-title">Log Expense</h2>
                <button onClick={() => setShowExpenseModal(false)} className="btn-ghost p-2"><X className="w-5 h-5" /></button>
              </div>
              <div>
                <label className="label">Date</label>
                <input className="input" type="date" value={expenseForm.date} onChange={e => setExpenseForm(f => ({ ...f, date: e.target.value }))} />
              </div>
              <div>
                <label className="label">Category</label>
                <select className="input" value={expenseForm.category} onChange={e => setExpenseForm(f => ({ ...f, category: e.target.value }))}>
                  {EXPENSE_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Description</label>
                <input className="input" placeholder="e.g. Beads from Michaels" value={expenseForm.description} onChange={e => setExpenseForm(f => ({ ...f, description: e.target.value }))} />
              </div>
              <div>
                <label className="label">Amount *</label>
                <input className="input" type="number" min="0" step="0.01" placeholder="0.00" value={expenseForm.amount} onChange={e => setExpenseForm(f => ({ ...f, amount: e.target.value }))} />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowExpenseModal(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
                <button onClick={saveExpense} disabled={saving || !expenseForm.amount} className="btn-primary flex-1 justify-center">
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}Save Expense
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
