import { AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CursorAura from "./components/CursorAura.jsx";
import Navigation from "./components/Navigation.jsx";
import Memories from "./pages/Memories.jsx";
import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import ResearchInterests from "./sections/ResearchInterests.jsx";
import Projects from "./sections/Projects.jsx";
import Achievements from "./sections/Achievements.jsx";
import Resume from "./sections/Resume.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";

gsap.registerPlugin(ScrollTrigger);

function PortfolioHome() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        <ResearchInterests />
        <Projects />
        <Achievements />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname]);

  return null;
}

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      smoothWheel: true,
      wheelMultiplier: 0.85,
    });

    const raf = (time) => lenis.raf(time * 1000);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 72, filter: "blur(18px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 82%",
            },
          },
        );
      });

      gsap.utils.toArray("[data-parallax]").forEach((element) => {
        gsap.to(element, {
          yPercent: Number(element.dataset.parallax) || -12,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    });

    return () => {
      ctx.revert();
      lenis.destroy();
      gsap.ticker.remove(raf);
    };
  }, []);

  return (
    <AnimatePresence>
      <div className="min-h-screen overflow-hidden bg-void text-ink selection:bg-labCyan selection:text-void">
        <ScrollToTop />
        <CursorAura />
        <Routes>
          <Route path="/" element={<PortfolioHome />} />
          <Route path="/memories" element={<Memories />} />
        </Routes>
      </div>
    </AnimatePresence>
  );
}
