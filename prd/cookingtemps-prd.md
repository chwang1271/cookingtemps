# Product Requirements Document (PRD)
## CookingTemps.com

**Version:** 1.0
**Date:** February 2026
**Status:** Draft

---

## 1. Executive Summary

CookingTemps.com is a consumer-facing web resource dedicated to cooking temperatures. Phase 1 launches as a rich, single-page experience — a "one-stop shop" reference for home cooks and professionals. The architecture is designed from day one to scale into a full content hub with articles, guides, tools, affiliate commerce, and interactive features.

---

## 2. Vision & Goals

### 2.1 Vision
Become the #1 trusted reference destination for cooking temperature knowledge — starting with a best-in-class one-pager and growing into a comprehensive culinary hub.

### 2.2 Phase 1 Goals
- Launch a fast, visually rich single-page website packed with useful temperature data.
- Establish brand identity and SEO foundation.
- Attract organic search traffic via structured data and targeted content.
- Build a scalable, future-proof technical architecture from the start.

### 2.3 Future Phase Goals (Phase 2+)
- Expand to a full content hub: articles, guides, how-to's.
- Launch an affiliate product section (thermometers, cookware, tools).
- Add interactive tools (e.g., meat doneness calculator, safe temp checker).
- Support user accounts, saved preferences, and community features.

---

## 3. Target Audience

**Primary Users:**
- Home cooks (beginner to intermediate) looking for quick temperature references.
- Food safety-conscious consumers checking safe internal temperatures.
- Barbecue and grilling enthusiasts.

**Secondary Users:**
- Professional cooks and chefs needing a quick reference.
- Food bloggers and content creators linking to reliable sources.
- Students in culinary programs.

---

## 4. Phase 1 — Homepage Feature Requirements

### 4.1 Core Content Sections

**Section 1: Hero / Quick Reference**
- Prominent headline and tagline establishing brand authority.
- Quick-access search bar (type a food, get temp instantly).
- Featured "temperature of the day" or seasonally relevant tip.

**Section 2: Meat & Poultry Temperature Chart**
- Safe internal temperatures for beef, pork, lamb, chicken, turkey, duck, veal, fish/seafood.
- Doneness levels (rare, medium-rare, medium, well-done) with color-coded visual indicators.
- USDA-recommended vs. chef-preferred temperatures clearly labeled.
- Source attribution (USDA, FDA).

**Section 3: Celsius / Fahrenheit Converter**
- Interactive, real-time C↔F converter widget.
- Common preset temperatures (e.g., 165°F chicken, 145°F pork, 375°F oven) as quick-tap buttons.
- Kelvin display option.

**Section 4: Oven Temperature Guide**
- Descriptive oven temp ranges: Very Low → Very Hot.
- Common baking temperatures mapped to common dishes.
- Gas mark equivalents.
- Convection adjustment guide (reduce by 25°F / 15°C rule).

**Section 5: Food Safety Danger Zone Infographic**
- Visual infographic: 40°F – 140°F (4°C – 60°C) danger zone.
- Time-based risk: 2-hour rule explanation.
- Refrigerator, freezer, and hot-holding safe zones.

**Section 6: Cooking Methods Temperature Guide**
- Temperatures and techniques for: searing, roasting, braising, deep frying, smoking, sous vide, grilling.
- Visual comparison chart.

**Section 7: Oil Smoke Points Chart**
- Common cooking oils with smoke points in °F and °C.
- Visual "heat scale" infographic.
- Best use cases per oil.

**Section 8: Candy & Sugar Temperature Stages**
- Thread, soft ball, firm ball, hard ball, soft crack, hard crack, caramel stages.
- °F and °C for each stage.
- Visual thermometer graphic.

**Section 9: Bread & Baking Internal Temperatures**
- Bread doneness temps (internal: ~190–210°F).
- Cakes, cookies, custards, cheesecake.

**Section 10: Beverage & Liquid Temperatures**
- Coffee, tea, and espresso ideal serving temps.
- Beer serving temperatures by style.
- Wine serving guide.

**Section 11: Fun / Exploratory Section**
- "Did You Know?" temperature facts.
- World record cooking temps (pizza ovens, etc.).
- Science of the Maillard reaction with temperature context.

**Section 12: Affiliate Product Spotlights (Phase 1 Placeholder)**
- 3–4 "recommended thermometer" cards (static in Phase 1, linked to Amazon/affiliate).
- CTA: "Best Meat Thermometers" etc.

### 4.2 Interactive Features (Phase 1)
- Live C/F/K converter widget.
- Collapsible/expandable sections on mobile for UX cleanliness.
- Smooth scroll navigation with sticky header.
- "Copy temperature" click-to-copy on all temperature values.
- Dark mode toggle.

---

## 5. Technical Architecture

### 5.1 Frontend
- **Framework:** Next.js 14+ (App Router) — enables SSR, SSG, and ISR.
- **Styling:** Tailwind CSS.
- **Component Library:** shadcn/ui or Radix UI primitives.
- **Charts/Infographics:** Recharts or D3.js for interactive charts; static SVG infographics for performance.
- **Animations:** Framer Motion (subtle, purposeful).

### 5.2 CMS
- **Headless CMS:** Sanity.io (recommended) or Contentful.
  - Sanity preferred for its flexible schema, real-time preview, and developer ergonomics.
  - All homepage content sections managed via CMS for easy updates.
  - Structured content types: TemperatureChart, ConversionGuide, InfoSection, ProductCard, BlogPost (future).

### 5.3 Backend & API
- **API Layer:** Next.js API routes (Phase 1); migrate to dedicated Node.js/Express or Hono API (Phase 2+).
- **Database:** PostgreSQL via Supabase (Phase 1–2) — handles user data, search indexes, analytics events.
  - Supabase provides auth, real-time, and REST/GraphQL APIs out of the box.
- **Search:** Algolia (or Typesense self-hosted) — powers the site-wide search, pre-indexed from CMS content.

### 5.4 Infrastructure & CDN
- **Hosting:** Vercel (optimal for Next.js) with edge functions.
- **CDN:** Cloudflare in front of Vercel for additional caching, DDoS protection, WAF.
  - Cloudflare Page Rules for aggressive static asset caching.
- **Image Storage & Optimization:** Cloudflare R2 (object storage) + Cloudflare Images for image resizing and format conversion (WebP/AVIF auto).
  - Future: all infographics, article images, product photos via Cloudflare Images CDN.
- **DNS:** Cloudflare DNS.

### 5.5 Analytics & SEO
- **Analytics:** Plausible Analytics (privacy-first) or Google Analytics 4.
- **SEO:** Next.js Metadata API; JSON-LD structured data for HowTo, FAQPage, and Table schemas.
- **Sitemap:** Auto-generated via next-sitemap.
- **Core Web Vitals:** Target LCP < 2.5s, CLS < 0.1, INP < 200ms.

### 5.6 Affiliate Integration
- Affiliate links via Amazon Associates, ShareASale, or Impact.
- Link management via a lightweight redirect layer (e.g., `/go/thermometer-name`) to swap affiliate links without code changes.

---

## 6. Content Management Requirements

- All temperature data editable by non-technical team via CMS.
- CMS supports rich text, tables, image uploads, and structured data fields.
- Content preview in CMS before publishing.
- Version history and rollback capability.
- Multi-author support for future editorial team.

---

## 7. SEO & Performance Requirements

- All pages must achieve Lighthouse score ≥ 90 across all categories.
- Implement OpenGraph and Twitter card meta tags.
- Canonical URLs, robots.txt, sitemap.xml from day one.
- Schema.org structured data for temperature tables (Table schema) and FAQs.
- Target keywords from day one: "chicken internal temperature," "medium rare steak temp," "pork safe temperature," "oven temperature guide," etc.

---

## 8. Phase 2+ Expansion Roadmap

| Feature | Phase |
|---|---|
| Blog / Articles section | 2 |
| Printable PDF temperature cards | 2 |
| User accounts & saved preferences | 2 |
| Affiliate product catalog | 2 |
| Interactive meat doneness calculator | 2 |
| Cooking timer tool | 2 |
| Recipe temperature checker | 3 |
| Community Q&A / Comments | 3 |
| Native mobile app (iOS/Android) | 3 |
| API for third-party integrations | 3 |
| Premium membership tier | 3 |

---

## 9. Success Metrics (Phase 1)

- Organic search traffic: 5,000 sessions/month within 6 months.
- Bounce rate: < 60%.
- Average time on page: > 2 minutes.
- Lighthouse performance score: ≥ 90.
- Affiliate click-through rate: ≥ 2%.
- Newsletter signups (if added): 500 in first 90 days.

---

## 10. Constraints & Assumptions

- Phase 1 is a single developer or small team build.
- Budget: low to moderate (leveraging free tiers of Vercel, Supabase, Sanity, Cloudflare).
- Launch timeline: 4–8 weeks for Phase 1.
- Content accuracy is critical — all temperatures must be verified against USDA/FDA sources.
- No user-generated content in Phase 1.
