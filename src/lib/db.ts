import mongoose from 'mongoose';
import * as mock from './mockData';

const MONGODB_URI = process.env.MONGODB_URI || '';

// Global cache for Mongoose connection in development
let cached = (global as any).mongoose;
if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectToMongo() {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined');
  }
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      console.log('Successfully connected to MongoDB.');
      return mongooseInstance;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  return cached.conn;
}

// ----------------------------------------------------
// MONGOOSE SCHEMAS & MODELS
// ----------------------------------------------------

const ProfileSchema = new mongoose.Schema({
  name: String,
  title: String,
  subtitles: [String],
  bio: String,
  avatar: String,
  resumeUrl: String,
  socials: {
    instagram: String,
    linkedin: String,
    github: String,
    email: String,
    whatsapp: String,
    twitter: String
  },
  lifeStats: mongoose.Schema.Types.Mixed
}, { timestamps: true });

const ProjectSchema = new mongoose.Schema({
  name: String,
  description: String,
  coverImage: String,
  techStack: [String],
  features: [String],
  challenges: String,
  learnings: String,
  githubLink: String,
  liveDemo: String,
  status: String,
  timeline: String,
  architectureDiagram: String,
  futureImprovements: [String],
  screenshots: [String]
}, { timestamps: true });

const SkillSchema = new mongoose.Schema({
  category: String,
  name: String,
  level: Number,
  iconName: String
}, { timestamps: true });

const CertificateSchema = new mongoose.Schema({
  title: String,
  issuer: String,
  issueDate: String,
  category: String,
  skills: [String],
  description: String,
  pdfUrl: String
}, { timestamps: true });

const TimelineSchema = new mongoose.Schema({
  year: String,
  title: String,
  subtitle: String,
  description: String,
  category: String
}, { timestamps: true });

const AnimeSchema = new mongoose.Schema({
  title: String,
  poster: String,
  rating: Number,
  favoriteCharacter: String,
  bestArc: String,
  favoriteQuote: String,
  whyILoveIt: String,
  watchStatus: String,
  totalEpisodes: Number,
  episodesWatched: Number,
  trailerUrl: String,
  themeSong: String,
  myReview: String
}, { timestamps: true });

const ExpenseSchema = new mongoose.Schema({
  category: String,
  amount: Number,
  month: String
}, { timestamps: true });

const EarningSchema = new mongoose.Schema({
  source: String,
  amount: Number,
  month: String
}, { timestamps: true });

const BlogSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true },
  summary: String,
  content: String,
  category: String,
  tags: [String],
  publishedAt: String,
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  commentsCount: { type: Number, default: 0 }
}, { timestamps: true });

const VisitorSchema = new mongoose.Schema({
  count: { type: Number, default: 0 }
});

const NewsletterSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  subscribedAt: { type: Date, default: Date.now }
});

const ProfileModel = mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);
const ProjectModel = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
const SkillModel = mongoose.models.Skill || mongoose.model('Skill', SkillSchema);
const CertificateModel = mongoose.models.Certificate || mongoose.model('Certificate', CertificateSchema);
const TimelineModel = mongoose.models.Timeline || mongoose.model('Timeline', TimelineSchema);
const AnimeModel = mongoose.models.Anime || mongoose.model('Anime', AnimeSchema);
const ExpenseModel = mongoose.models.Expense || mongoose.model('Expense', ExpenseSchema);
const EarningModel = mongoose.models.Earning || mongoose.model('Earning', EarningSchema);
const BlogModel = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
const VisitorModel = mongoose.models.Visitor || mongoose.model('Visitor', VisitorSchema);
const NewsletterModel = mongoose.models.Newsletter || mongoose.model('Newsletter', NewsletterSchema);

// ----------------------------------------------------
// IN-MEMORY FALLBACK DATABASE FOR LOCAL DEVELOPMENT
// ----------------------------------------------------
let mockDb = (global as any).mockDb;
if (!mockDb) {
  mockDb = (global as any).mockDb = {
    profile: JSON.parse(JSON.stringify(mock.initialProfile)),
    projects: JSON.parse(JSON.stringify(mock.initialProjects)),
    skills: JSON.parse(JSON.stringify(mock.initialSkills)),
    certificates: JSON.parse(JSON.stringify(mock.initialCertificates)),
    timeline: JSON.parse(JSON.stringify(mock.initialTimeline)),
    anime: JSON.parse(JSON.stringify(mock.initialAnime)),
    movies: JSON.parse(JSON.stringify(mock.initialMovies)),
    expenses: JSON.parse(JSON.stringify(mock.initialExpenses)),
    earnings: JSON.parse(JSON.stringify(mock.initialEarnings)),
    blogs: JSON.parse(JSON.stringify(mock.initialBlogs)),
    visitorCount: 142,
    newsletter: [] as string[]
  };
} else {
  // Synchronize mockDb data with latest code configurations on reload in dev mode
  mockDb.profile = { ...mockDb.profile, ...JSON.parse(JSON.stringify(mock.initialProfile)) };
  mockDb.certificates = JSON.parse(JSON.stringify(mock.initialCertificates));
  mockDb.projects = JSON.parse(JSON.stringify(mock.initialProjects));
  mockDb.skills = JSON.parse(JSON.stringify(mock.initialSkills));
  mockDb.timeline = JSON.parse(JSON.stringify(mock.initialTimeline));
  mockDb.anime = JSON.parse(JSON.stringify(mock.initialAnime));
  mockDb.movies = JSON.parse(JSON.stringify(mock.initialMovies));
  mockDb.expenses = JSON.parse(JSON.stringify(mock.initialExpenses));
  mockDb.earnings = JSON.parse(JSON.stringify(mock.initialEarnings));
  mockDb.blogs = JSON.parse(JSON.stringify(mock.initialBlogs));
}

// Helper to determine mode
const isMongoConfigured = (): boolean => {
  return MONGODB_URI.length > 0;
};

// ----------------------------------------------------
// UNIFIED DATA ACCESS API (AUTO-FALLBACK)
// ----------------------------------------------------

export async function getProfile() {
  if (isMongoConfigured()) {
    await connectToMongo();
    const profile = await ProfileModel.findOne();
    if (profile) return profile;
  }
  return mockDb.profile;
}

export async function updateProfile(data: any) {
  if (isMongoConfigured()) {
    await connectToMongo();
    const profile = await ProfileModel.findOne();
    if (profile) {
      Object.assign(profile, data);
      await profile.save();
      return profile;
    } else {
      const newProfile = new ProfileModel(data);
      await newProfile.save();
      return newProfile;
    }
  }
  mockDb.profile = { ...mockDb.profile, ...data };
  return mockDb.profile;
}

export async function getProjects() {
  if (isMongoConfigured()) {
    await connectToMongo();
    return await ProjectModel.find().sort({ createdAt: -1 });
  }
  return mockDb.projects;
}

export async function saveProject(projectData: any) {
  if (isMongoConfigured()) {
    await connectToMongo();
    if (projectData._id) {
      return await ProjectModel.findByIdAndUpdate(projectData._id, projectData, { new: true });
    } else {
      const newProject = new ProjectModel(projectData);
      return await newProject.save();
    }
  }
  if (projectData.id || projectData._id) {
    const id = projectData.id || projectData._id;
    const index = mockDb.projects.findIndex((p: any) => p.id === id || p._id === id);
    if (index !== -1) {
      mockDb.projects[index] = { ...mockDb.projects[index], ...projectData };
      return mockDb.projects[index];
    }
  }
  const newProj = { id: `proj-${Date.now()}`, ...projectData };
  mockDb.projects.unshift(newProj);
  return newProj;
}

export async function deleteProject(id: string) {
  if (isMongoConfigured()) {
    await connectToMongo();
    return await ProjectModel.findByIdAndDelete(id);
  }
  mockDb.projects = mockDb.projects.filter((p: any) => p.id !== id && p._id !== id);
  return { success: true };
}

export async function getSkills() {
  if (isMongoConfigured()) {
    await connectToMongo();
    return await SkillModel.find();
  }
  return mockDb.skills;
}

export async function saveSkill(skillData: any) {
  if (isMongoConfigured()) {
    await connectToMongo();
    if (skillData._id) {
      return await SkillModel.findByIdAndUpdate(skillData._id, skillData, { new: true });
    } else {
      const newSkill = new SkillModel(skillData);
      return await newSkill.save();
    }
  }
  if (skillData.id || skillData._id) {
    const id = skillData.id || skillData._id;
    const index = mockDb.skills.findIndex((s: any) => s.id === id || s._id === id);
    if (index !== -1) {
      mockDb.skills[index] = { ...mockDb.skills[index], ...skillData };
      return mockDb.skills[index];
    }
  }
  const newSkill = { id: `skill-${Date.now()}`, ...skillData };
  mockDb.skills.push(newSkill);
  return newSkill;
}

export async function deleteSkill(id: string) {
  if (isMongoConfigured()) {
    await connectToMongo();
    return await SkillModel.findByIdAndDelete(id);
  }
  mockDb.skills = mockDb.skills.filter((s: any) => s.id !== id && s._id !== id);
  return { success: true };
}

export async function getCertificates() {
  if (isMongoConfigured()) {
    await connectToMongo();
    return await CertificateModel.find();
  }
  return mockDb.certificates;
}

export async function saveCertificate(certData: any) {
  if (isMongoConfigured()) {
    await connectToMongo();
    if (certData._id) {
      return await CertificateModel.findByIdAndUpdate(certData._id, certData, { new: true });
    } else {
      const newCert = new CertificateModel(certData);
      return await newCert.save();
    }
  }
  if (certData.id || certData._id) {
    const id = certData.id || certData._id;
    const index = mockDb.certificates.findIndex((c: any) => c.id === id || c._id === id);
    if (index !== -1) {
      mockDb.certificates[index] = { ...mockDb.certificates[index], ...certData };
      return mockDb.certificates[index];
    }
  }
  const newCert = { id: `cert-${Date.now()}`, ...certData };
  mockDb.certificates.push(newCert);
  return newCert;
}

export async function deleteCertificate(id: string) {
  if (isMongoConfigured()) {
    await connectToMongo();
    return await CertificateModel.findByIdAndDelete(id);
  }
  mockDb.certificates = mockDb.certificates.filter((c: any) => c.id !== id && c._id !== id);
  return { success: true };
}

export async function getTimeline() {
  if (isMongoConfigured()) {
    await connectToMongo();
    return await TimelineModel.find().sort({ year: 1 });
  }
  return mockDb.timeline;
}

export async function saveTimeline(timeData: any) {
  if (isMongoConfigured()) {
    await connectToMongo();
    if (timeData._id) {
      return await TimelineModel.findByIdAndUpdate(timeData._id, timeData, { new: true });
    } else {
      const newTime = new TimelineModel(timeData);
      return await newTime.save();
    }
  }
  if (timeData.id || timeData._id) {
    const id = timeData.id || timeData._id;
    const index = mockDb.timeline.findIndex((t: any) => t.id === id || t._id === id);
    if (index !== -1) {
      mockDb.timeline[index] = { ...mockDb.timeline[index], ...timeData };
      return mockDb.timeline[index];
    }
  }
  const newTime = { id: `time-${Date.now()}`, ...timeData };
  mockDb.timeline.push(newTime);
  return newTime;
}

export async function deleteTimeline(id: string) {
  if (isMongoConfigured()) {
    await connectToMongo();
    return await TimelineModel.findByIdAndDelete(id);
  }
  mockDb.timeline = mockDb.timeline.filter((t: any) => t.id !== id && t._id !== id);
  return { success: true };
}

export async function getAnime() {
  if (isMongoConfigured()) {
    await connectToMongo();
    return await AnimeModel.find();
  }
  return mockDb.anime;
}

export async function saveAnime(animeData: any) {
  if (isMongoConfigured()) {
    await connectToMongo();
    if (animeData._id) {
      return await AnimeModel.findByIdAndUpdate(animeData._id, animeData, { new: true });
    } else {
      const newAnime = new AnimeModel(animeData);
      return await newAnime.save();
    }
  }
  if (animeData.id || animeData._id) {
    const id = animeData.id || animeData._id;
    const index = mockDb.anime.findIndex((a: any) => a.id === id || a._id === id);
    if (index !== -1) {
      mockDb.anime[index] = { ...mockDb.anime[index], ...animeData };
      return mockDb.anime[index];
    }
  }
  const newAnime = { id: `anime-${Date.now()}`, ...animeData };
  mockDb.anime.push(newAnime);
  return newAnime;
}

export async function deleteAnime(id: string) {
  if (isMongoConfigured()) {
    await connectToMongo();
    return await AnimeModel.findByIdAndDelete(id);
  }
  mockDb.anime = mockDb.anime.filter((a: any) => a.id !== id && a._id !== id);
  return { success: true };
}

export async function getMovies() {
  return mockDb.movies;
}

export async function getExpenses() {
  if (isMongoConfigured()) {
    await connectToMongo();
    return await ExpenseModel.find();
  }
  return mockDb.expenses;
}

export async function saveExpense(expenseData: any) {
  if (isMongoConfigured()) {
    await connectToMongo();
    if (expenseData._id) {
      return await ExpenseModel.findByIdAndUpdate(expenseData._id, expenseData, { new: true });
    } else {
      const newExp = new ExpenseModel(expenseData);
      return await newExp.save();
    }
  }
  const newExp = { id: `exp-${Date.now()}`, ...expenseData };
  mockDb.expenses.unshift(newExp);
  return newExp;
}

export async function deleteExpense(id: string) {
  if (isMongoConfigured()) {
    await connectToMongo();
    return await ExpenseModel.findByIdAndDelete(id);
  }
  mockDb.expenses = mockDb.expenses.filter((e: any) => e.id !== id && e._id !== id);
  return { success: true };
}

export async function getEarnings() {
  if (isMongoConfigured()) {
    await connectToMongo();
    return await EarningModel.find();
  }
  return mockDb.earnings;
}

export async function saveEarning(earningData: any) {
  if (isMongoConfigured()) {
    await connectToMongo();
    if (earningData._id) {
      return await EarningModel.findByIdAndUpdate(earningData._id, earningData, { new: true });
    } else {
      const newEarn = new EarningModel(earningData);
      return await newEarn.save();
    }
  }
  const newEarn = { id: `earn-${Date.now()}`, ...earningData };
  mockDb.earnings.unshift(newEarn);
  return newEarn;
}

export async function deleteEarning(id: string) {
  if (isMongoConfigured()) {
    await connectToMongo();
    return await EarningModel.findByIdAndDelete(id);
  }
  mockDb.earnings = mockDb.earnings.filter((e: any) => e.id !== id && e._id !== id);
  return { success: true };
}

export async function getBlogs() {
  if (isMongoConfigured()) {
    await connectToMongo();
    return await BlogModel.find().sort({ createdAt: -1 });
  }
  return mockDb.blogs;
}

export async function getBlogBySlug(slug: string) {
  if (isMongoConfigured()) {
    await connectToMongo();
    return await BlogModel.findOne({ slug });
  }
  return mockDb.blogs.find((b: any) => b.slug === slug);
}

export async function saveBlog(blogData: any) {
  if (isMongoConfigured()) {
    await connectToMongo();
    if (blogData._id) {
      return await BlogModel.findByIdAndUpdate(blogData._id, blogData, { new: true });
    } else {
      if (!blogData.slug) {
        blogData.slug = blogData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
      const newBlog = new BlogModel(blogData);
      return await newBlog.save();
    }
  }
  if (blogData.id || blogData._id) {
    const id = blogData.id || blogData._id;
    const index = mockDb.blogs.findIndex((b: any) => b.id === id || b._id === id);
    if (index !== -1) {
      mockDb.blogs[index] = { ...mockDb.blogs[index], ...blogData };
      return mockDb.blogs[index];
    }
  }
  const newBlog = {
    id: `blog-${Date.now()}`,
    likes: 0,
    views: 0,
    commentsCount: 0,
    publishedAt: new Date().toISOString().split('T')[0],
    slug: blogData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    ...blogData
  };
  mockDb.blogs.unshift(newBlog);
  return newBlog;
}

export async function deleteBlog(id: string) {
  if (isMongoConfigured()) {
    await connectToMongo();
    return await BlogModel.findByIdAndDelete(id);
  }
  mockDb.blogs = mockDb.blogs.filter((b: any) => b.id !== id && b._id !== id);
  return { success: true };
}

export async function getVisitorCount() {
  if (isMongoConfigured()) {
    await connectToMongo();
    let vis = await VisitorModel.findOne();
    if (!vis) {
      vis = new VisitorModel({ count: 1 });
      await vis.save();
    }
    return vis.count;
  }
  return mockDb.visitorCount;
}

export async function incrementVisitorCount() {
  if (isMongoConfigured()) {
    await connectToMongo();
    let vis = await VisitorModel.findOne();
    if (!vis) {
      vis = new VisitorModel({ count: 1 });
    } else {
      vis.count += 1;
    }
    await vis.save();
    return vis.count;
  }
  mockDb.visitorCount += 1;
  return mockDb.visitorCount;
}

export async function subscribeNewsletter(email: string) {
  if (isMongoConfigured()) {
    await connectToMongo();
    try {
      const entry = new NewsletterModel({ email });
      await entry.save();
      return { success: true };
    } catch (e: any) {
      if (e.code === 11000) {
        return { success: true, message: 'Already subscribed' };
      }
      throw e;
    }
  }
  if (!mockDb.newsletter.includes(email)) {
    mockDb.newsletter.push(email);
  }
  return { success: true };
}

export async function getTravelDestinations() {
  return mockDb.travel || mock.initialTravel;
}

export async function saveTravelDestination(travelData: any) {
  if (!mockDb.travel) {
    mockDb.travel = JSON.parse(JSON.stringify(mock.initialTravel));
  }
  if (travelData.id || travelData._id) {
    const id = travelData.id || travelData._id;
    const index = mockDb.travel.findIndex((t: any) => t.id === id || t._id === id);
    if (index !== -1) {
      mockDb.travel[index] = { ...mockDb.travel[index], ...travelData };
      return mockDb.travel[index];
    }
  }
  const newTravel = { id: `travel-${Date.now()}`, ...travelData };
  mockDb.travel.push(newTravel);
  return newTravel;
}

export async function deleteTravelDestination(id: string) {
  if (!mockDb.travel) {
    mockDb.travel = JSON.parse(JSON.stringify(mock.initialTravel));
  }
  mockDb.travel = mockDb.travel.filter((t: any) => t.id !== id && t._id !== id);
  return { success: true };
}
