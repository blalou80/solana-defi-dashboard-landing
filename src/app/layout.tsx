import type { Metadata, Viewport } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  // "optional": no swap-reflow on first visit (CLS 0); cached fonts are
  // used immediately on repeat visits
  display: "optional",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "optional",
});

const SITE_URL = "https://solana-defi-dashboard-ashen.vercel.app";
const TITLE = "Solana DeFi Dashboard — A clearer view of DeFi risk";
const DESCRIPTION =
  "Independent Solana DeFi analytics and risk monitoring: real-time slippage analysis, liquidity position tracking, impermanent loss estimation, yield evaluation and portfolio risk assessment.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · Solana DeFi Dashboard",
  },
  description: DESCRIPTION,
  keywords: [
    "Solana",
    "DeFi analytics",
    "risk monitoring",
    "slippage analysis",
    "impermanent loss",
    "liquidity positions",
    "portfolio risk",
    "Jupiter API",
    "on-chain data",
  ],
  authors: [{ name: "Solana DeFi Dashboard" }],
  creator: "Solana DeFi Dashboard",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Solana DeFi Dashboard",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Solana DeFi Dashboard — Analytics & Risk Monitoring",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#06070d",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Solana DeFi Dashboard",
  applicationCategory: "FinanceApplication",
  applicationSubCategory: "DeFi Analytics",
  operatingSystem: "Web",
  description: DESCRIPTION,
  url: SITE_URL,
  codeRepository: "https://github.com/blalou80/solana-defi-dashboard",
  isAccessibleForFree: true,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free, open-source independent project",
  },
  featureList: [
    "Real-time slippage analysis",
    "Concentrated liquidity monitoring",
    "Impermanent loss analytics",
    "Yield performance tracking",
    "Portfolio risk assessment",
    "Token exposure monitoring",
    "Automated alerts",
    "Interactive analytics dashboard",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${jetbrainsMono.variable} dark`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <main id="main">{children}</main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
