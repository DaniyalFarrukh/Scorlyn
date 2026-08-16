"use client";
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LEDPanel } from './Scoreboard/LEDPanel';

gsap.registerPlugin(ScrollTrigger);

export const ProductStory = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      }
    });

    // 1. Headline fades up and out
    tl.to('.story-headline', { y: -100, opacity: 0, duration: 1 })
    
    // 2. Board scales up to full size from below
    .fromTo('.story-board',
      { scale: 0.6, rotateX: 15, y: 150 },
      { scale: 1, rotateX: 0, y: 0, duration: 2 },
      "-=0.5"
    )
    
    // 3. Stagger labels appearing with connector lines
    .fromTo('.story-label-container',
      { opacity: 0, x: (i, el) => el.dataset.side === 'left' ? 20 : -20 },
      { opacity: 1, x: 0, duration: 1.5, stagger: 0.8 }
    );
  }, { scope: sectionRef });

  const labels = [
    { text: "LIVE SCORE", desc: "Instant updates via button.", pos: "top-[15%] right-[95%]", side: "left" },
    { text: "WIRELESS CONTROL", desc: "No phone required.", pos: "top-[45%] right-[105%]", side: "left" },
    { text: "ON-BOARD SETTINGS", desc: "Full menu on device.", pos: "bottom-[15%] right-[95%]", side: "left" },
    { text: "AUTOMATIC SCORING", desc: "Contactless sensors.", pos: "top-[15%] left-[95%]", side: "right" },
    { text: "ULTRA-BRIGHT LED", desc: "Visible in sunlight.", pos: "top-[45%] left-[105%]", side: "right" },
    { text: "MADE FOR OUTDOORS", desc: "Weatherproof build.", pos: "bottom-[15%] left-[95%]", side: "right" },
  ];

  return (
    <section ref={sectionRef} id="product" className="h-[300vh] bg-brand-cream relative">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-20">
        
        <h2 className="story-headline text-5xl md:text-fluid-h2 font-black tracking-tighter uppercase leading-[0.9] md:leading-none text-center absolute top-[10%] md:top-[12%] text-brand-text px-6 w-full">
          Everything that happens <br />
          <span className="text-brand-text/50">on court.</span>
          <br /><br />
          <span className="text-brand-text font-black">With nothing to set up.</span>
        </h2>

        <div className="story-board relative z-10 w-full flex justify-center mx-auto mt-16 md:mt-32">
          {/* Wrapper to scale LED Panel appropriately on mobile without DOM overflow */}
          <div className="w-[320px] sm:w-[600px] md:w-[720px] lg:w-[800px] h-[144px] sm:h-[270px] md:h-[324px] lg:h-[360px] relative flex justify-center items-center">
            <div className="absolute scale-[0.4] sm:scale-75 md:scale-90 lg:scale-100 origin-center">
              <LEDPanel 
                homeScore="08" 
                guestScore="06" 
                period="GAME 2" 
                color="green" 
                brightness={100}
                className="shadow-[0_40px_100px_rgba(0,0,0,0.3)]"
              />

              {/* Desktop Feature Labels */}
              <div className="hidden lg:block absolute inset-0 pointer-events-none z-20">
                {labels.map((label, i) => (
                  <div 
                    key={i} 
                    data-side={label.side}
                    className={`story-label-container absolute ${label.pos} flex items-center gap-4 ${label.side === 'right' ? 'flex-row-reverse' : 'flex-row'} w-64`}
                  >
                    <div className={`flex-1 glass-panel px-4 py-2 rounded-xl ${label.side === 'left' ? 'text-right' : 'text-left'}`}>
                      <h4 className="text-sm font-black tracking-wider uppercase text-brand-text">{label.text}</h4>
                      <p className="text-brand-text/70 text-xs font-medium mt-1">{label.desc}</p>
                    </div>
                    {/* Connector line */}
                    <div className="w-12 h-[2px] bg-brand-text relative">
                      <div className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-text shadow-[0_0_10px_rgba(26,26,26,0.5)] ${label.side === 'left' ? '-right-1' : '-left-1'}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

