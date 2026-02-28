"use client";

import { useState, useCallback } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { showToast } from "@/components/ui/Toast";
import { useClipboard } from "@/hooks/useClipboard";
import { fToC, fToK, cToF, kToF } from "@/lib/tempConvert";
import { cn } from "@/lib/utils";
import { SECTION_IDS } from "@/lib/constants";

/* ── Preset chips per UI spec ─────────────────────────────────────────── */
const PRESETS: { label: string; fahrenheit: number }[] = [
    { label: "32°F Freezing", fahrenheit: 32 },
    { label: "165°F Chicken", fahrenheit: 165 },
    { label: "145°F Pork", fahrenheit: 145 },
    { label: "212°F Boiling", fahrenheit: 212 },
    { label: "325°F Roast", fahrenheit: 325 },
    { label: "375°F Bake", fahrenheit: 375 },
    { label: "450°F High Heat", fahrenheit: 450 },
    { label: "500°F Pizza", fahrenheit: 500 },
];

/* ── Thermometer range ────────────────────────────────────────────────── */
const THERMO_MIN_F = -40;
const THERMO_MAX_F = 550;

function clampFraction(f: number, min: number, max: number) {
    return Math.max(0, Math.min(1, (f - min) / (max - min)));
}

/** Maps °F to a colour on a blue → orange → red scale */
function tempToColor(f: number): string {
    const t = clampFraction(f, THERMO_MIN_F, THERMO_MAX_F);
    if (t < 0.15) return "#3B82F6";       // cold: blue
    if (t < 0.35) return "#22C55E";       // safe: green
    if (t < 0.55) return "#F59E0B";       // warm: amber
    if (t < 0.75) return "#F97316";       // hot: orange
    return "#ec3e13";                      // danger/extreme: primary red
}

/* ── Mini Thermometer SVG ─────────────────────────────────────────────── */
function MiniThermometer({ fahrenheit }: { fahrenheit: number }) {
    const fraction = clampFraction(fahrenheit, THERMO_MIN_F, THERMO_MAX_F);
    const fillHeight = fraction * 120; // 120px total bar height
    const color = tempToColor(fahrenheit);

    return (
        <svg
            width="40"
            height="160"
            viewBox="0 0 40 160"
            aria-label={`Thermometer showing ${Math.round(fahrenheit)}°F`}
            role="img"
        >
            {/* Bulb */}
            <circle cx="20" cy="145" r="14" fill={color} />
            {/* Tube background */}
            <rect x="15" y="15" width="10" height="125" rx="5" fill="#e5e7eb" />
            {/* Fill */}
            <rect
                x="15"
                y={140 - fillHeight}
                width="10"
                height={fillHeight}
                rx="5"
                fill={color}
                style={{ transition: "all 0.3s ease" }}
            />
            {/* Tick marks */}
            {[0.25, 0.5, 0.75].map((frac) => (
                <line
                    key={frac}
                    x1="25"
                    y1={140 - frac * 120}
                    x2="32"
                    y2={140 - frac * 120}
                    stroke="#9ca3af"
                    strokeWidth="1"
                />
            ))}
        </svg>
    );
}

/* ── Large converter input ────────────────────────────────────────────── */
interface ConverterInputProps {
    label: string;
    unit: string;
    value: string;
    onChange: (val: string) => void;
    onCopy: () => void;
}

function ConverterInput({ label, unit, value, onChange, onCopy }: ConverterInputProps) {
    return (
        <div className="flex flex-col gap-2">
            <label className="font-display text-[10px] tracking-widest text-steel uppercase font-bold">
                {label}
            </label>
            <div className="relative group">
                <input
                    type="number"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    aria-label={label}
                    className={cn(
                        "w-full h-20 bg-surface dark:bg-ink/20 text-ink dark:text-paper",
                        "border-2 border-ink dark:border-steel/40",
                        "focus:border-primary focus:outline-none",
                        "text-4xl font-mono px-4",
                        "shadow-hard-sm dark:shadow-none",
                        /* Remove native number spinners */
                        "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    )}
                />
                {/* Copy button */}
                <button
                    onClick={onCopy}
                    aria-label={`Copy ${value}${unit}`}
                    title={`Copy ${value}${unit}`}
                    className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity font-mono text-xs bg-ink dark:bg-paper text-paper dark:text-ink px-2 py-1"
                >
                    COPY
                </button>
            </div>
            <span className="font-mono text-xs text-steel">{unit}</span>
        </div>
    );
}

/* ── Preset chip ──────────────────────────────────────────────────────── */
interface PresetChipProps {
    label: string;
    active: boolean;
    onClick: () => void;
}

function PresetChip({ label, active, onClick }: PresetChipProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "px-3 py-1.5 font-mono text-xs border-2 transition-all whitespace-nowrap",
                "hover:bg-highlight hover:text-ink hover:border-ink",
                active
                    ? "bg-primary text-paper border-primary shadow-hard-sm"
                    : "bg-surface dark:bg-bg-dark text-ink dark:text-paper border-ink/30 dark:border-steel/40"
            )}
        >
            {label}
        </button>
    );
}

/* ── Conversion formula display ───────────────────────────────────────── */
function FormulaRow({ from }: { from: "F" | "C" | "K" }) {
    const formulas: Record<"F" | "C" | "K", string[]> = {
        F: ["°C = (°F − 32) × 5/9", "K = (°F − 32) × 5/9 + 273.15"],
        C: ["°F = °C × 9/5 + 32", "K = °C + 273.15"],
        K: ["°F = (K − 273.15) × 9/5 + 32", "°C = K − 273.15"],
    };
    return (
        <div className="mt-4 p-3 border border-paper/20 dark:border-steel/20 bg-paper/10 dark:bg-paper/5">
            <p className="font-mono text-[10px] text-paper/50 dark:text-steel uppercase tracking-widest mb-2">
                Formula — editing {from === "F" ? "°F" : from === "C" ? "°C" : "K"}
            </p>
            {formulas[from].map((f) => (
                <p key={f} className="font-mono text-sm text-paper dark:text-paper leading-relaxed">
                    {f}
                </p>
            ))}
        </div>
    );
}

/* ── Main Component ───────────────────────────────────────────────────── */
type ActiveField = "F" | "C" | "K";

export function ConverterSection() {
    // Store raw string values to allow partial input like "-" or "."
    const [fVal, setFVal] = useState("165");
    const [cVal, setCVal] = useState(() => String(fToC(165)));
    const [kVal, setKVal] = useState(() => String(fToK(165)));
    const [activeField, setActiveField] = useState<ActiveField>("F");
    const [activePreset, setActivePreset] = useState<number | null>(165);

    const { copy } = useClipboard();

    /* ── Sync helpers ── */
    const syncFromF = useCallback((raw: string) => {
        setFVal(raw);
        setActiveField("F");
        setActivePreset(null);
        const n = parseFloat(raw);
        if (!isNaN(n)) {
            setCVal(String(fToC(n)));
            setKVal(String(fToK(n)));
        }
    }, []);

    const syncFromC = useCallback((raw: string) => {
        setCVal(raw);
        setActiveField("C");
        setActivePreset(null);
        const n = parseFloat(raw);
        if (!isNaN(n)) {
            const f = cToF(n);
            setFVal(String(f));
            setKVal(String(fToK(f)));
        }
    }, []);

    const syncFromK = useCallback((raw: string) => {
        setKVal(raw);
        setActiveField("K");
        setActivePreset(null);
        const n = parseFloat(raw);
        if (!isNaN(n)) {
            const f = kToF(n);
            setFVal(String(f));
            setCVal(String(fToC(f)));
        }
    }, []);

    const applyPreset = (fahrenheit: number) => {
        setActivePreset(fahrenheit);
        setFVal(String(fahrenheit));
        setCVal(String(fToC(fahrenheit)));
        setKVal(String(fToK(fahrenheit)));
        setActiveField("F");
    };

    const fNum = parseFloat(fVal);

    const handleCopy = async (val: string, unit: string) => {
        await copy(`${val}${unit}`);
        showToast(`Copied ${val}${unit}!`);
    };

    return (
        <section
            id={SECTION_IDS.converter}
            className="scroll-mt-24 px-4 md:px-8 py-12 max-w-5xl mx-auto"
            aria-labelledby="converter-heading"
        >
            <SectionHeader title="Rapid Converter" refCode="TOOL-01" />

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-start">
                {/* ── Left: inputs + presets ── */}
                <div>
                    {/* Three inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <ConverterInput
                            label="Fahrenheit (°F)"
                            unit="°F"
                            value={fVal}
                            onChange={syncFromF}
                            onCopy={() => handleCopy(fVal, "°F")}
                        />
                        <ConverterInput
                            label="Celsius (°C)"
                            unit="°C"
                            value={cVal}
                            onChange={syncFromC}
                            onCopy={() => handleCopy(cVal, "°C")}
                        />
                        <ConverterInput
                            label="Kelvin (K)"
                            unit="K"
                            value={kVal}
                            onChange={syncFromK}
                            onCopy={() => handleCopy(kVal, "K")}
                        />
                    </div>

                    {/* Preset chips */}
                    <div className="mb-2">
                        <p className="font-mono text-[10px] text-steel uppercase tracking-widest mb-3">
                            Quick Presets
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {PRESETS.map((p) => (
                                <PresetChip
                                    key={p.fahrenheit}
                                    label={p.label}
                                    active={activePreset === p.fahrenheit}
                                    onClick={() => applyPreset(p.fahrenheit)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Formula */}
                    <FormulaRow from={activeField} />
                </div>

                {/* ── Right: mini thermometer ── */}
                <div className="hidden lg:flex flex-col items-center gap-3 pt-4">
                    <span className="font-mono text-[10px] text-steel uppercase tracking-widest">
                        Scale
                    </span>
                    {!isNaN(fNum) && <MiniThermometer fahrenheit={fNum} />}
                    <div className="font-mono text-xs text-center space-y-1">
                        <div className="text-steel">550°F max</div>
                        <div
                            className="font-bold"
                            style={{ color: !isNaN(fNum) ? tempToColor(fNum) : "inherit" }}
                        >
                            {!isNaN(fNum) ? `${Math.round(fNum)}°F` : "—"}
                        </div>
                        <div className="text-steel">−40°F min</div>
                    </div>
                </div>
            </div>

            {/* ARIA live region for converter output */}
            <div aria-live="polite" className="sr-only">
                {!isNaN(fNum) &&
                    `${Math.round(fNum)} degrees Fahrenheit equals ${fToC(fNum)} Celsius and ${fToK(fNum)} Kelvin`}
            </div>
        </section>
    );
}
