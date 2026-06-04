import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
export function formatDate(date: string) { return new Date(date + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }); }
export function formatDateTime(dt: string) { return new Date(dt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }); }
export function formatTime(t: string) { return t; }
export function timeAgo(dt: string): string {
  const now = new Date(); const then = new Date(dt);
  const diffMs = now.getTime() - then.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return new Date(dt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
export const LOG_TYPES = [
  { value: 'checkin', label: 'Check-in', color: 'bg-teal-100 text-teal-800' },
  { value: 'medication', label: 'Medication', color: 'bg-care-100 text-care-800' },
  { value: 'meal', label: 'Meal', color: 'bg-emerald-100 text-emerald-800' },
  { value: 'mood', label: 'Mood Check', color: 'bg-amber-100 text-amber-800' },
  { value: 'note', label: 'Note', color: 'bg-slate-100 text-slate-700' },
  { value: 'vitals', label: 'Vitals', color: 'bg-rose-100 text-rose-800' },
  { value: 'activity', label: 'Activity', color: 'bg-sky-100 text-sky-800' },
  { value: 'alert', label: 'Alert', color: 'bg-orange-100 text-orange-800' },
];
export const MOOD_LABELS = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'];
export const MOOD_COLORS = ['', 'text-rose-500', 'text-amber-500', 'text-yellow-500', 'text-emerald-400', 'text-emerald-600'];
export const MOOD_EMOJIS = ['', '😔', '😐', '🙂', '😊', '😄'];
export function getLogTypeStyle(type: string) { return LOG_TYPES.find(t => t.value === type)?.color ?? 'bg-slate-100 text-slate-700'; }
export function getLogTypeLabel(type: string) { return LOG_TYPES.find(t => t.value === type)?.label ?? type; }
