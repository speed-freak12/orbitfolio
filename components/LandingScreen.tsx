"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

interface LandingScreenProps {
  onEnter: () => void;
  isExiting: boolean;
}

export default function LandingScreen({ onEnter, isExiting }: LandingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Initializing System Core...");

  useEffect(() => {
    // Dynamic progressive loader simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        
        // Random increments to make it feel organic and realistic
        const increment = Math.floor(Math.random() * 5) + 2;
        const next = Math.min(prev + increment, 100);

        // Update status text based on progress thresholds
        if (next < 20) {
          setStatusText("Initializing Universe...");
        } else if (next < 45) {
          setStatusText("Loading Stellar Objects...");
        } else if (next < 70) {
          setStatusText("Synchronizing Navigation...");
        } else if (next < 90) {
          setStatusText("Preparing Mission...");
        } else {
          setStatusText("Entering Portfolio...");
        }

        return next;
      });
    }, 85);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black select-none pointer-events-auto"
      style={{ pointerEvents: isExiting ? "none" : "auto" }}
    >
      {/* Deep cosmic space background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,8,25,0.75)_0%,rgba(0,0,0,1)_80%)]" />

      {/* Cyber grid border framework */}
      <div className="absolute inset-8 border border-white/[0.015] pointer-events-none rounded-xl" />

      <div className="relative z-10 flex flex-col items-center justify-center max-w-md w-full px-8 text-center">
        {/* Logo Title branding */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex items-center gap-3 mb-6"
        >
          {/* Custom logo mark */}
          <div className="w-5 h-5 border border-cyan-400/40 rounded-full flex items-center justify-center p-0.5 shadow-[0_0_10px_rgba(34,211,238,0.25)]">
            <div className="w-full h-full bg-cyan-400 rounded-full animate-pulse" />
          </div>
          <h1 className="text-xl font-display tracking-[0.3em] font-bold text-white uppercase">
            PortFolio
          </h1>
        </motion.div>

        {/* Loading HUD panels */}
        <div className="w-full space-y-6 bg-white/[0.01] border border-white/5 backdrop-blur-md rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          {/* Status logs */}
          <div className="space-y-1.5 text-left font-mono text-[10px] text-cyan-300">
            <div className="flex justify-between items-center text-white/50 border-b border-white/5 pb-2">
              <span>SYSTEM: ONLINE</span>
              <span>VAL: {progress}%</span>
            </div>
            <div className="pt-2 animate-pulse flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              {statusText}
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-white/5 border border-white/10 h-1.5 rounded-full overflow-hidden shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-300 shadow-[0_0_8px_rgba(99,102,241,0.6)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Enter CTA (Fades in when 100% loaded) */}
        <div className="mt-12 h-14 flex items-center justify-center">
          <AnimatePresence>
            {progress === 100 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <button
                  onClick={onEnter}
                  className="group relative px-10 py-4 rounded-full text-[10px] font-display tracking-[0.25em] font-bold text-white uppercase transition-all duration-500 hover:scale-105 active:scale-95 overflow-hidden shadow-lg"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-indigo-600/30 to-purple-600/30 blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="absolute inset-0 border border-white/10 rounded-full group-hover:border-cyan-400/50 transition-colors duration-500" />
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 ease-out" />
                  
                  <span className="relative z-10 flex items-center gap-2.5">
                    Explore My Journey
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="transform group-hover:translate-x-1.5 transition-transform duration-300"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Cyber corner border accents */}
      <div className="absolute top-8 left-8 w-3 h-3 border-t border-l border-white/15" />
      <div className="absolute top-8 right-8 w-3 h-3 border-t border-r border-white/15" />
      <div className="absolute bottom-8 left-8 w-3 h-3 border-b border-l border-white/15" />
      <div className="absolute bottom-8 right-8 w-3 h-3 border-b border-r border-white/15" />
    </motion.div>
  );
}
