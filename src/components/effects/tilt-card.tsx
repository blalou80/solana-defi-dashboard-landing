"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Pointer-driven 3D tilt with layered depth. Children marked with
 * `.tilt-layer` float above the card surface while tilting.
 * Disabled on touch devices and for reduced-motion users.
 */
export function TiltCard({
  children,
  className,
  max = 9,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const rect = React.useRef<DOMRect | null>(null);

  const onEnter = React.useCallback(() => {
    if (ref.current) rect.current = ref.current.getBoundingClientRect();
  }, []);

  const onMove = React.useCallback(
    (e: React.PointerEvent) => {
      const el = ref.current;
      if (!el || e.pointerType !== "mouse") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const r = rect.current ?? el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `rotateY(${px * max * 2}deg) rotateX(${-py * max * 2}deg) translateZ(0)`;
      el.style.setProperty("--sheen-x", `${(px + 0.5) * 100}%`);
      el.style.setProperty("--sheen-y", `${(py + 0.5) * 100}%`);
    },
    [max]
  );

  const onLeave = React.useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = "rotateY(0deg) rotateX(0deg)";
  }, []);

  return (
    <div className="tilt-stage">
      <div
        ref={ref}
        onPointerEnter={onEnter}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className={cn("tilt-card relative", className)}
      >
        {/* specular sheen follows the tilt */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 hover:opacity-100"
          style={{
            background:
              "radial-gradient(420px circle at var(--sheen-x, 50%) var(--sheen-y, 0%), rgba(255,255,255,0.07), transparent 60%)",
          }}
          aria-hidden
        />
        {children}
      </div>
    </div>
  );
}
