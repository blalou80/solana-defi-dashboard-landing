import { CrystalMark } from "@/components/crystal-mark";

/**
 * Footer signature — two quiet lines beneath the ending.
 */
export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-black">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-5 py-10 text-center sm:px-8">
        <CrystalMark className="size-7 opacity-70" />
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Solana DeFi Dashboard — independent
          project, actively developed. Not affiliated with the Solana
          Foundation. Nothing here is financial advice.
        </p>
        <p className="font-mono text-[11px] text-white/60">
          <a
            href="mailto:zedomuharramv@gmail.com"
            className="underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            zedomuharramv@gmail.com
          </a>
        </p>
      </div>
    </footer>
  );
}
