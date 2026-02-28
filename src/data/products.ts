/* ═══════════════════════════════════════════
   AFFILIATE PRODUCT DATA
   Tracking is embedded via Amazon SiteStripe URLs
   ═══════════════════════════════════════════ */

export interface Product {
    id: string;
    category: string;
    name: string;
    description: string;
    price: string;
    accuracy?: string;
    range?: string;
    imageUrl: string;
    affiliateUrl: string;
    badge?: "Most Popular" | "Budget Pick" | "High-End Pick" | "Professional Pick";
}

export const products: Product[] = [
    {
        id: "javelin-pro-duo",
        category: "Most Popular",
        name: "Lavatools Javelin Pro Duo",
        description: "Fast, accurate, backlit display, magnetic back.",
        price: "$43",
        imageUrl: "/images/placeholder.webp",
        affiliateUrl: "https://amzn.to/3P98V4j",
        badge: "Most Popular",
    },
    {
        id: "thermopop-2",
        category: "Best Budget Pick",
        name: "ThermoWorks ThermoPop 2",
        description: "Compact, waterproof, rotating display.",
        price: "$47",
        imageUrl: "/images/placeholder.webp",
        affiliateUrl: "https://amzn.to/4l4AAPW",
        badge: "Budget Pick",
    },
    {
        id: "thermapen-one",
        category: "Best High-End Pick",
        name: "ThermoWorks Thermapen One",
        description: "Extremely fast and accurate, waterproof, 5-year warranty.",
        price: "$125",
        accuracy: "±0.5°F",
        imageUrl: "/images/placeholder.webp",
        affiliateUrl: "https://amzn.to/3OIbKJB",
        badge: "High-End Pick",
    },
    {
        id: "thermapen-classic",
        category: "Best Professional Pick",
        name: "ThermoWorks Classic Thermapen",
        description: "The industry standard for chefs, providing 2-3 second readings.",
        price: "$105",
        imageUrl: "/images/placeholder.webp",
        affiliateUrl: "https://amzn.to/4u6N4uA",
        badge: "Professional Pick",
    },
    {
        id: "tempspike-twin",
        category: "Best Tech Pick",
        name: "ThermoPro TP972 Twin TempSpike Plus",
        description: "Fully wireless, dual probes, Bluetooth connectivity.",
        price: "$90",
        imageUrl: "/images/placeholder.webp",
        affiliateUrl: "https://amzn.to/4u3qHWH",
    },
    {
        id: "etekcity-ir",
        category: "Best Non-Contact",
        name: "Etekcity Infrared Thermometer 774",
        description: "Non-contact, instant surface temperature readings.",
        price: "$19",
        range: "-58°F to 716°F",
        imageUrl: "/images/placeholder.webp",
        affiliateUrl: "https://amzn.to/4aVW3pr",
    },
];


