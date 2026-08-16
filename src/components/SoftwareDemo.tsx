"use client";
import React, { useState } from 'react';
import { LEDPanel } from './Scoreboard/LEDPanel';
import { Smartphone, Monitor, Wifi, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

export const SoftwareDemo = () => {
  const [activeCourt, setActiveCourt] = useState('Court 01');
  const [homeScore, setHomeScore] = useState(8);
  const [guestScore, setGuestScore] = useState(6);
  const [timer, setTimer] = useState("42:18");

  const courts = ['Court 01', 'Court 02', 'Court 03', 'Court 04'];

  const handleScore = (team: 'home' | 'guest', change: number) => {
    if (team === 'home') setHomeScore(Math.max(0, homeScore + change));
    else setGuestScore(Math.max(0, guestScore + change));
  };

  return (
    <section id="software" className="py-32 bg-brand-cream relative overflow-hidden border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase mb-6 text-black">
            The board is smart.
            <br />
            <span className="text-black">The software is smarter.</span>
          </h2>
          <p className="text-gray-600 font-medium max-w-2xl mx-auto text-lg">
            Scorlyn Pro and Club models include complete Wi-Fi connectivity and a powerful dashboard to manage your courts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Dashboard UI Mockup */}
          <div className="lg:col-span-8 bg-brand-beige rounded-2xl border border-black/10 overflow-hidden flex flex-col h-[600px] shadow-xl">
            {/* Dashboard Header */}
            <div className="h-14 border-b border-black/10 flex items-center px-6 justify-between bg-white">
              <div className="flex items-center gap-4 text-sm font-bold tracking-wider text-black">
                <Monitor size={18} className="text-gray-500" />
                SCORLYN CLUB DASHBOARD
              </div>
              <div className="flex items-center gap-4">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-xs text-gray-500 font-mono">ALL SYSTEMS ONLINE</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
              {/* Desktop Sidebar */}
              <div className="hidden md:flex w-48 border-r border-black/5 p-4 flex-col gap-2 bg-white shrink-0">
                {courts.map(court => (
                  <button 
                    key={court}
                    onClick={() => setActiveCourt(court)}
                    className={cn(
                      "text-left px-4 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-between whitespace-nowrap",
                      activeCourt === court 
                        ? "bg-[var(--color-brand-accent)] text-brand-cream shadow-sm" 
                        : "text-gray-500 hover:bg-gray-100"
                    )}
                  >
                    {court}
                    <Wifi size={14} className={cn("ml-2", activeCourt === court ? "text-black" : "text-[var(--color-brand-accent)]")} />
                  </button>
                ))}
              </div>

              {/* Main Content */}
              <div className="flex-1 p-4 md:p-8 bg-brand-beige flex flex-col items-center justify-center relative min-h-[300px]">
                
                {/* Mobile Court Selector (Dropdown) */}
                <div className="w-full md:hidden mb-6 flex justify-between items-center bg-white p-3 rounded-xl border border-black/10 shadow-sm">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Select Court</span>
                  <select 
                    value={activeCourt}
                    onChange={(e) => setActiveCourt(e.target.value)}
                    className="bg-transparent font-bold text-black outline-none"
                  >
                    {courts.map(court => (
                      <option key={court} value={court}>{court}</option>
                    ))}
                  </select>
                </div>

                <div className="w-full md:absolute md:top-6 md:left-6 text-center md:text-left mb-6 md:mb-0">
                  <h3 className="text-xl md:text-2xl font-black tracking-tighter uppercase text-black">{activeCourt} <span className="text-[#88aa00]">LIVE</span></h3>
                  <p className="text-gray-600 text-xs md:text-sm mt-1">Session: John's Padel Club</p>
                </div>

                <div className="absolute top-4 right-4 md:top-6 md:right-6 text-right hidden sm:block">
                  <p className="text-gray-500 text-xs md:text-sm uppercase tracking-wider font-bold mb-1">Court Timer</p>
                  <p className="text-lg md:text-3xl font-mono text-black tracking-tight font-bold">{timer}</p>
                </div>

                <div className="w-full mt-4 md:mt-12 flex justify-center items-center">
                  <div className="scale-[0.55] sm:scale-75 md:scale-100 origin-center transition-transform">
                     <LEDPanel 
                      homeScore={homeScore.toString()} 
                      guestScore={guestScore.toString()} 
                      period="GAME 2" 
                      color="green" 
                      brightness={100} 
                      scale={0.55}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Phone Mockup */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="w-[300px] h-[600px] rounded-[40px] border-[8px] border-[#1a1a1a] bg-white shadow-2xl relative overflow-hidden flex flex-col">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1a1a1a] rounded-b-xl z-20"></div>
              
              <div className="flex-1 overflow-y-auto no-scrollbar p-6 pt-12 relative z-10 bg-brand-beige">
                <div className="flex justify-between items-center mb-8">
                  <h4 className="font-bold tracking-tight text-lg text-black">Remote</h4>
                  <Settings size={20} className="text-gray-500" />
                </div>

                <div className="bg-white border border-black/5 shadow-sm p-4 rounded-xl text-center mb-6">
                  <p className="text-xs text-[#88aa00] font-bold mb-1 uppercase tracking-wider">{activeCourt}</p>
                  <div className="font-mono text-4xl font-bold tracking-tighter text-black">
                    {homeScore.toString().padStart(2, '0')} : {guestScore.toString().padStart(2, '0')}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button onClick={() => handleScore('home', 1)} className="bg-white border border-black/10 hover:bg-brand-cream active:bg-[var(--color-brand-accent)] active:text-brand-cream py-4 rounded-xl font-bold transition-all text-black shadow-sm">+ Home</button>
                  <button onClick={() => handleScore('guest', 1)} className="bg-white border border-black/10 hover:bg-brand-cream active:bg-[var(--color-brand-accent)] active:text-brand-cream py-4 rounded-xl font-bold transition-all text-black shadow-sm">+ Guest</button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                   <button onClick={() => { setHomeScore(0); setGuestScore(0); }} className="col-span-2 bg-red-500/20 text-red-500 hover:bg-red-500/30 py-4 rounded-xl font-bold transition-all text-sm uppercase tracking-wider">Reset Score</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
