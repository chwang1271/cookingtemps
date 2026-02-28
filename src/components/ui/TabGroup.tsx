"use client";

import { cn } from "@/lib/utils";

interface Tab {
    id: string;
    label: string;
}

interface TabGroupProps {
    tabs: Tab[];
    activeTab: string;
    onTabChange: (id: string) => void;
    className?: string;
}

export function TabGroup({ tabs, activeTab, onTabChange, className }: TabGroupProps) {
    return (
        <div
            role="tablist"
            aria-label="Category tabs"
            className={cn(
                "flex flex-wrap gap-1 mb-6",
                className
            )}
        >
            {tabs.map((tab) => {
                const isActive = tab.id === activeTab;
                return (
                    <button
                        key={tab.id}
                        role="tab"
                        aria-selected={isActive}
                        aria-controls={`tabpanel-${tab.id}`}
                        id={`tab-${tab.id}`}
                        onClick={() => onTabChange(tab.id)}
                        className={cn(
                            "px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider border-2 transition-all",
                            isActive
                                ? "bg-ink dark:bg-paper text-paper dark:text-ink border-ink dark:border-paper"
                                : "bg-surface dark:bg-bg-dark text-ink dark:text-paper border-ink/30 dark:border-steel/30 hover:border-ink dark:hover:border-paper hover:bg-highlight hover:text-ink"
                        )}
                    >
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
}
