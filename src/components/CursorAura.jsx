import React, { useEffect, useRef } from "react";

export default function CursorAura() {
  const auraRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      return undefined;
    }

    let frameId = 0;
    let lastEvent = null;
    let activeMagnet = null;

    const resetMagnet = () => {
      if (activeMagnet) {
        activeMagnet.style.transform = "";
        activeMagnet = null;
      }
    };

    const renderPointer = () => {
      frameId = 0;
      if (!lastEvent || !auraRef.current) return;

      const { clientX, clientY, target } = lastEvent;
      auraRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }

      document.documentElement.style.setProperty("--cursor-x", `${clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${clientY}px`);

      const magnetTarget =
        typeof target?.closest === "function" ? target.closest("[data-magnetic]") : null;
      if (activeMagnet && activeMagnet !== magnetTarget) {
        activeMagnet.style.transform = "";
      }

      if (magnetTarget) {
        const rect = magnetTarget.getBoundingClientRect();
        const x = clientX - rect.left - rect.width / 2;
        const y = clientY - rect.top - rect.height / 2;
        magnetTarget.style.transform = `translate3d(${x * 0.1}px, ${y * 0.1}px, 0)`;
      }

      activeMagnet = magnetTarget;
    };

    const update = (event) => {
      lastEvent = event;
      if (!frameId) {
        frameId = requestAnimationFrame(renderPointer);
      }
    };

    window.addEventListener("pointermove", update);
    window.addEventListener("pointerleave", resetMagnet);

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      window.removeEventListener("pointermove", update);
      window.removeEventListener("pointerleave", resetMagnet);
      resetMagnet();
    };
  }, []);

  return (
    <>
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
