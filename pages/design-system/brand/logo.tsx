import { ReactNode } from 'react'
import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import { PulseLogo } from '../../../components/atoms/icons/PulseLogo'
import {
    PageHeader,
    Section,
    Subsection,
} from '../../../styleguide-components/primitives'

const toc = [
    { id: 'formats', title: 'Formats' },
    { id: 'clear-space', title: 'Minimum clear space' },
    { id: 'sizing', title: 'Minimum sizing & position' },
    { id: 'social', title: 'Social profile logos' },
    { id: 'family', title: 'Other Bupa family logos' },
]

interface Treatment {
    name: string
    usage: string
    /** Tailwind classes for the demo surface. */
    surface: string
    /** Tailwind classes for the logo mark. */
    mark: string
}

const treatments: Treatment[] = [
    {
        name: 'Bupa Blue',
        usage: 'For use on white, Bupa Warm Grey or light photo backgrounds.',
        surface: 'bg-white',
        mark: 'fill-cyan text-cyan',
    },
    {
        name: 'Keyline',
        usage: 'Only for use on Bupa Blue backgrounds.',
        surface: 'bg-cyan',
        mark: 'fill-white text-white',
    },
    {
        name: 'White (reverse)',
        usage: 'For use on Bupa Navy or mid-to-dark photo backgrounds. There is no white (reverse) version for the Bupa square logo.',
        surface: 'bg-navy',
        mark: 'fill-white text-white',
    },
]

const SpecRow = ({ label, children }: { label: string; children: ReactNode }) => (
    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-3 border-b border-cool-paper-100 dark:border-charcoal last:border-0">
        <span className="sm:w-44 flex-none font-semibold text-navy dark:text-white text-body-small">
            {label}
        </span>
        <span className="text-body-small text-grey dark:text-light-grey">{children}</span>
    </div>
)

const Logo: NextPageWithLayout = () => (
    <DesignSystemLayout title="Logo" toc={toc}>
        <PageHeader
            eyebrow="Design toolkit"
            title="Logo"
            status="stable"
            intro="Our square and horizontal logos are both equally on brand. Which format you choose depends on what works best in your design layout."
        />

        <Section id="formats" title="Formats">
            <p className="text-grey dark:text-light-grey">
                The logo comes in colour treatments for different backgrounds. Always
                choose the version with enough contrast to stay clearly legible.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {treatments.map(treatment => (
                    <div
                        key={treatment.name}
                        className="rounded-xl border border-cool-paper-200 dark:border-charcoal overflow-hidden"
                    >
                        <div
                            className={`flex items-center justify-center h-32 ${treatment.surface}`}
                        >
                            <PulseLogo className={`h-12 w-auto ${treatment.mark}`} />
                        </div>
                        <div className="p-4 bg-white dark:bg-cool-grey">
                            <div className="font-semibold text-navy dark:text-white text-body-small">
                                {treatment.name}
                            </div>
                            <p className="mt-1 text-caption text-grey dark:text-light-grey">
                                {treatment.usage}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <p className="mt-4 text-body-small text-grey dark:text-light-grey">
                Note: the previews above use the design-system pulse mark as a
                stand-in. The official Bupa logo can be downloaded from Bupa Inspire.
            </p>
        </Section>

        <Section id="clear-space" title="Minimum clear space">
            <p className="text-grey dark:text-light-grey">
                Keep the area around the logo free from clutter and other graphic
                elements.
            </p>
            <div className="mt-4 rounded-xl border border-cool-paper-200 dark:border-charcoal p-6 bg-white dark:bg-cool-grey">
                <SpecRow label="Square logo">
                    Clear space of <strong>0.25&times;</strong> — a quarter of the
                    height of the square — on all sides.
                </SpecRow>
                <SpecRow label="Horizontal logo">
                    Clear space of <strong>0.5&times;</strong> — half the height of the
                    heartbeat symbol — on all sides.
                </SpecRow>
            </div>
        </Section>

        <Section id="sizing" title="Minimum sizing & position">
            <Subsection title="Minimum sizing">
                <div className="rounded-xl border border-cool-paper-200 dark:border-charcoal p-6 bg-white dark:bg-cool-grey">
                    <SpecRow label="Square logo">
                        Print <strong>15mm</strong> · Digital <strong>50px</strong>
                    </SpecRow>
                    <SpecRow label="Horizontal logo">
                        Print <strong>8mm</strong> · Digital <strong>25px</strong>
                    </SpecRow>
                </div>
            </Subsection>
            <Subsection title="Position">
                <p className="text-grey dark:text-light-grey">
                    Logos are usually placed in the corner of a layout. The inset
                    distance should be consistent across a design and is generally
                    mirrored by any message box.
                </p>
            </Subsection>
        </Section>

        <Section id="social" title="Social profile logos">
            <p className="text-grey dark:text-light-grey">
                All Bupa accounts are branded with a Bupa social profile logo. Use the
                circle version for most platforms and the square for LinkedIn.
            </p>
            <div className="mt-6 flex flex-wrap gap-6">
                <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-cyan flex items-center justify-center">
                        <PulseLogo className="h-10 w-auto fill-white text-white" />
                    </div>
                    <p className="mt-2 text-caption text-grey dark:text-light-grey">
                        Circle — most platforms
                    </p>
                </div>
                <div className="text-center">
                    <div className="w-24 h-24 rounded-lg bg-cyan flex items-center justify-center">
                        <PulseLogo className="h-10 w-auto fill-white text-white" />
                    </div>
                    <p className="mt-2 text-caption text-grey dark:text-light-grey">
                        Square — LinkedIn
                    </p>
                </div>
            </div>
        </Section>

        <Section id="family" title="Other Bupa family logos">
            <p className="text-grey dark:text-light-grey">
                Some of our Market and Business Units have their own logo. If you’re
                using one of these, follow the same guidance as the Bupa logo. Family
                logos can be downloaded from Bupa Inspire.
            </p>
        </Section>
    </DesignSystemLayout>
)

export default Logo
