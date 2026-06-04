'use client';

import './globals.css';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import SessionProvider from '@/components/SessionProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);
  const pathname = usePathname();
  const isPublicPage = pathname === '/login' || pathname.startsWith('/landing');

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) setDark(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>CarePing — Elderly Care Coordination</title>
        <meta name="description" content="Voice-first safety, connection, and reminder companion for elderly adults and their family caregivers." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-slate-50 dark:bg-slate-950">
        <SessionProvider>
          {isPublicPage ? children : (
            <div className="flex h-screen overflow-hidden">
              <Sidebar dark={dark} onToggleDark={() => setDark(d => !d)} />
              <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 pt-20 lg:pt-8">{children}</div>
              </main>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
