"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, FileDown, ArrowRight } from 'lucide-react';
import { useOS } from '../os/OSProvider';

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const HeroWidget: React.FC = () => {
  const { openWindow, accentColor } = useOS();
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const subtitles = [
    "Full Stack Developer",
    "AI Enthusiast",
    "ECE Engineering Student",
    "Problem Solver",
    "Creative Thinker"
  ];

  // Typing effect loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullText = subtitles[subtitleIndex];
    const typingSpeed = isDeleting ? 30 : 75;

    if (!isDeleting && currentText === fullText) {
      // Pause at full text
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setSubtitleIndex((prev) => (prev + 1) % subtitles.length);
    } else {
      timer = setTimeout(() => {
        setCurrentText((prev) => 
          isDeleting 
            ? prev.substring(0, prev.length - 1) 
            : fullText.substring(0, prev.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, subtitleIndex]);

  const socials = [
    { icon: Github, link: 'https://github.com/', color: '#f8fafc' },
    { icon: Linkedin, link: 'https://www.linkedin.com/in/subhankar-rath-2a60b340a/', color: '#0077b5' },
    { icon: Instagram, link: 'https://www.instagram.com/', color: '#e1306c' },
    { icon: Mail, link: 'mailto:subhankarrath.ece@gmail.com', color: '#ea4335' }
  ];

  return (
    <div className="h-full flex flex-col justify-between p-6">
      {/* Upper profile info */}
      <div className="flex items-start space-x-5">
        <div className="relative">
          <div 
            className="w-16 h-16 rounded-2xl overflow-hidden border border-white/10 shadow-lg relative z-10"
          >
            <img 
              src="/avatar.jpg" 
              alt="Subhankar Rath"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div 
            className="absolute inset-0 rounded-2xl filter blur-md opacity-45 -z-0"
            style={{ backgroundColor: accentColor }}
          />
        </div>

        <div className="flex-1">
          <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">AVAILABLE FOR HIRE</span>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-1">SUBHANKAR RATH</h1>
          
          {/* Typing subtitle */}
          <div className="h-5 flex items-center mt-1 text-slate-400 font-mono text-xs">
            <span>{currentText}</span>
            <span 
              className="w-1.5 h-3.5 ml-1 animate-pulse" 
              style={{ backgroundColor: accentColor }}
            />
          </div>
        </div>
      </div>

      {/* Middle Bio Section */}
      <p className="text-xs text-slate-400 leading-relaxed my-4">
        Electronics & Communication Engineer building premium web applications, IoT setups, and ML pipelines. Obsessed with high fidelity interfaces and clean software architectures.
      </p>

      {/* Bottom Button Layout */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.04] pt-4">
        {/* Social Links */}
        <div className="flex items-center space-x-3">
          {socials.map((soc, idx) => {
            const Icon = soc.icon;
            return (
              <a
                key={idx}
                href={soc.link}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.02] border border-white/[0.05] text-slate-400 hover:text-white transition-colors"
                style={{ '--hover-color': soc.color } as React.CSSProperties}
              >
                <Icon className="w-4 h-4 hover:scale-110 transition-transform" />
              </a>
            );
          })}
        </div>

        {/* Action button triggers details */}
        <div className="flex items-center space-x-2">
          <a
            href="/resume.png"
            target="_blank"
            rel="noreferrer"
            className="h-8 px-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] flex items-center space-x-1.5 text-[10px] font-mono text-slate-400 hover:text-slate-200 transition-colors"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>
          <button
            onClick={() => openWindow('about')}
            className="h-8 px-3 rounded-lg flex items-center space-x-1.5 text-[10px] font-mono text-black hover:scale-105 active:scale-95 transition-all"
            style={{ backgroundColor: accentColor }}
          >
            <span>Explore Bio</span>
            <ArrowRight className="w-3.5 h-3.5 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
};
