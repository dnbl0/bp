import Link from 'next/link'
import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import {
    PageHeader,
    Section,
    Subsection,
    Do,
    Dont,
    DoDontGrid,
} from '../../../styleguide-components/primitives'

const toc = [
    { id: 'typefaces', title: 'Our typefaces' },
    { id: 'colour', title: 'Colour' },
    { id: 'placement', title: 'Placement' },
    { id: 'expressive', title: 'Type as illustration' },
    { id: 'dos', title: 'Do & don’t' },
]

interface Typeface {
    name: string
    role: string
    sample: string
    weight: string
}

const typefaces: Typeface[] = [
    {
        name: 'Gotham Bold',
        role: 'Preferred for short headlines.',
        sample: 'Helping you take care of your health',
        weight: 'font-bold',
    },
    {
        name: 'Gotham Medium',
        role: 'For longer headlines and short body copy.',
        sample: 'Nothing compares to quality health insurance.',
        weight: 'font-semibold',
    },
    {
        name: 'Gotham Book',
        role: 'For body copy.',
        sample: 'We work with your doctor to come up with a plan for your recovery, then support you over the phone.',
        weight: 'font-normal',
    },
]

const Typography: NextPageWithLayout = () => (
    <DesignSystemLayout title="Typography" toc={toc}>
        <PageHeader
            eyebrow="Design toolkit"
            title="Typography"
            status="stable"
            intro="Always use sentence case. Type carries our tone — bolder weights for headlines, lighter weights for body copy."
        />

        <Section id="typefaces" title="Our typefaces">
            <p className="text-grey dark:text-light-grey">
                <strong>Gotham</strong> is our brand typeface.{' '}
                <strong>Montserrat</strong> is used for websites and apps, and{' '}
                <strong>Arial</strong> for PowerPoint and Word. Use Montserrat and Arial
                as you would Gotham — bolder weights for headlines, lighter weights for
                body copy. Gotham can be purchased and downloaded; Montserrat is open
                source and free to download. Font licences should be purchased locally.
            </p>
            <div className="mt-6 space-y-4">
                {typefaces.map(face => (
                    <div
                        key={face.name}
                        className="rounded-xl border border-cool-paper-200 dark:border-charcoal p-6 bg-white dark:bg-cool-grey"
                    >
                        <p className="text-caption font-bold uppercase tracking-wide text-disabled-text">
                            {face.name} — {face.role}
                        </p>
                        <p className={`mt-2 text-heading-m text-navy dark:text-white ${face.weight}`}>
                            {face.sample}
                        </p>
                    </div>
                ))}
            </div>
            <p className="mt-4 text-body-small text-grey dark:text-light-grey">
                For the responsive type scale used in code, see{' '}
                <Link href="/design-system/foundations/typography">
                    <a className="font-semibold text-cyan hover:underline">
                        Foundations → Typography
                    </a>
                </Link>
                .
            </p>
        </Section>

        <Section id="colour" title="Colour">
            <ul className="space-y-2 text-body-small text-grey dark:text-light-grey">
                <li className="flex gap-2">
                    <span className="text-cyan flex-none">—</span>
                    <span>Use Bupa Blue, Bupa Navy or white for headlines.</span>
                </li>
                <li className="flex gap-2">
                    <span className="text-cyan flex-none">—</span>
                    <span>
                        Use Bupa Blue for hyperlinks or large, short headlines — but only
                        when accessible.
                    </span>
                </li>
            </ul>
        </Section>

        <Section id="placement" title="Placement">
            <ul className="space-y-2 text-body-small text-grey dark:text-light-grey">
                <li className="flex gap-2">
                    <span className="text-cyan flex-none">—</span>
                    <span>Short, direct headlines can be used over imagery.</span>
                </li>
                <li className="flex gap-2">
                    <span className="text-cyan flex-none">—</span>
                    <span>Centred headlines are preferred for bold headlines over images.</span>
                </li>
                <li className="flex gap-2">
                    <span className="text-cyan flex-none">—</span>
                    <span>Left-aligned headlines elsewhere.</span>
                </li>
                <li className="flex gap-2">
                    <span className="text-cyan flex-none">—</span>
                    <span>
                        Full stops are used for headlines that include grammar (commas,
                        exclamation marks) or multiple sentences.
                    </span>
                </li>
            </ul>
        </Section>

        <Section id="expressive" title="Type as illustration & expressive type">
            <p className="text-grey dark:text-light-grey">
                Type can be used in a clever, imaginative way to bring a more
                light-hearted tone to our communication.
            </p>
            <Subsection title="Type as illustration">
                <p className="text-body-small text-grey dark:text-light-grey">
                    Type can be integrated into an illustration, or used expressively to
                    make an idea more engaging. Consider the audience and environment
                    first. A bolder weight, <strong>Gotham Black</strong>, can be used for
                    type as illustration.
                </p>
            </Subsection>
            <Subsection title="Expressive type">
                <p className="text-body-small text-grey dark:text-light-grey">
                    Expressive type brings to life ideas that are difficult to visualise
                    with photography or illustration. Keep copy witty and engaging,
                    messages short and direct — think “less is more”. Type can move off
                    the page, climb or shrink within the layout.
                </p>
            </Subsection>
        </Section>

        <Section id="dos" title="Do & don’t">
            <DoDontGrid>
                <Do note="Use a single, consistent weight across a headline and keep it sentence case.">
                    <p className="text-heading-s font-bold text-navy dark:text-white">
                        Take care of your health
                    </p>
                </Do>
                <Dont note="Don’t use secondary colours for type, or bold some parts of a headline but not others.">
                    <p className="text-heading-s font-bold text-navy dark:text-white">
                        Take <span className="text-fuchsia">care</span> of your health
                    </p>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default Typography
