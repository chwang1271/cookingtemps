"use client";

import { beverages, type Beverage } from "@/data/beverages";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { showToast } from "@/components/ui/Toast";
import { useClipboard } from "@/hooks/useClipboard";
import { displayTemp } from "@/lib/tempConvert";
import { useTempUnit } from "@/providers/TempUnitProvider";
import { SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/* ── Category visual config ───────────────────────────────────────────── */
const CAT_CONFIG: Record<Beverage["category"], {
    label: string;
    icon: string;
    border: string;
    text: string;
    bg: string;
    dot: string;
}> = {
    coffee: {
        label: "Coffee & Tea",
        icon: "coffee",
        border: "border-[#92400E]",
        text: "text-[#92400E] dark:text-[#FCD34D]",
        bg: "bg-[#FEF3C7]/60 dark:bg-[#92400E]/10",
        dot: "bg-[#D97706]",
    },
    beer: {
        label: "Beer",
        icon: "sports_bar",
        border: "border-[#F59E0B]",
        text: "text-[#92400E] dark:text-[#FCD34D]",
        bg: "bg-[#FEF3C7]/40 dark:bg-[#78350F]/10",
        dot: "bg-[#F59E0B]",
    },
    wine: {
        label: "Wine",
        icon: "wine_bar",
        border: "border-[#BE185D]",
        text: "text-[#BE185D] dark:text-[#F9A8D4]",
        bg: "bg-pink-50/60 dark:bg-[#BE185D]/10",
        dot: "bg-[#BE185D]",
    },
    other: {
        label: "Other",
        icon: "local_cafe",
        border: "border-steel",
        text: "text-steel",
        bg: "bg-paper/60 dark:bg-paper/5",
        dot: "bg-steel",
    },
};

/* ── Temperature "spectrum" indicator ─────────────────────────────────── */
// Cold: 35°F (ice cold) → Hot: 175°F (hot tea)
const SPEC_MIN_F = 32;
const SPEC_MAX_F = 180;

function TempSpectrum({ tempF }: { tempF: number }) {
    const pct = Math.max(2, Math.min(98, ((tempF - SPEC_MIN_F) / (SPEC_MAX_F - SPEC_MIN_F)) * 100));
    const isHot = tempF > 100;
    const color = isHot
        ? tempF > 155 ? "#ec3e13" : "#F97316"   // very hot → hot
        : tempF < 45 ? "#3B82F6"               // icy cold
            : "#22C55E";                             // refreshingly cool
    return (
        <div className="relative h-2 bg-ink/10 dark:bg-paper/15 overflow-hidden w-full">
            <div className="absolute top-0 h-full" style={{ width: `${pct}%`, backgroundColor: color }} />
        </div>
    );
}

/* ── Individual beverage card ─────────────────────────────────────────── */
function BevCard({ bev }: { bev: Beverage }) {
    const { unit } = useTempUnit();
    const { copy } = useClipboard();
    const cfg = CAT_CONFIG[bev.category];
    const { value, label } = displayTemp(bev.servingTempF, unit);
    const formatted = `${value}${label}`;
    const isHot = bev.servingTempF > 100;

    const handleCopy = async () => {
        await copy(formatted);
        showToast(`Copied ${bev.name}: ${formatted}`);
    };

    return (
        <div
            className={cn(
                "group flex flex-col gap-2.5 border-2 p-4 transition-all",
                "hover:shadow-hard hover:-translate-y-px",
                cfg.bg,
                cfg.border,
            )}
        >
            {/* Hot / Cold pill */}
            <div className="flex items-center justify-between">
                <span className={cn(
                    "font-mono text-[9px] font-bold px-1.5 py-0.5 uppercase tracking-wide",
                    isHot ? "bg-danger text-paper" : "bg-[#3B82F6] text-paper"
                )}>
                    {isHot ? "HOT" : "COLD"}
                </span>
                <span className="material-symbols-outlined text-steel text-base" aria-hidden="true">
                    {cfg.icon}
                </span>
            </div>

            {/* Name */}
            <p className="font-display font-bold text-sm uppercase tracking-wide text-ink dark:text-paper group-hover:text-primary transition-colors">
                {bev.name}
            </p>

            {/* Temp spectrum bar + click-to-copy temp */}
            <TempSpectrum tempF={bev.servingTempF} />
            <button
                onClick={handleCopy}
                title={`Copy ${formatted}`}
                aria-label={`${bev.name} serving temp: ${formatted}. Click to copy.`}
                className={cn(
                    "font-mono text-xl font-bold tabular-nums cursor-copy text-left transition-opacity hover:opacity-70",
                    isHot ? "text-danger" : "text-[#3B82F6]"
                )}
            >
                {formatted}
            </button>

            {/* Note */}
            <p className="font-mono text-[10px] text-steel leading-relaxed">{bev.note}</p>
        </div>
    );
}

/* ── Category group ───────────────────────────────────────────────────── */
function CategoryGroup({ category, items }: { category: Beverage["category"]; items: Beverage[] }) {
    const cfg = CAT_CONFIG[category];
    return (
        <div>
            {/* Group label */}
            <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-ink dark:text-paper text-xl" aria-hidden="true">
                    {cfg.icon}
                </span>
                <h3 className="font-display font-bold text-sm uppercase tracking-widest text-ink dark:text-paper">
                    {cfg.label}
                </h3>
                <div className={cn("flex-1 h-px ml-2", cfg.dot)} aria-hidden="true" />
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
                {items.map((bev) => (
                    <BevCard key={bev.name} bev={bev} />
                ))}
            </div>
        </div>
    );
}

/* ── Cold-to-hot gradient legend ──────────────────────────────────────── */
function ServingSpectrumLegend() {
    return (
        <div className="mb-8">
            <div
                className="h-3 w-full"
                style={{ background: "linear-gradient(to right, #3B82F6, #22C55E, #F97316, #ec3e13)" }}
                aria-hidden="true"
            />
            <div className="flex justify-between font-mono text-[10px] text-steel mt-1">
                <span>❄ ICE COLD</span>
                <span>🌡 ROOM TEMP</span>
                <span>☕ VERY HOT</span>
            </div>
        </div>
    );
}

/* ── Main Section ─────────────────────────────────────────────────────── */
const CATEGORY_ORDER: Beverage["category"][] = ["coffee", "beer", "wine", "other"];

export function BeveragesSection() {
    const grouped = CATEGORY_ORDER.reduce<Record<Beverage["category"], Beverage[]>>(
        (acc, cat) => {
            acc[cat] = beverages.filter((b) => b.category === cat);
            return acc;
        },
        { coffee: [], beer: [], wine: [], other: [] }
    );

    return (
        <section
            id={SECTION_IDS.beverages}
            className="scroll-mt-24 max-w-5xl mx-auto px-4 md:px-8 py-12"
            aria-labelledby="beverages-heading"
        >
            <SectionHeader
                title="Beverage Temps"
                refCode="REF-007"
                aside={
                    <Badge variant="default">SERVING GUIDE</Badge>
                }
            />

            <p className="font-mono text-base text-steel mb-6 max-w-2xl leading-relaxed">
                Serving temperature dramatically affects flavour. Coffee served too hot burns;
                red wine too cold loses aromatics. Click any card's temperature to copy it.
            </p>

            {/* Spectrum legend */}
            <ServingSpectrumLegend />

            {/* Category groups */}
            {CATEGORY_ORDER.map((cat) => (
                <CategoryGroup key={cat} category={cat} items={grouped[cat]} />
            ))}
        </section>
    );
}
