"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Activity, 
  MapPin, 
  Target, 
  Clock, 
  BookOpen, 
  Zap, 
  Music, 
  CheckSquare, 
  Flame,
  Battery
} from 'lucide-react';
import { useOS } from '../os/OSProvider';

interface RoutineItem {
  time: string;
  activity: string;
}

export const LifeWidget: React.FC = () => {
  const { accentColor } = useOS();
  const [profile, setProfile] = useState<any>(null);
  const [ageDecimal, setAgeDecimal] = useState(21.45920392);
  const [habits, setHabits] = useState([
    { id: 'hab-1', name: 'Code 2 Hours', done: true },
    { id: 'hab-2', name: 'Go to Gym (Lifting)', done: true },
    { id: 'hab-3', name: 'Drink 3.5L Water', done: false },
    { id: 'hab-4', name: 'Read 20 Pages', done: false },
    { id: 'hab-5', name: '7+ Hours Sleep', done: true }
  ]);

  useEffect(() => {
    fetch('/api/admin?module=profile')
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
      })
      .catch(console.error);

    // Dynamic decimal age ticker
    const birthDate = new Date("2004-12-15").getTime(); // Dec 15, 2004
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diffMs = now - birthDate;
      const ageYrs = diffMs / (365.25 * 24 * 60 * 60 * 1000);
      setAgeDecimal(ageYrs);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const toggleHabit = (id: string) => {
    setHabits(prev => prev.map(h => h.id === id ? { ...h, done: !h.done } : h));
  };

  if (!profile) {
    return (
      <div className="text-center py-20 text-xs font-mono text-slate-500">
        Calibrating Life Dashboard telemetry...
      </div>
    );
  }

  const { lifeStats } = profile;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 text-slate-300 text-xs">
      {/* 1. Core Profile Details & Age Ticker */}
      <div className="md:col-span-4 p-4 rounded-xl bg-white/[0.01] border border-white/[0.04] space-y-4">
        <div>
          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Digital Chrono</span>
          <p className="text-lg font-mono font-bold tracking-tight text-white mt-1 tabular-nums">
            {ageDecimal.toFixed(8)} <span className="text-[10px] text-slate-500">YRS</span>
          </p>
        </div>

        <div className="space-y-2 border-t border-white/[0.04] pt-3">
          <div className="flex justify-between">
            <span className="text-slate-500 font-mono text-[10px]">CURRENT CITY:</span>
            <span className="text-slate-200 font-semibold">{lifeStats.city}, {lifeStats.country}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-mono text-[10px]">DAILY FOCUS:</span>
            <span className="text-cyan-400 font-semibold truncate max-w-[120px]">{lifeStats.currentFocus}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-mono text-[10px]">MOOD INDEX:</span>
            <span className="text-slate-200 font-semibold">{lifeStats.moodToday}</span>
          </div>
        </div>

        {/* Contribution stats */}
        <div className="p-3.5 bg-black/40 rounded-xl border border-white/5 space-y-2.5">
          <div className="flex justify-between items-center text-[10px] font-mono">
            <span className="flex items-center text-slate-400"><Flame className="w-3.5 h-3.5 text-amber-500 mr-1.5 animate-pulse" /> GITHUB STREAK</span>
            <span className="text-amber-500 font-bold">{lifeStats.streakGithub} Days</span>
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono">
            <span className="flex items-center text-slate-400"><Target className="w-3.5 h-3.5 text-cyan-400 mr-1.5" /> LEETCODE</span>
            <span className="text-cyan-400 font-bold">{lifeStats.streakLeetcode} Solved</span>
          </div>
        </div>
      </div>

      {/* 2. Habit Tracker & Routine */}
      <div className="md:col-span-4 p-4 rounded-xl bg-white/[0.01] border border-white/[0.04] space-y-4">
        <div>
          <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center">
            <CheckSquare className="w-3.5 h-3.5 text-cyan-400 mr-1.5" /> Daily Habit Streak
          </h4>
          
          <div className="space-y-2 mt-3">
            {habits.map((hab) => (
              <button
                key={hab.id}
                onClick={() => toggleHabit(hab.id)}
                className="w-full flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
              >
                <span className={hab.done ? 'line-through text-slate-500' : 'text-slate-300'}>
                  {hab.name}
                </span>
                <div 
                  className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors ${hab.done ? 'bg-cyan-500 border-cyan-500' : 'border-slate-600'}`}
                >
                  {hab.done && <span className="w-1.5 h-1.5 bg-black rounded-full" />}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Physical stats & Spotify Track & Dream targets */}
      <div className="md:col-span-4 p-4 rounded-xl bg-white/[0.01] border border-white/[0.04] space-y-4">
        {/* YouTube Music widget */}
        <a
          href={lifeStats.spotifyPlaying.ytMusicUrl || "https://music.youtube.com/"}
          target="_blank"
          rel="noreferrer"
          className="p-3 bg-rose-500/5 border border-rose-500/10 rounded-xl relative overflow-hidden flex flex-col justify-between hover:bg-rose-500/10 transition-colors group"
        >
          <div className="flex items-center justify-between text-[9px] font-mono text-rose-400 mb-2">
            <span className="flex items-center"><Music className="w-3 h-3 mr-1 animate-pulse" /> NOW PLAYING</span>
            {/* YT Music wordmark */}
            <span className="flex items-center space-x-1">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z"/>
              </svg>
              <span>YT MUSIC</span>
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center border border-white/10 flex-shrink-0 animate-spin" style={{ animationDuration: '8s' }}>
              <Music className="w-4 h-4 text-rose-400" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-slate-200 truncate text-[11px]">{lifeStats.spotifyPlaying.song}</p>
              <p className="text-[9px] text-slate-500 truncate">{lifeStats.spotifyPlaying.artist}</p>
            </div>
          </div>
          
          <div className="w-full h-1 bg-white/10 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-rose-400 rounded-full animate-pulse" style={{ width: '45%' }} />
          </div>
        </a>

        {/* Physical / Routine metrics */}
        <div className="space-y-2 border-t border-white/[0.04] pt-3">
          <div className="flex justify-between">
            <span className="text-slate-500 font-mono text-[9px]">PHYSICAL TRAIN:</span>
            <span className="text-slate-200 font-semibold">{lifeStats.gymProgress.split('|')[0]}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-mono text-[9px]">SLEEP AVG:</span>
            <span className="text-slate-200 font-semibold">{lifeStats.sleepTracker}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-mono text-[9px]">HYDRATED STATE:</span>
            <span className="text-slate-200 font-semibold">{lifeStats.waterIntake}</span>
          </div>
        </div>

        {/* Dream Targets */}
        <div className="p-3 bg-white/[0.01] rounded-xl border border-white/5 space-y-1.5">
          <span className="text-[8px] font-mono text-slate-500 uppercase">Aspirational Targets</span>
          <div className="flex justify-between text-[10px]">
            <span className="text-slate-400">Dream Ride:</span>
            <span className="text-slate-200 font-semibold">{lifeStats.dreamBike}</span>
          </div>
          <div className="flex justify-between text-[10px]">
            <span className="text-slate-400">Dream Drive:</span>
            <span className="text-slate-200 font-semibold">{lifeStats.dreamCar}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
