"use client";

import Link from "next/link";
import { NAV_ITEMS } from "@/lib/constants";

export function Footer() {
    return (
        <footer className="border-t-4 border-ink dark:border-steel/30 bg-ink text-paper mt-0">
            {/* Main footer body */}
            <div className="max-w-5xl mx-auto px-6 md:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Col 1 – Brand */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <span
                            className="material-symbols-outlined text-2xl text-primary"
                            aria-hidden="true"
                        >
                            outdoor_grill
                        </span>
                        <span className="font-display font-bold text-base tracking-tighter uppercase">
                            CookingTemps<span className="text-primary">.com</span>
                        </span>
                    </div>
                    <p className="font-mono text-xs text-steel leading-relaxed max-w-xs">
                        The trusted temperature reference for home cooks and professionals.
                        Every temperature you need, all in one place.
                    </p>
                </div>

                {/* Col 2 – Quick links */}
                <div>
                    <h3 className="font-display text-[10px] font-bold text-steel tracking-widest uppercase mb-4">
                        Quick Nav
                    </h3>
                    <ul className="space-y-2">
                        {NAV_ITEMS.slice(0, 6).map((item) => (
                            <li key={item.id}>
                                <a
                                    href={`#${item.id}`}
                                    className="font-mono text-xs text-paper/70 hover:text-primary transition-colors"
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Col 3 – Email capture */}
                <div>
                    <h3 className="font-display text-[10px] font-bold text-steel tracking-widest uppercase mb-4">
                        Stay Updated
                    </h3>
                    <p className="font-mono text-xs text-paper/70 mb-4">
                        New temperature guides and tools — straight to your inbox.
                    </p>
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="flex gap-0"
                        aria-label="Newsletter signup"
                    >
                        <input
                            type="email"
                            placeholder="your@email.com"
                            aria-label="Email address"
                            className="flex-1 bg-paper/10 border-2 border-paper/30 focus:border-primary px-3 py-2 font-mono text-xs text-paper placeholder:text-steel focus:outline-none transition-colors"
                        />
                        <button
                            type="submit"
                            className="bg-primary border-2 border-primary text-paper font-mono font-bold text-xs px-4 py-2 hover:bg-primary/80 transition-colors shrink-0"
                        >
                            SUB
                        </button>
                    </form>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-paper/10 py-4 px-6 md:px-8">
                <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono text-steel">
                    <span>© 2026 CookingTemps.com</span>
                    <span className="text-center">
                        All temperatures verified against USDA/FDA guidelines. For commercial food safety, consult a licensed professional.
                    </span>
                    <div className="flex gap-4">
                        <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
