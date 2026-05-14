"use client";

import { motion } from "framer-motion";
import { Clock, ShieldCheck, Users, TrendingUp } from "lucide-react";

const features = [
  {
    icon: <Clock size={40} className="text-brand-green" />,
    title: "On Time Delivery",
    description: "Committed to delivering projects on schedule with meticulous planning and execution."
  },
  {
    icon: <ShieldCheck size={40} className="text-brand-green" />,
    title: "Quality Assurance",
    description: "Rigorous quality checks and premium materials ensure lasting value and satisfaction."
  },
  {
    icon: <Users size={40} className="text-brand-green" />,
    title: "Customer-Centric",
    description: "Dedicated support team and transparent processes for a seamless experience."
  },
  {
    icon: <TrendingUp size={40} className="text-brand-green" />,
    title: "Smart Investment",
    description: "Prime locations and appreciation potential for long-term investment value."
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 relative overflow-hidden bg-background dark:bg-black transition-colors duration-500">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="h-1 w-16 bg-brand-green mb-6"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Why Choose Mohammadi Developers
            </h2>
            <p className="text-brand-medium-gray dark:text-brand-white/60 max-w-2xl mx-auto font-light">
              Experience the perfect blend of luxury, quality, and value with our 
              comprehensive approach to real estate development.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-brand-light-gray dark:bg-brand-white p-8 rounded-sm border border-brand-soft-gray hover:border-brand-green/30 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="mb-6 transform transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4 tracking-wide uppercase">
                {feature.title}
              </h3>
              <p className="text-brand-medium-gray dark:text-brand-white/70 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
