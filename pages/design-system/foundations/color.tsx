import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import {
    PageHeader,
    Section,
    SwatchGrid,
    Do,
    Dont,
    DoDontGrid,
} from '../../../styleguide-components/primitives'
import { colorGroups } from '../../../styleguide-components/tokens'

const toc = [
    ...colorGroups.map(group => ({
        id: group.name.toLowerCase().replace(/[^a-z]+/g, '-').replace(/^-|-$/g, ''),
        title: group.name,
    })),
    { id: 'usage', title: 'Usage' },
]

const Color: NextPageWithLayout = () => (
    <DesignSystemLayout title="Color" toc={toc}>
        <PageHeader
            eyebrow="Foundations"
            title="Color"
            status="stable"
            intro="The Bupa palette is organised into primary brand colours, expressive secondary accents, functional UI colours and tinted background surfaces. Every value below is read live from the Tailwind theme."
        />

        <p className="text-grey dark:text-light-grey">
            Use the token name (for example{' '}
            <code className="font-mono text-cyan">cyan-400</code>) directly as a
            Tailwind class such as{' '}
            <code className="font-mono text-cyan">bg-cyan-400</code> or{' '}
            <code className="font-mono text-cyan">text-navy</code>. Avoid hard-coding
            hex values in components.
        </p>

        {colorGroups.map(group => {
            const id = group.name
                .toLowerCase()
                .replace(/[^a-z]+/g, '-')
                .replace(/^-|-$/g, '')
            return (
                <section key={group.name} id={id} className="scroll-mt-24">
                    <SwatchGrid group={group} />
                </section>
            )
        })}

        <Section id="usage" title="Usage">
            <p className="text-grey dark:text-light-grey">
                Lead with cyan and navy for brand moments and primary actions.
                Reserve secondary colours for accents, illustration and
                categorisation. UI colours communicate state and should not be used
                decoratively.
            </p>
            <DoDontGrid>
                <Do note="Use cyan for primary calls to action so they stand out consistently.">
                    <button className="button button--giant bg-cyan text-white">
                        Find a care home
                    </button>
                </Do>
                <Dont note="Don't use a secondary accent colour for primary actions — it dilutes the brand hierarchy.">
                    <button className="button button--giant bg-fuchsia text-white">
                        Find a care home
                    </button>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default Color
