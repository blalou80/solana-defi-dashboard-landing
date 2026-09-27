import { HeroCrystal } from "@/components/hero-crystal";

/**
 * SCENE 2 — THE CRYSTAL.
 * The product's visual icon, alone on black, dominating the viewport.
 */
export function SceneCrystal() {
  return (
    <section
      id="scene-crystal"
      className="scene-vignette relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-black px-5 py-20"
    >
      {/* horizon glow */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-[radial-gradient(ellipse_70%_100%_at_50%_120%,rgba(153,69,255,0.14),transparent_70%)]" aria-hidden />

      <HeroCrystal
        scale={1.15}
        className="relative w-full max-w-[560px]"
      />

      <div className="reveal mt-10 max-w-2xl text-center">
        <p className="text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
          The Solana ecosystem moves fast.
        </p>
        <p className="mt-2 text-2xl font-light leading-snug text-muted-foreground sm:text-3xl">
          Understanding it shouldn&rsquo;t be difficult.
        </p>
      </div>
    </section>
  );
}
