import React, { useEffect, useRef } from "react";

export default function SimpleEffects() {
  const pointerRef = useRef(null);

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

  return (
    <>
      <div className="ai-simple-bg" aria-hidden="true" />
      <div ref={pointerRef} className="pointer-signal" aria-hidden="true" />
    </>
  );
}
