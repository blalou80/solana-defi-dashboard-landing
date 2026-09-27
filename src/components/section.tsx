import * as React from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Reveal: server-rendered shell; activation is handled by the single  */
/* InteractionRoot client island (one IntersectionObserver for all).   */
/* No client boundaries → no RSC payload duplication.                  */
/* ------------------------------------------------------------------ */

type Variant = "rise" | "clip" | "persp" | "zoom";

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "rise",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: Variant;
}) {
  return (
    <div
      data-variant={variant}
      className={cn("reveal", className)}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

/** Section shell with optional ghost chapter number. */
export function Section({
  id,
  chapter,
  eyebrow,
  title,
  description,
  className,
  children,
}: {
  id: string;
  chapter?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("cv-auto relative scroll-mt-24 py-20 md:py-28", className)}
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        {(eyebrow || title || description) && (
          <Reveal className="relative mx-auto mb-12 max-w-3xl text-center md:mb-16">
            {chapter && (
              <span
                aria-hidden
                className="chapter-number pointer-events-none absolute left-1/2 top-[-2.6rem] -z-10 -translate-x-1/2 select-none"
              >
                {chapter}
              </span>
            )}
            {eyebrow && (
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/40">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15]">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                {description}
              </p>
            )}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
