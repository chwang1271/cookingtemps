import type { TempUnit } from "@/providers/TempUnitProvider";

/** Convert Fahrenheit to Celsius. */
export function fToC(f: number): number {
    return Math.round(((f - 32) * 5) / 9);
}

/** Convert Fahrenheit to Kelvin. */
export function fToK(f: number): number {
    return Math.round(((f - 32) * 5) / 9 + 273.15);
}

/** Convert Celsius to Fahrenheit. */
export function cToF(c: number): number {
    return Math.round((c * 9) / 5 + 32);
}

/** Convert Celsius to Kelvin. */
export function cToK(c: number): number {
    return Math.round(c + 273.15);
}

/** Convert Kelvin to Fahrenheit. */
export function kToF(k: number): number {
    return Math.round(((k - 273.15) * 9) / 5 + 32);
}

/** Convert Kelvin to Celsius. */
export function kToC(k: number): number {
    return Math.round(k - 273.15);
}

/**
 * Format a temperature stored in °F to the requested display unit.
 * Returns the numeric value and unit suffix string.
 */
export function displayTemp(
    fahrenheit: number,
    unit: TempUnit
): { value: number; label: string } {
    switch (unit) {
        case "C":
            return { value: fToC(fahrenheit), label: "°C" };
        case "K":
            return { value: fToK(fahrenheit), label: "K" };
        case "F":
        default:
            return { value: fahrenheit, label: "°F" };
    }
}

/** Convenience: returns formatted string like "165°F" */
export function formatTemp(fahrenheit: number, unit: TempUnit): string {
    const { value, label } = displayTemp(fahrenheit, unit);
    return `${value}${label}`;
}
