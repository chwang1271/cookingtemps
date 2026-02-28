import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionHeaderProps {
    title: string;
    refCode?: string;
    /** If true, title renders in primary (red) */
    danger?: boolean;
    /** Additional content rendered to the right of the title */
    aside?: ReactNode;
    className?: string;
}

export function SectionHeader({
    title,
    refCode,
    danger = false,
    aside,
    className,
}: SectionHeaderProps) {
    return (
        <div
            className={cn(
                "flex items-end justify-between mb-6 border-b-2 border-ink dark:border-steel/40 pb-3",
                className
            )}
        >
            <h2
                className={cn(
                    "font-display text-3xl md:text-4xl font-bold tracking-tight uppercase",
                    danger ? "text-primary" : "text-ink dark:text-paper"
                )}
            >
                {title}
            </h2>
            <div className="flex items-center gap-3">
                {aside}
                {refCode && (
                    <span className="font-mono text-[10px] bg-ink dark:bg-paper text-paper dark:text-ink px-2 py-1 shrink-0">
                        {refCode}
                    </span>
                )}
            </div>
        </div>
    );
}
