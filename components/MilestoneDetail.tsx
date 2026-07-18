"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Compass, ArrowRight } from "lucide-react";
import { Milestone } from "@/data/milestones";

interface MilestoneDetailProps {
  milestone: Milestone | null;
  onClose: () => void;
}

export default function MilestoneDetail({ milestone, onClose }: MilestoneDetailProps) {
  return (
    <AnimatePresence>
      {milestone && (
        <div className="absolute inset-0 z-30 pointer-events-none flex justify-end items-end sm:items-stretch p-4 sm:p-6 md:p-8">
          {/* Backdrop dimming overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/30 backdrop-blur-[2px] pointer-events-auto cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative z-10 w-full sm:w-[420px] max-h-[75vh] sm:max-h-none h-auto sm:h-full flex flex-col glass-panel-glow rounded-3xl sm:rounded-2xl border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] pointer-events-auto overflow-hidden"
          >
            {/* Top header glow border strip */}
            <div
              className="h-1.5 w-full shrink-0"
              style={{
                background: `linear-gradient(90deg, transparent, ${milestone.color}, transparent)`,
              }}
            />

            {/* Scrollable Content Container */}
            <div className="flex-1 overflow-y-auto px-6 py-8 md:px-8 custom-scrollbar">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full border border-white/5 bg-white/3 hover:bg-white/10 text-white/70 hover:text-white transition-colors duration-300 active:scale-95"
              >
                <X size={16} />
              </button>

              {/* Subtitle / Timeline Tag */}
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="w-2.5 h-2.5 rounded-full animate-pulse-glow"
                  style={{
                    backgroundColor: milestone.color,
                    boxShadow: `0 0 10px ${milestone.color}`,
                  }}
                />
                <span className="text-[10px] font-display tracking-[0.25em] uppercase text-blue-400 font-bold">
                  {milestone.subtitle}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-semibold font-display tracking-tight text-white mb-2 pr-8 leading-tight">
                {milestone.title}
              </h2>

              {/* Date Badge */}
              <div className="flex items-center gap-2 text-white/50 text-xs font-display mb-6">
                <Calendar size={13} className="text-indigo-400" />
                <span>{milestone.date}</span>
              </div>

              {/* Description */}
              <p className="text-white/80 text-sm leading-relaxed mb-6 font-light">
                {milestone.description}
              </p>

              {/* Tech Stack / Skills Grid */}
              <div className="mb-8">
                <h3 className="text-xs font-display tracking-[0.15em] uppercase text-white/60 font-semibold mb-3">
                  Technologies Utilized
                </h3>
                <div className="flex flex-wrap gap-2">
                  {milestone.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-white/[0.04] border border-white/5 text-white/90 shadow-[0_2px_10px_rgba(0,0,0,0.2)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Accomplishment Highlights */}
              <div>
                <h3 className="text-xs font-display tracking-[0.15em] uppercase text-white/60 font-semibold mb-3">
                  Key Accomplishments
                </h3>
                <ul className="space-y-3.5">
                  {milestone.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-white/80 leading-relaxed font-light">
                      <ArrowRight size={14} className="text-blue-400 mt-1 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Panel Actions */}
            <div className="p-6 shrink-0 border-t border-white/5 bg-black/40 flex items-center justify-between">
              <button
                onClick={onClose}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-display tracking-[0.1em] text-white/60 hover:text-white transition-colors duration-300"
              >
                <Compass size={14} />
                Orbit Out
              </button>

              <div className="text-[10px] text-white/30 font-display tracking-[0.1em]">
                ORBITFOLIO // V1.0
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
