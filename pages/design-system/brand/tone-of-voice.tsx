import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import {
    BrandHero,
    BeforeAfter,
    PrincipleCard,
    PullQuote,
    WordSwapTable,
    Section,
} from '../../../styleguide-components/primitives'
import {
    toneIntro,
    tonePrinciples,
    beforeYouWrite,
    whileYouWrite,
    wordSwaps,
    toneRewrites,
    toneRewriteNotes,
} from '../../../styleguide-components/brand/content'

const toc = [
    { id: 'principles', title: 'Principles' },
    { id: 'writing', title: 'While you’re writing' },
    { id: 'swaps', title: 'Word swaps' },
    { id: 'in-action', title: 'Tone in action' },
]

const CheckCard = ({ title, items }: { title: string; items: string[] }) => (
    <div className="rounded-xl border border-cool-paper-200 dark:border-charcoal p-5 bg-white dark:bg-cool-grey">
        <p className="text-caption font-semibold uppercase tracking-wide text-disabled-text mb-3">{title}</p>
        <ul className="space-y-2">
            {items.map(item => (
                <li key={item} className="flex gap-2 text-body-small text-grey dark:text-light-grey">
                    <span aria-hidden="true" className="flex-none text-cyan mt-0.5">✓</span>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    </div>
)

const ToneOfVoice: NextPageWithLayout = () => (
    <DesignSystemLayout title="Tone of voice" toc={toc}>
        <BrandHero
            eyebrow="Brand guidelines"
            title="How we sound"
            intro="Helpful, straightforward, friendly and inviting — the way we write is how people get to know us."
        />

        <PullQuote cite="Tone of voice principles">{toneIntro}</PullQuote>

        <Section id="principles" title="Principles">
            <div className="grid gap-5 lg:grid-cols-2">
                {tonePrinciples.map(principle => (
                    <PrincipleCard key={principle.title} principle={principle} />
                ))}
            </div>
        </Section>

        <Section id="writing" title="While you&apos;re writing">
            <div className="grid gap-4 sm:grid-cols-2">
                <CheckCard title="Before you start" items={beforeYouWrite} />
                <CheckCard title="As you write" items={whileYouWrite} />
            </div>
        </Section>

        <Section id="swaps" title="Word swaps">
            <p className="text-grey dark:text-light-grey">
                Swap office-speak for everyday language.
            </p>
            <div className="mt-6">
                <WordSwapTable swaps={wordSwaps} />
            </div>
        </Section>

        <Section id="in-action" title="Tone in action">
            <div className="space-y-8">
                {toneRewrites.map(rewrite => (
                    <BeforeAfter
                        key={rewrite.label}
                        label={rewrite.label}
                        before={rewrite.before}
                        after={rewrite.after}
                    />
                ))}
            </div>
            <p className="mt-6 text-body-small text-grey dark:text-light-grey">
                {toneRewriteNotes}
            </p>
        </Section>
    </DesignSystemLayout>
)

export default ToneOfVoice
