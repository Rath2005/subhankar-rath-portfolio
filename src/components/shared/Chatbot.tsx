"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, X, MessageSquare, Bot } from 'lucide-react';
import { useOS } from '../os/OSProvider';

interface Message {
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

export const Chatbot: React.FC = () => {
  const { chatbotOpen, setChatbotOpen, accentColor } = useOS();
  const [messages, setMessages] = useState<Message[]>([
    { 
      sender: 'assistant', 
      text: "Hi, I'm Subhankar's AI Assistant. Ask me anything about his skills, education, projects, anime collection, or coding journey!", 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom of chat
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input;
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userText, timestamp: new Date() }]);
    setLoading(true);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
      });
      const data = await response.json();
      
      setMessages((prev) => [
        ...prev, 
        { sender: 'assistant', text: data.reply || "I didn't quite catch that. Could you ask in another way?", timestamp: new Date() }
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev, 
        { sender: 'assistant', text: "Sorry, I had trouble connecting to my brain. Please try again!", timestamp: new Date() }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!chatbotOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="fixed bottom-24 right-6 w-[350px] h-[450px] glass-panel rounded-2xl flex flex-col border border-white/[0.08] shadow-2xl z-40 overflow-hidden"
      >
        {/* Chatbot Header */}
        <div className="px-4 py-3 border-b border-white/[0.05] bg-black/40 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div 
              className="w-7 h-7 rounded-lg flex items-center justify-center border"
              style={{ backgroundColor: `${accentColor}12`, borderColor: `${accentColor}40` }}
            >
              <Bot className="w-4 h-4" style={{ color: accentColor }} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-100 flex items-center">
                Subhankar AI <Sparkles className="w-2.5 h-2.5 ml-1 text-cyan-400" />
              </p>
              <span className="text-[9px] text-slate-400 font-mono uppercase tracking-wider">Online & Responsive</span>
            </div>
          </div>
          <button 
            onClick={() => setChatbotOpen(false)}
            className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat History Panel */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-black/10 custom-scrollbar">
          {messages.map((msg, index) => {
            const isUser = msg.sender === 'user';
            return (
              <div 
                key={index}
                className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${isUser ? 'bg-slate-800 text-slate-100 rounded-tr-sm border border-slate-700/50' : 'bg-[#0f0f15]/80 text-slate-200 rounded-tl-sm border border-white/[0.05]'}`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            );
          })}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-[#0f0f15]/80 border border-white/[0.05] rounded-2xl rounded-tl-sm px-4 py-2.5 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input form */}
        <form 
          onSubmit={handleSend}
          className="p-3.5 border-t border-white/[0.05] bg-black/30 flex items-center space-x-2"
        >
          <input
            type="text"
            placeholder="Ask about skills, projects, certificates..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-white/[0.03] border border-white/[0.05] rounded-xl px-3 py-2 text-xs outline-none text-slate-200 placeholder-slate-500 focus:border-white/20 transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-black bg-white disabled:opacity-40 disabled:hover:scale-100 hover:scale-105 transition-transform"
            style={{ backgroundColor: accentColor }}
          >
            <Send className="w-3.5 h-3.5 text-black" fill="black" />
          </button>
        </form>
      </motion.div>
    </AnimatePresence>
  );
};
