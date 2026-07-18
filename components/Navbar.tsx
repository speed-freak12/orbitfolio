"use client";

import { motion } from "framer-motion";
import { Home, Compass, Briefcase, Mail } from "lucide-react";

interface NavbarProps {
  currentView: "home" | "universe" | "recruiter" | "contact";
  onViewChange: (view: "home" | "universe" | "recruiter" | "contact") => void;
}

export default function Navbar({ currentView, onViewChange }: NavbarProps) {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "universe", label: "Universe", icon: Compass },
    { id: "recruiter", label: "Recruiter Mode", icon: Briefcase },
    { id: "contact", label: "Contact", icon: Mail },
  ] as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
      className="absolute top-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-md pointer-events-auto"
    >
      <nav className="glass-panel py-2 px-3 rounded-full flex items-center justify-between gap-1 border border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className="relative flex-1 py-2.5 rounded-full flex flex-col sm:flex-row items-center justify-center gap-1.5 text-xs font-display tracking-[0.1em] font-medium transition-all duration-300 select-none group"
            >
              {/* Active Tab Background Glow */}
              {isActive && (
                <motion.span
                  layoutId="activeNavIndicator"
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-full border border-white/10 shadow-[0_0_15px_rgba(99,102,241,0.15)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              {/* Icon with glowing active state */}
              <Icon
                size={16}
                className={`transition-colors duration-300 relative z-10 ${
                  isActive
                    ? "text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]"
                    : "text-white/60 group-hover:text-white"
                }`}
              />

              {/* Text label - hidden on extra small mobile screens for clean layout */}
              <span
                className={`relative z-10 transition-colors duration-300 hidden sm:inline ${
                  isActive ? "text-white font-semibold" : "text-white/60 group-hover:text-white"
                }`}
              >
                {item.label}
              </span>

              {/* Hover Dot */}
              {!isActive && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}
            </button>
          );
        })}
      </nav>
    </motion.div>
  );
}
