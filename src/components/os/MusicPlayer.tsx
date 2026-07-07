"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX, 
  Disc,
  X
} from 'lucide-react';
import { useOS } from './OSProvider';

export const MusicPlayer: React.FC = () => {
  const { musicPlaying, setMusicPlaying, currentTrack, accentColor } = useOS();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [minimized, setMinimized] = useState(true);

  // We can use a reliable, premium royalty-free lofi track
  const audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3";

  useEffect(() => {
    if (audioRef.current) {
      if (musicPlaying) {
        audioRef.current.play().catch(() => {
          // Auto-play block handling
          setMusicPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [musicPlaying, setMusicPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : volume;
    }
  }, [volume, muted]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setProgress(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-24 right-6 z-40 select-none">
      {/* Hidden native audio element */}
      <audio
        ref={audioRef}
        src={audioUrl}
        loop
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      <AnimatePresence>
        {minimized ? (
          /* Mini CD indicator badge floating */
          <motion.button
            key="mini-player"
            onClick={() => setMinimized(false)}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1 }}
            className="w-12 h-12 rounded-full glass-panel flex items-center justify-center border-white/10 shadow-2xl relative"
          >
            <Disc 
              className={`w-6 h-6 text-slate-300 ${musicPlaying ? 'animate-spin' : ''}`}
              style={{ animationDuration: '6s', color: musicPlaying ? accentColor : undefined }}
            />
            {musicPlaying && (
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-500"></span>
              </span>
            )}
          </motion.button>
        ) : (
          /* Premium full player window panel */
          <motion.div
            key="full-player"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="w-72 glass-panel p-4 rounded-2xl flex flex-col border border-white/[0.08] shadow-2xl relative"
          >
            {/* Header controls */}
            <div className="flex items-center justify-between mb-3.5">
              <span className="text-[10px] font-mono tracking-widest text-slate-400">MUSIC PLAYER</span>
              <button 
                onClick={() => setMinimized(true)}
                className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Song Meta Layout */}
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-slate-800/80 flex items-center justify-center overflow-hidden border border-white/5 relative">
                <Disc className={`w-7 h-7 text-slate-400 ${musicPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
                {musicPlaying && (
                  <div className="absolute inset-0 bg-cyan-500/10 flex items-center justify-center" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-200 truncate">{currentTrack}</p>
                <p className="text-[10px] text-slate-400 truncate mt-0.5">Coding Atmosphere Ambient</p>
              </div>
            </div>

            {/* Equalizer Visualizer (CSS animated divs) */}
            <div className="h-6 flex items-end justify-center space-x-1 mb-3 bg-black/30 rounded-lg p-1.5 border border-white/5">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 rounded-t-sm"
                  style={{
                    backgroundColor: accentColor,
                    height: musicPlaying ? `${Math.floor(Math.random() * 85) + 15}%` : '20%',
                    transition: musicPlaying ? 'height 0.15s ease-in-out' : 'height 0.5s',
                    animationDelay: `${i * 0.05}s`
                  }}
                />
              ))}
            </div>

            {/* Timeline Progress Slider */}
            <div className="flex flex-col space-y-1 mb-3">
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={progress}
                onChange={handleSeek}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
                style={{
                  background: `linear-gradient(to right, ${accentColor} 0%, ${accentColor} ${(progress / (duration || 1)) * 100}%, rgba(255, 255, 255, 0.1) ${(progress / (duration || 1)) * 100}%, rgba(255, 255, 255, 0.1) 100%)`
                }}
              />
              <div className="flex justify-between text-[8px] font-mono text-slate-500">
                <span>{formatTime(progress)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-between">
              {/* Volume panel inside player */}
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => setMuted(!muted)}
                  className="text-slate-400 hover:text-white"
                >
                  {muted || volume === 0 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-12 h-1 bg-white/15 rounded-lg appearance-none cursor-pointer accent-slate-400"
                />
              </div>

              {/* Main skip / play actions */}
              <div className="flex items-center space-x-2.5">
                <button className="text-slate-500 hover:text-white transition-colors">
                  <SkipBack className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setMusicPlaying(!musicPlaying)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-black shadow-lg hover:scale-105 active:scale-95 transition-all"
                  style={{ backgroundColor: accentColor }}
                >
                  {musicPlaying ? <Pause className="w-4 h-4 text-black" fill="black" /> : <Play className="w-4 h-4 text-black ml-0.5" fill="black" />}
                </button>
                <button className="text-slate-500 hover:text-white transition-colors">
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
