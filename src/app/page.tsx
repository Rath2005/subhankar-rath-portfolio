"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useOS } from '@/components/os/OSProvider';
import { HeroWidget } from '@/components/widgets/HeroWidget';
import { AboutWidget } from '@/components/widgets/AboutWidget';
import { SkillWidget } from '@/components/widgets/SkillWidget';
import { ProjectWidget } from '@/components/widgets/ProjectWidget';
import { TravelWidget } from '@/components/widgets/TravelWidget';
import { AnimeWidget } from '@/components/widgets/AnimeWidget';
import { FinanceWidget } from '@/components/widgets/FinanceWidget';
import { LifeWidget } from '@/components/widgets/LifeWidget';
import { CertificatesWidget } from '@/components/widgets/CertificatesWidget';
import { BlogWidget } from '@/components/widgets/BlogWidget';
import { SettingsWidget } from '@/components/widgets/SettingsWidget';
import { ContactWidget } from '@/components/widgets/ContactWidget';
import { Window } from '@/components/os/Window';
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
  Mail,
  Award,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export default function HomePage() {
  const { openWindow, accentColor } = useOS();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Track mouse coordinates for interactive background mouse glow
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="w-full relative min-h-screen pt-4">
      {/* Interactive mouse tracking glow card mask */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500 opacity-20"
        style={{
          background: `radial-gradient(400px at ${mousePos.x}px ${mousePos.y}px, ${accentColor}18, transparent 80%)`
        }}
      />

      {/* Main Bento Grid layout */}
      <div className="bento-grid z-10 relative">
        {/* 1. Hero Widget (6 cols) */}
        <motion.div
          whileHover={{ y: -4 }}
          className="col-span-12 lg:col-span-6 bg-black/45 backdrop-blur-md rounded-2xl border border-white/[0.04] overflow-hidden hover:border-white/10 transition-colors shadow-xl"
        >
          <HeroWidget />
        </motion.div>

        {/* 2. Life Stats Widget Quick Preview (6 cols) */}
        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => openWindow('life')}
          className="col-span-12 lg:col-span-6 bg-black/45 backdrop-blur-md rounded-2xl border border-white/[0.04] hover:border-white/10 transition-colors cursor-pointer p-5 flex flex-col justify-between shadow-xl"
        >
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">LIFE ENGINE METRICS</span>
              <h3 className="text-sm font-bold text-white mt-0.5">Life OS Dashboard</h3>
            </div>
            <LayoutDashboard className="w-4 h-4 text-slate-500" />
          </div>
          <div className="my-4 text-slate-400 text-[11px] leading-relaxed">
            Streaks, habits, water intake, sleep patterns, active playing Spotify track, and LeetCode solver logs. Currently based in Bhubaneswar, focused on Next.js/Deep Learning.
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono border-t border-white/[0.04] pt-3.5">
            <span className="text-cyan-400">⚡ LEETCODE: 45 DAY STREAK</span>
            <span className="flex items-center text-slate-400 hover:text-white">Open Dashboard <ArrowRight className="w-3.5 h-3.5 ml-1" /></span>
          </div>
        </motion.div>

        {/* 3. Tech Stack Quick Preview (3 cols) */}
        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => openWindow('skills')}
          className="col-span-12 sm:col-span-6 lg:col-span-3 bg-black/45 backdrop-blur-md rounded-2xl border border-white/[0.04] hover:border-white/10 transition-colors cursor-pointer p-5 flex flex-col justify-between shadow-xl"
        >
          <div className="flex justify-between items-center mb-2.5">
            <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">ABILITIES</span>
            <Cpu className="w-4 h-4 text-slate-500" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-200">Tech Stack Tree</h4>
            <div className="flex flex-wrap gap-1 mt-2.5">
              {['React', 'NextJS', 'TypeScript', 'NodeJS', 'MongoDB'].map(tech => (
                <span key={tech} className="text-[8px] font-mono text-slate-500 bg-white/[0.02] px-1 py-0.5 rounded border border-white/5">{tech}</span>
              ))}
            </div>
          </div>
          <span className="text-[9px] font-mono text-cyan-400 mt-4 block">Interactive Skills Tree →</span>
        </motion.div>

        {/* 4. Projects Quick Preview (3 cols) */}
        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => openWindow('projects')}
          className="col-span-12 sm:col-span-6 lg:col-span-3 bg-black/45 backdrop-blur-md rounded-2xl border border-white/[0.04] hover:border-white/10 transition-colors cursor-pointer p-5 flex flex-col justify-between shadow-xl"
        >
          <div className="flex justify-between items-center mb-2.5">
            <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">MODULES</span>
            <FolderKanban className="w-4 h-4 text-slate-500" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-200">Projects Registry</h4>
            <p className="text-[10px] text-slate-400 leading-relaxed mt-2.5 line-clamp-2">
              AI Interview Platform, Logistics Routing Systems, esp32 tactical IoT networks, clones.
            </p>
          </div>
          <span className="text-[9px] font-mono text-cyan-400 mt-3 block">Inspect Architecture →</span>
        </motion.div>

        {/* 5. Travel Diary Quick Preview (3 cols) */}
        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => openWindow('travel')}
          className="col-span-12 sm:col-span-6 lg:col-span-3 bg-black/45 backdrop-blur-md rounded-2xl border border-white/[0.04] hover:border-white/10 transition-colors cursor-pointer p-5 flex flex-col justify-between shadow-xl"
        >
          <div className="flex justify-between items-center mb-2.5">
            <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">JOURNEY</span>
            <Globe className="w-4 h-4 text-slate-500" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-200">Travel Diary</h4>
            <p className="text-[10px] text-slate-400 leading-relaxed mt-2.5 line-clamp-2">
              Manali snow, Goa coastline, Kyoto target wishlists. Fully logged telemetry coordinates.
            </p>
          </div>
          <span className="text-[9px] font-mono text-cyan-400 mt-3 block">View Vector Map →</span>
        </motion.div>

        {/* 6. Anime Universe Quick Preview (3 cols) */}
        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => openWindow('anime')}
          className="col-span-12 sm:col-span-6 lg:col-span-3 bg-black/45 backdrop-blur-md rounded-2xl border border-white/[0.04] hover:border-white/10 transition-colors cursor-pointer p-5 flex flex-col justify-between shadow-xl"
        >
          <div className="flex justify-between items-center mb-2.5">
            <span className="text-[8px] font-mono text-[#ff4b72] uppercase tracking-widest">私のアニメ</span>
            <Sparkles className="w-4 h-4 text-[#ff4b72]" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-200">Anime Universe</h4>
            <p className="text-[10px] text-slate-400 leading-relaxed mt-2.5 line-clamp-2">
              Solo Leveling level-ups, Shibuya incident Shibuya arc reviews, Naruto quotes.
            </p>
          </div>
          <span className="text-[9px] font-mono text-[#ff4b72] mt-3 block">Open Anime Hub →</span>
        </motion.div>

        {/* 7. Finance Center Quick Preview (3 cols) */}
        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => openWindow('finance')}
          className="col-span-12 sm:col-span-6 lg:col-span-3 bg-black/45 backdrop-blur-md rounded-2xl border border-white/[0.04] hover:border-white/10 transition-colors cursor-pointer p-5 flex flex-col justify-between shadow-xl"
        >
          <div className="flex justify-between items-center mb-2.5">
            <span className="text-[8px] font-mono text-emerald-400 uppercase tracking-widest">LEDGER</span>
            <LineChart className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-200">Finance Hub</h4>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-lg font-bold text-white font-mono">₹22K</span>
              <span className="text-[8px] font-mono text-emerald-400 bg-emerald-500/10 px-1 py-0.5 rounded border border-emerald-500/20 flex items-center">
                <TrendingUp className="w-2.5 h-2.5 mr-0.5" /> June Earning
              </span>
            </div>
          </div>
          <span className="text-[9px] font-mono text-cyan-400 mt-4 block">Reconciliation Charts →</span>
        </motion.div>

        {/* 8. Certificates Quick Preview (3 cols) */}
        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => openWindow('certificates')}
          className="col-span-12 sm:col-span-6 lg:col-span-3 bg-black/45 backdrop-blur-md rounded-2xl border border-white/[0.04] hover:border-white/10 transition-colors cursor-pointer p-5 flex flex-col justify-between shadow-xl"
        >
          <div className="flex justify-between items-center mb-2.5">
            <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">CREDENTIALS</span>
            <Award className="w-4 h-4 text-slate-500" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-200">Certificates Gallery</h4>
            <p className="text-[10px] text-slate-400 leading-relaxed mt-2.5 line-clamp-2">
              AWS Certified Cloud Practitioner, Deep Learning, Advanced Next.js verifications.
            </p>
          </div>
          <span className="text-[9px] font-mono text-cyan-400 mt-3 block">View Certs Gallery →</span>
        </motion.div>

        {/* 9. Recent Blogs Quick Preview (3 cols) */}
        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => openWindow('blog')}
          className="col-span-12 sm:col-span-6 lg:col-span-3 bg-black/45 backdrop-blur-md rounded-2xl border border-white/[0.04] hover:border-white/10 transition-colors cursor-pointer p-5 flex flex-col justify-between shadow-xl"
        >
          <div className="flex justify-between items-center mb-2.5">
            <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">WRITING</span>
            <BookOpen className="w-4 h-4 text-slate-500" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-200 truncate">Framer Motion in NextJS</h4>
            <p className="text-[9px] text-slate-500 mt-1">Published June 25 • 5 min read</p>
          </div>
          <span className="text-[9px] font-mono text-cyan-400 mt-3 block">Read Articles Catalog →</span>
        </motion.div>

        {/* 10. Contact Widget Quick Preview (3 cols) */}
        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => openWindow('contact')}
          className="col-span-12 sm:col-span-6 lg:col-span-3 bg-black/45 backdrop-blur-md rounded-2xl border border-white/[0.04] hover:border-white/10 transition-colors cursor-pointer p-5 flex flex-col justify-between shadow-xl"
        >
          <div className="flex justify-between items-center mb-2.5">
            <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">DISPATCH</span>
            <Mail className="w-4 h-4 text-slate-500" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-200">Contact Terminal</h4>
            <p className="text-[10px] text-slate-400 leading-relaxed mt-2.5 line-clamp-2">
              Google Calendar bookings, availability statuses, secure telemetry feedback form.
            </p>
          </div>
          <span className="text-[9px] font-mono text-cyan-400 mt-3 block">Transmit Message →</span>
        </motion.div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* OS DRAGGABLE WINDOWS INSTANCES */}
      {/* ---------------------------------------------------- */}
      
      <Window id="about" title="About & Story" defaultWidth="max-w-4xl" defaultHeight="h-[75vh]">
        <AboutWidget />
      </Window>

      <Window id="skills" title="Tech Stack tree" defaultWidth="max-w-3xl" defaultHeight="h-[70vh]">
        <SkillWidget />
      </Window>

      <Window id="projects" title="Projects Registry" defaultWidth="max-w-4xl" defaultHeight="h-[80vh]">
        <ProjectWidget />
      </Window>

      <Window id="travel" title="Travel Diary" defaultWidth="max-w-4xl" defaultHeight="h-[80vh]">
        <TravelWidget />
      </Window>

      <Window id="anime" title="Anime Universe" defaultWidth="max-w-4xl" defaultHeight="h-[80vh]">
        <AnimeWidget />
      </Window>

      <Window id="finance" title="Finance Hub" defaultWidth="max-w-4xl" defaultHeight="h-[75vh]">
        <FinanceWidget />
      </Window>

      <Window id="life" title="Life OS Dashboard" defaultWidth="max-w-4xl" defaultHeight="h-[75vh]">
        <LifeWidget />
      </Window>

      <Window id="certificates" title="Certificates Gallery" defaultWidth="max-w-4xl" defaultHeight="h-[75vh]">
        <CertificatesWidget />
      </Window>

      <Window id="blog" title="Blogs Catalog" defaultWidth="max-w-3xl" defaultHeight="h-[80vh]">
        <BlogWidget />
      </Window>

      <Window id="settings" title="System Preferences" defaultWidth="max-w-2xl" defaultHeight="h-[60vh]">
        <SettingsWidget />
      </Window>

      <Window id="contact" title="Contact Terminal" defaultWidth="max-w-3xl" defaultHeight="h-[75vh]">
        <ContactWidget />
      </Window>
    </div>
  );
}
