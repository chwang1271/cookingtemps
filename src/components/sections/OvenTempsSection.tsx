"use client";

import { ovenTemps } from "@/data/ovenTemps";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { showToast } from "@/components/ui/Toast";
import { useClipboard } from "@/hooks/useClipboard";
import { displayTemp } from "@/lib/tempConvert";
import { useTempUnit } from "@/providers/TempUnitProvider";
import { SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/* ── Heat intensity colours per range ─────────────────────────────────── */
const RANGE_STYLES: Record<string, { bg: string; border: string; text: string; bar: string }> = {
    "Very Low": { bg: "bg-[#3B82F6]/10", border: "border-[#3B82F6]", text: "text-[#3B82F6]", bar: "bg-[#3B82F6]" },
    "Low": { bg: "bg-[#22C55E]/10", border: "border-[#22C55E]", text: "text-[#22C55E]", bar: "bg-[#22C55E]" },
    "Moderate": { bg: "bg-[#F59E0B]/10", border: "border-[#F59E0B]", text: "text-[#F59E0B]", bar: "bg-[#F59E0B]" },
    "Hot": { bg: "bg-[#F97316]/10", border: "border-[#F97316]", text: "text-[#F97316]", bar: "bg-[#F97316]" },
    "Very Hot": { bg: "bg-danger/10", border: "border-danger", text: "text-danger", bar: "bg-danger" },
    "Broil": { bg: "bg-danger/20", border: "border-danger", text: "text-danger", bar: "bg-danger" },
};

const SCALE_MAX_F = 575;

/* ── Gradient temp bar ────────────────────────────────────────────────── */
function TempRangeBar({ low, high, barColor }: { low: number; high: number; barColor: string }) {
    const lowPct = (low / SCALE_MAX_F) * 100;
    const widthPct = ((high - low) / SCALE_MAX_F) * 100;
    return (
        <div className="relative h-1.5 w-full bg-ink/10 dark:bg-paper/10 overflow-hidden rounded-none">
            <div
                className={cn("absolute top-0 h-full", barColor)}
                style={{ left: `${lowPct}%`, width: `${widthPct}%` }}
            />
        </div>
    );
}

/* ── Oven card ────────────────────────────────────────────────────────── */
function OvenCard({ range, index }: { range: typeof ovenTemps[0]; index: number }) {
    const { unit } = useTempUnit();
    const { copy } = useClipboard();
    const styles = RANGE_STYLES[range.label] ?? RANGE_STYLES["Moderate"];

    const loDisp = displayTemp(range.tempRangeF[0], unit);
    const hiDisp = displayTemp(range.tempRangeF[1], unit);
    const rangeStr = `${loDisp.value}–${hiDisp.value}${hiDisp.label}`;

    const handleCopy = async () => {
        await copy(rangeStr);
        showToast(`Copied ${range.label}: ${rangeStr}`);
    };

    return (
        <div
            className={cn(
                "group relative border-2 p-5 flex flex-col gap-3 transition-all",
                "hover:shadow-hard hover:-translate-y-px",
                styles.bg,
                styles.border,
                // Stagger entrance delay via inline style below
            )}
            style={{ animationDelay: `${index * 60}ms` }}
        >
            {/* Gas mark badge — top-right */}
            <div className="absolute top-3 right-3">
                <span className="font-mono text-[9px] text-steel">GAS {range.gasMark}</span>
            </div>

            {/* Label */}
            <div>
                <p className={cn("font-display font-bold text-xs uppercase tracking-widest mb-1", styles.text)}>
                    {range.label}
                </p>

                {/* Temp range — large + click-to-copy */}
                <button
                    onClick={handleCopy}
                    title={`Copy ${rangeStr}`}
                    aria-label={`${range.label}: ${rangeStr}. Click to copy.`}
                    className={cn(
                        "font-mono text-2xl font-bold tabular-nums cursor-copy transition-opacity hover:opacity-70",
                        styles.text
                    )}
                >
                    {rangeStr}
                </button>
            </div>

            {/* Gradient bar */}
            <TempRangeBar low={range.tempRangeF[0]} high={range.tempRangeF[1]} barColor={styles.bar} />

            {/* Common dishes */}
            <p className="font-mono text-[11px] text-steel leading-relaxed">
                {range.dishes}
            </p>
        </div>
    );
}

/* ── Gradient oven dial SVG ──────────────────────────────────────────── */
function OvenDial() {
    // Semicircle arc from 200°F (7 o'clock) to 550°F (5 o'clock)
    // Simple decorative element
    return (
        <svg
            viewBox="0 0 120 70"
            className="w-full max-w-xs mx-auto mb-4 opacity-60"
            aria-hidden="true"
        >
            {/* Background arc */}
            <path
                d="M10,65 A55,55 0 0,1 110,65"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
                strokeLinecap="round"
            />
            {/* Gradient fill arc segments */}
            {[
                { offset: "0%", color: "#3B82F6" },
                { offset: "25%", color: "#22C55E" },
                { offset: "50%", color: "#F59E0B" },
                { offset: "75%", color: "#F97316" },
                { offset: "100%", color: "#ec3e13" },
            ].map((stop, i, arr) => {
                if (i === arr.length - 1) return null;
                // Draw arc segment
                return null; // simplified — gradient defs below
            })}
            {/* Gradient stroke */}
            <defs>
                <linearGradient id="dial-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="30%" stopColor="#22C55E" />
                    <stop offset="55%" stopColor="#F59E0B" />
                    <stop offset="75%" stopColor="#F97316" />
                    <stop offset="100%" stopColor="#ec3e13" />
                </linearGradient>
            </defs>
            <path
                d="M10,65 A55,55 0 0,1 110,65"
                fill="none"
                stroke="url(#dial-grad)"
                strokeWidth="8"
                strokeLinecap="round"
            />
            {/* Labels */}
            <text x="4" y="62" fontSize="7" fontFamily="monospace" fill="#9ca3af">200°</text>
            <text x="90" y="62" fontSize="7" fontFamily="monospace" fill="#9ca3af">550°</text>
            <text x="48" y="20" fontSize="7" fontFamily="monospace" fill="#9ca3af">375°</text>
        </svg>
    );
}

/* ── Main Section ─────────────────────────────────────────────────────── */
export function OvenTempsSection() {
    return (
        <section
            id={SECTION_IDS.oven}
            className="scroll-mt-24 max-w-5xl mx-auto px-4 md:px-8 py-12"
            aria-labelledby="oven-heading"
        >
            <SectionHeader
                title="Oven Temperatures"
                refCode="REF-002"
                aside={
                    <Badge variant="default">GAS MARK INCL.</Badge>
                }
            />

            <p className="font-mono text-base text-steel mb-6 max-w-2xl leading-relaxed">
                Fan / convection ovens run ~25°F (14°C) hotter — reduce the listed temp or shorten cook time.
                Always preheat at least 15 minutes. Click any range to copy it.
            </p>

            {/* Decorative dial */}
            <OvenDial />

            {/* Cards grid */}
            <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                role="list"
                aria-label="Oven temperature ranges"
            >
                {ovenTemps.map((range, i) => (
                    <div key={range.label} role="listitem">
                        <OvenCard range={range} index={i} />
                    </div>
                ))}
            </div>

            {/* Conversion tip row */}
            <div className="mt-6 flex flex-wrap gap-4 border-t border-ink/10 dark:border-steel/20 pt-4">
                <div className="font-mono text-[10px] text-steel">
                    <span className="text-ink dark:text-paper font-bold">°C = </span>(°F − 32) × 5/9
                </div>
                <div className="font-mono text-[10px] text-steel">
                    <span className="text-ink dark:text-paper font-bold">Fan ovens: </span>−25°F / −15°C from listed temp
                </div>
                <div className="font-mono text-[10px] text-steel">
                    <span className="text-ink dark:text-paper font-bold">Gas Mark 1 </span>= 275°F / 140°C
                </div>
            </div>
        </section>
    );
}
