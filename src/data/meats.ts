/* ═══════════════════════════════════════════
   MEAT & POULTRY DATA
   All temps in °F (canonical). Converted at render time.
   ═══════════════════════════════════════════ */

export interface MeatCut {
    id: string;
    category: "beef" | "pork" | "poultry" | "lamb" | "fish" | "game";
    name: string;
    temps: {
        rare?: number;
        mediumRare?: number;
        medium?: number;
        wellDone?: number;
        usdaSafe: number;
    };
}

export const meats: MeatCut[] = [
    // ── Beef ──
    { id: "beef-steak", category: "beef", name: "Beef (Steak)", temps: { rare: 125, mediumRare: 135, medium: 145, wellDone: 160, usdaSafe: 145 } },
    { id: "beef-ground", category: "beef", name: "Beef (Ground)", temps: { medium: 160, wellDone: 170, usdaSafe: 160 } },
    { id: "beef-roast", category: "beef", name: "Beef (Roast)", temps: { rare: 125, mediumRare: 135, medium: 145, wellDone: 160, usdaSafe: 145 } },
    // ── Pork ──
    { id: "pork-chops", category: "pork", name: "Pork (Chops)", temps: { mediumRare: 145, medium: 150, wellDone: 160, usdaSafe: 145 } },
    { id: "pork-ground", category: "pork", name: "Pork (Ground)", temps: { medium: 160, usdaSafe: 160 } },
    { id: "pork-tender", category: "pork", name: "Pork (Tenderloin)", temps: { mediumRare: 145, medium: 150, wellDone: 160, usdaSafe: 145 } },
    // ── Poultry ──
    { id: "chicken-breast", category: "poultry", name: "Chicken (Breast)", temps: { usdaSafe: 165 } },
    { id: "chicken-thigh", category: "poultry", name: "Chicken (Thigh)", temps: { usdaSafe: 165 } },
    { id: "turkey-breast", category: "poultry", name: "Turkey (Breast)", temps: { usdaSafe: 165 } },
    { id: "turkey-ground", category: "poultry", name: "Turkey (Ground)", temps: { usdaSafe: 165 } },
    { id: "duck-breast", category: "poultry", name: "Duck (Breast)", temps: { mediumRare: 135, medium: 145, usdaSafe: 165 } },
    // ── Lamb ──
    { id: "lamb-chops", category: "lamb", name: "Lamb (Chops)", temps: { rare: 125, mediumRare: 130, medium: 140, wellDone: 155, usdaSafe: 145 } },
    { id: "lamb-leg", category: "lamb", name: "Lamb (Leg Roast)", temps: { rare: 125, mediumRare: 130, medium: 140, wellDone: 155, usdaSafe: 145 } },
    { id: "lamb-ground", category: "lamb", name: "Lamb (Ground)", temps: { medium: 160, usdaSafe: 160 } },
    // ── Fish ──
    { id: "fish-fin", category: "fish", name: "Fish (Fin Fish)", temps: { mediumRare: 125, medium: 135, usdaSafe: 145 } },
    { id: "fish-shrimp", category: "fish", name: "Shrimp / Lobster", temps: { usdaSafe: 145 } },
    { id: "fish-salmon", category: "fish", name: "Salmon", temps: { mediumRare: 120, medium: 130, usdaSafe: 145 } },
    // ── Game ──
    { id: "venison", category: "game", name: "Venison (Steak)", temps: { rare: 125, mediumRare: 135, medium: 145, usdaSafe: 160 } },
    { id: "bison", category: "game", name: "Bison (Steak)", temps: { rare: 125, mediumRare: 135, medium: 145, usdaSafe: 160 } },
];

/** Unique categories in display order */
export const meatCategories = ["beef", "pork", "poultry", "lamb", "fish", "game"] as const;
