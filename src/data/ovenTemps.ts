/* ═══════════════════════════════════════════
   OVEN TEMPERATURE GUIDE
   ═══════════════════════════════════════════ */

export interface OvenRange {
    label: string;
    tempRangeF: [number, number];
    gasMark: string;
    dishes: string;
}

export const ovenTemps: OvenRange[] = [
    { label: "Very Low", tempRangeF: [200, 250], gasMark: "½–1", dishes: "Meringues, drying herbs" },
    { label: "Low", tempRangeF: [250, 300], gasMark: "1–2", dishes: "Slow roasts, casseroles" },
    { label: "Moderate", tempRangeF: [325, 375], gasMark: "3–5", dishes: "Cakes, cookies, roasted vegetables" },
    { label: "Hot", tempRangeF: [400, 425], gasMark: "6–7", dishes: "Bread, pizza dough, roasted chicken" },
    { label: "Very Hot", tempRangeF: [450, 500], gasMark: "8–9", dishes: "Pizza, quick-sear roasts, broiling" },
    { label: "Broil", tempRangeF: [500, 550], gasMark: "10", dishes: "Broiling, charring, finishing" },
];
