"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HelpCircle, Sparkles } from "lucide-react";
import LandingScreen from "@/components/LandingScreen";
import Navbar from "@/components/Navbar";
import UniverseCanvas from "@/components/UniverseCanvas";
import MilestoneDetail from "@/components/MilestoneDetail";
import RecruiterDashboard from "@/components/RecruiterDashboard";
import ContactPanel from "@/components/ContactPanel";
import { Milestone } from "@/data/milestones";

export default function Home() {
  const [gameState, setGameState] = useState<"landing" | "entering" | "active">("landing");
  const [viewMode, setViewMode] = useState<"home" | "universe" | "recruiter" | "contact">("home");
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [showTutorial, setShowTutorial] = useState(false);

  // Auto-dismiss tutorial after some time when universe becomes active
  useEffect(() => {
    if (gameState === "active") {
      setShowTutorial(true);
      const timer = setTimeout(() => setShowTutorial(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [gameState]);

  const handleEnterUniverse = () => {
    setGameState("entering");
    // Wait for the cinematic zoom and star expand to finish
    setTimeout(() => {
      setGameState("active");
      setViewMode("universe");
    }, 1800);
  };

  const handleViewChange = (newView: "home" | "universe" | "recruiter" | "contact") => {
    setViewMode(newView);
    setSelectedMilestone(null); // Clear selected milestone on navigation
  };

  const handleMilestoneSelect = (milestone: Milestone | null) => {
    setSelectedMilestone(milestone);
    if (milestone) {
      setViewMode("universe"); // Return to universe view to frame the star
    }
  };

  return (
    <main className="relative w-full h-full min-h-screen bg-black overflow-hidden select-none font-sans text-white">
      {/* 3D Canvas Engine running in background */}
      <UniverseCanvas
        selectedMilestone={selectedMilestone}
        onMilestoneSelect={handleMilestoneSelect}
        viewMode={viewMode}
        gameState={gameState}
      />

      {/* Cinematic Landing Overlay */}
      <AnimatePresence>
        {gameState !== "active" && (
          <LandingScreen
            onEnter={handleEnterUniverse}
            isExiting={gameState === "entering"}
          />
        )}
      </AnimatePresence>

      {/* Main UI Overlays (Visible only when universe is active) */}
      {gameState === "active" && (
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between">
          {/* Top Navbar */}
          <Navbar currentView={viewMode} onViewChange={handleViewChange} />

          {/* Left branding logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute top-7 left-8 flex items-center gap-2 pointer-events-none"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)] animate-pulse" />
            <h1 className="text-sm font-display tracking-[0.25em] font-bold text-white uppercase select-none">
              Orbitfolio
            </h1>
          </motion.div>

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
                    Constellation Map Active
                  </span>
                </div>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-light font-display tracking-tight leading-tight text-white mb-4">
                  Welcome to my <br />
                  <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-200 to-purple-400">
                    Interactive Galaxy.
                  </span>
                </h2>
                <p className="text-xs sm:text-sm text-white/50 font-light max-w-sm leading-relaxed mb-6">
                  Select a star in the constellation or launch Recruiter Mode to scan professional records.
                </p>
                <button
                  onClick={() => setViewMode("universe")}
                  className="px-6 py-2.5 rounded-full border border-white/10 bg-white/3 hover:bg-white/10 hover:border-white/20 text-xs font-display tracking-widest font-semibold uppercase transition-all duration-300 pointer-events-auto active:scale-95"
                >
                  Explore Universe
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

          {/* Interactive Floating Details Drawer */}
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

          {/* Contact Panel Card Overlay */}
          <AnimatePresence>
            {viewMode === "contact" && (
              <ContactPanel onClose={() => setViewMode("universe")} />
            )}
          </AnimatePresence>

          {/* Bottom copyright coordinates banner */}
          <div className="absolute bottom-6 left-8 text-[9px] font-display text-white/20 tracking-widest pointer-events-none select-none">
            RA: 14H 15M 39.7S // DEC: +19° 10&apos; 56.8&quot;
          </div>
          <div className="absolute bottom-6 right-8 text-[9px] font-display text-white/20 tracking-widest pointer-events-none select-none">
            © {new Date().getFullYear()} ORBITFOLIO // SYSTEM ACTIVE
          </div>
        </div>
      )}
    </main>
  );
}
