"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LandingScreenProps {
  onEnter: () => void;
  isExiting: boolean;
}

export default function LandingScreen({ onEnter, isExiting }: LandingScreenProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Stage transition timers
    const timer1 = setTimeout(() => setPhase(1), 2000); // Fades in second sentence
    const timer2 = setTimeout(() => setPhase(2), 4800); // Fades in third sentence
    const timer3 = setTimeout(() => setPhase(3), 7500); // Materializes launch panel

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black select-none pointer-events-auto"
      style={{ pointerEvents: isExiting ? "none" : "auto" }}
    >
      {/* Dim space background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,8,22,0.6)_0%,rgba(0,0,0,1)_80%)]" />

      {/* Cinematic grid watermark */}
      <div className="absolute inset-8 border border-white/[0.015] pointer-events-none rounded-xl" />

      <div className="relative z-10 flex flex-col items-center justify-center max-w-xl w-full px-6 text-center min-h-[180px]">
        <AnimatePresence mode="wait">
          {phase === 0 && (
            <motion.h1
              key="phase-0"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-lg md:text-xl font-display font-light uppercase tracking-[0.4em] text-white/95"
            >
              Welcome, Explorer.
            </motion.h1>
          )}

          {phase === 1 && (
            <motion.h1
              key="phase-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-lg md:text-xl font-display font-light uppercase tracking-[0.3em] text-white/90 leading-relaxed"
            >
              Every universe tells <br />
              <span className="font-semibold text-blue-400">a story.</span>
            </motion.h1>
          )}

          {phase === 2 && (
            <motion.h1
              key="phase-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-lg md:text-xl font-display font-light uppercase tracking-[0.3em] text-white/90 leading-relaxed"
            >
              This one tells <br />
              <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-200 to-purple-400">
                mine.
              </span>
            </motion.h1>
          )}

          {phase === 3 && (
            <motion.div
              key="phase-3"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="flex flex-col items-center space-y-8"
            >
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-[0.35em] text-blue-400 font-display font-bold">
                  CareerVerse // System Initialization
                </p>
                <h2 className="text-3xl font-light font-display tracking-tight text-white leading-tight">
                  Galaxy Engine Ready
                </h2>
              </div>

              {/* Launcher CTA */}
              <button
                onClick={onEnter}
                className="group relative px-10 py-4 rounded-full text-xs font-display tracking-[0.25em] font-bold text-white uppercase transition-all duration-500 hover:scale-105 active:scale-95 overflow-hidden"
              >
                {/* Neon glow button border */}
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="absolute inset-0 border border-white/10 rounded-full group-hover:border-cyan-400/50 transition-colors duration-500" />
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-out" />

                <span className="relative z-10 flex items-center gap-3">
                  Warp to Console
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
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

      {/* Retro corner ticks */}
      <div className="absolute top-8 left-8 w-3 h-3 border-t border-l border-white/10" />
      <div className="absolute top-8 right-8 w-3 h-3 border-t border-r border-white/10" />
      <div className="absolute bottom-8 left-8 w-3 h-3 border-b border-l border-white/10" />
      <div className="absolute bottom-8 right-8 w-3 h-3 border-b border-r border-white/10" />
    </motion.div>
  );
}
