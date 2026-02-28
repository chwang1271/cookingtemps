/* ═══════════════════════════════════════════
   COOKING METHODS & TEMPERATURE RANGES
   ═══════════════════════════════════════════ */

export interface CookingMethod {
    name: string;
    tempRangeF: [number, number];
    tip: string;
    iconKey: string; // lucide icon name or material symbol
    heatIntensity: "low" | "medium" | "high" | "extreme";
}

export const cookingMethods: CookingMethod[] = [
    { name: "Searing", tempRangeF: [400, 500], tip: "Use a screaming-hot pan, don't crowd it", iconKey: "local_fire_department", heatIntensity: "extreme" },
    { name: "Grilling", tempRangeF: [350, 550], tip: "Direct heat for thin cuts, indirect for thick", iconKey: "outdoor_grill", heatIntensity: "extreme" },
    { name: "Roasting", tempRangeF: [300, 450], tip: "Let meat rest 10 min after removing", iconKey: "oven", heatIntensity: "high" },
    { name: "Deep Frying", tempRangeF: [325, 375], tip: "Monitor oil temp constantly, avoid overcrowding", iconKey: "skillet", heatIntensity: "high" },
    { name: "Air Frying", tempRangeF: [325, 400], tip: "Shake basket halfway for even browning", iconKey: "air", heatIntensity: "high" },
    { name: "Smoking", tempRangeF: [200, 275], tip: "Low and slow — patience is the key", iconKey: "local_fire_department", heatIntensity: "medium" },
    { name: "Braising", tempRangeF: [275, 325], tip: "Sear first, then cook covered in liquid", iconKey: "soup_kitchen", heatIntensity: "medium" },
    { name: "Steaming", tempRangeF: [212, 212], tip: "Keep water at a steady boil, don't lift lid", iconKey: "water_drop", heatIntensity: "medium" },
    { name: "Sous Vide", tempRangeF: [120, 185], tip: "Precision counts — ±1°F makes a difference", iconKey: "thermostat", heatIntensity: "low" },
];
