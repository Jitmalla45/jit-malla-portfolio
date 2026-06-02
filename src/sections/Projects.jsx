import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import React, { useState } from "react";
import GlassPanel from "../components/GlassPanel.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { projects } from "../data/portfolio";

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section id="projects" className="section-shell">
      <SectionHeader eyebrow="Projects" title="Research Projects">
        Selected works, experiments, and research contributions.
      </SectionHeader>
      <div className="mx-auto grid max-w-6xl auto-rows-[280px] gap-5 lg:grid-cols-3">
        {projects.map((project) => (
          <motion.button
            data-reveal
            key={project.title}
            onClick={() => setActiveProject(project)}
            whileHover={{ y: -8 }}
            className={`project-card group text-left ${project.span}`}
          >
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-labCyan">
              {project.category}
            </span>
            <h3 className="mt-6 max-w-xl text-3xl font-semibold text-white">
              {project.title}
            </h3>
            <p className="mt-5 max-w-xl leading-7 text-slate-300">
              {project.description}
            </p>
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="tag-pill">
                    {tag}
                  </span>
                ))}
              </div>
              <ExternalLink className="text-labMint transition group-hover:rotate-12" size={20} />
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-void/75 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <GlassPanel
              initial={{ y: 40, scale: 0.96 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 40, scale: 0.96 }}
              className="relative max-w-2xl p-8"
            >
              <button
                onClick={() => setActiveProject(null)}
                className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/10 text-white transition hover:bg-white/20"
                aria-label="Close project details"
              >
                <X size={18} />
              </button>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-labCyan">
                {activeProject.category}
              </p>
              <h3 className="mt-4 text-4xl font-semibold text-white">
                {activeProject.title}
              </h3>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                {activeProject.details}
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {activeProject.tags.map((tag) => (
                  <span key={tag} className="tag-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </GlassPanel>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
