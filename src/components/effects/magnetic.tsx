"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Magnetic wrapper: element eases toward the pointer while hovered and
 * springs back on leave. Applied to CTAs, nav buttons and feature cells.
 * Touch and reduced-motion users get a plain element.
 */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  const onMove = React.useCallback(
    (e: React.PointerEvent) => {
      const el = ref.current;
      if (!el || e.pointerType !== "mouse") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * strength;
      const dy = (e.clientY - (r.top + r.height / 2)) * strength;
      el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    },
    [strength]
  );

  const onLeave = React.useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = "translate3d(0, 0, 0)";
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn("magnetic inline-block", className)}
    >
      {children}
    </div>
  );
}
