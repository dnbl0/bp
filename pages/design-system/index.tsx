/* eslint-disable @next/next/no-img-element */
import { NextPageWithLayout } from '../../types/nextLayout'
import { DesignSystemLayout } from '../../styleguide-components/DesignSystemLayout'
import { hrefFor } from '../../styleguide-components/designSystem.config'
import { Card } from '../../styleguide-components/primitives'

/* ─── Illustration panels ─────────────────────────────────────────── */

const PeopleIllustration = () => (
    <div className="w-full h-full flex items-end justify-center overflow-hidden bg-cyan-50 dark:bg-navy/30 px-4">
        {[
            '/brand-assets/white_bg/people/p40_people_01.png',
            '/brand-assets/white_bg/people/p40_people_05.png',
            '/brand-assets/white_bg/people/p40_people_03.png',
            '/brand-assets/white_bg/people/p40_people_07.png',
            '/brand-assets/white_bg/people/p40_people_02.png',
            '/brand-assets/white_bg/people/p40_people_06.png',
            '/brand-assets/white_bg/people/p40_people_04.png',
        ].map(src => (
            <img key={src} src={src} alt="" className="h-[85%] w-auto object-contain object-bottom mix-blend-multiply dark:mix-blend-normal flex-none" />
        ))}
    </div>
)

const ObjectsIllustration = () => (
    <div className="w-full h-full flex items-center justify-center bg-cool-paper-100 dark:bg-charcoal p-6">
        <div className="grid grid-cols-3 gap-4 w-full max-w-xs">
            {[
                '/brand-assets/white_bg/objects/p46_objects_01.png',
                '/brand-assets/white_bg/objects/p46_objects_02.png',
                '/brand-assets/white_bg/objects/p46_objects_03.png',
                '/brand-assets/white_bg/objects/p46_objects_04.png',
                '/brand-assets/white_bg/objects/p46_objects_05.png',
                '/brand-assets/white_bg/objects/p46_objects_06.png',
            ].map(src => (
                <div key={src} className="aspect-square flex items-center justify-center">
                    <img src={src} alt="" className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                </div>
            ))}
        </div>
    </div>
)

const ExplanatoryIllustration = () => (
    <div className="w-full h-full flex items-center justify-center bg-cool-paper-100 dark:bg-charcoal p-6 gap-4">
        {[
            '/brand-assets/white_bg/explanatory/p48_explanatory_01.png',
            '/brand-assets/white_bg/explanatory/p48_explanatory_02.png',
        ].map(src => (
            <img key={src} src={src} alt="" className="h-full max-h-48 w-auto object-contain mix-blend-multiply dark:mix-blend-normal" />
        ))}
    </div>
)

const IconsIllustration = () => (
    <div className="w-full h-full flex items-center justify-center bg-cool-paper-100 dark:bg-charcoal p-6">
        <div className="grid grid-cols-4 gap-4 w-full max-w-sm">
            {[
                '/brand-assets/white_bg/icons_illustrated/p51_icons_illustrated_01.png',
                '/brand-assets/white_bg/icons_illustrated/p51_icons_illustrated_02.png',
                '/brand-assets/white_bg/icons_illustrated/p51_icons_illustrated_03.png',
                '/brand-assets/white_bg/icons_illustrated/p51_icons_illustrated_04.png',
                '/brand-assets/white_bg/icons_illustrated/p51_icons_illustrated_05.png',
                '/brand-assets/white_bg/icons_illustrated/p51_icons_illustrated_06.png',
                '/brand-assets/white_bg/icons_illustrated/p51_icons_illustrated_07.png',
                '/brand-assets/white_bg/icons_illustrated/p51_icons_illustrated_08.png',
            ].map(src => (
                <div key={src} className="aspect-square flex items-center justify-center">
                    <img src={src} alt="" className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                </div>
            ))}
        </div>
    </div>
)

/* ─── Info card icons ─────────────────────────────────────────────── */
const AccessibilityIcon = () => (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="4" r="1.5" /><path d="M8 8h8M12 8v8M9 21l3-5 3 5" />
    </svg>
)
const TokensIcon = () => (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" />
    </svg>
)
const AssetsIcon = () => (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
)

/* ─── Page ────────────────────────────────────────────────────────── */
const DesignSystemHome: NextPageWithLayout = () => (
    <DesignSystemLayout title="Introduction" wide noSidebar>

        {/* ── Hero ── */}
        <section className="bg-cyan-50 dark:bg-navy/20 flex items-center overflow-hidden pl-6 sm:pl-10 lg:pl-16 xl:pl-20 pr-0 pt-12 pb-0 mb-6">
            <div className="flex-1 min-w-0 py-4">
                <h1 className="text-[52px] sm:text-[64px] leading-[1.05] font-extrabold text-cyan">
                    Bupa Pulse
                </h1>
                <p className="mt-4 text-[20px] sm:text-[24px] text-grey dark:text-light-grey">
                    The design system for Bupa
                </p>
            </div>
            <div className="hidden sm:flex items-end h-[260px] lg:h-[320px] overflow-hidden flex-none w-[55%] lg:w-[60%]">
                {[
                    '/brand-assets/white_bg/people/p40_people_01.png',
                    '/brand-assets/white_bg/people/p40_people_05.png',
                    '/brand-assets/white_bg/people/p40_people_03.png',
                    '/brand-assets/white_bg/people/p40_people_07.png',
                    '/brand-assets/white_bg/people/p40_people_02.png',
                    '/brand-assets/white_bg/people/p40_people_06.png',
                    '/brand-assets/white_bg/people/p40_people_04.png',
                    '/brand-assets/white_bg/people/p40_people_08.png',
                ].map(src => (
                    <img key={src} src={src} alt="" className="h-full w-auto object-contain object-bottom mix-blend-multiply dark:mix-blend-normal flex-none" />
                ))}
            </div>
        </section>

        {/* ── Row 1: Feature cards — Bupa Pulse (wide) + Brand Toolkit ── */}
        <div className="grid gap-6 lg:grid-cols-[3fr_2fr] mb-6">
            <Card
                title={<>Build UI at Bupa with <strong>Bupa Pulse</strong></>}
                cta="Get started with Bupa Foundation"
                href={hrefFor('getting-started')}
                image={<PeopleIllustration />}
                aspect="4:3"
            />
            <Card
                title={<>Create for Bupa using the <strong>Brand toolkit</strong></>}
                cta="Get started with Brand toolkit"
                href={hrefFor('brand/colour')}
                image={<ObjectsIllustration />}
                headerPlacement="end"
                aspect="4:3"
            />
        </div>

        {/* ── Row 2: Feature cards — Foundations + Components (wide) ── */}
        <div className="grid gap-6 lg:grid-cols-[2fr_3fr] mb-6">
            <Card
                title="Foundations"
                cta="View the foundations"
                href={hrefFor('foundations/tokens')}
                image={<ExplanatoryIllustration />}
                headerPlacement="end"
                aspect="16:9"
            />
            <Card
                title="Components"
                cta="View all components"
                href={hrefFor('components')}
                image={<IconsIllustration />}
                aspect="16:9"
            />
        </div>

        {/* ── Row 3: Info tiles ── */}
        <div className="grid gap-6 sm:grid-cols-3 mb-16">
            <Card
                icon={<AccessibilityIcon />}
                title="Accessibility"
                description="Get started with creating accessible interfaces for Bupa."
                href={hrefFor('foundations/accessibility')}
            />
            <Card
                icon={<TokensIcon />}
                title="Design tokens"
                description="Bupa Pulse design tokens for colour, spacing, typography and more."
                href={hrefFor('foundations/tokens')}
            />
            <Card
                icon={<AssetsIcon />}
                title="Assets"
                description="View and download Bupa assets, including logos, photography, fonts and more."
                href={hrefFor('resources')}
            />
        </div>

    </DesignSystemLayout>
)

export default DesignSystemHome
