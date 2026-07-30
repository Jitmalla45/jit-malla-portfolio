import { AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CodeScrollTrail from "./components/CodeScrollTrail.jsx";
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
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const shouldUseSmoothScroll = hasFinePointer && !prefersReducedMotion;
    let lenis;
    let raf;

    if (shouldUseSmoothScroll) {
      lenis = new Lenis({
        duration: 0.95,
        smoothWheel: true,
        wheelMultiplier: 0.9,
      });

      raf = (time) => lenis.raf(time * 1000);

      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(500, 33);
    }

    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 42 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
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
      if (lenis) {
        lenis.destroy();
      }
      if (raf) {
        gsap.ticker.remove(raf);
      }
    };
  }, []);

  return (
    <AnimatePresence>
      <div className="min-h-screen overflow-hidden bg-void text-ink selection:bg-labCyan selection:text-void">
        <ScrollToTop />
        <CursorAura />
        <CodeScrollTrail />
        <Routes>
          <Route path="/" element={<PortfolioHome />} />
          <Route path="/memories" element={<Memories />} />
        </Routes>
      </div>
    </AnimatePresence>
  );
}
