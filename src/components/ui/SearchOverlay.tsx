"use client";

import { useEffect, useRef } from "react";
import { useSearch } from "@/providers/SearchProvider";
import { useTempUnit } from "@/providers/TempUnitProvider";
import { formatTemp } from "@/lib/tempConvert";
import { meats } from "@/data/meats";
import { oils } from "@/data/oils";
import { X } from "lucide-react";

// Build a flat searchable index from all data
function buildIndex(unit: ReturnType<typeof useTempUnit>["unit"]) {
    const results: { category: string; name: string; tempF: number }[] = [];

    meats.forEach((m) => {
        results.push({ category: m.category.toUpperCase(), name: m.name, tempF: m.temps.usdaSafe });
    });

    oils.forEach((o) => {
        results.push({ category: "OIL", name: o.name, tempF: o.smokePointF });
    });

    return results;
}

export function SearchOverlay() {
    const { isOpen, query, close, setQuery } = useSearch();
    const { unit } = useTempUnit();
    const inputRef = useRef<HTMLInputElement>(null);

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const index = buildIndex(unit);
    const q = query.trim().toLowerCase();
    const filtered = q
        ? index.filter(
            (r) =>
                r.name.toLowerCase().includes(q) ||
                r.category.toLowerCase().includes(q)
        )
        : index.slice(0, 8);

    return (
        <div
            className="fixed inset-0 z-[999] flex flex-col items-center justify-start bg-paper/95 dark:bg-bg-dark/95 pt-20 md:pt-28 px-4"
            role="dialog"
            aria-modal="true"
            aria-label="Search temperatures"
        >
            {/* Header */}
            <div className="w-full max-w-3xl flex justify-between items-end mb-4 border-b border-ink/20 pb-2">
                <span className="font-mono text-xs text-steel uppercase tracking-widest">
                    CMD LINE // v1.0
                </span>
                <div className="flex items-center gap-3">
                    <span className="font-mono text-xs bg-ink text-paper px-1.5 py-0.5">ESC</span>
                    <span className="font-mono text-xs text-ink dark:text-paper uppercase">Close</span>
                    <button onClick={close} aria-label="Close search" className="ml-2 text-steel hover:text-primary">
                        <X size={16} />
                    </button>
                </div>
            </div>

            {/* Input */}
            <div className="w-full max-w-3xl mb-8">
                <div className="flex items-baseline border-b-4 border-ink dark:border-paper pb-2 focus-within:border-primary transition-colors">
                    <span className="text-primary text-5xl md:text-7xl font-bold mr-4 select-none" aria-hidden="true">
                        &gt;
                    </span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="SEARCH..."
                        aria-label="Search cooking temperatures"
                        className="w-full bg-transparent border-none p-0 text-4xl md:text-6xl font-display font-bold text-ink dark:text-paper placeholder:text-steel/30 uppercase tracking-tight focus:ring-0 focus:outline-none"
                    />
                    <div className="h-10 w-5 md:h-14 md:w-7 bg-primary animate-pulse ml-2 shrink-0" aria-hidden="true" />
                </div>
                <div className="flex justify-between mt-2 font-mono text-xs text-steel">
                    <span>DATABASE: ONLINE</span>
                    <span>{index.length} RECORDS INDEXED</span>
                </div>
            </div>

            {/* Results */}
            <ul className="w-full max-w-3xl flex flex-col gap-1 overflow-y-auto max-h-[50vh] no-scrollbar pb-20">
                {filtered.length === 0 && (
                    <li className="font-mono text-sm text-steel py-4 text-center">
                        No results for &quot;{query}&quot;
                    </li>
                )}
                {filtered.map((r, i) => (
                    <li key={`${r.name}-${i}`}>
                        <button
                            onClick={close}
                            className={`group flex w-full flex-col md:flex-row items-start md:items-center justify-between p-3 md:px-4 border transition-none cursor-pointer ${i === 0
                                    ? "bg-highlight border-ink shadow-hard"
                                    : "bg-surface dark:bg-ink/10 border-transparent hover:bg-ink/5 dark:hover:bg-paper/10"
                                }`}
                        >
                            <div className="flex items-baseline gap-4 overflow-hidden">
                                <span
                                    className={`font-display font-bold text-xs tracking-wider shrink-0 min-w-[80px] ${i === 0 ? "text-primary" : "text-steel"
                                        }`}
                                >
                                    [{r.category}]
                                </span>
                                <span
                                    className={`font-mono text-lg font-bold truncate ${i === 0 ? "text-ink" : "text-ink dark:text-paper"
                                        }`}
                                >
                                    {r.name}
                                </span>
                            </div>
                            <div className="hidden md:block flex-grow mx-4 border-b-2 border-dotted border-ink/20 relative top-[-6px]" aria-hidden="true" />
                            <span className={`font-mono text-2xl font-bold shrink-0 ${i === 0 ? "text-ink" : "text-ink/70 dark:text-paper/70"}`}>
                                {formatTemp(r.tempF, unit)}
                            </span>
                        </button>
                    </li>
                ))}
            </ul>

            {/* Key legend */}
            <div className="absolute bottom-0 w-full bg-ink text-paper py-3 px-6 border-t-4 border-primary">
                <div className="flex flex-wrap gap-6 md:gap-12 justify-center font-mono text-xs">
                    {[["↑ ↓", "NAVIGATE"], ["ENTER", "SELECT"], ["ESC", "CLOSE"]].map(([key, label]) => (
                        <div key={key} className="flex items-center gap-2">
                            <span className="bg-paper/20 px-1.5 py-0.5 border border-paper/40">{key}</span>
                            <span className="text-paper/70">{label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
