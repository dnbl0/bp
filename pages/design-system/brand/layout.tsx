import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import {
    BrandHero,
    Section,
} from '../../../styleguide-components/primitives'
import { headerStyles, footerRules } from '../../../styleguide-components/brand/content'

const toc = [
    { id: 'headers', title: 'Headers' },
    { id: 'header-styles', title: 'Header styles' },
    { id: 'footers', title: 'Footers' },
]

const Layout: NextPageWithLayout = () => (
    <DesignSystemLayout title="Headers & footers" toc={toc}>
        <BrandHero
            eyebrow="Design toolkit"
            title="Headers & footers"
            intro="Headers run across the top of almost all pages and are key to how our websites look and work. Footers optimise the site for search and make it easy to navigate without scrolling back up."
        />

        <Section id="headers" title="Headers">
            <div className="grid gap-2 sm:grid-cols-3 mb-6">
                {[
                    { label: 'Desktop', value: 'Square or horizontal logo, top-left' },
                    { label: 'Mobile (< 767px)', value: 'Horizontal logo, max 2 icons on the right' },
                    { label: 'Sticky', value: 'Use a sticky header for easier navigation' },
                ].map(item => (
                    <div key={item.label} className="rounded-xl border border-cool-paper-200 dark:border-charcoal p-4 bg-white dark:bg-cool-grey">
                        <p className="text-caption font-semibold uppercase tracking-wide text-disabled-text">{item.label}</p>
                        <p className="mt-1 text-body-small text-navy dark:text-white">{item.value}</p>
                    </div>
                ))}
            </div>
        </Section>

        <Section id="header-styles" title="Header styles">
            {/* A simplified desktop header mock. */}
            <div className="rounded-xl border border-cool-paper-200 dark:border-charcoal overflow-hidden">
                <div className="flex items-center gap-4 bg-white dark:bg-cool-grey px-4 h-14 border-b border-cool-paper-200 dark:border-charcoal">
                    <span className="w-10 h-10 rounded bg-cyan flex-none" aria-hidden="true" />
                    <nav className="flex gap-4 text-body-small text-grey dark:text-light-grey">
                        <span>Health</span>
                        <span>Dental</span>
                        <span>Care homes</span>
                        <span>Travel</span>
                    </nav>
                    <span className="ml-auto text-caption text-disabled-text">Search · Log in</span>
                </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {headerStyles.map(style => (
                    <div
                        key={style.name}
                        className="rounded-xl border border-cool-paper-200 dark:border-charcoal p-5 bg-white dark:bg-cool-grey"
                    >
                        <h3 className="font-semibold text-navy dark:text-white">
                            {style.name}
                        </h3>
                        <p className="mt-1 text-body-small text-grey dark:text-light-grey">
                            {style.body}
                        </p>
                    </div>
                ))}
            </div>
        </Section>

        <Section id="footers" title="Footers">
            {/* A simplified navy footer mock. */}
            <div className="rounded-xl overflow-hidden bg-navy text-white p-6">
                <div className="grid gap-6 sm:grid-cols-4 text-body-small">
                    {['Insurance', 'Services', 'Get help', 'Company'].map(col => (
                        <div key={col}>
                            <p className="font-semibold">{col}</p>
                            <p className="mt-2 text-white/70 text-caption leading-relaxed">
                                Link one
                                <br />
                                Link two
                                <br />
                                Link three
                            </p>
                        </div>
                    ))}
                </div>
                <p className="mt-6 pt-4 border-t border-white/20 text-caption text-white/70">
                    Terms and conditions | Privacy | Accessibility | Sitemap | ©Bupa
                </p>
            </div>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
                {footerRules.map(rule => (
                    <div key={rule} className="flex gap-3 items-start rounded-xl border border-cool-paper-200 dark:border-charcoal px-4 py-3 bg-white dark:bg-cool-grey">
                        <span className="text-cyan flex-none mt-0.5" aria-hidden="true">✓</span>
                        <span className="text-body-small text-grey dark:text-light-grey">{rule}</span>
                    </div>
                ))}
            </div>
        </Section>
    </DesignSystemLayout>
)

export default Layout
