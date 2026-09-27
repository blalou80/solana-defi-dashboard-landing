import { Section, Reveal } from "@/components/section";
import { GithubIcon } from "@/components/icons";

/**
 * EVIDENCE — the colophon chapter.
 * Everything a reviewer needs to verify the project, set as quiet type.
 * No cards, no counters, no grids. One repository does the talking.
 */
const FACTS = [
  "Eight analytics modules.",
  "Two public data sources.",
  "Four roadmap phases.",
  "One repository.",
];

const PHASES = [
  { phase: "Phase 1", state: "Completed", items: "Core engine · risk math · slippage tools · first dashboard" },
  { phase: "Phase 2", state: "In Progress", items: "Portfolio analytics · liquidity monitoring · new protocols" },
  { phase: "Phase 3", state: "Planned", items: "Advanced alerting · history · risk visualization" },
  { phase: "Phase 4", state: "Planned", items: "Multi-wallet · research reports · developer API" },
];

export function Evidence() {
  return (
    <Section
      id="evidence"
      className="bg-black"
    >
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <p className="text-center text-sm uppercase tracking-[0.35em] text-white/40">
            Evidence
          </p>
          <div className="mt-8 space-y-2 text-center">
            {FACTS.map((f) => (
              <p key={f} className="text-xl font-light tracking-tight text-white/85 sm:text-2xl">
                {f}
              </p>
            ))}
          </div>
          <p className="mt-10 text-center text-sm leading-relaxed text-muted-foreground">
            For liquidity providers, researchers, analysts, and anyone who
            reads the chain. Built on Python, Solana RPC, Jupiter, Next.js
            and TypeScript.
          </p>
          <a
            href="https://github.com/blalou80/solana-defi-dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 flex items-center justify-center gap-2 text-sm font-medium text-foreground underline-offset-8 transition-opacity hover:underline"
          >
            <GithubIcon className="size-4" aria-hidden />
            Read the code. Follow the work. Judge the results.
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-16 border-t border-border pt-10">
            <p className="text-center text-sm uppercase tracking-[0.35em] text-white/40">
              Roadmap
            </p>
            <ol className="mt-8 space-y-6 text-center">
              {PHASES.map((p) => (
                <li key={p.phase}>
                  <p className="text-base font-semibold">
                    {p.phase}
                    <span className={p.state === "In Progress" ? "ml-2 text-solana-green" : "ml-2 text-white/40"}>
                      {p.state}
                    </span>
                  </p>
                  <p className="mt-1 font-mono text-xs tracking-wide text-muted-foreground">
                    {p.items}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
