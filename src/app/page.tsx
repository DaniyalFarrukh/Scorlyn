import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ProductStory } from '@/components/ProductStory';


import { ProductTiers } from '@/components/ProductTiers';
import { SoftwareDemo } from '@/components/SoftwareDemo';
import { Environmental, FinalCTA } from '@/components/OtherSections';
import { ClubSection } from '@/components/ClubTechSections';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="bg-[var(--color-brand-bg)] text-white font-sans min-h-screen">
      <Navbar />
      <Hero />
      <ProductStory />

      <ProductTiers />
      <SoftwareDemo />
      <Environmental />


      <FinalCTA />
      <Footer />
    </main>
  );
}
