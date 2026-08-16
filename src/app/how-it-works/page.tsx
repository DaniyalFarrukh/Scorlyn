import { Navbar } from '@/components/Navbar';
import { HowItWorks } from '@/components/OtherSections';
import { Footer } from '@/components/Footer';

export default function HowItWorksPage() {
  return (
    <main className="bg-brand-cream text-black font-sans min-h-screen pt-24">
      <Navbar />
      <HowItWorks />
      <Footer />
    </main>
  );
}
