import Link from 'next/link';
import PageHero from '@/components/PageHero';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background dark:bg-black transition-colors duration-500">
      <PageHero 
        title="Privacy Policy"
        subtitle="Last updated: May 12, 2026. Your privacy is our priority."
        image="/slider5.jpeg"
        accentText="Legal Information"
        height="h-[40vh] min-h-[300px]"
      />
      <div className="container mx-auto px-6 max-w-4xl py-20">

        <div className="prose prose-lg max-w-none text-foreground space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 border-l-4 border-brand-green pl-4">1. Introduction</h2>
            <p className="text-brand-medium-gray dark:text-brand-white/70">
              Mohammadi Developers Ltd. (MDL) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 border-l-4 border-brand-green pl-4">2. Information We Collect</h2>
            <ul className="list-disc pl-10 mt-4 space-y-2 text-brand-medium-gray dark:text-brand-white/60">
              <li>Contact information (name, email address, phone number).</li>
              <li>Information provided in inquiries or feedback forms.</li>
              <li>Technical data (IP address, browser type, usage patterns).</li>
            </ul>
          </section>

          <section className="pt-10 border-t border-brand-soft-gray dark:border-white/10">
            <p className="text-brand-medium-gray dark:text-brand-white/70">
              For more information about our privacy practices, please <Link href="/contact" className="text-brand-green font-bold hover:underline transition-colors">contact our privacy team</Link>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
