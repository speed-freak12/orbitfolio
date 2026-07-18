"use client";

import { motion } from "framer-motion";

interface LandingScreenProps {
  onEnter: () => void;
  isExiting: boolean;
}

export default function LandingScreen({ onEnter, isExiting }: LandingScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black select-none pointer-events-auto"
      style={{ pointerEvents: isExiting ? "none" : "auto" }}
    >
      {/* Background Star Simulation for Landing */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,10,35,0.4)_0%,rgba(0,0,0,1)_80%)]" />
      
      {/* Ambient background particle elements */}
      <div className="absolute top-1/4 left-1/4 w-[2px] h-[2px] bg-white rounded-full opacity-30 animate-pulse" />
      <div className="absolute top-1/3 right-1/3 w-[1.5px] h-[1.5px] bg-blue-400 rounded-full opacity-40 animate-pulse [animation-delay:1s]" />
      <div className="absolute bottom-1/3 left-1/2 w-[2px] h-[2px] bg-purple-400 rounded-full opacity-50 animate-pulse [animation-delay:2s]" />
      <div className="absolute bottom-1/4 right-1/4 w-[1px] h-[1px] bg-white rounded-full opacity-20 animate-pulse [animation-delay:0.5s]" />

      <div className="relative z-10 flex flex-col items-center max-w-xl px-4 text-center">
        {/* Subtle decorative subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          className="text-xs uppercase tracking-[0.3em] text-blue-400 mb-6 font-display font-semibold"
        >
          Orbitfolio // Digital Odyssey
        </motion.p>

        {/* Core cinematic tagline */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.0, delay: 1.0, ease: "easeOut" }}
          className="text-4xl md:text-5xl lg:text-6xl font-light font-display tracking-tight leading-tight text-white mb-10"
        >
          Every star has <br />
          <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-200 to-purple-400">
            a story.
          </span>
        </motion.h1>

        {/* Immersive CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 2.2, ease: "easeOut" }}
        >
          <button
            onClick={onEnter}
            className="group relative px-8 py-3.5 rounded-full text-sm font-display tracking-[0.2em] font-semibold text-white/95 uppercase transition-all duration-500 hover:scale-105 active:scale-95 overflow-hidden"
          >
            {/* Hover Background Effects */}
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-indigo-600/30 to-purple-600/30 blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="absolute inset-0 border border-white/10 rounded-full group-hover:border-blue-400/40 transition-colors duration-500" />
            
            {/* Sliding highlights */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 ease-out" />

            {/* Glowing button contents */}
            <span className="relative z-10 flex items-center gap-2">
              Enter Universe
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transform group-hover:translate-x-1.5 transition-transform duration-300"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </button>
        </motion.div>
      </div>

      {/* Futuristic scanning line border overlay */}
      <div className="absolute inset-x-8 inset-y-8 border border-white/[0.02] pointer-events-none rounded-xl" />
      <div className="absolute top-8 left-8 w-4 h-[1px] bg-white/20" />
      <div className="absolute top-8 left-8 w-[1px] h-4 bg-white/20" />
      <div className="absolute top-8 right-8 w-4 h-[1px] bg-white/20" />
      <div className="absolute top-8 right-8 w-[1px] h-4 bg-white/20" />
      <div className="absolute bottom-8 left-8 w-4 h-[1px] bg-white/20" />
      <div className="absolute bottom-8 left-8 w-[1px] h-4 bg-white/20" />
      <div className="absolute bottom-8 right-8 w-4 h-[1px] bg-white/20" />
      <div className="absolute bottom-8 right-8 w-[1px] h-4 bg-white/20" />
    </motion.div>
  );
}
