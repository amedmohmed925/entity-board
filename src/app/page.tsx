import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { DemoSection } from '@/components/sections/DemoSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { CTASection } from '@/components/sections/CTASection';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <DemoSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>
  );
}
