"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Terminal, Database, Cloud, BrainCircuit, Wrench, Languages } from 'lucide-react';
import { useOS } from '../os/OSProvider';

interface Skill {
  category: 'Frontend' | 'Backend' | 'Database' | 'Cloud' | 'AI' | 'Tools' | 'Languages';
  name: string;
  level: number;
  iconName: string;
}

export const SkillWidget: React.FC = () => {
  const { accentColor } = useOS();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('Frontend');
  const [loading, setLoading] = useState(true);

  const categories = [
    { name: 'Frontend', icon: Cpu },
    { name: 'Backend', icon: Terminal },
    { name: 'Database', icon: Database },
    { name: 'Cloud', icon: Cloud },
    { name: 'AI', icon: BrainCircuit },
    { name: 'Tools', icon: Wrench },
    { name: 'Languages', icon: Languages }
  ];

  useEffect(() => {
    fetch('/api/admin?module=skills')
      .then((res) => res.json())
      .then((data) => {
        setSkills(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredSkills = skills.filter(s => s.category === activeCategory);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-slate-300">
      {/* Left Column: Categories Menu */}
      <div className="md:col-span-4 flex md:flex-col overflow-x-auto md:overflow-x-visible gap-2 pb-3 md:pb-0 scroll-none border-b md:border-b-0 md:border-r border-white/[0.05] md:pr-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl border text-xs font-mono tracking-wider transition-all whitespace-nowrap md:w-full select-none ${isActive ? 'bg-white/[0.04] text-white border-white/10' : 'bg-transparent text-slate-400 border-transparent hover:text-slate-200'}`}
            >
              <Icon 
                className="w-4 h-4" 
                style={{ color: isActive ? accentColor : '#94a3b8' }} 
              />
              <span>{cat.name.toUpperCase()}</span>
            </button>
          );
        })}
      </div>

      {/* Right Column: Skills Cards Grid */}
      <div className="md:col-span-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase font-semibold">SKILL PROFILE</span>
            <h3 className="text-sm font-bold text-white mt-0.5">{activeCategory} Competence</h3>
          </div>
          <span className="text-[9px] font-mono text-slate-400 bg-white/5 border border-white/5 px-2 py-0.5 rounded">
            {filteredSkills.length} Techs
          </span>
        </div>

        {loading ? (
          <div className="text-center py-16 text-xs font-mono text-slate-500">
            Loading skills profiles...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2, delay: index * 0.04 }}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/10 transition-colors flex flex-col justify-between"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-slate-200 font-sans">{skill.name}</span>
                    <span className="text-[10px] font-mono font-bold" style={{ color: accentColor }}>
                      {skill.level}%
                    </span>
                  </div>

                  {/* Sleek level indicator bar */}
                  <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden relative">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.05 }}
                      className="h-full rounded-full"
                      style={{ 
                        backgroundColor: accentColor,
                        boxShadow: `0 0 8px ${accentColor}80`
                      }}
                    />
                  </div>

                  {/* Level details text */}
                  <div className="flex justify-between items-center mt-2.5 text-[8px] font-mono text-slate-500 uppercase tracking-widest">
                    <span>Baseline</span>
                    <span>Expert</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};
