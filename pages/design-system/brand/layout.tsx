import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import {
    BrandHero,
    Section,
    Subsection,
} from '../../../styleguide-components/primitives'

const toc = [
    { id: 'headers', title: 'Headers' },
    { id: 'header-styles', title: 'Header styles' },
    { id: 'footers', title: 'Footers' },
]

const headerStyles: { name: string; body: string }[] = [
    {
        name: 'Primary header',
        body: 'The standard header for most pages: Bupa logo, page name, search, menu, login and contact. Can carry the square or horizontal logo in the top-left, and may include a business-unit logo.',
    },
    {
        name: 'Secondary header',
        body: 'A lighter header for microsites and landing pages — typically a BU / service-area label and an optional tagline.',
    },
    {
        name: 'Neutral header',
        body: 'An exceptional style for pages that are not Bupa URLs, where we want to be seen as neutral.',
    },
]

const footerRules: string[] = [
    'Footers can be Bupa Blue or Bupa Navy.',
    'Footers must contain copyright information, privacy and cookies, accessibility and legal notices.',
    'Links in desktop footers should be arranged in columns; mobile footers use accordions.',
    'Adding the Bupa logo is not mandatory but reinforces the brand — position it top-left for desktop, top-centred for mobile.',
    'If social media logos are used, place them lower-right for desktop; left, right or centred for mobile.',
]

const Layout: NextPageWithLayout = () => (
    <DesignSystemLayout title="Headers & footers" toc={toc}>
        <BrandHero
            eyebrow="Design toolkit"
            title="Headers & footers"
            intro="Headers run across the top of almost all pages and are key to how our websites look and work. Footers optimise the site for search and make it easy to navigate without scrolling back up."
        />

        <Section id="headers" title="Headers">
            <p className="text-grey dark:text-light-grey">
                A website header shows how a site is navigated and organised. Keeping
                consistent elements — and using a sticky header — makes our sites easier
                to navigate and more user-friendly. Headers include the Bupa logo
                (mandatory), page name, search bar, menu, login and contact.
            </p>
            <Subsection title="Responsive behaviour">
                <ul className="space-y-2 text-body-small text-grey dark:text-light-grey">
                    <li className="flex gap-2">
                        <span className="text-cyan flex-none">—</span>
                        <span>
                            On desktop, the square or horizontal logo can sit in the
                            top-left corner.
                        </span>
                    </li>
                    <li className="flex gap-2">
                        <span className="text-cyan flex-none">—</span>
                        <span>
                            Below <strong>767px</strong> width the header switches to
                            mobile view and a horizontal logo should be used.
                        </span>
                    </li>
                    <li className="flex gap-2">
                        <span className="text-cyan flex-none">—</span>
                        <span>Avoid using more than two icons positioned on the right.</span>
                    </li>
                </ul>
            </Subsection>
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
            <ul className="mt-6 space-y-2 text-body-small text-grey dark:text-light-grey">
                {footerRules.map(rule => (
                    <li key={rule} className="flex gap-2">
                        <span className="text-cyan flex-none">—</span>
                        <span>{rule}</span>
                    </li>
                ))}
            </ul>
        </Section>
    </DesignSystemLayout>
)

export default Layout
