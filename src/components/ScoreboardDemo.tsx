"use client";
import React, { useState } from 'react';
import { LEDPanel, LEDColor, MatchMode } from './Scoreboard/LEDPanel';
import { Plus, Minus, RotateCcw, Sun, Settings2, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const ScoreboardDemo = () => {
  const [homeScore, setHomeScore] = useState(8);
  const [guestScore, setGuestScore] = useState(6);
  const [brightness, setBrightness] = useState(100);
  const [color, setColor] = useState<LEDColor>('green');
  const [mode, setMode] = useState<MatchMode>('standard');
  const [history, setHistory] = useState<{h: number, g: number}[]>([]);

  const handleScore = (team: 'home' | 'guest', change: number) => {
    setHistory(prev => [...prev, { h: homeScore, g: guestScore }]);
    if (team === 'home') {
      setHomeScore(Math.max(0, homeScore + change));
    } else {
      setGuestScore(Math.max(0, guestScore + change));
    }
  };

  const undo = () => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setHomeScore(last.h);
    setGuestScore(last.g);
    setHistory(history.slice(0, -1));
  };

  const reset = () => {
    setHistory(prev => [...prev, { h: homeScore, g: guestScore }]);
    setHomeScore(0);
    setGuestScore(0);
  };

  const cycleColor = () => {
    const colors: LEDColor[] = ['green', 'red', 'amber', 'white'];
    const idx = colors.indexOf(color);
    setColor(colors[(idx + 1) % colors.length]);
  };

  const cycleBrightness = () => {
    setBrightness(prev => (prev === 100 ? 25 : prev === 25 ? 50 : prev === 50 ? 75 : 100));
  };

  const containerRef = React.useRef<HTMLElement>(null);
  
  useGSAP(() => {
    gsap.from('.demo-anim', {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="demo" className="py-24 md:py-32 relative overflow-hidden bg-brand-beige border-t border-black/5">
      {/* Court Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/clay-court-bg.png" 
          alt="Court Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-beige/50 backdrop-blur-[4px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="demo-anim text-center mb-16 md:mb-20 glass-panel py-8 px-6 rounded-3xl max-w-3xl mx-auto">
          <h2 className="text-fluid-h3 font-black tracking-tighter uppercase mb-6 text-brand-text drop-shadow-sm">
            Total Control.
            <br />
            <span className="text-brand-cream bg-brand-text px-4 py-1 inline-block mt-2 shadow-sm rotate-1">Real Time.</span>
          </h2>
          <p className="text-brand-text/90 font-medium max-w-xl mx-auto text-lg leading-relaxed drop-shadow-sm">
            Experience the Scorlyn interface. Use the controls below to interact with the scoreboard in real-time. This is exactly how it feels on the court.
          </p>
        </div>

        <div className="flex flex-col items-center gap-16">
          {/* LED Panel Container */}
          <div className="demo-anim w-full overflow-hidden flex justify-center perspective-1000">
            <div className="w-full max-w-[800px] aspect-[800/360] relative flex justify-center items-center">
              <div className="scale-[0.45] sm:scale-[0.6] md:scale-75 lg:scale-100 origin-center transition-transform duration-300">
                <LEDPanel 
                  homeScore={homeScore.toString()}
                  guestScore={guestScore.toString()}
                  period="GAME 2"
                  color={color}
                  brightness={brightness}
                  mode={mode}
                  className="shadow-[0_0_80px_rgba(0,0,0,0.15)]"
                  scale={1}
                />
              </div>
            </div>
          </div>

          {/* Interactive Controls */}
          <div className="demo-anim glass-panel rounded-2xl p-6 md:p-8 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 relative z-10">
            
            {/* Scoring Controls */}
            <div className="col-span-2 grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-gray-500 tracking-wider uppercase text-center">Home</span>
                <div className="flex gap-2 h-[50px]">
                  <button onClick={() => handleScore('home', -1)} className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors">
                    <Minus size={20} />
                  </button>
                  <button onClick={() => handleScore('home', 1)} className="flex-1 bg-[var(--color-brand-accent)] text-brand-cream hover:brightness-105 rounded-lg flex items-center justify-center transition-all font-black shadow-sm">
                    <Plus size={20} />
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-gray-500 tracking-wider uppercase text-center">Guest</span>
                <div className="flex gap-2 h-[50px]">
                  <button onClick={() => handleScore('guest', -1)} className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors">
                    <Minus size={20} />
                  </button>
                  <button onClick={() => handleScore('guest', 1)} className="flex-1 bg-[var(--color-brand-accent)] text-brand-cream hover:brightness-105 rounded-lg flex items-center justify-center transition-all font-black shadow-sm">
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Match Controls */}
            <div className="col-span-2 md:col-span-2 grid grid-cols-4 gap-2">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-gray-500 tracking-wider uppercase text-center">Undo</span>
                <button onClick={undo} disabled={history.length === 0} className="w-full bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:hover:bg-gray-100 rounded-lg flex items-center justify-center transition-colors h-[50px]">
                  <RotateCcw size={18} />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-gray-500 tracking-wider uppercase text-center">Reset</span>
                <button onClick={reset} className="w-full bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors h-[50px]">
                  <RotateCcw size={18} className="rotate-180" />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-gray-500 tracking-wider uppercase text-center">Color</span>
                <button onClick={cycleColor} className="w-full bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors h-[50px]">
                  <Palette size={18} className={cn(
                    color === 'green' ? 'text-[var(--color-brand-accent)]' :
                    color === 'red' ? 'text-red-500' :
                    color === 'amber' ? 'text-amber-500' : 'text-gray-900'
                  )} />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-gray-500 tracking-wider uppercase text-center">{brightness}%</span>
                <button onClick={cycleBrightness} className="w-full bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors h-[50px]">
                  <Sun size={18} style={{ opacity: Math.max(0.4, brightness / 100) }} />
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
