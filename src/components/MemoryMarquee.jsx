import { ImageOff } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ImageLightbox from "./ImageLightbox.jsx";

const placeholderItems = Array.from({ length: 6 }, (_, index) => ({
  id: `placeholder-${index}`,
}));

export default function MemoryMarquee({ items = [], reverse = false }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [canAnimateMarquee, setCanAnimateMarquee] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const hasImages = items.length > 0;

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const update = () => setCanAnimateMarquee(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  const displayItems = useMemo(
    () =>
      hasImages
        ? items.slice(0, Math.min(items.length, canAnimateMarquee ? 12 : 6)).map((item, index) => ({
            ...item,
            originalIndex: index,
          }))
        : placeholderItems,
    [canAnimateMarquee, hasImages, items],
  );

  const marqueeItems = useMemo(
    () => (canAnimateMarquee ? [...displayItems, ...displayItems] : displayItems),
    [canAnimateMarquee, displayItems],
  );

  const openLightbox = useCallback(
    (index) => {
      if (!hasImages || displayItems.length === 0) return;
      const displayItem = displayItems[index % displayItems.length];
      setActiveIndex(displayItem.originalIndex || 0);
      setIsLightboxOpen(true);
    },
    [displayItems, hasImages],
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

  return (
    <div className="memory-marquee">
      <div className={`memory-track ${canAnimateMarquee ? "memory-track-animated" : ""} ${reverse ? "memory-track-reverse" : ""}`}>
        {marqueeItems.map((item, index) => (
          <figure
            key={`${item.src || item.id}-${index}`}
            className="memory-card magnetic-target"
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
                decoding="async"
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
          </figure>
        ))}
      </div>
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
