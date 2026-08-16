import { Navbar } from '@/components/Navbar';
import { FAQ } from '@/components/OtherSections';
import { Footer } from '@/components/Footer';

export default function FAQPage() {
  return (
    <main className="bg-brand-cream text-black font-sans min-h-screen pt-24">
      <Navbar />
      <FAQ />
      <Footer />
    </main>
  );
}
