import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  return (
    <div className="bg-background dark:bg-black min-h-screen font-sans selection:bg-brand-green selection:text-white transition-colors duration-500">

      {/* 1. Dramatic Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/slider3.jpeg"
            alt="MDL Buildings"
            fill
            sizes="100vw"
            className="object-cover scale-105"
            priority
          />
          {/* Complex Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background dark:to-black"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
          <span className="text-brand-green font-bold tracking-[0.2em] uppercase text-sm mb-4 block">
            Since 1992
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 drop-shadow-lg">
            Building the Future, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Serving Mankind.</span>
          </h1>
          <p className="text-lg md:text-2xl text-white/80 font-light max-w-2xl mx-auto">
            Pioneers in Bangladesh's real estate, creating sustainable and magnificent living spaces.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 space-y-32">

        {/* 2. Who We Are (Asymmetric Editorial Layout) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl">
              <Image src="/slider4.jpeg" alt="MDL Projects" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover hover:scale-105 transition-transform duration-1000" />
            </div>
            {/* Floating aesthetic box */}
            <div className="absolute -bottom-10 -right-10 bg-brand-light-gray dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border border-brand-soft-gray dark:border-zinc-800 hidden md:block">
              <p className="text-4xl font-black text-brand-green">30+</p>
              <p className="text-sm font-bold text-brand-medium-gray dark:text-brand-white/60 uppercase tracking-widest mt-1">Years of Trust</p>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-2">
                Who We Are
              </h2>
              <div className="w-20 h-1.5 bg-brand-green rounded-full"></div>
            </div>

            <div className="prose prose-lg dark:prose-invert text-brand-medium-gray dark:text-brand-white/70">
              <p className="text-xl leading-relaxed text-foreground font-medium">
                <span className="text-brand-green">MOHAMMADI DEVELOPERS LTD (MDL)</span> is a proud concern of the MOHAMMADI GROUP OF COMPANIES.
              </p>
              <p>
                The corporate name MOHAMMADI bears the touch of a religion where the prime motive is serving mankind. Profits earned by the group are mostly spent on the education and health care of poor children. This has made MOHAMMADI an organization truly different from others in Bangladesh.
              </p>

              <div className="bg-brand-light-gray dark:bg-zinc-900 rounded-2xl p-8 mt-8 border border-brand-soft-gray dark:border-zinc-800 shadow-sm">
                <h3 className="font-bold text-foreground mb-6 text-xl">Our Unwavering Emphases:</h3>
                <ul className="space-y-4">
                  {[
                    "Construction of premium Apartments in urban areas.",
                    "Achieving high-standard quality conforming to ACI & ASTM codes.",
                    "Reasonable & affordable prices with modern facilities in key locations.",
                    "Unwavering commitment for timely handover.",
                    "Dedicated service to clients until complete satisfaction."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start group">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-green/10 flex items-center justify-center mr-4 mt-0.5 group-hover:bg-brand-green transition-colors">
                        <svg className="w-4 h-4 text-brand-green group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span className="text-brand-medium-gray dark:text-brand-white/60">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Message from MD (Premium Quote Style) */}
        <section className="relative w-full rounded-[3rem] overflow-hidden bg-zinc-950 text-white shadow-2xl transition-colors duration-500">
          <div className="absolute inset-0 opacity-10">
            <svg className="absolute left-10 top-10 w-40 h-40 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-5 relative min-h-[500px] overflow-hidden group">
              <Image
                src="/Amin-Ud-Dowla2.jpg"
                alt="Amin-Ud-Dowla - Managing Director"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              {/* Elegant overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

              <div className="absolute bottom-0 left-0 right-0 p-12 lg:p-16">
                <div className="w-16 h-1 bg-brand-green mb-6"></div>
                <h3 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Message from MD</h3>
                <p className="text-xl font-bold text-white">Amin-Ud-Dowla</p>
                <p className="text-brand-green font-semibold text-sm uppercase tracking-widest mt-1">Managing Director</p>
              </div>
            </div>

            <div className="lg:col-span-7 p-12 lg:p-20 flex flex-col justify-center space-y-6">
              <p className="text-lg text-zinc-300 font-light leading-relaxed">
                Today Bangladesh stands on the juncture of economic emancipation. The stage is set for rapid growth and development in every sector of the economy. The Real Estate sector is also experiencing significant changes. Professionalism is the key word for success nowadays.
              </p>
              <p className="text-lg text-zinc-300 font-light leading-relaxed">
                We at Mohammadi Developers Ltd. are determined to play a leading role. Today, in the field of Real Estate Development, we are a recognized leader; respected for our achievements, professional ethics and innovative concepts.
              </p>
              <blockquote className="border-l-4 border-brand-green pl-6 py-4 my-6">
                <p className="text-2xl font-medium text-white italic">
                  "Our corporate philosophy is based on a very simple principle – Give the customer value for money."
                </p>
              </blockquote>
              <p className="text-lg text-zinc-300 font-light leading-relaxed">
                Our vision is to constantly set challenging goals for ourselves. We will continue to expand and diversify and be an example of a progressive company playing a dynamic role in the economic development of Bangladesh.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Vision & Mission (Premium Brand-Themed Layout) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Vision Card */}
          <div className="relative group rounded-[2.5rem] overflow-hidden shadow-2xl border border-brand-soft-gray/20 dark:border-zinc-800">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-deep-green to-black z-0"></div>
            <div className="absolute inset-0 bg-[url('/slider1.jpeg')] opacity-10 mix-blend-overlay group-hover:scale-110 transition-transform duration-[2000ms] z-0 object-cover bg-cover bg-center"></div>

            <div className="relative z-10 p-10 lg:p-14 h-full flex flex-col backdrop-blur-sm">
              <div className="w-16 h-16 bg-brand-green/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md border border-brand-green/20 group-hover:bg-brand-green/20 transition-colors">
                <svg className="w-8 h-8 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>

              <h2 className="text-4xl font-extrabold mb-6 text-white tracking-tight">Our Vision</h2>
              <p className="text-xl text-white/80 font-light leading-relaxed mb-8">
                To redefine the skyline of South Asia by becoming a premier international real estate developer, recognized for architectural excellence, sustainable innovation, and the creation of landmark communities that inspire generations.
              </p>

              <ul className="space-y-4 mt-auto">
                {[
                  "Regional Leadership in Real Estate",
                  "Sustainable Architectural Innovation",
                  "Creating Legacies for Generations"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-brand-white/60 text-sm font-medium uppercase tracking-wider">
                    <span className="w-2 h-2 bg-brand-green rounded-full mr-3 shadow-[0_0_10px_rgba(42,145,72,0.5)]"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mission Card */}
          <div className="relative group rounded-[2.5rem] overflow-hidden shadow-2xl border border-brand-soft-gray/20 dark:border-zinc-800">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-dark-green to-black z-0"></div>
            <div className="absolute inset-0 bg-[url('/slider2.jpeg')] opacity-10 mix-blend-overlay group-hover:scale-110 transition-transform duration-[2000ms] z-0 object-cover bg-cover bg-center"></div>

            <div className="relative z-10 p-10 lg:p-14 h-full flex flex-col backdrop-blur-sm">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md border border-white/10 group-hover:bg-white/10 transition-colors">
                <svg className="w-8 h-8 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>

              <h2 className="text-4xl font-extrabold mb-6 text-white tracking-tight">Our Mission</h2>
              <p className="text-xl text-white/80 font-light leading-relaxed mb-8">
                To cultivate deep-rooted trust by winning our customers' hearts through unparalleled quality and integrity. We are dedicated to fostering a dynamic, inclusive, and empowering workplace where our employees can thrive and innovate.
              </p>

              <ul className="space-y-4 mt-auto">
                {[
                  "Customer Success & Absolute Trust",
                  "Excellence in Engineering & Quality",
                  "Empowering People & Communities"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-brand-white/60 text-sm font-medium uppercase tracking-wider">
                    <span className="w-2 h-2 bg-brand-green rounded-full mr-3 shadow-[0_0_10px_rgba(42,145,72,0.5)]"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 5. Core Values (Clean, Staggered Grid Layout) */}
        <section>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-extrabold text-foreground mb-6">Our Core Values</h2>
            <p className="text-brand-medium-gray dark:text-brand-white/60 text-lg">The foundational principles that guide every brick we lay and every relationship we build.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              { num: "01", text: "Win the customer’s heart.", img: "/Corevalues/1.jpeg" },
              { num: "02", text: "Work harder than everyone else and strive to be the best.", img: "/Corevalues/2.jpeg" },
              { num: "03", text: "Maintain an Entrepreneurial Spirit.", img: "/Corevalues/3.jpeg" },
              { num: "04", text: "Respect, Develop and Empower our people.", img: "/Corevalues/4.jpeg" },
              { num: "05", text: "High Morals, Honesty & Integrity.", img: "/Corevalues/5.jpeg" },
              { num: "06", text: "Speed of work, Fight Bureaucracy and Remove Superfluous work.", img: "/Corevalues/6.jpeg" },
            ].map((value, idx) => (
              <div
                key={value.num}
                className={`relative group rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border border-brand-soft-gray dark:border-zinc-800 transition-all duration-700 h-[350px] ${idx === 1 || idx === 4 ? 'lg:translate-y-8' : ''}`}
              >
                {/* Background Image */}
                <Image
                  src={value.img}
                  alt={value.text}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-1000 brightness-[0.7] dark:brightness-[0.6] group-hover:brightness-100"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-700 group-hover:opacity-90"></div>

                {/* Decorative background number */}
                <div className="absolute -right-4 -bottom-8 text-9xl font-black text-white/10 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-x-4">
                  {value.num}
                </div>

                <div className="absolute inset-0 z-10 p-10 flex flex-col justify-end">
                  <span className="inline-block w-max px-4 py-1 rounded-full bg-brand-green/20 text-brand-green text-[10px] font-bold tracking-widest mb-4 border border-brand-green/30 backdrop-blur-md">
                    VALUE {value.num}
                  </span>
                  <p className="text-xl font-bold text-white leading-tight group-hover:text-brand-green transition-colors">
                    {value.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
