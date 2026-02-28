"use client";

import { useEffect, useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { useTempUnit } from "@/providers/TempUnitProvider";
import { displayTemp } from "@/lib/tempConvert";
import { SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { AlertTriangle, Clock, Thermometer, ShieldAlert } from "lucide-react";

/* ── Constants ───────────────────────────────────────────────────────────── */
const DANGER_ZONE_LOW_F = 40;
const DANGER_ZONE_HIGH_F = 140;

/* ── Food safety rules ───────────────────────────────────────────────────── */
const SAFETY_RULES = [
    {
        icon: Clock,
        title: "2-Hour Rule",
        body: "Never leave perishable food in the Danger Zone for more than 2 hours total — or 1 hour if ambient temperature exceeds 90°F (32°C).",
    },
    {
        icon: Thermometer,
        title: "Heat It Right",
        body: "When reheating leftovers, bring food to an internal temperature of 165°F (74°C) throughout — not just on the surface.",
    },
    {
        icon: ShieldAlert,
        title: "Thaw Safely",
        body: "Never thaw food at room temperature. Use the refrigerator, cold running water, or the microwave. Thawing on the counter sits squarely in the Danger Zone.",
    },
    {
        icon: AlertTriangle,
        title: "Don't Double-Dip",
        body: "Bacteria multiply rapidly between 40°F–140°F, doubling every 20 minutes. A 4-hour window can push benign food to dangerous levels.",
    },
];

/* ── Animated Danger Range Bar ───────────────────────────────────────────── */
const SCALE_MIN_F = 0;
const SCALE_MAX_F = 220;

function DangerRangeBar({ unit }: { unit: ReturnType<typeof useTempUnit>["unit"] }) {
    const [pulse, setPulse] = useState(false);

    useEffect(() => {
        const id = setInterval(() => setPulse((v) => !v), 1000);
        return () => clearInterval(id);
    }, []);

    const toPercent = (f: number) =>
        ((f - SCALE_MIN_F) / (SCALE_MAX_F - SCALE_MIN_F)) * 100;

    const lowPct = toPercent(DANGER_ZONE_LOW_F);
    const highPct = toPercent(DANGER_ZONE_HIGH_F);
    const widthPct = highPct - lowPct;

    const fmt = (f: number) => {
        const { value, label } = displayTemp(f, unit);
        return `${value}${label}`;
    };

    return (
        <div className="my-8">
            {/* Bar + labels */}
            <div className="relative h-14 rounded-none w-full">
                {/* Background bar — full scale */}
                <div className="absolute inset-0 bg-ink/10 dark:bg-paper/10" />

                {/* Cold zone */}
                <div
                    className="absolute top-0 bottom-0 left-0 bg-[#3B82F6]/40"
                    style={{ width: `${lowPct}%` }}
                />

                {/* Danger zone — animated diagonal hatch */}
                <div
                    className="absolute top-0 bottom-0 overflow-hidden"
                    style={{ left: `${lowPct}%`, width: `${widthPct}%` }}
                    aria-label={`Danger Zone: ${fmt(DANGER_ZONE_LOW_F)} to ${fmt(DANGER_ZONE_HIGH_F)}`}
                    role="img"
                >
                    {/* Solid danger colour underlay */}
                    <div className="absolute inset-0 bg-danger/70" />
                    {/* SVG hatch pattern overlay */}
                    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern
                                id="danger-hatch"
                                patternUnits="userSpaceOnUse"
                                width="12"
                                height="12"
                                patternTransform="rotate(45)"
                            >
                                <line x1="0" y1="0" x2="0" y2="12" stroke="#181211" strokeWidth="4" strokeOpacity="0.3" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#danger-hatch)" />
                    </svg>

                    {/* Pulse border on left/right edges */}
                    <div
                        className={cn(
                            "absolute inset-y-0 left-0 w-1 bg-danger transition-opacity duration-500",
                            pulse ? "opacity-100" : "opacity-40"
                        )}
                        aria-hidden="true"
                    />
                    <div
                        className={cn(
                            "absolute inset-y-0 right-0 w-1 bg-danger transition-opacity duration-500",
                            pulse ? "opacity-40" : "opacity-100"
                        )}
                        aria-hidden="true"
                    />

                    {/* "DANGER ZONE" label */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className={cn(
                            "font-display font-bold text-xs md:text-sm tracking-widest text-paper uppercase select-none transition-opacity duration-500",
                            pulse ? "opacity-100" : "opacity-70"
                        )}>
                            ⚠ DANGER ZONE ⚠
                        </span>
                    </div>
                </div>

                {/* Hot zone */}
                <div
                    className="absolute top-0 bottom-0 right-0 bg-[#F97316]/40"
                    style={{ width: `${100 - highPct}%` }}
                />
            </div>

            {/* Axis labels */}
            <div className="relative flex text-[10px] font-mono text-steel mt-2 h-4">
                {/* Low end */}
                <div
                    className="absolute flex flex-col items-center gap-0.5"
                    style={{ left: `${lowPct}%`, transform: "translateX(-50%)" }}
                >
                    <div className="w-px h-2 bg-danger mx-auto" />
                    <span className="text-danger font-bold">{fmt(DANGER_ZONE_LOW_F)}</span>
                </div>
                {/* High end */}
                <div
                    className="absolute flex flex-col items-center gap-0.5"
                    style={{ left: `${highPct}%`, transform: "translateX(-50%)" }}
                >
                    <div className="w-px h-2 bg-danger mx-auto" />
                    <span className="text-danger font-bold">{fmt(DANGER_ZONE_HIGH_F)}</span>
                </div>
                {/* Scale extremes */}
                <span className="absolute left-0">{fmt(SCALE_MIN_F)}</span>
                <span className="absolute right-0">{fmt(SCALE_MAX_F)}</span>
            </div>
        </div>
    );
}

/* ── Zone Cards ─────────────────────────────────────────────────────────── */
interface ZoneCardProps {
    label: string;
    tempF: number;
    variant: "cold" | "safe" | "danger" | "hot";
}

function ZoneCard({ label, tempF, variant }: ZoneCardProps) {
    const { unit } = useTempUnit();
    const { value, label: unitLabel } = displayTemp(tempF, unit);

    const styles: Record<ZoneCardProps["variant"], string> = {
        cold: "border-[#3B82F6] bg-[#3B82F6]/10",
        safe: "border-safe    bg-safe/10",
        danger: "border-danger  bg-danger/10",
        hot: "border-[#F97316] bg-[#F97316]/10",
    };

    const textStyles: Record<ZoneCardProps["variant"], string> = {
        cold: "text-[#3B82F6]",
        safe: "text-safe",
        danger: "text-danger",
        hot: "text-[#F97316]",
    };

    return (
        <div className={cn("border-2 p-4 flex flex-col gap-1", styles[variant])}>
            <span className={cn("font-mono text-3xl font-bold tabular-nums", textStyles[variant])}>
                {value}{unitLabel}
            </span>
            <span className="font-display text-xs font-bold uppercase tracking-wider text-ink dark:text-paper">
                {label}
            </span>
        </div>
    );
}

/* ── Main Section ────────────────────────────────────────────────────────── */
export function DangerZoneSection() {
    const { unit } = useTempUnit();

    return (
        <section
            id={SECTION_IDS.danger}
            className="scroll-mt-24 max-w-5xl mx-auto px-4 md:px-8 py-12"
            aria-labelledby="danger-heading"
        >
            <SectionHeader
                title="Danger Zone"
                refCode="USDA-01"
                danger
                aside={
                    <Badge variant="danger">CRITICAL</Badge>
                }
            />

            {/* Alert banner */}
            <div
                role="alert"
                aria-live="assertive"
                className="flex items-start gap-4 border-2 border-danger bg-danger/10 p-4 mb-2 shadow-hard"
            >
                <span className="material-symbols-outlined text-danger text-3xl shrink-0 mt-0.5" aria-hidden="true">
                    warning
                </span>
                <div>
                    <p className="font-display font-bold text-base text-danger uppercase tracking-wide mb-1">
                        40°F – 140°F (4°C – 60°C)
                    </p>
                    <p className="font-mono text-xs text-ink dark:text-paper leading-relaxed">
                        This temperature range is where bacteria grow most rapidly — potentially doubling every
                        20 minutes. Keep cold foods cold and hot foods hot. Never leave food in this zone.
                    </p>
                </div>
            </div>

            {/* Animated range bar */}
            <DangerRangeBar unit={unit} />

            {/* Four zone reference cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
                <ZoneCard label="Refrigerator" tempF={40} variant="cold" />
                <ZoneCard label="USDA Safe Min" tempF={140} variant="safe" />
                <ZoneCard label="Danger Zone High" tempF={140} variant="danger" />
                <ZoneCard label="Instant Kill (Bacteria)" tempF={165} variant="hot" />
            </div>

            {/* Safety rules grid */}
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-ink dark:text-paper mb-4 border-b border-ink/20 dark:border-steel/30 pb-2">
                Safety Rules
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SAFETY_RULES.map(({ icon: Icon, title, body }) => (
                    <div
                        key={title}
                        className="flex gap-3 border border-ink/10 dark:border-steel/20 bg-surface dark:bg-ink/10 p-4"
                    >
                        <div className="shrink-0 mt-0.5">
                            <Icon size={18} className="text-danger" aria-hidden="true" />
                        </div>
                        <div>
                            <p className="font-display font-bold text-sm text-ink dark:text-paper mb-1 uppercase tracking-wide">
                                {title}
                            </p>
                            <p className="font-mono text-xs text-steel leading-relaxed">{body}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Source attribution */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
                <Badge variant="danger">USDA FSIS</Badge>
                <p className="font-mono text-[10px] text-steel">
                    Per{" "}
                    <a
                        href="https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/danger-zone-40f-140f"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-primary transition-colors"
                    >
                        USDA FSIS: Danger Zone (40°F–140°F)
                    </a>
                </p>
            </div>
        </section>
    );
}
