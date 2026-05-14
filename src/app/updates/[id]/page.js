"use client";

import { use } from "react";
import PageHero from "@/components/PageHero";
import updatesData from "@/data/updates.json";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Share2, Bookmark } from "lucide-react";
import { notFound } from "next/navigation";

export default function UpdateDetails({ params }) {
  // In Next.js 15+, params is a promise
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const update = updatesData.find((u) => u.id === id);

  if (!update) {
    notFound();
  }

  return (
    <main className="bg-background dark:bg-black min-h-screen pb-24 transition-colors duration-500">
      <div className="relative h-[60vh] min-h-[500px] w-full flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src={update.image} 
            alt={update.title} 
            fill 
            priority
            className="object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background dark:from-black via-black/40 to-transparent transition-colors duration-500"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-brand-green text-white px-4 py-1 text-[10px] font-bold tracking-widest uppercase rounded-sm">
                {update.type}
              </span>
              <div className="flex items-center gap-2 text-white/80 text-[10px] font-bold tracking-widest uppercase">
                <Calendar size={14} className="text-brand-green" />
                <span>{update.date}</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              {update.title}
            </h1>
            <div className="flex items-center gap-3 text-white/60 text-xs font-medium uppercase tracking-wider">
              <span>Source:</span>
              <span className="text-brand-green">{update.source}</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <Link 
              href="/updates" 
              className="inline-flex items-center gap-2 text-brand-medium-gray hover:text-brand-green transition-colors text-xs font-bold uppercase tracking-widest mb-12 group"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              Back to Updates
            </Link>

            <article className="prose prose-lg max-w-none text-foreground">
              <p className="text-xl text-foreground font-medium leading-relaxed mb-8 italic border-l-4 border-brand-green pl-6">
                {update.excerpt}
              </p>
              
              <div className="text-brand-medium-gray dark:text-brand-white/70 leading-loose space-y-6">
                <p>
                  Dhaka, Bangladesh — Mohammadi Developers Ltd (MDL) continues to set new benchmarks in the real estate industry. 
                  This recent update highlights our ongoing commitment to excellence, innovation, and community service. 
                  As a leading name in the sector, we believe in transparency and keeping our stakeholders informed about 
                  our major milestones, award wins, and corporate social responsibility initiatives.
                </p>
                <p>
                  Our projects are designed with a focus on sustainability and modern living standards, ensuring that 
                  every resident experiences the premium quality that the Mohammadi Group of Companies is known for. 
                  Whether it's a prestigious award for urban development or the launch of a new luxury project, 
                  each step we take is dedicated to serving mankind and building a better future for Bangladesh.
                </p>
                <h3 className="text-2xl font-bold text-foreground mt-12 mb-6">Key Highlights</h3>
                <p>
                  We focus on quality construction conforming to ACI & ASTM codes, ensuring timely handover and dedicated service. 
                  Our corporate philosophy remains simple: Give the customer value for money. 
                  This award/event is a testament to the hard work and dedication of our entire team.
                </p>
              </div>

              <div className="mt-16 pt-8 border-t border-brand-soft-gray dark:border-zinc-800 flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-foreground uppercase tracking-widest">Share this:</span>
                  <div className="flex gap-2">
                    <button className="w-10 h-10 rounded-full border border-brand-soft-gray dark:border-zinc-800 flex items-center justify-center text-foreground hover:bg-brand-green hover:border-brand-green hover:text-white transition-all">
                      <Share2 size={18} />
                    </button>
                    <button className="w-10 h-10 rounded-full border border-brand-soft-gray dark:border-zinc-800 flex items-center justify-center text-foreground hover:bg-brand-green hover:border-brand-green hover:text-white transition-all">
                      <Bookmark size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-12">
              <div className="bg-brand-light-gray dark:bg-zinc-900 p-8 rounded-sm border border-brand-soft-gray dark:border-zinc-800">
                <h4 className="text-sm font-bold text-foreground uppercase tracking-widest mb-6 border-b border-brand-soft-gray dark:border-zinc-800 pb-4">
                  Related Updates
                </h4>
                <div className="space-y-8">
                  {updatesData.filter(u => u.id !== id).slice(0, 3).map(related => (
                    <Link key={related.id} href={`/updates/${related.id}`} className="group block">
                      <div className="flex gap-4">
                        <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded-sm">
                          <Image src={related.image} alt={related.title} fill className="object-cover transition-transform group-hover:scale-110" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-brand-green uppercase tracking-widest mb-1">{related.date}</p>
                          <h5 className="text-sm font-bold text-foreground group-hover:text-brand-green transition-colors line-clamp-2">
                            {related.title}
                          </h5>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-brand-dark-green p-8 rounded-sm text-white shadow-xl">
                <h4 className="text-lg font-bold mb-4 italic">"Building the Future, Serving Mankind."</h4>
                <p className="text-xs text-white/70 font-light leading-relaxed mb-6">
                  Experience the pinnacle of luxury living with MDL. Our projects are more than just buildings; they are dreams realized.
                </p>
                <Link href="/contact" className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase border-b border-brand-green pb-1 hover:text-brand-green transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
