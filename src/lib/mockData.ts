export interface Project {
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

export interface Skill {
  category: 'Frontend' | 'Backend' | 'Database' | 'Cloud' | 'AI' | 'Tools' | 'Languages';
  name: string;
  level: number; // 0 to 100
  iconName: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  category: string;
  skills: string[];
  description: string;
  pdfUrl: string;
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'School' | 'College' | 'Projects' | 'Internship' | 'Achievements' | 'Future';
}

export interface Anime {
  id: string;
  title: string;
  poster: string;
  rating: number; // 1-10
  favoriteCharacter: string;
  bestArc: string;
  favoriteQuote: string;
  whyILoveIt: string;
  watchStatus: 'Watching' | 'Completed' | 'Plan to Watch';
  totalEpisodes: number;
  episodesWatched: number;
  trailerUrl?: string;
  themeSong?: string;
  myReview: string;
}

export interface TravelDestination {
  id: string;
  placeName: string;
  country: string;
  visitedDate: string;
  coordinates: [number, number]; // [lat, lng] for rendering on map
  gallery: string[];
  expenses: number;
  story: string;
  isWishlist: boolean;
}

export interface Expense {
  category: 'Food' | 'Travel' | 'Shopping' | 'Education' | 'Entertainment' | 'Subscriptions' | 'Rent' | 'Miscellaneous';
  amount: number;
  month: string; // e.g. "2026-06"
}

export interface Earning {
  source: 'Freelancing' | 'Internship' | 'Salary' | 'Scholarships' | 'Investments' | 'Other';
  amount: number;
  month: string;
}

export interface Blog {
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

// Initial/Mock database structures
export const initialProfile = {
  name: "SUBHANKAR RATH",
  title: "Full Stack Developer",
  subtitles: ["Full Stack Developer", "AI Enthusiast", "Software Engineer", "Problem Solver", "ECE Student"],
  bio: "I am a passionate Electronics and Communication Engineering student with a deep interest in software engineering and artificial intelligence. I focus on creating high-performance, pixel-perfect web applications and connecting physical IoT devices with modern cloud infrastructures.",
  avatar: "/avatar.jpg", // real profile photo
  resumeUrl: "/resume.png",
  socials: {
    instagram: "https://www.instagram.com/",
    linkedin: "https://www.linkedin.com/in/subhankar-rath-2a60b340a/",
    github: "https://github.com/",
    email: "subhankarrath.ece@gmail.com",
    whatsapp: "https://wa.me/1234567890",
    twitter: "https://twitter.com/subhankar"
  },
  lifeStats: {
    age: 21,
    city: "Bhubaneswar",
    country: "India",
    currentFocus: "Next.js & Deep Learning integrations",
    routine: [
      { time: "06:30 AM", activity: "Morning Routine & Meditation" },
      { time: "08:00 AM", activity: "Algorithms & Coding Practice" },
      { time: "10:00 AM", activity: "University Classes / Labs" },
      { time: "04:00 PM", activity: "Open Source Contributions & Projects" },
      { time: "07:00 PM", activity: "Workout & Gym session" },
      { time: "09:00 PM", activity: "Reading / Anime or Series time" }
    ],
    goals: ["Mastering WebGL/Three.js", "Getting a Software Engineer role at Vercel/Linear", "Building an open-source ML developer tool"],
    dreamCompanies: ["Vercel", "Linear", "Tesla", "Apple", "Stripe"],
    dreamBike: "Kawasaki Ninja ZX-10R",
    dreamCar: "Tesla Model S Plaid",
    dreamHouse: "Glass Villa in Kyoto",
    dreamTravel: ["Kyoto, Japan", "Reykjavík, Iceland", "Zermatt, Switzerland"],
    booksRead: 14,
    animeWatched: 120,
    moviesWatched: 240,
    codingHours: 1250,
    gymProgress: "Squat: 120kg | Bench: 90kg | Deadlift: 160kg",
    sleepTracker: "7.2 hrs avg",
    waterIntake: "3.5L / Day",
    moodToday: "Focused ⚡",
    streakLeetcode: 45,
    streakGithub: 124,
    spotifyPlaying: { // used as YouTube Music now playing data
      song: "Midnight City",
      artist: "M83",
      album: "Hurry Up, We're Dreaming",
      isPlaying: true,
      durationMs: 243000,
      progressMs: 104000,
      ytMusicUrl: "https://music.youtube.com/"
    },
    weather: {
      temp: 29,
      condition: "Clear Sky",
      humidity: 62,
      wind: 12
    }
  }
};

export const initialProjects: Project[] = [
  {
    id: "proj-1",
    name: "Logistics One",
    description: "A comprehensive end-to-end logistics management platform that streamlines supply chain operations, real-time fleet tracking, order processing, and warehouse management across distributed delivery networks.",
    coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHplr6SUW2mfxn9HVDhbQLZ9SwH96lGF_KUIdA3XINMQ&s=10",
    techStack: ["React", "Node.js", "Express.js", "MongoDB", "Leaflet Maps", "Redux Toolkit", "Socket.io"],
    features: [
      "Real-time fleet GPS tracking with interactive Leaflet map overlays.",
      "Automated route optimization using Dijkstra's algorithm to minimize delivery costs.",
      "Order lifecycle management from dispatch to delivery confirmation.",
      "Live driver telemetry dashboard with fuel and load analytics."
    ],
    challenges: "Handling thousands of concurrent GPS coordinate updates in real-time without stalling the UI thread or causing memory leaks.",
    learnings: "Mastered web workers for CPU-intensive routing calculations, efficient MongoDB geospatial indexes, and canvas overlay rendering on map tiles.",
    githubLink: "https://github.com/subhankar/logistics-one",
    liveDemo: "https://logistics-one.vercel.app",
    status: "Completed",
    timeline: "Oct 2025 - Dec 2025",
    futureImprovements: ["ML-based delivery time prediction", "Driver mobile app integration via React Native"]
  },
  {
    id: "proj-2",
    name: "AI Interview Preparation Platform",
    description: "An advanced, interactive SaaS application that uses large language models to conduct live audio/video interview simulations, evaluating candidate responses, facial expressions, and body language to provide deep diagnostic feedback.",
    coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3tXiZPF4pv5T0PAFwB8LQtZEblHe8su8XfElohSBnrg&s=10",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Gemini API", "WebRTC", "MongoDB", "Framer Motion"],
    features: [
      "Real-time audio-to-text transcript analysis.",
      "Dynamic AI interviewer asking adaptive follow-up questions.",
      "Performance score breakdowns with constructive text suggestions.",
      "Video recordings storage with face mesh sentiment analytics."
    ],
    challenges: "Handling real-time low-latency audio transmission and stream parsing while orchestrating complex prompt structures with the LLM API.",
    learnings: "Deepened expertise in WebRTC protocols, audio streaming buffers, and crafting efficient, high-performance edge database caching.",
    githubLink: "https://github.com/subhankar/ai-interview",
    liveDemo: "https://ai-interview-prep.vercel.app",
    status: "Completed",
    timeline: "Jan 2026 - Mar 2026",
    architectureDiagram: "Client (WebRTC) <--> API Route (NextJS Edge) <--> Gemini Live Session <--> Vector DB (Semantic Context) <--> User DB (MongoDB)",
    futureImprovements: ["Integrating live peer-to-peer mock rooms", "Expanding to 3D avatar interviewers using React Three Fiber"]
  },
  {
    id: "proj-3",
    name: "Spotify Clone",
    description: "A pixel-perfect, feature-rich music streaming web app inspired by Spotify, featuring dynamic playlists, real-time audio playback, artist pages, search, and personalized recommendation engines.",
    coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6_f8eFpH9UmkGvaHn8lofYfJ5kgxVBVYz0gCrsshnwA&s=10",
    techStack: ["React", "Node.js", "Express.js", "MongoDB", "Web Audio API", "Tailwind CSS", "Framer Motion"],
    features: [
      "Audio streaming with custom Web Audio API visualizer and waveform render.",
      "Dynamic playlist creation, editing, and real-time collaborative sharing.",
      "Artist & album discovery with genre-based recommendation engine.",
      "Cross-device progress sync and offline-mode PWA support."
    ],
    challenges: "Achieving seamless audio crossfade transitions and efficient streaming buffer management across variable network conditions.",
    learnings: "Gained deep experience with the Web Audio API, audio context graph nodes, streaming chunk buffers, and MediaSession API for OS-level media controls.",
    githubLink: "https://github.com/subhankar/spotify-clone",
    liveDemo: "https://spotify-clone-subhankar.vercel.app",
    status: "Completed",
    timeline: "Aug 2025 - Oct 2025",
    futureImprovements: ["Podcast streaming support", "AI-generated DJ mood playlists based on user listening history"]
  },
  {
    id: "proj-4",
    name: "Campus Kart",
    description: "A hyperlocal e-commerce marketplace built exclusively for college students, enabling peer-to-peer buying and selling of textbooks, electronics, stationery, and other campus essentials within the campus community.",
    coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdy8Uqr_fnVxEHhsikFyVtYSjSpdnM7turut7gRYuoIg&s=10",
    techStack: ["Next.js", "TypeScript", "MongoDB", "Stripe", "Cloudinary", "Tailwind CSS", "NextAuth.js"],
    features: [
      "Student-verified listings with college email authentication.",
      "Real-time in-app chat between buyers and sellers using Socket.io.",
      "Stripe-integrated secure payment gateway with escrow system.",
      "AI-powered price suggestion based on product condition and market data."
    ],
    challenges: "Building a trustworthy transaction escrow system and ensuring data isolation between college communities using multi-tenant architecture.",
    learnings: "Mastered multi-tenant database design patterns, payment webhook handling with Stripe, and Cloudinary image upload optimization pipelines.",
    githubLink: "https://github.com/subhankar/campus-kart",
    liveDemo: "https://campus-kart.vercel.app",
    status: "In Progress",
    timeline: "Mar 2026 - Present",
    futureImprovements: ["Mobile app via Expo React Native", "Smart contract escrow using Ethereum", "Campus delivery network for logistics"]
  },
  {
    id: "proj-5",
    name: "Battlefield IoT Security System",
    description: "A robust hardware-software telemetry hub designed for tactical edge networking, collecting real-time soldier biometrics, environment toxicity levels, and tactical mapping using encrypted RF mesh protocols.",
    coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqhrvG9QBAdClvj7c8T87nGPQusfMOIhyvIZcOEXKE9g&s=10",
    techStack: ["ESP32", "C++", "MQTT", "Node.js", "React", "Tailwind CSS", "AES-256"],
    features: [
      "Biometric tracking (Heart rate, SpO2, Accelerometer fall detection).",
      "Off-grid communication using LoRa mesh networking nodes.",
      "Encrypted base station dashboard showing alerts on topological layouts.",
      "Toxicity & environmental sensors (CO2, temperature, humidity) with threshold alarms."
    ],
    challenges: "Operating inside harsh, low-bandwidth, and high-noise environments where traditional WiFi or cellular signals are non-existent.",
    learnings: "Gained significant hardware design, battery optimization, serial communication, and low-level firmware encryption skills.",
    githubLink: "https://github.com/subhankar/battlefield-iot",
    liveDemo: "https://tactical-iot.vercel.app",
    status: "In Progress",
    timeline: "Feb 2026 - Present",
    architectureDiagram: "ESP32 Nodes (LoRa Mesh) --> MQTT Broker --> Node.js Gateway --> React Dashboard (AES-256 Encrypted)",
    futureImprovements: ["Satellite uplink integration for truly off-grid comms", "AI anomaly detection for biometric threat alerts"]
  }
];


export const initialSkills: Skill[] = [
  // Frontend
  { category: "Frontend", name: "React / Next.js", level: 95, iconName: "React" },
  { category: "Frontend", name: "TypeScript", level: 90, iconName: "TypeScript" },
  { category: "Frontend", name: "Tailwind CSS", level: 95, iconName: "Tailwind" },
  { category: "Frontend", name: "Framer Motion", level: 85, iconName: "Framer" },
  { category: "Frontend", name: "Three.js / React Three Fiber", level: 70, iconName: "Three" },
  // Backend
  { category: "Backend", name: "Node.js / Express", level: 90, iconName: "Node" },
  { category: "Backend", name: "Next.js Route Handlers", level: 92, iconName: "Next" },
  { category: "Backend", name: "WebRTC / WebSockets", level: 80, iconName: "WebRTC" },
  // Database
  { category: "Database", name: "MongoDB", level: 88, iconName: "MongoDB" },
  { category: "Database", name: "PostgreSQL", level: 80, iconName: "Postgres" },
  { category: "Database", name: "Redis Caching", level: 75, iconName: "Redis" },
  // Cloud
  { category: "Cloud", name: "Vercel / Netlify", level: 92, iconName: "Vercel" },
  { category: "Cloud", name: "AWS (S3 / EC2)", level: 75, iconName: "AWS" },
  { category: "Cloud", name: "Docker", level: 78, iconName: "Docker" },
  // AI
  { category: "AI", name: "Gemini / OpenAI API Integrations", level: 85, iconName: "AI" },
  { category: "AI", name: "Vector Databases (Pinecone)", level: 75, iconName: "VectorDB" },
  // Tools
  { category: "Tools", name: "Git & GitHub", level: 90, iconName: "Git" },
  { category: "Tools", name: "Postman", level: 88, iconName: "Postman" },
  { category: "Tools", name: "Figma UI/UX Design", level: 82, iconName: "Figma" },
  // Languages
  { category: "Languages", name: "JavaScript", level: 95, iconName: "JS" },
  { category: "Languages", name: "C / C++ (Embedded)", level: 85, iconName: "Cpp" },
  { category: "Languages", name: "Python", level: 80, iconName: "Python" }
];

export const initialCertificates: Certificate[] = [
  {
    id: "cert-1",
    title: "Python Programming & Applications",
    issuer: "Syllogistek Systems Pvt. Ltd.",
    issueDate: "July 2024",
    category: "Programming",
    skills: ["Python", "Programming", "Software Development"],
    description: "Successfully completed Python Programming & Applications training, mastering fundamental syntax, OOP, data structures, and REST API development.",
    pdfUrl: "/certificates/python-certificate.pdf"
  },
  {
    id: "cert-2",
    title: "Vocational Training — Instrumentation & Automation",
    issuer: "Rourkela Steel Plant (SAIL)",
    issueDate: "July 2025",
    category: "Engineering",
    skills: ["Instrumentation", "Automation", "Embedded Systems", "SAIL"],
    description: "Underwent practical training in the Instrumentation & Automation department at Rourkela Steel Plant, learning about industrial sensor integration and programmable logic controllers.",
    pdfUrl: "/certificates/rsp-internship-certificate.pdf"
  },
  {
    id: "cert-3",
    title: "The Joy of Computing using Python — Elite",
    issuer: "NPTEL / IIT Madras (Swayam)",
    issueDate: "April 2026",
    category: "Computer Science",
    skills: ["Python", "Computing", "Algorithms", "Data Structures"],
    description: "Successfully completed NPTEL course with Elite certification, scoring 75% on proctored exams and weekly assignments.",
    pdfUrl: "/certificates/nptel-certificate.pdf"
  }
];

export const initialTimeline: TimelineEvent[] = [
  {
    id: "time-1",
    year: "2019 - 2021",
    title: "High School Certification",
    subtitle: "DAV Public School",
    description: "Completed secondary education specializing in Physics, Chemistry, Mathematics, and Computer Science with top honors.",
    category: "School"
  },
  {
    id: "time-2",
    year: "2022 - 2026",
    title: "B.Tech in Electronics & Communication",
    subtitle: "Silicon Institute of Technology",
    description: "Currently pursuing engineering degree. Deep diving into digital electronics, IoT systems, networking, and software architectures.",
    category: "College"
  },
  {
    id: "time-3",
    year: "Summer 2025",
    title: "Full-Stack Development Intern",
    subtitle: "InnoTech Solutions",
    description: "Architected modern administrative portals using Next.js. Reduced loading times by 30% through static generation and incremental rebuilds.",
    category: "Internship"
  },
  {
    id: "time-4",
    year: "Dec 2025",
    title: "Hackathon Winner",
    subtitle: "National Smart India Hackathon",
    description: "Lead developer in creating a decentralized crisis mapping dashboard using IoT mesh networking. Awarded first place in Smart Cities track.",
    category: "Achievements"
  },
  {
    id: "time-5",
    year: "2026+",
    title: "Future Aspirations",
    subtitle: "Senior Systems Engineer / AI Researcher",
    description: "Aiming to build bleeding-edge products at the intersection of robust web applications, high performance graphics (WebGL), and machine learning.",
    category: "Future"
  }
];

export const initialAnime: Anime[] = [
  {
    id: "anime-1",
    title: "Solo Leveling",
    poster: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=400&auto=format&fit=crop", // placeholder art
    rating: 9.5,
    favoriteCharacter: "Sung Jin-Woo",
    bestArc: "Jeju Island Raid Arc",
    favoriteQuote: "I will level up.",
    whyILoveIt: "The unmatched hype, spectacular animation quality, and the incredibly satisfying progression from zero to absolute god-tier status.",
    watchStatus: "Completed",
    totalEpisodes: 12,
    episodesWatched: 12,
    trailerUrl: "https://www.youtube.com/embed/u1QeG0eK-0Q",
    myReview: "Solo Leveling is a milestone in web-toon adaptations. The sound tracking by Sawano Hiroyuki and A-1 Pictures' masterclass animation create an absolute spectacle."
  },
  {
    id: "anime-2",
    title: "Attack on Titan",
    poster: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=400&auto=format&fit=crop",
    rating: 10,
    favoriteCharacter: "Levi Ackerman",
    bestArc: "Return to Shiganshina Arc",
    favoriteQuote: "If you win, you live. If you lose, you die. If you don't fight, you can't win!",
    whyILoveIt: "The depth of plot, complex political philosophies, moral gray zones, and unmatched foreshadowing that keeps you thinking for months.",
    watchStatus: "Completed",
    totalEpisodes: 87,
    episodesWatched: 87,
    myReview: "A modern masterpiece of storytelling. Titan is a narrative miracle that starts as an action survival show and transforms into a deep philosophical discourse on freedom."
  },
  {
    id: "anime-3",
    title: "Jujutsu Kaisen",
    poster: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=400&auto=format&fit=crop",
    rating: 9.6,
    favoriteCharacter: "Satoru Gojo",
    bestArc: "Shibuya Incident Arc",
    favoriteQuote: "Don't worry, I'm the strongest.",
    whyILoveIt: "Top-tier fighting choreography, highly creative power systems (domain expansions), and gorgeous visual production by MAPPA.",
    watchStatus: "Completed",
    totalEpisodes: 47,
    episodesWatched: 47,
    myReview: "The Shibuya incident arc is easily one of the greatest arcs in anime history. High-stakes, intense, and emotionally draining in the best possible way."
  },
  {
    id: "anime-4",
    title: "Demon Slayer",
    poster: "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?q=80&w=400&auto=format&fit=crop",
    rating: 9.3,
    favoriteCharacter: "Zenitsu Agatsuma",
    bestArc: "Entertainment District Arc",
    favoriteQuote: "Move forward! Even if you only crawl, move forward!",
    whyILoveIt: "Visual aesthetics that resemble painting-in-motion. Ufotable sets the absolute gold standard for CGI integration in action sequences.",
    watchStatus: "Completed",
    totalEpisodes: 55,
    episodesWatched: 55,
    myReview: "The narrative is simple but classic, but the technical execution—lighting, frame-by-frame details, and animation flow—is completely breathtaking."
  }
];

export const initialMovies = [
  { id: "mov-1", title: "Interstellar", category: "Sci-Fi", rating: 10, review: "A monumental cinematic journey exploring love, time, gravity, and human resilience. Hans Zimmer's organ score is hauntingly beautiful." },
  { id: "mov-2", title: "Inception", category: "Sci-Fi", rating: 9.5, review: "A brilliant heist movie built on recursive dream architecture. Incredibly clean direction and iconic visual set pieces." },
  { id: "mov-3", title: "The Dark Knight", category: "Action/Thriller", rating: 9.8, review: "The gold standard of superhero movies. Heath Ledger's performance is legendary, posing deep moral questions about order and chaos." },
  { id: "mov-4", title: "Spider-Man: Into the Spider-Verse", category: "Marvel", rating: 9.7, review: "A visual marvel that redefined modern animated cinema. Combines street art aesthetics with comic book pacing perfectly." }
];

export const initialTravel: TravelDestination[] = [
  {
    id: "travel-1",
    placeName: "Kyoto",
    country: "Japan",
    visitedDate: "Planned Oct 2026",
    coordinates: [35.0116, 135.7681],
    gallery: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=400&auto=format&fit=crop"
    ],
    expenses: 0,
    story: "Planning to visit the Fushimi Inari shrines and capture Kyoto's traditional architecture during the autumn foliage.",
    isWishlist: true
  },
  {
    id: "travel-2",
    placeName: "Manali & Solang Valley",
    country: "India",
    visitedDate: "Jan 2025",
    coordinates: [32.2396, 77.1887],
    gallery: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=400&auto=format&fit=crop"
    ],
    expenses: 15000,
    story: "A winter gateway with college friends. Witnessed fresh snowfall, went paragliding in Solang Valley, and explored Old Manali cafe culture.",
    isWishlist: false
  },
  {
    id: "travel-3",
    placeName: "Goa Coastline",
    country: "India",
    visitedDate: "Nov 2024",
    coordinates: [15.2993, 74.1240],
    gallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop"
    ],
    expenses: 12000,
    story: "Rode scooters across South Goa, watched sunsets at Palolem beach, and visited the old Portuguese cathedrals in Panaji.",
    isWishlist: false
  }
];

export const initialExpenses: Expense[] = [
  { category: "Food", amount: 4500, month: "2026-06" },
  { category: "Travel", amount: 2500, month: "2026-06" },
  { category: "Shopping", amount: 3000, month: "2026-06" },
  { category: "Subscriptions", amount: 999, month: "2026-06" },
  { category: "Education", amount: 1500, month: "2026-06" },
  { category: "Miscellaneous", amount: 800, month: "2026-06" },
  
  { category: "Food", amount: 4100, month: "2026-05" },
  { category: "Travel", amount: 3200, month: "2026-05" },
  { category: "Shopping", amount: 1800, month: "2026-05" },
  { category: "Subscriptions", amount: 999, month: "2026-05" },
  { category: "Education", amount: 1500, month: "2026-05" },
  { category: "Miscellaneous", amount: 1100, month: "2026-05" }
];

export const initialEarnings: Earning[] = [
  { source: "Freelancing", amount: 22000, month: "2026-06" },
  { source: "Scholarships", amount: 5000, month: "2026-06" },
  { source: "Internship", amount: 12000, month: "2026-06" },
  
  { source: "Freelancing", amount: 18000, month: "2026-05" },
  { source: "Scholarships", amount: 5000, month: "2026-05" },
  { source: "Internship", amount: 12000, month: "2026-05" }
];

export const initialBlogs: Blog[] = [
  {
    id: "blog-1",
    title: "Mastering Framer Motion in Next.js App Router",
    slug: "mastering-framer-motion-nextjs",
    summary: "A practical guide to implementing flawless page transitions, shared layout animations, and interactive hover effects in modern Next.js environments.",
    content: `
# Mastering Framer Motion in Next.js

Framer Motion is a production-ready motion library for React that makes it incredibly simple to implement premium, fluid micro-interactions and transitions. In this post, we'll cover key strategies to integrate Framer Motion with the Next.js App Router.

## 1. The "use client" Directive
Since Framer Motion relies heavily on React Context and browser-side render loops (like \`requestAnimationFrame\`), components wrapping Framer Motion features must be declared as Client Components:

\`\`\`tsx
"use client";

import { motion } from "framer-motion";

export default function SmoothCard() {
  return (
    <motion.div 
      whileHover={{ scale: 1.05, y: -5 }}
      className="p-6 glass-panel rounded-xl"
    >
      <h3>Hover Me</h3>
    </motion.div>
  );
}
\`\`\`

## 2. Layout Animations
One of Framer Motion's strongest features is the \`layout\` prop. By simply adding \`layout\` to a motion element, it automatically animates physical layout shifts (e.g. changing widths, flexing, or appending items to lists):

\`\`\`tsx
<motion.div layout className="card-container">
  {items.map(item => (
    <motion.div layout key={item.id} className="item">
      {item.name}
    </motion.div>
  ))}
</motion.div>
\`\`\`

## 3. Performance Tips
- Use \`LazyMotion\` to reduce initial bundle sizes.
- Rely on hardware-accelerated properties: \`transform\` (x, y, scale, rotate) and \`opacity\`. Avoid animating layout properties like \`width\`, \`height\`, \`top\`, and \`left\` whenever possible to prevent browser layout thrashing.
    `,
    category: "Development",
    tags: ["NextJS", "Framer Motion", "CSS", "Frontend"],
    publishedAt: "2026-06-25",
    likes: 84,
    views: 412,
    commentsCount: 8
  },
  {
    id: "blog-2",
    title: "Building IoT mesh networks with ESP32 & LoRa",
    slug: "esp32-lora-mesh-networks",
    summary: "How to configure low-power ESP32 nodes to communicate without cellular/WiFi coverage, establishing encrypted mesh networks over miles.",
    content: `
# Decoupled Mesh Networks with ESP32 and LoRa

In remote fields or tactical operations, connectivity is often non-existent. This guide outlines how to build an encrypted LoRa (Long Range) mesh network using cheap ESP32 microcontrollers.

## Hardware List
1. ESP32 Development Board (e.g. Heltec WiFi LoRa 32 V3)
2. LoRa Antenna (matching regional frequencies: 433MHz, 868MHz, or 915MHz)
3. LiPo Battery (3.7V for standalone telemetry operations)

## Architectural Concept
Each node acts as both a transmitter and a relay repeater. If Node A wants to send a packet to Node C, but Node C is out of range, the packet is automatically hopped through Node B.

\`\`\`
[Node A] ===(LoRa RF)===> [Node B (Relay)] ===(LoRa RF)===> [Node C]
\`\`\`

## Software Library Selection
We utilize the \`RadioLib\` library for hardware transceiver control and custom routing algorithms for packets forwarding. For encryption, AES-256 blocks are packaged inside payloads to avoid unauthorized listening.
    `,
    category: "IoT",
    tags: ["ESP32", "LoRa", "C++", "Hardware"],
    publishedAt: "2026-05-12",
    likes: 56,
    views: 290,
    commentsCount: 3
  }
];
