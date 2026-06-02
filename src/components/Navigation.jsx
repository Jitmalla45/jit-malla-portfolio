import { motion } from "framer-motion";
import { Atom, Download } from "lucide-react";
import React from "react";
import { navItems } from "../data/portfolio";

export default function Navigation() {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed left-0 right-0 top-0 z-40 border-b border-white/10 bg-void/45 backdrop-blur-2xl"
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#hero" className="group flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-labCyan/40 bg-labCyan/10 text-labCyan shadow-glow">
            <Atom size={18} />
          </span>
          <span className="font-mono text-sm uppercase tracking-[0.22em] text-white">
            Jit Malla
          </span>
        </a>
        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.045] p-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="rounded-full px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              {item}
            </a>
          ))}
        </div>
        <a
          href="#resume"
          className="inline-flex h-10 items-center gap-2 rounded-full border border-labMint/30 bg-labMint/10 px-4 text-sm font-medium text-labMint transition hover:border-labMint hover:bg-labMint/20"
        >
          <Download size={16} />
          CV
        </a>
      </nav>
    </motion.header>
  );
}
