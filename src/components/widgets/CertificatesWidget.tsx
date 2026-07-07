"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, ExternalLink, AlertCircle, Calendar, Briefcase, Sparkles } from 'lucide-react';
import { useOS } from '../os/OSProvider';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  category: string;
  skills: string[];
  description: string;
  pdfUrl: string;
}

export const CertificatesWidget: React.FC = () => {
  const { accentColor } = useOS();
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [loading, setLoading] = useState(true);
  
  // Track client-side existence status of PDF paths
  // true = exists, false = missing
  const [pdfStatus, setPdfStatus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch('/api/admin?module=certificates')
      .then((res) => res.json())
      .then((data) => {
        const certificatesList = Array.isArray(data) ? data : [];
        setCerts(certificatesList);
        setLoading(false);

        // Perform HEAD request verify check on each PDF URL path
        certificatesList.forEach((cert) => {
          if (!cert.pdfUrl) {
            setPdfStatus((prev) => ({ ...prev, [cert.id]: false }));
            return;
          }
          fetch(cert.pdfUrl, { method: 'HEAD' })
            .then((res) => {
              setPdfStatus((prev) => ({ ...prev, [cert.id]: res.ok }));
            })
            .catch(() => {
              setPdfStatus((prev) => ({ ...prev, [cert.id]: false }));
            });
        });
      })
      .catch(() => setLoading(false));
  }, []);

  // Compute unique filters dynamically
  const categories = ['ALL', ...Array.from(new Set(certs.map((c) => c.category || 'Other')))];

  const filteredCerts = activeFilter === 'ALL'
    ? certs
    : certs.filter((c) => c.category === activeFilter);

  return (
    <div className="space-y-4 text-slate-300">
      {/* Header title & category tabs */}
      <div className="flex flex-wrap justify-between items-baseline gap-2 border-b border-white/[0.04] pb-3">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-semibold flex items-center">
            <Sparkles className="w-3.5 h-3.5 mr-1" /> VERIFIED CREDENTIALS
          </span>
          <h2 className="text-xl font-bold text-white mt-0.5">Certifications</h2>
        </div>

        {/* Category filter tabs */}
        <div className="flex flex-wrap gap-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-2 py-0.5 text-[9px] font-mono tracking-wider rounded-md border transition-all ${
                activeFilter === cat
                  ? 'bg-cyan-400 text-black border-cyan-400 font-semibold'
                  : 'bg-white/[0.02] border-white/[0.05] text-slate-400 hover:text-white'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-xs font-mono text-slate-500">
          Syncing certificates directory...
        </div>
      ) : filteredCerts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert, index) => {
              const fileExists = pdfStatus[cert.id] !== false;

              return (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -15 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="group rounded-xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10 flex flex-col justify-between overflow-hidden relative"
                >
                  {/* Premium Animated PDF Icon Header */}
                  <div className="h-28 bg-slate-950/40 relative flex items-center justify-center border-b border-white/[0.04] overflow-hidden">
                    <motion.div
                      animate={{ 
                        y: [0, -4, 0],
                        rotate: [0, 1.5, -1.5, 0]
                      }}
                      transition={{ 
                        duration: 5, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                      className="relative z-10 flex flex-col items-center justify-center p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] shadow-xl backdrop-blur-sm group-hover:border-cyan-500/30 group-hover:bg-cyan-500/5 transition-all duration-300"
                    >
                      <FileText className="w-8 h-8 text-rose-500 mb-0.5 group-hover:scale-105 transition-transform duration-300" />
                      <span className="text-[8px] font-mono tracking-widest text-slate-500 font-bold group-hover:text-rose-400 transition-colors">PDF</span>
                    </motion.div>
                    
                    {/* Glow and reflection accents */}
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/[0.01]" />
                    <div className="absolute -bottom-6 w-20 h-20 rounded-full bg-cyan-500/5 blur-xl group-hover:bg-cyan-500/10 transition-colors" />
                  </div>

                  {/* Card content details */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3.5">
                    <div className="space-y-2">
                      {/* Category Badge & Date */}
                      <div className="flex justify-between items-center text-[9px] font-mono">
                        <span className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.05] text-cyan-400 uppercase tracking-wider font-semibold">
                          {cert.category}
                        </span>
                        <span className="text-slate-500 flex items-center">
                          <Calendar className="w-3.5 h-3.5 mr-1" /> {cert.issueDate}
                        </span>
                      </div>

                      {/* Title & Issuer */}
                      <div>
                        <h3 className="text-xs font-bold text-slate-100 leading-snug group-hover:text-white transition-colors">
                          {cert.title}
                        </h3>
                        <p className="text-[10px] text-slate-400 mt-1 flex items-center font-medium">
                          <Briefcase className="w-3.5 h-3.5 text-slate-500 mr-1.5" /> {cert.issuer}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-[10px] text-slate-400 leading-relaxed font-sans italic">
                        {cert.description}
                      </p>

                      {/* Skills Badges list */}
                      {cert.skills && cert.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {cert.skills.map((skill) => (
                            <span 
                              key={skill}
                              className="text-[8px] font-mono text-slate-500 bg-white/[0.02] px-1.5 py-0.5 rounded border border-white/5 hover:border-slate-700 transition-colors"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Actions and Error alerts */}
                    <div className="pt-3.5 border-t border-white/[0.04] space-y-2">
                      {!fileExists && (
                        <div className="flex items-center space-x-1.5 text-rose-400 text-[9px] font-mono bg-rose-500/5 p-2 rounded-lg border border-rose-500/20">
                          <AlertCircle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                          <span>Certificate PDF not found</span>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-2">
                        {fileExists ? (
                          <a
                            href={cert.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-7 rounded-lg bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] text-slate-300 hover:text-white flex items-center justify-center space-x-1 font-mono text-[9px] transition-all"
                          >
                            <span>VIEW</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <button
                            disabled
                            className="h-7 rounded-lg bg-white/[0.01] border border-white/5 text-slate-600 flex items-center justify-center space-x-1 font-mono text-[9px] cursor-not-allowed"
                          >
                            <span>VIEW</span>
                            <ExternalLink className="w-3 h-3 opacity-30" />
                          </button>
                        )}

                        {fileExists ? (
                          <a
                            href={cert.pdfUrl}
                            download
                            className="h-7 rounded-lg text-black font-semibold flex items-center justify-center space-x-1 font-mono text-[9px] hover:scale-102 active:scale-98 transition-all"
                            style={{ backgroundColor: accentColor }}
                          >
                            <span>DOWNLOAD</span>
                            <Download className="w-3 h-3" />
                          </a>
                        ) : (
                          <button
                            disabled
                            className="h-7 rounded-lg bg-white/[0.01] border border-white/5 text-slate-600 flex items-center justify-center space-x-1 font-mono text-[9px] cursor-not-allowed"
                          >
                            <span>DOWNLOAD</span>
                            <Download className="w-3 h-3 opacity-30" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-white/10 rounded-xl text-slate-500 font-mono text-xs">
          No certificates match this category selection.
        </div>
      )}
    </div>
  );
};
