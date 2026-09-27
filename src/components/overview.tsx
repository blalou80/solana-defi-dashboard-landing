import { Reveal } from "@/components/section";

/**
 * THE STATEMENT — the sentence the whole film builds to.
 * One idea: paste a wallet, see the risk. Nothing else.
 */
export function Overview() {
  return (
    <section
      id="overview"
      className="scene-vignette relative flex min-h-[80svh] scroll-mt-24 items-center justify-center overflow-hidden bg-black px-5 py-24"
    >
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <h2 className="mega-type">
            {"Paste a wallet.\nSee the risk."}
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
            Solana DeFi Dashboard is an independent analytics and
            risk-monitoring platform — a decision-support tool for people who
            hold, provide liquidity, or research on Solana. It does not trade,
            custody, or move anything. It reads the chain and shows you what
            moves against you.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
