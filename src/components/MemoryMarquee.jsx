import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { ImageOff } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ImageLightbox from "./ImageLightbox.jsx";

const placeholderItems = Array.from({ length: 6 }, (_, index) => ({
  id: `placeholder-${index}`,
}));

export default function MemoryMarquee({ items = [], reverse = false }) {
  const controls = useAnimationControls();
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const hasImages = items.length > 0;
  const displayItems = hasImages ? items : placeholderItems;

  const marqueeItems = useMemo(
    () => [...displayItems, ...displayItems],
    [displayItems],
  );

  const openLightbox = useCallback(
    (index) => {
      if (!hasImages) return;
      setActiveIndex(index % items.length);
      setIsLightboxOpen(true);
    },
    [hasImages, items.length],
  );

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  const showPrevious = useCallback(() => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? items.length - 1 : currentIndex - 1,
    );
  }, [items.length]);

  const showNext = useCallback(() => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (shouldReduceMotion) {
      controls.set({ x: 0 });
      return;
    }

    controls.start({
      x: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
      transition: {
        duration: hasImages ? 100 : 75,
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
        duration: hasImages ? 100 : 75,
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
            role={hasImages ? "button" : undefined}
            aria-label={hasImages ? `Open ${item.alt || "personal memory"}` : undefined}
            onClick={() => openLightbox(index)}
            onKeyDown={(event) => {
              if (!hasImages) return;
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openLightbox(index);
              }
            }}
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
      <ImageLightbox
        images={items}
        activeIndex={activeIndex}
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
        onNext={showNext}
        onPrevious={showPrevious}
      />
    </div>
  );
}
