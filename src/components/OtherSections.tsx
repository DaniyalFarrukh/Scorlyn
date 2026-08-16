"use client";
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export const Environmental = () => {
  return (
    <section className="py-32 bg-brand-beige relative overflow-hidden flex items-center justify-center min-h-[70vh]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-beige z-10"></div>
      
      {/* Simulated Environmental Background */}
      <div 
        className="absolute inset-0 opacity-40 z-0 bg-cover bg-center"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.9)), url("https://images.unsplash.com/photo-1622228837683-1123f1f3b236?q=80&w=2500&auto=format&fit=crop")' }}
      ></div>

      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase mb-6 leading-none text-black drop-shadow-sm">
          Made for the <br/>
          <span className="inline-block mt-3 bg-[var(--color-brand-accent)] text-brand-cream px-6 py-2 rotate-1 shadow-sm">Outdoors.</span>
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-12 mt-16">
          <div className="flex flex-col items-center text-center">
            <h4 className="text-2xl font-black uppercase mb-2 text-black">High Visibility</h4>
            <p className="text-gray-600 font-bold">Day & Night</p>
          </div>
          <div className="hidden md:block w-px bg-black/10"></div>
          <div className="flex flex-col items-center text-center">
            <h4 className="text-2xl font-black uppercase mb-2 text-black">Weather Ready</h4>
            <p className="text-gray-600 font-bold">Built for daily play</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const HowItWorks = () => {
  const steps = [
    { num: "01", title: "INSTALL", desc: "Mount Scorlyn on the court." },
    { num: "02", title: "CONNECT", desc: "Pair the wireless controls." },
    { num: "03", title: "PLAY", desc: "Score automatically or manually." },
    { num: "04", title: "IMPROVE", desc: "Connect Wi-Fi and receive firmware updates." }
  ];

  return (
    <section id="how-it-works" className="py-32 bg-brand-cream border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-20 text-center text-black">
          Four Steps to Play.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="bg-brand-beige border border-black/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2 hover:shadow-[0_30px_50px_-15px_rgba(0,0,0,0.15)] transition-all p-8 rounded-[2rem] relative overflow-hidden group">
              <div className="text-[120px] font-black text-black/5 absolute -right-4 -bottom-8 group-hover:scale-110 transition-transform duration-500">
                {step.num}
              </div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="text-brand-cream bg-[var(--color-brand-accent)] inline-block px-3 py-1 font-mono text-sm font-black mb-4 shadow-sm">{step.num}</div>
                <h3 className="text-2xl font-black tracking-tight uppercase mb-4 text-black">{step.title}</h3>
                <p className="text-gray-600 font-medium">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const FAQ = () => {
  const faqs = [
    { q: "Does Scorlyn need Wi-Fi?", a: "Scorlyn operates perfectly without Wi-Fi. However, Scorlyn Pro and Club require Wi-Fi for software functionality." },
    { q: "Does Scorlyn require an app?", a: "No app is required for the base Scorlyn model. Everything is controlled via the wireless button." },
    { q: "How does automatic scoring work?", a: "Contactless paddle sensors detect motion when players tap their paddles near the sensor, instantly updating the score." },
    { q: "Can I control the scoreboard manually?", a: "Yes, you can use the included wireless button to manage scores manually from anywhere on the court." },
    { q: "Does Scorlyn work outdoors?", a: "Yes, the enclosure is weather-ready and the LED display is ultra-bright for direct sunlight visibility." }
  ];

  return (
    <section id="faq" className="py-32 bg-brand-cream border-t border-black/5">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-16 text-center text-black">
          Questions?
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group bg-brand-beige border border-black/5 hover:border-black/10 transition-colors rounded-2xl overflow-hidden marker:hidden shadow-sm">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-black select-none text-base md:text-lg text-black gap-4">
                <span className="flex-1 text-center pl-8">{faq.q}</span>
                <span className="text-brand-cream bg-black w-8 h-8 rounded-full flex items-center justify-center group-open:rotate-45 transition-transform text-xl leading-none shrink-0">+</span>
              </summary>
              <div className="px-8 pb-6 text-gray-600 font-medium leading-relaxed text-center max-w-2xl mx-auto">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export const FinalCTA = () => {
  return (
    <section className="py-40 bg-brand-beige relative overflow-hidden text-center border-t border-black/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[var(--color-brand-accent)]/20 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <h2 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.8] mb-12 text-black drop-shadow-sm">
          Your Court.<br/>
          Your Score.<br/>
          <span className="inline-block mt-6 bg-[var(--color-brand-accent)] text-brand-cream px-6 py-2 -rotate-2 shadow-md">Your Scorlyn.</span>
        </h2>
        <p className="text-xl md:text-2xl text-gray-600 font-bold mb-12">
          Make every point impossible to miss.
        </p>
        
        <div className="flex flex-wrap justify-center gap-6">
          <Link href="/#models" className="bg-[var(--color-brand-accent)] text-brand-cream border border-transparent px-10 py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 shadow-xl hover:shadow-2xl transition-all">
            Get Scorlyn →
          </Link>
          <Link href="/talk-to-us" className="border border-black/10 bg-brand-cream text-black shadow-sm px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-white hover:shadow-md transition-all">
            Talk to Us 
          </Link>
        </div>
      </div>
    </section>
  );
};
