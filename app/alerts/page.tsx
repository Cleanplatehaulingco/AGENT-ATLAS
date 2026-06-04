'use client';

import { useState, useEffect, useCallback } from 'react';
import { Bell, AlertTriangle, CheckCircle2, Clock, X, Settings } from 'lucide-react';
import { cn, formatDateTime } from '@/lib/utils';
import type { Alert } from '@/lib/db';

const SEVERITY_STYLES: Record<string, string> = {
  high: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300 border-rose-200 dark:border-rose-700',
  medium: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-700',
  low: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600',
};

const ALERT_ICONS: Record<string, string> = {
  missed_checkin: '📵',
  missed_medication: '💊',
  no_activity: '⚠️',
  elder_requested_call: '📞',
  alert: '🔔',
};

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [showResolved, setShowResolved] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [notifSettings, setNotifSettings] = useState({ sms: true, email: true, escalation: '60' });

  const load = useCallback(async () => {
    const data = await fetch('/api/alerts').then(r => r.json());
    setAlerts(Array.isArray(data) ? data : []);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function resolveAlert(id: number) {
    await fetch(`/api/alerts?id=${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ resolved: true }) });
    await load();
  }

  async function createTestAlert() {
    await fetch('/api/alerts', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'missed_checkin', description: 'No check-in received by 10:00 AM', severity: 'medium' }),
    });
    await load();
  }

  const unresolved = alerts.filter(a => !a.resolved);
  const resolved = alerts.filter(a => a.resolved);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Bell className="w-6 h-6 text-care-600" />
          <h1 className="page-title">Alerts</h1>
          {unresolved.length > 0 && <span className="bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{unresolved.length}</span>}
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowSettings(s => !s)} className="btn-secondary flex items-center gap-2"><Settings className="w-4 h-4" /><span className="hidden sm:inline">Settings</span></button>
        </div>
      </div>

      {/* Alert settings */}
      {showSettings && (
        <div className="card">
          <h2 className="section-title mb-4 flex items-center gap-2"><Settings className="w-5 h-5" />Notification Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div><p className="font-medium text-slate-700 dark:text-slate-300 text-sm">SMS Notifications</p><p className="text-xs text-slate-400">Receive alerts via text message</p></div>
              <button onClick={() => setNotifSettings(s => ({ ...s, sms: !s.sms }))} className={cn('w-10 h-6 rounded-full transition-colors relative', notifSettings.sms ? 'bg-care-600' : 'bg-slate-300')}><span className={cn('absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform', notifSettings.sms ? 'translate-x-4' : 'translate-x-0.5')} /></button>
            </div>
            <div className="flex items-center justify-between">
              <div><p className="font-medium text-slate-700 dark:text-slate-300 text-sm">Email Notifications</p><p className="text-xs text-slate-400">Receive alerts via email</p></div>
              <button onClick={() => setNotifSettings(s => ({ ...s, email: !s.email }))} className={cn('w-10 h-6 rounded-full transition-colors relative', notifSettings.email ? 'bg-care-600' : 'bg-slate-300')}><span className={cn('absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform', notifSettings.email ? 'translate-x-4' : 'translate-x-0.5')} /></button>
            </div>
            <div>
              <label className="label">Escalation Timing</label>
              <select className="input" value={notifSettings.escalation} onChange={e => setNotifSettings(s => ({ ...s, escalation: e.target.value }))}>
                <option value="30">30 minutes after missed check-in</option>
                <option value="60">1 hour after missed check-in</option>
                <option value="120">2 hours after missed check-in</option>
              </select>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-3">SMS delivery requires Twilio configuration. See .env.example.</p>
        </div>
      )}

      {/* Unresolved alerts */}
      <div>
        <h2 className="section-title mb-3">Active Alerts ({unresolved.length})</h2>
        {unresolved.length === 0 ? (
          <div className="card text-center py-10">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
            <p className="font-semibold text-slate-700 dark:text-slate-300">All clear!</p>
            <p className="text-slate-400 text-sm mt-1">No active alerts right now.</p>
            <button onClick={createTestAlert} className="mt-4 text-xs text-slate-400 hover:text-slate-600 underline">Create test alert</button>
          </div>
        ) : (
          <div className="space-y-3">
            {unresolved.map(alert => (
              <div key={alert.id} className={cn('rounded-xl border p-4 flex items-start gap-4', SEVERITY_STYLES[alert.severity] ?? SEVERITY_STYLES.low)}>
                <span className="text-2xl flex-shrink-0">{ALERT_ICONS[alert.type] ?? '🔔'}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={cn('badge text-xs font-semibold', alert.severity === 'high' ? 'bg-rose-200 text-rose-800' : alert.severity === 'medium' ? 'bg-amber-200 text-amber-800' : 'bg-slate-200 text-slate-700')}>
                      {alert.severity.toUpperCase()}
                    </span>
                    <span className="text-xs opacity-70 flex items-center gap-1"><Clock className="w-3 h-3" />{formatDateTime(alert.created_at)}</span>
                  </div>
                  <p className="font-medium text-sm">{alert.description}</p>
                </div>
                <button onClick={() => resolveAlert(alert.id)} className="flex-shrink-0 flex items-center gap-1 text-xs bg-white/50 hover:bg-white/80 px-3 py-1.5 rounded-lg font-medium transition-colors">
                  <X className="w-3.5 h-3.5" />Resolve
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Resolved */}
      {resolved.length > 0 && (
        <div>
          <button onClick={() => setShowResolved(s => !s)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 font-medium py-1">
            <AlertTriangle className="w-4 h-4" />Show Resolved ({resolved.length})
          </button>
          {showResolved && (
            <div className="space-y-2 mt-3">
              {resolved.map(alert => (
                <div key={alert.id} className="card !p-3 flex items-center gap-3 opacity-60">
                  <span className="text-lg">{ALERT_ICONS[alert.type] ?? '🔔'}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-600 dark:text-slate-400">{alert.description}</p>
                    <p className="text-xs text-slate-400">{formatDateTime(alert.created_at)}</p>
                  </div>
                  <span className="badge bg-emerald-100 text-emerald-700 flex-shrink-0">Resolved</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
