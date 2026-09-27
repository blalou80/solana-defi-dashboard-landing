import { ArrowRight } from "lucide-react";
import { HeroCrystal } from "@/components/hero-crystal";
import { Magnetic } from "@/components/effects/magnetic";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/icons";

/**
 * SCENE 10 — FINAL MOMENT.
 * The crystal returns, larger and cleaner, alone on black.
 */
export function SceneFinal() {
  return (
    <section
      id="scene-final"
      className="scene-vignette relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-black px-5 py-24"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent" aria-hidden />

      <HeroCrystal
        scale={1.3}
        className="relative w-full max-w-[640px]"
      />

      <div className="reveal mt-12 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Solana DeFi Dashboard
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">
          A clearer view of DeFi risk.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Magnetic strength={0.28}>
            <Button asChild size="lg">
              <a
                href="https://github.com/blalou80/solana-defi-dashboard"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Project <ArrowRight aria-hidden />
              </a>
            </Button>
          </Magnetic>
          <Magnetic strength={0.28}>
            <Button asChild size="lg" variant="outline">
              <a
                href="https://github.com/blalou80/solana-defi-dashboard"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon className="size-4.5" aria-hidden /> GitHub
              </a>
            </Button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
