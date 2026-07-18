"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Compass, Briefcase, Award, GraduationCap, X, ChevronRight, Download, Sparkles, Network } from "lucide-react";
import { CareerEntity, careerEntities } from "@/data/milestones";

interface HolographicHudProps {
  selectedEntity: CareerEntity | null;
  onEntitySelect: (entity: CareerEntity | null) => void;
  viewMode: "home" | "universe" | "recruiter" | "contact";
  onViewChange: (view: "home" | "universe" | "recruiter" | "contact") => void;
}

export default function HolographicHud({
  selectedEntity,
  onEntitySelect,
  viewMode,
  onViewChange,
}: HolographicHudProps) {
  const isRecruiter = viewMode === "recruiter";

  // Simulate CV downloads
  const triggerCvDownload = () => {
    const cvContent = `CAREERVERSE QUANTUM PORTFOLIO - SUMMARY RESUME
===================================================
Profile: Creative Technologist specializing in 3D WebGL Graphics, AI Systems, and Scalable Full Stack Frontend.

Cosmic Milestones:
- Stellar Core: Core engineering frameworks (Next.js, R3F, WebGL).
- Planet WebGL: Procedural noise generation terrain models.
- Planet AI Agent: AutonomousVECTOR scanned developer pipelines.
- Space Station: Experienced Frontend Team Lead.
- Satellite Comms: direct encrypted connection port.

Find my online universe at: https://careerverse.dev
`;
    const blob = new Blob([cvContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "CareerVerse_Quant_Resume.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 md:p-8">
      {/* 1. Futuristic Scanline Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none opacity-45" />

      {/* 2. HUD Top Header */}
      <div className="w-full flex items-center justify-between pointer-events-auto">
        {/* Left Branding */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.7)] animate-pulse" />
          <div className="text-left">
            <span className="font-display tracking-[0.3em] font-bold text-white uppercase text-xs">
              CareerVerse
            </span>
            <span className="text-[8px] text-cyan-400 font-display block uppercase tracking-widest mt-0.5">
              SYS VER: 2050 // ACTIVE
            </span>
          </div>
        </Link>

        {/* Dynamic HUD Coordinate Telemetry */}
        <div className="hidden lg:flex items-center gap-8 text-[9px] font-display text-white/30 tracking-widest uppercase">
          <div>ORBITAL LAT: 45.92° // DEC: -12.44°</div>
          <div>BUFFER: ACTIVE // STACK LOCK</div>
          <div>CONSOLE FEED // RAW SIG: 98%</div>
        </div>

        {/* Right HUD Controls */}
        <div className="flex items-center gap-4">
          {/* Floating Recruiter mode button */}
          <button
            onClick={() => onViewChange(isRecruiter ? "universe" : "recruiter")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-display tracking-[0.2em] uppercase font-bold border transition-all duration-500 shadow-md ${
              isRecruiter
                ? "bg-cyan-950/60 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.3)] animate-pulse"
                : "bg-black/50 border-white/10 text-white/70 hover:text-white hover:border-cyan-400/40"
            }`}
          >
            <Briefcase size={12} className={isRecruiter ? "text-cyan-300" : "text-white/40"} />
            Need the 2-minute version?
          </button>
        </div>
      </div>

      {/* 3. Central Overlay HUD panels */}
      <div className="flex-1 w-full flex items-center justify-between relative mt-16 mb-8">
        
        {/* LEFT PANEL: Holographic Project details (Appears when planet selected) */}
        <AnimatePresence>
          {selectedEntity && !isRecruiter && (
            <motion.div
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -80, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="w-full sm:w-[400px] glass-panel-glow border-cyan-500/20 rounded-2xl p-6 pointer-events-auto flex flex-col justify-between max-h-[72vh] overflow-y-auto shadow-2xl relative"
            >
              {/* Corner indicators */}
              <div className="absolute top-0 right-0 bg-cyan-400/20 border-b border-l border-cyan-400/30 px-3 py-1 text-[8px] font-display tracking-widest text-cyan-300 uppercase">
                {selectedEntity.type} node
              </div>

              <div className="space-y-4 pr-2 custom-scrollbar">
                {/* Header info */}
                <div className="space-y-1 pt-2">
                  <span className="text-[9px] font-display tracking-[0.25em] text-cyan-400 font-bold uppercase">
                    {selectedEntity.subtitle}
                  </span>
                  <h3 className="text-xl font-semibold font-display tracking-tight text-white leading-snug">
                    {selectedEntity.title}
                  </h3>
                  <div className="text-[9px] text-white/40 font-display">TIME EPOCH: {selectedEntity.date}</div>
                </div>

                {/* Body description */}
                <p className="text-xs text-white/80 font-light leading-relaxed">
                  {selectedEntity.description}
                </p>

                {/* Technologies List */}
                <div className="space-y-2">
                  <h4 className="text-[9px] font-display uppercase tracking-widest text-white/50 font-bold">
                    SYSTEM ENGINES
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedEntity.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded bg-cyan-500/5 border border-cyan-400/15 text-cyan-300/90 text-[10px] font-display font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlights details */}
                <div className="space-y-3.5">
                  <h4 className="text-[9px] font-display uppercase tracking-widest text-white/50 font-bold">
                    {selectedEntity.type === "planet" ? "MISSION LOG DETAILS" : "OPERATIONAL PARAMETERS"}
                  </h4>
                  {selectedEntity.type === "planet" ? (
                    selectedEntity.details.map((detail, idx) => {
                      let label = "DIAGNOSTIC";
                      let colorClass = "text-cyan-400";
                      if (idx === 0) { label = "CHALLENGE ENGAGED"; colorClass = "text-rose-400/80"; }
                      if (idx === 1) { label = "LESSON RETRIEVED"; colorClass = "text-emerald-400/80"; }
                      if (idx === 2) { label = "FUTURE ALIGNMENT"; colorClass = "text-amber-400/80"; }
                      
                      return (
                        <div key={idx} className="space-y-1">
                          <div className={`text-[8px] font-display uppercase tracking-widest font-bold ${colorClass}`}>
                            {label}
                          </div>
                          <p className="text-xs text-white/70 font-light leading-relaxed pl-2.5 border-l border-white/5">
                            {detail.replace(/^(CHALLENGE|LESSON|FUTURE):\s*/i, "")}
                          </p>
                        </div>
                      );
                    })
                  ) : (
                    <ul className="space-y-2">
                      {selectedEntity.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-white/70 font-light leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Footer controls */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between shrink-0">
                <button
                  onClick={() => onEntitySelect(null)}
                  className="flex items-center gap-1 text-[9px] font-display tracking-widest text-white/40 hover:text-white uppercase transition-colors"
                >
                  <X size={12} />
                  Break Lock
                </button>
                <div className="text-[8px] font-display text-white/20 tracking-wider">
                  SYS // DOCK SECURE
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* RIGHT PANEL: Recruiter flat summary view (Appears in recruiter mode) */}
        <AnimatePresence>
          {isRecruiter && (
            <motion.div
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 80, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="w-full sm:w-[440px] glass-panel-glow border-purple-500/20 rounded-2xl p-6 pointer-events-auto flex flex-col justify-between max-h-[75vh] ml-auto overflow-y-auto shadow-2xl relative"
            >
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex items-center gap-2">
                    <Network size={16} className="text-purple-400" />
                    <h3 className="text-sm font-display tracking-[0.2em] uppercase font-bold text-white">
                      RECRUITER INTERFACE
                    </h3>
                  </div>
                  <button
                    onClick={() => onViewChange("universe")}
                    className="text-[9px] font-display tracking-widest text-white/40 hover:text-white uppercase"
                  >
                    DISMISS
                  </button>
                </div>

                {/* Pitch */}
                <div className="space-y-1.5">
                  <div className="text-xs font-semibold text-white">Creative Technologist // 3D Lead</div>
                  <p className="text-[11px] text-white/70 font-light leading-relaxed">
                    Specialized in developing interactive 3D WebGL interfaces, real-time procedural animations, and secure cloud pipelines. Seamless integration of aesthetic layouts with performant code.
                  </p>
                </div>

                {/* Actions */}
                <button
                  onClick={triggerCvDownload}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-[10px] font-display tracking-[0.2em] uppercase font-bold text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] active:scale-[0.98]"
                >
                  <Download size={13} />
                  Download Quantum CV
                </button>

                {/* Timeline direct flyers */}
                <div className="space-y-2">
                  <h4 className="text-[9px] font-display tracking-[0.2em] uppercase text-white/40 font-bold mb-1">
                    Direct Coordinates Fly paths
                  </h4>
                  <div className="space-y-1.5 max-h-[220px] overflow-y-auto custom-scrollbar">
                    {careerEntities.map((entity) => {
                      const isActive = selectedEntity?.id === entity.id;
                      return (
                        <button
                          key={entity.id}
                          onClick={() => onEntitySelect(isActive ? null : entity)}
                          className={`w-full text-left px-3 py-2.5 rounded-lg border transition-all duration-300 flex items-center justify-between group text-xs ${
                            isActive
                              ? "bg-indigo-950/40 border-indigo-400/50 text-indigo-200"
                              : "bg-white/[0.01] border-white/5 hover:border-white/20 hover:bg-white/[0.04]"
                          }`}
                        >
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entity.color }} />
                              <span className="font-semibold">{entity.title}</span>
                            </div>
                            <div className="text-[9px] text-white/30 font-light pl-3">
                              {entity.subtitle}
                            </div>
                          </div>
                          <ChevronRight size={12} className="opacity-40 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Footer info */}
              <div className="text-center text-[8px] font-display text-white/20 tracking-widest pt-4 border-t border-white/5 mt-4">
                CLICK ENTITY BUTTON TO ENGAGE FLY PATH
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. HUD Footer Watermark */}
      <div className="w-full flex items-center justify-between text-[9px] font-display text-white/20 tracking-widest pointer-events-none">
        <div>SYS STAT: CONNECTED // LATENCY: 8MS</div>
        <div>PRESS SPACE TO ENGAGE HYPERDRIVE // DBL CLICK NODES TO SUPERNOVA</div>
        <div>© 2050 CAREERVERSE // SYSTEM SECURE</div>
      </div>
    </div>
  );
}
