import type { MetadataRoute } from "next";

const BASE_URL = "https://cookingtemps.com";

/**
 * Next.js App Router sitemap — auto-served at /sitemap.xml
 * Each section anchor is listed as its own URL so Google can deep-link
 * directly to individual data tables.
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    const sections = [
        { id: "meat", label: "Meat & Poultry Temperatures" },
        { id: "converter", label: "Temperature Converter" },
        { id: "oven", label: "Oven Temperature Guide" },
        { id: "danger", label: "Food Danger Zone" },
        { id: "methods", label: "Cooking Methods" },
        { id: "smoke", label: "Oil Smoke Points" },
        { id: "sugar", label: "Sugar Stages" },
        { id: "baking", label: "Baking Temperatures" },
        { id: "beverages", label: "Beverage Temperatures" },
        { id: "funfacts", label: "Cooking Fun Facts" },
        { id: "products", label: "Recommended Gear" },
    ];

    return [
        // Homepage (canonical root)
        {
            url: BASE_URL,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 1.0,
        },
        // Section anchors (deep-linkable reference pages)
        ...sections.map((section) => ({
            url: `${BASE_URL}/#${section.id}`,
            lastModified: now,
            changeFrequency: "monthly" as const,
            priority: 0.8,
        })),
        // Legal pages
        {
            url: `${BASE_URL}/privacy`,
            lastModified: now,
            changeFrequency: "yearly" as const,
            priority: 0.3,
        },
        {
            url: `${BASE_URL}/terms`,
            lastModified: now,
            changeFrequency: "yearly" as const,
            priority: 0.3,
        },
    ];
}
