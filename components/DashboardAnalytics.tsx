"use client";

import { BarChart, TrendingUp, Globe, Link2, Monitor } from "lucide-react";

export default function DashboardAnalytics() {
  const weeklyViews = [
    { day: "Mon", count: 142, pct: "45%" },
    { day: "Tue", count: 198, pct: "65%" },
    { day: "Wed", count: 245, pct: "82%" },
    { day: "Thu", count: 284, pct: "95%" },
    { day: "Fri", count: 220, pct: "73%" },
    { day: "Sat", count: 180, pct: "60%" },
    { day: "Sun", count: 155, pct: "52%" },
  ];

  const locations = [
    { country: "United States", share: "42%", count: "622 views" },
    { country: "India", share: "18%", count: "266 views" },
    { country: "Germany", share: "12%", count: "178 views" },
    { country: "United Kingdom", share: "9%", count: "133 views" },
    { country: "Japan", share: "6%", count: "89 views" },
  ];

  const referrals = [
    { source: "linkedin.com", visits: "684", share: "46%" },
    { source: "github.com", visits: "415", share: "28%" },
    { source: "direct / email", visits: "266", share: "18%" },
    { source: "google.com", visits: "117", share: "8%" },
  ];

  return (
    <div className="space-y-8">
      {/* Upper Title */}
      <div className="space-y-1">
        <h2 className="text-xl font-light font-display text-white">Stellar Traffic Terminal</h2>
        <p className="text-xs text-white/50 font-light">Monitor visitor metrics, geographic distribution, and referral roots.</p>
      </div>

      {/* Traffic Graph Row */}
      <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart size={16} className="text-blue-400" />
            <h3 className="text-xs font-display tracking-[0.15em] uppercase text-white/60 font-semibold">
              Weekly Visitor Hits
            </h3>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-display text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full">
            <TrendingUp size={10} />
            +24% THIS WEEK
          </div>
        </div>

        {/* Custom pure-CSS bar graph */}
        <div className="h-44 flex items-end justify-between gap-2.5 px-4 pt-4 border-b border-white/5">
          {weeklyViews.map((item, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
              {/* Tooltip on hover */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-950 border border-white/10 px-2 py-1 rounded text-[9px] font-display text-white/80 absolute translate-y-[-180px] shadow-lg pointer-events-none">
                {item.count} hits
              </div>
              
              {/* Bar */}
              <div
                className="w-full bg-gradient-to-t from-blue-600 via-indigo-600 to-purple-600 rounded-t-lg group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-500 shadow-[0_0_12px_rgba(99,102,241,0.2)]"
                style={{ height: item.pct }}
              />
              
              {/* Day Label */}
              <span className="text-[10px] font-display text-white/40 mt-1">{item.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Referral & Geographic split layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Referral Channels */}
        <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
          <div className="flex items-center gap-2">
            <Link2 size={16} className="text-purple-400" />
            <h3 className="text-xs font-display tracking-[0.15em] uppercase text-white/60 font-semibold">
              Referral Channels
            </h3>
          </div>

          <div className="space-y-3 pt-2">
            {referrals.map((ref, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs font-light py-1 border-b border-white/[0.02]">
                <span className="text-white/80">{ref.source}</span>
                <div className="flex items-center gap-4">
                  <span className="text-white/40">{ref.visits} hits</span>
                  <span className="font-semibold text-white/90 w-8 text-right">{ref.share}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
          <div className="flex items-center gap-2">
            <Globe size={16} className="text-cyan-400" />
            <h3 className="text-xs font-display tracking-[0.15em] uppercase text-white/60 font-semibold">
              Geographic Distribution
            </h3>
          </div>

          <div className="space-y-3 pt-2">
            {locations.map((loc, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs font-light py-1 border-b border-white/[0.02]">
                <span className="text-white/80">{loc.country}</span>
                <div className="flex items-center gap-4">
                  <span className="text-white/40">{loc.count}</span>
                  <span className="font-semibold text-white/90 w-8 text-right">{loc.share}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
