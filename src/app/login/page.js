'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-950 relative overflow-hidden font-sans">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-green/20 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-deep-green/30 blur-[120px] rounded-full"></div>
        <div className="absolute inset-0 bg-[url('/slider3.jpeg')] opacity-10 bg-cover bg-center grayscale mix-blend-overlay"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl overflow-hidden group">
          {/* Subtle shine effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

          <div className="flex flex-col items-center mb-10">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="mb-6 relative"
            >
              <div className="absolute inset-0 bg-brand-green blur-2xl opacity-20"></div>
              <Image 
                src="/logo.png" 
                alt="MDL Logo" 
                width={120} 
                height={60} 
                className="relative z-10 drop-shadow-2xl"
                priority
              />
            </motion.div>
            <h1 className="text-3xl font-black text-white tracking-tight mb-2">Welcome Back</h1>
            <p className="text-zinc-400 text-sm font-medium">Access your MDL portal</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs font-bold flex items-center gap-3"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-brand-green transition-colors" />
                <input 
                  type="email" 
                  required
                  placeholder="name@company.com"
                  className="w-full bg-white/[0.05] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green/50 transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-brand-green transition-colors" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  placeholder="••••••••"
                  className="w-full bg-white/[0.05] border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green/50 transition-all"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center cursor-pointer group">
                <input type="checkbox" className="hidden" />
                <div className="w-5 h-5 rounded-md border border-white/10 bg-white/5 flex items-center justify-center group-hover:border-brand-green transition-all">
                  <div className="w-2.5 h-2.5 bg-brand-green rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <span className="text-xs text-zinc-400 ml-2 group-hover:text-zinc-200 transition-colors">Remember me</span>
              </label>
              <Link href="#" className="text-xs font-bold text-brand-green hover:text-brand-green/80 transition-colors">Forgot Password?</Link>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-brand-dark-green to-brand-green text-white font-bold py-4 rounded-2xl shadow-xl shadow-brand-green/20 hover:shadow-brand-green/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Sign In to Dashboard
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-white/5 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-zinc-500 text-xs font-medium bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <ShieldCheck className="w-4 h-4 text-brand-green" />
              Secure, Encrypted Connection
            </div>
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest text-center">
              © 2026 Mohammadi Developers Ltd. <br/> Built for Excellence
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
