import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function ImageLightbox({
  images = [],
  activeIndex = 0,
  isOpen = false,
  onClose,
  onNext,
  onPrevious,
}) {
  const closeButtonRef = useRef(null);
  const modalRef = useRef(null);
  const activeImage = images[activeIndex];
  const canNavigate = images.length > 1;

  useEffect(() => {
    if (!isOpen) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "ArrowLeft" && canNavigate) {
        onPrevious();
        return;
      }

      if (event.key === "ArrowRight" && canNavigate) {
        onNext();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], [tabindex]:not([tabindex="-1"])',
      );
      const focusable = Array.from(focusableElements || []).filter(
        (element) => !element.hasAttribute("disabled"),
      );

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [canNavigate, isOpen, onClose, onNext, onPrevious]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && activeImage && (
        <motion.div
          className="image-lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
          role="dialog"
          aria-modal="true"
          aria-label="Memory image viewer"
          ref={modalRef}
        >
          <motion.button
            type="button"
            className="image-lightbox-backdrop"
            aria-label="Close image viewer"
            onClick={onClose}
            tabIndex={-1}
          />

          <div className="image-lightbox-controls">
            <button
              type="button"
              className="image-lightbox-button"
              aria-label="Close image viewer"
              onClick={onClose}
              ref={closeButtonRef}
            >
              <X size={22} />
            </button>
          </div>

          {canNavigate && (
            <>
              <button
                type="button"
                className="image-lightbox-nav image-lightbox-nav-previous"
                aria-label="Previous image"
                onClick={onPrevious}
              >
                <ChevronLeft size={28} />
              </button>
              <button
                type="button"
                className="image-lightbox-nav image-lightbox-nav-next"
                aria-label="Next image"
                onClick={onNext}
              >
                <ChevronRight size={28} />
              </button>
            </>
          )}

          <motion.div
            className="image-lightbox-frame"
            initial={{ scale: 0.95, opacity: 0, filter: "blur(12px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            exit={{ scale: 0.95, opacity: 0, filter: "blur(12px)" }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <img
              src={activeImage.src}
              alt={activeImage.alt || "Personal memory"}
              className="image-lightbox-image"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
