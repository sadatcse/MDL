"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Newspaper } from "lucide-react";

const newsItems = [
  {
    title: "MDL Receives 'Excellence in Urban Development' Award 2026",
    source: "Daily Star Business",
    date: "May 08, 2026",
    image: "https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "New Luxury Condominium Project Announced in North Gulshan",
    source: "Financial Express",
    date: "May 02, 2026",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Mohammadi Developers Ltd. Expands CSR Initiative for Construction Workers",
    source: "Prothom Alo",
    date: "April 25, 2026",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=600"
  }
];

export default function NewsMediaSection() {
  return (
    <section className="py-24 bg-background dark:bg-black transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="bg-brand-light-gray dark:bg-zinc-900 p-4 rounded-full mb-6 inline-block">
              <Newspaper size={32} className="text-brand-green" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 uppercase tracking-tight">News & Media</h2>
            <div className="w-20 h-[1px] bg-brand-green mx-auto"></div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Featured News */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="group relative aspect-[16/9] overflow-hidden rounded-sm cursor-pointer shadow-xl border border-brand-soft-gray dark:border-zinc-800">
              <Image 
                src={newsItems[0].image} 
                alt="Featured News" 
                fill 
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background dark:from-black via-black/30 to-transparent flex flex-col justify-end p-8 md:p-12 transition-colors duration-500">
                <span className="text-brand-green font-bold text-xs tracking-widest uppercase mb-4">{newsItems[0].source} • {newsItems[0].date}</span>
                <h3 className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight group-hover:text-brand-green transition-colors drop-shadow-md">
                  {newsItems[0].title}
                </h3>
                <button className="flex items-center gap-2 text-white font-bold text-sm tracking-widest border-b border-white/30 pb-2 w-max hover:border-brand-green transition-all">
                  READ PRESS RELEASE <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Secondary News List */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {newsItems.slice(1).map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group flex gap-6 cursor-pointer border-b border-brand-soft-gray dark:border-zinc-800 pb-8 last:border-0"
              >
                <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-sm border border-brand-soft-gray dark:border-zinc-800">
                  <Image src={item.image} alt={item.title} fill sizes="128px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div>
                  <span className="text-brand-green font-bold text-[10px] tracking-widest uppercase block mb-2">{item.source}</span>
                  <h4 className="text-lg font-bold text-foreground mb-2 leading-tight group-hover:text-brand-green transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-brand-medium-gray dark:text-brand-white/40 text-xs font-medium">{item.date}</p>
                </div>
              </motion.div>
            ))}
            
            <motion.div
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               className="mt-4"
            >
              <button className="w-full py-4 bg-brand-dark-green text-white font-bold text-xs tracking-[0.3em] rounded-sm hover:bg-brand-green transition-all uppercase shadow-lg">
                Explore Media Center
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
