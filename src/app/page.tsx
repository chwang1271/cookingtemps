import { Footer } from "@/components/layout/Footer";
import { MeatPoultrySection } from "@/components/sections/MeatPoultrySection";
import { ConverterSection } from "@/components/sections/ConverterSection";
import { DangerZoneSection } from "@/components/sections/DangerZoneSection";
import { SmokePointsSection } from "@/components/sections/SmokePointsSection";
import { OvenTempsSection } from "@/components/sections/OvenTempsSection";
import { CookingMethodsSection } from "@/components/sections/CookingMethodsSection";
import { SugarStagesSection } from "@/components/sections/SugarStagesSection";
import { BakingSection } from "@/components/sections/BakingSection";
import { BeveragesSection } from "@/components/sections/BeveragesSection";
import { FunFactsSection } from "@/components/sections/FunFactsSection";
import { GearSection } from "@/components/sections/GearSection";

export default function HomePage() {
  return (
    <>
      <main className="font-mono text-ink dark:text-paper bg-paper dark:bg-bg-dark">
        {/* ── Hero placeholder ── */}
        <section
          id="hero"
          className="min-h-[calc(100vh-4rem)] flex items-center justify-center border-b-4 border-ink dark:border-steel/30"
        >
          <div className="text-center px-8">
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight uppercase text-ink dark:text-paper mb-4">
              Every Temperature
              <br />
              <span className="text-primary">You Need.</span>
            </h1>
            <p className="font-mono text-steel text-sm md:text-base max-w-xl mx-auto">
              From rare steak to hard crack candy — the trusted reference for home
              cooks and professionals.
            </p>
          </div>
        </section>

        {/* ── Section: Meat & Poultry ── */}
        <div className="border-b-2 border-ink/10 dark:border-steel/20">
          <MeatPoultrySection />
        </div>

        {/* ── Section: Unit Converter ── */}
        <div className="border-b-2 border-ink/10 dark:border-steel/20 bg-ink dark:bg-paper/5">
          <ConverterSection />
        </div>

        {/* ── Section: Oven Temps ── */}
        <div className="border-b-2 border-ink/10 dark:border-steel/20">
          <OvenTempsSection />
        </div>

        {/* ── Section: Danger Zone ── */}
        <div className="border-b-2 border-ink/10 dark:border-steel/20 bg-ink dark:bg-paper/5">
          <DangerZoneSection />
        </div>

        {/* ── Section: Cooking Methods ── */}
        <div className="border-b-2 border-ink/10 dark:border-steel/20">
          <CookingMethodsSection />
        </div>

        {/* ── Section: Smoke Points ── */}
        <div className="border-b-2 border-ink/10 dark:border-steel/20 bg-ink dark:bg-paper/5">
          <SmokePointsSection />
        </div>

        {/* ── Section: Sugar Stages ── */}
        <div className="border-b-2 border-ink/10 dark:border-steel/20">
          <SugarStagesSection />
        </div>

        {/* ── Section: Baking ── */}
        <div className="border-b-2 border-ink/10 dark:border-steel/20 bg-ink dark:bg-paper/5">
          <BakingSection />
        </div>

        {/* ── Section: Beverages ── */}
        <div className="border-b-2 border-ink/10 dark:border-steel/20">
          <BeveragesSection />
        </div>

        {/* ── Section: Fun Facts ── */}
        <div className="border-b-2 border-ink/10 dark:border-steel/20 bg-ink dark:bg-paper/5">
          <FunFactsSection />
        </div>

        {/* ── Section: Gear Affiliate ── */}
        <div className="border-b-4 border-ink dark:border-steel/40">
          <GearSection />
        </div>
      </main>
      <Footer />
    </>
  );
}

