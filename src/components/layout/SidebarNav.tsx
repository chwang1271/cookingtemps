"use client";

import { NAV_ITEMS } from "@/lib/constants";
import { useScrollSpy } from "@/hooks/useScrollSpy";

export function SidebarNav() {
    const sectionIds = NAV_ITEMS.map((n) => n.id);
    const activeId = useScrollSpy(sectionIds);

    return (
        <aside className="hidden lg:flex w-64 flex-col fixed left-0 top-16 bottom-0 border-r-2 border-ink dark:border-steel/30 bg-paper dark:bg-bg-dark z-40 overflow-y-auto no-scrollbar transition-colors duration-200">
            <nav className="flex-1 py-8 px-6 space-y-1" aria-label="Section navigation">
                <h3 className="font-display text-[10px] font-bold text-steel tracking-widest mb-4 uppercase">
                    Modules
                </h3>
                <ul className="space-y-1 text-sm">
                    {NAV_ITEMS.map((item) => {
                        const isActive = activeId === item.id;
                        return (
                            <li key={item.id}>
                                <a
                                    href={`#${item.id}`}
                                    className={`block py-1.5 px-2 font-mono text-xs transition-colors ${isActive
                                            ? "text-primary font-bold"
                                            : "text-ink dark:text-paper hover:text-primary"
                                        }`}
                                >
                                    {isActive && (
                                        <span className="mr-1 text-primary" aria-hidden="true">
                                            ►
                                        </span>
                                    )}
                                    {item.label}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Status widget */}
            <div className="p-4 mb-4 mx-4 border-2 border-ink dark:border-steel/40 bg-surface dark:bg-ink/20 shadow-hard-sm">
                <div className="flex items-center justify-between mb-1">
                    <span className="font-display font-bold text-[10px] text-ink dark:text-paper uppercase tracking-wider">
                        Status
                    </span>
                    <span className="h-2 w-2 bg-safe rounded-full animate-pulse" aria-label="Online" />
                </div>
                <p className="text-[10px] text-steel font-mono leading-relaxed">
                    SYSTEM ONLINE
                    <br />
                    All temps USDA verified
                </p>
            </div>
        </aside>
    );
}
