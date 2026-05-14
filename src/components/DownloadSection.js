"use client";

import { motion } from "framer-motion";
import { FileText, Download } from "lucide-react";

export default function DownloadSection() {
  const downloads = [
    { name: "Terms & Conditions", file: "/Terms-Condition.pdf" },
    { name: "Application Form", file: "/Aplication.pdf" },
  ];

  return (
    <section className="py-24 bg-brand-white border-t border-brand-soft-gray overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-brand-dark-green font-bold tracking-[0.3em] text-[10px] md:text-xs uppercase mb-4">Resources</h2>
            <h3 className="text-4xl font-bold text-brand-black mb-6">Download Center</h3>
            <div className="w-24 h-[1px] bg-brand-green mx-auto mb-8"></div>
            <p className="text-brand-medium-gray max-w-xl mx-auto font-light text-sm leading-relaxed">
              Access important documents and application forms required for our property booking and legal processes.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {downloads.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative bg-brand-light-gray p-10 rounded-sm flex items-center justify-between group hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-brand-green/20"
            >
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/5 -mr-16 -mt-16 rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
              
              <div className="relative z-10 flex items-center gap-8">
                <div className="w-20 h-20 bg-brand-white flex items-center justify-center rounded-sm shadow-sm border border-brand-soft-gray group-hover:bg-brand-dark-green group-hover:border-brand-dark-green transition-all duration-500">
                  <FileText size={32} className="text-brand-green group-hover:text-brand-white transition-colors duration-500" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-brand-black mb-2 group-hover:text-brand-green transition-colors duration-300">
                    {item.name}
                  </h4>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-brand-medium-gray uppercase tracking-widest bg-brand-soft-gray/30 px-2 py-0.5 rounded">PDF</span>
                    <span className="text-[10px] font-bold text-brand-green uppercase tracking-widest">Available Now</span>
                  </div>
                </div>
              </div>
              
              <a 
                href={item.file} 
                download 
                className="relative z-10 w-14 h-14 bg-brand-dark-green text-brand-white rounded-full flex items-center justify-center hover:bg-brand-green transition-all duration-300 shadow-xl shadow-brand-dark-green/20 group-hover:scale-110"
                title={`Download ${item.name}`}
              >
                <Download size={24} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
