# CookingTemps.com

> **Every temperature you need** — the trusted reference for home cooks and professionals.

A brutalist-industrial cooking temperature reference built with Next.js 16, Tailwind CSS v4, and TypeScript. Features live unit conversion, click-to-copy temperatures, USDA-verified data, and 11 fully-implemented reference sections.

---

## Getting Started

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build + type check
```

---

## Sections

| Section | Description |
|---------|-------------|
| **Meat & Poultry** | USDA-verified internal temps for beef, pork, poultry, lamb, fish, game — 6 tabs with colour-coded doneness columns |
| **Unit Converter** | Real-time °F / °C / K converter with 8 preset chips and animated SVG thermometer |
| **Danger Zone** | 40°F–140°F hazard zone with animated hatch bar, zone reference cards, and USDA FSIS safety rules |
| **Oil Smoke Points** | 15 oils ranked by smoke point, filterable by heat category (High / Medium / Low / All), with proportional heat bars |
| **Oven Temperatures** | 6 heat ranges (Very Low → Broil) with gas mark references and a decorative gradient SVG dial |
| **Cooking Methods** | 9 techniques (Searing → Sous Vide) with 4-segment heat intensity bars and pro tip callouts |
| **Sugar Stages** | Vertical candy-making timeline (Thread → Caramel) with gold-to-red colour progression |
| **Baking Temperatures** | Internal temp tables for breads and pastries with doneness cues |
| **Beverage Temps** | Serving temperature guide for coffee, tea, beer, and wine with HOT/COLD indicators and spectrum bars |
| **Fun Facts** | Scrolling ticker + 6 food science fact cards with auto-highlighted temperature references |
| **Gear** | Curated affiliate thermometer cards with category badges (Most Popular, Budget Pick, High-End Pick, Professional Pick), product images, and compliant affiliate disclosure |

---

## Features

- **Global unit toggle** — switch °F / °C / K sitewide; all values update instantly via React context
- **Click-to-copy** — every temperature is a copy button; clipboard feedback via toast notification
- **Scroll-spy sidebar** — left nav highlights the active section as you scroll
- **Search overlay** — `CMD+K` / `Ctrl+K` opens the command palette
- **Light / dark theme** — user-selectable via header toggle, persisted to localStorage
- **Email subscribe** — footer form (first name, last name, email) saved to Brevo via `/api/subscribe`
- **USDA-verified data** — meat and food safety temps sourced from USDA FSIS guidelines
- **SEO / AEO** — JSON-LD structured data (WebSite + FAQPage), sitemap.xml, robots.txt, llms.txt
- **Accessible** — semantic HTML, ARIA roles, and live regions on interactive components

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Styling | Tailwind CSS v4 with custom brutalist design tokens |
| Language | TypeScript (strict) |
| Icons | Lucide React + Material Symbols |
| Fonts | Space Grotesk (display) · JetBrains Mono (mono) |
| Email | [Brevo](https://brevo.com) (Contacts API v3) |

---

## Project Structure

```
src/
├── app/
│   ├── api/subscribe/route.ts  # Brevo email subscribe endpoint
│   ├── privacy/page.tsx        # Privacy policy page
│   ├── terms/page.tsx          # Terms of service page
│   ├── sitemap.ts              # Dynamic sitemap (auto-served at /sitemap.xml)
│   ├── layout.tsx              # Root layout — fonts, metadata, JSON-LD, providers
│   └── page.tsx                # Homepage — assembles all 11 sections
├── components/
│   ├── layout/                 # StickyHeader, SidebarNav, Footer, BackToTop
│   ├── sections/               # One component per page section (11 total)
│   └── ui/                     # Badge, SectionHeader, TabGroup, Toast, SearchOverlay
├── data/                       # Typed static data modules (meats, oils, candy, products, etc.)
├── hooks/                      # useClipboard, useScrollSpy
├── lib/                        # tempConvert, constants, cn() utility
└── providers/
    ├── ThemeProvider.tsx        # Light / dark theme context
    └── TempUnitProvider.tsx     # Global °F / °C / K context

public/
├── images/                     # Locally hosted product images
├── robots.txt                  # Crawler rules (incl. GPTBot, Claude-Web, PerplexityBot)
└── llms.txt                    # AEO file for AI indexing

---

## Data Sources

| Data | Source |
|------|--------|
| Meat safe temperatures | [USDA FSIS Safe Temperature Chart](https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/safe-temperature-chart) |
| Danger zone | [USDA FSIS: Danger Zone 40°F–140°F](https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/danger-zone-40f-140f) |
| Oil smoke points | Culinary science references |
| Sugar stages | Standard confectionery thermometer stages |
| Baking internals | King Arthur Baking, culinary science |
| Beverage temps | Specialty coffee / sommelier standards |

---

## Environment Variables

Create a `.env.local` file in the project root:

```
BREVO_API_KEY=xkeysib-...   # Brevo v3 API key (NOT the SMTP key)
```

> Get your API key at [app.brevo.com/settings/keys/api](https://app.brevo.com/settings/keys/api). Use the **API Keys** tab — the key must start with `xkeysib-`, not `xsmtpsib-`.

The subscribe route (`/api/subscribe`) automatically resolves the Brevo list ID for the list named `"cookingtemps"` on first use and caches it in-memory.

---

## Deploy

The app deploys to Vercel with zero configuration. Set `BREVO_API_KEY` as an environment variable in the Vercel dashboard before deploying.

```bash
npm run build   # verify build passes
vercel deploy   # or connect your Git repo in the Vercel dashboard
```

---

> All temperature data is for informational purposes only. For commercial food safety decisions, consult a licensed food safety professional.
>
> © 2026 CookingTemps.com
