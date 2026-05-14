"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, MousePointer2 } from "lucide-react";

const slides = [
  {
    image: "/slider1.jpeg",
    hook: "Excellence in Architecture",
    title: "Luxury Living Redefined",
    subtitle: "Discover the perfect blend of comfort and elegance in our premium residential projects."
  },
  {
    image: "/slider2.jpeg",
    hook: "Modern Urban Spaces",
    title: "Crafting Iconic Skylines",
    subtitle: "Building sustainable and modern commercial spaces for the leaders of tomorrow."
  },
  {
    image: "/slider3.jpeg",
    hook: "Premium Locations",
    title: "Your Dream Home Awaits",
    subtitle: "Strategic locations across Dhaka offering convenience and elite lifestyle."
  },
  {
    image: "/slider4.jpeg",
    hook: "Sustainable Living",
    title: "Eco-Friendly Innovations",
    subtitle: "Integrating green technology for a healthier and more sustainable future."
  },
  {
    image: "/slider5.jpeg",
    hook: "Quality Construction",
    title: "Built to Last Generations",
    subtitle: "Uncompromising quality and structural integrity in every sqft we build."
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent(current === slides.length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? slides.length - 1 : current - 1);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-brand-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Background Image with Ken Burns effect */}
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6, ease: "linear" }}
            className="relative h-full w-full"
          >
            <Image
              src={slides[current].image}
              alt={slides[current].title}
              fill
              sizes="100vw"
              className="object-cover brightness-[0.4]"
              priority
            />
          </motion.div>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="flex items-center gap-4 mb-6"
                >
                  <div className="w-12 h-[2px] bg-brand-green"></div>
                  <span className="text-brand-green font-bold tracking-[0.4em] uppercase text-xs md:text-sm">
                    {slides[current].hook}
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 1 }}
                  className="text-5xl md:text-8xl font-bold text-white mb-8 leading-tight"
                >
                  {slides[current].title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="text-brand-sage-gray text-lg md:text-xl max-w-2xl mb-12 font-light leading-relaxed"
                >
                  {slides[current].subtitle}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.8 }}
                  className="flex flex-wrap gap-6"
                >
                  <div className="flex flex-wrap gap-6">
                    <Link
                      href="/project"
                      className="bg-brand-dark-green text-white px-10 py-5 rounded-sm font-bold text-xs tracking-widest uppercase transition-all hover:bg-brand-green hover:scale-105 inline-block"
                    >
                      Explore Projects
                    </Link>
                    <Link
                      href="/about"
                      className="bg-transparent text-white border border-white/30 px-10 py-5 rounded-sm font-bold text-xs tracking-widest uppercase transition-all hover:bg-white hover:text-brand-dark-green inline-block"
                    >
                      About MDL
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-12 right-12 flex items-center gap-6 z-20">
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-brand-dark-green transition-all duration-300"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-brand-dark-green transition-all duration-300"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        <div className="h-20 w-[1px] bg-white/20 mx-4 hidden md:block"></div>
        <div className="hidden md:flex flex-col items-end">
          <span className="text-white font-bold text-sm tracking-widest">
            0{current + 1}
          </span>
          <span className="text-white/30 text-xs font-bold tracking-widest uppercase">
            / 0{slides.length}
          </span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-4 text-brand-white/40">
        <span className="text-[10px] font-bold tracking-[0.4em] uppercase vertical-text">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-[2px] h-12 bg-gradient-to-b from-brand-green to-transparent"
        />
      </div>
    </section>
  );
}
