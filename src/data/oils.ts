/* ═══════════════════════════════════════════
   OIL SMOKE POINTS
   ═══════════════════════════════════════════ */

export interface Oil {
    name: string;
    smokePointF: number;
    bestFor: string;
    flavorProfile: string;
    heatCategory: "high" | "medium" | "low";
}

export const oils: Oil[] = [
    // High Heat
    { name: "Avocado Oil", smokePointF: 520, bestFor: "Searing, stir-fry", flavorProfile: "Neutral, buttery", heatCategory: "high" },
    { name: "Safflower Oil", smokePointF: 510, bestFor: "Deep frying", flavorProfile: "Neutral", heatCategory: "high" },
    { name: "Light Olive Oil", smokePointF: 465, bestFor: "Sautéing, frying", flavorProfile: "Mild", heatCategory: "high" },
    { name: "Soybean Oil", smokePointF: 450, bestFor: "Deep frying, baking", flavorProfile: "Neutral", heatCategory: "high" },
    { name: "Peanut Oil", smokePointF: 450, bestFor: "Deep frying, Asian", flavorProfile: "Mild, nutty", heatCategory: "high" },
    // Medium Heat
    { name: "Canola Oil", smokePointF: 400, bestFor: "General cooking, baking", flavorProfile: "Neutral", heatCategory: "medium" },
    { name: "Grapeseed Oil", smokePointF: 390, bestFor: "Sautéing, dressings", flavorProfile: "Clean, neutral", heatCategory: "medium" },
    { name: "Vegetable Shortening", smokePointF: 360, bestFor: "Baking, frying", flavorProfile: "Neutral", heatCategory: "medium" },
    { name: "Lard", smokePointF: 370, bestFor: "Frying, pastry", flavorProfile: "Savory, rich", heatCategory: "medium" },
    { name: "Coconut Oil (Ref.)", smokePointF: 400, bestFor: "Sautéing, baking", flavorProfile: "Neutral", heatCategory: "medium" },
    { name: "Butter", smokePointF: 350, bestFor: "Sautéing, finishing", flavorProfile: "Rich, creamy", heatCategory: "medium" },
    // Low Heat / No Heat
    { name: "Extra Virgin Olive", smokePointF: 320, bestFor: "Dressings, finishing", flavorProfile: "Fruity, peppery", heatCategory: "low" },
    { name: "Sesame (Toasted)", smokePointF: 350, bestFor: "Finishing, Asian", flavorProfile: "Nutty, intense", heatCategory: "low" },
    { name: "Flaxseed Oil", smokePointF: 225, bestFor: "Dressings only", flavorProfile: "Earthy, nutty", heatCategory: "low" },
    { name: "Walnut Oil", smokePointF: 160, bestFor: "Dressings, drizzle", flavorProfile: "Rich, nutty", heatCategory: "low" },
];
