import { useState } from 'react'
import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import { PageHeader, Section } from '../../../styleguide-components/primitives'
import { animationDelays } from '../../../styleguide-components/tokens'

const toc = [
    { id: 'animations', title: 'Animations' },
    { id: 'delays', title: 'Delays' },
]

/*
    The class names are written as complete literals so Tailwind's content
    scanner keeps them; the matching token value is shown alongside.
*/
const animations: { className: string; value: string }[] = [
    { className: 'animate-fade-in', value: 'fade-in 0.6s linear' },
    { className: 'animate-fade-in-fast', value: 'fade-in 0.2s linear' },
    { className: 'animate-fade-out', value: 'fade-out 0.6s linear' },
    { className: 'animate-fade-out-fast', value: 'fade-out 0.2s linear' },
    { className: 'animate-slide-in', value: 'slide-in 0.6s ease-out' },
    { className: 'animate-slide-out', value: 'slide-out 0.6s ease-out' },
    { className: 'animate-spin-reverse', value: 'spin-reverse 3s linear infinite' },
]

const MotionCard = ({
    className,
    value,
    playKey,
}: {
    className: string
    value: string
    playKey: number
}) => (
    <div className="rounded-xl border border-cool-paper-200 dark:border-charcoal overflow-hidden bg-white dark:bg-cool-grey">
        <div className="h-32 flex items-center justify-center bg-cool-paper-50 dark:bg-charcoal overflow-hidden">
            <div key={playKey} className={`w-12 h-12 rounded-lg bg-cyan ${className}`} />
        </div>
        <div className="p-4">
            <code className="font-mono text-body-small text-cyan">{className}</code>
            <p className="mt-1 font-mono text-caption text-grey dark:text-light-grey">
                {value}
            </p>
        </div>
    </div>
)

const Motion: NextPageWithLayout = () => {
    const [playKey, setPlayKey] = useState(0)

    return (
        <DesignSystemLayout title="Motion" toc={toc}>
            <PageHeader
                eyebrow="Foundations"
                title="Motion"
                status="stable"
                intro="Motion is purposeful and quick. Fades and slides ease elements in and out without drawing attention to themselves; looping motion is reserved for loading states."
            />

            <Section id="animations" title="Animations">
                <button
                    type="button"
                    onClick={() => setPlayKey(key => key + 1)}
                    className="button button--small bg-cyan text-white mb-4"
                >
                    Replay
                </button>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {animations.map(animation => (
                        <MotionCard
                            key={animation.className}
                            className={animation.className}
                            value={animation.value}
                            playKey={playKey}
                        />
                    ))}
                </div>
            </Section>

            <Section id="delays" title="Delays">
                <p className="text-grey dark:text-light-grey">
                    Stagger entrances with the{' '}
                    <code className="font-mono text-cyan">animation-delay-*</code>{' '}
                    utilities.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                    {animationDelays.map(delay => (
                        <code
                            key={delay.token}
                            className="px-2 py-1 rounded bg-cool-paper-100 dark:bg-cool-grey font-mono text-caption text-grey dark:text-light-grey"
                        >
                            {delay.token} · {delay.value}
                        </code>
                    ))}
                </div>
            </Section>
        </DesignSystemLayout>
    )
}

export default Motion
