"use client";

import Image from "next/image";
import { products, type Product } from "@/data/products";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ExternalLink, ShoppingCart, Star, Zap } from "lucide-react";

/* ── Star rating strip (static editorial scores) ─────────────────────── */
const RATINGS: Record<string, number> = {
    "thermapen-one": 5,
    "ir-gun": 4,
    "meater-plus": 4,
    "thermoworks-smoke": 5,
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
    const isExternal = product.imageUrl.startsWith("http");

    if (isExternal) {
        // eslint-disable-next-line @next/next/no-img-element
        return (
            <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-44 object-contain bg-paper p-4 grayscale group-hover:grayscale-0 transition-all duration-300"
            />
        );
    }

    // Placeholder for local images
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

/* ── Individual product card ─────────────────────────────────────────── */
function ProductCard({ product }: { product: Product }) {
    const isEditorsPick = product.badge === "Editor's Pick";

    return (
        <div
            className={cn(
                "group relative flex flex-col border-2 overflow-hidden transition-all",
                "hover:shadow-hard hover:-translate-y-0.5",
                isEditorsPick
                    ? "border-primary shadow-[2px_2px_0px_0px_var(--color-primary)]"
                    : "border-ink/30 dark:border-steel/40"
            )}
            aria-label={product.name}
        >
            {/* Editor's Pick ribbon */}
            {isEditorsPick && (
                <div className="absolute top-3 left-0 z-10 bg-primary text-paper font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5">
                    ★ EDITOR'S PICK
                </div>
            )}

            {/* Product image */}
            <ProductImage product={product} />

            {/* Card body */}
            <div className="flex flex-col gap-3 p-4 flex-1 bg-surface dark:bg-ink/10">
                {/* Name + stars */}
                <div>
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
                            isEditorsPick
                                ? "bg-primary text-paper border-primary hover:bg-primary/90"
                                : "bg-ink text-paper border-ink dark:bg-paper dark:text-ink dark:border-paper hover:opacity-80"
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
                <strong className="text-ink dark:text-paper">Affiliate disclosure:</strong> Some links on this
                page are affiliate links. If you make a purchase through them, CookingTemps.com may earn a
                small commission at no extra cost to you. We only recommend gear we actually use and trust.
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
                    <Badge variant="primary">EDITOR-TESTED</Badge>
                }
            />

            <p className="font-mono text-xs text-steel mb-4 max-w-2xl leading-relaxed">
                The right thermometer changes everything. These are the tools we trust — tested against the
                temperatures in this guide. Accuracy listed is manufacturer-specified.
            </p>

            {/* Disclosure */}
            <AffiliateDisclosure />

            {/* Product grid */}
            <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
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
                Prices subject to change · Last verified February 2026 · Links open Amazon / brand sites
            </p>
        </section>
    );
}
