"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, Send, X } from "lucide-react";

interface AiTerminalProps {
  onClose: () => void;
  onWarpToggle: () => void;
}

export default function AiTerminal({ onClose, onWarpToggle }: AiTerminalProps) {
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<string[]>([
    "CONSTITUENT SCANNER: ACTIVE",
    "HOST GREETING RECOGNIZED. ACCESS GRANTED.",
    "EXPLORER, WELCOME TO THE PORTFOLIO DIAGNOSTIC TERMINAL.",
    "TYPE 'help' TO DISCOVER COMMAND CODES."
  ]);
  const feedEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    feedEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const userLog = `explorer@system:~$ ${input}`;
    setLogs((prev) => [...prev, userLog]);
    setInput("");

    // Command Parser
    setTimeout(() => {
      let response = "";
      if (cmd === "help") {
        response = `AVAILABLE CODES:
  help       - Display terminal command codes list.
  entities   - List all active PortFolio stellar entities.
  warp       - Engage/Disengage hyperdrive speed coordinates.
  clear      - Wipe terminal log screens.
  close      - Disconnect diagnostic terminal feed.`;
      } else if (cmd === "entities") {
        response = `SCANNING CELLULAR OBJECTS...
  [STAR]       Origin Stellar Core (RA 0.00 DEC 0.00)
  [PLANET]     WebGL Terrain Engine (RA -3.2 DEC -1.8)
  [PLANET]     AI Agent Pipeline (RA 2.5 DEC -2.5)
  [PLANET]     Consensus Ledger Node (RA -4.2 DEC 1.5)
  [STATION]    Professional Experience Port (RA -2.2 DEC 3.2)
  [CELLS]      Skills Energy Grid (RA 4.2 DEC 2.5)
  [CONSTELL]   Locked Achievements Map (RA 3.2 DEC -1.2)
  [SATELLITE]  Signal Communication Array (RA 5.5 DEC -3.2)`;
      } else if (cmd === "warp") {
        response = "HYPERDRIVE WARP COORDINATES ACTIVATED. HOLDING POSITION STRETCH...";
        onWarpToggle();
      } else if (cmd === "clear") {
        setLogs([]);
        return;
      } else if (cmd === "close") {
        onClose();
        return;
      } else if (cmd === "hello" || cmd === "hi") {
        response = "GREETING ACKNOWLEDGED. CORE ENGINE INTEGRITY AT 100%. EXPLORATION FEED STANDBY.";
      } else {
        response = `COMMAND ERROR: Code '${cmd}' unrecognized. Type 'help' to review protocols.`;
      }

      setLogs((prev) => [...prev, response]);
    }, 400);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4 }}
      className="absolute bottom-16 left-8 z-30 w-full max-w-md pointer-events-auto"
    >
      <div className="glass-panel border-cyan-500/20 shadow-[0_15px_40px_rgba(0,0,0,0.85)] rounded-2xl overflow-hidden flex flex-col h-[280px]">
        {/* Terminal Header */}
        <div className="px-4 py-2.5 bg-black/60 border-b border-white/5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-cyan-400">
            <Terminal size={14} />
            <span className="text-[9px] font-display uppercase tracking-widest font-bold">
              AI Diagnostic Terminal
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors"
          >
            <X size={12} />
          </button>
        </div>

        {/* Terminal Feed logs */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-[9px] text-cyan-300 leading-normal custom-scrollbar">
          {logs.map((log, idx) => (
            <div key={idx} className="whitespace-pre-line break-words border-l-2 border-cyan-500/10 pl-2">
              {log}
            </div>
          ))}
          <div ref={feedEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleCommand} className="p-2.5 bg-black/40 border-t border-white/5 flex gap-2 shrink-0">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type command (e.g. help, entities, warp)..."
            className="flex-1 bg-white/[0.02] border border-white/5 rounded-lg py-2 px-3 text-[10px] font-mono text-white outline-none focus:border-cyan-400/40 transition-colors"
          />
          <button
            type="submit"
            className="px-3 rounded-lg bg-cyan-600/10 border border-cyan-400/20 text-cyan-300 hover:bg-cyan-500/20 transition-all duration-300 active:scale-95 flex items-center justify-center"
          >
            <Send size={10} />
          </button>
        </form>
      </div>
    </motion.div>
  );
}
