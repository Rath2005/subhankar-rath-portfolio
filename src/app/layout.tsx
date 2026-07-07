import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/app/providers";
import { StatusBar } from "@/components/os/StatusBar";
import { Dock } from "@/components/os/Dock";
import { MusicPlayer } from "@/components/os/MusicPlayer";
import { Chatbot } from "@/components/shared/Chatbot";
import { CommandPalette } from "@/components/os/CommandPalette";
import { CustomCursor } from "@/components/shared/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Subhankar Rath | Digital OS & Portfolio",
  description: "Explore the premium personal operating system and digital portfolio of Subhankar Rath. Built with Next.js, Framer Motion, and Tailwind CSS.",
  keywords: ["Subhankar Rath", "Full Stack Developer", "ECE student", "Silicon Institute of Technology", "Portfolio", "OS Portfolio", "NextJS App Router"],
  authors: [{ name: "Subhankar Rath" }],
  openGraph: {
    title: "Subhankar Rath | Digital OS & Portfolio",
    description: "Explore the premium personal operating system and digital portfolio of Subhankar Rath.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-bg-primary text-slate-100 overflow-x-hidden">
        <Providers>
          {/* Custom Ambient Aurora Background */}
          <div className="aurora-bg">
            <div className="aurora-glow-1" />
            <div className="aurora-glow-2" />
            <div className="aurora-glow-3" />
          </div>

          {/* Interactive Custom Cursor */}
          <CustomCursor />

          {/* Core OS Frame Layout */}
          <StatusBar />
          
          <main className="flex-1 w-full pt-16 pb-28 px-[4vw]">
            {children}
          </main>

          <Dock />
          <MusicPlayer />
          <Chatbot />
          <CommandPalette />
        </Providers>
      </body>
    </html>
  );
}
