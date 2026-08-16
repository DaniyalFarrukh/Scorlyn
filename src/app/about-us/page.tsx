import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function AboutUsPage() {
  return (
    <main className="bg-brand-cream text-black font-sans min-h-screen pt-24 flex flex-col">
      <Navbar />
      
      <div className="flex-grow max-w-4xl mx-auto px-6 py-24">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-20 text-center">Our Story</h1>
        
        <div className="space-y-12 text-lg md:text-xl font-medium text-gray-700 leading-relaxed">
          <section className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-black/5 hover:-translate-y-1 transition-transform">
            <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight mb-4">Built courtside, by people tired of arguing about the score</h2>
            <p className="mb-8">
              Padel is exploding across Pakistan, but most courts still track score with a whiteboard or nothing at all. We started Scorlyn to fix that with hardware built specifically for how padel is played — fast, social, and outdoors.
            </p>
            <p className="text-sm font-bold tracking-widest uppercase text-gray-400">Founders on a padel court</p>
          </section>

          <section className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-black/5 hover:-translate-y-1 transition-transform">
            <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight mb-2">Mission</h2>
            <h3 className="text-lg md:text-xl font-bold text-[var(--color-brand-accent)] mb-6 uppercase tracking-wider">Score the game, not the argument</h3>
            <p>
              Every court, from a backyard build to a national club, should have a scoreboard that's accurate, visible and effortless to use.
            </p>
          </section>

          <section className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-black/5 hover:-translate-y-1 transition-transform">
            <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight mb-2">Approach</h2>
            <h3 className="text-lg md:text-xl font-bold text-[var(--color-brand-accent)] mb-6 uppercase tracking-wider">Designed for outdoor courts</h3>
            <p>
              We tested every prototype in real sun, rain and dust before it shipped — Scorlyn is built for Pakistani courts first, not adapted from an indoor product.
            </p>
          </section>

          <section className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-black/5 hover:-translate-y-1 transition-transform">
            <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight mb-2">Where we're headed</h2>
            <h3 className="text-lg md:text-xl font-bold text-[var(--color-brand-accent)] mb-6 uppercase tracking-wider">From one court to every court</h3>
            <p>
              Our roadmap takes Scorlyn from a standalone board to a connected system clubs use to run tournaments end to end.
            </p>
          </section>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
