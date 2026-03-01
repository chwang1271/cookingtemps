import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { TempUnitProvider } from "@/providers/TempUnitProvider";
import { SearchProvider } from "@/providers/SearchProvider";
import { StickyHeader } from "@/components/layout/StickyHeader";
import { SidebarNav } from "@/components/layout/SidebarNav";
import { MobileNavToggle } from "@/components/layout/MobileNavToggle";
import { BackToTop } from "@/components/layout/BackToTop";
import { SearchOverlay } from "@/components/ui/SearchOverlay";
import { Toast } from "@/components/ui/Toast";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const BASE_URL = "https://cookingtemps.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      "url": BASE_URL,
      "name": "CookingTemps.com",
      "description": "The trusted cooking temperature reference for home cooks and professionals.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${BASE_URL}/?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "FAQPage",
      "@id": `${BASE_URL}/#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the safe internal temperature for chicken?",
          "acceptedAnswer": { "@type": "Answer", "text": "165°F (74°C) is the USDA safe minimum internal temperature for all poultry, including chicken breasts, thighs, and ground chicken." }
        },
        {
          "@type": "Question",
          "name": "What temperature is medium-rare steak?",
          "acceptedAnswer": { "@type": "Answer", "text": "Medium-rare steak is cooked to an internal temperature of 130–135°F (54–57°C). The USDA safe minimum for whole beef cuts is 145°F (63°C)." }
        },
        {
          "@type": "Question",
          "name": "What is the food danger zone temperature range?",
          "acceptedAnswer": { "@type": "Answer", "text": "The USDA food danger zone is 40°F to 140°F (4°C to 60°C). Bacteria multiply most rapidly in this range. Perishable food should not be left in the danger zone for more than 2 hours." }
        },
        {
          "@type": "Question",
          "name": "What temperature does olive oil smoke?",
          "acceptedAnswer": { "@type": "Answer", "text": "Extra virgin olive oil has a smoke point of approximately 375°F (191°C). Refined or light olive oil smokes at a higher temperature, around 465°F (240°C)." }
        },
        {
          "@type": "Question",
          "name": "What temperature is hard crack candy stage?",
          "acceptedAnswer": { "@type": "Answer", "text": "The hard crack stage in candy making is reached at 300–310°F (149–154°C). At this stage, sugar syrup forms brittle, glassy threads when dropped in cold water." }
        },
        {
          "@type": "Question",
          "name": "What is the safe internal temperature for pork?",
          "acceptedAnswer": { "@type": "Answer", "text": "The USDA recommends cooking whole pork cuts to a minimum internal temperature of 145°F (63°C), followed by a 3-minute rest. Ground pork should reach 160°F (71°C)." }
        },
        {
          "@type": "Question",
          "name": "What temperature should I bake bread at?",
          "acceptedAnswer": { "@type": "Answer", "text": "Most breads are baked at 375–450°F (190–230°C). Bread is done when the internal temperature reaches 190–210°F (88–99°C) depending on the type." }
        },
        {
          "@type": "Question",
          "name": "What is a moderate oven temperature?",
          "acceptedAnswer": { "@type": "Answer", "text": "A moderate oven is typically 325–375°F (165–190°C). This is a common range for roasting, baking cookies, and most casseroles." }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "CookingTemps.com — Every Temperature You Need",
  description:
    "The trusted cooking temperature reference for home cooks and professionals. USDA-verified safe internal temps, oven guides, oil smoke points, candy stages, and more.",
  keywords: [
    "cooking temperatures",
    "safe internal temperature",
    "meat temperature chart",
    "food danger zone",
    "oil smoke points",
    "candy stages",
    "oven temperature guide",
    "USDA safe temp",
    "baking temperatures",
    "temperature converter",
  ],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "CookingTemps.com — Every Temperature You Need",
    description:
      "From rare steak to hard crack candy — the trusted reference for home cooks and pros.",
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "CookingTemps.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CookingTemps.com — Every Temperature You Need",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CookingTemps.com — Every Temperature You Need",
    description: "The trusted cooking temperature reference for home cooks and professionals.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Material Symbols Outlined — used for brand icons */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
        {/* JSON-LD structured data — WebSite + FAQPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased overflow-x-hidden`}
      >
        <ThemeProvider>
          <TempUnitProvider>
            <SearchProvider>
              {/* Skip-to-content link for accessibility */}
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-highlight focus:text-ink focus:px-4 focus:py-2 focus:font-bold focus:font-mono"
              >
                Skip to content
              </a>

              <StickyHeader />
              <SidebarNav />

              <div className="pt-16 min-h-screen flex">
                {/* Sidebar spacer on desktop */}
                <div className="hidden lg:block w-64 shrink-0" aria-hidden="true" />

                <div id="main-content" className="flex-1 min-w-0">
                  {children}
                </div>
              </div>

              <MobileNavToggle />
              <BackToTop />
              <SearchOverlay />
              <Toast />
            </SearchProvider>
          </TempUnitProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
