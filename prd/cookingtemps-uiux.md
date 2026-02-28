# UI/UX Design Specification
## CookingTemps.com — Phase 1 Homepage

**Version:** 1.0
**Date:** February 2026

---

## 1. Design Philosophy

**Principles:**
- **Clarity first:** Temperature data must be scannable at a glance. No cognitive overload.
- **Warm & appetizing:** Palette and imagery evoke fire, warmth, and the pleasure of cooking.
- **Speed over decoration:** Every visual element earns its place by improving comprehension.
- **Mobile-first:** Over 60% of food reference lookups happen on phones in kitchens.
- **Trust through precision:** Typography and layout signal authority and accuracy.

---

## 2. Brand Identity

### 2.1 Brand Voice
Knowledgeable but approachable. Like a trusted chef-friend, not a food safety bureaucrat.

### 2.2 Color Palette

| Role | Color | Hex |
|---|---|---|
| Primary (Fire Red) | Warm red-orange | #E8441A |
| Secondary (Ember) | Deep amber | #C97B2E |
| Accent (Smoke) | Cool slate | #4A5568 |
| Background (Light) | Warm off-white | #FAFAF8 |
| Background (Dark Mode) | Deep charcoal | #1A1A1A |
| Text Primary | Near black | #1C1C1E |
| Text Secondary | Medium grey | #6B7280 |
| Safe Green | USDA safe indicator | #22C55E |
| Danger Red | Danger zone / unsafe | #EF4444 |
| Caution Amber | Marginal temps | #F59E0B |
| Surface White | Cards, panels | #FFFFFF |
| Surface Dark | Dark mode cards | #2D2D2D |

### 2.3 Typography

| Use | Font | Weight | Size |
|---|---|---|---|
| Display / Hero | DM Serif Display or Playfair Display | 700 | 48–72px |
| Section Headings | Inter or DM Sans | 700 | 28–36px |
| Body / Labels | Inter | 400/500 | 14–16px |
| Temperature Values | JetBrains Mono or IBM Plex Mono | 600 | 16–24px |
| Small/Caption | Inter | 400 | 12px |

**Rationale:** Monospace fonts for temperature values improve scannability and feel precise. Serif display font for headings adds warmth and character.

### 2.4 Iconography
- Use Lucide Icons (open source, clean) for UI icons.
- Custom SVG icons for cooking methods (flame, thermometer, grill, etc.).
- No emoji in primary UI — only in contextual "fun facts" section.

---

## 3. Layout System

### 3.1 Grid
- Desktop: 12-column grid, 1280px max content width, 24px gutters.
- Tablet: 8-column, 768px+.
- Mobile: 4-column, full-bleed with 16px horizontal padding.

### 3.2 Spacing Scale (8px base)
4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 128px

### 3.3 Border Radius
- Cards: 12px
- Buttons: 8px
- Badges/Tags: 999px (pill)
- Inputs: 8px

---

## 4. Navigation

### 4.1 Sticky Header
- Height: 64px desktop / 56px mobile.
- Logo left-aligned (flame icon + "CookingTemps" wordmark).
- Right: Dark mode toggle, Search icon, (future: Nav links).
- Background: white/dark with subtle bottom border + backdrop blur on scroll.
- On mobile: hamburger menu (Phase 2 when more pages exist; Phase 1 = anchor links).

### 4.2 Section Navigation (Desktop)
- Fixed left sidebar on desktop (240px) showing section anchors with active state highlighting.
- OR: Horizontal pill-style anchor nav below the hero that sticks on scroll.
- Recommended: Horizontal anchor nav — less intrusive, works better for a single-page layout.

**Anchor Nav Items:**
Meats | Oven Temps | C/F Converter | Frying & Oils | Candy | Baking | Food Safety | Beverages | Products

### 4.3 Back to Top
- Floating "↑" button appears after scrolling 500px. Bottom-right, 48×48px.

---

## 5. Section-by-Section UI Specifications

### 5.1 Hero Section
**Layout:** Full-width, min-height 480px.
**Background:** Dark gradient (charcoal to deep red) with a subtle radial glow suggesting heat. Optional: subtle animated particle effect (embers floating up) — keep it performant.
**Content:**
- Large headline: "Every Temperature You Need. All In One Place."
- Sub-headline: "From rare steak to hard crack candy — the trusted reference for home cooks and pros."
- Search bar: Full-width on mobile, 600px on desktop. Placeholder: "Search a food or technique..." Real-time autocomplete dropdown showing matching items.
- Below search: "Popular searches" tag pills — Chicken | Medium Rare | Deep Frying | 350°F Oven | Smoke Points
**Visual:** Thermometer SVG illustration or food photography (plated steak, etc.) right-aligned on desktop, hidden on mobile.

### 5.2 Meat & Poultry Temperature Chart
**Layout:** Full-width section, light background.
**Component:** Tabbed interface — tabs for: Beef | Pork | Poultry | Lamb | Fish & Seafood | Game.

Each tab shows a table with columns:
- Cut / Type
- Rare / Min Safe / Medium / Well Done temperatures (°F and °C)
- Visual doneness color bar (pink-to-brown gradient strip)
- USDA Safe badge (green checkmark)

**Color coding:**
- Rare: deep pink (#E8779A)
- Medium Rare: rose (#D64F6D)
- Medium: tan-pink (#C97B5C)
- Well Done: brown (#8B4513)
- USDA Safe: green (#22C55E tag)

**Interactions:**
- Click any temperature cell to copy to clipboard (shows "Copied!" toast).
- Toggle between °F and °C via pill toggle at top of section.
- Hover row highlights full row.

### 5.3 C/F/K Converter Widget
**Layout:** Centered card, max-width 480px, prominent placement.
**Design:** Clean card with three input fields (°F, °C, K) that update each other in real time.
**Below inputs:** Preset button grid — common cooking temps as quick-select chips:
- 32°F Freezing | 165°F Chicken Safe | 145°F Pork | 212°F Boiling | 325°F Roast | 375°F Bake | 450°F High Heat | 500°F Pizza
**Visual:** Mini thermometer SVG showing where the current temperature falls on a scale.
**Formula display:** Shows the conversion formula used (educational).

### 5.4 Oven Temperature Guide
**Layout:** Two-column on desktop (visual scale left, table right), single column on mobile.
**Left:** Vertical oven temperature scale from 200°F to 550°F with labeled zones (Very Low, Low, Moderate, Hot, Very Hot) using color gradient from blue to orange to red.
**Right:** Table mapping temperature ranges to: common dishes, baking applications, and Gas Mark equivalent.
**Bottom:** Convection callout box: "Using a convection oven? Reduce temp by 25°F (15°C) or reduce time by 25%."

### 5.5 Food Safety Danger Zone Infographic
**Layout:** Full-bleed section with dark background for visual impact.
**Visual:** Vertical thermometer infographic spanning the section:
- 0°F / -18°C — Freezer Safe (blue zone)
- 32°F / 0°C — Freezing point
- 40°F / 4°C — Refrigerator safe upper limit (green zone top)
- 40–140°F / 4–60°C — DANGER ZONE (animated red striped/pulsing zone)
- 140°F / 60°C — Hot holding minimum
- 165°F / 74°C — Poultry kill point
- 212°F / 100°C — Boiling (blue)
**Callout cards:**
- "2-Hour Rule: Never leave food in the danger zone for more than 2 hours (1 hour if above 90°F)."
- Refrigerator: ≤ 40°F / Freezer: ≤ 0°F / Hot Hold: ≥ 140°F
**Animation:** Danger zone pulses subtly with a red glow. Triggered on scroll-into-view.

### 5.6 Cooking Methods Chart
**Layout:** Horizontal scrollable card row on mobile; 3-column grid on desktop.
**Each card shows:**
- Icon (flame, pot, smoker, etc.)
- Method name
- Temperature range in °F and °C
- 1-line tip (e.g., "Searing: use a screaming hot pan")
- Color-coded heat intensity strip at top of card
**Methods:** Searing | Roasting | Deep Frying | Smoking (BBQ) | Sous Vide | Grilling | Braising | Steaming | Air Frying

### 5.7 Oil Smoke Points Chart
**Layout:** Two columns — visual heat scale left, sortable table right (desktop). Stacked on mobile.
**Table columns:** Oil Name | Smoke Point (°F) | Smoke Point (°C) | Best For | Flavor Profile
**Sorting:** Click column headers to sort.
**Visual:** Horizontal bar chart per oil showing smoke point relative to a 500°F scale.
**Color:** Low smoke point = amber, high = red.
**Highlight:** "Chef's Pick" badge on avocado oil and refined coconut oil.

### 5.8 Candy / Sugar Temperature Stages
**Layout:** Vertical "thermometer journey" — stages progress from bottom (thread) to top (caramel/burnt sugar).
**Each stage card:**
- Stage name (Thread, Soft Ball, etc.)
- °F and °C range
- What it looks like / texture
- What it's used for (fudge, caramel, hard candy, etc.)
**Visual:** Continuous color-gradient thermometer graphic on the left (pale yellow → amber → dark brown).
**Fun touch:** Animated drip effect on the candy thermometer.

### 5.9 Baking & Bread Section
**Layout:** Simple two-column cards.
**Left column:** Breads (Yeast bread, sourdough, quick bread, rolls).
**Right column:** Baked goods (Cakes, cheesecake, custard, brownies, cookies).
Each item: food name, target internal temp, visual doneness cue.

### 5.10 Beverage Temperatures
**Layout:** Horizontal card scroll (tabs or carousel).
**Tabs:** Coffee & Tea | Beer | Wine | Other
Each tab: clean temperature range cards with °F / °C.
**Visual:** Glassware illustrations or icons per category.

### 5.11 "Did You Know?" / Fun Facts Section
**Layout:** 3-column card grid (1 column on mobile).
**Cards with flame icon:**
- "The Maillard reaction begins at ~280°F (138°C), creating the browned crust on bread and meat."
- "A wood-fired pizza oven runs at 800–900°F — 400°F hotter than your home oven."
- "Eggs begin to coagulate at 144°F — just a few degrees determines soft vs. hard scramble."
**Tone:** Educational but conversational. Links to future articles (Phase 2).

### 5.12 Affiliate Product Section
**Layout:** 4-card grid (2 on mobile).
**Each card:**
- Product image (Cloudflare Images optimized)
- Product name
- 1-line description
- Star rating
- "View on Amazon" CTA button (affiliate link via redirect)
- "Editor's Pick" badge on featured item
**Phase 1:** Static, manually curated. Phase 2: CMS-managed with affiliate click tracking.

### 5.13 Footer
**Layout:** 3-column on desktop, stacked on mobile.
**Column 1:** Logo + tagline + social icons (future).
**Column 2:** Quick links — Temperature Charts | Converter | Safety Guide | (future: Articles, Tools).
**Column 3:** "Subscribe for updates" email capture form (Mailchimp or ConvertKit embed).
**Bottom bar:** "© 2026 CookingTemps.com | All temperatures verified against USDA/FDA guidelines | Privacy Policy | Terms"
**Disclaimer:** Small text note about consulting professionals for food safety in commercial settings.

---

## 6. Interactive Components

### 6.1 Temperature Toggle (°F / °C)
- Global toggle in the sticky nav and within each section.
- Uses localStorage to remember user preference.
- Smooth number transition animation on switch.
- All charts and tables update simultaneously.

### 6.2 Search
- Instant search powered by Algolia or Typesense.
- Results grouped by type: Temperature Value | Chart | Guide | (future: Article).
- Keyboard navigable (↑↓ Enter Esc).
- "No results" state with suggestions.

### 6.3 Click-to-Copy
- All temperature values are copyable on click.
- Shows a subtle "Copied!" tooltip for 1.5 seconds.
- Works on both individual cells and formatted strings like "165°F / 74°C".

### 6.4 Dark Mode
- System preference respected by default (prefers-color-scheme).
- Manual toggle persisted in localStorage.
- Smooth 200ms transition between modes.
- All charts and infographics have dark mode variants.

### 6.5 Print / Save
- "Print this chart" button on each major table opens print-optimized view.
- Clean print stylesheet (no nav, no ads, black text on white).

---

## 7. Responsive Behavior

| Breakpoint | Width | Key Changes |
|---|---|---|
| Mobile | < 640px | Single column, stacked cards, collapsible sections, horizontal scroll for tables |
| Tablet | 640–1024px | 2-column grid, condensed nav |
| Desktop | 1024–1280px | Full layout, left anchor nav optional |
| Wide | > 1280px | Max-width 1280px centered, larger typography |

**Mobile-specific:**
- Tables collapse to card-per-row view with accordion expand.
- Temperature converter is prominently above the fold.
- Bottom sticky bar: °F / °C toggle + Search icon.

---

## 8. Accessibility (WCAG 2.1 AA)

- All color combinations pass 4.5:1 contrast ratio minimum.
- All interactive elements are keyboard focusable with visible focus rings.
- Temperature charts use `<table>` with proper `scope` attributes for screen readers.
- ARIA live regions for converter output.
- `aria-label` on all icon buttons.
- Skip-to-content link at top of page.
- Reduced motion preference respected (no animations when `prefers-reduced-motion: reduce`).

---

## 9. Performance Guidelines

- Images: WebP/AVIF via Cloudflare Images, lazy loaded, explicit width/height to prevent CLS.
- Infographics: SVG preferred over PNG/JPG.
- Fonts: Self-hosted or `font-display: swap`. Subset to needed characters.
- Critical CSS inlined; non-critical deferred.
- Converter widget: No network calls — pure JavaScript.
- Charts: Lazy-loaded on scroll (Intersection Observer).
- Target: < 200KB initial JS bundle.

---

## 10. Component Inventory (Phase 1)

| Component | Type | Notes |
|---|---|---|
| TemperatureTable | Interactive | Tabs, sortable, copyable |
| TempConverter | Widget | Real-time, 3-unit |
| OvenScale | Infographic | SVG-based |
| DangerZoneChart | Infographic | Animated, SVG |
| SmokePointChart | Hybrid | Table + bar chart |
| CandyStageTimeline | Infographic | Vertical scroll |
| ProductCard | Static/CMS | Affiliate link |
| SearchBar | Interactive | Algolia-powered |
| DarkModeToggle | UI Control | localStorage |
| TempUnitToggle | UI Control | Global state |
| ClickToCopy | Utility | On all temp values |
| AnchorNav | Navigation | Sticky horizontal |
| Toast | Feedback | Copy confirmations |
| Footer | Layout | Email capture |

---

## 11. Future UI Considerations (Phase 2+)

- Article/blog layout with reading progress indicator.
- Product comparison table UI for affiliate section.
- User account dashboard (saved charts, preferences, custom notes).
- Printable/downloadable temperature card generator.
- Embeddable widget (third-party sites can embed the converter).
- PWA offline support — temperature charts available offline.
