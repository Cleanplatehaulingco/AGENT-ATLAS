'use client';

import './globals.css';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import AIChat from '@/components/AIChat';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDark(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Raven&apos;s Business Hub</title>
        <meta name="description" content="CRM & Business Intelligence for Raven's Baubles & Gifts" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="flex h-screen overflow-hidden">
          <Sidebar dark={dark} onToggleDark={() => setDark(d => !d)} />
          <main className="flex-1 overflow-y-auto bg-[#fdf6f0] dark:bg-[#1e0f1e]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </div>
          </main>
        </div>
        <AIChat />
      </body>
    </html>
  );
}
