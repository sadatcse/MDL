"use client";

import NextLink from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Search,
  Mail, 
  Phone, 
  MapPin, 
  ChevronRight,
  FileText,
  Download
} from 'lucide-react';

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const PinterestIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.27 2.66 7.93 6.43 9.42-.09-.79-.17-2.01.04-2.88.19-.78 1.22-5.17 1.22-5.17s-.31-.62-.31-1.54c0-1.44.84-2.51 1.87-2.51.88 0 1.31.66 1.31 1.45 0 .89-.57 2.21-.86 3.44-.24 1.03.52 1.87 1.54 1.87 1.85 0 3.27-1.95 3.27-4.76 0-2.49-1.79-4.23-4.34-4.23-2.96 0-4.69 2.22-4.69 4.5 0 .89.34 1.85.77 2.37.09.1.1.19.07.29l-.29 1.18c-.05.18-.16.22-.36.12-1.35-.63-2.19-2.61-2.19-4.2 0-3.41 2.48-6.55 7.15-6.55 3.76 0 6.67 2.68 6.67 6.25 0 3.73-2.35 6.74-5.61 6.74-1.1 0-2.13-.57-2.48-1.24 0 0-.54 2.06-.67 2.57-.24.93-.9 2.09-1.34 2.8.94.28 1.94.44 2.97.44 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT US', path: '/about' },
    { name: 'FEATURES', path: '/feature' },
    { name: 'PROJECTS', path: '/project' },
    { name: 'OUR SERVICES', path: '/services' },
    { name: 'CONTACT', path: '/contact' },
  ];

  const sisterConcerns = [
    { name: 'Mohammadi Homes Ltd.', url: 'https://mohammadihomes.com/' },
    { name: 'Mohammadi Housing Ltd.', url: '#' },
    { name: 'Time Now Ltd.', url: 'https://timenowbd.com/' },
    { name: 'Mohammadi Air Travels Ltd.', url: '#' },
    { name: 'Mohammadi Trade International', url: '#' },
    { name: 'Mohammadi News Agency', url: 'http://mnabd.com/' },
    { name: 'Mohammmadi Stock Market Ltd.', url: 'https://mohammadistock.com.bd/' }
  ];

  return (
    <footer className="bg-background dark:bg-black text-foreground pt-20 pb-10 relative border-t border-brand-soft-gray dark:border-white/5 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Links */}
          <div className="space-y-8">
            <h4 className="text-sm font-bold tracking-widest text-foreground/90 border-l-4 border-brand-green pl-4">LINKS</h4>
            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link.name}>
                  <NextLink 
                    href={link.path} 
                    className="text-xs font-medium text-foreground/60 hover:text-brand-green transition-all flex items-center group"
                  >
                    <span className="mr-2 text-brand-green group-hover:translate-x-1 transition-transform">{'›'}</span>
                    {link.name}
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Sister Concerns */}
          <div className="space-y-8">
            <h4 className="text-sm font-bold tracking-widest text-foreground/90 border-l-4 border-brand-green pl-4 uppercase">Our Sister Concerns</h4>
            <ul className="space-y-4">
              {sisterConcerns.map((concern) => (
                <li key={concern.name}>
                  <NextLink 
                    href={concern.url} 
                    target={concern.url !== '#' ? "_blank" : undefined}
                    rel={concern.url !== '#' ? "noopener noreferrer" : undefined}
                    className="text-xs font-medium text-foreground/60 hover:text-brand-green transition-all flex items-center group leading-relaxed"
                  >
                    <span className="mr-2 text-brand-green group-hover:translate-x-1 transition-transform">{'›'}</span>
                    {concern.name}
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div className="space-y-8">
            <h4 className="text-sm font-bold tracking-widest text-foreground/90 border-l-4 border-brand-green pl-4 uppercase">Contact Us</h4>
            <div className="space-y-6">
              <div className="flex gap-4">
                <MapPin size={18} className="text-brand-green shrink-0" />
                <p className="text-xs text-foreground/60 leading-relaxed">
                  2, Mohammadi Main Road,<br />
                  Mohammadi Housing Ltd.,<br />
                  Mohammadpur, Dhaka-1207
                </p>
              </div>
              <div className="flex gap-4">
                <Phone size={18} className="text-brand-green shrink-0" />
                <p className="text-xs text-foreground/60">+880 2 48111222</p>
              </div>
              <div className="flex gap-4">
                <Mail size={18} className="text-brand-green shrink-0" />
                <p className="text-xs text-foreground/60 italic">info@mohammadi-developers.com</p>
              </div>
            </div>
          </div>

          {/* Column 4: Search & Brand */}
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="relative flex overflow-hidden rounded-lg border border-brand-soft-gray dark:border-white/10 bg-brand-light-gray dark:bg-black/20 focus-within:border-brand-green transition-colors">
                <input 
                  type="text" 
                  placeholder="ENTER YOUR KEYWORD" 
                  className="w-full bg-transparent py-3 px-4 text-[10px] font-bold tracking-widest uppercase focus:outline-none placeholder:text-foreground/20 text-foreground"
                />
                <button className="bg-brand-green text-white px-4 flex items-center justify-center hover:bg-brand-green/80 transition-colors">
                  <Search size={16} strokeWidth={3} />
                </button>
              </div>
            </div>

            {/* Downloads */}
            <div className="space-y-4">
              <h5 className="text-[10px] font-bold tracking-[0.2em] text-foreground/40 uppercase">Official Resources</h5>
              <div className="flex flex-col gap-3">
                <a 
                  href="/Terms-Condition.pdf" 
                  download 
                  className="flex items-center gap-3 text-[10px] font-bold text-foreground/60 hover:text-brand-green transition-all group"
                >
                  <div className="w-8 h-8 rounded bg-brand-light-gray dark:bg-white/5 flex items-center justify-center group-hover:bg-brand-green group-hover:text-white transition-all">
                    <FileText size={14} />
                  </div>
                  TERMS & CONDITIONS (PDF)
                </a>
                <a 
                  href="/Aplication.pdf" 
                  download 
                  className="flex items-center gap-3 text-[10px] font-bold text-foreground/60 hover:text-brand-green transition-all group"
                >
                  <div className="w-8 h-8 rounded bg-brand-light-gray dark:bg-white/5 flex items-center justify-center group-hover:bg-brand-green group-hover:text-white transition-all">
                    <FileText size={14} />
                  </div>
                  APPLICATION FORM (PDF)
                </a>
              </div>
            </div>

            <div className="space-y-8">
              <NextLink href="/" className="relative block w-48 h-10 grayscale hover:grayscale-0 transition-all duration-500">
                <Image
                  src="/logo_dark.png"
                  alt="MDL Logo"
                  fill
                  sizes="192px"
                  className="object-contain dark:brightness-200"
                />
              </NextLink>

              <div className="flex gap-3">
                {[
                  { Icon: FacebookIcon, href: '#' },
                  { Icon: TwitterIcon, href: '#' },
                  { Icon: LinkedinIcon, href: '#' },
                  { Icon: PinterestIcon, href: '#' }
                ].map((social, idx) => (
                  <a 
                    key={idx} 
                    href={social.href}
                    className="w-11 h-11 rounded flex items-center justify-center bg-brand-green text-white transition-all transform hover:scale-110 active:scale-95 shadow-lg shadow-brand-green/20"
                  >
                    <social.Icon size={24} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-brand-soft-gray dark:border-white/5 flex flex-col lg:grid lg:grid-cols-3 items-center gap-8 text-[10px] font-bold tracking-[0.15em] lg:tracking-widest text-foreground/30">
          {/* Copyright - Left Aligned on Desktop */}
          <div className="order-2 lg:order-1 text-center lg:text-left px-4 lg:px-0">
            <p>© 2026 MOHAMMADI DEVELOPERS LTD. ALL RIGHTS RESERVED.</p>
          </div>
          
          {/* Legal Links - Center Aligned */}
          <div className="order-1 lg:order-2 flex flex-wrap justify-center items-center gap-x-4 lg:gap-x-6 gap-y-3 px-6 lg:px-0">
            <NextLink href="/terms" className="hover:text-brand-green transition-colors lg:whitespace-nowrap">TERMS OF USE</NextLink>
            <NextLink href="/privacy" className="hover:text-brand-green transition-colors lg:whitespace-nowrap">PRIVACY POLICY</NextLink>
            <NextLink href="/cookies" className="hover:text-brand-green transition-colors lg:whitespace-nowrap">COOKIE POLICY</NextLink>
            <NextLink href="/refund" className="hover:text-brand-green transition-colors lg:whitespace-nowrap">REFUND POLICY</NextLink>
          </div>

          {/* Developer - Right Aligned on Desktop */}
          <div className="order-3 flex flex-col items-center lg:items-end gap-1 text-center lg:text-right px-4 lg:px-0">
            <span className="text-foreground/30">DEVELOPED BY</span>
            <NextLink href="https://sadatkhan.com" target="_blank" className="text-brand-green hover:underline">MD SADAT KHAN</NextLink>
          </div>
        </div>
      </div>
    </footer>
  );
}





