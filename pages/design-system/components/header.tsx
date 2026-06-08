import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import { ComponentHero } from '../../../styleguide-components/componentPreviews'
import {
    PageHeader,
    Section,
    Anatomy,
    Do,
    Dont,
    DoDontGrid,
    Specifications,
} from '../../../styleguide-components/primitives'
import { SquareBupaLogo } from '../../../components/atoms/icons/SquareBupaLogo'
import { SearchIcon } from '../../../components/atoms/icons/SearchIcon'
import { BurgerIcon } from '../../../components/atoms/icons/BurgerIcon'
import { CallNowIcon } from '../../../components/atoms/icons/CallNowIcon'
import { headerDefaultSpecs } from '../../../styleguide-components/specs/header.specs'

const parts = [
    { name: 'Logo', detail: 'Links home; uses the square Bupa mark on small screens.' },
    { name: 'Wide-screen nav', detail: 'Primary navigation shown on large viewports (WideScreenNav).' },
    { name: 'Contact buttons', detail: 'Call now, call back and book-a-tour actions (HeaderButton variants).' },
    { name: 'Search', detail: 'Opens the search experience (SearchButton).' },
    { name: 'Burger nav', detail: 'Collapses navigation into a slide-in menu on small screens (BurgerNav).' },
]

const toc = [
    { id: 'overview', title: 'Overview' },
    { id: 'anatomy', title: 'Anatomy' },
    { id: 'specifications', title: 'Visual Specifications' },
    { id: 'parts', title: 'Parts' },
    { id: 'behaviour', title: 'Behaviour' },
    { id: 'guidelines', title: 'Guidelines' },
]

const Header: NextPageWithLayout = () => (
    <DesignSystemLayout title="Header" toc={toc}>
        <PageHeader
            eyebrow="Components · Organisms"
            title="Header"
            status="stable"
            intro="The global site header. It adapts between a wide-screen layout with inline navigation and contact actions, and a compact layout that collapses navigation into a slide-in burger menu."
        />

        <ComponentHero name="Header" />

        <Section id="overview" title="Overview">
            <div className="rounded-xl border border-cool-paper-200 dark:border-charcoal overflow-hidden">
                <div className="flex items-center gap-4 h-16 px-4 bg-white border-b border-cool-paper-200">
                    <SquareBupaLogo className="h-8 w-auto" />
                    <nav className="hidden md:flex gap-5 text-body-small text-navy font-medium flex-1">
                        <span>Find a home</span>
                        <span>Types of care</span>
                        <span>Costs</span>
                        <span>About</span>
                    </nav>
                    <button className="button button--small ml-auto md:ml-0">
                        <CallNowIcon className="w-4 h-4 fill-white" />
                        <span>Call now</span>
                    </button>
                    <SearchIcon className="w-6 h-6 fill-navy hidden md:block" />
                    <BurgerIcon className="w-6 h-6 fill-navy md:hidden" />
                </div>
            </div>
            <p className="mt-3 text-caption text-disabled-text">
                A representative composition. The production header is data-driven and
                resizes its navigation responsively.
            </p>
        </Section>

        <Section id="anatomy" title="Anatomy">
            <Anatomy
                parts={[
                    { number: 1, name: 'Logo', description: 'Home link and brand mark.' },
                    { number: 2, name: 'Navigation', description: 'Primary links, inline on wide screens.' },
                    { number: 3, name: 'Actions', description: 'Contact buttons and search.' },
                    { number: 4, name: 'Burger', description: 'Menu toggle on small screens.' },
                ]}
            >
                <div className="w-full max-w-xs flex items-center gap-2 bg-white border border-cool-paper-200 rounded p-3">
                    <SquareBupaLogo className="h-6 w-auto" />
                    <div className="flex-1 h-2 bg-cool-paper-200 rounded" />
                    <SearchIcon className="w-5 h-5 fill-navy" />
                    <BurgerIcon className="w-5 h-5 fill-navy" />
                </div>
            </Anatomy>
        </Section>

        <Section id="specifications" title="Visual Specifications">
            <p className="text-grey dark:text-light-grey">
                Component visual specifications for sizing, spacing and colors.
            </p>
            <Specifications variant="Default" groups={[headerDefaultSpecs]} withTable>
                <div className="rounded-xl border border-cool-paper-200 dark:border-charcoal overflow-hidden">
                    <div className="flex items-center gap-4 h-16 px-4 bg-white border-b border-cool-paper-200">
                        <SquareBupaLogo className="h-8 w-auto" />
                        <nav className="hidden md:flex gap-5 text-body-small text-navy font-medium flex-1">
                            <span>Find a home</span>
                            <span>Types of care</span>
                            <span>Costs</span>
                            <span>About</span>
                        </nav>
                        <button className="button button--small ml-auto md:ml-0">
                            <CallNowIcon className="w-4 h-4 fill-white" />
                            <span>Call now</span>
                        </button>
                        <SearchIcon className="w-6 h-6 fill-navy hidden md:block" />
                        <BurgerIcon className="w-6 h-6 fill-navy md:hidden" />
                    </div>
                </div>
            </Specifications>
        </Section>

        <Section id="parts" title="Parts">
            <ul className="space-y-2">
                {parts.map(part => (
                    <li
                        key={part.name}
                        className="rounded-lg border border-cool-paper-200 dark:border-charcoal p-5 bg-white dark:bg-cool-grey"
                    >
                        <span className="font-semibold text-navy dark:text-white">
                            {part.name}
                        </span>
                        <span className="block text-body-small text-grey dark:text-light-grey">
                            {part.detail}
                        </span>
                    </li>
                ))}
            </ul>
        </Section>

        <Section id="behaviour" title="Behaviour">
            <ul className="list-disc pl-5 space-y-2 text-grey dark:text-light-grey">
                <li>Navigation is inline above the <code className="font-mono text-cyan">md</code> breakpoint and collapses into the burger menu below it.</li>
                <li>The header is fixed to the top of the viewport at the <code className="font-mono text-cyan">z-header</code> layer.</li>
                <li>Contact actions (call now, call back, book a tour) are configurable per the CMS navigation data.</li>
            </ul>
        </Section>

        <Section id="guidelines" title="Guidelines">
            <DoDontGrid>
                <Do note="Keep top-level navigation to a few clear destinations so it stays inline and scannable on wide screens.">
                    <nav className="flex gap-5 text-body-small text-navy font-medium">
                        <span>Find a home</span>
                        <span>Types of care</span>
                        <span>Costs</span>
                        <span>About</span>
                    </nav>
                </Do>
                <Dont note="Don't overload the header with links — it overflows the inline nav and forces everything into the burger menu.">
                    <nav className="flex flex-wrap gap-3 text-body-small text-navy font-medium">
                        <span>Find a home</span>
                        <span>Types of care</span>
                        <span>Costs</span>
                        <span>About</span>
                        <span>News</span>
                        <span>Careers</span>
                        <span>Contact</span>
                        <span>FAQs</span>
                    </nav>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default Header
