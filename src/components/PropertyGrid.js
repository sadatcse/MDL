"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Loader2 } from "lucide-react";

export default function PropertyGrid() {
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ongoing");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        if (Array.isArray(data)) setProjectsData(data);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset to first page when changing tabs
  };

  const filteredProjects = projectsData.filter(
    (project) => project.project_status === activeTab
  );

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Smooth scroll to top of grid
    const element = document.getElementById("property-grid-header");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="py-24 bg-background dark:bg-black transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-green font-bold tracking-[0.2em] text-sm uppercase mb-4 block">
              Choose The Best
            </span>
            <h2 id="property-grid-header" className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Properties in the City
            </h2>
            <div className="w-24 h-[1px] bg-brand-green mx-auto mb-8"></div>
            <p className="text-brand-medium-gray dark:text-brand-white/60 max-w-2xl mx-auto font-light leading-relaxed">
              We offer a wide variety of residential and commercial properties in Dhaka. 
              Find your dream home or commercial space from our portfolio.
            </p>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex bg-brand-light-gray dark:bg-zinc-900 p-1 rounded-sm border border-brand-soft-gray dark:border-zinc-800">
            {["ongoing", "upcoming", "handovered"].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-8 py-3 text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-brand-dark-green text-white shadow-lg"
                    : "text-brand-medium-gray dark:text-brand-white/60 hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
          <AnimatePresence mode="wait">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-brand-green animate-spin mb-4" />
                <p className="text-brand-medium-gray text-xs uppercase tracking-widest font-bold">Loading Projects...</p>
              </div>
            ) : (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
              >
              {currentItems.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group bg-brand-light-gray dark:bg-zinc-900 border border-brand-soft-gray dark:border-zinc-800 overflow-hidden hover:border-brand-green/30 hover:shadow-2xl transition-all duration-500"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={project.photo_thumbnail || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800"}
                      alt={project.project_name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4 bg-brand-dark-green text-white text-[10px] font-bold tracking-widest px-3 py-1 rounded-sm uppercase">
                      {project.project_type}
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-center gap-2 text-brand-green mb-3">
                      <MapPin size={14} />
                      <span className="text-[10px] font-bold tracking-widest uppercase truncate max-w-[200px]">
                        {project.area || project.city}, Dhaka
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-brand-green transition-colors duration-300">
                      {project.project_name}
                    </h3>
                    <div className="text-brand-medium-gray dark:text-brand-white/60 text-sm font-light mb-6 line-clamp-1">
                      {project.project_address}
                    </div>
                    
                    <button className="w-full py-3 border border-brand-soft-gray dark:border-zinc-800 text-foreground text-[10px] font-bold tracking-[0.2em] hover:bg-brand-dark-green hover:text-white hover:border-brand-dark-green transition-all duration-300 uppercase">
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-20 gap-3">
            <button
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 border transition-all duration-300 text-xs font-bold uppercase tracking-widest ${
                currentPage === 1
                  ? "border-brand-soft-gray text-brand-soft-gray cursor-not-allowed"
                  : "border-brand-soft-gray text-foreground hover:border-brand-green hover:text-brand-green"
              }`}
            >
              Prev
            </button>
            
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`w-10 h-10 flex items-center justify-center border transition-all duration-300 text-xs font-bold ${
                    currentPage === number
                      ? "bg-brand-dark-green text-white border-brand-dark-green shadow-lg"
                      : "border-brand-soft-gray text-brand-medium-gray dark:text-brand-white/60 hover:border-brand-green hover:text-brand-green"
                  }`}
                >
                  {number}
                </button>
              ))}
            </div>

            <button
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border transition-all duration-300 text-xs font-bold uppercase tracking-widest ${
                currentPage === totalPages
                  ? "border-brand-soft-gray text-brand-soft-gray cursor-not-allowed"
                  : "border-brand-soft-gray text-foreground hover:border-brand-green hover:text-brand-green"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
