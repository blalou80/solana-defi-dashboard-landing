"use client";

import * as React from "react";
import { Orb } from "@/components/orb";

/**
 * Progressive-enhancement mount for the R3F crystal:
 *  - SSR + first paint: the CSS orb (zero JS cost, always visible)
 *  - desktop browsers with WebGL, motion allowed: the three.js crystal
 *    chunk is lazy-loaded over the top of it and fades in
 *  - touch / reduced-motion / no-WebGL: stays on the CSS orb
 */
const CrystalScene = React.lazy(() => import("@/components/three/hero-crystal-scene"));

/* Capability detection via useSyncExternalStore: pure, SSR-safe
   (server snapshot = false), no cascading setState effects. */
let cachedSupport: boolean | null = null;
function detectSupport(): boolean {
  if (cachedSupport !== null) return cachedSupport;
  try {
    if (window.matchMedia("(pointer: coarse)").matches) return (cachedSupport = false);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return (cachedSupport = false);
    const c = document.createElement("canvas");
    const ok = !!(c.getContext("webgl2") || c.getContext("webgl"));
    return (cachedSupport = ok);
  } catch {
    return (cachedSupport = false);
  }
}
const noopSubscribe = () => () => {};

export function HeroCrystal({
  className,
  scale = 1,
}: {
  className?: string;
  scale?: number;
}) {
  const enhanced = React.useSyncExternalStore(noopSubscribe, detectSupport, () => false);

  return (
    <div className={className}>
      <div className="relative">
        {/* CSS orb: instant fallback, fades out once WebGL scene is up */}
        <div
          className="transition-opacity duration-700"
          style={{ opacity: enhanced ? 0 : 1 }}
        >
          <Orb />
        </div>

        {enhanced && (
          <React.Suspense fallback={null}>
            <div
              className="absolute inset-0"
              style={{ animation: "rise-in 0.9s ease-out both" }}
            >
              <CrystalScene scale={scale} />
            </div>
          </React.Suspense>
        )}
      </div>

      {/* soft ground glow shared by both modes */}
      <div className="pointer-events-none absolute left-1/2 top-[80%] h-28 w-[64%] -translate-x-1/2 rounded-full bg-solana-purple/16 blur-3xl" aria-hidden />
    </div>
  );
}
