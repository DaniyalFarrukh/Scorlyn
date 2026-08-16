import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ProductStory } from '@/components/ProductStory';
import { ScoreboardDemo } from '@/components/ScoreboardDemo';
import { Features } from '@/components/Features';
import { ProductTiers } from '@/components/ProductTiers';
import { SoftwareDemo } from '@/components/SoftwareDemo';
import { Environmental, HowItWorks, FAQ, FinalCTA } from '@/components/OtherSections';
import { ClubSection } from '@/components/ClubTechSections';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="bg-[var(--color-brand-bg)] text-white font-sans min-h-screen">
      <Navbar />
      <Hero />
      <ProductStory />
      <ScoreboardDemo />
      <Features />
      <ProductTiers />
      <SoftwareDemo />
      <Environmental />
      <HowItWorks />
      {/* Social Proof Placeholder could go here, omitting for brevity as per prompt */}
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
