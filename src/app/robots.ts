import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE_URL = "https://solana-defi-dashboard-ashen.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
