import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr + (dateStr.includes('T') ? '' : 'T00:00:00'));
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function getPlatformColor(platform: string): string {
  switch (platform.toLowerCase()) {
    case 'etsy': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
    case 'south lyon market':
    case 'market': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    case 'facebook marketplace':
    case 'facebook': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
}

export function getTagColor(tag: string): string {
  switch (tag.toLowerCase()) {
    case 'vip': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    case 'wholesale': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
    case 'repeat': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    default: return 'bg-brand-100 text-brand-800 dark:bg-brand-900/30 dark:text-brand-300';
  }
}

export const PLATFORMS = [
  'Etsy',
  'South Lyon Market',
  'Facebook Marketplace',
  'Other',
] as const;

export const PAYMENT_METHODS = [
  'Cash',
  'Venmo',
  'PayPal',
  'Square',
  'Etsy Checkout',
  'Facebook Pay',
  'Other',
] as const;

export const CLIENT_TAGS = [
  'VIP',
  'Wholesale',
  'Repeat',
  'Local',
  'Online',
  'Holiday',
] as const;

export const EXPENSE_CATEGORIES = [
  'Booth Fees',
  'Supplies/Materials',
  'Shipping',
  'Packaging',
  'Equipment',
  'Marketing',
  'Etsy Fees',
  'Other',
] as const;
