"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import {
  Eye,
  Star,
  Award,
  FileText,
  Plus,
  ExternalLink,
  Upload,
  Calendar,
} from "lucide-react";
import Link from "next/link";

interface OverviewProps {
  onTabChange: (tab: "overview" | "builder" | "analytics" | "settings") => void;
}

export default function DashboardOverview({ onTabChange }: OverviewProps) {
  const { milestones } = usePortfolio();

  // Compute stats dynamically
  const totalStars = milestones.length;
  const uniqueSkills = Array.from(new Set(milestones.flatMap((m) => m.skills))).length;
  
  const stats = [
    { label: "Portfolio Hits", value: "1,482", icon: Eye, color: "text-blue-400" },
    { label: "Universe Stars", value: totalStars.toString(), icon: Star, color: "text-purple-400" },
    { label: "Unique Techs", value: uniqueSkills.toString(), icon: Award, color: "text-cyan-400" },
    { label: "Resume Status", value: "Verified", icon: FileText, color: "text-emerald-400" },
  ];

  const recentActivity = [
    { text: "Visitor from Seattle, WA opened your 3D Portfolio", time: "2 hours ago" },
    { text: "Resume PDF downloaded by Recruiter from San Jose, CA", time: "5 hours ago" },
    { text: "Milestone star 'TechWale Professional Experience' updated", time: "Yesterday" },
    { text: "Stellar core system initialized", time: "3 days ago" },
  ];

  return (
    <div className="space-y-8">
      {/* Upper header summary */}
      <div className="space-y-1">
        <h2 className="text-2xl font-light font-display text-white">System Console Overview</h2>
        <p className="text-xs text-white/50 font-light">Monitor cosmic traffic metrics and perform quick operations.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="glass-panel p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.25)] flex flex-col justify-between"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-[10px] font-display uppercase tracking-widest text-white/40 font-semibold">
                  {stat.label}
                </span>
                <Icon size={14} className={stat.color} />
              </div>
              <div className="text-2xl font-light font-display text-white mt-4">
                {stat.value}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Operations */}
        <div className="lg:col-span-1 glass-panel p-6 rounded-2xl border border-white/5 flex flex-col justify-between h-[340px]">
          <div className="space-y-4">
            <h3 className="text-xs font-display tracking-[0.15em] uppercase text-white/60 font-semibold">
              Quick Operations
            </h3>
            <p className="text-xs text-white/40 leading-relaxed font-light">
              Add star nodes to your constellation or test your public layout coordinates.
            </p>
          </div>
          
          <div className="space-y-3 mt-6">
            <button
              onClick={() => onTabChange("builder")}
              className="w-full flex items-center gap-2.5 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-xs font-display tracking-[0.1em] font-semibold text-white transition-all duration-300 hover:shadow-[0_0_12px_rgba(99,102,241,0.25)] active:scale-[0.98]"
            >
              <Plus size={14} />
              Add Milestone Star
            </button>
            <Link
              href="/u/demo"
              target="_blank"
              className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl border border-white/5 bg-white/2 hover:bg-white/5 text-xs font-display tracking-[0.1em] font-semibold text-white/95 transition-all duration-300 active:scale-[0.98]"
            >
              <ExternalLink size={13} />
              View Public Space
            </Link>
            <button
              onClick={() => alert("Upload Resume simulator: PDF parsing verified.")}
              className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl border border-white/5 bg-white/2 hover:bg-white/5 text-xs font-display tracking-[0.1em] font-semibold text-white/95 transition-all duration-300 active:scale-[0.98]"
            >
              <Upload size={13} />
              Upload Resume PDF
            </button>
          </div>
        </div>

        {/* Recent Traffic Feed */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-white/5 flex flex-col justify-between h-[340px]">
          <div>
            <h3 className="text-xs font-display tracking-[0.15em] uppercase text-white/60 font-semibold mb-4">
              Console Activity Logs
            </h3>
            <div className="space-y-4">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-start justify-between gap-4 text-xs font-light">
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-1.5" />
                    <span className="text-white/80">{activity.text}</span>
                  </div>
                  <div className="text-[10px] text-white/30 font-display shrink-0 flex items-center gap-1">
                    <Calendar size={10} />
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onTabChange("analytics")}
            className="text-left text-[10px] font-display tracking-widest text-indigo-400 hover:text-indigo-300 transition-colors uppercase pt-4 border-t border-white/5"
          >
            Open Full Analytics Terminal
          </button>
        </div>
      </div>
    </div>
  );
}
