"use client";

import { useState, useEffect } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardOverview from "@/components/DashboardOverview";
import PortfolioBuilder from "@/components/PortfolioBuilder";
import DashboardAnalytics from "@/components/DashboardAnalytics";
import { User as UserIcon, Mail, Shield, Save } from "lucide-react";

export default function DashboardPage() {
  const { user, login } = usePortfolio();
  const [activeTab, setActiveTab] = useState<"overview" | "builder" | "analytics" | "settings">("overview");

  // Fallback sign-in for seamless local testing
  useEffect(() => {
    if (!user) {
      login("demo@orbitfolio.com");
    }
  }, [user, login]);

  // Settings form states
  const [name, setName] = useState(user?.name || "DEMO CREATOR");
  const [email, setEmail] = useState(user?.email || "demo@orbitfolio.com");

  // Keep settings states in sync with user changes
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile settings simulated saved successfully.");
  };

  return (
    <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
      {/* Sidebar navigation */}
      <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto px-8 py-10 md:px-12 custom-scrollbar relative z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(15,10,35,0.25)_0%,rgba(0,0,0,1)_70%)]">
        
        {/* Render Tab Contents */}
        {activeTab === "overview" && (
          <DashboardOverview onTabChange={setActiveTab} />
        )}

        {activeTab === "builder" && (
          <PortfolioBuilder />
        )}

        {activeTab === "analytics" && (
          <DashboardAnalytics />
        )}

        {activeTab === "settings" && (
          <div className="max-w-2xl space-y-8">
            <div className="space-y-1">
              <h2 className="text-xl font-light font-display text-white font-semibold">Stellar Core Settings</h2>
              <p className="text-xs text-white/50 font-light">Update your profile parameters and domain settings.</p>
            </div>

            <form onSubmit={handleSaveSettings} className="glass-panel p-6 rounded-2xl border border-white/5 space-y-6">
              {/* Creator Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-display uppercase tracking-widest text-white/50 font-semibold block">
                  Creator Identity / Name
                </label>
                <div className="relative">
                  <UserIcon size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/[0.01] border border-white/5 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-white/20 outline-none focus:border-blue-400 focus:bg-white/[0.03] transition-all duration-300 font-light"
                  />
                </div>
              </div>

              {/* Creator Email */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-display uppercase tracking-widest text-white/50 font-semibold block">
                  Quantum Mail / Email
                </label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    type="email"
                    value={email}
                    className="w-full bg-white/[0.01] border border-white/5 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-white/20 outline-none focus:border-blue-400 focus:bg-white/[0.03] transition-all duration-300 font-light"
                  />
                </div>
              </div>

              {/* Mock Domain Option */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-display uppercase tracking-widest text-white/50 font-semibold block">
                  Public Namespace Domain
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-xs text-white/30 font-display">orbitfolio.com/u/</span>
                  <input
                    type="text"
                    disabled
                    value={name.toLowerCase().replace(/\s+/g, "")}
                    className="w-full bg-white/[0.01] border border-white/5 rounded-xl py-3 pl-28 pr-4 text-xs text-white/50 outline-none cursor-not-allowed font-light"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-xs font-display tracking-[0.2em] uppercase font-bold text-white transition-all duration-300 hover:shadow-[0_0_12px_rgba(99,102,241,0.3)] active:scale-[0.98]"
              >
                <Save size={14} />
                Save Settings
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
