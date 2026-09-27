import { cn } from "@/lib/utils";

/**
 * The crystal mark — the product's brand symbol (cross-section of the
 * hero gem). Used in nav, footer, loading, empty states and OG art.
 */
export function CrystalMark({
  className,
  pulse = false,
}: {
  className?: string;
  pulse?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("size-8", className)}
      role="img"
      aria-label="Solana DeFi Dashboard crystal mark"
    >
      <polygon points="32,4 54,26 32,60 10,26" fill="#0a0b12" />
      <polygon points="32,4 54,26 32,60 10,26" fill="none" stroke="#9945ff" strokeWidth="2.5" />
      <polyline points="10,26 32,20 54,26" fill="none" stroke="#9945ff" strokeWidth="1.6" opacity="0.8" />
      <line x1="32" y1="20" x2="32" y2="60" stroke="#9945ff" strokeWidth="1.4" opacity="0.55" />
      <polygon points="32,4 32,20 10,26" fill="#9945ff" opacity="0.35" />
      <polygon points="32,4 32,20 54,26" fill="#c05af5" opacity="0.5" />
      <circle cx="44" cy="36" r="2.4" fill="#14f195" className={pulse ? "ticker-dot" : undefined} />
    </svg>
  );
}
