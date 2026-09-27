import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Solana DeFi Dashboard — Analytics & Risk Monitoring",
    short_name: "Solana DeFi",
    description:
      "Independent Solana DeFi analytics and risk monitoring platform.",
    start_url: "/",
    display: "standalone",
    background_color: "#06070d",
    theme_color: "#06070d",
    icons: [{ src: "/icon", sizes: "512x512", type: "image/png" }],
  };
}
