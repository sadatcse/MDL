'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutDashboard,
  Building2,
  Users,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  ChevronRight,
  Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if (!data.user) {
          router.push('/login');
        } else {
          setUser(data.user);
        }
      } catch (err) {
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    }
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-brand-green/30 border-t-brand-green rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) return null;

  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';

  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', href: '/dashboard', active: pathname === '/dashboard' },
    { icon: Building2, label: 'Projects', href: '/dashboard/projects', active: pathname.startsWith('/dashboard/projects') },
    { icon: Bell, label: 'Media & Events', href: '/dashboard/updates', active: pathname.startsWith('/dashboard/updates') },
    { icon: Users, label: 'Testimonials', href: '/dashboard/testimonials', active: pathname.startsWith('/dashboard/testimonials') },
    { icon: Mail, label: 'Messages', href: '/dashboard/messages', active: pathname.startsWith('/dashboard/messages') },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings', active: pathname === '/dashboard/settings' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-black font-sans text-foreground flex transition-colors duration-500">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-white dark:bg-zinc-950 border-r border-brand-soft-gray dark:border-zinc-800 transition-all duration-500 ease-in-out ${isSidebarOpen ? 'w-72' : 'w-20'}`}
      >
        <div className="h-full flex flex-col p-4">
          {/* Logo Area */}
          <div className="flex items-center gap-4 mb-10 px-2">
            <div className="min-w-[40px] h-10 relative">
              <Image src="/logo.png" alt="MDL" fill className="object-contain" />
            </div>
            {isSidebarOpen && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-black text-xl tracking-tighter text-brand-green"
              >
                PORTAL
              </motion.span>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-grow space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-4 p-3 rounded-2xl transition-all group ${item.active ? 'bg-brand-green text-white shadow-lg shadow-brand-green/20' : 'hover:bg-brand-light-gray dark:hover:bg-zinc-900 text-brand-medium-gray dark:text-zinc-400 hover:text-brand-green'}`}
              >
                <item.icon className={`w-5 h-5 ${item.active ? 'text-white' : 'group-hover:scale-110 transition-transform'}`} />
                {isSidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="font-bold text-sm"
                  >
                    {item.label}
                  </motion.span>
                )}
                {isSidebarOpen && item.active && (
                  <ChevronRight className="ml-auto w-4 h-4" />
                )}
              </Link>
            ))}
          </nav>

          {/* User & Logout */}
          <div className="mt-auto pt-6 border-t border-brand-soft-gray dark:border-zinc-800 space-y-4">
            <div className={`flex items-center gap-3 px-2 ${!isSidebarOpen && 'justify-center'}`}>
              <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center border border-brand-green/20">
                <span className="font-bold text-brand-green text-sm">
                  {user.full_name?.split(' ').map(n => n[0]).join('') || 'U'}
                </span>
              </div>
              {isSidebarOpen && (
                <div className="overflow-hidden">
                  <p className="font-bold text-sm truncate">{user.full_name || 'User'}</p>
                  <p className="text-xs text-brand-medium-gray dark:text-zinc-500 truncate uppercase tracking-tighter">
                    {user.role || 'Member'}
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 p-3 rounded-2xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all group"
            >
              <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {isSidebarOpen && <span className="font-bold text-sm">Logout</span>}
            </button>
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-4 top-20 w-8 h-8 bg-white dark:bg-zinc-950 border border-brand-soft-gray dark:border-zinc-800 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-all"
        >
          {isSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </aside>

      {/* Main Content Area */}
      <main className={`flex-grow transition-all duration-500 ${isSidebarOpen ? 'ml-72' : 'ml-20'}`}>
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-brand-soft-gray dark:border-zinc-800 px-8 py-4 flex items-center justify-between">
          <div className="relative w-96 hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search projects, documents..."
              className="w-full bg-brand-light-gray dark:bg-zinc-900 border border-brand-soft-gray dark:border-zinc-800 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-xl bg-brand-light-gray dark:bg-zinc-900 border border-brand-soft-gray dark:border-zinc-800 text-zinc-500 hover:text-brand-green transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-brand-green rounded-full border-2 border-white dark:border-black"></span>
            </button>
            <div className="h-8 w-px bg-brand-soft-gray dark:border-zinc-800 mx-2"></div>
            <button className="flex items-center gap-2 font-bold text-sm hover:text-brand-green transition-colors px-2 py-1">
              English
              <ChevronRight className="w-4 h-4 rotate-90" />
            </button>
          </div>
        </header>

        <div className="p-8 max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
