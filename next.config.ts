import path from "path";
import type { NextConfig } from "next";

const root = path.join(__dirname);

const nextConfig: NextConfig = {
  // Pin the project root so an enclosing git repo / lockfile is never picked up
  // (keeps local Turbopack builds and Vercel output tracing deterministic).
  turbopack: { root },
  outputFileTracingRoot: root,
  // SITE_EXPORT=1 npm run build → fully static export in out/ (Qoder Sites,
  // Vercel, any static host). Plain build → normal next start for local QA.
  output: process.env.SITE_EXPORT === "1" ? "export" : undefined,
  images: { unoptimized: true },
};

export default nextConfig;
