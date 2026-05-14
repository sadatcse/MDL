import Link from 'next/link';
import PageHero from '@/components/PageHero';

export default function TermsOfUse() {
  return (
    <main className="min-h-screen bg-background dark:bg-black transition-colors duration-500">
      <PageHero 
        title="Terms of Use"
        subtitle="Last updated: May 12, 2026. Please read our terms carefully."
        image="/slider4.jpeg"
        accentText="Legal Information"
        height="h-[40vh] min-h-[300px]"
      />
      <div className="container mx-auto px-6 max-w-4xl py-20">

        <div className="prose prose-lg max-w-none text-foreground space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 border-l-4 border-brand-green pl-4">1. Acceptance of Terms</h2>
            <p className="text-brand-medium-gray dark:text-brand-white/70">
              By accessing and using the website of Mohammadi Developers Ltd. (MDL), you agree to comply with and be bound by these Terms of Use. If you do not agree to these terms, please do not use our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 border-l-4 border-brand-green pl-4">2. Intellectual Property Rights</h2>
            <p className="text-brand-medium-gray dark:text-brand-white/70">
              All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of MDL or its content suppliers and is protected by international copyright laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 border-l-4 border-brand-green pl-4">3. Use of Website</h2>
            <p className="text-brand-medium-gray dark:text-brand-white/70">
              You may use our website for lawful purposes only. You are prohibited from using the site to:
            </p>
            <ul className="list-disc pl-10 mt-4 space-y-2 text-brand-medium-gray dark:text-brand-white/60">
              <li>Transmit any unauthorized advertising or promotional material.</li>
              <li>Attempt to gain unauthorized access to our systems or networks.</li>
              <li>Engage in any activity that disrupts or interferes with the website's functionality.</li>
            </ul>
          </section>

          <section className="pt-10 border-t border-brand-soft-gray dark:border-white/10">
            <p className="text-brand-medium-gray dark:text-brand-white/70">
              If you have any questions regarding these terms, please <Link href="/contact" className="text-brand-green font-bold hover:underline transition-colors">contact us</Link>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
