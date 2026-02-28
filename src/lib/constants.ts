/* ═══════════════════════════════════════════
   SITE-WIDE CONSTANTS
   ═══════════════════════════════════════════ */

/** Section IDs used for anchor navigation and scroll spy */
export const SECTION_IDS = {
    hero: "hero",
    meat: "meat",
    converter: "converter",
    oven: "oven",
    danger: "danger",
    methods: "methods",
    oils: "oils",
    sugar: "sugar",
    baking: "baking",
    beverages: "beverages",
    funFacts: "fun-facts",
    products: "products",
} as const;

/** Sidebar / anchor nav items in display order */
export const NAV_ITEMS: { id: string; label: string }[] = [
    { id: SECTION_IDS.meat, label: "MEAT & POULTRY" },
    { id: SECTION_IDS.converter, label: "CONVERTER" },
    { id: SECTION_IDS.oven, label: "OVEN TEMPS" },
    { id: SECTION_IDS.danger, label: "DANGER ZONE" },
    { id: SECTION_IDS.methods, label: "METHODS" },
    { id: SECTION_IDS.oils, label: "SMOKE POINTS" },
    { id: SECTION_IDS.sugar, label: "SUGAR STAGES" },
    { id: SECTION_IDS.baking, label: "BAKING" },
    { id: SECTION_IDS.beverages, label: "BEVERAGES" },
    { id: SECTION_IDS.funFacts, label: "FUN FACTS" },
    { id: SECTION_IDS.products, label: "GEAR" },
];

/** Tailwind breakpoints (for JS-side checks if needed) */
export const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
} as const;
