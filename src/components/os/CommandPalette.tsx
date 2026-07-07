"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Globe, Terminal, User, Cpu, Sparkles, FolderKanban, Settings, HelpCircle } from 'lucide-react';
import { useOS } from './OSProvider';

interface SearchOption {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}

export const CommandPalette: React.FC = () => {
  const { commandPaletteOpen, setCommandPaletteOpen, openWindow, accentColor } = useOS();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchOptions: SearchOption[] = [
    { id: 'about', category: 'Personal', title: 'About & Story', description: 'Biography, quotes, reading list, and goals', icon: User },
    { id: 'skills', category: 'Portfolio', title: 'Tech Stack Tree', description: 'Explore programming languages and libraries', icon: Cpu },
    { id: 'projects', category: 'Portfolio', title: 'Projects Registry', description: 'Simulators, logistics hub, embedded IoT builds', icon: FolderKanban },
    { id: 'travel', category: 'Life', title: 'Travel Map & Journal', description: 'Interactive world map of adventures', icon: Globe },
    { id: 'anime', category: 'Hobbies', title: 'Anime Universe Tracker', description: 'Reviews, favorite clips, watch schedules', icon: Sparkles },
    { id: 'finance', category: 'Dashboards', title: 'Finance Center', description: 'Interactive charts for expense trackers', icon: Terminal },
    { id: 'life', category: 'Dashboards', title: 'Life OS Dashboard', description: 'Streaks, habits, Spotify status, age counter', icon: Settings },
    { id: 'blog', category: 'Articles', title: 'Blogs & Guides', description: 'Read full developer markdown blogs', icon: HelpCircle },
    { id: 'settings', category: 'System', title: 'Preferences Control', description: 'Modify background colors, themes, animations', icon: Settings },
    { id: 'admin', category: 'System', title: 'Admin Terminal', icon: Terminal, description: 'Manage content without writing code' },
  ];

  // Global keydown listeners for shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle Command Palette: Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
      
      // Close on Escape
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setCommandPaletteOpen]);

  // Focus input when opened
  useEffect(() => {
    if (commandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [commandPaletteOpen]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setCommandPaletteOpen(false);
      }
    };
    if (commandPaletteOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  const filtered = searchOptions.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.description.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        openWindow(filtered[selectedIndex].id);
        setCommandPaletteOpen(false);
      }
    }
  };

  if (!commandPaletteOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-start justify-center pt-[15vh]">
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="w-[90vw] max-w-xl glass-panel bg-[#0d0d12]/90 rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl"
          onKeyDown={handleKeyDown}
        >
          {/* Search Input Area */}
          <div className="flex items-center px-4 border-b border-white/[0.05] bg-black/40">
            <Search className="w-5 h-5 text-slate-400 mr-3" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search sections, logs, configurations..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              className="flex-1 py-4 bg-transparent outline-none border-none text-slate-200 text-sm font-sans placeholder-slate-500"
            />
            <button
              onClick={() => setCommandPaletteOpen(false)}
              className="text-[10px] font-mono bg-white/5 border border-white/10 text-slate-400 px-2 py-0.5 rounded-lg"
            >
              ESC
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-[350px] overflow-y-auto p-2 custom-scrollbar">
            {filtered.length > 0 ? (
              filtered.map((item, index) => {
                const Icon = item.icon;
                const active = index === selectedIndex;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      openWindow(item.id);
                      setCommandPaletteOpen(false);
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all duration-150 select-none group"
                    style={{
                      backgroundColor: active ? 'rgba(255, 255, 255, 0.04)' : 'transparent',
                    }}
                  >
                    <div className="flex items-center space-x-3.5 min-w-0">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center border transition-all"
                        style={{
                          backgroundColor: active ? `${accentColor}15` : 'rgba(255,255,255,0.02)',
                          borderColor: active ? accentColor : 'rgba(255,255,255,0.04)'
                        }}
                      >
                        <Icon 
                          className="w-4 h-4 transition-colors" 
                          style={{ color: active ? accentColor : '#94a3b8' }} 
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-slate-200 group-hover:text-white truncate">{item.title}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5 truncate">{item.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-slate-600 bg-white/[0.02] px-2 py-0.5 rounded border border-white/[0.04]">
                        {item.category}
                      </span>
                      {active && (
                        <span className="text-[10px] font-mono text-slate-400 group-hover:text-white">
                          ↵ Enter
                        </span>
                      )}
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="py-12 text-center select-none">
                <HelpCircle className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-xs font-mono text-slate-500">No results matching "{query}"</p>
              </div>
            )}
          </div>

          {/* Footer Guide info */}
          <div className="px-4 py-2 border-t border-white/[0.05] bg-black/45 flex items-center justify-between text-[9px] font-mono text-slate-500">
            <div className="flex items-center space-x-4">
              <span>↑↓ Navigate</span>
              <span>↵ Open</span>
            </div>
            <span>Press Esc to close</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
