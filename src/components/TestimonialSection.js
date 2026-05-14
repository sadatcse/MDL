"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "G.M. Jainal Abedin Bhuiya",
    role: "Business Consultant",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    text: "A clear reflection of quality and professionalism. Thank you to the entire MDL team who put in their effort to make this happen."
  },
  {
    name: "Sarah Mahmud",
    role: "Interior Designer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    text: "Their attention to detail in architectural finishes is unmatched. Working with MDL has shown me their commitment to excellence."
  },
  {
    name: "Engr. Rafiqul Islam",
    role: "Structural Engineer",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
    text: "As a professional in the industry, I highly value structural integrity. MDL projects consistently meet the highest standards."
  },
  {
    name: "Tanvir Ahmed",
    role: "Tech Entrepreneur",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    text: "The handover process was seamless. The transparency and professionalism at MDL are truly world-class in every aspect."
  },
  {
    name: "Nusrat Jahan",
    role: "Doctor",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
    text: "MDL doesn't just build apartments; they create homes. The community and amenities provided are perfect for a modern family."
  },
  {
    name: "Imtiaz Karim",
    role: "Architect",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    text: "Designing with MDL has been a pleasure. Their ability to translate complex blueprints into stunning reality is commendable."
  }
];

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleItems = 3;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1 >= testimonials.length - (visibleItems - 1) ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 < 0 ? testimonials.length - visibleItems : prev - 1));
  };

  return (
    <section className="py-24 bg-background dark:bg-black relative overflow-hidden transition-colors duration-500">
      {/* Decorative Brand Circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-dark-green/10 rounded-full blur-3xl -ml-48 -mb-48"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-brand-green font-bold tracking-[0.3em] text-sm uppercase mb-4">Testimonials</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-foreground">What Our Clients Say</h3>
          </motion.div>

          <div className="flex gap-4">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-brand-soft-gray flex items-center justify-center text-foreground hover:bg-brand-green hover:text-white hover:border-brand-green transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-brand-soft-gray flex items-center justify-center text-foreground hover:bg-brand-green hover:text-white hover:border-brand-green transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <motion.div
            animate={{ x: `-${currentIndex * (100 / visibleItems)}%` }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex gap-8"
          >
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="min-w-[calc(100%/1-2rem)] md:min-w-[calc(100%/2-1rem)] lg:min-w-[calc(100%/3-1.35rem)] bg-brand-light-gray dark:bg-zinc-900 p-8 rounded-sm border border-brand-soft-gray dark:border-zinc-800 flex flex-col justify-between group transition-all duration-500"
              >
                <div>
                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={14} className="text-brand-green fill-brand-green" />
                    ))}
                  </div>
                  <Quote size={40} className="text-brand-green/10 mb-4 group-hover:text-brand-green/20 transition-colors" />
                  <p className="text-brand-medium-gray dark:text-brand-white/70 text-lg italic leading-relaxed mb-8">
                    "{t.text}"
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-brand-green/30">
                    <Image src={t.image} alt={t.name} fill sizes="48px" className="object-cover" />
                  </div>
                  <div>
                    <h4 className="text-foreground font-bold text-sm tracking-wide">{t.name}</h4>
                    <p className="text-brand-green text-[10px] font-bold uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
