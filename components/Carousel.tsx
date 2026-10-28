"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Horizontal drag distance (px) that counts as a slide change. Large enough
// that a sloppy tap or a mostly-vertical scroll never flips a slide.
const SWIPE_THRESHOLD = 40;

type Props = {
  media?: string[];
  // Visible fallback when no real screenshots are provided yet — keeps the
  // carousel UI testable/authentic while the user fills in assets later.
  projectNum: string;
  altPrefix?: string;
};

// Lightweight carousel: prev/next arrows, dot indicators, auto-advance with
// pause on hover. Uses plain <img> for placeholders swap-in. If `media` is
// missing or empty we render 3 placeholder slides with varying gradients so
// the UI still reads as a gallery.
export default function Carousel({ media, projectNum, altPrefix = "Screenshot" }: Props) {
  const slides =
    media && media.length > 0
      ? media
      : // 3 placeholder slides so the carousel controls make sense.
        [null, null, null];
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-advance every 5s unless the user is interacting.
  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const id = window.setInterval(() => {
      setIdx((i) => (i + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [paused, slides.length]);

  const go = (delta: number) => {
    setIdx((i) => (i + delta + slides.length) % slides.length);
  };

  // Swipe support (touch + pen + mouse drag). Pointer capture keeps the
  // pointerup on this element even when the finger lifts outside it. Vertical
  // movement is ignored so the page can still be scrolled over the carousel;
  // `touch-action: pan-y` in the CSS backs that up at the gesture level.
  const dragOrigin = useRef<{ x: number; y: number } | null>(null);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (slides.length <= 1) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    // Never swallow taps on the prev/next/dot buttons.
    if ((e.target as HTMLElement).closest("button")) return;
    dragOrigin.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
    setPaused(true);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const origin = dragOrigin.current;
    dragOrigin.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    if (!origin) {
      setPaused(false);
      return;
    }
    const dx = e.clientX - origin.x;
    const dy = e.clientY - origin.y;
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      go(dx < 0 ? 1 : -1);
    }
    setPaused(false);
  };

  return (
    <div
      className="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onPointerDown={onPointerDown}
      onPointerUp={endDrag}
      onPointerCancel={() => {
        dragOrigin.current = null;
        setPaused(false);
      }}
    >
      <div
        className="carousel__track"
        style={{ transform: `translateX(-${idx * 100}%)` }}
      >
        {slides.map((src, i) => (
          <div key={i} className="carousel__slide">
            {src ? (
              // Real screenshot. `fill` + the slide's relative positioning
              // lets Next.js resize/serve WebP on demand instead of shipping
              // the full-size PNG.
              <Image
                src={src}
                alt={`${altPrefix} ${i + 1}`}
                className="carousel__img"
                fill
                sizes="(max-width: 768px) 92vw, 1024px"
                loading="lazy"
                draggable={false}
              />
            ) : (
              // Placeholder — each slide uses a different gradient origin so
              // they're visually distinct while the carousel is browsed.
              <div
                className="carousel__placeholder"
                style={{
                  background: `radial-gradient(circle at ${30 + i * 20}% ${
                    35 + i * 15
                  }%, var(--ice-500), transparent 55%),
                     radial-gradient(circle at ${75 - i * 10}% ${
                    65 - i * 10
                  }%, var(--ice-700), transparent 55%),
                     linear-gradient(135deg, var(--ink-2), var(--ink-0))`,
                }}
              >
                <span className="project-modal__media-num">{projectNum}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            className="carousel__nav carousel__nav--prev"
            onClick={() => go(-1)}
            data-cursor="hover"
            aria-label="Prev"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <button
            type="button"
            className="carousel__nav carousel__nav--next"
            onClick={() => go(1)}
            data-cursor="hover"
            aria-label="Next"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
          <div className="carousel__dots">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIdx(i)}
                data-cursor="hover"
                aria-label={`Slide ${i + 1}`}
                aria-current={i === idx ? "true" : undefined}
                className={`carousel__dot ${
                  i === idx ? "carousel__dot--active" : ""
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
