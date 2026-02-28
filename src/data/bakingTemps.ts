/* ═══════════════════════════════════════════
   BAKING & BREAD INTERNAL TEMPERATURES
   ═══════════════════════════════════════════ */

export interface BakingItem {
    name: string;
    category: "bread" | "pastry";
    internalTempF: number;
    cue: string;
}

export const bakingTemps: BakingItem[] = [
    // Breads
    { name: "Yeast Bread", category: "bread", internalTempF: 200, cue: "Hollow sound when tapped" },
    { name: "Sourdough", category: "bread", internalTempF: 210, cue: "Deep crust, hollow thump" },
    { name: "Quick Bread", category: "bread", internalTempF: 200, cue: "Toothpick comes out clean" },
    { name: "Dinner Rolls", category: "bread", internalTempF: 190, cue: "Golden top, cooked through" },
    { name: "Enriched Bread", category: "bread", internalTempF: 190, cue: "Rich golden crust" },
    // Pastries
    { name: "Cake", category: "pastry", internalTempF: 210, cue: "Springs back when pressed" },
    { name: "Cheesecake", category: "pastry", internalTempF: 150, cue: "Center barely jiggles" },
    { name: "Custard / Flan", category: "pastry", internalTempF: 170, cue: "Set at edges, slight wobble center" },
    { name: "Brownies", category: "pastry", internalTempF: 195, cue: "Moist crumbs on toothpick" },
    { name: "Cookies", category: "pastry", internalTempF: 185, cue: "Edges set, center soft" },
];
