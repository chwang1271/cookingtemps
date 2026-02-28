"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Tracks which section is currently in-viewport for sidebar active state.
 * Observes all elements matching the given IDs.
 */
export function useScrollSpy(sectionIds: string[]) {
    const [activeId, setActiveId] = useState<string>("");
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        observer.current = new IntersectionObserver(
            (entries) => {
                // Pick the most intersecting entry
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

                if (visible.length > 0) {
                    setActiveId(visible[0].target.id);
                }
            },
            {
                rootMargin: "-80px 0px -60% 0px", // offset for sticky header
                threshold: [0, 0.25, 0.5],
            }
        );

        const elements = sectionIds
            .map((id) => document.getElementById(id))
            .filter(Boolean) as HTMLElement[];

        elements.forEach((el) => observer.current?.observe(el));

        return () => observer.current?.disconnect();
    }, [sectionIds]);

    return activeId;
}
