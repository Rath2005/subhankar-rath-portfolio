"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Award, Compass, CompassIcon, GraduationCap, Briefcase, Calendar } from 'lucide-react';

interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'School' | 'College' | 'Projects' | 'Internship' | 'Achievements' | 'Future';
}

export const AboutWidget: React.FC = () => {
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin?module=timeline')
      .then((res) => res.json())
      .then((data) => {
        setTimeline(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = ['ALL', 'School', 'College', 'Internship', 'Projects', 'Achievements', 'Future'];

  const filteredTimeline = activeFilter === 'ALL'
    ? timeline
    : timeline.filter(t => t.category === activeFilter);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'School': return GraduationCap;
      case 'College': return GraduationCap;
      case 'Internship': return Briefcase;
      case 'Projects': return Compass;
      case 'Achievements': return Award;
      default: return Calendar;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-slate-300">
      {/* Left Columns: Biography & Details */}
      <div className="lg:col-span-5 space-y-6">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-semibold">MY JOURNEY</span>
          <h2 className="text-xl font-bold text-white mt-1">Biography & Story</h2>
          <p className="text-xs text-slate-400 mt-3 leading-relaxed">
            I'm Subhankar Rath, an Electronics & Communication Engineering undergrad. My coding journey started back in high school when I wrote my first lines of C++. What began as a curiosity quickly morphed into a passion for designing scalable software and physical IoT configurations.
          </p>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            I love bridging the divide between high-speed web apps (Next.js/React) and peripheral devices (ESP32 controllers, RF transceivers), pushing optimization to its absolute limits.
          </p>
        </div>

        {/* Mission & Vision Bento Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <h4 className="text-xs font-semibold text-slate-200">Our Mission</h4>
            <p className="text-[10px] text-slate-400 leading-relaxed mt-1">
              Building highly optimized interfaces that are beautiful, accessible, and performant.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <h4 className="text-xs font-semibold text-slate-200">Our Vision</h4>
            <p className="text-[10px] text-slate-400 leading-relaxed mt-1">
              Creating seamless cyber-physical experiences by marrying web systems with IoT telemetry.
            </p>
          </div>
        </div>

        {/* Reading Lists / Current exploration */}
        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-4">
          <div className="flex items-center space-x-2.5">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-semibold text-slate-200 font-mono tracking-wider">LITERARY ENGINE</h3>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Designing Data-Intensive Applications</span>
                <span className="text-cyan-400">65%</span>
              </div>
              <div className="w-full h-1 bg-white/10 rounded-full mt-1.5 overflow-hidden">
                <div className="h-full bg-cyan-400 rounded-full" style={{ width: '65%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Clean Code: Handbook of Agile Software Craftsmanship</span>
                <span className="text-purple-400">100%</span>
              </div>
              <div className="w-full h-1 bg-white/10 rounded-full mt-1.5 overflow-hidden">
                <div className="h-full bg-purple-400 rounded-full" style={{ width: '100%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Favorite Quotes */}
        <div className="p-4 border-l-2 border-cyan-400 bg-white/[0.01] rounded-r-xl">
          <p className="text-xs italic text-slate-300">
            "The best way to predict the future is to invent it."
          </p>
          <span className="block text-[10px] font-mono text-slate-500 mt-1.5">— Alan Kay</span>
        </div>
      </div>

      {/* Right Columns: Interactive Timeline */}
      <div className="lg:col-span-7 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h3 className="text-sm font-semibold text-slate-100 font-mono tracking-wider">JOURNEY TRACK</h3>
          
          {/* Timeline filter chips */}
          <div className="flex flex-wrap gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-2.5 py-1 text-[9px] font-mono tracking-wider rounded-md border transition-all ${activeFilter === cat ? 'bg-cyan-400 text-black border-cyan-400 font-semibold' : 'bg-white/[0.02] border-white/[0.05] text-slate-400 hover:text-white'}`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Event Feed */}
        <div className="flex-1 overflow-y-auto max-h-[50vh] pr-2 custom-scrollbar relative space-y-4">
          {loading ? (
            <div className="text-center py-12 text-slate-500 text-xs font-mono">
              Loading timeline track...
            </div>
          ) : filteredTimeline.length > 0 ? (
            <div className="relative border-l border-white/10 pl-6 ml-3 space-y-6 py-2">
              <AnimatePresence mode="popLayout">
                {filteredTimeline.map((item, index) => {
                  const Icon = getCategoryIcon(item.category);
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="relative"
                    >
                      {/* Timeline dot */}
                      <span className="absolute -left-[35px] top-1.5 w-[18px] h-[18px] rounded-full bg-slate-900 border border-white/20 flex items-center justify-center">
                        <Icon className="w-2.5 h-2.5 text-cyan-400" />
                      </span>

                      {/* Event Card */}
                      <div className="p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.04] transition-colors">
                        <div className="flex flex-wrap items-baseline justify-between gap-1">
                          <span className="text-[10px] font-mono text-cyan-400 font-semibold tracking-wider">
                            {item.year}
                          </span>
                          <span className="text-[9px] font-mono text-slate-500 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                            {item.category.toUpperCase()}
                          </span>
                        </div>
                        <h4 className="text-xs font-semibold text-slate-200 mt-1">{item.title}</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">{item.subtitle}</p>
                        <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">{item.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 text-xs font-mono">
              No milestones found in this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
