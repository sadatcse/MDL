"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Newspaper, Calendar } from "lucide-react";
import updatesData from "@/data/updates.json";

export default function LatestUpdates() {
  return (
    <section className="py-24 bg-background dark:bg-black transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-brand-green font-bold tracking-[0.3em] text-xs uppercase mb-4">Stay Updated</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">Media and Event</h3>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link 
              href="/updates" 
              className="group flex items-center gap-3 text-brand-green font-bold tracking-widest text-sm hover:text-foreground transition-colors uppercase"
            >
              View All Updates <ArrowRight size={18} className="transition-transform group-hover:translate-x-2" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {updatesData.slice(0, 3).map((update, index) => (
            <motion.div
              key={update.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-brand-light-gray dark:bg-brand-white border border-brand-soft-gray overflow-hidden hover:shadow-2xl transition-all duration-500 rounded-sm"
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
                <div className="flex items-center gap-4 text-brand-medium-gray dark:text-brand-white/60 text-[10px] font-bold tracking-widest uppercase mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar size={12} className="text-brand-green" />
                    <span>{update.date}</span>
                  </div>
                  <div className="w-[1px] h-3 bg-brand-soft-gray"></div>
                  <span>{update.source}</span>
                </div>
                
                <Link href={`/updates/${update.id}`}>
                  <h4 className="text-xl font-bold text-foreground mb-4 group-hover:text-brand-green transition-colors leading-tight min-h-[3.5rem]">
                    {update.title}
                  </h4>
                </Link>
                <p className="text-brand-medium-gray dark:text-brand-white/70 text-sm leading-relaxed mb-8 line-clamp-2">
                  {update.excerpt}
                </p>
                
                <Link 
                  href={`/updates/${update.id}`}
                  className="flex items-center gap-2 text-brand-green font-bold text-xs tracking-widest hover:text-foreground transition-all uppercase"
                >
                  Read More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
