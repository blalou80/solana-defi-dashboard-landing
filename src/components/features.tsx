import {
  Activity,
  Droplets,
  Layers,
  Gauge,
  TrendingUp,
} from "lucide-react";
import { Section, Reveal } from "@/components/section";
import { Magnetic } from "@/components/effects/magnetic";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Bento grid: one dominant cell with live visual, varied spans,       */
/* wide workspace banner at the bottom.                                */
/* ------------------------------------------------------------------ */

export function Features() {
  return (
    <Section
      id="features"
      chapter="02"
      eyebrow="Capabilities"
      title="See the chain."
      description="Eight modules, one question: what does this position actually look like, and what could go wrong?"
    >
      <div className="bento-snap grid auto-rows-[minmax(150px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* dominant: slippage */}
        <Reveal className="lg:col-span-2 lg:row-span-2">
          <BentoCell
            icon={Activity}
            title="Real-Time Slippage Analysis"
            text="Fetch and compare swap routes while analyzing expected versus realized execution quality."
            large
          >
            <SlippageVisual />
          </BentoCell>
        </Reveal>

        {/* liquidity */}
        <Reveal delay={0.06} className="lg:col-span-2">
          <BentoCell
            icon={Droplets}
            title="Concentrated Liquidity Monitoring"
            text="Track positions and performance across supported protocols."
          >
            <RangeVisual />
          </BentoCell>
        </Reveal>

        {/* IL */}
        <Reveal delay={0.1}>
          <BentoCell
            icon={Layers}
            title="Impermanent Loss Analytics"
            text="Estimate and visualize IL exposure."
            compact
          />
        </Reveal>

        {/* yield */}
        <Reveal delay={0.14}>
          <BentoCell
            icon={TrendingUp}
            title="Yield Performance Tracking"
            text="Analyze fee generation and estimated returns."
            compact
          />
        </Reveal>

        {/* risk — closes the grid full-width */}
        <Reveal delay={0.08} className="sm:col-span-2 lg:col-span-4">
          <BentoCell
            icon={Gauge}
            title="Portfolio Risk Assessment"
            text="Consolidated scoring across concentration, correlation and drawdown pressure."
          >
            <RiskVisual />
          </BentoCell>
        </Reveal>
      </div>
    </Section>
  );
}

function BentoCell({
  icon: Icon,
  title,
  text,
  children,
  large,
  compact,
  hideIcon,
  className,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
  title: string;
  text: string;
  children?: React.ReactNode;
  large?: boolean;
  compact?: boolean;
  hideIcon?: boolean;
  className?: string;
}) {
  return (
    <Magnetic strength={0.045} className="block h-full">
    <article
      className={cn(
        "glass-lite spotlight group relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/40",
        compact ? "p-5" : "p-6",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 0%, rgba(153,69,255,0.12), transparent 60%)",
        }}
        aria-hidden
      />
      {!hideIcon && (
        <span
          className={cn(
            "mb-4 grid place-items-center rounded-xl bg-gradient-to-br from-primary/25 to-secondary/15 ring-1 ring-inset ring-white/10",
            large ? "size-12" : "size-10"
          )}
        >
          <Icon
            className={cn(
              "text-solana-purple transition-colors group-hover:text-white",
              large ? "size-6" : "size-4.5"
            )}
            aria-hidden
          />
        </span>
      )}
      <h3 className={cn("font-semibold leading-snug", large && "text-lg")}>{title}</h3>
      <p className={cn("mt-2 leading-relaxed text-muted-foreground", large ? "text-[15px]" : "text-sm")}>
        {text}
      </p>
      {children && <div className="mt-auto pt-5">{children}</div>}
    </article>
    </Magnetic>
  );
}

/* ---------------- bento visuals (CSS/SVG, illustrative) ---------------- */

function SlippageVisual() {
  const rows = [
    { r: "SOL→USDC", e: 12, a: 9 },
    { r: "JUP→SOL", e: 34, a: 41 },
    { r: "BONK→USDC", e: 82, a: 105 },
    { r: "mSOL→SOL", e: 5, a: 4 },
  ];
  return (
    <div className="mt-2 space-y-3">
      {rows.map((s, i) => (
        <div key={s.r} className="flex items-center gap-3">
          <span className="w-20 shrink-0 font-mono text-[11px] text-muted-foreground">{s.r}</span>
          <div className="relative h-6 flex-1 overflow-hidden rounded-md bg-white/4">
            <div
              className="grow-x absolute inset-y-1 left-0 rounded-md bg-solana-blue/35"
              style={{ width: `${Math.min(s.e, 100)}%`, animationDelay: `${0.25 + i * 0.12}s` }}
            />
            <div
              className={cn(
                "grow-x absolute inset-y-1 left-0 rounded-md",
                s.a > s.e ? "bg-[#ff5470]/70" : "bg-solana-green/60"
              )}
              style={{ width: `${Math.min(s.a, 100)}%`, animationDelay: `${0.35 + i * 0.12}s` }}
            />
          </div>
          <span className={cn("w-12 shrink-0 text-right font-mono text-[11px]", s.a > s.e ? "text-[#ff5470]" : "text-solana-green")}>
            {(s.a / 100).toFixed(2)}%
          </span>
        </div>
      ))}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-muted-foreground">
        <span className="flex gap-4">
          <span className="flex items-center gap-1.5"><span className="size-2 rounded-sm bg-solana-blue/60" aria-hidden />expected</span>
          <span className="flex items-center gap-1.5"><span className="size-2 rounded-sm bg-solana-green/70" aria-hidden />realized</span>
        </span>
        <span className="italic">sample routes · illustrative</span>
      </div>
    </div>
  );
}

function RangeVisual() {
  return (
    <div className="space-y-2.5">
      {[
        { p: "SOL-USDC", pos: 58, lo: 12, hi: 78, tone: "#14f195" },
        { p: "JUP-SOL", pos: 34, lo: 8, hi: 62, tone: "#9945ff" },
      ].map((x, i) => (
        <div key={x.p} className="flex items-center gap-3">
          <span className="w-20 shrink-0 font-mono text-[11px] text-muted-foreground">{x.p}</span>
          <div className="relative h-2 flex-1 rounded-full bg-white/6">
            <div
              className="absolute inset-y-0 rounded-full opacity-35"
              style={{ left: `${x.lo}%`, width: `${x.hi - x.lo}%`, background: x.tone }}
              aria-hidden
            />
            <div
              className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 shadow-lg"
              style={{ left: `${x.pos}%`, borderColor: x.tone, background: "#0b0d17", animation: `rise-in 0.6s ${0.4 + i * 0.15}s both` }}
              aria-hidden
            />
          </div>
          <span className="w-14 shrink-0 text-right font-mono text-[11px]" style={{ color: x.tone }}>in range</span>
        </div>
      ))}
    </div>
  );
}

function RiskVisual() {
  return (
    <div className="flex items-end gap-1.5" aria-hidden>
      {[30, 52, 44, 70, 58, 82, 64, 90, 72, 48, 66, 38].map((h, i) => (
        <div
          key={i}
          className="grow-x flex-1 origin-bottom rounded-sm bg-gradient-to-t from-solana-purple/70 to-solana-green/60"
          style={{ height: `${h * 0.55}px`, animationDelay: `${0.2 + i * 0.05}s` }}
        />
      ))}
      <span className="ml-3 shrink-0 font-mono text-[11px] text-muted-foreground">sample risk factors · illustrative</span>
    </div>
  );
}
