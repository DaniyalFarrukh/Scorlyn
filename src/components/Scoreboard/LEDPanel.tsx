"use client";
import React from 'react';
import { cn } from '@/lib/utils';

export type LEDColor = 'green' | 'red' | 'amber' | 'white';
export type MatchMode = 'standard' | 'tiebreak' | 'tournament';

interface LEDPanelProps {
  homeScore: string;
  guestScore: string;
  period: string; // e.g. "GAME 2"
  color: LEDColor;
  brightness: number; // 0 to 100
  mode?: MatchMode;
  className?: string;
  scale?: number;
}

const colorMap = {
  green: {
    base: '#ccff00',
    core: '#e6ff66',
    glow: 'rgba(204, 255, 0, 0.4)',
    wideGlow: 'rgba(204, 255, 0, 0.15)'
  },
  red: {
    base: '#ff3333',
    core: '#ff8080',
    glow: 'rgba(255, 51, 51, 0.4)',
    wideGlow: 'rgba(255, 51, 51, 0.15)'
  },
  amber: {
    base: '#ffaa00',
    core: '#ffcc66',
    glow: 'rgba(255, 170, 0, 0.4)',
    wideGlow: 'rgba(255, 170, 0, 0.15)'
  },
  white: {
    base: '#ffffff',
    core: '#ffffff',
    glow: 'rgba(255, 255, 255, 0.4)',
    wideGlow: 'rgba(255, 255, 255, 0.1)'
  }
};

export const LEDPanel: React.FC<LEDPanelProps> = ({
  homeScore,
  guestScore,
  period,
  color,
  brightness,
  mode = 'standard',
  className,
  scale = 1
}) => {
  const activeColor = colorMap[color];
  const opacity = Math.max(0.1, brightness / 100);

  return (
    <div 
      className={cn(
        "relative rounded-2xl overflow-hidden font-sans",
        className
      )}
      style={{
        width: 800 * scale,
        height: 380 * scale,
        background: 'linear-gradient(180deg, #111111 0%, #050505 100%)',
        boxShadow: `
          0 0 0 1px #222,
          inset 0 1px 1px rgba(255,255,255,0.1),
          0 30px 60px -20px ${activeColor.wideGlow}
        `
      }}
    >
      {/* Chassis Screws */}
      <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-[#1a1a1a] border border-[#000] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"></div>
      <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#1a1a1a] border border-[#000] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"></div>
      <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-[#1a1a1a] border border-[#000] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"></div>
      <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-[#1a1a1a] border border-[#000] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"></div>

      {/* Screen Area */}
      <div className="absolute inset-x-8 top-8 bottom-20 bg-[#020202] rounded-lg shadow-[inset_0_0_20px_rgba(0,0,0,1)] border border-[#111] overflow-hidden">
        
        {/* Screen Glare Reflection */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-[60%] bg-gradient-to-b from-white/10 to-transparent skew-y-[-5deg] origin-top-left translate-y-[-10px] blur-[1px]"></div>
        </div>

        {/* Unlit LED Background Pattern */}
        <div 
          className="absolute inset-0 pointer-events-none z-0 opacity-20 mix-blend-screen"
          style={{
            backgroundImage: `radial-gradient(circle, #222 1px, transparent 1px)`,
            backgroundSize: `${6 * scale}px ${6 * scale}px`,
            backgroundPosition: '0 0'
          }}
        ></div>

        {/* Active LED Display */}
        <div 
          className="relative z-10 w-full h-full flex justify-center items-center gap-16 select-none"
          style={{ opacity }}
        >
          {/* LED Numbers Container with Dot Matrix Mask */}
          <div 
            className="flex items-center gap-12 font-mono tabular-nums tracking-tighter"
            style={{ 
              fontSize: 160 * scale, 
              lineHeight: 1,
              color: activeColor.core,
              textShadow: `
                0 0 10px ${activeColor.base},
                0 0 30px ${activeColor.glow},
                0 0 80px ${activeColor.wideGlow}
              `,
              // This mask creates the individual LED "dots" out of the solid font
              WebkitMaskImage: `radial-gradient(circle, black 65%, transparent 65%)`,
              WebkitMaskSize: `${6 * scale}px ${6 * scale}px`
            }}
          >
            <div>{homeScore.padStart(2, '0')}</div>
            <div className="text-8xl opacity-80 pb-4">:</div>
            <div>{guestScore.padStart(2, '0')}</div>
          </div>
        </div>
      </div>

      {/* Painted Chassis Text (Not LEDs) */}
      <div className="absolute bottom-6 inset-x-0 flex justify-between px-16 select-none">
        <div className="text-[#555] font-bold tracking-[0.3em] text-sm uppercase">HOME</div>
        <div className="text-[#777] font-bold tracking-[0.3em] text-sm uppercase bg-[#111] px-4 py-1 rounded shadow-inner border border-[#000]">{period}</div>
        <div className="text-[#555] font-bold tracking-[0.3em] text-sm uppercase">GUEST</div>
      </div>

    </div>
  );
};
