"use client";

import PageHero from "@/components/PageHero";
import updatesData from "@/data/updates.json";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";

export default function UpdatesListing() {
  return (
    <main className="bg-background dark:bg-black min-h-screen transition-colors duration-500">
      <PageHero 
        title="Media and Events" 
        subtitle="Stay informed with the latest news, awards, and community events from Mohammadi Developers Ltd."
        image="/slider5.jpeg"
        accentText="STAY UPDATED"
      />

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {updatesData.map((update, index) => (
              <motion.div
                key={update.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group bg-brand-light-gray dark:bg-zinc-900 border border-brand-soft-gray dark:border-zinc-800 overflow-hidden hover:shadow-2xl transition-all duration-500 rounded-sm"
              >
                <Link href={`/updates/${update.id}`} className="block">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image 
                      src={update.image} 
                      alt={update.title} 
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute top-4 left-4 bg-brand-dark-green text-white px-4 py-1 text-[10px] font-bold tracking-widest uppercase">
                      {update.type}
                    </div>
                  </div>
                </Link>
                
                <div className="p-8">
                  <div className="flex items-center gap-4 text-brand-medium-gray dark:text-brand-white/40 text-[10px] font-bold tracking-widest uppercase mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} className="text-brand-green" />
                      <span>{update.date}</span>
                    </div>
                    <div className="w-[1px] h-3 bg-brand-soft-gray dark:bg-zinc-800"></div>
                    <span>{update.source}</span>
                  </div>
                  
                  <Link href={`/updates/${update.id}`}>
                    <h4 className="text-xl font-bold text-foreground mb-4 group-hover:text-brand-green transition-colors leading-tight min-h-[3.5rem]">
                      {update.title}
                    </h4>
                  </Link>
                  
                  <p className="text-brand-medium-gray dark:text-brand-white/60 text-sm leading-relaxed mb-8 line-clamp-2">
                    {update.excerpt}
                  </p>
                  
                  <Link 
                    href={`/updates/${update.id}`}
                    className="flex items-center gap-2 text-brand-dark-green dark:text-brand-green font-bold text-xs tracking-widest hover:text-brand-green transition-all uppercase"
                  >
                    Read More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
