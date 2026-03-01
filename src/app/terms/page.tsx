import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Terms of Service — CookingTemps.com",
    description: "Terms of service for CookingTemps.com — the rules governing use of our cooking temperature reference tool.",
    alternates: { canonical: "https://cookingtemps.com/terms" },
};

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-paper dark:bg-bg-dark text-ink dark:text-paper font-mono">
            <div className="max-w-3xl mx-auto px-6 py-16">

                {/* Back link */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 font-mono text-xs text-steel hover:text-primary transition-colors mb-10 uppercase tracking-widest"
                >
                    ← Back to CookingTemps.com
                </Link>

                <h1 className="font-display font-bold text-4xl uppercase tracking-tight text-ink dark:text-paper mb-2">
                    Terms of Service
                </h1>
                <p className="text-sm text-steel mb-12">Last updated: February 28, 2026</p>

                <div className="space-y-10 text-sm leading-relaxed text-ink/80 dark:text-paper/80">

                    <section>
                        <h2 className="font-display font-bold text-base uppercase tracking-wide text-ink dark:text-paper mb-3">
                            1. Acceptance of Terms
                        </h2>
                        <p>
                            By accessing or using CookingTemps.com ("the site," "we," "our"), you
                            agree to be bound by these Terms of Service. If you do not agree to
                            these terms, please do not use the site.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-base uppercase tracking-wide text-ink dark:text-paper mb-3">
                            2. Use of the Site
                        </h2>
                        <p className="mb-3">
                            CookingTemps.com is a free reference tool intended for informational
                            purposes. You may use the site for personal, non-commercial purposes
                            subject to these terms. You agree not to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 pl-2">
                            <li>Scrape, crawl, or systematically extract data from the site without permission</li>
                            <li>Use the site for any unlawful purpose</li>
                            <li>Attempt to interfere with the site's operation or security</li>
                            <li>Reproduce or republish our content without attribution</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-base uppercase tracking-wide text-ink dark:text-paper mb-3">
                            3. Informational Purpose Only
                        </h2>
                        <p>
                            All temperature data, cooking guides, and reference information on
                            CookingTemps.com is provided for general informational purposes only.
                            While we strive to keep all data accurate and up to date — including
                            referencing USDA and FDA guidelines — this site is not a substitute for
                            professional food safety advice or training.
                        </p>
                        <p className="mt-3">
                            For commercial food preparation, catering, or food service operations,
                            always consult a licensed food safety professional and comply with all
                            applicable local regulations.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-base uppercase tracking-wide text-ink dark:text-paper mb-3">
                            4. Disclaimer of Warranties
                        </h2>
                        <p>
                            The site and all content are provided "as is" without warranty of any
                            kind, express or implied. We do not warrant that the site will be
                            uninterrupted, error-free, or that any information is complete,
                            accurate, or current. Your use of the site is at your own risk.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-base uppercase tracking-wide text-ink dark:text-paper mb-3">
                            5. Limitation of Liability
                        </h2>
                        <p>
                            To the fullest extent permitted by law, CookingTemps.com and its
                            operators shall not be liable for any indirect, incidental, special,
                            consequential, or punitive damages arising from your use of, or
                            inability to use, the site or any content therein — including but not
                            limited to foodborne illness, property damage, or personal injury
                            resulting from reliance on information provided on this site.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-base uppercase tracking-wide text-ink dark:text-paper mb-3">
                            6. Affiliate Disclosure
                        </h2>
                        <p>
                            CookingTemps.com is a participant in the Amazon Services LLC Associates
                            Program. Some links on this site are affiliate links — if you click
                            on one and make a purchase, we may earn a commission at no additional
                            cost to you. This helps support the site and allows us to keep it free.
                            Our editorial recommendations are not influenced by affiliate
                            relationships.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-base uppercase tracking-wide text-ink dark:text-paper mb-3">
                            7. Intellectual Property
                        </h2>
                        <p>
                            The design, code, and original content of CookingTemps.com are the
                            property of their respective owners. Reference data sourced from USDA,
                            FDA, and similar public-domain authorities is freely available but
                            credited appropriately. You may share or cite temperature data for
                            educational purposes with attribution to CookingTemps.com.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-base uppercase tracking-wide text-ink dark:text-paper mb-3">
                            8. Third-Party Links
                        </h2>
                        <p>
                            The site contains links to third-party websites (including Amazon and
                            reference sources such as USDA). These links are provided for
                            convenience only. We are not responsible for the content, privacy
                            practices, or accuracy of any third-party site.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-base uppercase tracking-wide text-ink dark:text-paper mb-3">
                            9. Changes to Terms
                        </h2>
                        <p>
                            We reserve the right to update these Terms at any time. Changes will
                            be reflected in the "Last updated" date above. Continued use of the
                            site after changes constitutes your acceptance of the revised Terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-base uppercase tracking-wide text-ink dark:text-paper mb-3">
                            10. Governing Law
                        </h2>
                        <p>
                            These Terms are governed by and construed in accordance with applicable
                            laws. Any disputes arising from use of the site shall be subject to
                            the exclusive jurisdiction of the courts in the applicable jurisdiction.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-base uppercase tracking-wide text-ink dark:text-paper mb-3">
                            11. Contact
                        </h2>
                        <p>
                            For any questions about these Terms, please contact us via{" "}
                            <a
                                href="https://cookingtemps.com"
                                className="text-primary underline"
                            >
                                cookingtemps.com
                            </a>
                            .
                        </p>
                    </section>

                </div>

                {/* Bottom links */}
                <div className="mt-16 pt-8 border-t border-ink/10 dark:border-steel/20 flex gap-6 text-xs text-steel">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                </div>
            </div>
        </main>
    );
}
