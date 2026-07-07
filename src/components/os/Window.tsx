"use client";

import React, { useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { Minus, Square, X } from 'lucide-react';
import { useOS } from './OSProvider';

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  defaultWidth?: string;
  defaultHeight?: string;
}

export const Window: React.FC<WindowProps> = ({
  id,
  title,
  children,
  defaultWidth = 'max-w-4xl',
  defaultHeight = 'h-[75vh]'
}) => {
  const { activeWindows, focusedWindow, closeWindow, minimizeWindow, focusWindow, accentColor } = useOS();
  const windowRef = useRef<HTMLDivElement>(null);
  const controls = useDragControls();
  const state = activeWindows[id];

  if (!state || !state.isOpen || state.isMinimized) return null;

  const isFocused = focusedWindow === id;

  return (
    <AnimatePresence>
      <motion.div
        ref={windowRef}
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        drag
        dragControls={controls}
        dragListener={false}
        dragMomentum={false}
        dragElastic={0.05}
        dragConstraints={{ left: -400, right: 800, top: 0, bottom: 600 }}
        onPointerDown={() => focusWindow(id)}
        style={{ zIndex: state.zIndex }}
        className={`fixed top-[12vh] left-1/2 -translate-x-1/2 w-[92vw] sm:w-[85vw] ${defaultWidth} ${defaultHeight} glass-panel rounded-2xl flex flex-col overflow-hidden border-[1px]`}
      >
        {/* Glow border overlay active when focused */}
        {isFocused && (
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl border-[1px] transition-all duration-300"
            style={{ borderColor: accentColor, boxShadow: `0 0 20px ${accentColor}1c` }}
          />
        )}

        {/* Window Header — drag handle */}
        <div
          onPointerDown={(e) => controls.start(e)}
          className="px-4 py-3 flex items-center justify-between border-b border-white/[0.06] bg-black/40 cursor-grab active:cursor-grabbing select-none touch-none"
        >
          {/* OS traffic-light controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => closeWindow(id)}
              className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] flex items-center justify-center group border border-black/10"
            >
              <X className="w-2.5 h-2.5 text-black/70 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button
              onClick={() => minimizeWindow(id)}
              className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] flex items-center justify-center group border border-black/10"
            >
              <Minus className="w-2.5 h-2.5 text-black/70 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button
              onClick={() => focusWindow(id)}
              className="w-3.5 h-3.5 rounded-full bg-[#27c93f] flex items-center justify-center group border border-black/10"
            >
              <Square className="w-2 h-2 text-black/70 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>

          {/* Window Title */}
          <span className="text-xs font-mono tracking-widest text-slate-400 font-medium">
            {title.toUpperCase()}
          </span>

          {/* Window Status Dot */}
          <div className="flex items-center space-x-1.5">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: accentColor }}
            />
          </div>
        </div>

        {/* Window Body Container */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-black/15 custom-scrollbar">
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
