import type { Metadata } from "next";
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogBySlug } from "@/lib/db";
import { ArrowLeft, Calendar, Eye, Heart, Clock, User } from "lucide-react";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  
  if (!blog) {
    return {
      title: 'Post Not Found | Subhankar Rath',
    };
  }

  return {
    title: `${blog.title} | Subhankar Rath Logs`,
    description: blog.summary,
    openGraph: {
      title: blog.title,
      description: blog.summary,
      type: "article",
      publishedTime: blog.publishedAt,
    }
  };
}

export default async function SingleBlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const renderMarkdown = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-xl font-bold text-white mt-6 mb-3 border-b border-white/10 pb-2">{line.slice(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-base font-semibold text-white mt-5 mb-2.5">{line.slice(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-sm font-semibold text-slate-200 mt-4 mb-2">{line.slice(4)}</h3>;
      }
      if (line.startsWith('> ')) {
        return <blockquote key={index} className="border-l-2 border-cyan-400 pl-4 py-2 my-4 italic text-slate-400 bg-white/[0.01] rounded-r-lg">{line.slice(2)}</blockquote>;
      }
      if (line.trim().startsWith('- ')) {
        return <li key={index} className="ml-5 list-disc text-slate-300 py-1 text-xs">{line.trim().slice(2)}</li>;
      }
      if (line.startsWith('```')) {
        return null;
      }
      if (line.includes('`')) {
        return <pre key={index} className="text-xs text-slate-300 leading-relaxed my-3 font-mono bg-slate-900/60 p-3 rounded-lg border border-white/5 overflow-x-auto">{line}</pre>;
      }
      if (line.trim() === '') return <div key={index} className="h-3" />;
      return <p key={index} className="text-xs text-slate-300 leading-relaxed my-2">{line}</p>;
    });
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 text-slate-300">
      <Link 
        href="/blog" 
        className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Articles</span>
      </Link>

      <article className="space-y-6">
        <div>
          <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-slate-500">
            <span className="text-cyan-400 font-semibold uppercase tracking-wider">{blog.category}</span>
            <span>•</span>
            <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1" /> {blog.publishedAt}</span>
            <span>•</span>
            <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> 5 min read</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mt-3 leading-snug">{blog.title}</h1>
        </div>

        {/* Author Bio Panel */}
        <div className="flex items-center space-x-3.5 py-4 border-y border-white/[0.06] bg-white/[0.01] px-4 rounded-xl">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-800">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" 
              alt="Subhankar Rath"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-200 flex items-center"><User className="w-3 h-3 text-cyan-400 mr-1.5" /> Subhankar Rath</p>
            <p className="text-[9px] text-slate-500 font-mono mt-0.5">ECE Undergrad & Full Stack Developer</p>
          </div>
        </div>

        {/* Content Body */}
        <div className="pt-2 select-text">
          {renderMarkdown(blog.content)}
        </div>

        {/* Footer actions */}
        <div className="flex justify-between items-center py-4 border-t border-white/[0.06] text-[10px] font-mono text-slate-500">
          <span className="flex items-center"><Eye className="w-4 h-4 mr-1.5" /> {blog.views} Views</span>
          <button className="flex items-center hover:text-rose-400 transition-colors">
            <Heart className="w-4 h-4 mr-1.5 text-rose-500" fill="currentColor" />
            <span>{blog.likes} Likes</span>
          </button>
        </div>
      </article>
    </div>
  );
}
