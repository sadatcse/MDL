import Link from 'next/link';
import PageHero from '@/components/PageHero';

export default function CookiePolicy() {
  return (
    <main className="min-h-screen bg-background dark:bg-black transition-colors duration-500">
      <PageHero 
        title="Cookie Policy"
        subtitle="Last updated: May 12, 2026. Learn how we use cookies to improve your experience."
        image="/slider2.jpeg"
        accentText="Legal Information"
        height="h-[40vh] min-h-[300px]"
      />
      <div className="container mx-auto px-6 max-w-4xl py-20">

        <div className="prose prose-lg max-w-none text-foreground space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 border-l-4 border-brand-green pl-4">1. What are Cookies?</h2>
            <p className="text-brand-medium-gray dark:text-brand-white/70">
              Cookies are small text files that are stored on your device (computer or mobile) when you visit a website. They are widely used to make websites work or to work more efficiently.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 border-l-4 border-brand-green pl-4">2. How We Use Cookies</h2>
            <ul className="list-disc pl-10 mt-4 space-y-2 text-brand-medium-gray dark:text-brand-white/60">
              <li><strong>Essential Cookies:</strong> Necessary for the website to function correctly.</li>
              <li><strong>Analytical Cookies:</strong> To understand how visitors interact with our website.</li>
              <li><strong>Functional Cookies:</strong> To remember your preferences and settings.</li>
            </ul>
          </section>

          <section className="pt-10 border-t border-brand-soft-gray dark:border-white/10">
            <p className="text-brand-medium-gray dark:text-brand-white/70">
              By continuing to use our website, you consent to our use of cookies. For further inquiries, please <Link href="/contact" className="text-brand-green font-bold hover:underline transition-colors">get in touch</Link>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
