import { Award, Sparkles } from "lucide-react";
import React from "react";
import GlassPanel from "../components/GlassPanel.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { achievements } from "../data/portfolio";

export default function Achievements() {
  return (
    <section id="achievements" className="section-shell">
      <SectionHeader eyebrow="Achievements" title="Milestones with momentum">
        A concise timeline centered on the IIT Kharagpur PhD selection and the
        research path that leads into it.
      </SectionHeader>
      <div className="mx-auto max-w-4xl">
        {achievements.map((achievement, index) => (
          <div data-reveal key={achievement.title} className="relative pl-12">
            <div className="absolute bottom-0 left-4 top-0 w-px bg-gradient-to-b from-labCyan via-white/20 to-transparent" />
            <div className="absolute left-0 top-7 grid h-8 w-8 place-items-center rounded-full border border-labCyan/40 bg-void text-labCyan shadow-glow">
              {achievement.pulse ? <Sparkles size={16} /> : <Award size={16} />}
            </div>
            <GlassPanel
              className={`mb-5 p-6 ${
                achievement.pulse
                  ? "border-labGold/35 bg-labGold/[0.07] shadow-glow"
                  : ""
              }`}
            >
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-labMint">
                    Milestone 0{index + 1}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">
                    {achievement.title}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-300">{achievement.detail}</p>
                </div>
                {achievement.pulse && (
                  <span className="rounded-full border border-labGold/40 bg-labGold/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-labGold">
                    {achievement.badge || "Highlight"}
                  </span>
                )}
              </div>
            </GlassPanel>
          </div>
        ))}
      </div>
    </section>
  );
}
