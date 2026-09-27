"use client";

import * as React from "react";

/** Thin gradient reading-progress bar pinned above the nav. rAF-throttled. */
export function ScrollProgress() {
  React.useEffect(() => {
    const el = document.getElementById("scroll-progress-bar");
    if (!el) return;
    let ticking = false;
    let max = 1;
    const measure = () => {
      const doc = document.documentElement;
      max = Math.max(doc.scrollHeight - doc.clientHeight, 1);
    };
    const update = () => {
      ticking = false;
      el.style.transform = `scaleX(${Math.min(window.scrollY / max, 1)})`;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => {
      measure();
      update();
    }, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[55] h-[2px]" aria-hidden>
      <div
        id="scroll-progress-bar"
        className="scroll-progress h-full w-full origin-left scale-x-0 bg-gradient-to-r from-solana-purple via-[#c05af5] to-solana-green"
      />
    </div>
  );
}
