import type { Metadata } from "next";
import Link from 'next/link';
import { getBlogs } from "@/lib/db";
import { ArrowLeft, BookOpen, Calendar, Clock, Eye, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Technical Articles & Guides | Subhankar Rath",
  description: "Read technical articles on React, Next.js, Framer Motion, ESP32 IoT microcontrollers, and low-latency network telemetry.",
};

export default async function BlogArchivePage() {
  const blogs = await getBlogs();

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 text-slate-300">
      <Link 
        href="/" 
        className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Workspace OS</span>
      </Link>

      <div className="mb-10">
        <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-semibold">DEV LOGS</span>
        <h1 className="text-3xl font-bold text-white mt-1.5">Technical Writing</h1>
        <p className="text-xs text-slate-400 mt-2">Guides and case-studies written by Subhankar Rath on full-stack web development and IoT mesh networks.</p>
      </div>

      <div className="space-y-6">
        {blogs.map((blog: any) => (
          <article 
            key={blog.id || blog._id} 
            className="p-5 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] transition-colors"
          >
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 mb-2">
              <span className="text-cyan-400 font-semibold uppercase tracking-wider">{blog.category}</span>
              <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1" /> {blog.publishedAt}</span>
            </div>

            <Link href={`/blog/${blog.slug}`}>
              <h2 className="text-lg font-semibold text-slate-100 hover:text-cyan-400 transition-colors cursor-pointer">{blog.title}</h2>
            </Link>
            
            <p className="text-xs text-slate-400 mt-3.5 leading-relaxed">{blog.summary}</p>
            
            <div className="flex justify-between items-center mt-5 pt-3 border-t border-white/[0.03] text-[9.5px] font-mono text-slate-500">
              <div className="flex items-center space-x-4">
                <span className="flex items-center"><Eye className="w-3.5 h-3.5 mr-1" /> {blog.views} Views</span>
                <span className="flex items-center"><Heart className="w-3.5 h-3.5 mr-1" fill="none" /> {blog.likes} Likes</span>
              </div>
              <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> 5 min read</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
