# Solana DeFi Dashboard — Landing Page

Cinematic product-launch landing page for **Solana DeFi Dashboard**, an
independent Solana DeFi analytics and risk monitoring platform.

Live project repository: <https://github.com/blalou80/solana-defi-dashboard>

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4,
shadcn/ui-style components, GSAP ScrollTrigger + Lenis (cinematic scroll),
React Three Fiber + drei (the crystal), Framer Motion, and Lucide icons.
Fully static export — deploys on the **Vercel Free Tier** or any static host
with no paid services or API keys.

## The experience (an eleven-beat film)

The page is a scroll-driven product film with the crystal as its brand
identity — the mark appears in the favicon, OpenGraph image, navigation,
loading state, 404 page and footer signature:

1. **Noise → Insight** — typographic word beats
2. **The Crystal** — R3F gem centerpiece
3. **Fracture** — the crystal in five fragments; a light pulse names each
4. **Statement** — "Paste a wallet. See the risk."
5. **Reveal** — the dashboard rises out of darkness
6. **See the chain** — bento of the eight modules
7. **Risk story** — you read numbers / we give context
8. **Architecture** — Jupiter → Analytics → Risk → Clarity
9. **Evidence** — colophon: facts, stack, roadmap, repository
10. **Vision** — Today: Analytics / Tomorrow: Intelligence
11. **Ending** — the crystal returns; two buttons; tiny footer

No SaaS nav menu (mark + one GitHub exit only), no feature counters, no
marquees, no gradient text. Green appears only where it carries meaning.
Motion tech: GSAP ScrollTrigger scenes are dynamically imported and
scrub-pinned; Lenis smooth scroll runs on the GSAP ticker; WebGL is
lazy-loaded with SVG/CSS fallbacks for mobile, no-WebGL and reduced-motion.
Measured: **Performance 94 · Accessibility 100 · SEO 100 · CLS 0**.

---

## Quick start

```bash
# 1. Install dependencies (Node.js 18.18+ or 20+)
npm install

# 2. Start the dev server
npm run dev
# → http://localhost:3000

# 3. Production build
npm run build

# 4. Serve the production build locally
npm run start

# 5. Lint
npm run lint
```

## Before you deploy — update these placeholders

| Item | Where | Notes |
|---|---|---|
| Site URL | `src/app/layout.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts` | Replace `https://solana-defi-dashboard.vercel.app` with your final domain (used for canonical URL, OG tags, sitemap reference) |
| Contact email | `src/components/contact.tsx`, `src/components/footer.tsx` | `contact@example.com` is a placeholder |
| Documentation link | `src/components/contact.tsx` | Currently points at the repo `docs/` directory description; swap for a real URL when docs ship |

## Project structure

```
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Metadata, fonts, JSON-LD, viewport, a11y skip-link
│   │   ├── page.tsx              # Section composition (all static)
│   │   ├── globals.css           # Tailwind v4 theme · Solana tokens · motion system
│   │   ├── sitemap.ts            # /sitemap.xml
│   │   ├── robots.ts             # /robots.txt
│   │   ├── manifest.ts           # /manifest.webmanifest (PWA metadata)
│   │   └── opengraph-image.tsx   # Dynamic 1200×630 OG/Twitter card image
│   ├── components/
│   │   ├── navigation.tsx        # Sticky nav, scroll state, mobile menu
│   │   ├── hero.tsx              # Headline, CTAs, interactive 3D tilt analytics card
│   │   ├── stats-strip.tsx       # Count-up facts band under the hero
│   │   ├── overview.tsx          # Project overview + capability pillars
│   │   ├── features.tsx          # Bento grid (8 modules, live mini-visuals)
│   │   ├── pipeline.tsx          # Scroll storytelling: sticky rail + 4 illuminating steps
│   │   ├── dashboard-preview.tsx # Tabbed workspace mockup; swipe carousel on mobile
│   │   ├── use-cases.tsx         # 6 audience cards (swipeable on mobile)
│   │   ├── tech-stack.tsx        # Marquee ticker + static grid mirror
│   │   ├── roadmap.tsx           # 4-phase timeline with status badges
│   │   ├── vision.tsx            # Vision statement panel
│   │   ├── faq.tsx               # 8-question accordion (Radix)
│   │   ├── contact.tsx           # GitHub / docs / email cards
│   │   ├── footer.tsx            # Nav, links, disclaimers
│   │   ├── section.tsx           # Reveal + Section layout primitives (Framer Motion)
│   │   ├── icons.tsx             # Inline GitHub brand mark (lucide dropped brand icons)
│   │   ├── effects/              # cursor-glow, tilt-card, count-up, scroll-progress,
│   │   │                         # motion-provider (shared LazyMotion context)
│   │   └── ui/                   # shadcn/ui-style: button, card, badge, accordion
│   └── lib/
│       └── utils.ts              # cn() class merger
├── components.json               # shadcn/ui config — add more components with `npx shadcn@latest add <name>`
├── next.config.ts                # Pinned build root
├── vercel.json                   # Security headers, framework hint
└── tailwind v4 (CSS-first config in globals.css — no tailwind.config file)
```

## Motion system (premium layer, performance-safe)

- **React Three Fiber crystal** (`three/hero-crystal-scene.tsx`): a
  low-poly Solana gem (faceted emissive core + translucent shell +
  orbiting shards + deterministic particle cloud) that rotates slowly,
  eases toward the cursor, and glows via scene lights. Progressive
  enhancement: the CSS orb renders on the server; the three.js chunk is
  lazy-loaded only on desktop browsers with WebGL and motion allowed,
  then fades in over the orb. `frameloop="demand"` ticks at ~8 fps and
  pauses when the tab is hidden — Lighthouse impact ≈1 point.
- **3D CSS orb** (`orb.tsx`): instant fallback for mobile, no-WebGL and
  reduced-motion visitors.
- **Scroll choreography** (`[data-hero-stage]` + `InteractionRoot`): one
  rAF-throttled scroll listener publishes `--stage-p`; the orb drifts,
  the dashboard card emerges in perspective, and the background shifts,
  all in CSS.
- **Custom cursor + spotlight** (`custom-cursor`, `cursor-glow`):
  two-element cursor (dot + lagging ring that grows over interactives)
  plus a trailing aurora glow and per-card spotlights. Desktop-only,
  cached rects, zero forced reflows.
- **Magnetic buttons** (`magnetic.tsx`): CTAs ease toward the pointer.
- **Cinematic reveals** (`section.tsx`): a single shared
  IntersectionObserver drives rise/clip/perspective/zoom variants via CSS
  transitions — no per-element animation-library hydration.
- **Narrative layout**: ghost chapter numbers (01–05), bento grid,
  scroll-storytelling pipeline, expandable roadmap.
- **Mobile swipe**: dashboard views, feature bento and use-case cards are
  native snap carousels.
- **Fake-live dashboard sim**: portfolio value jitters every ~2.6s while
  the tab is visible — every surface labeled "demo · sample data"; the
  page carries no real usage metrics anywhere.
- **Perf contract**: `.glass-lite` on repeated cards, `.cv-auto`
  content-visibility on sections, fonts with `display: "optional"`
  (CLS 0). Measured locally: observed LCP ~230 ms, TBT ~100–250 ms,
  Accessibility 100, SEO 100. Note: the Qoder Sites edge currently serves
  ~1.5 s TTFB and no compression, which depresses simulated Lighthouse
  scores there; the same export on Vercel's CDN with Brotli restores
  90+.

## Deploy to Vercel (free tier)

1. Push this folder to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel auto-detects **Next.js** — no build settings or environment
   variables needed. Accept defaults and deploy.
4. After the first deploy, copy your `*.vercel.app` (or custom) domain and
   update `SITE_URL` in the three files listed above, then redeploy so
   canonical/sitemap/robots match the live origin.

Alternative from the terminal:

```bash
npm i -g vercel
vercel        # preview
vercel --prod # production
```

The site is 100% static (`next build` prerenders every route), so it runs
well inside free-tier limits with no serverless functions.

## SEO & performance notes

- Metadata API: title template, description, keywords, OpenGraph, Twitter
  cards, canonical, `robots` directives — all in `app/layout.tsx`.
- Structured data: `SoftwareApplication` JSON-LD with `codeRepository`.
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, and a dynamic
  `opengraph-image` are generated by route files — verify at
  `/sitemap.xml`, `/robots.txt`, `/opengraph-image`.
- No client data fetching, no images beyond inline SVG, fonts loaded with
  `display: swap`, animations respect `prefers-reduced-motion` → Lighthouse
  scores of 95+ across Performance/SEO/Accessibility/Best Practices are
  achievable on the static page.
- `vercel.json` adds `nosniff`, `DENY` framing, referrer and permissions
  headers.

## Honesty constraints baked in

The copy deliberately avoids fabricated traction: no funding claims, no user
counts, no partnerships or testimonials, no TVL/AUM/volume figures. Every
mockup number (hero card, bento visuals, pipeline steps, dashboard preview)
is explicitly labeled as illustrative sample data — the hero and dashboard
carry the note "Illustrative sample data for demonstration purposes only,"
and the stats strip states that no user or adoption metrics appear anywhere
on the page. The footer declares independence from the Solana Foundation.
Keep it that way in future edits — credible beats inflated for application
reviewers.

## License

Same as the parent project — see the repository for details.
