import { motion } from "framer-motion";
import React from "react";
import GlassPanel from "../components/GlassPanel.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { journey } from "../data/portfolio";

export default function About() {
  return (
    <section id="about" className="section-shell">
      <SectionHeader eyebrow="Research Journey" title="From curiosity to doctoral research">
        A portfolio designed as a living laboratory for Jit Malla&apos;s work across
        machine learning, vision, and structured intelligence.
      </SectionHeader>
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {journey.map((item, index) => (
            <GlassPanel
              key={item.title}
              data-reveal
              whileHover={{ y: -10, rotateX: 3, rotateY: index - 1 }}
              className="relative min-h-72 p-7"
            >
              <span className="mb-8 inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 font-mono text-xs text-labMint">
                {item.year}
              </span>
              <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
              <p className="mt-5 leading-7 text-slate-300">{item.body}</p>
              <motion.div
                className="absolute bottom-6 left-7 right-7 h-px bg-gradient-to-r from-labCyan via-labMint to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.9 }}
              />
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}
