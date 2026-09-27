import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Pure-CSS 3D glass orb with orbiting satellites and floating particles.
 * No WebGL library — every animation is a composited transform, so it
 * renders in the static export and stays Lighthouse-cheap.
 */
export function Orb({ className }: { className?: string }) {
  return (
    <div className={cn("orb-scene relative", className)} aria-hidden>
      {/* soft under-glow: gradient, no filter blur */}
      <div className="absolute left-1/2 top-1/2 size-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(153,69,255,0.16),transparent_62%)]" />

      <div className="relative mx-auto aspect-square w-full max-w-[420px]">
        {/* orbit rings */}
        <div className="orb-ring orb-ring-1" />
        <div className="orb-ring orb-ring-2" />

        {/* sphere */}
        <div className="orb" />

        {/* particles */}
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: p.l,
              top: p.t,
              width: p.s,
              height: p.s,
              background: p.c,
              boxShadow: `0 0 ${p.s * 2.5}px ${p.c}`,
              ["--px" as string]: p.x,
              ["--py" as string]: p.y,
              ["--pd" as string]: p.d,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}

const PARTICLES = [
  { l: "4%", t: "18%", s: 5, c: "#9945ff", x: "18px", y: "-30px", d: "8s", delay: "0s" },
  { l: "88%", t: "12%", s: 4, c: "#14f195", x: "-14px", y: "22px", d: "10s", delay: "-2s" },
  { l: "94%", t: "58%", s: 6, c: "#c05af5", x: "-22px", y: "-16px", d: "9s", delay: "-4s" },
  { l: "8%", t: "72%", s: 4, c: "#14f195", x: "20px", y: "14px", d: "11s", delay: "-1s" },
  { l: "46%", t: "2%", s: 3, c: "#5ac8fa", x: "-10px", y: "26px", d: "7.5s", delay: "-3s" },
  { l: "62%", t: "94%", s: 4, c: "#9945ff", x: "16px", y: "-24px", d: "9.5s", delay: "-5s" },
  { l: "26%", t: "90%", s: 3, c: "#14f195", x: "-18px", y: "-12px", d: "8.5s", delay: "-2.5s" },
  { l: "98%", t: "34%", s: 3, c: "#5ac8fa", x: "12px", y: "20px", d: "12s", delay: "-6s" },
];
