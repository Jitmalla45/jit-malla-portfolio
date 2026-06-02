import { Github, Linkedin, Facebook, Instagram} from "lucide-react";
import React from "react";
import { profile } from "../data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-void px-4 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-400">
        {profile.name} | AI/ML Research Enthusiast
      </p>
        <div className="flex items-center gap-3">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="grid h-10 w-10 place-items-center rounded-full border border-labCyan/30 bg-labCyan/10 text-labCyan transition hover:border-labCyan hover:bg-labCyan/20 hover:shadow-glow"
            aria-label="Open LinkedIn profile"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="grid h-10 w-10 place-items-center rounded-full border border-labMint/30 bg-labMint/10 text-labMint transition hover:border-labMint hover:bg-labMint/20 hover:shadow-glow"
            aria-label="Open GitHub profile"
          >
            <Github size={18} />
          </a>
          <a
            href={profile.facebook}
            target="_blank"
            rel="noreferrer"
            className="grid h-10 w-10 place-items-center rounded-full border border-labMint/30 bg-labMint/10 text-labMint transition hover:border-labMint hover:bg-labMint/20 hover:shadow-glow"
            aria-label="Open Facebook profile"
          >
            <Facebook size={18} />
          </a>
          <a
            href={profile.instagram}
            target="_blank"
            rel="noreferrer"
            className="grid h-10 w-10 place-items-center rounded-full border border-labMint/30 bg-labMint/10 text-labMint transition hover:border-labMint hover:bg-labMint/20 hover:shadow-glow"
            aria-label="Open Instagram profile"
          >
            <Instagram size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
