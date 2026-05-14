"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

const posts = [
  {
    title: "The Rise of Sustainable Architecture in Dhaka",
    date: "May 10, 2026",
    category: "Sustainability",
    image: "https://images.unsplash.com/photo-1503387762-592dea58ef21?auto=format&fit=crop&q=80&w=600",
    excerpt: "How MDL is integrating green technology and eco-friendly materials into our latest residential projects."
  },
  {
    title: "Interior Trends: Maximizing Space in Urban Apartments",
    date: "May 05, 2026",
    category: "Design",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=600",
    excerpt: "Discover clever interior design tips to make your luxury apartment feel more spacious and open."
  },
  {
    title: "Real Estate Investment: Why 2026 is the Year to Buy",
    date: "April 28, 2026",
    category: "Investment",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=600",
    excerpt: "An in-depth look at the current market trends and why prime property remains a safe haven for investors."
  }
];

export default function BlogSection() {
  return (
    <section className="py-24 bg-brand-light-gray dark:bg-zinc-900 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-brand-green font-bold tracking-[0.3em] text-xs uppercase mb-4">Insights & Trends</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">From Our Blog</h3>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/blog" className="group flex items-center gap-3 text-brand-dark-green dark:text-brand-green font-bold tracking-widest text-sm hover:text-brand-green transition-colors">
              VIEW ALL POSTS <ArrowRight size={18} className="transition-transform group-hover:translate-x-2" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-sm mb-6 border border-brand-soft-gray dark:border-zinc-800">
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute top-4 left-4 bg-brand-dark-green text-white px-4 py-1 text-[10px] font-bold tracking-widest uppercase">
                  {post.category}
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-brand-medium-gray dark:text-brand-white/40 text-xs mb-4">
                <Calendar size={14} />
                <span>{post.date}</span>
              </div>
              
              <h4 className="text-xl font-bold text-foreground mb-4 group-hover:text-brand-green transition-colors leading-tight">
                {post.title}
              </h4>
              <p className="text-brand-medium-gray dark:text-brand-white/60 text-sm leading-relaxed mb-6 line-clamp-2">
                {post.excerpt}
              </p>
              
              <div className="inline-flex items-center gap-2 text-brand-dark-green dark:text-brand-green font-bold text-xs tracking-widest border-b border-brand-soft-gray dark:border-zinc-800 pb-1 group-hover:border-brand-green transition-all uppercase">
                Read Article
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
