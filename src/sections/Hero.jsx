import { motion } from "framer-motion";
import {
  ArrowDown,
  BrainCircuit,
  Facebook,
  Github,
  FlaskConical,
  Instagram,
  Linkedin,
  Mail,
  Terminal,
  Cpu,
  Braces,
  Binary,
  CodeXml,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";
import React, { useCallback } from "react";
import LabScene from "../components/LabScene.jsx";
import { githubStats, heroDashboard, profile } from "../data/portfolio";

const words = ["Machine Learning", "Deep Learning", "Computer Vision", "Graph Neural Networks"];

const widgetIcons = [ShieldCheck, GraduationCap];

export default function Hero() {
  const handlePointerMove = useCallback((event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5).toFixed(3);
    const y = ((event.clientY - rect.top) / rect.height - 0.5).toFixed(3);

    event.currentTarget.style.setProperty("--hero-x", x);
    event.currentTarget.style.setProperty("--hero-y", y);
    event.currentTarget.style.setProperty("--hero-spot-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--hero-spot-y", `${event.clientY - rect.top}px`);
  }, []);

  return (
    <section
      id="hero"
      className="hero-lab relative min-h-screen overflow-hidden bg-lab-radial pt-16"
      onPointerMove={handlePointerMove}
    >
      <div className="absolute inset-0 opacity-50">
        <LabScene />
      </div>
      <div className="hero-spotlight absolute inset-0" />
      <div className="scanlines absolute inset-0" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-void to-transparent" />
      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
        <motion.div
          style={{
            x: "calc(var(--hero-x, 0) * -18px)",
            y: "calc(var(--hero-y, 0) * -14px)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85 }}
            className="mb-7 inline-flex items-center gap-3 rounded-full border border-labCyan/30 bg-labCyan/10 px-4 py-2 text-sm text-labCyan shadow-glow backdrop-blur-xl"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-labMint" />
            {profile.title}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 42, filter: "blur(16px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.15, duration: 1.05, ease: "easeOut" }}
            className="max-w-4xl text-balance text-6xl font-semibold leading-[0.95] text-white sm:text-7xl lg:text-8xl"
          >
            {profile.name}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-7 h-9 overflow-hidden font-mono text-lg text-labMint md:text-2xl"
          >
            <div className="type-stack">
              {words.map((word) => (
                <div key={word}>AI/ML Researcher in {word}</div>
              ))}
            </div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.75 }}
            className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl"
          >
            Building intelligent systems at the edge of perception, reasoning,
            and graph-structured learning.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.75 }}
            className="mt-10 flex flex-wrap gap-4"
          >
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
          </motion.div>
        </motion.div>
        <motion.div
          data-parallax="-8"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1.1 }}
          style={{
            x: "calc(var(--hero-x, 0) * 24px)",
            y: "calc(var(--hero-y, 0) * 18px)",
          }}
          className="relative mt-16 grid gap-6 lg:mt-0"
        >
          <div className="lab-dashboard">
            <div className="mb-5 text-center">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-labCyan">
                Dashboard
              </span>
            </div>
            <div className="grid justify-items-center gap-5">
              <motion.div
                className="profile-frame dashboard-profile magnetic-target w-full p-3"
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                data-magnetic
              >
                <img
                  src={profile.profileImage}
                  alt={`${profile.name} profile portrait`}
                  className="aspect-[4/5] w-full rounded-lg object-cover"
                />
              </motion.div>
              <div className="dashboard-highlights">
                {heroDashboard.map((item, index) => {
                  const Icon = widgetIcons[index] || BrainCircuit;

                  return (
                    <motion.div
                      key={item.value}
                      className="lab-widget magnetic-target"
                      whileHover={{ y: -4, scale: 1.015 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      data-magnetic
                    >
                      <Icon size={17} />
                      <span>{item.value}</span>
                    </motion.div>
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
        </motion.div>
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
