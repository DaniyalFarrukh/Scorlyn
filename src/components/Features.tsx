"use client";
import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LEDPanel, LEDColor, MatchMode } from './Scoreboard/LEDPanel';
import { Wifi, Smartphone, User, Sun, Settings2, RotateCcw, Box, Radio, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const Features = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  const [panelState, setPanelState] = useState({
    homeScore: "08",
    guestScore: "06",
    color: 'green' as LEDColor,
    brightness: 100,
    mode: 'Standard',
    bgColor: 'bg-brand-cream'
  });
  const stateRef = useRef(panelState);
  
  const updateState = (updates: Partial<typeof panelState>) => {
    let changed = false;
    const nextState = { ...stateRef.current };
    for (const k in updates) {
      if (nextState[k as keyof typeof nextState] !== updates[k as keyof typeof updates]) {
        (nextState as any)[k] = updates[k as keyof typeof updates];
        changed = true;
      }
    }
    if (changed) {
      stateRef.current = nextState;
      setPanelState(nextState);
    }
  };

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;
          
          let home = "08";
          let guest = "06";
          let bg = 'bg-brand-cream';
          let mode = 'Standard';
          let brightness = 100;
          
          if (p > 0.15 && p < 0.25) home = "09";
          else if (p >= 0.25 && p < 0.55) home = "10";
          else if (p >= 0.55 && p < 0.85) home = "09";
          
          if (p >= 0.3 && p < 0.45) {
            bg = 'bg-white';
            brightness = 100;
          } else if (p >= 0.65 && p < 0.70) {
            brightness = 40; // Settings simulation
          }
          
          if (p > 0.42 && p < 0.44) mode = 'Tiebreak';
          else if (p >= 0.44 && p < 0.46) mode = 'Set';
          else if (p >= 0.46 && p < 0.48) mode = 'Match';
          else if (p >= 0.48 && p < 0.52) mode = 'Practice';
          
          if (p > 0.85 && p < 0.88) { home = "UP"; guest = "DT"; }
          else if (p >= 0.88) { home = "DO"; guest = "NE"; }
          
          updateState({ homeScore: home, guestScore: guest, bgColor: bg, mode, brightness });
        }
      }
    });

    // SCENE 1: Meet Scorlyn (0.0 - 0.1)
    tl.fromTo('.led-scaler', { scale: 0.8, y: 150, opacity: 0 }, { scale: 1, y: 0, opacity: 1, duration: 0.05 }, 0)
      .fromTo('.s1-text', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.02 }, 0.02)
      .to('.s1-text', { opacity: 0, y: -50, duration: 0.02 }, 0.08)

    // SCENE 2: IR Sensors (0.1 - 0.2)
      .fromTo('.s2-wrapper', { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.02 }, 0.1)
      .fromTo('.s2-ball', { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.02 }, 0.12)
      .to('.s2-sensor-flash', { opacity: 1, duration: 0.01, yoyo: true, repeat: 1 }, 0.14)
      .fromTo('.s2-signal', { width: 0, opacity: 1 }, { width: 200, opacity: 0, duration: 0.02 }, 0.14)
      .to('.s2-wrapper', { opacity: 0, x: 50, duration: 0.02 }, 0.18)

    // SCENE 3: Wireless Button (0.2 - 0.3)
      .fromTo('.s3-wrapper', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.02 }, 0.2)
      .to('.s3-button', { scale: 0.9, duration: 0.01, yoyo: true, repeat: 1 }, 0.24)
      .fromTo('.s3-signal', { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1.5, duration: 0.02 }, 0.24)
      .to('.s3-signal', { opacity: 0, duration: 0.01 }, 0.26)
      .to('.s3-wrapper', { opacity: 0, y: -50, duration: 0.02 }, 0.28)

    // SCENE 4: Full Bright (0.3 - 0.4)
      .fromTo('.s4-text', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.02 }, 0.3)
      .to('.sun-flare', { opacity: 1, duration: 0.03 }, 0.32)
      .to('.s4-text', { opacity: 0, y: -50, duration: 0.02 }, 0.38)
      .to('.sun-flare', { opacity: 0, duration: 0.03 }, 0.42)

    // SCENE 5: Game Modes (0.4 - 0.5)
      .fromTo('.s5-wrapper', { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.02 }, 0.4)
      .to('.s5-indicator', { y: 32, duration: 0.02 }, 0.42)
      .to('.s5-indicator', { y: 64, duration: 0.02 }, 0.44)
      .to('.s5-indicator', { y: 96, duration: 0.02 }, 0.46)
      .to('.s5-indicator', { y: 128, duration: 0.02 }, 0.48)
      .to('.s5-wrapper', { opacity: 0, x: 50, duration: 0.02 }, 0.52)

    // SCENE 6: Undo (0.5 - 0.6)
      .fromTo('.s6-wrapper', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.02 }, 0.5)
      .to('.s6-icon', { rotate: -180, duration: 0.04 }, 0.53)
      .to('.s6-wrapper', { opacity: 0, scale: 0.8, duration: 0.02 }, 0.58)

    // SCENE 7: Settings UI (0.6 - 0.7)
      .to('.led-scaler', { scale: 0.7, y: -100, duration: 0.02 }, 0.6)
      .fromTo('.s7-wrapper', { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 0.02 }, 0.62)
      .to('.s7-slider', { width: '40%', duration: 0.04 }, 0.64)
      .to('.s7-wrapper', { opacity: 0, y: 100, duration: 0.02 }, 0.68)

    // SCENE 8: No App/Network (0.7 - 0.8)
      .to('.led-scaler', { scale: 1, y: 0, duration: 0.02 }, 0.7)
      .fromTo('.s8-wrapper', { opacity: 0 }, { opacity: 1, duration: 0.02 }, 0.7)
      .to('.s8-icons', { opacity: 0.2, scale: 0.9, stagger: 0.01, duration: 0.02 }, 0.72)
      .to('.s8-cross', { opacity: 1, scale: 1, stagger: 0.01, duration: 0.02 }, 0.73)
      .to('.s8-text', { opacity: 1, y: 0, duration: 0.02 }, 0.75)
      .to('.s8-wrapper', { opacity: 0, duration: 0.02 }, 0.78)

    // SCENE 9: Wi-Fi Updates (0.8 - 0.9)
      .fromTo('.s9-wrapper', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.02 }, 0.8)
      .to('.s9-wifi', { opacity: 1, scale: 1.2, duration: 0.02, yoyo: true, repeat: 3 }, 0.82)
      .to('.s9-wrapper', { opacity: 0, y: -50, duration: 0.02 }, 0.88)

  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="features" className={cn("relative transition-colors duration-700 border-t border-black/5", panelState.bgColor)} style={{ height: '1000vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        
        {/* Background elements */}
        <div className="sun-flare absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff_0%,_transparent_70%)] opacity-0 z-0 pointer-events-none mix-blend-overlay"></div>

        {/* The Product Core */}
        <div className="board-wrapper relative z-20 w-full flex justify-center items-center pointer-events-none">
          <div className="scale-[0.45] sm:scale-[0.6] md:scale-75 lg:scale-100 origin-center">
            <div className="led-scaler origin-center">
              <LEDPanel 
                homeScore={panelState.homeScore}
                guestScore={panelState.guestScore}
                period={panelState.mode.toUpperCase()}
                color={panelState.color}
                brightness={panelState.brightness}
                className="shadow-[0_40px_100px_rgba(0,0,0,0.2)]" 
                mode={panelState.mode.toLowerCase() as MatchMode}
              />
            </div>
          </div>
        </div>

        {/* SCENES OVERLAYS */}
        <div className="scenes-container absolute inset-0 z-30 pointer-events-none">
          
          {/* SCENE 1: Meet Scorlyn */}
          <div className="s1-text absolute inset-x-0 bottom-12 md:bottom-24 flex flex-col items-center text-center px-6">
            <h2 className="text-fluid-h2 font-black tracking-tighter uppercase mb-4 text-brand-text leading-none">
              Meet Scorlyn
            </h2>
            <p className="text-brand-text/70 text-lg md:text-xl font-medium max-w-lg">
              The premium smart scoreboard. Everything that happens on court, visualized beautifully.
            </p>
          </div>

          {/* SCENE 2: IR Sensors */}
          <div className="absolute inset-x-0 top-12 md:top-1/2 md:-translate-y-1/2 flex justify-center md:justify-start md:px-24 z-30 pointer-events-none">
            <div className="s2-wrapper flex flex-col md:flex-row items-center gap-4 md:gap-8 opacity-0">
              <div className="flex flex-col gap-2 items-center">
                <div className="w-16 h-24 rounded-full bg-brand-text/10 border border-brand-text/20 flex items-center justify-center relative overflow-hidden glass-panel shadow-sm">
                  <div className="s2-ball w-4 h-4 bg-[var(--color-brand-accent)] rounded-full shadow-[0_0_10px_var(--color-brand-accent)]"></div>
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-brand-text/70">Paddle</span>
              </div>
              <div className="hidden md:block w-12 h-[2px] bg-brand-text/10 relative overflow-hidden">
                 <div className="s2-signal absolute top-0 left-0 h-full bg-[var(--color-brand-accent)] shadow-[0_0_10px_var(--color-brand-accent)]"></div>
              </div>
              <div className="block md:hidden h-12 w-[2px] bg-brand-text/10 relative overflow-hidden">
                 <div className="s2-signal absolute top-0 left-0 w-full bg-[var(--color-brand-accent)] shadow-[0_0_10px_var(--color-brand-accent)]"></div>
              </div>
              <div className="flex flex-col gap-2 items-center">
                 <div className="w-12 h-16 rounded-xl bg-black flex items-center justify-center relative border border-white/10 shadow-xl pointer-events-auto">
                   <div className="s2-sensor-flash absolute inset-0 bg-[var(--color-brand-led-red)]/30 rounded-xl opacity-0"></div>
                   <Radio size={20} className="text-white/50" />
                 </div>
                 <span className="text-xs font-black uppercase tracking-widest text-brand-text/70">Sensor</span>
              </div>
            </div>
          </div>

          {/* SCENE 3: Wireless Button */}
          <div className="s3-wrapper absolute inset-x-0 bottom-12 md:bottom-24 flex flex-col items-center opacity-0 px-6 text-center">
            <div className="s3-button w-20 h-20 md:w-24 md:h-24 rounded-full bg-black shadow-[0_20px_40px_rgba(0,0,0,0.3)] border border-white/10 flex items-center justify-center relative mb-6">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-b from-gray-800 to-black border border-white/5 flex items-center justify-center">
                 <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-900 shadow-inner"></div>
              </div>
              <div className="s3-signal absolute -top-12 text-[var(--color-brand-accent)] opacity-0">
                 <Wifi size={32} />
              </div>
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight text-brand-text">Wireless Button</h3>
            <p className="text-brand-text/70 font-medium mt-2">Control the score without leaving the court.</p>
          </div>

          {/* SCENE 4: Full Bright LED */}
          <div className="s4-text absolute inset-x-0 bottom-12 md:bottom-24 flex flex-col items-center text-center opacity-0 px-6">
            <h2 className="text-3xl md:text-fluid-h3 font-black tracking-tighter uppercase mb-4 text-black leading-none drop-shadow-md">
              Full-Bright LED
            </h2>
            <p className="text-black/80 text-lg md:text-xl font-bold max-w-lg drop-shadow-sm">
              Designed to stay visible in real outdoor light. Sun or shade.
            </p>
          </div>

          {/* SCENE 5: Game Modes */}
          <div className="absolute inset-x-0 bottom-12 md:bottom-auto md:top-1/2 md:-translate-y-1/2 flex justify-center md:justify-end md:px-24 z-30 pointer-events-none">
            <div className="s5-wrapper opacity-0 pointer-events-auto">
              <div className="glass-panel p-4 md:p-6 rounded-3xl border border-brand-text/10 relative shadow-xl bg-white/40">
                 <h4 className="text-[10px] md:text-xs font-black tracking-widest text-brand-text/50 uppercase mb-4 md:mb-6">Game Modes</h4>
                 <div className="relative flex flex-col gap-2 md:gap-4">
                   <div className="s5-indicator absolute top-0 left-0 w-full h-8 bg-black rounded-lg -z-10"></div>
                   {['Standard', 'Tiebreak', 'Set', 'Match', 'Practice'].map((m) => (
                     <div key={m} className={`h-8 flex items-center px-4 font-black uppercase tracking-wider text-xs md:text-sm transition-colors ${panelState.mode === m ? 'text-white' : 'text-brand-text/70'}`}>
                       {m}
                     </div>
                   ))}
                 </div>
              </div>
            </div>
          </div>

          {/* SCENE 6: Undo */}
          <div className="s6-wrapper absolute inset-x-0 bottom-24 flex justify-center opacity-0 px-6 text-center">
             <div className="glass-panel px-6 py-3 md:px-8 md:py-4 rounded-full flex flex-col md:flex-row items-center gap-2 md:gap-4 shadow-lg border border-brand-text/10 bg-white/40">
                <RotateCcw size={24} className="s6-icon text-brand-text" />
                <span className="text-lg md:text-xl font-black uppercase tracking-widest text-brand-text">Undo Instant Revert</span>
             </div>
          </div>

          {/* SCENE 7: Settings UI */}
          <div className="s7-wrapper absolute inset-x-0 bottom-8 md:bottom-12 flex justify-center opacity-0 px-6">
             <div className="glass-panel p-6 md:p-8 rounded-3xl w-full max-w-2xl shadow-xl border border-brand-text/10 bg-white/40 pointer-events-auto">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-brand-text">On-Board Settings</h3>
                  <Settings2 size={24} className="text-brand-text/50" />
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-brand-text/50 mb-3">
                      <span>Brightness</span>
                      <span>{panelState.brightness}%</span>
                    </div>
                    <div className="h-2 w-full bg-brand-text/10 rounded-full relative">
                      <div className="s7-slider absolute top-0 left-0 h-full bg-black rounded-full w-full" style={{ width: `${panelState.brightness}%` }}></div>
                      <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-black rounded-full shadow-md transition-all duration-75" style={{ left: `calc(${panelState.brightness}% - 8px)` }}></div>
                    </div>
                  </div>
                </div>
             </div>
          </div>

          {/* SCENE 8: No App/Network */}
          <div className="s8-wrapper absolute inset-0 flex items-center justify-center opacity-0 bg-brand-cream/80 backdrop-blur-md">
             <div className="flex flex-col items-center text-center px-6">
                <div className="flex gap-8 md:gap-12 mb-8 md:mb-12">
                   <div className="relative">
                     <Smartphone size={48} className="s8-icons text-brand-text/80 md:w-16 md:h-16" />
                     <div className="s8-cross absolute inset-0 flex items-center justify-center opacity-0 text-[var(--color-brand-led-red)] text-5xl md:text-6xl font-black">×</div>
                   </div>
                   <div className="relative">
                     <User size={48} className="s8-icons text-brand-text/80 md:w-16 md:h-16" />
                     <div className="s8-cross absolute inset-0 flex items-center justify-center opacity-0 text-[var(--color-brand-led-red)] text-5xl md:text-6xl font-black">×</div>
                   </div>
                   <div className="relative">
                     <Wifi size={48} className="s8-icons text-brand-text/80 md:w-16 md:h-16" />
                     <div className="s8-cross absolute inset-0 flex items-center justify-center opacity-0 text-[var(--color-brand-led-red)] text-5xl md:text-6xl font-black">×</div>
                   </div>
                </div>
                <h2 className="s8-text opacity-0 translate-y-8 text-3xl md:text-fluid-h2 font-black tracking-tighter uppercase leading-none text-brand-text">
                  Just Play.<br/>
                  <span className="text-xl md:text-3xl tracking-widest mt-2 block">Works Independently.</span>
                </h2>
             </div>
          </div>

          {/* SCENE 9: Wi-Fi Updates */}
          <div className="s9-wrapper absolute inset-x-0 bottom-12 md:bottom-24 flex flex-col items-center opacity-0 px-6">
            <div className="glass-panel p-4 md:p-6 rounded-full flex flex-col md:flex-row items-center gap-4 md:gap-6 shadow-xl border border-brand-text/10 bg-white/40 text-center md:text-left">
               <div className="s9-wifi bg-[var(--color-brand-accent)] w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-black shadow-[0_0_20px_var(--color-brand-accent)] opacity-0">
                 <Wifi size={20} />
               </div>
               <div>
                 <h4 className="font-black uppercase tracking-widest text-brand-text text-sm md:text-base">Update Available</h4>
                 <p className="text-brand-text/70 text-xs md:text-sm font-medium">Over-the-air firmware updates</p>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
