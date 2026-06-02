import { motion } from "framer-motion";
import { ArrowLeft, Images, Sparkles } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import LabScene from "../components/LabScene.jsx";
import MemoryMarquee from "../components/MemoryMarquee.jsx";
import { memorySections } from "../data/memories.js";

export default function Memories() {
  return (
    <main className="memories-page relative min-h-screen overflow-hidden bg-lab-radial pt-6">
      <div className="absolute inset-0 opacity-35">
        <LabScene />
      </div>
      <div className="scanlines absolute inset-0" />
      <div className="neural-grid pointer-events-none absolute inset-0 opacity-35" />
      <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-void via-void/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-void to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="flex min-h-16 items-center justify-between gap-4">
          <Link to="/" className="secondary-button magnetic-target" data-magnetic>
            <ArrowLeft size={18} />
            Back to Portfolio
          </Link>
          <div className="hidden items-center gap-3 rounded-full border border-labCyan/25 bg-labCyan/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.22em] text-labCyan shadow-glow backdrop-blur-xl sm:inline-flex">
            <Sparkles size={15} />
            Memory Archive
          </div>
        </div>

        <section className="relative flex min-h-[calc(100vh-5rem)] items-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 34, filter: "blur(14px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="max-w-5xl"
          >
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-labCyan/30 bg-labCyan/10 px-4 py-2 text-sm text-labCyan shadow-glow backdrop-blur-xl">
              <span className="h-2 w-2 animate-pulse rounded-full bg-labMint" />
              Personal Archive
            </div>
            <h1 className="max-w-5xl text-balance text-5xl font-semibold leading-[0.98] text-white sm:text-7xl lg:text-8xl">
              Personal Memories
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
              A visual journey through school, college, university, and research life.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              {memorySections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="tag-pill transition hover:border-labCyan/50 hover:bg-labCyan/10 hover:text-white"
                >
                  {section.title}
                </a>
              ))}
            </div>
          </motion.div>
        </section>

        <div className="grid gap-20">
          {memorySections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              data-reveal
              className="memory-section"
            >
              <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
                <div>
                  <p className="mb-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.28em] text-labCyan">
                    <Images size={15} />
                    {section.eyebrow}
                  </p>
                  <h2 className="text-balance text-3xl font-semibold text-white md:text-5xl">
                    {section.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                    {section.subtitle}
                  </p>
                </div>
                <span className="w-fit rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-labMint backdrop-blur-xl">
                  {section.items.length || "Ready"} Frames
                </span>
              </div>
              <MemoryMarquee items={section.items} reverse={index % 2 === 1} />
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
