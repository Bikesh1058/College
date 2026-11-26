import { useState } from 'react';
import { api } from '../services/api';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

export default function AdminLoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('admin@khwopa.edu.np');
  const [password, setPassword] = useState('AdminPassword2026!');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await api.login({ email, password });
      if (data.token) {
        localStorage.setItem('khwopa_token', data.token);
        localStorage.setItem('khwopa_user', JSON.stringify(data.user));
        if (onLoginSuccess) {
          onLoginSuccess(data.user);
        } else {
          window.location.href = '/admin/dashboard';
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid administrator credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#07111e] px-4 font-sans selection:bg-[#C5A15B] selection:text-[#07111e]">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full bg-[#C5A15B]/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[480px] w-[480px] rounded-full bg-[#1b3b64]/25 blur-3xl" />

      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[#1b2b3f] bg-[#0c1827]/95 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#C5A15B]/40 bg-[#C5A15B]/10 shadow-inner">
            <span className="font-sans text-3xl font-bold text-[#C5A15B]">KC</span>
          </div>
          <h1 className="mt-5 font-sans text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Khwopa Admin Portal
          </h1>
          <p className="mt-1.5 text-xs uppercase tracking-[0.2em] text-[#C5A15B] font-semibold">
            Institutional Administration
          </p>
        </div>

        {error && (
          <div className="mt-6 flex items-center gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs text-red-300">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-7 space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-[#1e324a] bg-[#07111e] py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                placeholder="admin@khwopa.edu.np"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-[#1e324a] bg-[#07111e] py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-[#C5A15B] focus:ring-1 focus:ring-[#C5A15B]"
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#C5A15B] via-[#BD974E] to-[#A68238] py-3 text-sm font-bold uppercase tracking-wider text-[#07111e] shadow-lg shadow-[#C5A15B]/15 transition hover:brightness-105 disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : 'Sign in to Dashboard'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-8 border-t border-[#1b2b3f] pt-5 text-center text-xs text-slate-400">
          <p className="flex items-center justify-center gap-1.5 text-xs">
            <ShieldCheck className="h-4 w-4 text-[#C5A15B]" />
            <span>Authorized Khwopa Higher Secondary Officers Only</span>
          </p>
        </div>
      </div>
    </div>
  );
}
