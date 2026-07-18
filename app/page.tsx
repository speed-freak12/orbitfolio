"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, HelpCircle } from "lucide-react";
import LandingScreen from "@/components/LandingScreen";
import UniverseCanvas from "@/components/UniverseCanvas";
import HolographicHud from "@/components/HolographicHud";
import AiTerminal from "@/components/AiTerminal";
import ContactPanel from "@/components/ContactPanel";
import { CareerEntity, careerEntities } from "@/data/milestones";
import { sound } from "@/utils/sound";

export default function Home() {
  const [gameState, setGameState] = useState<"landing" | "entering" | "active">("landing");
  const [viewMode, setViewMode] = useState<"home" | "universe" | "recruiter" | "contact">("home");
  const [selectedEntity, setSelectedEntity] = useState<CareerEntity | null>(null);
  const [warpActive, setWarpActive] = useState(false);
  const [showAiTerminal, setShowAiTerminal] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  // Auto-dismiss tutorial after active state
  useEffect(() => {
    if (gameState === "active") {
      setShowTutorial(true);
      const timer = setTimeout(() => setShowTutorial(false), 5500);
      return () => clearTimeout(timer);
    }
  }, [gameState]);

  // Key listeners for 'hello' easter egg spelling and spacebar warp drive
  useEffect(() => {
    let keyBuffer = "";

    const handleKeyDown = (e: KeyboardEvent) => {
      // Space warp speed trigger
      if (e.code === "Space" && gameState === "active") {
        // Prevent default spacebar page scrolling
        e.preventDefault();
        setWarpActive(true);
      }

      // Escape key return trigger
      if (e.code === "Escape" && gameState === "active") {
        e.preventDefault();
        setSelectedEntity(null);
        sound.playReturn();
      }

      // Check for typing 'hello'
      keyBuffer += e.key.toLowerCase();
      if (keyBuffer.length > 15) {
        keyBuffer = keyBuffer.substring(keyBuffer.length - 8);
      }
      if (keyBuffer.endsWith("hello")) {
        setShowAiTerminal(true);
        sound.playSelect();
        keyBuffer = "";
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        setWarpActive(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameState]);

  const handleEnterUniverse = () => {
    setGameState("entering");
    sound.playClick();
    sound.playAmbient(); // start low-hum space drone synth
    // Wait for camera flight zoom inside star core to finish
    setTimeout(() => {
      setGameState("active");
      setViewMode("universe");
    }, 1800);
  };

  const handleViewChange = (newView: "home" | "universe" | "recruiter" | "contact") => {
    setViewMode(newView);
    setSelectedEntity(null);
    sound.playSelect();
  };

  const handleEntitySelect = (entity: CareerEntity | null) => {
    setSelectedEntity(entity);
    if (entity) {
      sound.playSelect();
      if (entity.type === "satellite") {
        setViewMode("contact");
      } else {
        setViewMode("universe");
      }
    } else {
      sound.playReturn();
    }
  };

  return (
    <main className="relative w-full h-full min-h-screen bg-black overflow-hidden select-none font-sans text-white">
      {/* 3D Cosmic Space Canvas */}
      <UniverseCanvas
        selectedEntity={selectedEntity}
        onEntitySelect={handleEntitySelect}
        viewMode={viewMode}
        gameState={gameState}
        warpActive={warpActive}
      />

      {/* Cinematic Typing Intro */}
      <AnimatePresence>
        {gameState !== "active" && (
          <LandingScreen
            onEnter={handleEnterUniverse}
            isExiting={gameState === "entering"}
          />
        )}
      </AnimatePresence>

      {/* Volumetric HUD Layer */}
      {gameState === "active" && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          {/* Main Iron Man HUD elements */}
          <HolographicHud
            selectedEntity={selectedEntity}
            onEntitySelect={handleEntitySelect}
            viewMode={viewMode}
            onViewChange={handleViewChange}
          />

          {/* Floating welcome watermark when home */}
          <AnimatePresence>
            {viewMode === "home" && !selectedEntity && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
              >
                <div className="flex items-center gap-1.5 mb-3 px-3 py-1 rounded-full border border-white/5 bg-white/2 backdrop-blur-md">
                  <Sparkles size={11} className="text-cyan-400" />
                  <span className="text-[9px] font-display font-semibold uppercase tracking-[0.2em] text-cyan-400">
                    Telemetry Coordinates Online
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light font-display tracking-tight leading-tight text-white mb-6">
                  WELCOME, COGNITIVE EXPLORER. <br />
                  <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-200 to-purple-400 drop-shadow-[0_0_30px_rgba(96,165,250,0.2)]">
                    INITIALIZE SCAN PROTOCOLS.
                  </span>
                </h2>
                <button
                  onClick={() => setViewMode("universe")}
                  className="px-8 py-3 rounded-full border border-cyan-400/20 bg-cyan-950/20 hover:bg-cyan-500/10 hover:border-cyan-400/50 text-[10px] font-display tracking-widest font-semibold uppercase transition-all duration-300 pointer-events-auto active:scale-95 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.15)]"
                >
                  Engage Star System
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Keyboard Triggered AI Assistant Terminal */}
          <AnimatePresence>
            {showAiTerminal && (
              <AiTerminal
                onClose={() => setShowAiTerminal(false)}
                onWarpToggle={() => {
                  setWarpActive(true);
                  setTimeout(() => setWarpActive(false), 2500);
                }}
              />
            )}
          </AnimatePresence>

          {/* Contact Encrypted Form overlay */}
          <AnimatePresence>
            {viewMode === "contact" && (
              <ContactPanel onClose={() => setViewMode("universe")} />
            )}
          </AnimatePresence>

          {/* Floating HUD Instruction Tutorial */}
          <AnimatePresence>
            {showTutorial && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-2.5 px-4.5 py-3 rounded-xl glass-panel border-cyan-500/10 text-[9px] sm:text-xs font-display tracking-[0.1em] text-cyan-300/80 shadow-[0_0_15px_rgba(34,211,238,0.1)]"
              >
                <HelpCircle size={14} className="text-cyan-400 animate-bounce" />
                <span>Drag to pan galaxy. Click nodes to travel. Type &quot;hello&quot; on keyboard to unlock console.</span>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      )}
    </main>
  );
}
