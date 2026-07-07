"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Wifi, 
  Battery, 
  Search, 
  Music, 
  VolumeX, 
  Volume2, 
  Sun, 
  CloudSun,
  UserCheck
} from 'lucide-react';
import { useOS } from './OSProvider';

export const StatusBar: React.FC = () => {
  const { 
    theme, 
    toggleTheme, 
    musicPlaying, 
    setMusicPlaying, 
    setCommandPaletteOpen,
    accentColor
  } = useOS();
  
  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [batteryLevel, setBatteryLevel] = useState('98%');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Time & Date tickers
    const updateDateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
      setDateStr(now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
    };
    
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    // Battery API check
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        setBatteryLevel(`${Math.round(battery.level * 100)}%`);
        battery.addEventListener('levelchange', () => {
          setBatteryLevel(`${Math.round(battery.level * 100)}%`);
        });
      });
    }

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, type: 'spring', stiffness: 100, damping: 15 }}
      className="fixed top-3 left-[4vw] right-[4vw] z-50 h-11 glass-panel rounded-xl flex items-center justify-between px-4 border-white/[0.07] bg-[#0c0c10]/60 select-none shadow-lg"
    >
      {/* Left Area: Digital Time & Identity */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span 
            className="w-2.5 h-2.5 rounded-full animate-pulse"
            style={{ backgroundColor: accentColor, boxShadow: `0 0 10px ${accentColor}` }}
          />
          <span className="text-xs font-mono font-bold tracking-widest text-slate-100">SUBHANKAR.OS</span>
        </div>
        <div className="hidden md:flex items-center space-x-2 text-[11px] font-mono text-slate-400 border-l border-white/10 pl-4">
          <span>{dateStr}</span>
          <span>•</span>
          <span className="text-slate-200 tabular-nums">{timeStr}</span>
        </div>
      </div>

      {/* Center Area: Quick Tools */}
      <div className="flex items-center space-x-1.5">
        {/* Search Palette Trigger */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="h-7 px-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.04] flex items-center space-x-2 text-[10px] font-mono text-slate-400 hover:text-white transition-all"
        >
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline">Search Everything</span>
          <kbd className="hidden lg:inline bg-black/40 px-1 py-0.5 rounded border border-white/10 text-[8px]">⌘K</kbd>
        </button>

        {/* Custom Audio controller toggle in menu */}
        <button
          onClick={() => setMusicPlaying(!musicPlaying)}
          className={`h-7 w-7 rounded-lg flex items-center justify-center border transition-all ${musicPlaying ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-white/[0.03] border-white/[0.04] text-slate-400 hover:text-white'}`}
        >
          {musicPlaying ? <Volume2 className="w-3.5 h-3.5 animate-bounce" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Right Area: System Specs */}
      <div className="flex items-center space-x-4">
        {/* Weather Indicator */}
        <div className="hidden lg:flex items-center space-x-1.5 text-[11px] font-mono text-slate-400">
          <CloudSun className="w-3.5 h-3.5 text-amber-400" />
          <span>Bhubaneswar 29°C</span>
        </div>

        {/* Wifi, Battery, and Theme toggle */}
        <div className="flex items-center space-x-3 text-slate-400 text-xs pl-4 border-l border-white/10">
          <Wifi className="w-3.5 h-3.5 text-emerald-400" />
          <div className="flex items-center space-x-1 font-mono text-[10px]">
            <Battery className="w-4 h-4 text-slate-300" />
            <span className="tabular-nums">{batteryLevel}</span>
          </div>
          
          {/* Theme switch */}
          <button 
            onClick={toggleTheme} 
            className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <Sun className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.header>
  );
};
