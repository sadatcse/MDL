import Image from 'next/image';

export default function PageHero({ 
  title, 
  subtitle, 
  image = "/slider3.jpeg", 
  accentText = "Mohammadi Developers Ltd.",
  height = "h-[50vh] min-h-[400px]"
}) {
  return (
    <section className={`relative ${height} w-full flex items-center justify-center overflow-hidden`}>
      <div className="absolute inset-0 z-0">
        <Image 
          src={image} 
          alt={title} 
          fill 
          sizes="100vw"
          className="object-cover scale-105" 
          priority
        />
        {/* Complex Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-background dark:to-black transition-colors duration-500"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
        <span className="text-brand-green font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-4 block bg-black/20 backdrop-blur-sm w-fit mx-auto px-4 py-1 rounded-full border border-white/10">
          {accentText}
        </span>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-6 drop-shadow-2xl">
          {title}
        </h1>
        {subtitle && (
          <p className="text-base md:text-xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:block">
        <div className="w-[1px] h-12 bg-gradient-to-b from-brand-green to-transparent animate-pulse"></div>
      </div>
    </section>
  );
}
