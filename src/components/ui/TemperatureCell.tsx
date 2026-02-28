"use client";

import { showToast } from "@/components/ui/Toast";
import { useClipboard } from "@/hooks/useClipboard";
import { formatTemp } from "@/lib/tempConvert";
import { useTempUnit } from "@/providers/TempUnitProvider";
import { cn } from "@/lib/utils";

interface TemperatureCellProps {
    /** Temperature in °F (canonical). Pass undefined to show "—" */
    fahrenheit?: number;
    /** Whether this is the USDA Safe column (highlighted) */
    isUsdaSafe?: boolean;
    className?: string;
}

export function TemperatureCell({
    fahrenheit,
    isUsdaSafe = false,
    className,
}: TemperatureCellProps) {
    const { unit } = useTempUnit();
    const { copy } = useClipboard();

    if (fahrenheit === undefined) {
        return (
            <td
                className={cn(
                    "p-4 text-right font-mono tabular-nums text-steel border-r border-ink/20 dark:border-steel/20",
                    isUsdaSafe && "bg-primary/5 dark:bg-primary/10",
                    className
                )}
                aria-label="Not applicable"
            >
                —
            </td>
        );
    }

    const formatted = formatTemp(fahrenheit, unit);

    const handleCopy = async () => {
        await copy(formatted);
        showToast(`Copied ${formatted}!`);
    };

    return (
        <td
            className={cn(
                "p-4 text-right font-mono tabular-nums border-r border-ink/20 dark:border-steel/20",
                "cursor-copy select-none transition-colors",
                isUsdaSafe
                    ? "text-primary font-bold bg-primary/5 dark:bg-primary/10 group-hover:bg-primary/15"
                    : "text-ink dark:text-paper group-hover:text-primary",
                className
            )}
            title={`Click to copy ${formatted}`}
            onClick={handleCopy}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleCopy()}
            aria-label={`${formatted} — click to copy`}
        >
            {formatted}
        </td>
    );
}
