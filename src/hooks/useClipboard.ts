"use client";

import { useState, useCallback } from "react";
import { copyToClipboard } from "@/lib/clipboard";

/**
 * Hook that copies text to clipboard and provides a transient "copied" state.
 */
export function useClipboard(resetMs = 1500) {
    const [copied, setCopied] = useState(false);

    const copy = useCallback(
        async (text: string) => {
            const ok = await copyToClipboard(text);
            if (ok) {
                setCopied(true);
                setTimeout(() => setCopied(false), resetMs);
            }
            return ok;
        },
        [resetMs]
    );

    return { copied, copy };
}
