/* ═══════════════════════════════════════════
   BEVERAGE SERVING TEMPERATURES
   ═══════════════════════════════════════════ */

export interface Beverage {
    name: string;
    category: "coffee" | "beer" | "wine" | "other";
    servingTempF: number;
    note: string;
}

export const beverages: Beverage[] = [
    // Coffee & Tea
    { name: "Espresso", category: "coffee", servingTempF: 160, note: "Extracted at 190–200°F" },
    { name: "Drip Coffee", category: "coffee", servingTempF: 165, note: "Brew at 195–205°F" },
    { name: "Green Tea", category: "coffee", servingTempF: 160, note: "Brew at 170–180°F" },
    { name: "Black Tea", category: "coffee", servingTempF: 175, note: "Brew at 200–212°F" },
    { name: "Herbal Tea", category: "coffee", servingTempF: 175, note: "Brew at 212°F" },
    // Beer
    { name: "Light Lager", category: "beer", servingTempF: 40, note: "Very cold, crisp" },
    { name: "Pilsner", category: "beer", servingTempF: 42, note: "Cold, refreshing" },
    { name: "Pale Ale / IPA", category: "beer", servingTempF: 50, note: "Cool, aromatic" },
    { name: "Stout / Porter", category: "beer", servingTempF: 55, note: "Cellar temp, full body" },
    { name: "Belgian Strong", category: "beer", servingTempF: 55, note: "Cellar temp, complex" },
    // Wine
    { name: "Sparkling Wine", category: "wine", servingTempF: 43, note: "Well chilled" },
    { name: "White Wine", category: "wine", servingTempF: 50, note: "Chilled but not ice cold" },
    { name: "Rosé", category: "wine", servingTempF: 50, note: "Crisp and refreshing" },
    { name: "Light Red", category: "wine", servingTempF: 58, note: "Slightly cool" },
    { name: "Full-bodied Red", category: "wine", servingTempF: 65, note: "Room temp (cellar)" },
    // Other
    { name: "Hot Chocolate", category: "other", servingTempF: 160, note: "Warm and comforting" },
    { name: "Cold Brew", category: "other", servingTempF: 38, note: "Over ice" },
];
