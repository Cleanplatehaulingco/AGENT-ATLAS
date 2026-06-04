'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ClipboardList, Pill, Calendar, Users, MessageCircle, Moon, Sun, Menu, X, LogOut, Heart, Bell, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/checkin', label: 'Check-ins', icon: CheckCircle2 },
  { href: '/care-log', label: 'Care Log', icon: ClipboardList },
  { href: '/medications', label: 'Medications', icon: Pill },
  { href: '/appointments', label: 'Appointments', icon: Calendar },
  { href: '/alerts', label: 'Alerts', icon: Bell },
  { href: '/circle', label: 'Care Circle', icon: Users },
  { href: '/assistant', label: 'AI Assistant', icon: MessageCircle },
];

export default function Sidebar({ dark, onToggleDark }: { dark: boolean; onToggleDark: () => void }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const NavContent = () => (
    <>
      <div className="flex items-center gap-3 px-4 py-5 border-b border-slate-100 dark:border-slate-700/50">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-care-400 to-care-700 flex items-center justify-center flex-shrink-0 shadow-sm">
          <Heart className="w-4 h-4 text-white" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-tight">CarePing</p>
          <p className="text-xs text-care-600 dark:text-care-400 truncate">Care. Connect. Peace of mind.</p>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/' && pathname.startsWith(href));
          return (
            <Link key={href} href={href} onClick={() => setMobileOpen(false)}
              className={cn('flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                active ? 'bg-care-50 dark:bg-care-900/30 text-care-700 dark:text-care-300'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100')}>
              <Icon className={cn('w-5 h-5 flex-shrink-0', active ? 'text-care-600 dark:text-care-400' : '')} />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="px-4 py-4 border-t border-slate-100 dark:border-slate-700/50 space-y-2">
        <button onClick={onToggleDark} className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors w-full py-1.5">
          {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}{dark ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button onClick={() => signOut({ callbackUrl: '/login' })} className="flex items-center gap-2 text-sm text-slate-400 dark:text-slate-500 hover:text-rose-500 dark:hover:text-rose-400 transition-colors w-full py-1.5">
          <LogOut className="w-4 h-4" />Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-700/50 h-screen sticky top-0 flex-shrink-0">
        <NavContent />
      </aside>
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700/50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-care-400 to-care-700 flex items-center justify-center"><Heart className="w-3.5 h-3.5 text-white" /></div>
          <span className="text-sm font-bold text-slate-900 dark:text-slate-100">CarePing</span>
        </div>
        <button onClick={() => setMobileOpen(o => !o)} className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-30 flex">
          <div className="fixed inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="relative flex flex-col w-64 bg-white dark:bg-slate-900 h-full shadow-xl"><NavContent /></aside>
        </div>
      )}
      <div className="lg:hidden h-14 w-0 flex-shrink-0" />
    </>
  );
}
