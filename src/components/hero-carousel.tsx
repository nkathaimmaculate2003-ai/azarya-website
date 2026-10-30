"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";

export type HeroSlide = { src: StaticImageData; alt: string };

const INTERVAL_MS = 6000;

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true, // On the server, assume reduced motion so nothing animates before hydration.
  );
}

/**
 * Full-width hero with cross-fading background photos, a dark overlay so the
 * text stays readable, and accessible controls:
 *  - a pause/play button (auto-rotation must be stoppable, WCAG 2.2.2)
 *  - previous/next buttons and one button per slide
 *  - no auto-rotation when the visitor prefers reduced motion
 *  - pauses while hovered or while keyboard focus is inside it
 */
export function HeroCarousel({ slides, children }: { slides: HeroSlide[]; children: ReactNode }) {
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<"auto" | "playing" | "paused">("auto");
  const [interacting, setInteracting] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const playing = choice === "playing" || (choice === "auto" && !reducedMotion);
  // Hover or focus pauses rotation, unless the visitor has explicitly pressed Play.
  const advancing = playing && (choice === "playing" || !interacting) && slides.length > 1;

  useEffect(() => {
    if (!advancing) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [advancing, slides.length]);

  const go = (next: number) => setIndex((next + slides.length) % slides.length);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Introduction"
      className="relative isolate overflow-hidden bg-navy text-white"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocus={() => setInteracting(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setInteracting(false);
      }}
    >
      {/* Background photos */}
      <div className="absolute inset-0 -z-20">
        {slides.map((slide, i) => (
          <div
            key={slide.src.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === index ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="100vw"
              placeholder="blur"
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "auto"}
              className="object-cover object-center"
            />
          </div>
        ))}
      </div>

      {/* Dark overlay: strongest behind the text on the left, lighter on the right. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0b1d29]/90 via-[#0b1d29]/75 to-[#0b1d29]/45"
      />

      {children}

      {/* Controls */}
      {slides.length > 1 && (
        <div className="absolute right-0 bottom-4 left-0">
          <div className="flex w-full items-center gap-2 px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
            <button
              type="button"
              onClick={() => setChoice(playing ? "paused" : "playing")}
              className="inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-md border border-white/70 bg-black/30 px-3 text-sm font-semibold whitespace-nowrap text-white hover:bg-black/50"
            >
              <span aria-hidden="true">{playing ? "❚❚" : "▶"}</span>
              {playing ? "Pause" : "Play"}
              <span className="sr-only"> slideshow</span>
            </button>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous image"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/70 bg-black/30 text-lg text-white hover:bg-black/50"
            >
              <span aria-hidden="true">‹</span>
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next image"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/70 bg-black/30 text-lg text-white hover:bg-black/50"
            >
              <span aria-hidden="true">›</span>
            </button>
            <ul className="ml-1 flex items-center">
              {slides.map((slide, i) => (
                <li key={slide.src.src}>
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Show image ${i + 1} of ${slides.length}`}
                    aria-current={i === index ? "true" : undefined}
                    className="flex h-11 w-8 items-center justify-center"
                  >
                    <span
                      aria-hidden="true"
                      className={`block h-3 rounded-full border-2 border-white transition-all ${
                        i === index ? "w-6 bg-white" : "w-3 bg-transparent"
                      }`}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
