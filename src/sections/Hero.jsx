import {
  ArrowDown,
  BrainCircuit,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Braces,
  Binary,
  Images,
  GraduationCap,
  Music4,
  ShieldCheck,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { githubStats, heroDashboard, profile } from "../data/portfolio";

const words = [
  "Neuro-symbolic architectures",
  "Multimodal policy alignment",
  "Logic-guided trustworthy AI",
  "Trust and transparency in AI",
];

const widgetIcons = [ShieldCheck, GraduationCap, BrainCircuit, ShieldCheck];

export default function Hero() {
  return (
    <section
      id="hero"
      className="hero-lab relative min-h-screen overflow-hidden bg-lab-radial pt-16"
    >
      <div className="absolute inset-0 opacity-50">
        <div className="mobile-hero-backdrop absolute inset-0" aria-hidden="true" />
      </div>
      <div className="hero-spotlight absolute inset-0" />
      <div className="scanlines absolute inset-0" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-void to-transparent" />
      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
        <div className="order-2 lg:order-1">
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-labCyan/30 bg-labCyan/10 px-4 py-2 text-sm text-labCyan shadow-glow backdrop-blur-xl">
            <span className="h-2 w-2 animate-pulse rounded-full bg-labMint" />
            {profile.title}
          </div>
          <h1 className="max-w-4xl text-balance text-6xl font-semibold leading-[0.95] text-white sm:text-7xl lg:text-8xl">
            {profile.name}
          </h1>
          <div className="mt-7 h-9 overflow-hidden font-mono text-lg text-labMint md:text-2xl">
            <div className="type-stack">
              {words.map((word) => (
                <div key={word}>{word}</div>
              ))}
            </div>
          </div>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
            Exploring neuro-symbolic architectures for multimodal policy
            alignment, with logic-centered trust and transparency in AI.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a className="primary-button magnetic-target" href="#projects" data-magnetic>
              <BrainCircuit size={18} />
              Explore Research
            </a>
            <a className="secondary-button magnetic-target" href="#contact" data-magnetic>
              <Mail size={18} />
              Contact
            </a>
            <a
              className="social-button magnetic-target"
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="Open LinkedIn profile"
              data-magnetic
            >
              <Linkedin size={18} />
              LinkedIn
            </a>
            <a
              className="social-button magnetic-target"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="Open GitHub profile"
              data-magnetic
            >
              <Github size={18} />
              GitHub
            </a>
            <a
              className="social-button magnetic-target"
              href={profile.geeksforgeeks}
              target="_blank"
              rel="noreferrer"
              aria-label="Open GeeksforGeeks profile"
              data-magnetic
            >
              <Braces size={18} />
              GeeksForGeeks
            </a>
            <a
              className="social-button magnetic-target"
              href={profile.leetcode}
              target="_blank"
              rel="noreferrer"
              aria-label="Open LeetCode profile"
              data-magnetic
            >
              <Binary size={18} />
              LeetCode
            </a>
            <Link
              className="social-button magnetic-target"
              to="/memories"
              aria-label="Open personal memories page"
              data-magnetic
            >
              <Images size={18} />
              Personal Memories
            </Link>
            <a
              className="social-button magnetic-target"
              href={profile.youtubemusic}
              target="_blank"
              rel="noreferrer"
              aria-label="Open LeetCode profile"
              data-magnetic
            >
              <Music4 size={18} />
              Playlist 🎧
            </a>
          </div>
        </div>
        <div className="order-1 relative mt-4 grid gap-6 lg:order-2 lg:mt-0">
          <div className="lab-dashboard">
            <div className="mb-5 text-center">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-labCyan">
                Dashboard
              </span>
            </div>
            <div className="grid justify-items-center gap-5">
              <div
                className="profile-frame dashboard-profile magnetic-target w-full p-3"
                data-magnetic
              >
                <img
                  src={profile.profileImage}
                  alt={`${profile.name} profile portrait`}
                  width="720"
                  height="1080"
                  decoding="async"
                  fetchPriority="high"
                  className="aspect-[4/5] w-full rounded-lg object-cover"
                />
              </div>
              <div className="dashboard-highlights">
                {heroDashboard.map((item, index) => {
                  const Icon = widgetIcons[index] || BrainCircuit;

                  return (
                    <div
                      key={item.value}
                      className="lab-widget magnetic-target"
                      data-magnetic
                    >
                      <Icon size={17} />
                      <span>{item.value}</span>
                    </div>
                  );
                })}
              </div>
              <div className="dashboard-socials">
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="social-chip magnetic-target"
                  aria-label="Open LinkedIn profile"
                  data-magnetic
                >
                  <Linkedin size={18} />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="social-chip social-chip-github magnetic-target"
                  aria-label="Open GitHub profile"
                  data-magnetic
                >
                  <Github size={18} />
                  <span>@{githubStats.handle}</span>
                </a>
                <a
                  href={profile.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="social-chip social-chip-instagram magnetic-target"
                  aria-label="Open Instagram profile"
                  data-magnetic
                >
                  <Instagram size={18} />
                  <span>Instagram</span>
                </a>
                <a
                  href={profile.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="social-chip social-chip-facebook magnetic-target"
                  aria-label="Open Facebook profile"
                  data-magnetic
                >
                  <Facebook size={18} />
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 z-20 grid -translate-x-1/2 place-items-center text-slate-300"
        aria-label="Scroll to about"
      >
        <span className="mb-3 font-mono text-[10px] uppercase tracking-[0.35em]">Scroll</span>
        <ArrowDown className="animate-bounce text-labCyan" size={22} />
      </a>
    </section>
  );
}
