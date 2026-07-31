import React, { useEffect, useRef } from "react";

export default function SimpleEffects() {
  const pointerRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const canUsePointer = window.matchMedia(
      "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    ).matches;

    if (!canUsePointer) return undefined;

    let frameId = 0;
    let pointerX = 0;
    let pointerY = 0;

    const renderPointer = () => {
      frameId = 0;
      pointerRef.current?.style.setProperty(
        "transform",
        `translate3d(${pointerX}px, ${pointerY}px, 0)`,
      );
    };

    const handlePointerMove = (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;

      if (!frameId) {
        frameId = requestAnimationFrame(renderPointer);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  useEffect(() => {
    let frameId = 0;

    const renderProgress = () => {
      frameId = 0;
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      progressRef.current?.style.setProperty("--scroll-progress", String(progress));
    };

    const handleScroll = () => {
      if (!frameId) {
        frameId = requestAnimationFrame(renderProgress);
      }
    };

    renderProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="ai-simple-bg" aria-hidden="true">
        <span className="ai-bg-node ai-bg-node-one" />
        <span className="ai-bg-node ai-bg-node-two" />
        <span className="ai-bg-node ai-bg-node-three" />
      </div>
      <div ref={progressRef} className="scroll-progress" aria-hidden="true" />
      <div ref={pointerRef} className="pointer-signal" aria-hidden="true" />
    </>
  );
}
