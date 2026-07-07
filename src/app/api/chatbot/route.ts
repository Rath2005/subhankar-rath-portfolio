import { NextResponse } from 'next/server';
import { getProfile, getProjects, getSkills, getTimeline } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Load actual context data from the DB/Fallback client
    const profile = await getProfile();
    const projects = await getProjects();
    const skills = await getSkills();
    const timeline = await getTimeline();

    // Check if an AI API key is configured (production mode)
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    
    if (GEMINI_API_KEY) {
      // Production AI Chat via Google Gemini API
      try {
        const prompt = `
          You are the personal AI Assistant of Subhankar Rath, a Senior Full Stack Developer, AI Enthusiast, and ECE Student.
          Answer questions about him professionally, intelligently, and enthusiastically. Use first-person ("Subhankar did X") or representing him ("Subhankar is highly skilled in...").
          
          Here is his profile information:
          - Name: ${profile.name}
          - Title: ${profile.title}
          - Biography: ${profile.bio}
          - Social links: ${JSON.stringify(profile.socials)}
          - Current Focus: ${profile.lifeStats?.currentFocus}
          
          Here are his projects:
          ${projects.map((p: any) => `- ${p.name}: ${p.description}. Tech stack: ${p.techStack.join(', ')}. Status: ${p.status}.`).join('\n')}
          
          Here are his key skills:
          ${skills.map((s: any) => `- ${s.name} (${s.category}): Level ${s.level}%`).join('\n')}
          
          Here is his journey timeline:
          ${timeline.map((t: any) => `- Year ${t.year}: ${t.title} (${t.subtitle}) - ${t.description}`).join('\n')}

          User Question: "${message}"
          Keep your response concise, friendly, and structured. Do not make up facts.
        `;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        });

        const data = await response.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (reply) {
          return NextResponse.json({ reply });
        }
      } catch (err) {
        console.error("Gemini API call failed, falling back to local engine.", err);
      }
    }

    // ----------------------------------------------------
    // LOCAL SMART KEYWORD MATCHING ENGINE (FALLBACK)
    // ----------------------------------------------------
    const msg = message.toLowerCase();
    let reply = "";

    if (msg.includes('project') || msg.includes('build') || msg.includes('portfolio')) {
      reply = `Subhankar has built several impressive projects:
1. **AI Interview Preparation Platform**: Uses LLMs and WebRTC for live adaptive audio/video simulations.
2. **Logistics Management Platform**: Features A* pathfinding, real-time dispatch calculations, and map renders.
3. **Battlefield IoT Security System**: Uses ESP32, LoRa, and AES-256 for secure, off-grid telemetry tracking.
4. **Netflix Clone**: Custom UI using TMDB API integrations.

You can inspect full challenges, tech stacks, and architecture diagrams in the **Projects** widget!`;
    } 
    else if (msg.includes('skill') || msg.includes('tech') || msg.includes('code') || msg.includes('programming') || msg.includes('stack')) {
      const topSkills = skills.slice(0, 8).map((s: any) => s.name).join(', ');
      reply = `Subhankar is a full stack developer with expertise across:
- **Frontend**: React, Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, and Three.js / React Three Fiber.
- **Backend & DB**: Node.js, Express, Next Route Handlers, WebSockets, WebRTC, MongoDB, PostgreSQL, and Redis caching.
- **IoT & AI**: ESP32 C++ firmware, Gemini/OpenAI API integrations, Vector DBs, and AWS cloud deploys.

Some of his top skills include: ${topSkills}. Open the **Tech Stack** widget to see his interactive skill tree!`;
    } 
    else if (msg.includes('education') || msg.includes('college') || msg.includes('school') || msg.includes('study') || msg.includes('silicon')) {
      reply = `Subhankar is currently pursuing a **Bachelor of Technology (B.Tech) in Electronics and Communication Engineering (ECE)** at Silicon Institute of Technology (2022 - 2026). Prior to this, he completed secondary school at **DAV Public School** (2019 - 2021). You can view his interactive journey timeline in the **About & Story** widget!`;
    } 
    else if (msg.includes('anime') || msg.includes('solo leveling') || msg.includes('naruto') || msg.includes('manga')) {
      reply = `Subhankar is a massive anime fan! His favorites include **Solo Leveling** (favorite character: Sung Jin-Woo), **Attack on Titan** ( Levi Ackerman), **Jujutsu Kaisen** (Satoru Gojo), and **Demon Slayer**.
He actually built a dedicated **Anime Universe** tracker widget (click the sparkles icon in the Dock) featuring episode trackers, character quotes, and custom neon review cards. Go check it out!`;
    } 
    else if (msg.includes('travel') || msg.includes('visit') || msg.includes('trip')) {
      reply = `Subhankar loves traveling! He recently visited **Manali & Solang Valley** (went paragliding and experienced snowfall in Jan 2025) and explored the **Goa Coastline** in Nov 2024. He also has **Kyoto, Japan** in his travel wishlist for Oct 2026.
Open the **Travel Diary** widget to view his interactive travels, expense logs, and wishlists!`;
    } 
    else if (msg.includes('contact') || msg.includes('email') || msg.includes('linkedin') || msg.includes('github') || msg.includes('reach')) {
      reply = `You can easily connect with Subhankar!
- **Email**: ${profile.socials.email}
- **LinkedIn**: [LinkedIn Profile](${profile.socials.linkedin})
- **GitHub**: [GitHub Profile](${profile.socials.github})
- **WhatsApp**: [Chat directly](${profile.socials.whatsapp})

You can also send a message via the contact form or schedule a Google Calendar booking directly in the **Contact** widget!`;
    }
    else if (msg.includes('finance') || msg.includes('expense') || msg.includes('earn') || msg.includes('money')) {
      reply = `Subhankar monitors his finances using a custom-built dashboard. In June 2026, he logged earnings from freelancing, scholarships, and internships, offset by expenses in food, travel, shopping, and subscriptions.
Check out the **Finance Hub** widget in the dock to view animated bar/pie charts and comparisons!`;
    }
    else if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('who are you')) {
      reply = `Hello! I am Subhankar Rath's AI Assistant. I can tell you about his development projects, engineering journey, skills tree, travel logs, favorite anime, or how to contact him. 

Try asking me: "What projects has he built?" or "Where does he study?"`;
    } 
    else {
      reply = `That's an interesting question! Subhankar Rath is an ECE student & Full Stack Engineer who loves Next.js, AI integrations, IoT, and anime (like Solo Leveling).

To learn more, I recommend opening the widgets in the bottom dock:
- **About & Story** (profile info & journey)
- **Projects** (interactive showcase & architecture diagrams)
- **Tech Stack** (interactive skills tree)
- **Travel Diary** / **Anime Universe** (hobbies)`;
    }

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('Chatbot API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
