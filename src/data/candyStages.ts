/* ═══════════════════════════════════════════
   CANDY / SUGAR TEMPERATURE STAGES
   ═══════════════════════════════════════════ */

export interface CandyStage {
    name: string;
    tempRangeF: [number, number];
    texture: string;
    usedFor: string;
}

export const candyStages: CandyStage[] = [
    { name: "Thread", tempRangeF: [230, 235], texture: "Thin, liquid threads", usedFor: "Syrups, glazes" },
    { name: "Soft Ball", tempRangeF: [235, 240], texture: "Soft, pliable ball", usedFor: "Fudge, fondant, pralines" },
    { name: "Firm Ball", tempRangeF: [245, 250], texture: "Firm but flexible ball", usedFor: "Caramels, marshmallows" },
    { name: "Hard Ball", tempRangeF: [250, 265], texture: "Rigid, dense ball", usedFor: "Nougat, gummies, rock candy" },
    { name: "Soft Crack", tempRangeF: [270, 290], texture: "Flexible, bends then snaps", usedFor: "Taffy, butterscotch" },
    { name: "Hard Crack", tempRangeF: [300, 310], texture: "Brittle, snaps clean", usedFor: "Lollipops, toffee, brittle" },
    { name: "Caramel", tempRangeF: [320, 350], texture: "Amber liquid, bittersweet", usedFor: "Caramel sauce, praline, croquembouche" },
];
