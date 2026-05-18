'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutContent({ children }) {
  const pathname = usePathname();

  // Hide Navbar and Footer on dashboard and login pages
  const isDashboardOrLogin = pathname?.startsWith('/dashboard') || pathname === '/login';

  return (
    <>
      {!isDashboardOrLogin && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {!isDashboardOrLogin && <Footer />}
    </>
  );
}
