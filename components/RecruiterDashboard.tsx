"use client";

import { motion } from "framer-motion";
import { Download, Briefcase, Award, GraduationCap, ChevronRight } from "lucide-react";
import { Milestone, milestones } from "@/data/milestones";

interface RecruiterDashboardProps {
  selectedMilestone: Milestone | null;
  onMilestoneSelect: (milestone: Milestone | null) => void;
  onClose: () => void;
}

export default function RecruiterDashboard({
  selectedMilestone,
  onMilestoneSelect,
  onClose,
}: RecruiterDashboardProps) {
  const handleDownloadResume = () => {
    // Standard resume download placeholder simulation
    const resumeText = `ORBITFOLIO - CREATIVE TECHNOLOGIST RESUME
========================================
Profile: Creative Technologist specializing in 3D web applications, AI integration, and immersive UI/UX systems.

Experience Highlights:
- TechWale Professional Experience (2022 - 2023)
- Software Internship (2022)
- AI & Deep Tech Projects (2023 - Present)
- Hackathon Winner & Open Source Contributor

Skills: React, Next.js, Three.js, WebGL, TypeScript, Tailwind CSS, Node.js, Python, AWS

Visit my 3D Orbitfolio at: https://orbitfolio.dev
`;
    const blob = new Blob([resumeText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Creative_Technologist_Resume.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const metrics = [
    { label: "Experience", value: "4+ Years" },
    { label: "Core Stack", value: "Next.js / TS" },
    { label: "3D Graphics", value: "Three.js / WebGL" },
  ];

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 180 }}
      className="absolute right-0 top-0 bottom-0 z-30 w-full sm:w-[480px] p-6 pt-24 pb-8 flex flex-col pointer-events-auto"
    >
      <div className="flex-1 flex flex-col glass-panel-glow rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden">
        {/* Top Header */}
        <div className="px-6 py-5 border-b border-white/5 bg-black/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase size={18} className="text-blue-400" />
            <h2 className="text-base font-display tracking-[0.15em] uppercase font-bold text-white">
              Recruiter Hub
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-[10px] font-display tracking-widest text-white/50 hover:text-white transition-colors duration-300"
          >
            CLOSE
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {/* Quick Pitch */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold font-display text-white">
              Creative Technologist
            </h3>
            <p className="text-xs text-white/70 leading-relaxed font-light">
              Specialized in developing interactive 3D frontend scenes, advanced AI workflow systems, and responsive full-stack applications. Bridging high-fidelity design with scalable codebase performance.
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-3 gap-2.5">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="px-3 py-2 rounded-xl bg-white/[0.02] border border-white/5 text-center shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
              >
                <div className="text-xs font-semibold text-white/95">{metric.value}</div>
                <div className="text-[9px] font-display uppercase tracking-wider text-white/40 mt-0.5">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div>
            <button
              onClick={handleDownloadResume}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-xs font-display tracking-[0.15em] uppercase font-semibold text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] active:scale-[0.98]"
            >
              <Download size={14} />
              Download Resume / CV
            </button>
          </div>

          {/* Interactive Timetable list */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-display tracking-[0.2em] uppercase text-white/40 font-bold mb-2">
              Career Timeline Navigator
            </h4>
            <div className="space-y-2">
              {milestones.map((milestone) => {
                const isActive = selectedMilestone?.id === milestone.id;
                
                return (
                  <button
                    key={milestone.id}
                    onClick={() => onMilestoneSelect(isActive ? null : milestone)}
                    className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-300 flex items-center justify-between group shadow-[0_2px_8px_rgba(0,0,0,0.1)] ${
                      isActive
                        ? "bg-indigo-950/40 border-indigo-400/60 shadow-[0_0_12px_rgba(99,102,241,0.2)]"
                        : "bg-white/[0.01] border-white/5 hover:border-white/20 hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: milestone.color }}
                        />
                        <span className="text-xs font-semibold text-white/90 group-hover:text-white transition-colors duration-300">
                          {milestone.title}
                        </span>
                      </div>
                      <div className="text-[10px] text-white/40 font-light pl-3.5">
                        {milestone.subtitle} | {milestone.date}
                      </div>
                    </div>
                    
                    <ChevronRight
                      size={14}
                      className={`text-white/30 group-hover:text-white transition-all duration-300 ${
                        isActive ? "rotate-90 text-indigo-400" : "group-hover:translate-x-1"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer info banner */}
        <div className="px-6 py-4 border-t border-white/5 bg-black/40 text-[9px] font-display text-white/30 tracking-widest text-center">
          CLICK TIMELINE BUTTON TO FLY TO 3D STAR
        </div>
      </div>
    </motion.div>
  );
}
