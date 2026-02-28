"use client";

import { useState, useMemo } from "react";
import { oils, type Oil } from "@/data/oils";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TabGroup } from "@/components/ui/TabGroup";
import { Badge } from "@/components/ui/Badge";
import { showToast } from "@/components/ui/Toast";
import { useClipboard } from "@/hooks/useClipboard";
import { displayTemp, formatTemp } from "@/lib/tempConvert";
import { useTempUnit } from "@/providers/TempUnitProvider";
import { SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Flame } from "lucide-react";

/* ── Heat category config ─────────────────────────────────────────────── */
const HEAT_TABS = [
    { id: "all", label: "All" },
    { id: "high", label: "High Heat" },
    { id: "medium", label: "Medium Heat" },
    { id: "low", label: "Low / No Heat" },
];

const HEAT_BADGE: Record<Oil["heatCategory"], { label: string; color: string }> = {
    high: { label: "HIGH", color: "bg-danger  text-paper" },
    medium: { label: "MEDIUM", color: "bg-caution text-ink" },
    low: { label: "LOW", color: "bg-safe    text-paper" },
};

/* ── Smoke-point scale (°F) for bar width ─────────────────────────────── */
const SCALE_MAX_F = 540;

function SmokeBar({ smokePointF, max = SCALE_MAX_F }: { smokePointF: number; max?: number }) {
    const pct = Math.min(100, (smokePointF / max) * 100);

    // Colour gradient based on smoke point
    const barColor =
        smokePointF >= 450 ? "#ec3e13"       // danger red
            : smokePointF >= 375 ? "#F97316"     // orange
                : smokePointF >= 300 ? "#F59E0B"     // amber
                    : "#22C55E";                          // safe green

    return (
        <div className="w-full bg-ink/10 dark:bg-paper/10 h-2 relative overflow-hidden">
            <div
                className="h-full transition-all duration-500"
                style={{ width: `${pct}%`, backgroundColor: barColor }}
            />
        </div>
    );
}

/* ── Flame icons (1–4) ────────────────────────────────────────────────── */
function HeatFlames({ category }: { category: Oil["heatCategory"] }) {
    const count = { high: 3, medium: 2, low: 1 }[category];
    return (
        <div className="flex gap-0.5" aria-label={`${category} heat`}>
            {[1, 2, 3].map((i) => (
                <Flame
                    key={i}
                    size={12}
                    className={i <= count ? "text-primary" : "text-ink/20 dark:text-paper/20"}
                    aria-hidden="true"
                />
            ))}
        </div>
    );
}

/* ── Single Oil Card ──────────────────────────────────────────────────── */
function OilCard({ oil, rank }: { oil: Oil; rank: number }) {
    const { unit } = useTempUnit();
    const { copy } = useClipboard();
    const { value, label } = displayTemp(oil.smokePointF, unit);
    const formatted = `${value}${label}`;

    const handleCopy = async () => {
        await copy(formatted);
        showToast(`Copied ${oil.name}: ${formatted}`);
    };

    const heat = HEAT_BADGE[oil.heatCategory];
    const isTop = rank <= 3;

    return (
        <div
            className={cn(
                "group relative flex items-center gap-4 border-b border-ink/10 dark:border-steel/20 px-3 py-3 transition-colors",
                "hover:bg-highlight/60 dark:hover:bg-paper/5",
                isTop && "border-l-2 border-l-primary"
            )}
        >
            {/* Rank */}
            <span
                className={cn(
                    "font-mono text-xs shrink-0 w-5 text-center",
                    isTop ? "text-primary font-bold" : "text-steel"
                )}
                aria-label={`Rank ${rank}`}
            >
                {rank}
            </span>

            {/* Name + meta */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-display font-bold text-sm text-ink dark:text-paper group-hover:text-primary transition-colors truncate">
                        {oil.name}
                    </span>
                    <span className={cn("font-mono text-[9px] font-bold px-1.5 py-0.5", heat.color)}>
                        {heat.label}
                    </span>
                    <HeatFlames category={oil.heatCategory} />
                </div>
                {/* Smoke bar */}
                <SmokeBar smokePointF={oil.smokePointF} />
                {/* Best-for + flavour */}
                <div className="flex gap-3 mt-1.5 flex-wrap">
                    <span className="font-mono text-[10px] text-steel truncate">
                        Best: {oil.bestFor}
                    </span>
                    <span className="font-mono text-[10px] text-steel/70 truncate">
                        Flavour: {oil.flavorProfile}
                    </span>
                </div>
            </div>

            {/* Smoke point temp — click to copy */}
            <button
                onClick={handleCopy}
                title={`Copy ${formatted}`}
                aria-label={`${oil.name} smoke point: ${formatted}. Click to copy.`}
                className={cn(
                    "font-mono font-bold text-lg md:text-xl tabular-nums shrink-0 cursor-copy",
                    "transition-colors group-hover:text-primary",
                    oil.heatCategory === "high" ? "text-danger" :
                        oil.heatCategory === "medium" ? "text-[#F59E0B]" :
                            "text-safe"
                )}
            >
                {formatted}
            </button>
        </div>
    );
}

/* ── Legend ───────────────────────────────────────────────────────────── */
function Legend() {
    return (
        <div className="flex flex-wrap gap-4 mb-4 font-mono text-[10px] text-steel">
            <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-safe" />
                <span>Low (&lt;300°F)</span>
            </div>
            <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-caution" />
                <span>Medium (300–374°F)</span>
            </div>
            <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-[#F97316]" />
                <span>High (375–449°F)</span>
            </div>
            <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-danger" />
                <span>Very High (450°F+)</span>
            </div>
        </div>
    );
}

/* ── Main Section ─────────────────────────────────────────────────────── */
export function SmokePointsSection() {
    const [activeFilter, setActiveFilter] = useState("all");

    const filtered = useMemo(() => {
        // Always sort by smoke point descending (highest first)
        const sorted = [...oils].sort((a, b) => b.smokePointF - a.smokePointF);
        if (activeFilter === "all") return sorted;
        return sorted.filter((o) => o.heatCategory === activeFilter);
    }, [activeFilter]);

    return (
        <section
            id={SECTION_IDS.oils}
            className="scroll-mt-24 max-w-5xl mx-auto px-4 md:px-8 py-12"
            aria-labelledby="oils-heading"
        >
            <SectionHeader
                title="Oil Smoke Points"
                refCode="REF-004"
                aside={
                    <Badge variant="caution">↯ HEAT RANKING</Badge>
                }
            />

            <p className="font-mono text-xs text-steel mb-6 leading-relaxed max-w-2xl">
                Heating oil past its smoke point causes it to break down, releasing harmful compounds
                and bitter flavours. Click any temperature to copy it. Sorted highest → lowest.
            </p>

            {/* Category filter */}
            <TabGroup
                tabs={HEAT_TABS}
                activeTab={activeFilter}
                onTabChange={setActiveFilter}
                className="mb-4"
            />

            {/* Legend */}
            <Legend />

            {/* Oil list */}
            <div className="border-2 border-ink dark:border-steel/40 shadow-hard bg-surface dark:bg-ink/10">
                {/* Table header */}
                <div className="flex items-center gap-4 px-3 py-2 bg-ink dark:bg-paper/10 border-b border-ink/30 dark:border-steel/30">
                    <span className="font-display text-[10px] font-bold text-paper dark:text-paper uppercase tracking-widest w-5 shrink-0">
                        #
                    </span>
                    <span className="font-display text-[10px] font-bold text-paper dark:text-paper uppercase tracking-widest flex-1">
                        Oil / Fat
                    </span>
                    <span className="font-display text-[10px] font-bold text-paper dark:text-paper uppercase tracking-widest shrink-0">
                        Smoke Point
                    </span>
                </div>

                {/* Cards */}
                <div>
                    {filtered.map((oil, i) => (
                        <OilCard key={oil.name} oil={oil} rank={i + 1} />
                    ))}
                </div>

                {/* Footer bar */}
                <div className="px-3 py-2 border-t border-ink/10 dark:border-steel/20 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-steel">
                        {filtered.length} oils listed · click temp to copy
                    </span>
                    <Badge variant="default">CULINARY SCIENCE</Badge>
                </div>
            </div>
        </section>
    );
}
