"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowLeft, Layers, Shield, Sparkles, CheckCircle2 } from 'lucide-react';
import { useOS } from '../os/OSProvider';

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface Project {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  techStack: string[];
  features: string[];
  challenges: string;
  learnings: string;
  githubLink: string;
  liveDemo: string;
  status: 'In Progress' | 'Completed' | 'Maintained';
  timeline: string;
  architectureDiagram?: string;
  futureImprovements?: string[];
  screenshots?: string[];
}

export const ProjectWidget: React.FC = () => {
  const { accentColor } = useOS();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin?module=projects')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="relative h-full min-h-[50vh] text-slate-300">
      <AnimatePresence mode="wait">
        {!selectedProject ? (
          /* PROJECTS GRID VIEW */
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div>
              <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase font-semibold">PORTFOLIO REGISTRY</span>
              <h2 className="text-xl font-bold text-white mt-0.5">Projects Registry</h2>
            </div>

            {loading ? (
              <div className="text-center py-20 text-xs font-mono text-slate-500">
                Syncing project instances...
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((proj, idx) => (
                  <motion.div
                    key={proj.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    onClick={() => setSelectedProject(proj)}
                    className="group rounded-xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
                  >
                    {/* Cover image area */}
                    <div className="h-40 overflow-hidden border-b border-white/[0.04] relative">
                      <img
                        src={proj.coverImage}
                        alt={proj.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                      />
                      {/* Status chip */}
                      <span className={`absolute top-3 right-3 text-[9px] font-mono tracking-wider px-2 py-0.5 rounded-full border ${proj.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                        {proj.status.toUpperCase()}
                      </span>
                    </div>

                    {/* Content area */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xs font-semibold text-slate-100 group-hover:text-white mt-1">{proj.name}</h3>
                        <p className="text-[10px] text-slate-400 leading-relaxed mt-2 line-clamp-2">{proj.description}</p>
                      </div>

                      {/* Tech stack badges */}
                      <div className="flex flex-wrap gap-1 mt-4">
                        {proj.techStack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="text-[8px] font-mono text-slate-500 bg-white/[0.02] px-1.5 py-0.5 rounded border border-white/5"
                          >
                            {tech}
                          </span>
                        ))}
                        {proj.techStack.length > 4 && (
                          <span className="text-[8px] font-mono text-slate-500 bg-white/[0.02] px-1.5 py-0.5 rounded">
                            +{proj.techStack.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          /* DETAILED SINGLE PROJECT SCREEN */
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Back button header */}
            <button
              onClick={() => setSelectedProject(null)}
              className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to registry</span>
            </button>

            {/* Title banner */}
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div>
                <div className="flex items-center space-x-2.5">
                  <span className="text-[10px] font-mono text-cyan-400">{selectedProject.timeline}</span>
                  <span>•</span>
                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded border ${selectedProject.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                    {selectedProject.status.toUpperCase()}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white mt-1">{selectedProject.name}</h2>
              </div>

              {/* Action Web Links */}
              <div className="flex items-center space-x-2">
                <a
                  href={selectedProject.githubLink}
                  target="_blank"
                  rel="noreferrer"
                  className="h-8 w-8 rounded-lg flex items-center justify-center bg-white/[0.02] hover:bg-white/[0.08] border border-white/[0.05] text-slate-400 hover:text-white"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={selectedProject.liveDemo}
                  target="_blank"
                  rel="noreferrer"
                  className="h-8 px-3.5 rounded-lg text-black hover:scale-105 active:scale-95 transition-all text-xs font-mono font-medium flex items-center space-x-1.5"
                  style={{ backgroundColor: accentColor }}
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Split layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-2 flex items-center">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 mr-2" /> Summary
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed bg-white/[0.01] border border-white/[0.04] p-4 rounded-xl">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Features */}
                <div>
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-2 flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mr-2" /> Key Features
                  </h4>
                  <ul className="space-y-2 bg-white/[0.01] border border-white/[0.04] p-4 rounded-xl list-none">
                    {selectedProject.features.map((feat, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start">
                        <span className="text-cyan-400 mr-2.5 font-bold">•</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Architecture */}
                {selectedProject.architectureDiagram && (
                  <div>
                    <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-2 flex items-center">
                      <Layers className="w-3.5 h-3.5 text-cyan-400 mr-2" /> Architecture Flow
                    </h4>
                    <p className="text-[10px] font-mono text-slate-400 leading-relaxed bg-black/40 border border-white/[0.05] p-3.5 rounded-xl">
                      {selectedProject.architectureDiagram}
                    </p>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="lg:col-span-5 space-y-6">
                {/* Tech Stack */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <h4 className="text-xs font-mono text-slate-300 uppercase tracking-wider mb-3">Tech Infrastructure</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[9px] font-mono text-slate-300 bg-white/5 px-2.5 py-1 rounded border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Challenges */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <h4 className="text-xs font-mono text-slate-300 uppercase tracking-wider mb-2 flex items-center">
                    <Shield className="w-3.5 h-3.5 text-cyan-400 mr-2" /> Integration Challenges
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {selectedProject.challenges}
                  </p>
                </div>

                {/* Learnings */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <h4 className="text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">My Engineering Learnings</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {selectedProject.learnings}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
