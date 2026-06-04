'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Heart, Lock, User, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError('');
    const result = await signIn('credentials', { username, password, redirect: false });
    if (result?.error) { setError('Invalid username or password.'); setLoading(false); }
    else router.push('/');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-care-50 via-white to-care-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-care-400 to-care-700 flex items-center justify-center shadow-lg mb-4">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">CarePing</h1>
          <p className="text-care-600 text-sm mt-1 font-medium">Care. Connect. Peace of mind.</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-6 text-center">Sign in to your account</h2>
          {error && (
            <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg px-4 py-3 mb-5 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />{error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label" htmlFor="username">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input id="username" type="text" className="input pl-10" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} required autoComplete="username" />
              </div>
            </div>
            <div>
              <label className="label" htmlFor="password">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input id="password" type="password" className="input pl-10" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" />
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-care-600 hover:bg-care-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors mt-2 disabled:opacity-60 flex items-center justify-center gap-2">
              {loading && <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
        <p className="text-center text-xs text-slate-400 mt-6 flex items-center justify-center gap-1.5">
          <Lock className="w-3 h-3" />Secure family care coordination
        </p>
      </div>
    </div>
  );
}
