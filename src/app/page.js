import HeroSlider from "@/components/HeroSlider";
import StatsSection from "@/components/StatsSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import PropertyGrid from "@/components/PropertyGrid";
import TestimonialSection from "@/components/TestimonialSection";
import LatestUpdates from "@/components/LatestUpdates";

export default function Home() {
  return (
    <main className="flex flex-col w-full">
      <HeroSlider />
      
      {/* Stats Section */}
      <StatsSection />

      {/* Features Section */}
      <WhyChooseUs />

      {/* Property Grid */}
      <PropertyGrid />

      {/* Testimonials */}
      <TestimonialSection />

      {/* Latest Update: Media and Event */}
      <LatestUpdates />
    </main>
  );
}
