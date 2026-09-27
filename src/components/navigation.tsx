import Link from "next/link";
import { CrystalMark } from "@/components/crystal-mark";

/**
 * Navigation for a film: a mark, a name, one exit.
 * No section links — visitors follow the story, not a menu.
 */
export function Navigation() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Brand"
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8"
      >
        <Link
          href="#top"
          className="pointer-events-auto flex items-center gap-2.5"
        >
          <CrystalMark className="size-8" />
          <span className="text-sm font-bold tracking-tight">
            Solana DeFi Dashboard
          </span>
        </Link>
        <a
          href="https://github.com/blalou80/solana-defi-dashboard"
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto rounded-lg border border-border/60 px-3.5 py-1.5 text-xs text-white/60 backdrop-blur-sm transition-colors hover:border-primary/50 hover:text-foreground"
        >
          GitHub
        </a>
      </nav>
    </header>
  );
}
