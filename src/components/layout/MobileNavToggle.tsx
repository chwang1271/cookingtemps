"use client";

import { useState } from "react";
import { NAV_ITEMS } from "@/lib/constants";
import { Menu, X } from "lucide-react";
import { useTempUnit } from "@/providers/TempUnitProvider";
import type { TempUnit } from "@/providers/TempUnitProvider";

export function MobileNavToggle() {
    const [isOpen, setIsOpen] = useState(false);
    const { unit, setUnit } = useTempUnit();

    const units: TempUnit[] = ["F", "C", "K"];

    return (
        <>
            {/* Floating action button */}
            <button
                onClick={() => setIsOpen((v) => !v)}
                aria-label={isOpen ? "Close navigation" : "Open navigation"}
                aria-expanded={isOpen}
                className="lg:hidden fixed bottom-6 right-6 h-14 w-14 bg-primary text-paper border-2 border-ink shadow-hard flex items-center justify-center z-50 active:translate-y-1 active:shadow-none transition-all rounded-full"
            >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Drawer */}
            {isOpen && (
                <div className="lg:hidden fixed inset-0 z-40" role="dialog" aria-label="Site navigation">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-ink/50"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Panel */}
                    <nav className="absolute bottom-0 left-0 right-0 bg-paper dark:bg-bg-dark border-t-4 border-ink dark:border-steel/30 p-6 pb-24">
                        {/* Temp unit toggle */}
                        <div className="flex items-center gap-2 mb-6 border-b-2 border-ink/20 pb-4">
                            <span className="font-mono text-xs text-steel uppercase tracking-wider mr-2">
                                Unit:
                            </span>
                            {units.map((u) => (
                                <button
                                    key={u}
                                    onClick={() => setUnit(u)}
                                    className={`px-3 py-1 text-xs font-mono font-bold border-2 border-ink transition-colors ${unit === u
                                            ? "bg-ink text-paper"
                                            : "bg-surface text-ink hover:bg-highlight"
                                        }`}
                                >
                                    °{u}
                                </button>
                            ))}
                        </div>

                        <ul className="grid grid-cols-2 gap-2">
                            {NAV_ITEMS.map((item) => (
                                <li key={item.id}>
                                    <a
                                        href={`#${item.id}`}
                                        onClick={() => setIsOpen(false)}
                                        className="block py-2 px-3 font-mono text-xs font-bold uppercase text-ink dark:text-paper border border-ink/20 dark:border-steel/20 hover:bg-highlight hover:text-ink transition-colors"
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            )}
        </>
    );
}
