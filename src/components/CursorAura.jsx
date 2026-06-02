import React, { useEffect, useRef } from "react";

export default function CursorAura() {
  const auraRef = useRef(null);
  const cursorRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      return undefined;
    }

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const particles = [];
    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let frameId;
    let lastSpawn = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const update = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;

      if (!auraRef.current) return;
      auraRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      }

      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);

      const now = performance.now();
      if (now - lastSpawn > 36 && particles.length < 34) {
        particles.push({
          x: event.clientX,
          y: event.clientY,
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          life: 1,
          radius: 1.2 + Math.random() * 1.8,
        });
        lastSpawn = now;
      }
    };

    const animate = () => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index];
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 0.018;

        if (particle.life <= 0) {
          particles.splice(index, 1);
          continue;
        }

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(53, 243, 255, ${particle.life * 0.5})`;
        context.fill();

        if (index > 0) {
          const previous = particles[index - 1];
          const distance = Math.hypot(particle.x - previous.x, particle.y - previous.y);
          if (distance < 72) {
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(previous.x, previous.y);
            context.strokeStyle = `rgba(100, 255, 189, ${(1 - distance / 72) * particle.life * 0.25})`;
            context.lineWidth = 1;
            context.stroke();
          }
        }
      }

      context.beginPath();
      context.arc(pointer.x, pointer.y, 2, 0, Math.PI * 2);
      context.fillStyle = "rgba(100, 255, 189, 0.75)";
      context.fill();

      frameId = requestAnimationFrame(animate);
    };

    const updateMagnet = (event) => {
      const target = event.target.closest("[data-magnetic]");
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      target.style.transform = `translate3d(${x * 0.12}px, ${y * 0.12}px, 0)`;
    };

    const resetMagnet = (event) => {
      const target = event.target.closest("[data-magnetic]");
      if (!target) return;

      target.style.transform = "";
    };

    resize();
    animate();
    window.addEventListener("pointermove", update);
    window.addEventListener("resize", resize);
    document.addEventListener("pointermove", updateMagnet);
    document.addEventListener("pointerleave", resetMagnet, true);
    document.addEventListener("pointerout", resetMagnet, true);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", update);
      window.removeEventListener("resize", resize);
      document.removeEventListener("pointermove", updateMagnet);
      document.removeEventListener("pointerleave", resetMagnet, true);
      document.removeEventListener("pointerout", resetMagnet, true);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-50 hidden md:block"
        aria-hidden="true"
      />
      <div
        ref={auraRef}
        className="pointer-events-none fixed left-0 top-0 z-50 hidden h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-labCyan/10 blur-3xl transition-transform duration-300 md:block"
      />
      <div
        ref={cursorRef}
        className="ai-cursor pointer-events-none fixed left-0 top-0 z-50 hidden md:block"
        aria-hidden="true"
      />
    </>
  );
}
