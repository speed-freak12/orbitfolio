"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePortfolio } from "@/context/PortfolioContext";
import { motion } from "framer-motion";
import { Mail, Lock, User, LogIn, ArrowLeft } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const { signup } = usePortfolio();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    
    setIsSubmitting(true);
    // Simulate signup check
    setTimeout(() => {
      signup(name, email);
      setIsSubmitting(false);
      router.push("/dashboard");
    }, 1200);
  };

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center p-4 select-none font-sans overflow-hidden">
      {/* Background Star Simulation */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(25,20,50,0.3)_0%,rgba(0,0,0,1)_80%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 w-[1.5px] h-[1.5px] bg-white opacity-30 animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-[1px] h-[1px] bg-blue-400 opacity-40 animate-pulse [animation-delay:1s]" />

      {/* Floating Home Back Button */}
      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-xs font-display tracking-widest text-white/50 hover:text-white transition-colors duration-300 pointer-events-auto"
      >
        <ArrowLeft size={14} />
        BACK TO ORIGIN
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md glass-panel-glow rounded-3xl p-8 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] pointer-events-auto"
      >
        {/* Glow Trim */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

        {/* Branding header */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-2 justify-center">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="font-display tracking-[0.25em] font-bold text-white uppercase text-[10px]">
              Orbitfolio // Registration
            </span>
          </div>
          <h1 className="text-2xl font-light font-display text-white">
            Create Universe
          </h1>
          <p className="text-xs text-white/50 font-light">
            Establish new stellar core credentials.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-display uppercase tracking-widest text-white/60 font-semibold block">
              Creator Identity / Name
            </label>
            <div className="relative">
              <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full bg-white/[0.02] border border-white/5 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-white/20 outline-none focus:border-blue-400 focus:bg-white/[0.04] focus:shadow-[0_0_12px_rgba(96,165,250,0.2)] transition-all duration-300 font-light"
              />
            </div>
          </div>

          {/* Email input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-display uppercase tracking-widest text-white/60 font-semibold block">
              Mail Address
            </label>
            <div className="relative">
              <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full bg-white/[0.02] border border-white/5 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-white/20 outline-none focus:border-blue-400 focus:bg-white/[0.04] focus:shadow-[0_0_12px_rgba(96,165,250,0.2)] transition-all duration-300 font-light"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-display uppercase tracking-widest text-white/60 font-semibold block">
              Access Code
            </label>
            <div className="relative">
              <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-white/[0.02] border border-white/5 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-white/20 outline-none focus:border-blue-400 focus:bg-white/[0.04] focus:shadow-[0_0_12px_rgba(96,165,250,0.2)] transition-all duration-300 font-light"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-xs font-display tracking-[0.2em] uppercase font-bold text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(99,102,241,0.35)] active:scale-[0.98] disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Deploying Core...
              </>
            ) : (
              <>
                <LogIn size={13} className="transform -translate-y-[0.5px]" />
                Register Account
              </>
            )}
          </button>
        </form>

        {/* Separator */}
        <div className="relative my-6 text-center">
          <hr className="border-white/5" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 bg-black text-[9px] font-display tracking-widest text-white/30">
            OR SIGN UP WITH
          </span>
        </div>

        {/* Social logins */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleSubmit}
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/5 bg-white/2 hover:bg-white/5 text-xs text-white/80 hover:text-white transition-colors duration-300 active:scale-95"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.24 10.285V13.4h6.887C18.2 15.614 15.645 18 12.24 18c-3.86 0-7-3.14-7-7s3.14-7 7-7c1.7 0 3.25.61 4.47 1.62l2.437-2.437C17.312 1.696 14.933 1 12.24 1 6.58 1 2 5.58 2 11.24s4.58 10.24 10.24 10.24c5.795 0 10.254-4.074 10.254-10.24 0-.695-.08-1.355-.22-1.955H12.24z" />
            </svg>
            Google
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/5 bg-white/2 hover:bg-white/5 text-xs text-white/80 hover:text-white transition-colors duration-300 active:scale-95"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            GitHub
          </button>
        </div>

        {/* Footer toggles */}
        <p className="text-center text-[10px] text-white/40 mt-8 font-light">
          ALREADY SIGNED UP?{" "}
          <Link href="/login" className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">
            LOGIN HERE
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
