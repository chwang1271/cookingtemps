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

export const metadata: Metadata = {
  title: "CookingTemps.com — Every Temperature You Need",
  description:
    "The trusted cooking temperature reference for home cooks and professionals. Safe internal temps, oven guides, smoke points, and more.",
  openGraph: {
    title: "CookingTemps.com — Every Temperature You Need",
    description:
      "From rare steak to hard crack candy — the trusted reference for home cooks and pros.",
    type: "website",
    locale: "en_US",
    url: "https://cookingtemps.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "CookingTemps.com",
    description: "The trusted cooking temperature reference.",
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
