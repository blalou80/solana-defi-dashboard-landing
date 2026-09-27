"use client";

import * as React from "react";

/**
 * Lenis smooth scroll wired into the GSAP ticker + ScrollTrigger.
 * Lazy: the library chunks load after hydration; native scrolling is
 * the fallback (reduced-motion, coarse pointers, load failure).
 */
export function CinematicProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    Promise.all([import("lenis"), import("gsap"), import("gsap/ScrollTrigger")])
      .then(([lenisMod, gsapMod, stMod]) => {
        if (cancelled) return;
        const Lenis = lenisMod.default;
        const gsap = gsapMod.default;
        const ScrollTrigger = stMod.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        const lenis = new Lenis({ lerp: 0.115, wheelMultiplier: 0.9 });
        lenis.on("scroll", ScrollTrigger.update);
        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        // let GSAP ScrollTrigger instances created by scenes initialize
        requestAnimationFrame(() => ScrollTrigger.refresh());

        cleanup = () => {
          gsap.ticker.remove(tick);
          lenis.destroy();
        };
        // expose for scene components that need to stop scrolling
        (window as unknown as { __lenis?: unknown }).__lenis = lenis;
      })
      .catch(() => {
        /* stay on native scroll */
      });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return <>{children}</>;
}
