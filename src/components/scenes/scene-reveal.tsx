"use client";

import * as React from "react";
import { DashboardPreview } from "@/components/dashboard-preview";

/**
 * SCENE 4 — PRODUCT REVEAL.
 * Apple-style choreography: the dashboard rises out of darkness —
 * scale 0.78→1, blur 26px→0, opacity — scrubbed to scroll.
 * Reduced-motion: appears normally, no pin.
 */
export function SceneReveal() {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const innerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const root = rootRef.current;
    const inner = innerRef.current;
    if (!root || !inner) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    import("gsap").then((gsapMod) => {
      if (cancelled) return;
      const gsap = gsapMod.default;
      return import("gsap/ScrollTrigger").then((stMod) => {
        if (cancelled) return;
        const ScrollTrigger = stMod.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        gsap.set(inner, { scale: 0.78, opacity: 0.05, filter: "blur(26px)", y: 90 });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top 70%",
            end: "top 8%",
            scrub: 0.7,
          },
        });
        tl.to(inner, {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 1,
          ease: "power2.out",
        });
        cleanup = () => tl.scrollTrigger?.kill();
      });
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <div ref={rootRef} id="dashboard" className="relative scroll-mt-24 bg-black pt-24">
      {/* darkness the product emerges from */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" aria-hidden />
      <div className="mx-auto max-w-7xl px-5 text-center sm:px-8">
        <h2 className="mega-type reveal whitespace-pre-line">
          {"Everything.\nIn one place."}
        </h2>
        <p className="reveal mx-auto mt-5 max-w-xl text-muted-foreground">
          The workspace, revealed — positions, risk, execution and yield in a
          single view. All figures are illustrative sample data.
        </p>
      </div>
      <div ref={innerRef} className="mx-auto mt-14 max-w-7xl px-5 will-change-transform sm:px-8">
        <DashboardPreview />
      </div>
    </div>
  );
}
