import { NextPageWithLayout } from '../../../../types/nextLayout'
import { DesignSystemLayout } from '../../../../styleguide-components/DesignSystemLayout'
import { PageHeader, Section, TokenTable } from '../../../../styleguide-components/primitives'
import type { TokenRow } from '../../../../styleguide-components/primitives'
import { motion, animationDelays } from '../../../../styleguide-components/tokens'

const toc = [
    { id: 'animations', title: 'Animations' },
    { id: 'delays', title: 'Delays' },
]

const motionRows: TokenRow[] = motion.map(token => ({
    token: token.token,
    value: token.value,
}))

const delayRows: TokenRow[] = animationDelays.map(token => ({
    token: token.token,
    value: token.value,
}))

const Motion: NextPageWithLayout = () => (
    <DesignSystemLayout title="Motion tokens" toc={toc}>
        <PageHeader
            eyebrow="Design tokens"
            title="Motion"
            status="stable"
            intro="Animation utilities and staggered delay tokens. Motion is purposeful and quick — fades and slides ease elements in and out without drawing attention to themselves."
        />

        <Section id="animations" title="Animations">
            <p className="text-grey dark:text-light-grey">
                Apply with <code className="font-mono text-cyan">animate-*</code> utilities.
                Looping animation is reserved for loading states only.
            </p>
            <TokenTable rows={motionRows} />
        </Section>

        <Section id="delays" title="Delays">
            <p className="text-grey dark:text-light-grey">
                Stagger entrances with{' '}
                <code className="font-mono text-cyan">animation-delay-*</code> utilities to
                create a sequence without a single long wait.
            </p>
            <TokenTable rows={delayRows} />
        </Section>
    </DesignSystemLayout>
)

export default Motion
