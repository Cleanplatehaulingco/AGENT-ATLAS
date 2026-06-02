'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Receipt,
  TrendingUp,
  Package,
  MessageSquare,
  Moon,
  Sun,
  Gem,
  Menu,
  X,
  BarChart3,
  LogOut,
} from 'lucide-react';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/clients', label: 'Clients', icon: Users },
  { href: '/sales', label: 'Sales Log', icon: Receipt },
  { href: '/revenue', label: 'Revenue', icon: TrendingUp },
  { href: '/products', label: 'Products', icon: Package },
  { href: '/analytics', label: 'Intelligence', icon: BarChart3 },
  { href: '/assistant', label: 'AI Assistant', icon: MessageSquare },
];

interface SidebarProps {
  dark: boolean;
  onToggleDark: () => void;
}

export default function Sidebar({ dark, onToggleDark }: SidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const NavContent = () => (
    <>
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-5 border-b border-warm-100 dark:border-warm-900/50">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center flex-shrink-0">
          <Gem className="w-4 h-4 text-white" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-warm-900 dark:text-warm-100 truncate leading-tight">Raven&apos;s Business Hub</p>
          <p className="text-xs text-warm-400 dark:text-warm-500 truncate">ravensbaublesngifts</p>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                active
                  ? 'bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300'
                  : 'text-warm-600 dark:text-warm-400 hover:bg-warm-100 dark:hover:bg-warm-900/20 hover:text-warm-900 dark:hover:text-warm-100'
              )}
            >
              <Icon className={cn('w-5 h-5 flex-shrink-0', active ? 'text-brand-600 dark:text-brand-400' : '')} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Dark mode + sign out */}
      <div className="px-4 py-4 border-t border-warm-100 dark:border-warm-900/50 space-y-2">
        <button
          onClick={onToggleDark}
          className="flex items-center gap-2 text-sm text-warm-600 dark:text-warm-400 hover:text-warm-900 dark:hover:text-warm-100 transition-colors w-full"
        >
          {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          {dark ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="flex items-center gap-2 text-sm text-warm-500 dark:text-warm-500 hover:text-red-500 dark:hover:text-red-400 transition-colors w-full"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-white dark:bg-[#2d1a2d] border-r border-warm-100 dark:border-warm-900/50 h-screen sticky top-0 flex-shrink-0">
        <NavContent />
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white dark:bg-[#2d1a2d] border-b border-warm-100 dark:border-warm-900/50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center">
            <Gem className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-sm font-bold text-warm-900 dark:text-warm-100">Raven&apos;s Hub</span>
        </div>
        <button onClick={() => setMobileOpen(o => !o)} className="btn-ghost p-2">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-30 flex">
          <div className="fixed inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="relative flex flex-col w-64 bg-white dark:bg-[#2d1a2d] h-full shadow-xl">
            <NavContent />
          </aside>
        </div>
      )}

      {/* Mobile top padding spacer — push content below fixed header */}
      <div className="lg:hidden h-14 w-0 flex-shrink-0" />
    </>
  );
}
