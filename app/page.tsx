"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Shield,
  Zap,
  TrendingUp,
  Cpu,
  HelpCircle,
  Plus,
  Minus,
  Check,
  Compass,
} from "lucide-react";
import UniverseCanvas from "@/components/UniverseCanvas";
import { Milestone } from "@/data/milestones";
import MilestoneDetail from "@/components/MilestoneDetail";

export default function Home() {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Standard landing page demo milestones
  const demoMilestones: Milestone[] = [
    {
      id: "first-project",
      title: "First Project",
      subtitle: "The Spark of Creation",
      date: "Aug 2021",
      description: "Built the first web application that automated student records management.",
      skills: ["HTML", "CSS", "JS"],
      position: [-3, 1.5, -2],
      color: "#06b6d4",
      glowColor: "rgba(6, 182, 212, 0.8)",
      details: ["Automated record handling.", "Reduced errors by 95%."]
    },
    {
      id: "techwale",
      title: "TechWale Professional",
      subtitle: "Frontend Lead",
      date: "Jul 2022",
      description: "Served as a Frontend Engineer leading corporate web portals.",
      skills: ["Next.js", "TS", "Framer"],
      position: [1.5, 2.5, -1],
      color: "#8b5cf6",
      glowColor: "rgba(139, 92, 246, 0.8)",
      details: ["35% retention growth.", "Optimized Lighthouse scores."]
    },
    {
      id: "ai-projects",
      title: "AI Deep Tech",
      subtitle: "Frontier Integration",
      date: "Nov 2023",
      description: "Pioneered interactive integrations with LLM pipelines.",
      skills: ["Python", "TensorFlow", "API"],
      position: [0.5, -1.5, 2],
      color: "#ec4899",
      glowColor: "rgba(236, 72, 153, 0.8)",
      details: ["Architected agents.", "Built semantic search tools."]
    }
  ];

  const features = [
    {
      icon: Cpu,
      title: "Interactive 3D Constellations",
      desc: "Each of your milestones, projects, and skills is generated as a glowing star in a connected 3D space.",
    },
    {
      icon: Shield,
      title: "Recruiter Mode UI",
      desc: "Give recruiters a clean, high-speed split-screen dashboard to view your summary and download your PDF resume instantly.",
    },
    {
      icon: TrendingUp,
      title: "Granular Analytics",
      desc: "Track page views, geographic logs, and resume download rates through a beautiful real-time dashboard.",
    },
    {
      icon: Zap,
      title: "Instant Deployment",
      desc: "Sign up, enter your achievements, and deploy to your custom public URL in less than 5 minutes.",
    },
  ];

  const faqs = [
    {
      q: "What is Orbitfolio?",
      a: "Orbitfolio is a modern SaaS platform that lets developers, designers, and creatives compile their professional milestones, certifications, and projects into a cinematic, interactive 3D universe that they can share via a public link.",
    },
    {
      q: "How does the 3D space work?",
      a: "Our portfolio builder converts each added project or experience into a star node with unique coordinates and glows. We use React Three Fiber and WebGL to render these as a fully fluid and interactive canvas.",
    },
    {
      q: "Do I need to write 3D or WebGL code?",
      a: "Not at all. You enter your information using a simple form in the dashboard, and Orbitfolio automatically designs and compiles the 3D galaxy and camera flypaths for you.",
    },
    {
      q: "Is Orbitfolio responsive on mobile?",
      a: "Yes, the 3D canvas and the details cards adapt smoothly to mobile, converting slide-out drawers into user-friendly bottom sheets.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      {/* 1. Header */}
      <header className="fixed top-0 inset-x-0 z-40 bg-black/40 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
          <span className="font-display tracking-[0.25em] font-bold text-white uppercase text-sm">
            Orbitfolio
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-xs font-display tracking-widest text-white/60">
          <a href="#features" className="hover:text-white transition-colors duration-300">FEATURES</a>
          <a href="#demo" className="hover:text-white transition-colors duration-300">LIVE PREVIEW</a>
          <a href="#pricing" className="hover:text-white transition-colors duration-300">PRICING</a>
          <a href="#faq" className="hover:text-white transition-colors duration-300">FAQ</a>
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-xs font-display tracking-widest text-white/70 hover:text-white transition-colors duration-300 py-2 px-4"
          >
            LOGIN
          </Link>
          <Link
            href="/signup"
            className="text-xs font-display tracking-widest bg-white text-black hover:bg-white/90 transition-all duration-300 py-2 px-5 rounded-full font-bold shadow-[0_4px_15px_rgba(255,255,255,0.15)] hover:scale-105 active:scale-95"
          >
            GET STARTED
          </Link>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-24 pb-12 overflow-hidden">
        {/* Dynamic Space Background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,27,75,0.3)_0%,rgba(0,0,0,1)_80%)] pointer-events-none" />
        <div className="absolute top-1/3 left-1/5 w-[1px] h-[1px] bg-white opacity-40 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[1.5px] h-[1.5px] bg-indigo-400 opacity-55 animate-pulse [animation-delay:1.5s]" />

        <div className="relative z-10 max-w-4xl space-y-8 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/5 bg-white/2 backdrop-blur-md"
          >
            <Sparkles size={12} className="text-blue-400" />
            <span className="text-[10px] font-display font-semibold uppercase tracking-[0.2em] text-blue-300">
              The Next Evolution of Professional Portfolios
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl font-light font-display tracking-tight leading-[1.1] text-white"
          >
            Your Career Deserves <br />
            <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-200 to-purple-400 drop-shadow-[0_0_30px_rgba(99,102,241,0.2)]">
              More Than a PDF.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="text-sm sm:text-base md:text-lg text-white/50 font-light max-w-xl leading-relaxed"
          >
            Create a beautiful interactive universe where every project, achievement, and milestone becomes a star. Deploy and share it globally in seconds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full"
          >
            <Link
              href="/signup"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 py-3.5 px-8 rounded-full text-xs font-display tracking-[0.2em] uppercase font-bold text-white transition-all duration-300 hover:shadow-[0_0_25px_rgba(99,102,241,0.45)] hover:scale-105 active:scale-95"
            >
              Create My Universe
              <ArrowRight size={14} />
            </Link>
            <a
              href="#demo"
              className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 bg-white/2 hover:bg-white/5 py-3.5 px-8 rounded-full text-xs font-display tracking-[0.2em] uppercase font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95"
            >
              View Live Demo
            </a>
          </motion.div>
        </div>
      </section>

      {/* 3. Features Section */}
      <section id="features" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-display tracking-[0.25em] text-blue-400 font-bold uppercase">
            Platform Capabilities
          </h2>
          <h3 className="text-3xl md:text-4xl font-light font-display text-white">
            Designed for Impact. Engineered for Simplicity.
          </h3>
          <p className="text-xs sm:text-sm text-white/50 font-light">
            Orbitfolio equips your resume with cinematic aesthetics and analytics tools that lock recruiters on your site.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className="glass-panel p-8 rounded-3xl border border-white/5 shadow-[0_8px_30px_rgba(0,0,0,0.4)] flex flex-col justify-between hover:border-white/10 hover:bg-white/[0.02] transition-all duration-500 group"
              >
                <div className="space-y-4">
                  <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 w-fit text-blue-400 shadow-[0_4px_12px_rgba(0,0,0,0.25)] group-hover:scale-110 group-hover:text-cyan-400 transition-all duration-500">
                    <Icon size={20} />
                  </div>
                  <h4 className="text-base font-semibold font-display tracking-tight text-white">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-white/60 leading-relaxed font-light">
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Live 3D Portfolio Demo Preview */}
      <section id="demo" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <h2 className="text-xs font-display tracking-[0.25em] text-blue-400 font-bold uppercase">
            Interactive Space Demo
          </h2>
          <h3 className="text-3xl md:text-4xl font-light font-display text-white">
            Fly through the Universe
          </h3>
          <p className="text-xs text-white/50 font-light">
            Below is a live interactive canvas. Hover over the glowing stars to inspect titles, or click to fly the camera right in.
          </p>
        </div>

        {/* Embedded Canvas Box */}
        <div className="relative h-[480px] w-full rounded-3xl border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.65)] overflow-hidden bg-black">
          {/* Background Canvas */}
          <UniverseCanvas
            selectedMilestone={selectedMilestone}
            onMilestoneSelect={setSelectedMilestone}
            viewMode="universe"
            gameState="active"
          />

          {/* Star Node Floating Overlay */}
          <MilestoneDetail
            milestone={selectedMilestone}
            onClose={() => setSelectedMilestone(null)}
          />

          {/* Glowing HUD watermark */}
          <div className="absolute bottom-5 right-6 text-[9px] font-display text-white/30 tracking-widest pointer-events-none select-none">
            DEMO CANVAS // ORBITAL DRAG TO ROTATE
          </div>
        </div>
      </section>

      {/* 5. How It Works */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5 relative z-10 bg-black/20">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-display tracking-[0.25em] text-blue-400 font-bold uppercase">
            Workflow
          </h2>
          <h3 className="text-3xl md:text-4xl font-light font-display text-white">
            Three Steps to Orbit
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            {
              step: "01",
              title: "Establish Profile",
              desc: "Register a secure profile and input your resume credentials, projects, and skills using our unified dashboard.",
            },
            {
              step: "02",
              title: "Assemble Constellation",
              desc: "Arrange your milestones, specify coordinates, or let our automated systems map the points in a sleek layout.",
            },
            {
              step: "03",
              title: "Launch Link",
              desc: "Share your dedicated public web address (orbitfolio.com/username) to give clients and recruiters a premium 3D review.",
            },
          ].map((item, idx) => (
            <div key={idx} className="space-y-4 p-6 hover:translate-y-[-5px] transition-transform duration-300">
              <div className="text-3xl sm:text-4xl font-bold font-display text-indigo-400/20">{item.step}</div>
              <h4 className="text-base font-semibold font-display text-white">{item.title}</h4>
              <p className="text-xs text-white/50 leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Pricing Section */}
      <section id="pricing" className="py-24 px-6 md:px-12 max-w-5xl mx-auto border-t border-white/5 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-display tracking-[0.25em] text-blue-400 font-bold uppercase">
            Pricing
          </h2>
          <h3 className="text-3xl md:text-4xl font-light font-display text-white">
            Transparent Pricing for High Achievers
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Free Tier */}
          <div className="glass-panel p-8 rounded-3xl border border-white/5 shadow-[0_8px_30px_rgba(0,0,0,0.4)] flex flex-col justify-between hover:border-white/10 transition-all duration-500">
            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="text-base font-bold font-display uppercase tracking-wider text-white">
                  Nebula Basic
                </h4>
                <p className="text-xs text-white/50 font-light">
                  Perfect for junior developers and freelancers starting out.
                </p>
              </div>
              <div className="text-4xl font-light font-display text-white">
                $0 <span className="text-xs font-sans text-white/40 font-light">/ forever</span>
              </div>
              <ul className="space-y-3.5 text-xs text-white/80 font-light">
                <li className="flex items-center gap-2.5">
                  <Check size={14} className="text-blue-400" />
                  <span>1 Universe Constellation</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={14} className="text-blue-400" />
                  <span>Up to 6 Milestone Stars</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={14} className="text-blue-400" />
                  <span>Standard Blue/Indigo Space Theme</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={14} className="text-blue-400" />
                  <span>Public Portfolio Link (orbitfolio.com/u/user)</span>
                </li>
              </ul>
            </div>
            <Link
              href="/signup"
              className="mt-8 block text-center py-3.5 rounded-full border border-white/10 bg-white/2 hover:bg-white/5 text-xs font-display tracking-widest font-bold uppercase transition-all duration-300"
            >
              Get Started
            </Link>
          </div>

          {/* Pro Tier */}
          <div className="glass-panel-glow p-8 rounded-3xl border border-indigo-500/25 shadow-[0_12px_40px_rgba(0,0,0,0.5)] flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-gradient-to-l from-indigo-600 to-purple-600 px-4 py-1 text-[8px] font-display font-semibold uppercase tracking-widest rounded-bl-xl text-white shadow-lg">
              Popular
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="text-base font-bold font-display uppercase tracking-wider text-white">
                  Supernova Pro
                </h4>
                <p className="text-xs text-white/60 font-light">
                  For creators who demand custom styling and complete traffic stats.
                </p>
              </div>
              <div className="text-4xl font-light font-display text-white">
                $9 <span className="text-xs font-sans text-white/40 font-light">/ month</span>
              </div>
              <ul className="space-y-3.5 text-xs text-white/90 font-light">
                <li className="flex items-center gap-2.5">
                  <Check size={14} className="text-cyan-400" />
                  <span>Unlimited Constellation Stars</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={14} className="text-cyan-400" />
                  <span>Premium Color Themes (Pink, Emerald, Orange)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={14} className="text-cyan-400" />
                  <span>Granular Visitor Traffic Analytics</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={14} className="text-cyan-400" />
                  <span>Custom Domains (yourname.com)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={14} className="text-cyan-400" />
                  <span>Priority Stellar Rendering Support</span>
                </li>
              </ul>
            </div>
            <Link
              href="/signup"
              className="mt-8 block text-center py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-xs font-display tracking-widest font-bold uppercase transition-all duration-300 text-white shadow-[0_4px_15px_rgba(99,102,241,0.25)] group-hover:scale-105 active:scale-95"
            >
              Go Pro Now
            </Link>
          </div>
        </div>
      </section>

      {/* 7. FAQ Section */}
      <section id="faq" className="py-24 px-6 md:px-12 max-w-4xl mx-auto border-t border-white/5 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-display tracking-[0.25em] text-blue-400 font-bold uppercase">
            Questions
          </h2>
          <h3 className="text-3xl md:text-4xl font-light font-display text-white">
            Frequently Asked Queries
          </h3>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                className="glass-panel rounded-2xl border border-white/5 shadow-[0_2px_8px_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-xs sm:text-sm font-semibold font-display text-white">
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <Minus size={14} className="text-indigo-400 shrink-0 ml-4" />
                  ) : (
                    <Plus size={14} className="text-white/50 shrink-0 ml-4" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-xs leading-relaxed text-white/70 font-light border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="border-t border-white/5 py-12 px-6 md:px-12 bg-black relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="font-display tracking-[0.2em] font-bold text-white uppercase text-xs">
              Orbitfolio
            </span>
          </div>
          <div className="text-[10px] text-white/30 font-display tracking-widest">
            © {new Date().getFullYear()} ORBITFOLIO INC. // ALL RIGHTS RESERVED
          </div>
          <div className="flex items-center gap-6 text-[10px] font-display tracking-widest text-white/40">
            <Link href="/login" className="hover:text-white transition-colors duration-300">SYSTEM LOGIN</Link>
            <Link href="/signup" className="hover:text-white transition-colors duration-300">CONSOLE REGISTER</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
