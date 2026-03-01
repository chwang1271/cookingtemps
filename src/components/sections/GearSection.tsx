"use client";

import Image from "next/image";
import { products, type Product } from "@/data/products";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ExternalLink, ShoppingCart, Star, Zap } from "lucide-react";

/* ── Star rating strip (based on customer reception) ─────────────────── */
const RATINGS: Record<string, number> = {
    "javelin-pro-duo": 5,
    "thermopop-2": 4,
    "thermapen-one": 5,
    "thermapen-classic": 5,
    "tempspike-twin": 4,
    "etekcity-ir": 4,
};

function StarRating({ id }: { id: string }) {
    const score = RATINGS[id] ?? 4;
    return (
        <div className="flex items-center gap-0.5" aria-label={`Rated ${score} out of 5 stars`}>
            {[1, 2, 3, 4, 5].map((i) => (
                <Star
                    key={i}
                    size={12}
                    className={i <= score ? "fill-primary text-primary" : "text-ink/20 dark:text-paper/20"}
                    aria-hidden="true"
                />
            ))}
        </div>
    );
}

/* ── Product image with fallback ─────────────────────────────────────── */
function ProductImage({ product }: { product: Product }) {
    const hasRealImage =
        product.imageUrl.startsWith("http") ||
        (product.imageUrl.startsWith("/images/") && !product.imageUrl.includes("placeholder"));

    if (hasRealImage) {
        // eslint-disable-next-line @next/next/no-img-element
        return (
            <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-44 object-cover transition-all duration-300"
            />
        );
    }

    // Placeholder for products without an image yet
    return (
        <div className="w-full h-44 bg-paper/80 dark:bg-ink/40 flex items-center justify-center">
            <div className="text-center">
                <Zap size={32} className="text-ink/20 dark:text-paper/20 mx-auto mb-2" />
                <span className="font-mono text-[10px] text-steel uppercase tracking-widest">
                    {product.name}
                </span>
            </div>
        </div>
    );
}

/* ── Spec pill (accuracy / range) ────────────────────────────────────── */
function SpecPill({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center gap-1.5 border border-ink/15 dark:border-steel/25 px-2 py-1">
            <span className="font-mono text-[9px] uppercase tracking-widest text-steel">{label}</span>
            <span className="font-mono text-[10px] font-bold text-primary">{value}</span>
        </div>
    );
}

/* ── Badge config per variant ───────────────────────────────────── */
const BADGE_CONFIG: Record<
    NonNullable<Product["badge"]>,
    { label: string; ribbon: string; border: string; btn: string }
> = {
    "Most Popular": { label: "★ MOST POPULAR", ribbon: "bg-primary text-paper", border: "border-primary shadow-[2px_2px_0px_0px_var(--color-primary)]", btn: "bg-primary text-paper border-primary hover:bg-primary/90" },
    "Budget Pick": { label: "★ BUDGET PICK", ribbon: "bg-safe text-paper", border: "border-safe shadow-[2px_2px_0px_0px_var(--color-safe)]", btn: "bg-safe text-paper border-safe hover:bg-safe/90" },
    "High-End Pick": { label: "★ HIGH-END PICK", ribbon: "bg-caution text-paper", border: "border-caution shadow-[2px_2px_0px_0px_var(--color-caution)]", btn: "bg-caution text-paper border-caution hover:bg-caution/90" },
    "Professional Pick": { label: "★ PROFESSIONAL PICK", ribbon: "bg-ink text-paper dark:bg-paper dark:text-ink", border: "border-ink dark:border-steel", btn: "bg-ink text-paper border-ink dark:bg-paper dark:text-ink dark:border-paper hover:opacity-80" },
};

/* ── Individual product card ─────────────────────────────────────────── */
function ProductCard({ product }: { product: Product }) {
    const badgeCfg = product.badge ? BADGE_CONFIG[product.badge] : null;

    return (
        <div
            className={cn(
                "group relative flex flex-col border-2 overflow-hidden transition-all",
                "hover:shadow-hard hover:-translate-y-0.5",
                badgeCfg ? badgeCfg.border : "border-ink/30 dark:border-steel/40"
            )}
            aria-label={product.name}
        >
            {/* Badge ribbon */}
            {badgeCfg && (
                <div className={cn("absolute top-3 left-0 z-10 font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5", badgeCfg.ribbon)}>
                    {badgeCfg.label}
                </div>
            )}

            {/* Product image */}
            <ProductImage product={product} />

            {/* Card body */}
            <div className="flex flex-col gap-3 p-4 flex-1 bg-surface dark:bg-ink/10">
                {/* Category + name + stars */}
                <div>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-steel border border-ink/15 dark:border-steel/25 px-1.5 py-0.5 inline-block mb-1">
                        {product.category}
                    </span>
                    <StarRating id={product.id} />
                    <h3 className="font-display font-bold text-base uppercase tracking-wide text-ink dark:text-paper mt-1 group-hover:text-primary transition-colors">
                        {product.name}
                    </h3>
                    <p className="font-mono text-[11px] text-steel leading-relaxed mt-1">
                        {product.description}
                    </p>
                </div>

                {/* Spec pills */}
                {(product.accuracy || product.range) && (
                    <div className="flex flex-wrap gap-2">
                        {product.accuracy && <SpecPill label="Accuracy" value={product.accuracy} />}
                        {product.range && <SpecPill label="Range" value={product.range} />}
                    </div>
                )}

                {/* Price + CTA */}
                <div className="flex items-center justify-between gap-2 mt-auto pt-3 border-t border-ink/10 dark:border-steel/20">
                    <span className="font-mono text-xl font-bold text-ink dark:text-paper tabular-nums">
                        {product.price}
                    </span>
                    <a
                        href={product.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        aria-label={`Buy ${product.name} (affiliate link)`}
                        className={cn(
                            "flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider px-3 py-2",
                            "transition-all border-2",
                            badgeCfg ? badgeCfg.btn : "bg-ink text-paper border-ink dark:bg-paper dark:text-ink dark:border-paper hover:opacity-80"
                        )}
                    >
                        <ShoppingCart size={12} aria-hidden="true" />
                        Buy
                        <ExternalLink size={10} aria-hidden="true" />
                    </a>
                </div>
            </div>
        </div>
    );
}

/* ── Affiliate disclosure ─────────────────────────────────────────────── */
function AffiliateDisclosure() {
    return (
        <div className="flex items-start gap-2 border border-ink/15 dark:border-steel/25 p-3 mb-8 bg-paper/60 dark:bg-ink/20">
            <span className="material-symbols-outlined text-steel text-base shrink-0 mt-0.5" aria-hidden="true">
                info
            </span>
            <p className="font-mono text-[10px] text-steel leading-relaxed">
                <strong className="text-ink dark:text-paper">Affiliate disclosure:</strong> Some links on this page are affiliate links. If you make a purchase through them, CookingTemps.com may earn a small commission at no extra cost to you. Shopping through these links helps support the site so we can keep creating helpful guides—thank you!
            </p>
        </div>
    );
}

/* ── Main Section ─────────────────────────────────────────────────────── */
export function GearSection() {
    return (
        <section
            id={SECTION_IDS.products}
            className="scroll-mt-24 max-w-5xl mx-auto px-4 md:px-8 py-12"
            aria-labelledby="gear-heading"
        >
            <SectionHeader
                title="Recommended Gear"
                refCode="GEAR-01"
                aside={
                    <Badge variant="primary">RECOMMENDED GEAR</Badge>
                }
            />

            <p className="font-mono text-xs text-steel mb-4 max-w-2xl leading-relaxed">
                The right thermometer changes everything. To help you hit the temperatures in this guide, we&apos;ve rounded up some of the top-rated options based entirely on positive customer reviews. Accuracy listed is manufacturer-specified.
            </p>

            {/* Disclosure */}
            <AffiliateDisclosure />

            {/* Product grid */}
            <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                role="list"
                aria-label="Recommended thermometers and gear"
            >
                {products.map((product) => (
                    <div key={product.id} role="listitem">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>

            {/* Bottom note */}
            <p className="font-mono text-[10px] text-steel mt-6 text-center">
                Prices subject to change · Links open Amazon / brand sites
            </p>
        </section>
    );
}
