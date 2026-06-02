'use client';

import { useEffect, useState, useCallback } from 'react';
import { DollarSign, Users, ShoppingBag, TrendingUp, Calendar, Star, Loader2, RefreshCw } from 'lucide-react';
import { formatCurrency, getPlatformColor } from '@/lib/utils';

interface Summary {
  todayTotal: number;
  weekTotal: number;
  monthTotal: number;
  yearTotal: number;
  platformBreakdown: { platform: string; total: number; count: number }[];
  topProducts: { name: string; count: number }[];
}

interface FollowUp {
  id: number;
  name: string;
  follow_up_date: string;
  follow_up_note: string;
}

const HOLIDAYS = [
  { name: "Independence Day", date: "July 4", campaign: "Red, white & blue jewelry sets — patriotic charm bracelets and star pendants." },
  { name: "Back to School", date: "Aug–Sep", campaign: "Dorm décor, small gifts under $20 for students and teachers." },
  { name: "Halloween", date: "Oct 31", campaign: "Gothic jewelry, skull charms, dark gemstone pieces — great booth theme." },
  { name: "Thanksgiving", date: "Nov (4th Thu)", campaign: "Harvest tones: amber, garnet, gold pieces. Bundle deals for gift-givers." },
  { name: "Small Business Saturday", date: "Nov 30", campaign: "Promote your Etsy + market. Special discount codes, loyalty cards." },
  { name: "Christmas", date: "Dec 25", campaign: "Holiday jewelry sets, ornaments, gift-wrapped bundles. Stock up early!" },
  { name: "New Year", date: "Jan 1", campaign: "New beginnings — crystal, moonstone, and intention jewelry are hot." },
  { name: "Valentine's Day", date: "Feb 14", campaign: "Heart charms, rose quartz, couples jewelry, love-themed sets." },
  { name: "Mother's Day", date: "May (2nd Sun)", campaign: "Family birthstone jewelry, personalized gifts. Your biggest sales weekend!" },
];

function getUpcomingHolidays() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const upcoming = [];

  if (month >= 6 && month <= 7) upcoming.push(HOLIDAYS[0]);
  if (month >= 7 && month <= 9) upcoming.push(HOLIDAYS[1]);
  if (month >= 9 && month <= 10) upcoming.push(HOLIDAYS[2]);
  if (month >= 10 && month <= 11) upcoming.push(HOLIDAYS[3], HOLIDAYS[4]);
  if (month >= 11 && month <= 12) upcoming.push(HOLIDAYS[5]);
  if (month === 12 || month === 1) upcoming.push(HOLIDAYS[6]);
  if (month === 1 || month === 2) upcoming.push(HOLIDAYS[7]);
  if (month >= 3 && month <= 5) upcoming.push(HOLIDAYS[8]);

  // Always show at least 2
  if (upcoming.length === 0) {
    upcoming.push(HOLIDAYS[8], HOLIDAYS[7]);
  }
  return upcoming.slice(0, 3);
}

export default function Dashboard() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [tip, setTip] = useState('');
  const [tipLoading, setTipLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [summaryRes, clientsRes] = await Promise.all([
        fetch('/api/revenue?type=summary'),
        fetch('/api/clients'),
      ]);
      const summaryData = await summaryRes.json();
      const clientsData = await clientsRes.json();
      setSummary(summaryData);

      const today = new Date().toISOString().split('T')[0];
      const upcoming = (clientsData as FollowUp[]).filter(
        (c: FollowUp) => c.follow_up_date && c.follow_up_date >= today
      ).sort((a: FollowUp, b: FollowUp) => a.follow_up_date.localeCompare(b.follow_up_date)).slice(0, 5);
      setFollowUps(upcoming);
    } catch { /* silent */ }
    setLoading(false);
  }, []);

  async function fetchTip() {
    setTipLoading(true);
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{
            role: 'user',
            content: 'Give me one specific, actionable business tip for today for a handmade jewelry/gifts seller at Etsy and a Saturday farmers market. Keep it to 2-3 sentences. Make it practical and encouraging.',
          }],
        }),
      });
      const data = await res.json();
      setTip(data.response || data.error || '');
    } catch { setTip('Could not load tip — check your API key.'); }
    setTipLoading(false);
  }

  useEffect(() => { fetchData(); }, [fetchData]);

  const holidays = getUpcomingHolidays();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="text-warm-500 dark:text-warm-400 text-sm mt-1">Welcome back! Here&apos;s your business at a glance.</p>
        </div>
        <button onClick={fetchData} className="btn-secondary">
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Revenue Stats */}
      {loading ? (
        <div className="flex items-center justify-center h-32">
          <Loader2 className="w-6 h-6 animate-spin text-brand-500" />
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Today's Revenue", value: summary?.todayTotal ?? 0, icon: DollarSign, color: 'text-green-600' },
            { label: 'This Week', value: summary?.weekTotal ?? 0, icon: TrendingUp, color: 'text-brand-600' },
            { label: 'This Month', value: summary?.monthTotal ?? 0, icon: ShoppingBag, color: 'text-gold-600' },
            { label: 'This Year', value: summary?.yearTotal ?? 0, icon: Star, color: 'text-warm-600' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="stat-card">
              <div className={`w-9 h-9 rounded-full bg-warm-50 dark:bg-warm-900/30 flex items-center justify-center ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="stat-value">{formatCurrency(value)}</p>
              <p className="stat-label">{label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Platform breakdown */}
        <div className="card lg:col-span-1">
          <h2 className="section-title mb-4 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-brand-500" />
            Sales by Platform (YTD)
          </h2>
          {summary?.platformBreakdown && summary.platformBreakdown.length > 0 ? (
            <div className="space-y-3">
              {summary.platformBreakdown.map(p => (
                <div key={p.platform} className="flex items-center justify-between">
                  <span className={`badge ${getPlatformColor(p.platform)}`}>
                    {p.platform === 'market' ? 'South Lyon Market' :
                     p.platform === 'etsy' ? 'Etsy' :
                     p.platform === 'facebook' ? 'Facebook' : p.platform}
                  </span>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-warm-900 dark:text-warm-100">{formatCurrency(p.total)}</p>
                    <p className="text-xs text-warm-400">{p.count} sales</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-warm-400 text-sm">No sales recorded yet. Add your first sale!</p>
          )}
        </div>

        {/* Top Products */}
        <div className="card lg:col-span-1">
          <h2 className="section-title mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-gold-500" />
            Top Products (YTD)
          </h2>
          {summary?.topProducts && summary.topProducts.length > 0 ? (
            <div className="space-y-2">
              {summary.topProducts.map((p, i) => (
                <div key={p.name} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-300 text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-sm text-warm-800 dark:text-warm-200 flex-1 truncate">{p.name}</span>
                  <span className="text-xs text-warm-400">{p.count} sold</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-warm-400 text-sm">No product data yet. Log a sale with items to track top sellers.</p>
          )}
        </div>

        {/* Follow-ups */}
        <div className="card lg:col-span-1">
          <h2 className="section-title mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-warm-500" />
            Upcoming Follow-ups
          </h2>
          {followUps.length > 0 ? (
            <div className="space-y-3">
              {followUps.map(c => (
                <div key={c.id} className="border-l-2 border-brand-300 pl-3">
                  <p className="text-sm font-medium text-warm-800 dark:text-warm-200">{c.name}</p>
                  <p className="text-xs text-warm-400">{new Date(c.follow_up_date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                  {c.follow_up_note && <p className="text-xs text-warm-500 dark:text-warm-400 mt-0.5 truncate">{c.follow_up_note}</p>}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-warm-400 text-sm">No upcoming follow-ups. Add follow-up reminders in the Clients section.</p>
          )}
        </div>
      </div>

      {/* Holidays */}
      <div className="card">
        <h2 className="section-title mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-brand-500" />
          Upcoming Holidays &amp; Campaign Ideas
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {holidays.map(h => (
            <div key={h.name} className="bg-brand-50 dark:bg-brand-900/20 rounded-lg p-4 border border-brand-100 dark:border-brand-900/40">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-base">🎉</span>
                <div>
                  <p className="text-sm font-semibold text-warm-900 dark:text-warm-100">{h.name}</p>
                  <p className="text-xs text-warm-400">{h.date}</p>
                </div>
              </div>
              <p className="text-xs text-warm-600 dark:text-warm-400 leading-relaxed">{h.campaign}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Tip of the day */}
      <div className="card bg-gradient-to-r from-brand-50 to-gold-50 dark:from-brand-950/20 dark:to-gold-950/20 border-brand-100 dark:border-brand-900/30">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h2 className="section-title mb-2 flex items-center gap-2">
              <Star className="w-5 h-5 text-gold-500" />
              AI Business Tip
            </h2>
            {tip ? (
              <p className="text-sm text-warm-700 dark:text-warm-300 leading-relaxed">{tip}</p>
            ) : (
              <p className="text-sm text-warm-400">Click &ldquo;Get Tip&rdquo; for a personalized business suggestion powered by Claude AI.</p>
            )}
          </div>
          <button
            onClick={fetchTip}
            disabled={tipLoading}
            className="btn-primary flex-shrink-0"
          >
            {tipLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Star className="w-4 h-4" />}
            {tip ? 'New Tip' : 'Get Tip'}
          </button>
        </div>
      </div>
    </div>
  );
}
