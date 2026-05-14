"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function StatsSection() {
  return (
    <section className="py-20 bg-brand-black dark:bg-black overflow-hidden transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Content */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
                MDL has been shaping the real estate market since 1996 -
              </h2>
              <p className="text-brand-sage-gray text-lg mb-8 leading-relaxed">
                Delivering iconic residential and commercial properties across Dhaka.
                From architecture to construction, engineering and interior finishes -
                meeting the highest standards of quality have been at the core of MDL.
              </p>
              <p className="text-brand-medium-gray dark:text-white/60 text-lg mb-10 leading-relaxed font-light">
                Every project that has been delivered has reflected this, with the
                craftsmanship that must be seen to be believed.
              </p>

              <div className="flex items-center gap-4 text-brand-green">
                <div className="w-12 h-[2px] bg-brand-green"></div>
                <span className="font-bold tracking-widest text-sm uppercase">Our Legacy</span>
              </div>
            </motion.div>
          </div>

          {/* Right Image with Stats Badge */}
          <div className="lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] md:aspect-[4/3] rounded-sm overflow-hidden border border-brand-dark-gray"
            >
              <Image
                src="https://mdl.mohammadi-group.com/wp-content/uploads/2020/03/26-1-scaled.jpg"
                alt="MDL Project"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />

              {/* Brand Green Stats Badge */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                viewport={{ once: true }}
                className="absolute bottom-[-20px] left-[-20px] md:bottom-10 md:left-[-40px] bg-brand-dark-green p-8 md:p-12 text-white shadow-2xl z-10 border border-brand-green/20"
              >
                <div className="relative">
                  <h3 className="text-5xl md:text-7xl font-extrabold mb-2">50+</h3>
                  <p className="text-sm md:text-lg font-bold tracking-wider leading-tight uppercase">
                    Handed Over<br />Projects
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
