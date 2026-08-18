"use client";
import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, MonitorSmartphone, Settings2, Trophy } from 'lucide-react';

export default function ScoreboardController() {
  // Timer State
  const [timeLeft, setTimeLeft] = useState(3600); // 60 mins in seconds
  const [isRunning, setIsRunning] = useState(false);

  // Score State
  const [homeScore, setHomeScore] = useState(0);
  const [guestScore, setGuestScore] = useState(0);
  const [game, setGame] = useState(1);

  // Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const setTimer = (minutes: number) => {
    setIsRunning(false);
    setTimeLeft(minutes * 60);
  };

  const resetMatch = () => {
    if(confirm("Are you sure you want to reset the entire match?")) {
      setHomeScore(0);
      setGuestScore(0);
      setGame(1);
      setTimer(60);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight mb-2">Live Controller</h1>
          <p className="text-gray-500 font-medium">Control your Smart LED Scoreboard and court time.</p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-green-200">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Scoreboard Online
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Timer & Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-black/5">
            <h2 className="text-sm font-black uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
              <MonitorSmartphone size={16} /> Court Timer
            </h2>
            
            <div className="bg-black text-[#ccff00] font-mono text-6xl text-center py-8 rounded-2xl tracking-widest shadow-inner mb-6 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ccff00 1px, transparent 1px)', backgroundSize: '4px 4px' }}></div>
              <span className="relative z-10">{formatTime(timeLeft)}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <button 
                onClick={() => setIsRunning(!isRunning)}
                className={`py-4 rounded-xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all ${
                  isRunning ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {isRunning ? <><Pause size={18}/> Pause</> : <><Play size={18}/> Start</>}
              </button>
              <button 
                onClick={() => setTimer(timeLeft / 60)} // Just stops it basically, but we can do a hard reset
                className="bg-gray-100 text-gray-700 py-4 rounded-xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:bg-gray-200 transition-all"
              >
                <RotateCcw size={18}/> Reset
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Quick Set Time</p>
              <div className="grid grid-cols-3 gap-2">
                <button onClick={() => setTimer(30)} className="py-2 border border-black/10 rounded-lg text-sm font-bold text-gray-600 hover:border-black hover:text-black transition-colors">30m</button>
                <button onClick={() => setTimer(60)} className="py-2 border border-black/10 rounded-lg text-sm font-bold text-gray-600 hover:border-black hover:text-black transition-colors">60m</button>
                <button onClick={() => setTimer(90)} className="py-2 border border-black/10 rounded-lg text-sm font-bold text-gray-600 hover:border-black hover:text-black transition-colors">90m</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Scoreboard Manager */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-black/5">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-sm font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                <Trophy size={16} /> Live Scoring
              </h2>
              <button onClick={resetMatch} className="text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-700 hover:underline">
                Reset Match
              </button>
            </div>

            <div className="bg-black p-8 rounded-3xl mb-8 relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '8px 8px' }}></div>
              
              <div className="flex justify-between items-center relative z-10 text-white">
                
                {/* Home Score */}
                <div className="flex flex-col items-center">
                  <span className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-4">Home</span>
                  <div className="text-[120px] font-mono leading-none tracking-tighter text-[#ccff00]" style={{ textShadow: '0 0 20px rgba(204, 255, 0, 0.4)' }}>
                    {homeScore.toString().padStart(2, '0')}
                  </div>
                  <div className="flex gap-4 mt-6">
                    <button onClick={() => setHomeScore(Math.max(0, homeScore - 1))} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                      <span className="text-2xl font-light">-</span>
                    </button>
                    <button onClick={() => setHomeScore(homeScore + 1)} className="w-16 h-12 rounded-full bg-white text-black font-black text-xl flex items-center justify-center hover:bg-gray-200 transition-colors">
                      +
                    </button>
                  </div>
                </div>

                {/* Game / Sets */}
                <div className="flex flex-col items-center justify-center">
                  <span className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-2">Game</span>
                  <div className="text-3xl font-mono text-white mb-2">{game}</div>
                  <div className="flex gap-2">
                    <button onClick={() => setGame(Math.max(1, game - 1))} className="text-gray-400 hover:text-white px-2 text-xl">-</button>
                    <button onClick={() => setGame(game + 1)} className="text-gray-400 hover:text-white px-2 text-xl">+</button>
                  </div>
                </div>

                {/* Guest Score */}
                <div className="flex flex-col items-center">
                  <span className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-4">Guest</span>
                  <div className="text-[120px] font-mono leading-none tracking-tighter text-[#ccff00]" style={{ textShadow: '0 0 20px rgba(204, 255, 0, 0.4)' }}>
                    {guestScore.toString().padStart(2, '0')}
                  </div>
                  <div className="flex gap-4 mt-6">
                    <button onClick={() => setGuestScore(guestScore + 1)} className="w-16 h-12 rounded-full bg-white text-black font-black text-xl flex items-center justify-center hover:bg-gray-200 transition-colors">
                      +
                    </button>
                    <button onClick={() => setGuestScore(Math.max(0, guestScore - 1))} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                      <span className="text-2xl font-light">-</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-black/5">
              <div className="flex items-center gap-3">
                <Settings2 size={20} className="text-gray-400" />
                <div>
                  <h3 className="font-bold text-sm">Swap Sides</h3>
                  <p className="text-xs text-gray-500">Switch Home and Guest scores.</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  const temp = homeScore;
                  setHomeScore(guestScore);
                  setGuestScore(temp);
                }}
                className="px-6 py-2 bg-black text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
              >
                Swap
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
