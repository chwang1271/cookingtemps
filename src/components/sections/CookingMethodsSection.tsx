"use client";

import { cookingMethods } from "@/data/cookingMethods";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { showToast } from "@/components/ui/Toast";
import { useClipboard } from "@/hooks/useClipboard";
import { displayTemp } from "@/lib/tempConvert";
import { useTempUnit } from "@/providers/TempUnitProvider";
import { SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/* ── Heat intensity config ─────────────────────────────────────────────── */
const INTENSITY = {
    extreme: { label: "EXTREME", bars: 4, color: "bg-danger", text: "text-danger" },
    high: { label: "HIGH", bars: 3, color: "bg-[#F97316]", text: "text-[#F97316]" },
    medium: { label: "MEDIUM", bars: 2, color: "bg-caution", text: "text-caution" },
    low: { label: "LOW", bars: 1, color: "bg-safe", text: "text-safe" },
} as const;

const SCALE_MAX_F = 575;

/* ── Heat intensity bar (4 segments) ─────────────────────────────────── */
function IntensityBars({ level }: { level: keyof typeof INTENSITY }) {
    const { bars, color } = INTENSITY[level];
    return (
        <div className="flex gap-1" aria-label={`Heat intensity: ${level}`}>
            {[1, 2, 3, 4].map((i) => (
                <div
                    key={i}
                    className={cn(
                        "h-1.5 flex-1 transition-all",
                        i <= bars ? color : "bg-ink/10 dark:bg-paper/15"
                    )}
                />
            ))}
        </div>
    );
}

/* ── Temp range bar ────────────────────────────────────────────────────── */
function TempBar({
    low, high, level,
}: {
    low: number; high: number; level: keyof typeof INTENSITY;
}) {
    const { color } = INTENSITY[level];
    const lowPct = (low / SCALE_MAX_F) * 100;
    const rangePct = ((high - low) / SCALE_MAX_F) * 100;
    return (
        <div className="relative h-1 w-full bg-ink/10 dark:bg-paper/10 overflow-hidden">
            <div
                className={cn("absolute top-0 h-full", color)}
                style={{ left: `${lowPct}%`, width: `${rangePct}%` }}
            />
        </div>
    );
}

/* ── Single method card ────────────────────────────────────────────────── */
function MethodCard({ method }: { method: typeof cookingMethods[0] }) {
    const { unit } = useTempUnit();
    const { copy } = useClipboard();
    const intel = INTENSITY[method.heatIntensity];

    const loDisp = displayTemp(method.tempRangeF[0], unit);
    const hiDisp = displayTemp(method.tempRangeF[1], unit);
    const rangeStr = `${loDisp.value}–${hiDisp.value}${hiDisp.label}`;

    const handleCopy = async () => {
        await copy(rangeStr);
        showToast(`Copied ${method.name}: ${rangeStr}`);
    };

    return (
        <div className="group relative flex flex-col gap-3 border-2 border-ink/20 dark:border-steel/30 bg-surface dark:bg-ink/10 p-5 transition-all hover:border-ink dark:hover:border-steel/60 hover:shadow-hard hover:-translate-y-px">
            {/* Icon + name row */}
            <div className="flex items-center gap-3">
                <span
                    className="material-symbols-outlined text-2xl text-ink dark:text-paper group-hover:text-primary transition-colors select-none shrink-0"
                    aria-hidden="true"
                >
                    {method.iconKey}
                </span>
                <div className="flex-1 min-w-0">
                    <p className="font-display font-bold text-base uppercase tracking-wide text-ink dark:text-paper group-hover:text-primary transition-colors">
                        {method.name}
                    </p>
                    {/* Intensity badge inline */}
                    <span
                        className={cn(
                            "font-mono text-[9px] font-bold px-1.5 py-0.5 inline-block mt-0.5",
                            method.heatIntensity === "extreme" ? "bg-danger text-paper" :
                                method.heatIntensity === "high" ? "bg-[#F97316] text-paper" :
                                    method.heatIntensity === "medium" ? "bg-caution text-ink" :
                                        "bg-safe text-paper"
                        )}
                    >
                        {intel.label}
                    </span>
                </div>
            </div>

            {/* Temp range — large, click to copy */}
            <button
                onClick={handleCopy}
                title={`Copy ${rangeStr}`}
                aria-label={`${method.name} temperature: ${rangeStr}. Click to copy.`}
                className={cn(
                    "font-mono text-xl font-bold tabular-nums cursor-copy text-left",
                    "transition-opacity hover:opacity-70",
                    intel.text
                )}
            >
                {rangeStr}
            </button>

            {/* Scale bar + intensity bars */}
            <div className="space-y-1.5">
                <TempBar low={method.tempRangeF[0]} high={method.tempRangeF[1]} level={method.heatIntensity} />
                <IntensityBars level={method.heatIntensity} />
            </div>

            {/* Tip callout */}
            <div className="flex gap-2 mt-1 border-t border-ink/10 dark:border-steel/20 pt-3">
                <span className="material-symbols-outlined text-base text-steel shrink-0" aria-hidden="true">
                    lightbulb
                </span>
                <p className="font-mono text-[11px] text-steel leading-relaxed">
                    {method.tip}
                </p>
            </div>
        </div>
    );
}

/* ── Main Section ─────────────────────────────────────────────────────── */
export function CookingMethodsSection() {
    const extremeCount = cookingMethods.filter(m => m.heatIntensity === "extreme").length;
    const highCount = cookingMethods.filter(m => m.heatIntensity === "high").length;
    const mediumCount = cookingMethods.filter(m => m.heatIntensity === "medium").length;
    const lowCount = cookingMethods.filter(m => m.heatIntensity === "low").length;

    return (
        <section
            id={SECTION_IDS.methods}
            className="scroll-mt-24 max-w-5xl mx-auto px-4 md:px-8 py-12"
            aria-labelledby="methods-heading"
        >
            <SectionHeader
                title="Cooking Methods"
                refCode="REF-003"
                aside={
                    <Badge variant="default">TEMP RANGES</Badge>
                }
            />

            <p className="font-mono text-base text-steel mb-6 max-w-2xl leading-relaxed">
                Each method operates within a specific temperature range. Click any range to copy. Intensity bars
                show heat level relative to cooking extremes.
            </p>

            {/* Heat intensity legend */}
            <div className="flex flex-wrap gap-4 mb-6 font-mono text-[10px]">
                {(["extreme", "high", "medium", "low"] as const).map((lvl) => {
                    const { label, color, text } = INTENSITY[lvl];
                    const count = { extreme: extremeCount, high: highCount, medium: mediumCount, low: lowCount }[lvl];
                    return (
                        <div key={lvl} className="flex items-center gap-1.5">
                            <div className={cn("w-3 h-3", color)} aria-hidden="true" />
                            <span className={cn("font-bold", text)}>{label}</span>
                            <span className="text-steel">({count})</span>
                        </div>
                    );
                })}
            </div>

            {/* Methods grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cookingMethods.map((method) => (
                    <MethodCard key={method.name} method={method} />
                ))}
            </div>
        </section>
    );
}
