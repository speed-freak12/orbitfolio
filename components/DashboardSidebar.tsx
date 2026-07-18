"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Compass,
  TrendingUp,
  Settings,
  LogOut,
  User,
} from "lucide-react";

interface SidebarProps {
  activeTab: "overview" | "builder" | "analytics" | "settings";
  setActiveTab: (tab: "overview" | "builder" | "analytics" | "settings") => void;
}

export default function DashboardSidebar({ activeTab, setActiveTab }: SidebarProps) {
  const router = useRouter();
  const { user, logout } = usePortfolio();

  const menuItems = [
    { id: "overview", label: "Dashboard Overview", icon: LayoutDashboard },
    { id: "builder", label: "Portfolio Builder", icon: Compass },
    { id: "analytics", label: "Visitor Analytics", icon: TrendingUp },
    { id: "settings", label: "Settings", icon: Settings },
  ] as const;

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const displayName = user?.name || "STELLAR CREATOR";
  const displayEmail = user?.email || "creator@orbitfolio.com";

  return (
    <aside className="w-64 border-r border-white/5 bg-black/60 backdrop-blur-md flex flex-col justify-between shrink-0 h-full p-6 select-none z-20">
      {/* Brand Logotype */}
      <div className="space-y-8">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.65)] animate-pulse" />
          <span className="font-display tracking-[0.25em] font-bold text-white uppercase text-xs">
            Orbitfolio
          </span>
        </div>

        {/* Navigation list */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-display tracking-[0.1em] font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-white/[0.04] border border-white/10 text-white shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
                    : "border border-transparent text-white/50 hover:text-white/80 hover:bg-white/[0.01]"
                }`}
              >
                <Icon size={15} className={isActive ? "text-blue-400" : "text-white/40"} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Section & Logout */}
      <div className="space-y-4 pt-6 border-t border-white/5">
        {/* User Card */}
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold font-display shadow-md">
            {displayName[0]}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-semibold text-white/90 truncate">{displayName}</div>
            <div className="text-[9px] text-white/40 truncate font-light">{displayEmail}</div>
          </div>
        </div>

        {/* Logout Trigger */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-display tracking-[0.1em] text-rose-400/70 hover:text-rose-400 hover:bg-rose-500/5 transition-all duration-300"
        >
          <LogOut size={14} className="opacity-70" />
          Disconnect Console
        </button>
      </div>
    </aside>
  );
}
