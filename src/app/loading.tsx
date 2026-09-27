import { CrystalMark } from "@/components/crystal-mark";

/* Route loading state — the crystal, alone, breathing. */
export default function Loading() {
  return (
    <div className="grid min-h-[70svh] place-items-center bg-black">
      <CrystalMark className="size-12 animate-pulse" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
