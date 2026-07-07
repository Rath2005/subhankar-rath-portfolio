"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Compass, Image as ImageIcon, Heart, Calendar } from 'lucide-react';
import { useOS } from '../os/OSProvider';

interface TravelDestination {
  id: string;
  placeName: string;
  country: string;
  visitedDate: string;
  coordinates: [number, number]; // custom coordinate grid offset for SVG
  gallery: string[];
  expenses: number;
  story: string;
  isWishlist: boolean;
}

export const TravelWidget: React.FC = () => {
  const { accentColor } = useOS();
  const [destinations, setDestinations] = useState<TravelDestination[]>([]);
  const [selectedDest, setSelectedDest] = useState<TravelDestination | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin?module=travel')
      .then((res) => res.json())
      .then((data) => {
        setDestinations(data);
        if (data.length > 0) {
          setSelectedDest(data[0]); // default focus
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-slate-300">
      {/* Left Column: Interactive Vector SVG Map Projection */}
      <div className="lg:col-span-7 flex flex-col justify-between p-4 rounded-2xl bg-black/45 border border-white/[0.04]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span className="text-[10px] font-mono tracking-widest text-slate-400 font-semibold uppercase">TOPOLOGY GRID</span>
          </div>
          <span className="text-[8px] font-mono text-slate-500">PROJECTION: MERCATOR (MOCK)</span>
        </div>

        {/* Vector SVG Map Container */}
        <div className="relative w-full h-[250px] bg-slate-950/65 rounded-xl border border-white/5 overflow-hidden flex items-center justify-center">
          {/* Custom dot matrix grid overlay for premium dashboard look */}
          <div 
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
              backgroundSize: '16px 16px'
            }}
          />

          {/* SVG Map Lines (Futuristic Wireframe World Layout) */}
          <svg className="w-full h-full absolute inset-0 select-none opacity-40" viewBox="0 0 500 250">
            {/* Outline path representation for continents (Stylized grid) */}
            <path d="M50,80 Q70,70 120,60 T180,90 T240,110 T300,100 T360,70 T420,110 L450,150 L400,180 Z" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3,3" />
            <path d="M120,140 Q160,180 200,210 T250,180 Z" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3,3" />
            <path d="M300,140 Q320,170 380,180 T450,210 Z" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3,3" />

            {/* Connecting lines between markers */}
            {destinations.length > 1 && (
              <path 
                d={`M${destinations[0].coordinates[0]} ${destinations[0].coordinates[1]} L${destinations[1].coordinates[0]} ${destinations[1].coordinates[1]}`} 
                fill="none" 
                stroke={accentColor} 
                strokeWidth="0.8" 
                strokeDasharray="4,4"
                className="animate-pulse"
              />
            )}
          </svg>

          {/* Interactive Marker Nodes */}
          {!loading && destinations.map((dest) => {
            const isSelected = selectedDest?.id === dest.id;
            // Map coordinates array to percentage positions on viewport
            const [x, y] = dest.coordinates;
            return (
              <button
                key={dest.id}
                onClick={() => setSelectedDest(dest)}
                className="absolute group flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${x}px`, top: `${y}px` }}
              >
                {/* Ping animation for selected or wishlist item */}
                {isSelected && (
                  <span className="absolute flex h-6 w-6">
                    <span 
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                      style={{ backgroundColor: dest.isWishlist ? '#a855f7' : accentColor }}
                    />
                  </span>
                )}
                
                {/* Node Pin */}
                <div 
                  className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${isSelected ? 'scale-125' : 'scale-100 bg-black'}`}
                  style={{
                    borderColor: dest.isWishlist ? '#bd00ff' : accentColor,
                    backgroundColor: isSelected ? (dest.isWishlist ? '#bd00ff' : accentColor) : '#09090b'
                  }}
                >
                  <MapPin className="w-1.5 h-1.5 text-black" fill={isSelected ? 'black' : 'none'} />
                </div>

                {/* Marker Tooltip label */}
                <div className="absolute top-5 scale-0 group-hover:scale-100 transition-transform bg-black/90 border border-white/10 px-2 py-0.5 rounded text-[8px] font-mono whitespace-nowrap shadow-lg z-10">
                  {dest.placeName.toUpperCase()} {dest.isWishlist ? '💜' : '📍'}
                </div>
              </button>
            );
          })}
        </div>

        {/* Travel Grid stats summary */}
        <div className="grid grid-cols-3 gap-2.5 mt-3">
          <div className="p-3 bg-white/[0.01] rounded-xl border border-white/[0.03] text-center">
            <span className="text-[8px] font-mono text-slate-500 uppercase">Visited</span>
            <p className="text-sm font-bold text-white mt-0.5">{destinations.filter(d => !d.isWishlist).length}</p>
          </div>
          <div className="p-3 bg-white/[0.01] rounded-xl border border-white/[0.03] text-center">
            <span className="text-[8px] font-mono text-slate-500 uppercase">Wishlists</span>
            <p className="text-sm font-bold text-white mt-0.5">{destinations.filter(d => d.isWishlist).length}</p>
          </div>
          <div className="p-3 bg-white/[0.01] rounded-xl border border-white/[0.03] text-center">
            <span className="text-[8px] font-mono text-slate-500 uppercase">Budget Log</span>
            <p className="text-sm font-bold text-cyan-400 mt-0.5">
              ₹{destinations.reduce((acc, curr) => acc + curr.expenses, 0).toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Diary Journal Entries */}
      <div className="lg:col-span-5 flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {selectedDest ? (
            <motion.div
              key={selectedDest.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-4"
            >
              {/* Card Title */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-cyan-400 flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1" /> {selectedDest.visitedDate}
                  </span>
                  {selectedDest.isWishlist && (
                    <span className="text-[8px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20 flex items-center">
                      <Heart className="w-2.5 h-2.5 mr-1" fill="purple" /> WISHLIST
                    </span>
                  )}
                </div>
                <h3 className="text-base font-bold text-white mt-1.5">{selectedDest.placeName}, {selectedDest.country}</h3>
              </div>

              {/* Photos Carousel Carousel */}
              <div className="h-44 rounded-xl overflow-hidden border border-white/[0.05] relative group bg-slate-900/60">
                <img 
                  src={selectedDest.gallery[0] || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop"} 
                  alt={selectedDest.placeName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2.5 right-2.5 bg-black/75 border border-white/10 px-2.5 py-1 rounded-lg text-[9px] font-mono flex items-center space-x-1 text-slate-400">
                  <ImageIcon className="w-3 h-3" />
                  <span>1 Photo</span>
                </div>
              </div>

              {/* Story Bio */}
              <div>
                <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1.5">Travel Memories</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed bg-white/[0.01] border border-white/[0.04] p-3 rounded-xl">
                  {selectedDest.story}
                </p>
              </div>

              {/* Local Expense Summary */}
              {!selectedDest.isWishlist && (
                <div className="flex justify-between items-center py-2.5 px-3 bg-white/[0.02] border border-white/[0.04] rounded-xl text-xs font-mono">
                  <span className="text-slate-500">Trip Expenses:</span>
                  <span className="text-slate-200 font-bold">₹{selectedDest.expenses.toLocaleString('en-IN')}</span>
                </div>
              )}
            </motion.div>
          ) : (
            <div className="text-center py-20 text-xs font-mono text-slate-500">
              Select a grid node marker on the projection map to inspect diary logs.
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
