/* ═══════════════════════════════════════════
   FUN FACTS
   ═══════════════════════════════════════════ */

export interface FunFact {
    id: string;
    text: string;
}

export const funFacts: FunFact[] = [
    {
        id: "maillard",
        text: "The Maillard reaction begins at ~280°F (138°C), creating the browned crust on bread and meat.",
    },
    {
        id: "pizza-oven",
        text: "A wood-fired pizza oven runs at 800–900°F — 400°F hotter than your home oven.",
    },
    {
        id: "eggs",
        text: "Eggs begin to coagulate at 144°F — just a few degrees determines soft vs. hard scramble.",
    },
    {
        id: "water-boil",
        text: "Water boils at 212°F at sea level, but only 202°F in Denver due to altitude.",
    },
    {
        id: "cast-iron",
        text: "A well-seasoned cast iron skillet can reach 700°F on a home burner — hotter than most ovens go.",
    },
    {
        id: "chocolate",
        text: "Tempering chocolate requires precise control between 82–90°F — a 8° window for perfect snap.",
    },
];
