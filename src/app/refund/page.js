import Link from 'next/link';
import PageHero from '@/components/PageHero';

export default function RefundPolicy() {
  return (
    <main className="min-h-screen bg-background dark:bg-black transition-colors duration-500">
      <PageHero 
        title="Refund Policy"
        subtitle="Last updated: May 12, 2026. Understanding our cancellation and refund procedures."
        image="/slider1.jpeg"
        accentText="Legal Information"
        height="h-[40vh] min-h-[300px]"
      />
      <div className="container mx-auto px-6 max-w-4xl py-20">

        <div className="prose prose-lg max-w-none text-foreground space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 border-l-4 border-brand-green pl-4">1. Booking Cancellations</h2>
            <p className="text-brand-medium-gray dark:text-brand-white/70">
              Cancellations of property bookings must be submitted in writing to our corporate office. The refund eligibility will depend on the stage of the transaction and the specific terms mentioned in the Agreement for Sale.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 border-l-4 border-brand-green pl-4">2. Refund Eligibility</h2>
            <ul className="list-disc pl-10 mt-4 space-y-2 text-brand-medium-gray dark:text-brand-white/60">
              <li>Administrative and processing fees are non-refundable.</li>
              <li>Refunds will be processed after the property is re-allotted to another client.</li>
            </ul>
          </section>

          <section className="pt-10 border-t border-brand-soft-gray dark:border-white/10">
            <p className="text-brand-medium-gray dark:text-brand-white/70">
              For further clarification, please refer to your specific booking agreement or <Link href="/contact" className="text-brand-green font-bold hover:underline transition-colors">speak with our sales team</Link>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
