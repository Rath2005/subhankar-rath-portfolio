"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Search, ArrowLeft, Heart, Eye, Calendar, Clock } from 'lucide-react';
import { useOS } from '../os/OSProvider';

interface Blog {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
  publishedAt: string;
  likes: number;
  views: number;
  commentsCount: number;
}

export const BlogWidget: React.FC = () => {
  const { accentColor } = useOS();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin?module=blogs')
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = blogs.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Simple, high-fidelity custom Markdown parser
  const renderMarkdown = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      // 1. Headers
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-lg font-bold text-white mt-6 mb-3 border-b border-white/10 pb-2">{line.slice(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-sm font-semibold text-white mt-5 mb-2.5">{line.slice(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xs font-semibold text-slate-200 mt-4 mb-2">{line.slice(4)}</h3>;
      }
      // 2. Blockquotes
      if (line.startsWith('> ')) {
        return <blockquote key={index} className="border-l-2 border-cyan-400 pl-4 py-1.5 my-3 italic text-slate-400 bg-white/[0.01] rounded-r-lg">{line.slice(2)}</blockquote>;
      }
      // 3. Lists
      if (line.trim().startsWith('- ')) {
        return <li key={index} className="ml-5 list-disc text-slate-300 py-1 text-xs">{line.trim().slice(2)}</li>;
      }
      // 4. Code Blocks wrapper check (visual only)
      if (line.startsWith('```')) {
        return null; // hide tags
      }
      // 5. Code line snippets
      if (line.includes('`')) {
        // Render inline highlighting or raw formatting
        return <p key={index} className="text-xs text-slate-300 leading-relaxed my-2.5 font-mono bg-slate-900/60 p-2 rounded-lg border border-white/5">{line}</p>;
      }
      // 6. Normal paragraph
      if (line.trim() === '') return <div key={index} className="h-2" />;
      return <p key={index} className="text-xs text-slate-300 leading-relaxed my-2">{line}</p>;
    });
  };

  return (
    <div className="relative text-slate-300 min-h-[50vh]">
      <AnimatePresence mode="wait">
        {!selectedBlog ? (
          /* BLOG POSTS LIST SCREEN */
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Header elements */}
            <div className="flex flex-wrap justify-between items-baseline gap-2">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase font-semibold">LOG ENTRIES</span>
                <h2 className="text-xl font-bold text-white mt-0.5">Blogs & Guides</h2>
              </div>
              
              {/* Search bar */}
              <div className="relative flex items-center bg-white/[0.02] border border-white/10 rounded-xl px-3 py-1.5 w-full sm:w-60">
                <Search className="w-4 h-4 text-slate-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-xs text-slate-200 placeholder-slate-500 w-full"
                />
              </div>
            </div>

            {loading ? (
              <div className="text-center py-20 text-xs font-mono text-slate-500">
                Opening logs repository...
              </div>
            ) : filtered.length > 0 ? (
              <div className="space-y-3">
                {filtered.map((blog) => (
                  <div
                    key={blog.id}
                    onClick={() => setSelectedBlog(blog)}
                    className="p-4 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10 transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div className="flex flex-wrap justify-between items-baseline gap-1">
                      <span className="text-[8px] font-mono text-cyan-400 uppercase tracking-wider bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                        {blog.category}
                      </span>
                      <span className="text-[9px] font-mono text-slate-500 flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1" /> {blog.publishedAt}
                      </span>
                    </div>

                    <h3 className="text-sm font-semibold text-slate-100 mt-2 hover:text-white transition-colors">{blog.title}</h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed mt-2.5 line-clamp-2">{blog.summary}</p>

                    {/* Stats metrics */}
                    <div className="flex justify-between items-center mt-4 border-t border-white/[0.04] pt-3 text-[9px] font-mono text-slate-500">
                      <div className="flex items-center space-x-3.5">
                        <span className="flex items-center"><Eye className="w-3.5 h-3.5 mr-1" /> {blog.views} Views</span>
                        <span className="flex items-center"><Heart className="w-3.5 h-3.5 mr-1" /> {blog.likes} Likes</span>
                      </div>
                      <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> 5 min read</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-xs font-mono text-slate-500">
                No logs matching your query.
              </div>
            )}
          </motion.div>
        ) : (
          /* BLOG READER SCREEN */
          <motion.div
            key="reader"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Back button */}
            <button
              onClick={() => setSelectedBlog(null)}
              className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to articles</span>
            </button>

            {/* Title block header */}
            <div>
              <div className="flex items-center space-x-3 text-[10px] font-mono text-slate-500">
                <span className="text-cyan-400 font-semibold">{selectedBlog.category.toUpperCase()}</span>
                <span>•</span>
                <span>{selectedBlog.publishedAt}</span>
                <span>•</span>
                <span className="flex items-center"><Heart className="w-3 h-3 text-rose-500 mr-1" fill="currentColor" /> {selectedBlog.likes} Likes</span>
              </div>
              <h2 className="text-xl font-bold text-white mt-2 leading-snug">{selectedBlog.title}</h2>
            </div>

            {/* Markdown rendered body */}
            <div className="border-t border-white/[0.06] pt-4 select-text">
              {renderMarkdown(selectedBlog.content)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
