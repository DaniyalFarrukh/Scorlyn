"use client";
import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, MonitorSmartphone, Settings2, Trophy, Plus, Trash2, Edit2 } from 'lucide-react';

function ScoreboardPanel({ id, name, onRemove, onRename }: { id: number, name: string, onRemove: () => void, onRename: (newName: string) => void }) {
  // Try to load initial state from localStorage
  const getInitialState = () => {
    const saved = localStorage.getItem(`scoreboard-state-${id}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  };

  const initialState = getInitialState();

  // Timer State
  const [timeLeft, setTimeLeft] = useState(initialState?.timeLeft ?? 3600); // 60 mins in seconds
  const [isRunning, setIsRunning] = useState(initialState?.isRunning ?? false);

  // Score State
  const [homeScore, setHomeScore] = useState(initialState?.homeScore ?? 0);
  const [guestScore, setGuestScore] = useState(initialState?.guestScore ?? 0);
  const [game, setGame] = useState(initialState?.game ?? 1);

  // Renaming State
  const [isEditingName, setIsEditingName] = useState(false);
  const [editNameValue, setEditNameValue] = useState(name);

  // Save state to local storage whenever it changes
  useEffect(() => {
    const state = { timeLeft, isRunning, homeScore, guestScore, game };
    localStorage.setItem(`scoreboard-state-${id}`, JSON.stringify(state));
  }, [id, timeLeft, isRunning, homeScore, guestScore, game]);

  // Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev: number) => prev - 1);
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
    if(confirm(`Are you sure you want to reset the match on ${name}?`)) {
      setHomeScore(0);
      setGuestScore(0);
      setGame(1);
      setTimer(60);
    }
  };

  const handleRenameSubmit = () => {
    if (editNameValue.trim()) {
      onRename(editNameValue.trim());
    } else {
      setEditNameValue(name); // Revert if empty
    }
    setIsEditingName(false);
  };

  return (
    <div className="bg-white rounded-3xl shadow-md border border-black/5 overflow-hidden mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="bg-gray-50 border-b border-black/5 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className="p-2 bg-black rounded-lg text-white">
            <MonitorSmartphone size={18} />
          </div>
          <div className="flex-1 max-w-sm">
            {isEditingName ? (
              <input 
                autoFocus
                value={editNameValue}
                onChange={(e) => setEditNameValue(e.target.value)}
                onBlur={handleRenameSubmit}
                onKeyDown={(e) => e.key === 'Enter' && handleRenameSubmit()}
                className="w-full bg-white border border-black/20 rounded-md px-2 py-1 text-sm font-black uppercase tracking-widest outline-none focus:border-black"
              />
            ) : (
              <div 
                className="group cursor-pointer hover:bg-gray-200 px-2 py-1 -ml-2 rounded-md transition-colors inline-flex items-center gap-2"
                onClick={() => setIsEditingName(true)}
                title="Click to rename"
              >
                <span className="font-black uppercase tracking-widest text-sm">{name}</span>
                <Edit2 size={12} className="text-gray-400 group-hover:text-black transition-colors" />
              </div>
            )}
            <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 uppercase tracking-widest mt-1 ml-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Online
            </div>
          </div>
        </div>
        <button 
          onClick={onRemove}
          className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
          title="Remove Scoreboard"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Timer & Controls */}
          <div className="lg:col-span-1 space-y-6 border-r-0 lg:border-r border-black/5 lg:pr-8">
            <div className="bg-black text-[#ccff00] font-mono text-5xl md:text-6xl text-center py-6 md:py-8 rounded-2xl tracking-widest shadow-inner relative overflow-hidden">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ccff00 1px, transparent 1px)', backgroundSize: '4px 4px' }}></div>
              <span className="relative z-10">{formatTime(timeLeft)}</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setIsRunning(!isRunning)}
                className={`py-3 md:py-4 rounded-xl font-black uppercase tracking-widest text-xs md:text-sm flex items-center justify-center gap-2 transition-all ${
                  isRunning ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {isRunning ? <><Pause size={16}/> Pause</> : <><Play size={16}/> Start</>}
              </button>
              <button 
                onClick={() => setTimer(timeLeft / 60)} 
                className="bg-gray-100 text-gray-700 py-3 md:py-4 rounded-xl font-black uppercase tracking-widest text-xs md:text-sm flex items-center justify-center gap-2 hover:bg-gray-200 transition-all"
              >
                <RotateCcw size={16}/> Reset
              </button>
            </div>

            <div className="space-y-2 pt-2">
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Quick Set Time</p>
              <div className="grid grid-cols-3 gap-2">
                <button onClick={() => setTimer(30)} className="py-2 border border-black/10 rounded-lg text-xs font-bold text-gray-600 hover:border-black hover:text-black hover:bg-gray-50 transition-colors">30m</button>
                <button onClick={() => setTimer(60)} className="py-2 border border-black/10 rounded-lg text-xs font-bold text-gray-600 hover:border-black hover:text-black hover:bg-gray-50 transition-colors">60m</button>
                <button onClick={() => setTimer(90)} className="py-2 border border-black/10 rounded-lg text-xs font-bold text-gray-600 hover:border-black hover:text-black hover:bg-gray-50 transition-colors">90m</button>
              </div>
            </div>
          </div>

          {/* Right Column: Scoreboard Manager */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <Trophy size={14} /> Live Scoring
              </h2>
              <button onClick={resetMatch} className="text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-700 hover:underline">
                Reset Match
              </button>
            </div>

            <div className="bg-black p-6 md:p-8 rounded-3xl relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '8px 8px' }}></div>
              
              <div className="flex justify-between items-center relative z-10 text-white gap-2 md:gap-4">
                
                {/* Home Score */}
                <div className="flex flex-col items-center flex-1">
                  <span className="text-gray-400 font-bold uppercase tracking-widest text-xs md:text-sm mb-2 md:mb-4">Home</span>
                  <div className="text-7xl md:text-[120px] font-mono leading-none tracking-tighter text-[#ccff00]" style={{ textShadow: '0 0 20px rgba(204, 255, 0, 0.4)' }}>
                    {homeScore.toString().padStart(2, '0')}
                  </div>
                  <div className="flex gap-2 md:gap-4 mt-4 md:mt-6">
                    <button onClick={() => setHomeScore(Math.max(0, homeScore - 1))} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                      <span className="text-xl md:text-2xl font-light">-</span>
                    </button>
                    <button onClick={() => setHomeScore(homeScore + 1)} className="w-12 h-10 md:w-16 md:h-12 rounded-full bg-white text-black font-black text-lg md:text-xl flex items-center justify-center hover:bg-gray-200 transition-colors">
                      +
                    </button>
                  </div>
                </div>

                {/* Game / Sets */}
                <div className="flex flex-col items-center justify-center px-2 md:px-4">
                  <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px] md:text-xs mb-1 md:mb-2">Game</span>
                  <div className="text-2xl md:text-3xl font-mono text-white mb-2">{game}</div>
                  <div className="flex gap-1 md:gap-2">
                    <button onClick={() => setGame(Math.max(1, game - 1))} className="text-gray-400 hover:text-white px-2 text-lg md:text-xl">-</button>
                    <button onClick={() => setGame(game + 1)} className="text-gray-400 hover:text-white px-2 text-lg md:text-xl">+</button>
                  </div>
                </div>

                {/* Guest Score */}
                <div className="flex flex-col items-center flex-1">
                  <span className="text-gray-400 font-bold uppercase tracking-widest text-xs md:text-sm mb-2 md:mb-4">Guest</span>
                  <div className="text-7xl md:text-[120px] font-mono leading-none tracking-tighter text-[#ccff00]" style={{ textShadow: '0 0 20px rgba(204, 255, 0, 0.4)' }}>
                    {guestScore.toString().padStart(2, '0')}
                  </div>
                  <div className="flex gap-2 md:gap-4 mt-4 md:mt-6">
                    <button onClick={() => setGuestScore(guestScore + 1)} className="w-12 h-10 md:w-16 md:h-12 rounded-full bg-white text-black font-black text-lg md:text-xl flex items-center justify-center hover:bg-gray-200 transition-colors">
                      +
                    </button>
                    <button onClick={() => setGuestScore(Math.max(0, guestScore - 1))} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                      <span className="text-xl md:text-2xl font-light">-</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>

            <div className="flex justify-between items-center p-3 md:p-4 bg-gray-50 rounded-xl border border-black/5">
              <div className="flex items-center gap-3">
                <Settings2 size={18} className="text-gray-400" />
                <div>
                  <h3 className="font-bold text-xs md:text-sm">Swap Sides</h3>
                  <p className="text-[10px] md:text-xs text-gray-500">Switch Home and Guest scores.</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  const temp = homeScore;
                  setHomeScore(guestScore);
                  setGuestScore(temp);
                }}
                className="px-4 py-2 bg-black text-white rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
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

export default function CourtDashboard() {
  const [scoreboards, setScoreboards] = useState<{ id: number, name: string }[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('scorlyn-scoreboards');
    if (saved) {
      try {
        setScoreboards(JSON.parse(saved));
      } catch (e) {
        setScoreboards([{ id: 1, name: 'Main Court (LED-1)' }]);
      }
    } else {
      setScoreboards([{ id: 1, name: 'Main Court (LED-1)' }]);
    }
    setIsLoaded(true);
  }, []);

  // Save to local storage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('scorlyn-scoreboards', JSON.stringify(scoreboards));
    }
  }, [scoreboards, isLoaded]);

  const addScoreboard = () => {
    const newId = Date.now();
    setScoreboards([...scoreboards, { id: newId, name: `Court ${scoreboards.length + 1} (LED-${scoreboards.length + 1})` }]);
  };

  const removeScoreboard = (id: number) => {
    if(confirm("Are you sure you want to remove this scoreboard from your view?")) {
      setScoreboards(scoreboards.filter(s => s.id !== id));
      // Optional: Clean up its state from localStorage
      localStorage.removeItem(`scoreboard-state-${id}`);
    }
  };

  const renameScoreboard = (id: number, newName: string) => {
    setScoreboards(scoreboards.map(s => s.id === id ? { ...s, name: newName } : s));
  };

  if (!isLoaded) return null; // Prevent hydration mismatch

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto pb-24">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight mb-2">Live Controller</h1>
          <p className="text-gray-500 font-medium">Control your Smart LED Scoreboards and court time.</p>
        </div>
        <button 
          onClick={addScoreboard}
          className="bg-black text-white px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          <Plus size={16} /> Add Scoreboard
        </button>
      </div>

      <div className="space-y-4">
        {scoreboards.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-black/5 shadow-sm">
            <MonitorSmartphone size={48} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-lg font-black uppercase tracking-tight mb-2">No Scoreboards Active</h2>
            <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">You currently have no scoreboards in your view. Add one to start tracking games.</p>
            <button 
              onClick={addScoreboard}
              className="bg-black text-white px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs inline-flex items-center gap-2 hover:bg-gray-800 transition-colors"
            >
              <Plus size={16} /> Add Scoreboard
            </button>
          </div>
        ) : (
          scoreboards.map((board) => (
            <ScoreboardPanel 
              key={board.id} 
              id={board.id}
              name={board.name} 
              onRemove={() => removeScoreboard(board.id)} 
              onRename={(newName) => renameScoreboard(board.id, newName)}
            />
          ))
        )}
      </div>
    </div>
  );
}
