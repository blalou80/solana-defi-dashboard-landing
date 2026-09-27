"use client";

import * as React from "react";
import { Reveal } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { TiltCard } from "@/components/effects/tilt-card";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Interactive workspace mockup: tabbed on desktop, swipeable          */
/* snap-carousel on mobile. Pure SVG/CSS — illustrative sample data.   */
/* ------------------------------------------------------------------ */

const tabs = ["Overview", "Liquidity", "Execution"] as const;

/**
 * Live-simulation of sample values — jitters a number around a base
 * while the section is on screen and the tab is visible. Clearly a demo:
 * the panel chrome reads "demo · … · sample data".
 */
function useLiveSim(base: number, spread: number, decimals = 2) {
  const [val, setVal] = React.useState(base);
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    let alive = true;
    const id = setInterval(() => {
      if (!alive || document.hidden) return;
      const next = base + (Math.random() - 0.5) * 2 * spread;
      setVal(Number(next.toFixed(decimals)));
      setTick((t) => t + 1);
    }, 2600);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [base, spread, decimals]);
  return { val, tick };
}

function LiveValue({
  base,
  spread,
  decimals = 2,
  prefix = "",
  suffix = "",
  className,
}: {
  base: number;
  spread: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const { val, tick } = useLiveSim(base, spread, decimals);
  return (
    <span key={tick} className={cn("value-flash", className)}>
      {prefix}
      {val.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

export function DashboardPreview() {
  const [tab, setTab] = React.useState(0);
  const rowRef = React.useRef<HTMLDivElement>(null);
  const scrollLock = React.useRef(false);

  // mobile: swipe updates the active tab
  const onScroll = () => {
    if (scrollLock.current) return;
    const el = rowRef.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== tab) setTab(i);
  };

  // tab click scrolls the mobile carousel into position
  const select = (i: number) => {
    setTab(i);
    const el = rowRef.current;
    if (el && i !== tab) {
      scrollLock.current = true;
      el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
      setTimeout(() => (scrollLock.current = false), 450);
    }
  };

  const frame = (
    <Reveal>
        <TiltCard max={2.5} className="rounded-2xl">
        <div className="glass gradient-border noise relative overflow-hidden rounded-2xl shadow-2xl">
          {/* window chrome */}
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <div className="flex gap-1.5" aria-hidden>
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="mx-auto hidden items-center gap-2 rounded-md border border-border bg-black/30 px-3 py-1 font-mono text-[11px] text-muted-foreground sm:flex">
              <span className="ticker-dot size-1.5 rounded-full bg-solana-green" />
              demo · {tabs[tab].toLowerCase()} · sample data
            </div>
            {/* tabs */}
            <div className="ml-auto flex gap-1 sm:ml-0" role="tablist" aria-label="Dashboard views">
              {tabs.map((t, i) => (
                <button
                  key={t}
                  role="tab"
                  aria-selected={i === tab}
                  onClick={() => select(i)}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-xs font-medium transition-all",
                    i === tab
                      ? "bg-primary/20 text-white ring-1 ring-primary/40"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* single snap carousel for all viewports — tabs scroll to the
              panel, swiping updates the tab; no duplicated panel DOM */}
          <div
            ref={rowRef}
            onScroll={onScroll}
            className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none]"
          >
            <div className="w-full shrink-0 snap-center"><OverviewPanel /></div>
            <div className="w-full shrink-0 snap-center"><LiquidityPanel /></div>
            <div className="w-full shrink-0 snap-center"><ExecutionPanel /></div>
          </div>

          {/* swipe hint (mobile only) */}
          <div className="flex items-center justify-center gap-2 border-t border-border py-2 text-[11px] text-muted-foreground md:hidden">
            <span className={cn("size-1.5 rounded-full transition-colors", tab === 0 ? "bg-solana-green" : "bg-white/20")} />
            <span className={cn("size-1.5 rounded-full transition-colors", tab === 1 ? "bg-solana-green" : "bg-white/20")} />
            <span className={cn("size-1.5 rounded-full transition-colors", tab === 2 ? "bg-solana-green" : "bg-white/20")} />
            swipe to explore
          </div>

          <p className="border-t border-border px-5 py-3 text-center text-[11px] text-muted-foreground">
            Illustrative sample data for demonstration purposes only — not
            live figures, user metrics, TVL or transaction volumes.
          </p>
        </div>
        </TiltCard>
      </Reveal>
  );

  return frame;
}

/* ---------------- panels ---------------- */

const allocations = [
  { sym: "SOL", pct: 42, color: "#9945ff" },
  { sym: "USDC", pct: 22, color: "#5ac8fa" },
  { sym: "JUP", pct: 18, color: "#14f195" },
  { sym: "JitoSOL", pct: 12, color: "#c05af5" },
  { sym: "BONK", pct: 6, color: "#ffb547" },
];

const positions = [
  { pair: "SOL / USDC", proto: "Orca Whirlpool", price: "in range", apr: "38.2%", il: "-1.4%", fill: 0.72, tone: "#14f195" },
  { pair: "JUP / SOL", proto: "Raydium CLMM", price: "in range", apr: "21.7%", il: "-2.9%", fill: 0.55, tone: "#9945ff" },
  { pair: "mSOL / USDC", proto: "Orca Whirlpool", price: "at edge", apr: "12.4%", il: "-4.1%", fill: 0.94, tone: "#ffb547" },
];

const riskRows = [
  { label: "Concentration", value: 64, note: "moderate" },
  { label: "Stablecoin cover", value: 22, note: "low" },
  { label: "IL exposure", value: 38, note: "moderate" },
  { label: "Correlation load", value: 71, note: "elevated" },
];

const slippage = [
  { route: "SOL→USDC", expected: 0.12, realized: 0.09 },
  { route: "JUP→SOL", expected: 0.34, realized: 0.41 },
  { route: "BONK→USDC", expected: 0.82, realized: 1.05 },
  { route: "mSOL→SOL", expected: 0.05, realized: 0.04 },
];

function Shell({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 p-4 sm:p-5">{children}</div>;
}

function OverviewPanel() {
  return (
    <Shell>
      <div className="grid gap-4 lg:grid-cols-12">
        <Panel className="lg:col-span-5">
          <PanelHead
            title="Portfolio Value"
            right={
              <div className="flex items-center gap-1.5">
                <Badge variant="outline" className="border-solana-green/40 text-solana-green">
                  <span className="ticker-dot mr-1 inline-block size-1.5 rounded-full bg-solana-green" />
                  live sim · sample data
                </Badge>
                <Badge variant="green">+3.41%</Badge>
              </div>
            }
          />
          <p className="font-mono text-[26px] font-bold tracking-tight">
            <LiveValue base={48265.12} spread={140} prefix="$" />
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">24h Δ +$1,591.20 · 5 tracked wallets*</p>
          <TrendChart />
        </Panel>
        <Panel className="lg:col-span-3">
          <PanelHead title="Token Allocations" />
          <Donut />
        </Panel>
        <Panel className="lg:col-span-4">
          <PanelHead title="Risk Metrics" right={<Badge variant="purple">score 34/100</Badge>} />
          <div className="mt-1 space-y-3">
            {riskRows.map((r, i) => (
              <div key={r.label}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-muted-foreground">{r.label}</span>
                  <span className="font-mono">{r.value}% · {r.note}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/6">
                  <div
                    className="grow-x h-full rounded-full bg-gradient-to-r from-solana-purple to-solana-green"
                    style={{ width: `${r.value}%`, animationDelay: `${0.2 + i * 0.1}s` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </Shell>
  );
}

function LiquidityPanel() {
  return (
    <Shell>
      <div className="grid gap-4 lg:grid-cols-12">
        <Panel className="lg:col-span-6">
          <PanelHead title="Liquidity Positions" right={<span className="font-mono text-[11px] text-muted-foreground">3 active</span>} />
          <div className="mt-1 space-y-3">
            {positions.map((p, i) => (
              <div key={p.pair} className="rounded-lg border border-border bg-black/20 p-3" style={{ animation: `rise-in 0.5s ${0.15 + i * 0.12}s both` }}>
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                  <span className="text-sm font-semibold">{p.pair}</span>
                  <span className="font-mono text-[11px] text-muted-foreground">{p.proto}</span>
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/6">
                    <div className="absolute inset-y-0 left-0 rounded-full opacity-80" style={{ left: "12%", width: `${p.fill * 70}%`, background: p.tone }} />
                  </div>
                  <span className="w-14 text-right font-mono text-xs text-solana-green">APR {p.apr}</span>
                  <span className="w-16 text-right font-mono text-xs text-[#c9a2ff]">IL {p.il}</span>
                </div>
                <p className="mt-1.5 font-mono text-[11px] text-muted-foreground">price range: {p.price}</p>
              </div>
            ))}
          </div>
        </Panel>
        <Panel className="lg:col-span-6">
          <PanelHead title="Yield Statistics" />
          <div className="grid grid-cols-2 gap-3">
            {[
              { k: "Fees 7d", v: "$312.40" },
              { k: "Fees 30d", v: "$1,204.88" },
              { k: "Blended APR", v: "24.1%" },
              { k: "Net after IL", v: "18.9%" },
            ].map((s, i) => (
              <div key={s.k} className="rounded-lg border border-border bg-black/20 p-3" style={{ animation: `rise-in 0.5s ${0.1 + i * 0.1}s both` }}>
                <p className="text-[11px] text-muted-foreground">{s.k}</p>
                <p className="mt-1 font-mono text-sm font-semibold text-solana-green">{s.v}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
            Fee accrual per position, net of estimated impermanent loss. Range position above shows distance-to-edge per monitored pool.
          </p>
        </Panel>
      </div>
    </Shell>
  );
}

function ExecutionPanel() {
  return (
    <Shell>
      <div className="grid gap-4 lg:grid-cols-12">
        <Panel className="lg:col-span-7">
          <PanelHead title="Slippage Analytics" right={<span className="font-mono text-[11px] text-muted-foreground">expected → realized</span>} />
          <div className="mt-1 space-y-3.5">
            {slippage.map((s, i) => (
              <div key={s.route} style={{ animation: `rise-in 0.5s ${0.1 + i * 0.1}s both` }}>
                <div className="mb-1.5 flex justify-between font-mono text-[11px]">
                  <span className="text-muted-foreground">{s.route}</span>
                  <span>
                    <span className="text-solana-blue">{s.expected}%</span>
                    {" → "}
                    <span className={s.realized > s.expected ? "text-[#ff5470]" : "text-solana-green"}>{s.realized}%</span>
                  </span>
                </div>
                <div className="relative h-5 overflow-hidden rounded-md bg-white/4">
                  <div className="grow-x absolute inset-y-0.5 left-0 rounded bg-solana-blue/30" style={{ width: `${Math.min(s.expected / 1.2, 1) * 100}%`, animationDelay: `${0.25 + i * 0.1}s` }} />
                  <div className={cn("grow-x absolute inset-y-1 left-0 rounded", s.realized > s.expected ? "bg-[#ff5470]/60" : "bg-solana-green/50")} style={{ width: `${Math.min(s.realized / 1.2, 1) * 100}%`, animationDelay: `${0.35 + i * 0.1}s` }} />
                </div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel className="lg:col-span-5">
          <PanelHead title="Execution Quality" right={<Badge variant="green">92nd pct</Badge>} />
          <div className="space-y-3">
            {[
              { k: "Avg delta vs quote", v: "+0.04%", tone: "text-solana-green" },
              { k: "Route coverage", v: "3 venues", tone: "" },
              { k: "Worst observed", v: "BONK→USDC +0.23%", tone: "text-[#ff5470]" },
              { k: "Sample window", v: "last 100 swaps*", tone: "" },
            ].map((s) => (
              <div key={s.k} className="flex items-center justify-between rounded-lg border border-border bg-black/20 px-3 py-2.5">
                <span className="text-xs text-muted-foreground">{s.k}</span>
                <span className={cn("font-mono text-xs font-semibold", s.tone || "text-foreground")}>{s.v}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </Shell>
  );
}

/* ---------------- building blocks ---------------- */

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-border bg-[#0a0c16] p-4 ${className}`}>
      {children}
    </div>
  );
}

function PanelHead({ title, right }: { title: string; right?: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h3>
      {right}
    </div>
  );
}

function TrendChart() {
  return (
    <svg viewBox="0 0 400 110" className="mt-4 w-full" role="img" aria-label="Historical performance trend chart, illustrative">
      <defs>
        <linearGradient id="d-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#9945ff" />
          <stop offset="100%" stopColor="#14f195" />
        </linearGradient>
        <linearGradient id="d-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9945ff" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#9945ff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[22, 55, 88].map((y) => (
        <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="rgba(148,163,205,0.12)" strokeWidth="1" />
      ))}
      <path
        d="M0 84 C30 78 45 90 70 74 S110 52 140 60 S190 44 220 50 S270 26 300 34 S360 16 400 22 L400 110 L0 110 Z"
        fill="url(#d-fill)"
      />
      <path
        d="M0 84 C30 78 45 90 70 74 S110 52 140 60 S190 44 220 50 S270 26 300 34 S360 16 400 22"
        fill="none" stroke="url(#d-line)" strokeWidth="2.5" strokeLinecap="round"
        className="draw-line" style={{ ["--dash" as string]: "700" }}
      />
      <circle cx="400" cy="22" r="3.5" fill="#14f195" className="ticker-dot" />
    </svg>
  );
}

function Donut() {
  const R = 42;
  const C = 2 * Math.PI * R;
  const segments = allocations.map((a, i) => ({
    ...a,
    dash: (a.pct / 100) * C,
    offset:
      -(allocations.slice(0, i).reduce((s, x) => s + x.pct, 0) / 100) * C,
  }));
  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 100 100" className="donut-in size-28 -rotate-90" role="img" aria-label="Token allocation donut chart, illustrative">
        {segments.map((a) => (
          <circle
            key={a.sym}
            cx="50" cy="50" r={R}
            fill="none"
            stroke={a.color}
            strokeWidth="11"
            strokeDasharray={`${a.dash - 2.2} ${C - a.dash + 2.2}`}
            strokeDashoffset={a.offset}
            strokeLinecap="butt"
          />
        ))}
      </svg>
      <ul className="space-y-1.5 text-xs">
        {allocations.map((a) => (
          <li key={a.sym} className="flex items-center gap-2">
            <span className="inline-block size-2 rounded-sm" style={{ background: a.color }} aria-hidden />
            <span className="w-14 text-muted-foreground">{a.sym}</span>
            <span className="font-mono">{a.pct}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
