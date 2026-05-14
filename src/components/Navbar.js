"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Search, Globe, ChevronDown } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "ABOUT US", href: "/about" },
    { name: "FEATURES", href: "/feature" },
    { name: "PROJECTS", href: "/project" },
    { name: "OUR SERVICES", href: "/services" },
    { name: "CONTACT", href: "/contact" },
  ];

  return (
    <header className="fixed w-full z-[100] top-0 left-0 transition-all duration-700 pointer-events-none">
      <div 
        className={`w-full transition-all duration-700 flex justify-center pt-4 md:pt-6 pointer-events-none ${
          isScrolled ? "translate-y-0" : "translate-y-0"
        }`}
      >
        <nav
          className={`relative transition-all duration-700 pointer-events-auto ${
            isScrolled
              ? "w-[98%] xl:w-[95%] max-w-7xl bg-white/90 dark:bg-black/90 backdrop-blur-2xl rounded-full px-4 md:px-8 py-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-black/5 dark:border-white/10"
              : "w-full bg-transparent px-6 md:px-10 py-5"
          }`}
        >
          <div className="flex justify-between items-center relative">
            {/* Logo */}
            <Link href="/" className="relative flex items-center group">
              <div className={`relative transition-all duration-500 ${isScrolled ? "w-32 h-8" : "w-48 h-12"}`}>
                <Image
                  src="/logo_dark.png"
                  alt="MDL Logo"
                  fill
                  sizes={isScrolled ? "128px" : "192px"}
                  className={`object-contain transition-all duration-500 ${isScrolled ? "dark:brightness-200" : "brightness-200"}`}
                  priority
                />
              </div>
            </Link>

            <div className="hidden xl:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="relative px-3 2xl:px-5 py-2 group overflow-hidden whitespace-nowrap"
                >
                  <span className={`text-[10px] 2xl:text-[11px] font-bold tracking-[0.15em] 2xl:tracking-[0.2em] uppercase transition-colors duration-300 relative z-10 ${
                    isScrolled ? "text-foreground" : "text-white"
                  } group-hover:text-brand-green`}>
                    {link.name}
                  </span>
                  {hoveredLink === link.name && (
                    <motion.div
                      layoutId="nav-hover"
                      className="absolute inset-0 bg-brand-green/10 rounded-full z-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <span className="absolute bottom-1 left-5 right-5 h-[1px] bg-brand-green scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="hidden xl:flex items-center gap-4 2xl:gap-6">
              <ThemeToggle />
              <button className={`transition-all duration-300 transform hover:scale-110 ${
                isScrolled ? "text-foreground/70" : "text-white/70"
              } hover:text-brand-green`}>
                <Search size={18} strokeWidth={2.5} />
              </button>
              <div className={`w-[1px] h-6 mx-1 ${isScrolled ? "bg-black/10 dark:bg-white/10" : "bg-white/10"}`}></div>
              <Link
                href="/contact"
                className={`flex items-center gap-2 px-6 2xl:px-8 py-3 rounded-full font-bold text-[10px] tracking-[0.2em] uppercase transition-all duration-500 relative overflow-hidden group ${
                  isScrolled
                    ? "bg-brand-dark-green text-white shadow-lg hover:shadow-brand-green/20"
                    : "bg-white text-brand-dark-green hover:bg-brand-green hover:text-white"
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Phone size={14} className="group-hover:rotate-12 transition-transform" />
                  Enquire Now
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
              </Link>
            </div>
 
            {/* Mobile Menu Toggle */}
            <button
              className={`xl:hidden p-2.5 rounded-full transition-all duration-300 ${
                isScrolled ? "bg-black/5 dark:bg-white/10 text-foreground dark:text-white" : "text-white bg-black/20"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 w-full h-screen bg-brand-black z-[110] xl:hidden pointer-events-auto"
          >
            {/* Mobile Header (Close & Theme) */}
            <div className="absolute top-8 left-8 right-8 z-[120] flex justify-between items-center">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-white hover:bg-brand-green hover:text-brand-black transition-all duration-500"
              >
                <X size={32} />
              </button>
            </div>

            {/* Background Texture/Gradient */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-green/10 rounded-full blur-[120px]"></div>
              <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-dark-green/10 rounded-full blur-[120px]"></div>
              <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
            </div>

            <div className="relative z-10 h-full flex flex-col justify-center px-10 md:px-20">
              <div className="flex flex-col gap-6 md:gap-8">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="group flex flex-col"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-4xl md:text-7xl font-bold text-brand-white uppercase tracking-tight group-hover:text-brand-green transition-colors duration-500">
                          {link.name}
                        </span>
                        <div className="w-12 h-[2px] bg-brand-green scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right"></div>
                      </div>
                      <span className="text-[10px] font-bold text-brand-white/20 tracking-[0.5em] uppercase mt-2">
                        0{i + 1}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="mt-20 md:mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-10"
              >
                <div className="flex flex-col gap-4">
                  <p className="text-brand-white/40 text-xs font-bold tracking-widest uppercase">Contact Us</p>
                  <a href="tel:+880123456789" className="text-2xl font-bold text-brand-white hover:text-brand-green transition-colors">
                    +880 123 456 789
                  </a>
                  <a href="mailto:info@mohammadi-developers.com" className="text-brand-white/60 hover:text-white transition-colors">
                    info@mohammadi-developers.com
                  </a>
                </div>
                
                <div className="flex gap-8">
                  {['FB', 'IG', 'TW', 'LI'].map((social) => (
                    <a key={social} href="#" className="text-sm font-bold text-brand-white/40 hover:text-brand-green transition-all transform hover:-translate-y-1">
                      {social}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

