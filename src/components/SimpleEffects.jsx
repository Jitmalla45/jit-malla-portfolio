import React, { useEffect, useRef } from "react";

export default function SimpleEffects() {
  const bgRef = useRef(null);
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
      const scrollShift = Math.round(progress * 140);
      const scrollShiftY = Math.round(scrollShift * 0.55);
      const scrollShiftSoft = Math.round(scrollShift * 0.35);
      const scrollShiftTiny = Math.round(scrollShift * 0.22);
      const scrollShiftNode = Math.round(scrollShift * 0.25);
      const scrollRotate = (progress * 10 - 5).toFixed(2);

      progressRef.current?.style.setProperty("--scroll-progress", String(progress));
      bgRef.current?.style.setProperty("--scroll-progress", String(progress));
      bgRef.current?.style.setProperty("--scroll-shift", `${scrollShift}px`);
      bgRef.current?.style.setProperty("--scroll-shift-y", `${scrollShiftY}px`);
      bgRef.current?.style.setProperty("--scroll-shift-soft", `${scrollShiftSoft}px`);
      bgRef.current?.style.setProperty("--scroll-shift-tiny", `${scrollShiftTiny}px`);
      bgRef.current?.style.setProperty("--scroll-shift-node", `${scrollShiftNode}px`);
      bgRef.current?.style.setProperty("--scroll-rotate", `${scrollRotate}deg`);
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
      <div ref={bgRef} className="ai-simple-bg" aria-hidden="true">
        <svg className="ai-neural-map" viewBox="0 0 1200 800" focusable="false">
          <path className="ai-map-link ai-map-link-one" d="M82 612 C235 485 318 548 444 366 S694 206 842 314 1038 328 1134 162" />
          <path className="ai-map-link ai-map-link-two" d="M104 182 C268 244 284 382 448 438 S666 556 814 476 1000 528 1128 650" />
          <path className="ai-map-link ai-map-link-three" d="M222 722 C338 580 482 640 570 438 S718 192 976 94" />
          <path className="ai-map-link ai-map-link-four" d="M168 392 C330 330 456 220 620 290 S834 456 1030 392" />
          <circle className="ai-map-node ai-map-node-one" cx="178" cy="392" r="7" />
          <circle className="ai-map-node ai-map-node-two" cx="444" cy="366" r="6" />
          <circle className="ai-map-node ai-map-node-three" cx="620" cy="290" r="8" />
          <circle className="ai-map-node ai-map-node-four" cx="814" cy="476" r="6" />
          <circle className="ai-map-node ai-map-node-five" cx="1030" cy="392" r="7" />
        </svg>
        <span className="ai-scroll-path ai-scroll-path-one" />
        <span className="ai-scroll-path ai-scroll-path-two" />
        <span className="ai-scroll-path ai-scroll-path-three" />
        <span className="ai-data-stream ai-data-stream-one" />
        <span className="ai-data-stream ai-data-stream-two" />
        <span className="ai-data-stream ai-data-stream-three" />
        <span className="ai-bg-node ai-bg-node-one" />
        <span className="ai-bg-node ai-bg-node-two" />
        <span className="ai-bg-node ai-bg-node-three" />
        <span className="ai-bg-node ai-bg-node-four" />
        <span className="ai-bg-node ai-bg-node-five" />
        <span className="ai-code-token ai-code-token-one">1011</span>
        <span className="ai-code-token ai-code-token-two">graph.ai()</span>
        <span className="ai-code-token ai-code-token-three">model.fit()</span>
        <span className="ai-code-token ai-code-token-four">vision.encode</span>
        <span className="ai-code-token ai-code-token-five">trustworthy AI</span>
        <span className="ai-code-token ai-code-token-six">neural nets</span>
        <span className="ai-code-token ai-code-token-seven">data mining</span>
        <span className="ai-code-token ai-code-token-eight">HCI + ML</span>
        <span className="ai-chip ai-chip-one" />
        <span className="ai-chip ai-chip-two" />
        <span className="ai-chip ai-chip-three" />
      </div>
      <div ref={progressRef} className="scroll-progress" aria-hidden="true" />
      <div ref={pointerRef} className="pointer-signal" aria-hidden="true" />
    </>
  );
}
