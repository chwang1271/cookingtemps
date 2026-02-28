"use client";

import { useSearch } from "@/providers/SearchProvider";
import { useTempUnit } from "@/providers/TempUnitProvider";
import { useTheme } from "@/providers/ThemeProvider";
import type { TempUnit } from "@/providers/TempUnitProvider";
import { Search, Sun, Moon } from "lucide-react";

export function StickyHeader() {
    const { open: openSearch } = useSearch();
    const { unit, setUnit } = useTempUnit();
    const { resolved, setTheme } = useTheme();

    const toggleDark = () =>
        setTheme(resolved === "dark" ? "light" : "dark");

    const units: TempUnit[] = ["F", "C", "K"];

    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-paper dark:bg-bg-dark border-b-4 border-ink dark:border-steel/30 z-50 flex items-center px-4 md:px-8 justify-between transition-colors duration-200">
            {/* ── Logo ── */}
            <a href="#hero" className="flex items-center gap-3 shrink-0 group">
                <span
                    className="material-symbols-outlined text-3xl text-primary font-bold select-none"
                    aria-hidden="true"
                >
                    outdoor_grill
                </span>
                <span className="font-display font-bold text-xl tracking-tighter uppercase text-ink dark:text-paper">
                    CookingTemps
                    <span className="text-primary">.com</span>
                </span>
            </a>

            {/* ── Right controls ── */}
            <div className="flex items-center gap-2 md:gap-3">
                {/* Temp unit toggle (desktop) */}
                <div className="hidden sm:flex items-center border-2 border-ink dark:border-steel/40 overflow-hidden">
                    {units.map((u) => (
                        <button
                            key={u}
                            onClick={() => setUnit(u)}
                            aria-label={`Switch to ${u === "F" ? "Fahrenheit" : u === "C" ? "Celsius" : "Kelvin"}`}
                            className={`px-3 py-1.5 text-xs font-mono font-bold transition-colors border-r-2 last:border-r-0 border-ink dark:border-steel/40 ${unit === u
                                    ? "bg-ink dark:bg-paper text-paper dark:text-ink"
                                    : "bg-surface dark:bg-bg-dark text-ink dark:text-paper hover:bg-highlight hover:text-ink"
                                }`}
                        >
                            °{u}
                        </button>
                    ))}
                </div>

                {/* Search trigger */}
                <button
                    onClick={openSearch}
                    aria-label="Open search (Cmd+K)"
                    className="flex items-center gap-2 border-2 border-ink dark:border-steel/40 bg-surface dark:bg-bg-dark px-3 py-1.5 hover:border-primary hover:shadow-hard-sm transition-all active:translate-x-px active:translate-y-px"
                >
                    <Search size={16} className="text-ink dark:text-paper" />
                    <span className="hidden md:block font-mono text-xs text-steel">CMD+K</span>
                </button>

                {/* Dark mode toggle */}
                <button
                    onClick={toggleDark}
                    aria-label={resolved === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                    className="border-2 border-ink dark:border-steel/40 bg-surface dark:bg-bg-dark p-2 hover:bg-ink hover:text-paper dark:hover:bg-paper dark:hover:text-ink transition-colors"
                >
                    {resolved === "dark" ? (
                        <Sun size={16} className="text-paper" />
                    ) : (
                        <Moon size={16} className="text-ink" />
                    )}
                </button>
            </div>
        </header>
    );
}
