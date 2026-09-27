/**
 * SCENE 8 — LIVE ARCHITECTURE.
 * One line, one pulse: the data path lights up word by word as a
 * particle travels it. No cards, no rail through text.
 */
const WORDS = ["Jupiter", "Analytics", "Risk", "Clarity"];

export function SceneArch() {
  return (
    <section
      id="scene-arch"
      className="scene-vignette relative flex min-h-[70svh] flex-col items-center justify-center overflow-hidden bg-black px-5 py-24"
    >
      <div className="relative w-full max-w-5xl">
        {/* the travelling pulse — one dot sweeping the line */}
        <div className="pointer-events-none absolute inset-x-[6%] top-1/2 -translate-y-1/2" aria-hidden>
          <span
            className="absolute top-1/2 size-2 -translate-y-1/2 rounded-full bg-solana-green"
            style={{
              boxShadow: "0 0 14px rgba(20,241,149,0.9), 0 0 44px rgba(20,241,149,0.35)",
              animation: "travel-x 6s cubic-bezier(0.45,0,0.2,1) infinite",
              willChange: "left, opacity",
            }}
          />
        </div>

        <p className="relative flex flex-wrap items-baseline justify-center gap-x-6 gap-y-2 text-center text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
          {WORDS.map((w, i) => (
            <span key={w} className="arch-word" style={{ animationDelay: `${i * 1.5}s` }}>
              {i > 0 && <span className="mr-6 text-white/20 sm:mr-6">→</span>}
              {w}
            </span>
          ))}
        </p>
      </div>

      <p className="reveal mt-14 text-sm text-muted-foreground">
        No black boxes. Every stage is in the repository.
      </p>
    </section>
  );
}
