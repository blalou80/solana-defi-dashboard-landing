"use client";

import * as React from "react";

/**
 * SCENE 3 — FRACTURE.
 * Direct continuation of the crystal: five fragments of the same object,
 * thin paths, one light pulse that names each fragment as it arrives.
 * WebGL for capable desktops; an SVG diamond ring (same geometry
 * language) everywhere else.
 */
const FragmentsCanvas = React.lazy(() => import("@/components/three/scene-fragments"));

let cachedSupport: boolean | null = null;
function detectSupport(): boolean {
  if (cachedSupport !== null) return cachedSupport;
  try {
    if (window.matchMedia("(pointer: coarse)").matches) return (cachedSupport = false);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return (cachedSupport = false);
    const c = document.createElement("canvas");
    return (cachedSupport = !!(c.getContext("webgl2") || c.getContext("webgl")));
  } catch {
    return (cachedSupport = false);
  }
}
const noopSubscribe = () => () => {};

/* pentagon anchors shared by the fallback */
const PTS = [
  { label: "Analytics", x: 360, y: 80 },
  { label: "Liquidity", x: 179, y: 211 },
  { label: "Risk", x: 242, y: 435 },
  { label: "Portfolio", x: 478, y: 435 },
  { label: "Execution", x: 541, y: 211 },
];

function Fallback() {
  const ringPath = `M ${PTS.map((p) => `${p.x} ${p.y}`).join(" L ")} L ${PTS[0].x} ${PTS[0].y}`;
  const diamond = (x: number, y: number, s: number) =>
    `${x},${y - s * 1.45} ${x + s},${y} ${x},${y + s * 1.45} ${x - s},${y}`;
  return (
    <svg viewBox="0 0 720 520" className="h-full w-full" role="img" aria-label="Five crystal fragments connected in a ring, with a light pulse travelling between them">
      <defs>
        <linearGradient id="fr-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9945ff" />
          <stop offset="100%" stopColor="#14f195" />
        </linearGradient>
      </defs>
      <path d={ringPath} fill="none" stroke="url(#fr-edge)" strokeWidth="1" opacity="0.3" />
      {PTS.map((p, i) => (
        <g key={p.label}>
          <polygon points={diamond(p.x, p.y, 17)} fill={i % 2 ? "#14f195" : "#9945ff"} opacity="0.85" />
          <polygon points={diamond(p.x, p.y, 17)} fill="none" stroke="#f4f5fa" strokeWidth="0.6" opacity="0.25" />
          <text
            x={p.x}
            y={p.y + 44}
            textAnchor="middle"
            className="fr-label"
            style={{ animationDelay: `${i}s` }}
            fill="#f4f5fa"
            fontSize="11"
            letterSpacing="3"
          >
            {p.label.toUpperCase()}
          </text>
        </g>
      ))}
      <circle r="4" fill="#14f195" opacity="0.95">
        <animateMotion dur="5s" repeatCount="indefinite" path={ringPath} />
      </circle>
    </svg>
  );
}

export function SceneChain() {
  const enhanced = React.useSyncExternalStore(noopSubscribe, detectSupport, () => false);
  return (
    <section
      id="scene-chain"
      className="scene-vignette relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-black px-5 py-20"
    >
      <div className="relative mx-auto aspect-[72/52] w-full max-w-3xl">
        {enhanced ? (
          <React.Suspense fallback={<Fallback />}>
            <FragmentsCanvas />
          </React.Suspense>
        ) : (
          <Fallback />
        )}
        {/* the one line, at the centre of the ring */}
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <p className="reveal text-center text-xl font-light leading-snug tracking-tight text-white/85 sm:text-2xl">
            Five perspectives.
            <br />
            <span className="font-semibold">One system.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
