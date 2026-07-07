"use client";

import React, { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  LogOut,
  FolderKanban,
  Cpu,
  Award,
  Calendar,
  Sparkles,
  Globe,
  LineChart,
  BookOpen,
  User,
  Plus,
  Edit2,
  Trash2,
  X,
  Save,
  CheckCircle2,
  ArrowLeft,
  Link2,
  Image,
  FileText,
  Heart,
  Music2,
  MapPin,
} from 'lucide-react';
import Link from 'next/link';
import { useOS } from '@/components/os/OSProvider';

// ─── Input Component ──────────────────────────────────────────────────────────
const Field = ({
  label,
  value,
  onChange,
  textarea = false,
  rows = 3,
  type = 'text',
  placeholder = '',
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  textarea?: boolean;
  rows?: number;
  type?: string;
  placeholder?: string;
}) => (
  <div className="space-y-1.5">
    <label className="block font-mono text-[9px] uppercase tracking-wider text-slate-500">{label}</label>
    {textarea ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl p-2.5 outline-none text-slate-200 focus:border-cyan-500/40 transition-colors text-xs resize-none placeholder-slate-600"
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl p-2.5 outline-none text-slate-200 focus:border-cyan-500/40 transition-colors text-xs placeholder-slate-600"
      />
    )}
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdminDashboardPage() {
  const { data: session, status } = useSession();
  const { accentColor } = useOS();
  const router = useRouter();

  const [activeModule, setActiveModule] = useState('profile');
  const [items, setItems] = useState<any[]>([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<any | null>(null);
  const [notify, setNotify] = useState('');
  const [notifyError, setNotifyError] = useState(false);
  const [formData, setFormData] = useState<any>({});

  // ── Profile Settings State ──
  const [profileData, setProfileData] = useState<any>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileSaving, setProfileSaving] = useState(false);

  // 1. Session Redirect Guard
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  // 2. Load profile on mount
  useEffect(() => {
    fetch('/api/admin?module=profile')
      .then((res) => res.json())
      .then((data) => {
        setProfileData(data);
        setProfileLoading(false);
      })
      .catch(() => setProfileLoading(false));
  }, []);

  // 3. Fetch list items when non-profile module is active
  const fetchModuleItems = () => {
    if (activeModule === 'profile') return;
    setLoadingItems(true);
    fetch(`/api/admin?module=${activeModule}`)
      .then((res) => res.json())
      .then((data) => {
        setItems(Array.isArray(data) ? data : []);
        setLoadingItems(false);
      })
      .catch(() => { setItems([]); setLoadingItems(false); });
  };

  useEffect(() => {
    if (activeModule !== 'profile') {
      fetchModuleItems();
      setFormOpen(false);
      setEditItem(null);
    }
  }, [activeModule]);

  // ── Notify helper ──
  const showNotify = (msg: string, error = false) => {
    setNotify(msg);
    setNotifyError(error);
    setTimeout(() => setNotify(''), 3500);
  };

  // ── Save Profile ──
  const handleProfileSave = async () => {
    setProfileSaving(true);
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ module: 'profile', action: 'save', data: profileData }),
      });
      if (res.ok) {
        showNotify('Profile saved successfully.');
      } else {
        showNotify('Failed to save profile.', true);
      }
    } catch {
      showNotify('Network error.', true);
    }
    setProfileSaving(false);
  };

  const setProfile = (path: string, value: string) => {
    setProfileData((prev: any) => {
      const keys = path.split('.');
      const updated = { ...prev };
      let ref: any = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        ref[keys[i]] = { ...ref[keys[i]] };
        ref = ref[keys[i]];
      }
      ref[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  // ── Open Add/Edit form ──
  const openForm = (item: any = null) => {
    if (item) {
      setEditItem(item);
      setFormData({ ...item });
    } else {
      setEditItem(null);
      const seeds: Record<string, any> = {
        projects: { name: '', description: '', coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800', techStack: 'React, NextJS', features: 'Feature 1', challenges: 'None', learnings: 'None', githubLink: '#', liveDemo: '#', status: 'Completed', timeline: '2026' },
        expenses: { category: 'Food', amount: 500, month: '2026-06' },
        earnings: { source: 'Freelancing', amount: 15000, month: '2026-06' },
        anime: { title: '', poster: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=400', rating: 9, favoriteCharacter: '', bestArc: '', favoriteQuote: '', whyILoveIt: '', watchStatus: 'Completed', totalEpisodes: 12, episodesWatched: 12, myReview: '' },
        blogs: { title: '', summary: '', content: '# Title\n\nContent here.', category: 'Development', tags: 'NextJS, React' },
        skills: { name: '', level: 90, iconName: 'React' },
        certificates: { title: '', issuer: '', issueDate: '', category: 'Development', skills: '', description: '', pdfUrl: '' },
        timeline: { year: '2026', title: '', subtitle: '', description: '', category: 'Projects' },
        travel: { placeName: '', country: '', visitedDate: '', story: '', expenses: 0, isWishlist: false },
      };
      setFormData(seeds[activeModule] || {});
    }
    setFormOpen(true);
  };

  // ── Save list item ──
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const processedData = { ...formData };
    if (activeModule === 'projects') {
      processedData.techStack = typeof formData.techStack === 'string' ? formData.techStack.split(',').map((s: string) => s.trim()) : formData.techStack;
      processedData.features = typeof formData.features === 'string' ? formData.features.split(',').map((s: string) => s.trim()) : formData.features;
    }
    if (activeModule === 'blogs') {
      processedData.tags = typeof formData.tags === 'string' ? formData.tags.split(',').map((s: string) => s.trim()) : formData.tags;
    }
    if (activeModule === 'certificates') {
      processedData.skills = typeof formData.skills === 'string' ? formData.skills.split(',').map((s: string) => s.trim()) : (formData.skills || []);
    }
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ module: activeModule, action: 'save', data: processedData }),
      });
      if (res.ok) {
        showNotify('Saved successfully.');
        setFormOpen(false);
        fetchModuleItems();
      } else {
        showNotify('Save failed.', true);
      }
    } catch {
      showNotify('Network error.', true);
    }
  };

  // ── Delete list item ──
  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this entry permanently?')) return;
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ module: activeModule, action: 'delete', data: { id } }),
      });
      if (res.ok) {
        showNotify('Deleted.');
        fetchModuleItems();
      }
    } catch {
      showNotify('Delete failed.', true);
    }
  };

  if (status === 'loading') {
    return <div className="text-center py-20 text-xs font-mono text-slate-500">Authenticating terminal session...</div>;
  }

  const modulesList = [
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'skills', label: 'Tech Stack', icon: Cpu },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'timeline', label: 'Milestones', icon: Calendar },
    { id: 'anime', label: 'Anime Hub', icon: Sparkles },
    { id: 'travel', label: 'Travel Logs', icon: Globe },
    { id: 'expenses', label: 'Expenses', icon: LineChart },
    { id: 'earnings', label: 'Income Logs', icon: LineChart },
    { id: 'blogs', label: 'Blogs DB', icon: BookOpen },
  ];

  return (
    <div className="max-w-6xl mx-auto py-6 text-slate-300 text-xs">
      {/* ── Header ── */}
      <div className="flex flex-wrap justify-between items-center mb-8 border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center space-x-3.5">
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="h-8 px-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.08] border border-white/[0.05] text-slate-400 hover:text-white flex items-center space-x-1.5 font-mono"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>EXIT PORTAL</span>
          </button>
          <div className="flex items-center space-x-2 border-l border-white/10 pl-4">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <div>
              <h1 className="text-sm font-bold text-white font-mono tracking-wider">ADMIN CONTROL CONSOLE</h1>
              <p className="text-[9px] text-slate-500 uppercase tracking-widest">Operator Session Secured</p>
            </div>
          </div>
        </div>
        {session && (
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="h-8 px-4 rounded-lg bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 text-rose-400 flex items-center space-x-2 transition-colors font-mono"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>TERMINATE SESSION</span>
          </button>
        )}
      </div>

      {/* ── Notify Toast ── */}
      {notify && (
        <div className={`p-3.5 rounded-xl flex items-center space-x-2 mb-6 max-w-sm border ${notifyError ? 'bg-rose-500/5 border-rose-500/15 text-rose-400' : 'bg-cyan-500/5 border-cyan-500/15 text-cyan-400'}`}>
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{notify}</span>
        </div>
      )}

      {/* ── Layout ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-3 space-y-1 bg-black/30 p-2.5 rounded-2xl border border-white/[0.04]">
          <span className="block text-[8px] font-mono text-slate-500 uppercase tracking-widest px-3 mb-2.5">Database Tables</span>
          {modulesList.map((mod) => {
            const Icon = mod.icon;
            const active = activeModule === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => setActiveModule(mod.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-left transition-colors font-mono uppercase tracking-wider text-[10px] ${active ? 'bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/25' : 'bg-transparent text-slate-400 hover:bg-white/[0.02] border border-transparent'}`}
              >
                <Icon className="w-4 h-4" />
                <span>{mod.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="md:col-span-9">

          {/* ════════════════════════════════════════
              PROFILE SETTINGS PANEL
          ════════════════════════════════════════ */}
          {activeModule === 'profile' && (
            <div className="space-y-5">
              {profileLoading ? (
                <div className="text-center py-20 text-slate-500 font-mono">Loading profile data...</div>
              ) : profileData ? (
                <>
                  {/* ── Identity ── */}
                  <div className="bg-black/20 rounded-2xl border border-white/[0.04] p-5 space-y-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <User className="w-4 h-4 text-cyan-400" />
                      <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">Identity</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Full Name" value={profileData.name || ''} onChange={(v) => setProfile('name', v)} placeholder="SUBHANKAR RATH" />
                      <Field label="Title / Role" value={profileData.title || ''} onChange={(v) => setProfile('title', v)} placeholder="Full Stack Developer" />
                    </div>
                    <Field label="Bio / About Me" value={profileData.bio || ''} onChange={(v) => setProfile('bio', v)} textarea rows={4} placeholder="Write something about yourself..." />
                  </div>

                  {/* ── Media ── */}
                  <div className="bg-black/20 rounded-2xl border border-white/[0.04] p-5 space-y-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <Image className="w-4 h-4 text-cyan-400" />
                      <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">Avatar & Resume</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Field label="Avatar URL (or /avatar.jpg for local)" value={profileData.avatar || ''} onChange={(v) => setProfile('avatar', v)} placeholder="/avatar.jpg" />
                        {profileData.avatar && (
                          <img src={profileData.avatar} alt="avatar preview" className="w-16 h-16 rounded-xl object-cover border border-white/10 mt-2" />
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <Field label="Resume URL (or /resume.png for local)" value={profileData.resumeUrl || ''} onChange={(v) => setProfile('resumeUrl', v)} placeholder="/resume.png" />
                        {profileData.resumeUrl && profileData.resumeUrl !== '#' && (
                          <a href={profileData.resumeUrl} target="_blank" rel="noreferrer" className="inline-flex items-center space-x-1 text-[9px] font-mono text-cyan-400 hover:underline mt-1">
                            <FileText className="w-3 h-3" /><span>Preview Resume</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ── Social Links ── */}
                  <div className="bg-black/20 rounded-2xl border border-white/[0.04] p-5 space-y-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <Link2 className="w-4 h-4 text-cyan-400" />
                      <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">Social Links</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="GitHub URL" value={profileData.socials?.github || ''} onChange={(v) => setProfile('socials.github', v)} placeholder="https://github.com/username" />
                      <Field label="LinkedIn URL" value={profileData.socials?.linkedin || ''} onChange={(v) => setProfile('socials.linkedin', v)} placeholder="https://linkedin.com/in/username" />
                      <Field label="Instagram URL" value={profileData.socials?.instagram || ''} onChange={(v) => setProfile('socials.instagram', v)} placeholder="https://instagram.com/username" />
                      <Field label="Twitter / X URL" value={profileData.socials?.twitter || ''} onChange={(v) => setProfile('socials.twitter', v)} placeholder="https://twitter.com/username" />
                      <Field label="Email Address" value={profileData.socials?.email || ''} onChange={(v) => setProfile('socials.email', v)} type="email" placeholder="you@email.com" />
                      <Field label="WhatsApp Link" value={profileData.socials?.whatsapp || ''} onChange={(v) => setProfile('socials.whatsapp', v)} placeholder="https://wa.me/91XXXXXXXXXX" />
                    </div>
                  </div>

                  {/* ── Life Stats ── */}
                  <div className="bg-black/20 rounded-2xl border border-white/[0.04] p-5 space-y-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <Heart className="w-4 h-4 text-cyan-400" />
                      <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">Life Stats</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Current City" value={profileData.lifeStats?.city || ''} onChange={(v) => setProfile('lifeStats.city', v)} placeholder="Bhubaneswar" />
                      <Field label="Country" value={profileData.lifeStats?.country || ''} onChange={(v) => setProfile('lifeStats.country', v)} placeholder="India" />
                      <Field label="Daily Focus / Current Goal" value={profileData.lifeStats?.currentFocus || ''} onChange={(v) => setProfile('lifeStats.currentFocus', v)} placeholder="Next.js & Deep Learning" />
                      <Field label="Mood Today" value={profileData.lifeStats?.moodToday || ''} onChange={(v) => setProfile('lifeStats.moodToday', v)} placeholder="Focused ⚡" />
                      <Field label="Sleep Average" value={profileData.lifeStats?.sleepTracker || ''} onChange={(v) => setProfile('lifeStats.sleepTracker', v)} placeholder="7.2 hrs avg" />
                      <Field label="Water Intake" value={profileData.lifeStats?.waterIntake || ''} onChange={(v) => setProfile('lifeStats.waterIntake', v)} placeholder="3.5L / Day" />
                      <Field label="GitHub Streak (days)" value={profileData.lifeStats?.streakGithub || ''} onChange={(v) => setProfile('lifeStats.streakGithub', v)} type="number" />
                      <Field label="LeetCode Solved" value={profileData.lifeStats?.streakLeetcode || ''} onChange={(v) => setProfile('lifeStats.streakLeetcode', v)} type="number" />
                    </div>
                    <Field label="Gym Progress" value={profileData.lifeStats?.gymProgress || ''} onChange={(v) => setProfile('lifeStats.gymProgress', v)} placeholder="Squat: 120kg | Bench: 90kg | Deadlift: 160kg" />
                  </div>

                  {/* ── Now Playing ── */}
                  <div className="bg-black/20 rounded-2xl border border-white/[0.04] p-5 space-y-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <Music2 className="w-4 h-4 text-cyan-400" />
                      <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">Now Playing (YT Music Widget)</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Song Name" value={profileData.lifeStats?.spotifyPlaying?.song || ''} onChange={(v) => setProfile('lifeStats.spotifyPlaying.song', v)} placeholder="Song title" />
                      <Field label="Artist" value={profileData.lifeStats?.spotifyPlaying?.artist || ''} onChange={(v) => setProfile('lifeStats.spotifyPlaying.artist', v)} placeholder="Artist name" />
                    </div>
                    <Field label="YT Music Link / URL" value={profileData.lifeStats?.spotifyPlaying?.ytMusicUrl || ''} onChange={(v) => setProfile('lifeStats.spotifyPlaying.ytMusicUrl', v)} placeholder="https://music.youtube.com/playlist?list=..." />
                  </div>

                  {/* ── Dreams ── */}
                  <div className="bg-black/20 rounded-2xl border border-white/[0.04] p-5 space-y-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <MapPin className="w-4 h-4 text-cyan-400" />
                      <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">Aspirations</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Dream Bike" value={profileData.lifeStats?.dreamBike || ''} onChange={(v) => setProfile('lifeStats.dreamBike', v)} placeholder="Kawasaki Ninja ZX-10R" />
                      <Field label="Dream Car" value={profileData.lifeStats?.dreamCar || ''} onChange={(v) => setProfile('lifeStats.dreamCar', v)} placeholder="Tesla Model S Plaid" />
                      <Field label="Dream House" value={profileData.lifeStats?.dreamHouse || ''} onChange={(v) => setProfile('lifeStats.dreamHouse', v)} placeholder="Glass Villa in Kyoto" />
                    </div>
                  </div>

                  {/* ── Save Button ── */}
                  <div className="flex justify-end">
                    <button
                      onClick={handleProfileSave}
                      disabled={profileSaving}
                      className="h-10 px-8 rounded-xl text-black font-bold flex items-center space-x-2 text-sm hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                      style={{ backgroundColor: accentColor }}
                    >
                      <Save className="w-4 h-4" />
                      <span>{profileSaving ? 'SAVING...' : 'SAVE PROFILE'}</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-20 text-slate-500 font-mono">Failed to load profile. Try refreshing.</div>
              )}
            </div>
          )}

          {/* ════════════════════════════════════════
              LIST / CRUD MODULES
          ════════════════════════════════════════ */}
          {activeModule !== 'profile' && (
            <div className="space-y-6">
              {!formOpen ? (
                /* LIST TABLE */
                <div className="bg-black/20 rounded-2xl border border-white/[0.04] p-5">
                  <div className="flex justify-between items-center mb-5">
                    <div>
                      <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">{activeModule} Directory</h2>
                      <p className="text-[9px] text-slate-500">List of active registry items</p>
                    </div>
                    <button
                      onClick={() => openForm()}
                      className="h-8 px-4 rounded-xl bg-white text-black hover:scale-105 transition-transform font-semibold flex items-center space-x-1.5"
                    >
                      <Plus className="w-3.5 h-3.5 text-black" />
                      <span>Insert Row</span>
                    </button>
                  </div>

                  {loadingItems ? (
                    <div className="text-center py-20 text-slate-500 font-mono">Querying table...</div>
                  ) : items.length > 0 ? (
                    <div className="border border-white/[0.05] rounded-xl overflow-hidden">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-black/60 border-b border-white/[0.05] font-mono text-[9px] text-slate-500 uppercase tracking-widest">
                            <th className="p-3 pl-4">Name / Title</th>
                            <th className="p-3">Details / Status</th>
                            <th className="p-3 pr-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.03]">
                          {items.map((item) => (
                            <tr key={item.id || item._id} className="hover:bg-white/[0.01]">
                              <td className="p-3 pl-4 font-semibold text-slate-200">
                                {item.name || item.title || item.placeName || item.source || item.category}
                              </td>
                              <td className="p-3 text-slate-400 truncate max-w-[250px]">
                                {item.description || item.category || item.summary || item.amount || item.year || item.issuer || item.subtitle}
                              </td>
                              <td className="p-3 pr-4 text-right space-x-2.5">
                                <button onClick={() => openForm(item)} className="text-slate-400 hover:text-cyan-400 transition-colors inline-flex">
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button onClick={() => handleDelete(item.id || item._id)} className="text-slate-500 hover:text-rose-400 transition-colors inline-flex">
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-20 border border-dashed border-white/10 rounded-xl text-slate-500 font-mono">
                      Table is empty. Insert a row to start.
                    </div>
                  )}
                </div>
              ) : (
                /* CRUD FORM */
                <div className="bg-black/20 rounded-2xl border border-white/[0.04] p-5">
                  <div className="flex justify-between items-center mb-5 border-b border-white/[0.04] pb-4">
                    <div>
                      <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                        {editItem ? 'Edit Instance' : 'Create Entry'} ({activeModule})
                      </h2>
                      <p className="text-[9px] text-slate-500">Fill in the fields below and save</p>
                    </div>
                    <button onClick={() => setFormOpen(false)} className="w-6 h-6 rounded-full hover:bg-white/10 flex items-center justify-center text-slate-500 hover:text-white">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleSave} className="space-y-4">
                    {Object.keys(formData).map((key) => {
                      if (['id', '_id', 'createdAt', 'updatedAt', 'views', 'likes', 'commentsCount', 'publishedAt', 'slug'].includes(key)) return null;
                      const value = Array.isArray(formData[key]) ? formData[key].join(', ') : formData[key];
                      const isTextarea = ['description', 'content', 'challenges', 'learnings', 'whyILoveIt', 'myReview', 'story'].includes(key);
                      return (
                        <div key={key} className="space-y-1.5">
                          <label className="font-mono text-slate-500 text-[9px] uppercase tracking-wider">{key.toUpperCase()}</label>
                          {isTextarea ? (
                            <textarea
                              value={value}
                              onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                              rows={key === 'content' ? 10 : 3}
                              className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl p-2.5 outline-none text-slate-200 focus:border-cyan-500/40 transition-colors text-xs resize-none"
                            />
                          ) : (
                            <input
                              type={typeof value === 'number' ? 'number' : 'text'}
                              value={value}
                              onChange={(e) => setFormData({ ...formData, [key]: typeof value === 'number' ? parseFloat(e.target.value) || 0 : e.target.value })}
                              className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl p-2.5 outline-none text-slate-200 focus:border-cyan-500/40 transition-colors text-xs"
                            />
                          )}
                        </div>
                      );
                    })}

                    <div className="flex justify-end space-x-3 border-t border-white/[0.04] pt-4 mt-6">
                      <button
                        type="button"
                        onClick={() => setFormOpen(false)}
                        className="h-8 px-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.08] border border-white/[0.06] text-slate-400 hover:text-white font-mono"
                      >
                        CANCEL
                      </button>
                      <button
                        type="submit"
                        className="h-8 px-5 rounded-xl text-black font-semibold flex items-center space-x-1.5 hover:scale-105 transition-all"
                        style={{ backgroundColor: accentColor }}
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>SAVE</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
