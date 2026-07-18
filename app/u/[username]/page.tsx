"use client";

import React, { useState, useEffect } from "react";
import { use } from "react"; // To unwrap dynamic params in Next.js safely
import { AnimatePresence, motion } from "framer-motion";
import { HelpCircle, Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePortfolio } from "@/context/PortfolioContext";
import Navbar from "@/components/Navbar";
import UniverseCanvas from "@/components/UniverseCanvas";
import MilestoneDetail from "@/components/MilestoneDetail";
import RecruiterDashboard from "@/components/RecruiterDashboard";
import ContactPanel from "@/components/ContactPanel";
import { Milestone } from "@/data/milestones";

interface PageProps {
  params: Promise<{ username: string }>;
}

export default function UserPortfolioPage({ params }: PageProps) {
  // Unwrap params using React.use() for Next.js App Router compatibility
  const resolvedParams = use(params);
  const username = resolvedParams.username || "demo";
  
  const { milestones } = usePortfolio();
  
  const [viewMode, setViewMode] = useState<"home" | "universe" | "recruiter" | "contact">("home");
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    setShowTutorial(true);
    const timer = setTimeout(() => setShowTutorial(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleViewChange = (newView: "home" | "universe" | "recruiter" | "contact") => {
    setViewMode(newView);
    setSelectedMilestone(null);
  };

  const handleMilestoneSelect = (milestone: Milestone | null) => {
    setSelectedMilestone(milestone);
    if (milestone) {
      setViewMode("universe");
    }
  };

  const displayName = username.toUpperCase();

  return (
    <main className="relative w-full h-full min-h-screen bg-black overflow-hidden select-none font-sans text-white">
      {/* 3D Canvas Engine using milestones from context */}
      <UniverseCanvas
        selectedMilestone={selectedMilestone}
        onMilestoneSelect={handleMilestoneSelect}
        viewMode={viewMode}
        gameState="active"
      />

      {/* Main UI Overlays */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between">
        
        {/* Floating Top Navbar */}
        <Navbar currentView={viewMode} onViewChange={handleViewChange} />

        {/* Brand header logo */}
        <div className="absolute top-7 left-8 flex items-center gap-4 pointer-events-auto">
          <Link
            href="/"
            className="p-2 rounded-full border border-white/5 bg-white/2 hover:bg-white/10 hover:border-white/20 text-white/70 hover:text-white transition-colors duration-300 active:scale-95"
            title="Return to Orbitfolio Home"
          >
            <ArrowLeft size={13} />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)] animate-pulse" />
            <h1 className="text-xs font-display tracking-[0.25em] font-bold text-white uppercase select-none">
              {displayName} // ORBIT
            </h1>
          </div>
        </div>

        {/* Core branding title in home view */}
        <AnimatePresence>
          {viewMode === "home" && !selectedMilestone && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
            >
              <div className="flex items-center gap-1.5 mb-3 px-3 py-1 rounded-full border border-white/5 bg-white/2 backdrop-blur-md">
                <Sparkles size={11} className="text-cyan-400" />
                <span className="text-[9px] font-display font-semibold uppercase tracking-[0.2em] text-cyan-400">
                  Constellation Active
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-light font-display tracking-tight leading-tight text-white mb-4">
                Welcome to my <br />
                <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-200 to-purple-400 drop-shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                  Career Universe.
                </span>
              </h2>
              <p className="text-xs text-white/50 font-light max-w-sm leading-relaxed mb-6">
                Drag to rotate the galaxy. Hover over stars to read milestones, or select Recruiter Mode for a scannable summary.
              </p>
              <button
                onClick={() => setViewMode("universe")}
                className="px-6 py-2.5 rounded-full border border-white/10 bg-white/3 hover:bg-white/10 hover:border-white/20 text-xs font-display tracking-widest font-semibold uppercase transition-all duration-300 pointer-events-auto active:scale-95"
              >
                Scan Constellation
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tutorial Overlay */}
        <AnimatePresence>
          {showTutorial && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl glass-panel border-white/5 text-[10px] sm:text-xs font-display tracking-[0.1em] text-white/70"
            >
              <HelpCircle size={14} className="text-blue-400 animate-bounce" />
              <span>Hover stars to see names. Click to travel to milestones.</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interactive Detail Drawer */}
        <MilestoneDetail
          milestone={selectedMilestone}
          onClose={() => handleMilestoneSelect(null)}
        />

        {/* Recruiter Dashboard Sidebar */}
        <AnimatePresence>
          {viewMode === "recruiter" && (
            <RecruiterDashboard
              selectedMilestone={selectedMilestone}
              onMilestoneSelect={handleMilestoneSelect}
              onClose={() => setViewMode("universe")}
            />
          )}
        </AnimatePresence>

        {/* Contact form Overlay */}
        <AnimatePresence>
          {viewMode === "contact" && (
            <ContactPanel onClose={() => setViewMode("universe")} />
          )}
        </AnimatePresence>

        {/* Bottom copyright coordinates banner */}
        <div className="absolute bottom-6 left-8 text-[9px] font-display text-white/20 tracking-widest pointer-events-none select-none">
          SYSTEM ACTIVE // LATENCY: 12MS
        </div>
        <div className="absolute bottom-6 right-8 text-[9px] font-display text-white/20 tracking-widest pointer-events-none select-none">
          © {new Date().getFullYear()} ORBITFOLIO // PUBLIC PORTFOLIO
        </div>
      </div>
    </main>
  );
}
