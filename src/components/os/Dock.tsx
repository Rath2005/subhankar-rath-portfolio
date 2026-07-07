"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Cpu, 
  FolderKanban, 
  Globe, 
  Sparkles, 
  LineChart, 
  LayoutDashboard, 
  BookOpen, 
  Sliders, 
  Lock,
  MessageSquare
} from 'lucide-react';
import { useOS } from './OSProvider';

interface DockItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}

export const Dock: React.FC = () => {
  const { activeWindows, openWindow, focusWindow, accentColor, chatbotOpen, setChatbotOpen } = useOS();

  const dockItems: DockItem[] = [
    { id: 'about', label: 'About & Story', icon: User },
    { id: 'skills', label: 'Tech Stack', icon: Cpu },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'travel', label: 'Travel Diary', icon: Globe },
    { id: 'anime', label: 'Anime Universe', icon: Sparkles },
    { id: 'finance', label: 'Finance Hub', icon: LineChart },
    { id: 'life', label: 'Life Dashboard', icon: LayoutDashboard },
    { id: 'blog', label: 'Blogs', icon: BookOpen },
    { id: 'settings', label: 'Preferences', icon: Sliders },
    { id: 'admin', label: 'Admin Terminal', icon: Lock },
  ];

  const handleItemClick = (id: string) => {
    const state = activeWindows[id];
    if (state?.isOpen) {
      if (state.isMinimized) {
        focusWindow(id);
      } else {
        // If already open and focused, just animate focus, else bring to front
        focusWindow(id);
      }
    } else {
      openWindow(id);
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex justify-center items-center pointer-events-none">
      <motion.div 
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 100, damping: 15 }}
        className="glass-panel px-4 py-2.5 rounded-2xl flex items-end space-x-4 shadow-2xl pointer-events-auto border-white/[0.07] bg-[#0c0c10]/80 relative"
      >
        {dockItems.map((item) => {
          const Icon = item.icon;
          const status = activeWindows[item.id];
          const isOpen = status?.isOpen;
          const isMinimized = status?.isMinimized;

          return (
            <div key={item.id} className="relative flex flex-col items-center group">
              {/* Tooltip */}
              <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-all duration-200 bg-black/80 text-white text-[10px] font-mono tracking-widest px-2.5 py-1.5 rounded-lg border border-white/10 shadow-lg pointer-events-none whitespace-nowrap">
                {item.label}
              </div>

              {/* Icon Button */}
              <motion.button
                onClick={() => handleItemClick(item.id)}
                whileHover={{ y: -8, scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] transition-colors relative"
              >
                <Icon className="w-5.5 h-5.5 text-slate-300 group-hover:text-white transition-colors" />
                
                {/* Active Indicator Dot */}
                {isOpen && (
                  <span 
                    className={`absolute bottom-1 w-1.5 h-1.5 rounded-full transition-opacity duration-300 ${isMinimized ? 'opacity-40 animate-pulse' : 'opacity-100'}`}
                    style={{ backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}` }}
                  />
                )}
              </motion.button>
            </div>
          );
        })}

        {/* Separator line */}
        <div className="w-[1px] h-9 bg-white/10 self-center" />

        {/* Chatbot shortcut */}
        <div className="relative flex flex-col items-center group">
          <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-all duration-200 bg-black/80 text-white text-[10px] font-mono tracking-widest px-2.5 py-1.5 rounded-lg border border-white/10 shadow-lg pointer-events-none whitespace-nowrap">
            AI Assistant
          </div>
          <motion.button
            onClick={() => setChatbotOpen(!chatbotOpen)}
            whileHover={{ y: -8, scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className={`w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center border transition-colors relative ${chatbotOpen ? 'bg-white/[0.1] border-white/25' : 'bg-white/[0.03] border-white/[0.05] hover:bg-white/[0.08]'}`}
          >
            <MessageSquare className="w-5.5 h-5.5 text-slate-300 group-hover:text-white" />
            {chatbotOpen && (
              <span 
                className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-cyan-400"
                style={{ boxShadow: `0 0 8px #00f0ff` }}
              />
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
