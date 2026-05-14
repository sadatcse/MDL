import PageHero from '@/components/PageHero';

export default function Services() {
  return (
    <div className="bg-background dark:bg-black min-h-screen font-sans transition-colors duration-500">
      <PageHero 
        title="Our Services"
        subtitle="Comprehensive real estate solutions tailored to your needs, from luxury residential developments to modern commercial environments."
        image="/slider1.jpeg"
        accentText="What We Offer"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {[
          { title: "Residential Development", desc: "Creating dream homes and communities." },
          { title: "Commercial Spaces", desc: "Building modern workspaces and retail environments." },
          { title: "Property Management", desc: "Comprehensive management and maintenance." },
          { title: "Architectural Design", desc: "Innovative layout planning and exterior design." }
        ].map((service, idx) => (
          <div key={idx} className="bg-brand-light-gray dark:bg-zinc-900 rounded-2xl shadow-lg p-8 border border-brand-soft-gray dark:border-zinc-800 hover:-translate-y-1 transition-transform duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-foreground">{service.title}</h3>
            <p className="text-brand-medium-gray dark:text-brand-white/60">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
}
