"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Star, Sparkles, BookOpen, Quote, Tv, ArrowLeft } from 'lucide-react';
import { useOS } from '../os/OSProvider';

interface Anime {
  id: string;
  title: string;
  poster: string;
  rating: number; // 1-10
  favoriteCharacter: string;
  bestArc: string;
  favoriteQuote: string;
  whyILoveIt: string;
  watchStatus: 'Watching' | 'Completed' | 'Plan to Watch';
  totalEpisodes: number;
  episodesWatched: number;
  trailerUrl?: string;
  themeSong?: string;
  myReview: string;
}

export const AnimeWidget: React.FC = () => {
  const { accentColor } = useOS();
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin?module=anime')
      .then((res) => res.json())
      .then((data) => {
        setAnimes(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="relative text-slate-300 min-h-[50vh] overflow-hidden">
      {/* Floating Sakura Petals Animation Layers (Pure CSS animated divs) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-pink-400/20 rounded-full animate-sakura"
            style={{
              width: `${Math.random() * 8 + 6}px`,
              height: `${Math.random() * 6 + 4}px`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 6 + 7}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {!selectedAnime ? (
            /* ANIME DIRECTORY GRID VIEW */
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-5"
            >
              {/* Header Title */}
              <div className="flex flex-wrap justify-between items-baseline gap-2">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#ff4b72] uppercase font-semibold">私の宇宙</span>
                  <h2 className="text-xl font-bold text-white mt-0.5">My Anime Universe</h2>
                </div>
                <span className="text-[9px] font-mono text-slate-400 bg-white/5 border border-white/5 px-2.5 py-1 rounded">
                  KANBAN INDEX: {animes.length} WATCHED
                </span>
              </div>

              {/* Progress Tracker Summary */}
              <div className="p-4 rounded-xl bg-[#ff4b72]/5 border border-[#ff4b72]/15 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Tv className="w-5 h-5 text-[#ff4b72]" />
                  <div>
                    <h4 className="text-xs font-semibold text-slate-200">Solo Leveling & Shibuya Incidents</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Continuous tracking of winter & spring seasonals</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-[#ff4b72]">100% COMPLETE</span>
                  <div className="w-24 h-1.5 bg-black/40 rounded-full overflow-hidden mt-1.5">
                    <div className="h-full bg-[#ff4b72] rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
              </div>

              {/* Grid cards */}
              {loading ? (
                <div className="text-center py-20 text-xs font-mono text-slate-500">
                  Gathering anime files...
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {animes.map((anime, idx) => (
                    <motion.div
                      key={anime.id}
                      initial={{ opacity: 0, scale: 0.95, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => setSelectedAnime(anime)}
                      className="group rounded-xl overflow-hidden border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] hover:border-[#ff4b72]/30 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                    >
                      {/* Thumbnail poster */}
                      <div className="h-44 overflow-hidden relative">
                        <img 
                          src={anime.poster} 
                          alt={anime.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                        />
                        {/* Rating overlay badge */}
                        <div className="absolute bottom-2 left-2 flex items-center space-x-1 bg-black/75 border border-white/10 px-1.5 py-0.5 rounded-lg text-[9px] font-mono text-slate-200">
                          <Star className="w-2.5 h-2.5 text-amber-400" fill="currentColor" />
                          <span>{anime.rating}</span>
                        </div>
                      </div>

                      {/* Info Area */}
                      <div className="p-3">
                        <h4 className="text-xs font-semibold text-slate-200 group-hover:text-white truncate">{anime.title}</h4>
                        <div className="flex justify-between items-center mt-2.5 text-[8.5px] font-mono text-slate-500">
                          <span>EP {anime.episodesWatched}/{anime.totalEpisodes}</span>
                          <span className="text-cyan-400 uppercase tracking-widest">{anime.watchStatus}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            /* ANIME DETAILS SHEET VIEW */
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              {/* Header navigations */}
              <button
                onClick={() => setSelectedAnime(null)}
                className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to list</span>
              </button>

              {/* Title Header Banner */}
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div>
                  <div className="flex items-center space-x-2 text-[10px] font-mono text-[#ff4b72]">
                    <Star className="w-3.5 h-3.5 text-amber-400" fill="currentColor" />
                    <span className="font-bold">{selectedAnime.rating} / 10</span>
                    <span>•</span>
                    <span className="text-slate-400">EP {selectedAnime.episodesWatched} of {selectedAnime.totalEpisodes}</span>
                  </div>
                  <h2 className="text-xl font-bold text-white mt-1">{selectedAnime.title}</h2>
                </div>
                {selectedAnime.trailerUrl && (
                  <a
                    href={selectedAnime.trailerUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="h-8 px-3.5 rounded-lg text-black hover:scale-105 active:scale-95 transition-all text-xs font-mono font-medium flex items-center space-x-1.5 bg-[#ff4b72]"
                  >
                    <Play className="w-3.5 h-3.5 text-black" fill="black" />
                    <span>Watch Trailer</span>
                  </a>
                )}
              </div>

              {/* Grid content columns */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Poster & Character info */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="h-64 rounded-xl overflow-hidden border border-white/[0.06] relative">
                    <img 
                      src={selectedAnime.poster} 
                      alt={selectedAnime.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Character card */}
                  <div className="p-3.5 rounded-xl bg-white/[0.01] border border-white/[0.04] text-xs font-mono">
                    <span className="text-[9px] text-slate-500 uppercase tracking-widest">Fav Character</span>
                    <p className="font-semibold text-slate-200 mt-1 flex items-center">
                      <Sparkles className="w-3 h-3 text-[#ff4b72] mr-1.5" /> {selectedAnime.favoriteCharacter}
                    </p>
                  </div>
                </div>

                {/* Right Reviews & Arc info */}
                <div className="lg:col-span-8 space-y-5">
                  {/* Quote block */}
                  <div className="p-4 bg-black/40 border-l-2 border-[#ff4b72] rounded-r-xl flex items-start space-x-3">
                    <Quote className="w-4 h-4 text-[#ff4b72] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs italic text-slate-300">"{selectedAnime.favoriteQuote}"</p>
                      <span className="block text-[9px] font-mono text-slate-500 mt-1.5">— {selectedAnime.favoriteCharacter}</span>
                    </div>
                  </div>

                  {/* Why I love it */}
                  <div>
                    <h4 className="text-[10px] font-mono text-[#ff4b72] uppercase tracking-widest mb-1.5 flex items-center">
                      <BookOpen className="w-3.5 h-3.5 mr-1.5" /> Best Arc: {selectedAnime.bestArc}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed bg-white/[0.01] border border-white/[0.04] p-4 rounded-xl">
                      {selectedAnime.whyILoveIt}
                    </p>
                  </div>

                  {/* Personal Review */}
                  <div>
                    <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1.5">My Review Summary</h4>
                    <p className="text-xs text-slate-500 leading-relaxed bg-white/[0.01] border border-white/[0.04] p-4 rounded-xl">
                      {selectedAnime.myReview}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
