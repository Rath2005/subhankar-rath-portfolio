"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Terminal, ShieldAlert, ArrowLeft } from 'lucide-react';

interface TerminalLine {
  text: string;
  type: 'output' | 'input' | 'error' | 'success';
}

export default function NotFoundPage() {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: "SYSTEM ERROR 404: NODE ADDRESS COLLAPSED", type: 'error' },
    { text: "Initializing fallback shell diagnostics...", type: 'output' },
    { text: "Connection online. Type 'help' for instructions.", type: 'success' }
  ]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus terminal input
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    // Auto-scroll terminal logs
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmdLine = input.trim();
    const args = cmdLine.toLowerCase().split(' ');
    const command = args[0];
    
    const newLines: TerminalLine[] = [
      { text: `visitor@subhankar.os:~$ ${cmdLine}`, type: 'input' }
    ];

    switch (command) {
      case 'help':
        newLines.push(
          { text: "Available System Directives:", type: 'success' },
          { text: "  ls          - Scan sector folders", type: 'output' },
          { text: "  cat <node>  - Concatenate and view folder records", type: 'output' },
          { text: "  warp        - Warp back to workspace desktop", type: 'output' },
          { text: "  clear       - Wipe terminal cache", type: 'output' }
        );
        break;
      case 'ls':
        newLines.push(
          { text: "Found 3 structural nodes:", type: 'success' },
          { text: "  hobbies/    projects/    credentials/", type: 'output' }
        );
        break;
      case 'cat':
        const target = args[1];
        if (!target) {
          newLines.push({ text: "Error: Please specify target folder (e.g. cat projects)", type: 'error' });
        } else if (target === 'projects') {
          newLines.push({ text: "Projects logged: AI Interview platform, ESP32 secure RF IoT telemetry nodes, logistics routing algorithms.", type: 'output' });
        } else if (target === 'hobbies') {
          newLines.push({ text: "Hobbies logged: Riding ZX-10R superbike, Solo Leveling anime reviews, traveling.", type: 'output' });
        } else if (target === 'credentials') {
          newLines.push({ text: "Credentials logged: AWS Certified Cloud Practitioner, deeplearning.ai certifications.", type: 'output' });
        } else {
          newLines.push({ text: `Error: Node '${target}' not found. Check spelling or try 'ls'.`, type: 'error' });
        }
        break;
      case 'warp':
      case 'home':
        newLines.push({ text: "WARPING ENGAGED. PRE-FLIGHT DIAGNOSTICS SUCCESSFUL.", type: 'success' });
        setTimeout(() => router.push('/'), 1000);
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      default:
        newLines.push({ text: `Command '${command}' not recognized. Type 'help' for diagnostics instructions.`, type: 'error' });
    }

    setHistory((prev) => [...prev, ...newLines]);
    setInput('');
  };

  return (
    <div className="max-w-xl mx-auto py-16 px-4 text-slate-300 font-mono">
      <div 
        onClick={() => inputRef.current?.focus()}
        className="glass-panel p-5 rounded-xl border border-white/10 shadow-2xl bg-black/85 flex flex-col h-[380px] overflow-hidden cursor-text"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-3.5 select-none">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="text-[10px] text-slate-400 font-bold tracking-wider">DIAGNOSTICS SHELL</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>
        </div>

        {/* Terminal Output history */}
        <div 
          ref={containerRef}
          className="flex-1 overflow-y-auto space-y-2 text-xs pr-1 select-text custom-scrollbar"
        >
          {history.map((line, idx) => (
            <div 
              key={idx}
              className={
                line.type === 'error' ? 'text-rose-400' :
                line.type === 'success' ? 'text-emerald-400' :
                line.type === 'input' ? 'text-cyan-400' : 'text-slate-400'
              }
            >
              {line.text}
            </div>
          ))}
        </div>

        {/* Input prompt form */}
        <form onSubmit={handleCommand} className="flex items-center border-t border-white/5 pt-3.5 mt-2">
          <span className="text-cyan-400 mr-2">visitor@subhankar.os:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-slate-200"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </form>
      </div>

      <button
        onClick={() => router.push('/')}
        className="mt-6 text-xs text-slate-500 hover:text-white flex items-center space-x-1.5 mx-auto transition-colors font-mono uppercase tracking-wider"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Workspace OS</span>
      </button>
    </div>
  );
}
