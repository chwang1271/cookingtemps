"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handler = () => setVisible(window.scrollY > 500);
        window.addEventListener("scroll", handler, { passive: true });
        return () => window.removeEventListener("scroll", handler);
    }, []);

    const scrollToTop = () =>
        window.scrollTo({ top: 0, behavior: "smooth" });

    if (!visible) return null;

    return (
        <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="fixed bottom-6 right-24 lg:right-6 h-12 w-12 bg-ink dark:bg-paper text-paper dark:text-ink border-2 border-ink dark:border-paper shadow-hard flex items-center justify-center z-40 hover:-translate-y-1 hover:shadow-[4px_6px_0px_0px_#181211] active:translate-y-0 active:shadow-hard transition-all"
        >
            <ChevronUp size={20} />
        </button>
    );
}
