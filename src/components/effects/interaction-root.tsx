"use client";

import * as React from "react";

/**
 * One tiny client island powering every scroll behavior on the page:
 *  1. reveal animations — a single IntersectionObserver toggles
 *     data-reveal="in" on all .reveal shells (CSS transitions do the rest)
 *  2. hero stage — publishes --stage-p for the CSS-driven hero sequence
 * Both are passive, rAF-throttled and reduced-motion aware.
 */
export function InteractionRoot() {
  React.useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 1. reveals
    const nodes = document.querySelectorAll<HTMLElement>(".reveal");
    if (reduce || typeof IntersectionObserver !== "function") {
      nodes.forEach((n) => (n.dataset.reveal = "in"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              (e.target as HTMLElement).dataset.reveal = "in";
              io.unobserve(e.target);
            }
          }
        },
        { rootMargin: "-60px 0px -60px 0px" }
      );
      nodes.forEach((n) => io.observe(n));
    }

    // 2. hero stage
    const stage = document.querySelector<HTMLElement>("[data-hero-stage]");
    if (!stage || reduce) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const h = stage.offsetHeight || 1;
      const p = Math.min(Math.max(window.scrollY / h, 0), 1);
      stage.style.setProperty("--stage-p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
