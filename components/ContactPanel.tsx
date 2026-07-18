"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, X, Mail, User, MessageSquare } from "lucide-react";

interface ContactPanelProps {
  onClose: () => void;
}

export default function ContactPanel({ onClose }: ContactPanelProps) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setForm({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="absolute inset-0 z-30 flex items-center justify-center p-4 pointer-events-none"
    >
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[4px] pointer-events-auto cursor-pointer"
        onClick={onClose}
      />

      {/* Contact Form Card */}
      <div className="relative z-10 w-full max-w-md glass-panel-glow rounded-3xl p-6 sm:p-8 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] pointer-events-auto overflow-hidden">
        {/* Glow Strip */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full border border-white/5 bg-white/3 hover:bg-white/10 text-white/60 hover:text-white transition-all duration-300 active:scale-90"
        >
          <X size={14} />
        </button>

        <AnimatePresence mode="wait">
          {!isSent ? (
            <motion.form
              key="contact-form"
              onSubmit={handleSubmit}
              className="space-y-5"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Titles */}
              <div className="space-y-1">
                <h2 className="text-xl font-semibold font-display tracking-tight text-white leading-tight">
                  Establish Connection
                </h2>
                <p className="text-xs text-white/50 font-light">
                  Send an encrypted transmission to my direct interface.
                </p>
              </div>

              {/* Name Input */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-display uppercase tracking-widest text-white/60 font-semibold block">
                  Identifier / Name
                </label>
                <div className="relative">
                  <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full bg-white/[0.02] border border-white/5 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-white/20 outline-none focus:border-blue-400 focus:bg-white/[0.04] focus:shadow-[0_0_12px_rgba(96,165,250,0.2)] transition-all duration-300 font-light"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-display uppercase tracking-widest text-white/60 font-semibold block">
                  Quantum Mail / Email
                </label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full bg-white/[0.02] border border-white/5 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-white/20 outline-none focus:border-blue-400 focus:bg-white/[0.04] focus:shadow-[0_0_12px_rgba(96,165,250,0.2)] transition-all duration-300 font-light"
                  />
                </div>
              </div>

              {/* Message Input */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-display uppercase tracking-widest text-white/60 font-semibold block">
                  Payload / Message
                </label>
                <div className="relative">
                  <MessageSquare size={14} className="absolute left-3.5 top-3.5 text-white/30" />
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Compose message..."
                    className="w-full bg-white/[0.02] border border-white/5 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-white/20 outline-none focus:border-blue-400 focus:bg-white/[0.04] focus:shadow-[0_0_12px_rgba(96,165,250,0.2)] transition-all duration-300 resize-none font-light leading-relaxed"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-xs font-display tracking-[0.2em] uppercase font-bold text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4.5 w-4.5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Broadcasting...
                  </>
                ) : (
                  <>
                    <Send size={13} className="transform -translate-y-[0.5px]" />
                    Broadcast Signal
                  </>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="success-screen"
              className="py-10 text-center flex flex-col items-center justify-center space-y-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", damping: 15 }}
            >
              <motion.div
                initial={{ rotate: -90, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                <CheckCircle size={56} className="text-emerald-400 filter drop-shadow-[0_0_15px_rgba(52,211,153,0.4)]" />
              </motion.div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold font-display tracking-tight text-white">
                  Transmission Received
                </h3>
                <p className="text-xs text-white/50 font-light max-w-[280px] mx-auto leading-relaxed">
                  Your signal has been cataloged. A response will be beamed back to your coordinates shortly.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsSent(false);
                  onClose();
                }}
                className="mt-4 px-6 py-2 border border-white/10 hover:border-white/20 rounded-full text-[10px] font-display tracking-widest text-white/70 hover:text-white bg-white/2 hover:bg-white/5 transition-all duration-300 uppercase active:scale-95"
              >
                Return to Galaxy
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
