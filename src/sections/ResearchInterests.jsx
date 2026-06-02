import { motion } from "framer-motion";
import { BrainCircuit, Eye, GitBranch, Layers3, Network } from "lucide-react";
import React from "react";
import SectionHeader from "../components/SectionHeader.jsx";
import { researchInterests } from "../data/portfolio";

const researchIcons = {
  "Computer Vision": Eye,
  "Scene Graph Generation": GitBranch,
  "Vision-Language Models": Layers3,
  "Graph Neural Networks": Network,
  "Neurosymbolic AI": BrainCircuit,
};

export default function ResearchInterests() {
  return (
    <section id="research" className="section-shell relative">
      <div className="neural-grid absolute inset-0 opacity-35" />
      <SectionHeader eyebrow="Research Interests" title="Visual intelligence with relational structure">
        Research directions centered on scene understanding, graph-based
        reasoning, and multimodal systems that connect perception with
        interpretable intelligence.
      </SectionHeader>
      <div className="relative mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-5">
        {researchInterests.map((interest, index) => {
          const Icon = researchIcons[interest.title] || Network;

          return (
            <motion.article
              data-reveal
              key={interest.title}
              whileHover={{ y: -14, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 240, damping: 18 }}
              className={`research-card flex flex-col ${index % 2 ? "lg:mt-14" : ""}`}
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-lg border border-labCyan/25 bg-labCyan/10 text-labCyan">
                  <Icon size={20} />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-slate-400">
                  0{index + 1}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white">{interest.title}</h3>
              <p className="mt-4 text-sm leading-6 text-slate-300">{interest.signal}</p>
              <p className="mt-5 border-t border-white/10 pt-5 font-mono text-[11px] uppercase leading-5 tracking-[0.16em] text-labCyan">
                {interest.focus}
              </p>
              <p className="mt-auto pt-8 font-mono text-xs uppercase tracking-[0.2em] text-labMint">
                {interest.metric}
              </p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
