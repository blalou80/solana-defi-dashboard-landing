"use client";

import * as React from "react";

/**
 * Two-element custom cursor: a precise green dot + a lagging purple ring
 * that grows over interactive targets and pinches on press.
 * Desktop-only; the native cursor is hidden via CSS while active.
 */
export function CustomCursor() {
  React.useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");
    if (!dot || !ring) return;

    document.body.classList.add("cursor-stage");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let visible = false;

    const HOT = "a, button, [role='tab'], [role='button'], .magnetic, .accordion__trigger, input, summary";

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      const t = e.target as HTMLElement | null;
      ring.classList.toggle("hot", !!t?.closest?.(HOT));
    };

    const onDown = () => ring.classList.add("active");
    const onUp = () => ring.classList.remove("active");
    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    let raf = 0;
    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      document.body.classList.remove("cursor-stage");
    };
  }, []);

  return (
    <>
      <div id="cursor-ring" aria-hidden />
      <div id="cursor-dot" aria-hidden />
    </>
  );
}
