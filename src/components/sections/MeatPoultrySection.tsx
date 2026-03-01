"use client";

import { useState } from "react";
import { meats, meatCategories, type MeatCut } from "@/data/meats";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TabGroup } from "@/components/ui/TabGroup";
import { TemperatureCell } from "@/components/ui/TemperatureCell";
import { Badge } from "@/components/ui/Badge";
import { useTempUnit } from "@/providers/TempUnitProvider";
import { SECTION_IDS } from "@/lib/constants";
import type { TempUnit } from "@/providers/TempUnitProvider";

// ── Doneness color bars (matches UI spec: pink → brown gradient) ──────────
const donenessColors: Record<string, string> = {
    rare: "bg-[#E8779A]",
    mediumRare: "bg-[#D64F6D]",
    medium: "bg-[#C97B5C]",
    wellDone: "bg-[#8B4513]",
    usdaSafe: "bg-safe",
};

// ── Doneness readable labels ──────────────────────────────────────────────
const donenessLabels: { key: keyof MeatCut["temps"]; label: string }[] = [
    { key: "rare", label: "Rare" },
    { key: "mediumRare", label: "Med-Rare" },
    { key: "medium", label: "Medium" },
    { key: "wellDone", label: "Well Done" },
    { key: "usdaSafe", label: "USDA Safe ✓" },
];

// ── Tab config ────────────────────────────────────────────────────────────
const TABS = meatCategories.map((cat) => ({
    id: cat,
    label: cat.charAt(0).toUpperCase() + cat.slice(1),
}));

// ── Unit toggle inside section ────────────────────────────────────────────
function UnitPill() {
    const { unit, setUnit } = useTempUnit();
    const units: TempUnit[] = ["F", "C"];
    return (
        <div className="flex border-2 border-ink dark:border-steel/40 overflow-hidden shrink-0">
            {units.map((u) => (
                <button
                    key={u}
                    onClick={() => setUnit(u)}
                    aria-label={`Show temperatures in °${u}`}
                    className={`px-3 py-1 text-xs font-mono font-bold transition-colors border-r last:border-r-0 border-ink dark:border-steel/40 ${unit === u
                        ? "bg-ink dark:bg-paper text-paper dark:text-ink"
                        : "bg-surface dark:bg-bg-dark text-ink dark:text-paper hover:bg-highlight hover:text-ink"
                        }`}
                >
                    °{u}
                </button>
            ))}
        </div>
    );
}

// ── Main component ────────────────────────────────────────────────────────
export function MeatPoultrySection() {
    const [activeTab, setActiveTab] = useState<typeof meatCategories[number]>("beef");

    const filteredCuts = meats.filter((m) => m.category === activeTab);

    return (
        <section
            id={SECTION_IDS.meat}
            className="scroll-mt-24 px-4 md:px-8 py-12 max-w-5xl mx-auto"
            aria-labelledby="meat-heading"
        >
            <SectionHeader
                title="Meat & Poultry"
                refCode="REF-001"
                aside={<UnitPill />}
            />

            {/* Click-to-copy hint */}
            <p className="font-mono text-base text-steel mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm" aria-hidden="true">touch_app</span>
                Click any temperature to copy it to your clipboard.
            </p>

            {/* Tabs */}
            <TabGroup
                tabs={TABS}
                activeTab={activeTab}
                onTabChange={(id) => setActiveTab(id as typeof meatCategories[number])}
            />

            {/* Table */}
            <div
                id={`tabpanel-${activeTab}`}
                role="tabpanel"
                aria-labelledby={`tab-${activeTab}`}
                className="overflow-x-auto border-2 border-ink dark:border-steel/40 shadow-hard bg-surface dark:bg-ink/10"
            >
                <table className="w-full text-left border-collapse min-w-[640px]" aria-label={`${activeTab} cooking temperatures`}>
                    <thead>
                        <tr className="bg-ink dark:bg-paper/10 text-paper dark:text-paper uppercase text-xs font-display tracking-wider">
                            <th scope="col" className="p-4 border-r border-gray-700 dark:border-steel/30 w-1/4">
                                Cut / Type
                            </th>
                            {donenessLabels.map(({ key, label }) => (
                                <th
                                    key={key}
                                    scope="col"
                                    className={`p-4 border-r last:border-r-0 border-gray-700 dark:border-steel/30 text-right w-1/6 ${key === "usdaSafe" ? "text-primary bg-gray-900 dark:bg-primary/20" : ""
                                        }`}
                                >
                                    <div className="flex items-center justify-end gap-2">
                                        {/* Doneness color bar */}
                                        <span
                                            className={`hidden sm:inline-block w-2.5 h-2.5 rounded-full ${donenessColors[key]}`}
                                            aria-hidden="true"
                                        />
                                        {label}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="text-sm font-medium divide-y divide-ink/10 dark:divide-steel/20">
                        {filteredCuts.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="p-8 text-center font-mono text-steel text-xs">
                                    No data for this category.
                                </td>
                            </tr>
                        ) : (
                            filteredCuts.map((cut, idx) => (
                                <tr
                                    key={cut.id}
                                    className={`group cursor-crosshair transition-colors hover:bg-paper/60 dark:hover:bg-paper/5 ${idx % 2 === 1 ? "bg-paper/40 dark:bg-paper/[0.02]" : "bg-surface dark:bg-transparent"
                                        }`}
                                >
                                    {/* Name cell */}
                                    <td className="p-4 border-r border-ink/10 dark:border-steel/20 font-bold font-display text-sm group-hover:text-primary transition-colors text-ink dark:text-paper">
                                        <div className="flex items-center gap-2">
                                            {cut.name}
                                            {/* USDA safe indicator on mobile (temps are copyable on desktop) */}
                                        </div>
                                    </td>

                                    {/* Temperature columns */}
                                    {donenessLabels.map(({ key }) => (
                                        <TemperatureCell
                                            key={key}
                                            fahrenheit={cut.temps[key]}
                                            isUsdaSafe={key === "usdaSafe"}
                                        />
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Source attribution */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
                <Badge variant="safe">USDA Verified</Badge>
                <p className="font-mono text-[10px] text-steel">
                    Safe minimum internal temperatures per{" "}
                    <a
                        href="https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/safe-temperature-chart"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-primary transition-colors"
                    >
                        USDA FSIS
                    </a>
                    . Rest meat 3 min after removing from heat.
                </p>
            </div>
        </section>
    );
}
