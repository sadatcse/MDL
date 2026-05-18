import { query } from '@/lib/db';
import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/PageHero';

export const dynamic = 'force-dynamic';

export default async function Project() {
  const projectsData = await query('SELECT * FROM projects ORDER BY created_at DESC');
  return (
    <div className="bg-background dark:bg-black min-h-screen transition-colors duration-500">
      <PageHero 
        title="Our Iconic Projects"
        subtitle="Explore our portfolio of meticulously designed residential and commercial properties that redefine the skyline of Dhaka."
        image="/slider4.jpeg"
        accentText="Excellence in Architecture"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projectsData.map((project) => (
          <div 
            key={project.id} 
            className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-brand-light-gray dark:bg-zinc-900 border border-brand-soft-gray dark:border-zinc-800 flex flex-col"
          >
            {/* Project Thumbnail */}
            <div className="relative h-64 w-full overflow-hidden">
              <Image
                src={project.photo_thumbnail}
                alt={project.project_name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-brand-dark-green text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                {project.project_status}
              </div>
            </div>

            {/* Project Details */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-bold text-foreground">
                  {project.project_name}
                </h3>
                <span className="bg-brand-green/10 text-brand-green text-xs px-2 py-1 rounded">
                  {project.project_type}
                </span>
              </div>
              
              <p className="text-sm text-brand-medium-gray dark:text-brand-white/60 mb-4 flex items-start gap-1">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {project.project_address}
              </p>

              <p className="text-brand-medium-gray dark:text-brand-white/70 text-sm mb-6 line-clamp-3">
                {project.description}
              </p>

              <div className="mt-auto space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm border-t border-brand-soft-gray dark:border-zinc-800 pt-4">
                  <div>
                    <p className="text-brand-medium-gray dark:text-brand-white/40 text-xs uppercase tracking-wider">Area</p>
                    <p className="font-semibold text-foreground">{project.area}</p>
                  </div>
                  <div>
                    <p className="text-brand-medium-gray dark:text-brand-white/40 text-xs uppercase tracking-wider">Size</p>
                    <p className="font-semibold text-foreground">{project.flat_size}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <a 
                    href={project.google_map_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 text-center bg-brand-soft-gray dark:bg-zinc-800 hover:bg-brand-green/20 text-foreground font-medium py-2 rounded-lg transition-colors border border-brand-soft-gray dark:border-zinc-700"
                  >
                    View Map
                  </a>
                  <a 
                    href={project.brochure_url}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="flex-1 text-center bg-brand-dark-green hover:bg-brand-green text-white font-medium py-2 rounded-lg transition-colors shadow-sm"
                  >
                    Brochure
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
}
