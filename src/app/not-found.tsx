import Link from "next/link";
import { CrystalMark } from "@/components/crystal-mark";

/* Empty state — one facet missing, but the shape holds. */
export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-black px-5 text-center">
      <div>
        <CrystalMark className="mx-auto size-14 opacity-60" />
        <p className="mt-8 font-mono text-xs uppercase tracking-[0.3em] text-white/40">
          404 — a facet that isn&rsquo;t there
        </p>
        <p className="mt-3 text-2xl font-bold tracking-tight">
          This page isn&rsquo;t on the chain.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-lg border border-border px-5 py-2.5 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
        >
          Back to the film
        </Link>
      </div>
    </main>
  );
}
