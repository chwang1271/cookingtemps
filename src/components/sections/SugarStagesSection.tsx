"use client";

import { candyStages } from "@/data/candyStages";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { showToast } from "@/components/ui/Toast";
import { useClipboard } from "@/hooks/useClipboard";
import { displayTemp } from "@/lib/tempConvert";
import { useTempUnit } from "@/providers/TempUnitProvider";
import { SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Droplets } from "lucide-react";

/* ── Stage colour palette: pale gold → deep amber → dark brown ─────────── */
const STAGE_COLORS = [
    { bg: "bg-[#FEF3C7]", border: "border-[#FCD34D]", text: "text-[#92400E]", dot: "bg-[#FCD34D]", hex: "#FCD34D" },
    { bg: "bg-[#FDE68A]/60", border: "border-[#F59E0B]", text: "text-[#78350F]", dot: "bg-[#F59E0B]", hex: "#F59E0B" },
    { bg: "bg-[#FCD34D]/40", border: "border-[#D97706]", text: "text-[#78350F]", dot: "bg-[#D97706]", hex: "#D97706" },
    { bg: "bg-[#F59E0B]/20", border: "border-[#B45309]", text: "text-[#78350F]", dot: "bg-[#B45309]", hex: "#B45309" },
    { bg: "bg-[#D97706]/20", border: "border-[#92400E]", text: "text-[#92400E]", dot: "bg-[#92400E]", hex: "#92400E" },
    { bg: "bg-[#B45309]/20", border: "border-[#7C2D12]", text: "text-[#7C2D12]", dot: "bg-[#7C2D12]", hex: "#7C2D12" },
    { bg: "bg-[#92400E]/20", border: "border-danger", text: "text-danger", dot: "bg-danger", hex: "#ec3e13" },
];

const SCALE_MIN_F = 220;
const SCALE_MAX_F = 360;

/* ── Mini horizontal position bar ─────────────────────────────────────── */
function StageBar({ low, high, colorHex }: { low: number; high: number; colorHex: string }) {
    const toP = (f: number) => ((f - SCALE_MIN_F) / (SCALE_MAX_F - SCALE_MIN_F)) * 100;
    const leftPct = toP(low);
    const widthPct = Math.max(2, toP(high) - toP(low));
    return (
        <div className="relative h-2 w-full bg-ink/10 dark:bg-paper/15 overflow-hidden">
            <div
                className="absolute top-0 h-full"
                style={{ left: `${leftPct}%`, width: `${widthPct}%`, backgroundColor: colorHex }}
            />
        </div>
    );
}

/* ── Single stage row — horizontal card with timeline dot ─────────────── */
function StageRow({
    stage,
    index,
    isLast,
}: {
    stage: typeof candyStages[0];
    index: number;
    isLast: boolean;
}) {
    const { unit } = useTempUnit();
    const { copy } = useClipboard();
    const colors = STAGE_COLORS[index] ?? STAGE_COLORS[STAGE_COLORS.length - 1];

    const loDisp = displayTemp(stage.tempRangeF[0], unit);
    const hiDisp = displayTemp(stage.tempRangeF[1], unit);
    const rangeStr = `${loDisp.value}–${hiDisp.value}${hiDisp.label}`;

    const handleCopy = async () => {
        await copy(rangeStr);
        showToast(`Copied ${stage.name}: ${rangeStr}`);
    };

    return (
        <div className="relative flex gap-0">
            {/* ── Vertical timeline spine ── */}
            <div className="flex flex-col items-center shrink-0 w-10">
                {/* Dot */}
                <div
                    className={cn("w-4 h-4 border-2 border-paper dark:border-ink rounded-full z-10 shrink-0 mt-5", colors.dot)}
                    aria-hidden="true"
                />
                {/* Line below (hidden for last item) */}
                {!isLast && (
                    <div
                        className="w-0.5 flex-1 mt-1"
                        style={{ backgroundColor: colors.hex, opacity: 0.4, minHeight: "24px" }}
                        aria-hidden="true"
                    />
                )}
            </div>

            {/* ── Card ── */}
            <div
                className={cn(
                    "group flex-1 mb-4 border-2 p-4 transition-all",
                    "hover:shadow-hard hover:-translate-y-px cursor-default",
                    colors.bg,
                    colors.border
                )}
            >
                {/* Top row: stage name + temp */}
                <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
                    <div>
                        <span className="font-mono text-[10px] text-steel uppercase tracking-widest">
                            Stage {index + 1} of {candyStages.length}
                        </span>
                        <h3 className={cn("font-display font-bold text-xl uppercase tracking-wide", colors.text)}>
                            {stage.name}
                        </h3>
                    </div>
                    {/* Temp — click to copy */}
                    <button
                        onClick={handleCopy}
                        title={`Copy ${rangeStr}`}
                        aria-label={`${stage.name}: ${rangeStr}. Click to copy.`}
                        className={cn(
                            "font-mono font-bold text-2xl tabular-nums shrink-0 cursor-copy",
                            "transition-opacity hover:opacity-70",
                            colors.text
                        )}
                    >
                        {rangeStr}
                    </button>
                </div>

                {/* Scale bar */}
                <StageBar low={stage.tempRangeF[0]} high={stage.tempRangeF[1]} colorHex={colors.hex} />

                {/* Texture + uses */}
                <div className="flex flex-col sm:flex-row gap-3 mt-3">
                    <div className="flex items-start gap-1.5 flex-1">
                        <Droplets size={13} className="text-steel shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                            <p className="font-mono text-[10px] text-steel uppercase tracking-widest">Texture</p>
                            <p className="font-mono text-xs text-ink dark:text-ink/90 font-medium">{stage.texture}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-1.5 flex-1">
                        <span className="material-symbols-outlined text-sm text-steel shrink-0" aria-hidden="true">cooking</span>
                        <div>
                            <p className="font-mono text-[10px] text-steel uppercase tracking-widest">Used For</p>
                            <p className="font-mono text-xs text-ink dark:text-ink/90 font-medium">{stage.usedFor}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ── Gradient scale ruler ─────────────────────────────────────────────── */
function CandyScaleRuler() {
    return (
        <div className="mb-8">
            <div
                className="h-4 w-full"
                style={{
                    background: "linear-gradient(to right, #FEF3C7, #FCD34D, #F59E0B, #D97706, #B45309, #92400E, #ec3e13)",
                }}
                aria-hidden="true"
            />
            <div className="flex justify-between font-mono text-[10px] text-steel mt-1 px-px">
                <span>220°F</span>
                <span>270°F</span>
                <span>320°F</span>
                <span>360°F</span>
            </div>
        </div>
    );
}

/* ── Main Section ─────────────────────────────────────────────────────── */
export function SugarStagesSection() {
    return (
        <section
            id={SECTION_IDS.sugar}
            className="scroll-mt-24 max-w-5xl mx-auto px-4 md:px-8 py-12"
            aria-labelledby="sugar-heading"
        >
            <SectionHeader
                title="Sugar Stages"
                refCode="REF-005"
                danger
                aside={
                    <Badge variant="caution">CANDY MAKING</Badge>
                }
            />

            <p className="font-mono text-base text-steel mb-4 max-w-2xl leading-relaxed">
                Sugar transforms dramatically with heat. Each stage unlocks different textures and uses. Use a
                candy thermometer — even a few degrees can change everything.
                Click any temperature to copy it.
            </p>

            {/* Safety note */}
            <div className="flex items-start gap-3 border border-caution/50 bg-caution/10 p-3 mb-8">
                <span className="material-symbols-outlined text-caution shrink-0" aria-hidden="true">warning_amber</span>
                <p className="font-mono text-xs text-ink dark:text-paper leading-relaxed">
                    <strong>Hot sugar burns are severe.</strong> Have a bowl of ice water nearby and never leave
                    boiling sugar unattended. Keep children away from the cooking area.
                </p>
            </div>

            {/* Gradient scale ruler */}
            <CandyScaleRuler />

            {/* Timeline */}
            <div role="list" aria-label="Candy sugar stages">
                {candyStages.map((stage, i) => (
                    <div key={stage.name} role="listitem">
                        <StageRow stage={stage} index={i} isLast={i === candyStages.length - 1} />
                    </div>
                ))}
            </div>

            {/* Tip footer */}
            <div className="mt-2 border-t border-ink/10 dark:border-steel/20 pt-4 flex flex-wrap gap-4 font-mono text-[10px] text-steel">
                <span>🌡️ Use a candy or instant-read thermometer — no guessing</span>
                <span>🧊 Cold-water test: drop sugar in ice water to feel the stage</span>
                <span>💧 Humidity affects results — avoid rainy days for hard candy</span>
            </div>
        </section>
    );
}
