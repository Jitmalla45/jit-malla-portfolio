import { motion } from "framer-motion";
import { Download, FileText, GraduationCap } from "lucide-react";
import React from "react";
import GlassPanel from "../components/GlassPanel.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { profile } from "../data/portfolio";

export default function Resume() {
  return (
    <section id="resume" className="section-shell">
      <SectionHeader eyebrow="Resume" title="Research profile, ready to send">
        A polished resume panel with a download action prepared for a PDF in
        the public folder.
      </SectionHeader>
      <GlassPanel data-reveal className="mx-auto max-w-5xl overflow-hidden p-0">
        <div className="grid lg:grid-cols-[.85fr_1.15fr]">
          <div className="bg-white/[0.045] p-8">
            <div className="grid h-24 w-24 place-items-center rounded-lg border border-labCyan/30 bg-labCyan/10 text-labCyan shadow-glow">
              <FileText size={42} />
            </div>
            <h3 className="mt-8 text-3xl font-semibold text-white">{profile.name}</h3>
            <p className="mt-3 text-slate-300">
              {profile.title}
            </p>
            <motion.a
              className="cv-button mt-8"
              href={profile.cvPath}
              target="_blank"
              rel="noreferrer"
              download
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download size={18} />
              Download CV
            </motion.a>
          </div>
          <div className="grid gap-4 p-8 sm:grid-cols-2">
            {[
              "AI/ML Researcher",
              "Machine Learning",
              "Deep Learning",
              "Computer Vision",
              "Graph Neural Networks",
              "AI Research",
            ].map((item) => (
              <div key={item} className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
                <GraduationCap className="mb-5 text-labMint" size={22} />
                <p className="font-medium text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </GlassPanel>
    </section>
  );
}
