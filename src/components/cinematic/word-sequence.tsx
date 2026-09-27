"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type Word = {
  text: string;
  tone?: "white" | "dim" | "purple" | "green";
  /** optional second line rendered smaller under the main word */
  sub?: string;
  /** color treatment for the subline */
  subTone?: "muted" | "green" | "white";
};

/**
 * Pinned full-viewport word sequence — one word per scroll beat,
 * cross-sliding with blur, GSAP ScrollTrigger scrubbed.
 * Reduced-motion / no-JS: words render as a static stacked list so the
 * copy is never lost.
 */
export function WordSequence({
  words,
  id,
  className,
  step = 70,
  size = "hero",
}: {
  words: Word[];
  id: string;
  className?: string;
  /** scroll distance per word, in viewport % */
  step?: number;
  /** hero = single words; sentence = long lines */
  size?: "hero" | "sentence";
}) {
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctxRevert: (() => void) | undefined;
    let cancelled = false;

    import("gsap").then((gsapMod) => {
      if (cancelled || !root.isConnected) return;
      const gsap = gsapMod.default;
      return import("gsap/ScrollTrigger").then((stMod) => {
        if (cancelled || !root.isConnected) return;
        const ScrollTrigger = stMod.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        const els = root.querySelectorAll<HTMLElement>(".word");
        gsap.set(els, { yPercent: 110, opacity: 0, filter: "blur(14px)" });
        gsap.set(els[0], { yPercent: 0, opacity: 1, filter: "blur(0px)" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: `+=${step * (words.length - 1)}%`,
            pin: true,
            scrub: 0.6,
          },
        });
        for (let i = 1; i < els.length; i++) {
          const at = i - 1;
          tl.to(els[i - 1], { yPercent: -110, opacity: 0, filter: "blur(14px)", duration: 1 }, at)
            .to(els[i], { yPercent: 0, opacity: 1, filter: "blur(0px)", duration: 1 }, at);
        }
        ctxRevert = () => tl.scrollTrigger?.kill();
        if (tl.scrollTrigger) ScrollTrigger.refresh();
      });
    });

    return () => {
      cancelled = true;
      ctxRevert?.();
    };
  }, [words.length, step]);

  return (
    <section
      id={id}
      ref={rootRef}
      className={cn("word-stage scene-vignette scroll-mt-24", className)}
      aria-label={words.map((w) => w.text).join(" · ")}
    >
      <div className={cn("word-track", size === "sentence" && "word-track-sentence")}>
        {words.map((w, i) => (
          <p key={i} className={cn("word", size === "sentence" && "word-sentence", `word-${w.tone ?? "white"}`)}>
            {w.text}
            {w.sub && (
              <span
                className={cn(
                  "mt-3 block text-base font-normal tracking-normal sm:text-xl",
                  w.subTone === "green"
                    ? "text-solana-green"
                    : w.subTone === "white"
                      ? "text-foreground"
                      : "text-muted-foreground"
                )}
              >
                {w.sub}
              </span>
            )}
          </p>
        ))}
      </div>
      <span
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.35em] text-white/55"
        aria-hidden
      >
        scroll
      </span>
    </section>
  );
}
