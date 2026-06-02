import { motion } from "framer-motion";
import React from "react";
import GlassPanel from "../components/GlassPanel.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { journey, profile } from "../data/portfolio";

export default function About() {
  return (
    <section id="about" className="section-shell">
      <SectionHeader eyebrow="Research Journey" title="From curiosity to doctoral research">
        A portfolio designed as a living laboratory for Jit Malla&apos;s work across
        machine learning, vision, and structured intelligence.
      </SectionHeader>
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <motion.div
          data-reveal
          className="profile-frame mx-auto w-full max-w-sm lg:sticky lg:top-24"
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
        >
          <img
            src={profile.profileImage}
            alt={`${profile.name} profile portrait`}
            className="aspect-[4/5] w-full rounded-lg object-cover"
          />
        </motion.div>
        <div className="grid gap-5">
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
