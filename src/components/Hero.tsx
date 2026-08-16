"use client";
import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { LEDPanel } from './Scoreboard/LEDPanel';
import Image from 'next/image';

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const [scores, setScores] = useState({ home: 8, guest: 6 });
  
  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from('.hero-headline', {
      y: 60,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power4.out',
      delay: 0.2
    })
    .from('.hero-subtext', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, "-=0.4")
    .from('.hero-scoreboard', {
      scale: 0.9,
      y: 40,
      opacity: 0,
      duration: 1.2,
      ease: 'expo.out'
    }, "-=0.6")
    .from('.hero-cta', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out'
    }, "-=0.8");

  }, { scope: containerRef });

  // Auto-increment score for an animated, live feel
  useEffect(() => {
    const interval = setInterval(() => {
      setScores(prev => ({
        home: prev.home >= 40 ? 0 : prev.home + Math.floor(Math.random() * 2),
        guest: prev.guest >= 40 ? 0 : prev.guest + Math.floor(Math.random() * 2)
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // 3D Hover Parallax Effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!boardRef.current) return;
    const { left, top, width, height } = boardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    gsap.to(boardRef.current, {
      rotateY: x * 15 - 10, // Base -10deg + hover delta
      rotateX: -y * 15 + 5, // Base 5deg + hover delta
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    if (!boardRef.current) return;
    gsap.to(boardRef.current, {
      rotateY: -10,
      rotateX: 5,
      duration: 1,
      ease: "power3.out"
    });
  };

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-gradient-to-b from-brand-beige to-brand-cream">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-brand-beige to-brand-cream">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-multiply"
        >
          <source src="/hero-bgmeow.mp4" type="video/mp4" />
        </video>
      </div>
      
      {/* Subtle Ambient Light behind scoreboard */}
      <div className="absolute top-1/2 right-1/4 w-[800px] h-[600px] bg-[var(--color-brand-accent)]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none z-0"></div>
      
      <div className="max-w-[1400px] mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          
          {/* Left: Typography */}
          <div className="flex flex-col justify-center text-left lg:col-span-5 z-20">
            <h1 className="hero-headline text-5xl sm:text-6xl md:text-fluid-h1 font-black tracking-tighter mb-8 uppercase text-brand-text leading-[1]">
              <span className="block text-brand-text mb-2 text-xl sm:text-2xl md:text-3xl font-black tracking-widest">This is not a</span>
              <span className="block text-brand-text">Paddle</span>
              <span className="block text-brand-text font-black">Ad.</span>
            </h1>
            
            <p className="hero-subtext text-xl md:text-2xl font-bold max-w-lg mb-10 leading-tight">
              <span className="bg-[#ccff00] text-black px-3 py-1 rounded-md inline-block mb-3 shadow-sm transform -rotate-1 font-black tracking-tight">Scorlyn Smart Scoreboard.</span> <br />
              <span className="text-brand-text/80 font-medium">Everything that happens on court, with nothing to set up.</span>
            </p>
            
            <div className="hero-cta flex flex-col md:flex-row flex-wrap gap-4 w-full md:w-auto">
              <a href="#models" className="bg-[var(--color-brand-accent)] text-brand-cream px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm hover:scale-105 hover:shadow-[0_0_30px_rgba(0,0,0,0.4)] transition-all duration-300 flex items-center justify-center gap-2 w-full md:w-auto">
                Get Your Scoreboard
                <span>→</span>
              </a>
              <a href="#product" className="glass-panel text-brand-text px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm hover:bg-black/5 transition-colors flex items-center justify-center w-full md:w-auto">
                Explore Scorlyn
              </a>
            </div>
          </div>
          
          {/* Right: Scoreboard Visual */}
          <div className="hero-scoreboard relative flex flex-col justify-center items-center lg:justify-end lg:col-span-7 lg:translate-x-12 mt-12 lg:mt-0">
            {/* The Live Badge */}
            <div className="relative mb-8 lg:absolute lg:mb-0 lg:-top-8 lg:right-12 z-20 flex items-center gap-2 font-mono text-brand-text tracking-widest text-sm font-bold glass-panel px-4 py-2 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[var(--color-brand-led-red)] shadow-[0_0_10px_rgba(255,51,51,0.8)] animate-pulse"></span>
              LIVE / COURT 01
            </div>

            {/* Rotate slightly for 3D cinematic feel with hover interaction */}
            <div className="w-[320px] sm:w-[600px] md:w-[720px] lg:w-[800px] h-[144px] sm:h-[270px] md:h-[324px] lg:h-[360px] relative flex justify-center items-center mt-12 lg:mt-0">
              <div 
                ref={boardRef}
                className="absolute rotate-y-[-10deg] rotate-x-[5deg] scale-[0.4] sm:scale-75 md:scale-90 lg:scale-100 origin-center transition-shadow duration-300 hover:shadow-[0_0_150px_rgba(204,255,0,0.2)]"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <LEDPanel 
                  homeScore={scores.home.toString()} 
                  guestScore={scores.guest.toString()} 
                  period="GAME 2" 
                  color="green" 
                  brightness={100}
                  className="cursor-pointer shadow-[0_0_100px_rgba(204,255,0,0.15)] pointer-events-none"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
