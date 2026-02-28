import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface BadgeProps {
    children: ReactNode;
    variant?: "default" | "primary" | "safe" | "danger" | "caution";
    className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
    const variants: Record<NonNullable<BadgeProps["variant"]>, string> = {
        default: "bg-ink text-paper dark:bg-paper dark:text-ink",
        primary: "bg-primary text-paper",
        safe: "bg-safe text-paper",
        danger: "bg-danger text-paper",
        caution: "bg-caution text-ink",
    };

    return (
        <span
            className={cn(
                "font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 inline-block",
                variants[variant],
                className
            )}
        >
            {children}
        </span>
    );
}
