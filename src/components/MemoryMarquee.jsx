import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { ImageOff } from "lucide-react";
import React, { useEffect, useMemo } from "react";

const placeholderItems = Array.from({ length: 6 }, (_, index) => ({
  id: `placeholder-${index}`,
}));

export default function MemoryMarquee({ items = [], reverse = false }) {
  const controls = useAnimationControls();
  const shouldReduceMotion = useReducedMotion();
  const hasImages = items.length > 0;
  const displayItems = hasImages ? items : placeholderItems;

  const marqueeItems = useMemo(
    () => [...displayItems, ...displayItems],
    [displayItems],
  );

  useEffect(() => {
    if (shouldReduceMotion) {
      controls.set({ x: 0 });
      return;
    }

    controls.start({
      x: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
      transition: {
        duration: hasImages ? 34 : 28,
        ease: "linear",
        repeat: Infinity,
      },
    });
  }, [controls, hasImages, reverse, shouldReduceMotion]);

  const pause = () => {
    if (!shouldReduceMotion) controls.stop();
  };

  const resume = () => {
    if (shouldReduceMotion) return;

    controls.start({
      x: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
      transition: {
        duration: hasImages ? 34 : 28,
        ease: "linear",
        repeat: Infinity,
      },
    });
  };

  return (
    <div
      className="memory-marquee"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
    >
      <motion.div className="memory-track" animate={controls}>
        {marqueeItems.map((item, index) => (
          <motion.figure
            key={`${item.src || item.id}-${index}`}
            className="memory-card magnetic-target"
            whileHover={{ y: -8, scale: 1.025 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            tabIndex={0}
            data-magnetic
          >
            {hasImages ? (
              <img
                src={item.src}
                alt={item.alt || "Personal memory"}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="memory-placeholder">
                <ImageOff size={28} />
                <span>Awaiting Image</span>
              </div>
            )}
            <figcaption className="sr-only">
              {hasImages ? item.alt || "Personal memory" : "Awaiting memory image"}
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
    </div>
  );
}
