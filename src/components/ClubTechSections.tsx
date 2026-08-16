import React from 'react';

export const ClubSection = () => {
  return (
    <section id="clubs" className="py-32 bg-[#050505] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6">
          One court is easy.<br/>
          <span className="text-[var(--color-brand-accent)]">A whole club is Scorlyn Club.</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-16">
          Manage multiple courts from one dashboard. Full usage history, staff management, tournament mode, and automatic firmware updates across every board in your venue.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
          {[1, 2, 3, 4].map(num => (
            <div key={num} className="glass-panel aspect-[4/3] rounded-xl flex items-center justify-center flex-col gap-2">
              <div className="w-16 h-8 bg-black border border-white/10 rounded overflow-hidden flex flex-col justify-center items-center">
                 <div className="text-[var(--color-brand-accent)] text-[8px] font-mono opacity-80">8:6</div>
              </div>
              <span className="text-xs font-bold uppercase text-gray-500">Court 0{num}</span>
            </div>
          ))}
        </div>

        <a href="#models" className="inline-block border border-white/20 bg-white/5 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm hover:bg-white/10 transition-colors">
          Explore Scorlyn Club →
        </a>
      </div>
    </section>
  );
};
