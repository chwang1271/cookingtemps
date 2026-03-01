"use client";

import { bakingTemps, type BakingItem } from "@/data/bakingTemps";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { showToast } from "@/components/ui/Toast";
import { useClipboard } from "@/hooks/useClipboard";
import { displayTemp } from "@/lib/tempConvert";
import { useTempUnit } from "@/providers/TempUnitProvider";
import { SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/* ── "Done-ness" fill bar — maps internal temp to a warmth gradient ───── */
// Bread/pastry range: ~150°F (cheesecake) → 210°F (sourdough)
const BAKE_MIN_F = 140;
const BAKE_MAX_F = 215;

function DonenessBar({ tempF }: { tempF: number }) {
    const pct = Math.max(5, Math.min(100, ((tempF - BAKE_MIN_F) / (BAKE_MAX_F - BAKE_MIN_F)) * 100));
    const color =
        tempF < 175 ? "#F59E0B"   // amber — lower temps (cheesecake, custard)
            : tempF < 195 ? "#F97316" // orange — cookies, brownies
                : "#ec3e13";               // red — breads at full internal temp
    return (
        <div className="h-1.5 w-full bg-ink/10 dark:bg-paper/15 overflow-hidden">
            <div className="h-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: color }} />
        </div>
    );
}

/* ── Single table row ─────────────────────────────────────────────────── */
function BakingRow({ item, isOdd }: { item: BakingItem; isOdd: boolean }) {
    const { unit } = useTempUnit();
    const { copy } = useClipboard();
    const { value, label } = displayTemp(item.internalTempF, unit);
    const formatted = `${value}${label}`;

    const handleCopy = async () => {
        await copy(formatted);
        showToast(`Copied ${item.name}: ${formatted}`);
    };

    return (
        <tr className={cn(
            "group border-b border-ink/10 dark:border-steel/20 transition-colors",
            "hover:bg-primary/5 dark:hover:bg-primary/10",
            isOdd ? "bg-paper/40 dark:bg-paper/[0.02]" : "bg-surface dark:bg-transparent"
        )}>
            {/* Name */}
            <td className="px-4 py-3 font-display font-bold text-sm text-ink dark:text-paper group-hover:text-primary transition-colors">
                {item.name}
            </td>
            {/* Donenness bar + temp */}
            <td className="px-4 py-3 w-40">
                <div className="flex flex-col gap-1.5">
                    <DonenessBar tempF={item.internalTempF} />
                    <button
                        onClick={handleCopy}
                        title={`Copy ${formatted}`}
                        aria-label={`${item.name}: ${formatted}. Click to copy.`}
                        className="font-mono text-sm font-bold tabular-nums text-right cursor-copy hover:text-primary transition-colors text-ink dark:text-paper"
                    >
                        {formatted}
                    </button>
                </div>
            </td>
            {/* Doneness cue */}
            <td className="px-4 py-3 font-mono text-xs text-steel hidden sm:table-cell">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-primary/60 shrink-0" aria-hidden="true">
                        visibility
                    </span>
                    {item.cue}
                </div>
            </td>
        </tr>
    );
}

/* ── Category panel ───────────────────────────────────────────────────── */
function CategoryPanel({
    title,
    icon,
    items,
    badgeVariant,
}: {
    title: string;
    icon: string;
    items: BakingItem[];
    badgeVariant: "safe" | "caution";
}) {
    return (
        <div className="border-2 border-ink dark:border-steel/40 shadow-hard overflow-hidden">
            {/* Panel header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-ink dark:bg-paper/10 border-b border-ink/30 dark:border-steel/30">
                <span className="material-symbols-outlined text-paper text-xl" aria-hidden="true">
                    {icon}
                </span>
                <span className="font-display font-bold text-sm uppercase tracking-widest text-paper">
                    {title}
                </span>
                <Badge variant={badgeVariant} className="ml-auto">{items.length} items</Badge>
            </div>

            {/* Table */}
            <table className="w-full border-collapse" aria-label={`${title} baking temperatures`}>
                <thead>
                    <tr className="border-b border-ink/20 dark:border-steel/20 bg-paper/60 dark:bg-paper/5">
                        <th scope="col" className="px-4 py-2 text-left font-display text-[10px] uppercase tracking-widest text-steel">
                            Item
                        </th>
                        <th scope="col" className="px-4 py-2 text-left font-display text-[10px] uppercase tracking-widest text-steel w-40">
                            Internal Temp
                        </th>
                        <th scope="col" className="px-4 py-2 text-left font-display text-[10px] uppercase tracking-widest text-steel hidden sm:table-cell">
                            Doneness Cue
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, i) => (
                        <BakingRow key={item.name} item={item} isOdd={i % 2 === 1} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

/* ── Main Section ─────────────────────────────────────────────────────── */
export function BakingSection() {
    const breads = bakingTemps.filter((b) => b.category === "bread");
    const pastries = bakingTemps.filter((b) => b.category === "pastry");

    return (
        <section
            id={SECTION_IDS.baking}
            className="scroll-mt-24 max-w-5xl mx-auto px-4 md:px-8 py-12"
            aria-labelledby="baking-heading"
        >
            <SectionHeader
                title="Baking Temperatures"
                refCode="REF-006"
                aside={
                    <Badge variant="default">INTERNAL TEMPS</Badge>
                }
            />

            <p className="font-mono text-base text-steel mb-8 max-w-2xl leading-relaxed">
                Internal temperature is the most reliable doneness test for baked goods — far more accurate than
                visual cues alone. Insert your thermometer in the centre, avoiding the pan. Click any temperature to copy it.
            </p>

            {/* Two-panel grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CategoryPanel
                    title="Breads"
                    icon="bakery_dining"
                    items={breads}
                    badgeVariant="safe"
                />
                <CategoryPanel
                    title="Pastries & Cakes"
                    icon="cake"
                    items={pastries}
                    badgeVariant="caution"
                />
            </div>

            {/* Pro tips row */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                    { icon: "thermostat", tip: "Insert thermometer dead-centre, not near the pan walls." },
                    { icon: "timer", tip: "Check temp 10–15 min before the recipe's listed end time." },
                    { icon: "air", tip: "Fan / convection ovens: reduce oven temp by ~25°F (14°C)." },
                ].map(({ icon, tip }) => (
                    <div key={icon} className="flex gap-2 p-3 border border-ink/10 dark:border-steel/20 bg-surface dark:bg-ink/10">
                        <span className="material-symbols-outlined text-primary text-base shrink-0 mt-0.5" aria-hidden="true">
                            {icon}
                        </span>
                        <p className="font-mono text-[11px] text-steel leading-relaxed">{tip}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
