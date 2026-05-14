import React from 'react';
import Image from 'next/image';
import PageHero from '@/components/PageHero';

export const metadata = {
  title: 'Features | Mohammadi Developers Ltd.',
  description: 'Explore the premium features and amenities of Mohammadi Developers Ltd. properties.',
};

export default function Feature() {
  const categories = [
    {
      title: "General Features",
      icon: (
        <svg className="w-8 h-8 text-[#4caf50]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
      ),
      items: [
        "Totally wooden made Malaysian/equivalent main door, mortis locker and check viewer.",
        "Without bathroom, all are Inside doors, pretext flash door, French polish, enamel paint contained.",
        "All door (without bathroom and kitchen) mortis locker.",
        "Ceramic tiles on floor and skirting (R.A.K/Great wall or equivalent).",
        "Distemper at wall and ceiling.",
        "Highly standard aluminum sliding window, 5MM glass and iron grill for safety.",
        "Iron pipes rolling on R.C.C of all barandas.",
        "2 electric fittings in master bed and living room for air-condition.",
        "Telephone fitting in master bed room and rest room.",
        "Automatic circuit breaker for each 8.D.B.",
        "Highly standard prity / winner or equivalent switch and plug paint."
      ]
    },
    {
      title: "Features of Toilet",
      icon: (
        <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
      ),
      items: [
        "Highly standard corm plate fittings RAK/Geat wall or equivalent.",
        "Maximum standard Sharif Metal and R.A.K sanitary things (without bath tub).",
        "Ceramic wall in all toilets and floor tiller R.A.K /Great wall or equivalent.",
        "One mirror, soap case, towel rail, posh shower, paper holder and others (local standard).",
        "Jigger fittings facility and separate plug pain at master bathroom.",
        "UPVC door."
      ]
    },
    {
      title: "Features of Kitchen",
      icon: (
        <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" /></svg>
      ),
      items: [
        "To set up tow-burner, RAK / Great wall or equivalent ceramic tiles platform on concrete base.",
        "At floor, ceramic tiles RAK / Great wall or equivalent.",
        "One stainless steel sink (local) and facility of egoist fan set up."
      ]
    },
    {
      title: "Other Features",
      icon: (
        <svg className="w-8 h-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
      ),
      items: [
        "Inter com facility at dining room.",
        "Internal pipe facility for cable line and T.V antenna.",
        "Highly standard lift facility.",
        "Room, guard room, kitchen, toilet facility at ground floor."
      ]
    },
    {
      title: "Construction Structure",
      icon: (
        <svg className="w-8 h-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
      ),
      items: [
        "Highly RCC structure as per ACI and BNBC code.",
        "Experienced architect and engineers made plan and supervision of whole work."
      ]
    },
    {
      title: "Rights of Company",
      icon: (
        <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
      ),
      items: [
        "The company preserves the right of alternation or increase of structure or any feature for the interest of project at any ground.",
        "Honorable purchaser will be able to alter/change any fittings/tiles/ceramic at additional cost as per approval of Authority within fixed time."
      ]
    }
  ];

  return (
    <div className="bg-background dark:bg-black min-h-screen font-sans selection:bg-brand-green selection:text-white pb-24 transition-colors duration-500">
      
      <PageHero 
        title="Features & Amenities"
        subtitle="Discover the uncompromised standard of living we provide. From structural integrity to premium finishings, we build with excellence in mind."
        image="/slider5.jpeg"
        accentText="Premium Quality"
      />

      {/* Grid of Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div key={index} className="bg-brand-light-gray dark:bg-zinc-900 rounded-3xl p-8 shadow-md hover:shadow-2xl border border-brand-soft-gray dark:border-zinc-800 transition-all duration-300 flex flex-col h-full group">
              <div className="w-16 h-16 rounded-2xl bg-background dark:bg-zinc-950 border border-brand-soft-gray dark:border-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                {category.icon}
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-6 tracking-tight">
                {category.title}
              </h2>
              <ul className="space-y-4 flex-grow">
                {category.items.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="w-5 h-5 text-brand-medium-gray/40 dark:text-zinc-600 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="text-brand-medium-gray dark:text-brand-white/70 leading-relaxed text-sm">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
