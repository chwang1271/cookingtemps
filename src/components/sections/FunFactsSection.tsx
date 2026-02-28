"use client";

import { funFacts } from "@/data/funFacts";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { showToast } from "@/components/ui/Toast";
import { useClipboard } from "@/hooks/useClipboard";
import { SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

/* ── Extract temp references from fact text ────────────────────────────── */
function highlightTemps(text: string): React.ReactNode {
    // Match patterns like "280°F", "800–900°F", "144°F", "212°F", "700°F", "82–90°F"
    const parts = text.split(/([\d,–]+°[FCK])/g);
    return parts.map((part, i) =>
        /°[FCK]/.test(part) ? (
            <strong key={i} className="text-primary font-bold">
                {part}
            </strong>
        ) : (
            part
        )
    );
}

/* ── Scrolling ticker ─────────────────────────────────────────────────── */
function FactTicker() {
    const ticker = funFacts.map((f) => f.text).join(" ·· ");
    return (
        <div
            className="overflow-hidden border-y-2 border-ink dark:border-steel/40 bg-ink dark:bg-paper/10 py-2 mb-8"
            aria-hidden="true" /* decorative — full content shown below */
        >
            <div
                className="whitespace-nowrap font-mono text-xs text-paper animate-marquee"
                style={{
                    display: "inline-block",
                    animation: "marquee 40s linear infinite",
                }}
            >
                {/* Duplicated for seamless loop */}
                {ticker} &nbsp;&nbsp;&nbsp;{ticker}
            </div>
            <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
        </div>
    );
}

/* ── Curiosity score — cycles 1–5 ─────────────────────────────────────── */
const CURIOSITY = [5, 4, 5, 3, 4, 5]; // per fact, curated

function CuriosityDots({ score }: { score: number }) {
    return (
        <div className="flex gap-1" aria-label={`Curiosity score: ${score} of 5`}>
            {[1, 2, 3, 4, 5].map((i) => (
                <div
                    key={i}
                    className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        i <= score ? "bg-primary" : "bg-ink/15 dark:bg-paper/15"
                    )}
                    aria-hidden="true"
                />
            ))}
        </div>
    );
}

/* ── Individual fact card ─────────────────────────────────────────────── */
function FactCard({ fact, index }: { fact: typeof funFacts[0]; index: number }) {
    const { copy } = useClipboard();
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await copy(fact.text);
        setCopied(true);
        showToast("Fact copied!");
        setTimeout(() => setCopied(false), 2000);
    };

    // Alternate accent colours for visual variety
    const accentStyles = [
        "border-primary",
        "border-[#F59E0B]",
        "border-[#22C55E]",
        "border-[#3B82F6]",
        "border-[#F97316]",
        "border-primary",
    ][index % 6];

    // Fact number label
    const label = String(index + 1).padStart(2, "0");

    return (
        <div
            className={cn(
                "group relative flex flex-col gap-4 border-2 p-5 transition-all",
                "hover:shadow-hard hover:-translate-y-px bg-surface dark:bg-ink/10",
                accentStyles
            )}
        >
            {/* Number + curiosity */}
            <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-steel">FACT #{label}</span>
                <CuriosityDots score={CURIOSITY[index] ?? 3} />
            </div>

            {/* Fact text — temp references highlighted */}
            <p className="font-mono text-sm text-ink dark:text-paper leading-relaxed flex-1">
                {highlightTemps(fact.text)}
            </p>

            {/* Copy button */}
            <button
                onClick={handleCopy}
                className={cn(
                    "self-start font-mono text-[10px] uppercase tracking-wider transition-all",
                    "border border-ink/20 dark:border-steel/30 px-2 py-1",
                    "hover:bg-ink hover:text-paper dark:hover:bg-paper dark:hover:text-ink",
                    copied && "bg-safe text-paper border-safe"
                )}
                aria-label="Copy this fact to clipboard"
            >
                {copied ? "✓ COPIED" : "COPY FACT"}
            </button>
        </div>
    );
}

/* ── Bonus science callout ─────────────────────────────────────────────── */
function ScienceCallout() {
    return (
        <div className="relative mt-8 border-2 border-ink dark:border-steel/40 p-6 overflow-hidden">
            {/* Hatch pattern bg */}
            <div
                className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
                    backgroundSize: "8px 8px",
                }}
                aria-hidden="true"
            />
            <div className="relative flex items-start gap-4">
                <span className="material-symbols-outlined text-primary text-3xl shrink-0" aria-hidden="true">
                    science
                </span>
                <div>
                    <p className="font-display font-bold text-sm uppercase tracking-widest text-ink dark:text-paper mb-2">
                        Why Temperature Precision Matters
                    </p>
                    <p className="font-mono text-xs text-steel leading-relaxed max-w-2xl">
                        At the molecular level, proteins denature, starches gelatinise, and fats oxidise all at specific
                        temperatures. A 5°F variance can mean the difference between a perfectly seared crust and steamed
                        grey meat — or a silky custard vs. a grainy scrambled egg.
                    </p>
                </div>
            </div>
        </div>
    );
}

/* ── Main Section ─────────────────────────────────────────────────────── */
export function FunFactsSection() {
    return (
        <section
            id={SECTION_IDS.funFacts}
            className="scroll-mt-24 max-w-5xl mx-auto px-4 md:px-8 py-12"
            aria-labelledby="facts-heading"
        >
            <SectionHeader
                title="Fun Facts"
                refCode="FYI-01"
                aside={
                    <Badge variant="primary">SCIENCE</Badge>
                }
            />

            <p className="font-mono text-xs text-steel mb-6 max-w-2xl leading-relaxed">
                Temperature is physics. Here are some curiosities that will make you a more
                intentional cook — and great dinner conversation.
            </p>

            {/* Scrolling ticker */}
            <FactTicker />

            {/* Fact cards grid */}
            <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                role="list"
                aria-label="Fun cooking temperature facts"
            >
                {funFacts.map((fact, i) => (
                    <div key={fact.id} role="listitem">
                        <FactCard fact={fact} index={i} />
                    </div>
                ))}
            </div>

            {/* Science callout */}
            <ScienceCallout />
        </section>
    );
}
