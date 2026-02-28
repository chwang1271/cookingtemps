"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Tracks which section currently dominates the viewport.
 *
 * Strategy: on every scroll (throttled via rAF), collect the bounding rect
 * of each observed section. The "active" section is the one whose top edge
 * is closest to — but still above — a trigger line 40% from the top of the
 * viewport. This means:
 *   - Short sections activate as soon as their heading crosses the trigger.
 *   - Tall sections (Smoke Points, Sugar Stages, etc.) stay active the whole
 *     time they fill the screen.
 *   - No false positives from IntersectionObserver rootMargin clipping.
 */

const HEADER_OFFSET = 80; // sticky header height in px

export function useScrollSpy(sectionIds: string[]) {
    const [activeId, setActiveId] = useState<string>("");

    const update = useCallback(() => {
        // Trigger line: 40% from top of viewport (below the header area)
        const triggerY = window.innerHeight * 0.4;

        let bestId = "";
        let bestDelta = Infinity;

        for (const id of sectionIds) {
            const el = document.getElementById(id);
            if (!el) continue;

            const top = el.getBoundingClientRect().top - HEADER_OFFSET;

            // delta = how far the section top is ABOVE the trigger line.
            // We want the section whose top crossed the trigger most recently
            // (smallest positive delta = most recently scrolled past trigger).
            const delta = triggerY - top;
            if (delta >= 0 && delta < bestDelta) {
                bestDelta = delta;
                bestId = id;
            }
        }

        if (bestId) setActiveId(bestId);
    }, [sectionIds]);

    useEffect(() => {
        let rafId: number;

        const onScroll = () => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(update);
        };

        // Set initial active section after mount
        update();

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            cancelAnimationFrame(rafId);
        };
    }, [update]);

    return activeId;
}
