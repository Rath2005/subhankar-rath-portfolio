"use client";

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ShieldAlert, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setError('');
    setLoading(true);

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError('Invalid admin credentials. Please re-authenticate.');
      } else {
        router.push('/admin');
        router.refresh();
      }
    } catch (err) {
      setError('An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-16 px-4 text-slate-300">
      <Link 
        href="/" 
        className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Workspace OS</span>
      </Link>

      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/[0.08] shadow-2xl space-y-6 bg-[#0c0c10]/80 relative overflow-hidden">
        {/* Design details layout */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500" />
        
        <div className="text-center">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto text-cyan-400">
            <Lock className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white mt-3 font-mono tracking-wider">ADMIN PORTAL SIGN-IN</h2>
          <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest">AUTHENTICATION REQUIRED</p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/5 border border-rose-500/15 flex items-start space-x-2.5 text-[11px] text-rose-400 leading-normal">
            <ShieldAlert className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="font-mono text-slate-500 text-[9px] uppercase">Security Email</label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl p-2.5 pl-10 outline-none text-slate-200 focus:border-cyan-500/50 transition-colors text-xs"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-slate-500 text-[9px] uppercase">Access Password</label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl p-2.5 pl-10 outline-none text-slate-200 focus:border-cyan-500/50 transition-colors text-xs"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-9 rounded-xl flex items-center justify-center text-xs font-mono font-bold tracking-wider text-black bg-cyan-400 hover:scale-101 active:scale-99 transition-all disabled:opacity-40"
          >
            {loading ? 'CALIBRATING SESSION...' : 'AUTHORIZE SESSION'}
          </button>
        </form>

      </div>
    </div>
  );
}
