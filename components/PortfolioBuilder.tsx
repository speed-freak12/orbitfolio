"use client";

import { useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { Milestone } from "@/data/milestones";
import UniverseCanvas from "./UniverseCanvas";
import { Trash2, Plus, Sparkles, AlertCircle } from "lucide-react";

export default function PortfolioBuilder() {
  const { milestones, addMilestone, removeMilestone } = usePortfolio();
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [skillsStr, setSkillsStr] = useState("");
  const [color, setColor] = useState("#8b5cf6"); // default purple
  const [detailsStr, setDetailsStr] = useState("");
  const [error, setError] = useState("");

  const colorOptions = [
    { name: "Cyan Star", value: "#06b6d4" },
    { name: "Blue Star", value: "#3b82f6" },
    { name: "Purple Star", value: "#8b5cf6" },
    { name: "Pink Star", value: "#ec4899" },
    { name: "Amber Star", value: "#eab308" },
    { name: "Orange Star", value: "#f97316" },
  ];

  const handleAddStar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !subtitle || !date || !description) {
      setError("Please fill out all primary fields.");
      return;
    }

    setError("");
    const id = title.toLowerCase().replace(/\s+/g, "-");
    const skills = skillsStr
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    const details = detailsStr
      .split("\n")
      .map((d) => d.trim())
      .filter((d) => d.length > 0);

    // Calculate a semi-random outer shell position so it spreads from center
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(Math.random() * 2 - 1);
    const r = 3 + Math.random() * 3.5;
    const position: [number, number, number] = [
      parseFloat((r * Math.sin(phi) * Math.cos(theta)).toFixed(2)),
      parseFloat((r * Math.sin(phi) * Math.sin(theta)).toFixed(2)),
      parseFloat((r * Math.cos(phi)).toFixed(2)),
    ];

    addMilestone({
      id,
      type: "planet",
      title,
      subtitle,
      date,
      description,
      skills: skills.length > 0 ? skills : ["General"],
      position,
      color,
      glowColor: color, // simplify glow
      details: details.length > 0 ? details : ["Milestone initialized successfully."],
    });

    // Reset Form
    setTitle("");
    setSubtitle("");
    setDate("");
    setDescription("");
    setSkillsStr("");
    setDetailsStr("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch h-full min-h-[calc(100vh-180px)]">
      {/* Left Form / Manager Pane */}
      <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-light font-display text-white">Constellation Architect</h2>
            <p className="text-xs text-white/50 font-light">Add or remove star nodes representing your professional coordinates.</p>
          </div>

          {/* Form Card */}
          <form onSubmit={handleAddStar} className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/5 bg-white/2 w-fit">
              <Sparkles size={11} className="text-cyan-400" />
              <span className="text-[9px] font-display font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Forge New Star
              </span>
            </div>

            {error && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle size={14} />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-[9px] font-display uppercase tracking-widest text-white/50 font-semibold block">
                  Star Name / Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Lead Dev at Google"
                  className="w-full bg-white/[0.01] border border-white/5 rounded-xl py-2.5 px-3.5 text-xs text-white placeholder-white/20 outline-none focus:border-blue-400 focus:bg-white/[0.03] transition-all duration-300 font-light"
                />
              </div>

              {/* Subtitle */}
              <div className="space-y-1.5">
                <label className="text-[9px] font-display uppercase tracking-widest text-white/50 font-semibold block">
                  Star Theme / Subtitle
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. Scalable AI Systems"
                  className="w-full bg-white/[0.01] border border-white/5 rounded-xl py-2.5 px-3.5 text-xs text-white placeholder-white/20 outline-none focus:border-blue-400 focus:bg-white/[0.03] transition-all duration-300 font-light"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Date */}
              <div className="space-y-1.5">
                <label className="text-[9px] font-display uppercase tracking-widest text-white/50 font-semibold block">
                  Epoch / Date Range
                </label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="e.g. 2024 - Present"
                  className="w-full bg-white/[0.01] border border-white/5 rounded-xl py-2.5 px-3.5 text-xs text-white placeholder-white/20 outline-none focus:border-blue-400 focus:bg-white/[0.03] transition-all duration-300 font-light"
                />
              </div>

              {/* Color picker select */}
              <div className="space-y-1.5">
                <label className="text-[9px] font-display uppercase tracking-widest text-white/50 font-semibold block">
                  Spectral Class / Color
                </label>
                <select
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full bg-black border border-white/5 rounded-xl py-2.5 px-3.5 text-xs text-white outline-none focus:border-blue-400 focus:bg-white/[0.03] transition-all duration-300 font-light"
                >
                  {colorOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-display uppercase tracking-widest text-white/50 font-semibold block">
                Stellar Description
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe key responsibilities..."
                className="w-full bg-white/[0.01] border border-white/5 rounded-xl py-2.5 px-3.5 text-xs text-white placeholder-white/20 outline-none focus:border-blue-400 focus:bg-white/[0.03] transition-all duration-300 resize-none font-light leading-relaxed"
              />
            </div>

            {/* Skills */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-display uppercase tracking-widest text-white/50 font-semibold block">
                Technical Tags (comma separated)
              </label>
              <input
                type="text"
                value={skillsStr}
                onChange={(e) => setSkillsStr(e.target.value)}
                placeholder="Next.js, Python, AWS, Docker"
                className="w-full bg-white/[0.01] border border-white/5 rounded-xl py-2.5 px-3.5 text-xs text-white placeholder-white/20 outline-none focus:border-blue-400 focus:bg-white/[0.03] transition-all duration-300 font-light"
              />
            </div>

            {/* Details */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-display uppercase tracking-widest text-white/50 font-semibold block">
                Accomplishments (one per line)
              </label>
              <textarea
                rows={2}
                value={detailsStr}
                onChange={(e) => setDetailsStr(e.target.value)}
                placeholder="Architected agent pipelines.&#10;Won City Hackathon."
                className="w-full bg-white/[0.01] border border-white/5 rounded-xl py-2.5 px-3.5 text-xs text-white placeholder-white/20 outline-none focus:border-blue-400 focus:bg-white/[0.03] transition-all duration-300 resize-none font-light leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-xs font-display tracking-[0.2em] uppercase font-bold text-white transition-all duration-300 hover:shadow-[0_0_12px_rgba(99,102,241,0.3)] active:scale-[0.98]"
            >
              <Plus size={14} />
              Forge Star
            </button>
          </form>
        </div>

        {/* Existing List items */}
        <div className="space-y-3 pt-6 border-t border-white/5">
          <h3 className="text-[10px] font-display tracking-[0.2em] uppercase text-white/40 font-bold">
            Active Core Star Nodes ({milestones.length})
          </h3>
          <div className="max-h-[220px] overflow-y-auto space-y-2 custom-scrollbar">
            {milestones.map((m) => (
              <div
                key={m.id}
                className="px-4 py-3 rounded-xl border border-white/5 bg-white/[0.01] flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:border-white/10 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                    style={{ backgroundColor: m.color }}
                  />
                  <div>
                    <div className="text-xs font-semibold text-white/90">{m.title}</div>
                    <div className="text-[9px] text-white/30 font-light">{m.subtitle} | {m.date}</div>
                  </div>
                </div>
                <button
                  onClick={() => removeMilestone(m.id)}
                  className="p-2 rounded-lg border border-white/5 bg-white/2 hover:bg-rose-500/10 text-white/40 hover:text-rose-400 transition-colors duration-300"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right 3D Preview Pane */}
      <div className="lg:col-span-6 flex flex-col h-[340px] lg:h-auto min-h-[340px] relative rounded-3xl border border-white/10 overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.7)] bg-black">
        {/* Real-time Universe Canvas */}
        <UniverseCanvas
          selectedEntity={selectedMilestone}
          onEntitySelect={setSelectedMilestone}
          viewMode="universe"
          gameState="active"
          warpActive={false}
        />

        {/* Dynamic Detail Card Drawer overlay */}
        {selectedMilestone && (
          <div className="absolute inset-0 z-20 pointer-events-none p-4 flex items-end">
            <div className="w-full bg-zinc-950/90 backdrop-blur-md border border-white/10 p-5 rounded-2xl pointer-events-auto relative shadow-2xl">
              <button
                onClick={() => setSelectedMilestone(null)}
                className="absolute top-4 right-4 text-[9px] font-display text-white/50 hover:text-white"
              >
                DISMISS
              </button>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: selectedMilestone.color }} />
                <span className="text-[9px] font-display tracking-widest text-blue-400 uppercase font-semibold">
                  {selectedMilestone.subtitle}
                </span>
              </div>
              <h4 className="text-sm font-semibold font-display text-white mb-2">{selectedMilestone.title}</h4>
              <p className="text-xs text-white/70 font-light leading-relaxed line-clamp-3">
                {selectedMilestone.description}
              </p>
            </div>
          </div>
        )}

        {/* Glowing HUD Tag */}
        <div className="absolute top-5 right-6 text-[8px] font-display text-white/30 tracking-widest pointer-events-none select-none">
          REAL-TIME 3D PREVIEW // ACTIVE
        </div>
      </div>
    </div>
  );
}
