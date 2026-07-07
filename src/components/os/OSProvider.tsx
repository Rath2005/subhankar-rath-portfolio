"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface WindowState {
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
}

interface ActiveWindows {
  [key: string]: WindowState;
}

interface OSContextProps {
  activeWindows: ActiveWindows;
  focusedWindow: string | null;
  openWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
  musicPlaying: boolean;
  setMusicPlaying: (playing: boolean) => void;
  currentTrack: string;
  setCurrentTrack: (track: string) => void;
  chatbotOpen: boolean;
  setChatbotOpen: (open: boolean) => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  animationsEnabled: boolean;
  toggleAnimations: () => void;
}

const OSContext = createContext<OSContextProps | undefined>(undefined);

export const OSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeWindows, setActiveWindows] = useState<ActiveWindows>({});
  const [focusedWindow, setFocusedWindow] = useState<string | null>(null);
  const [maxZIndex, setMaxZIndex] = useState(10);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [accentColor, setAccentColor] = useState('#00f0ff'); // Electric Cyan default
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState('Lofi Coding Beats');
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  // Load configuration from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('os-theme') as 'dark' | 'light' | null;
    const savedAccent = localStorage.getItem('os-accent');
    const savedAnim = localStorage.getItem('os-animations');
    
    if (savedTheme) setTheme(savedTheme);
    if (savedAccent) setAccentColor(savedAccent);
    if (savedAnim) setAnimationsEnabled(savedAnim === 'true');
  }, []);

  const openWindow = (id: string) => {
    if (id === 'admin') {
      window.location.href = '/admin';
      return;
    }
    setActiveWindows((prev) => {
      const nextZIndex = maxZIndex + 1;
      setMaxZIndex(nextZIndex);
      return {
        ...prev,
        [id]: { isOpen: true, isMinimized: false, zIndex: nextZIndex }
      };
    });
    setFocusedWindow(id);
  };

  const closeWindow = (id: string) => {
    setActiveWindows((prev) => {
      const next = { ...prev };
      if (next[id]) {
        next[id] = { ...next[id], isOpen: false };
      }
      return next;
    });
    if (focusedWindow === id) {
      setFocusedWindow(null);
    }
  };

  const minimizeWindow = (id: string) => {
    setActiveWindows((prev) => {
      const next = { ...prev };
      if (next[id]) {
        next[id] = { ...next[id], isMinimized: true };
      }
      return next;
    });
    if (focusedWindow === id) {
      setFocusedWindow(null);
    }
  };

  const focusWindow = (id: string) => {
    const nextZIndex = maxZIndex + 1;
    setMaxZIndex(nextZIndex);
    setActiveWindows((prev) => {
      const next = { ...prev };
      if (next[id]) {
        next[id] = { ...next[id], isMinimized: false, zIndex: nextZIndex };
      }
      return next;
    });
    setFocusedWindow(id);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('os-theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const changeAccent = (color: string) => {
    setAccentColor(color);
    localStorage.setItem('os-accent', color);
  };

  const toggleAnimations = () => {
    const nextVal = !animationsEnabled;
    setAnimationsEnabled(nextVal);
    localStorage.setItem('os-animations', String(nextVal));
  };

  return (
    <OSContext.Provider
      value={{
        activeWindows,
        focusedWindow,
        openWindow,
        closeWindow,
        minimizeWindow,
        focusWindow,
        theme,
        toggleTheme,
        accentColor,
        setAccentColor: changeAccent,
        musicPlaying,
        setMusicPlaying,
        currentTrack,
        setCurrentTrack,
        chatbotOpen,
        setChatbotOpen,
        commandPaletteOpen,
        setCommandPaletteOpen,
        animationsEnabled,
        toggleAnimations
      }}
    >
      {children}
    </OSContext.Provider>
  );
};

export const useOS = () => {
  const context = useContext(OSContext);
  if (!context) {
    throw new Error('useOS must be used within an OSProvider');
  }
  return context;
};
