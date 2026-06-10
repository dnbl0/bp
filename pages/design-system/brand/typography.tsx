import Link from 'next/link'
import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import {
    BrandHero,
    Section,
    Do,
    Dont,
    DoDontGrid,
} from '../../../styleguide-components/primitives'
import { photography, BrandGallery } from '../../../styleguide-components/brandAssets'

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
        <BrandHero
            eyebrow="Design toolkit"
            title="Typography"
            intro="Always use sentence case. Type carries our tone — bolder weights for headlines, lighter weights for body copy."
        />

        <Section id="typefaces" title="Our typefaces">
            <p className="text-body-small text-grey dark:text-light-grey mb-4">
                <strong>Gotham</strong> for brand, <strong>Montserrat</strong> for web and apps (open source), <strong>Arial</strong> for Office. Use bolder weights for headlines, lighter for body copy.
            </p>
            <div className="space-y-4">
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

        <Section id=”colour” title=”Colour”>
            <div className=”grid gap-2 sm:grid-cols-2”>
                {[
                    { rule: 'Headlines', value: 'Bupa Blue, Bupa Navy or white' },
                    { rule: 'Hyperlinks', value: 'Bupa Blue — only when accessible' },
                ].map(item => (
                    <div
                        key={item.rule}
                        className=”flex items-start gap-3 rounded-xl border border-cool-paper-200 dark:border-charcoal px-4 py-3 bg-white dark:bg-cool-grey”
                    >
                        <span className=”text-caption font-semibold uppercase tracking-wide text-disabled-text w-24 flex-none pt-0.5”>{item.rule}</span>
                        <span className=”text-body-small text-navy dark:text-white”>{item.value}</span>
                    </div>
                ))}
            </div>
        </Section>

        <Section id=”placement” title=”Placement”>
            <div className=”grid gap-2 sm:grid-cols-2”>
                {[
                    { rule: 'Over imagery', value: 'Short, direct headlines — centred' },
                    { rule: 'Elsewhere', value: 'Left-aligned' },
                    { rule: 'Full stops', value: 'Only when the headline includes grammar or multiple sentences' },
                    { rule: 'Case', value: 'Always sentence case' },
                ].map(item => (
                    <div
                        key={item.rule}
                        className=”flex items-start gap-3 rounded-xl border border-cool-paper-200 dark:border-charcoal px-4 py-3 bg-white dark:bg-cool-grey”
                    >
                        <span className=”text-caption font-semibold uppercase tracking-wide text-disabled-text w-24 flex-none pt-0.5”>{item.rule}</span>
                        <span className=”text-body-small text-navy dark:text-white”>{item.value}</span>
                    </div>
                ))}
            </div>
        </Section>

        <Section id=”expressive” title=”Type as illustration & expressive type”>
            <p className=”text-body-small text-grey dark:text-light-grey mb-4”>
                Type can be integrated into illustration (use <strong>Gotham Black</strong>) or used expressively — climbing, shrinking, moving off the page. Keep messages short and direct.
            </p>
            <BrandGallery
                images={photography.typography}
                columns=”grid-cols-1 sm:grid-cols-2”
            />
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
