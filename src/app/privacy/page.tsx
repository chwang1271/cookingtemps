import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Privacy Policy — CookingTemps.com",
    description: "Privacy policy for CookingTemps.com — how we handle your data.",
    alternates: { canonical: "https://cookingtemps.com/privacy" },
};

export default function PrivacyPage() {
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
                    Privacy Policy
                </h1>
                <p className="text-sm text-steel mb-12">Last updated: February 28, 2026</p>

                <div className="space-y-10 text-sm leading-relaxed text-ink/80 dark:text-paper/80">

                    <section>
                        <h2 className="font-display font-bold text-base uppercase tracking-wide text-ink dark:text-paper mb-3">
                            1. Overview
                        </h2>
                        <p>
                            CookingTemps.com ("we," "our," or "the site") is a free cooking temperature
                            reference tool. We are committed to protecting your privacy. This policy
                            explains what information we collect, how it is used, and your rights
                            regarding that information.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-base uppercase tracking-wide text-ink dark:text-paper mb-3">
                            2. Information We Collect
                        </h2>
                        <p className="mb-3">We collect minimal information:</p>
                        <ul className="list-disc list-inside space-y-2 pl-2">
                            <li>
                                <strong>Usage data</strong> — anonymous analytics (page views, visit
                                duration, browser type) via third-party analytics tools such as Google
                                Analytics or similar services.
                            </li>
                            <li>
                                <strong>Local storage</strong> — your theme preference (light/dark) and
                                temperature unit preference (°F/°C) are stored locally in your browser.
                                This data never leaves your device.
                            </li>
                            <li>
                                <strong>Email (optional)</strong> — if you sign up for newsletter updates
                                via our footer form, we collect your email address.
                            </li>
                        </ul>
                        <p className="mt-3">
                            We do not collect names, passwords, payment information, or any other
                            personally identifying information through normal use of the site.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-base uppercase tracking-wide text-ink dark:text-paper mb-3">
                            3. Cookies
                        </h2>
                        <p>
                            We may use cookies or similar technologies for analytics purposes. These
                            cookies are anonymous and cannot be used to identify you personally. You
                            can disable cookies in your browser settings at any time. Some site
                            features (such as remembering your theme preference) rely on browser local
                            storage, not traditional cookies.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-base uppercase tracking-wide text-ink dark:text-paper mb-3">
                            4. Affiliate Links
                        </h2>
                        <p>
                            CookingTemps.com participates in the Amazon Services LLC Associates
                            Program, an affiliate advertising program designed to provide a means for
                            sites to earn advertising fees by advertising and linking to Amazon.com.
                            When you click an affiliate link and make a purchase, we may earn a small
                            commission at no extra cost to you. Affiliate links are clearly disclosed
                            within the Recommended Gear section.
                        </p>
                        <p className="mt-3">
                            Amazon and its partners may set cookies when you click through to their
                            site. Their privacy practices are governed by Amazon's own Privacy Notice,
                            available at{" "}
                            <a
                                href="https://www.amazon.com/privacy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary underline"
                            >
                                amazon.com/privacy
                            </a>
                            .
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-base uppercase tracking-wide text-ink dark:text-paper mb-3">
                            5. Third-Party Services
                        </h2>
                        <p>
                            The site may use third-party services including Google Fonts, analytics
                            providers, and email newsletter platforms. These services have their own
                            privacy policies and may collect data as described in their respective
                            policies. We do not sell your data to any third party.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-base uppercase tracking-wide text-ink dark:text-paper mb-3">
                            6. Children's Privacy
                        </h2>
                        <p>
                            CookingTemps.com is not directed at children under the age of 13. We do
                            not knowingly collect personal information from children. If you believe
                            a child has provided us with personal information, please contact us so
                            we can delete it.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-base uppercase tracking-wide text-ink dark:text-paper mb-3">
                            7. Your Rights
                        </h2>
                        <p>
                            Depending on your location, you may have rights under applicable privacy
                            laws (GDPR, CCPA, etc.) including the right to access, correct, or delete
                            data we hold about you. To exercise any such rights, please contact us
                            at the address below.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-base uppercase tracking-wide text-ink dark:text-paper mb-3">
                            8. Changes to This Policy
                        </h2>
                        <p>
                            We may update this Privacy Policy from time to time. Material changes
                            will be reflected in the "Last updated" date at the top of this page.
                            Continued use of the site after changes constitutes acceptance of the
                            updated policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display font-bold text-base uppercase tracking-wide text-ink dark:text-paper mb-3">
                            9. Contact
                        </h2>
                        <p>
                            For privacy-related questions, please contact us via{" "}
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
                    <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
                </div>
            </div>
        </main>
    );
}
