"use client";

import React from 'react';
import { useOS } from '../os/OSProvider';
import { Sliders, Sun, Moon, Sparkles, Accessibility, Eye } from 'lucide-react';

export const SettingsWidget: React.FC = () => {
  const { 
    theme, 
    toggleTheme, 
    accentColor, 
    setAccentColor, 
    animationsEnabled, 
    toggleAnimations 
  } = useOS();

  const colorPalettes = [
    { name: 'Electric Cyan', hex: '#00f0ff' },
    { name: 'Purple Glow', hex: '#bd00ff' },
    { name: 'Deep Blue', hex: '#0066ff' },
    { name: 'Tesla Red', hex: '#ff0033' },
    { name: 'Nothing Amber', hex: '#e05a47' },
    { name: 'Sleek Silver', hex: '#e2e8f0' }
  ];

  return (
    <div className="space-y-6 text-slate-300 text-xs font-sans">
      <div>
        <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-semibold">PREFERENCES MODULE</span>
        <h2 className="text-xl font-bold text-white mt-0.5">Control Center</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* 1. Theme and Aesthetics */}
        <div className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.04] space-y-4">
          <h3 className="text-xs font-semibold text-slate-200 font-mono tracking-wider flex items-center">
            <Sun className="w-4 h-4 text-cyan-400 mr-2" /> THEME DESIGN
          </h3>
          
          <div className="flex justify-between items-center py-1">
            <span>Interface Mode:</span>
            <button
              onClick={toggleTheme}
              className="px-3.5 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] text-[10px] font-mono flex items-center space-x-1.5"
            >
              {theme === 'dark' ? (
                <>
                  <Moon className="w-3.5 h-3.5" />
                  <span>DARK MODE</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5" />
                  <span>LIGHT MODE</span>
                </>
              )}
            </button>
          </div>

          {/* Accent Color picker */}
          <div className="space-y-2 border-t border-white/[0.04] pt-3">
            <span>Accent Glow Hue:</span>
            <div className="grid grid-cols-3 gap-2 mt-1">
              {colorPalettes.map((palette) => {
                const isActive = accentColor === palette.hex;
                return (
                  <button
                    key={palette.hex}
                    onClick={() => setAccentColor(palette.hex)}
                    className="p-2 rounded-lg border text-[10px] text-center font-mono transition-all flex flex-col items-center justify-between"
                    style={{
                      borderColor: isActive ? accentColor : 'rgba(255,255,255,0.04)',
                      backgroundColor: isActive ? `${palette.hex}10` : 'transparent'
                    }}
                  >
                    <span 
                      className="w-3 h-3 rounded-full mb-1.5"
                      style={{ backgroundColor: palette.hex }}
                    />
                    <span className={isActive ? 'text-white font-bold' : 'text-slate-500'}>
                      {palette.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 2. System and performance controls */}
        <div className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.04] space-y-4">
          <h3 className="text-xs font-semibold text-slate-200 font-mono tracking-wider flex items-center">
            <Sparkles className="w-4 h-4 text-purple-400 mr-2" /> ENGINE SPECS
          </h3>

          <div className="flex justify-between items-center py-1">
            <div>
              <p>Hardware Animations:</p>
              <span className="text-[9px] text-slate-500">Toggle complex canvas particles & slides</span>
            </div>
            <button
              onClick={toggleAnimations}
              className={`px-3 py-1.5 rounded-lg border text-[10px] font-mono transition-colors ${animationsEnabled ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-white/[0.02] border-white/5 text-slate-500'}`}
            >
              {animationsEnabled ? 'ACTIVE ⚡' : 'REDUCED 📉'}
            </button>
          </div>

          {/* Accessibility */}
          <div className="space-y-3 border-t border-white/[0.04] pt-3">
            <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center">
              <Accessibility className="w-3.5 h-3.5 text-cyan-400 mr-1.5" /> ACCESSIBILITY ARGS
            </h4>
            <div className="flex justify-between items-center">
              <span>Text Magnification:</span>
              <span className="text-[10px] font-mono text-slate-400">1.0x (Standard)</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Screen Reader Tags:</span>
              <span className="text-[10px] font-mono text-slate-400">Optimized (ARIA)</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Performance Buffers:</span>
              <span className="text-[10px] font-mono text-emerald-400">98 / 100 FPS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
