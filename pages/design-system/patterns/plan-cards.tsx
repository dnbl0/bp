import { useState } from 'react'
import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import {
    PageHeader,
    Section,
    Example,
    PropsTable,
    Do,
    Dont,
    DoDontGrid,
} from '../../../styleguide-components/primitives'

const toc = [
    { id: 'tiers', title: 'Tiered cards' },
    { id: 'api', title: 'Props' },
    { id: 'guidelines', title: 'Guidelines' },
]

const Check = () => (
    <svg
        viewBox="0 0 20 20"
        width="16"
        height="16"
        aria-hidden="true"
        className="mt-0.5 flex-none text-cyan"
    >
        <path
            d="M5 10.5l3 3 7-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

interface Tier {
    name: string
    price: string
    features: string[]
    popular?: boolean
}

const tiers: Tier[] = [
    {
        name: 'Bronze',
        price: '$28',
        features: ['Accidents', 'Ambulance cover', 'Limited extras'],
    },
    {
        name: 'Silver',
        price: '$46',
        features: [
            'Everything in Bronze',
            'Hospital cover',
            'Dental & optical',
        ],
        popular: true,
    },
    {
        name: 'Gold',
        price: '$72',
        features: [
            'Everything in Silver',
            'Pregnancy & birth',
            'Major dental',
        ],
    },
]

const PlanCardsDemo = () => {
    const [selected, setSelected] = useState('Silver')
    return (
        <div className="grid w-full gap-4 sm:grid-cols-3">
            {tiers.map(tier => {
                const isSelected = selected === tier.name
                return (
                    <div
                        key={tier.name}
                        className={
                            'relative flex flex-col rounded-xl border bg-white dark:bg-cool-grey p-5 ' +
                            (tier.popular
                                ? 'border-cyan shadow'
                                : 'border-cool-paper-200 dark:border-charcoal')
                        }
                    >
                        {tier.popular && (
                            <span className="absolute -top-3 left-5 rounded-lg bg-cyan px-2 py-0.5 text-caption font-semibold text-white">
                                Most popular
                            </span>
                        )}
                        <h3 className="text-heading font-semibold text-navy dark:text-white">
                            {tier.name}
                        </h3>
                        <div className="mt-2">
                            <span className="text-heading-l font-bold text-navy dark:text-white">
                                {tier.price}
                            </span>
                            <span className="ml-1 text-caption text-grey dark:text-light-grey">
                                /fortnight
                            </span>
                        </div>
                        <ul className="mt-4 flex-1 space-y-2 text-body-small text-grey dark:text-light-grey">
                            {tier.features.map(feature => (
                                <li key={feature} className="flex gap-2">
                                    <Check />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <button
                            className={
                                'mt-5 ' +
                                (isSelected
                                    ? 'button'
                                    : 'button button--secondary')
                            }
                            aria-pressed={isSelected}
                            onClick={() => setSelected(tier.name)}
                        >
                            {isSelected ? 'Selected' : 'Select'}
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

const Page: NextPageWithLayout = () => (
    <DesignSystemLayout title="Plan cards" toc={toc}>
        <PageHeader
            eyebrow="Composite patterns"
            title="Plan cards"
            status="in-review"
            intro="A row of tiered price cards that lets a member compare cover levels side by side and pick one. Each card states a tier, its fortnightly price, the headline inclusions and a single select action."
        />

        <p className="text-grey dark:text-light-grey">
            This is a proposed pattern identified from the bupa.com.au audit. It
            is not yet a shipped component — this page is a reference spec for
            adoption.
        </p>

        <Section id="tiers" title="Tiered cards">
            <p className="text-grey dark:text-light-grey">
                Three tiers compare against each other. The recommended tier
                carries a <code className="font-mono text-cyan">Most popular</code>{' '}
                badge and a <code className="font-mono text-cyan">border-cyan</code>{' '}
                outline; selecting a card promotes its action to a primary
                button. Cards stack on small screens.
            </p>
            <Example
                caption="Three plan tiers with a recommended option and a selected state"
                code={`const [selected, setSelected] = useState('Silver')

<div className="grid w-full gap-4 sm:grid-cols-3">
  {tiers.map(tier => {
    const isSelected = selected === tier.name
    return (
      <div
        key={tier.name}
        className={
          'relative flex flex-col rounded-xl border bg-white dark:bg-cool-grey p-5 ' +
          (tier.popular
            ? 'border-cyan shadow'
            : 'border-cool-paper-200 dark:border-charcoal')
        }
      >
        {tier.popular && (
          <span className="absolute -top-3 left-5 rounded-lg bg-cyan px-2 py-0.5 text-caption font-semibold text-white">
            Most popular
          </span>
        )}
        <h3 className="text-heading font-semibold text-navy dark:text-white">
          {tier.name}
        </h3>
        <div className="mt-2">
          <span className="text-heading-l font-bold text-navy dark:text-white">
            {tier.price}
          </span>
          <span className="ml-1 text-caption text-grey dark:text-light-grey">
            /fortnight
          </span>
        </div>
        <ul className="mt-4 flex-1 space-y-2 text-body-small text-grey dark:text-light-grey">
          {tier.features.map(feature => (
            <li key={feature} className="flex gap-2">
              <Check />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <button
          className={'mt-5 ' + (isSelected ? 'button' : 'button button--secondary')}
          aria-pressed={isSelected}
          onClick={() => setSelected(tier.name)}
        >
          {isSelected ? 'Selected' : 'Select'}
        </button>
      </div>
    )
  })}
</div>`}
            >
                <PlanCardsDemo />
            </Example>
        </Section>

        <Section id="api" title="Props">
            <PropsTable
                label="Prop"
                rows={[
                    {
                        name: 'tiers',
                        type: 'Tier[]',
                        required: true,
                        description:
                            'The plans to compare. Each has a name, price, feature list and optional popular flag.',
                    },
                    {
                        name: 'selected',
                        type: 'string',
                        description:
                            'Name of the currently chosen tier. Controlled by the parent.',
                    },
                    {
                        name: 'onSelect',
                        type: '(name: string) => void',
                        required: true,
                        description:
                            'Called with the tier name when its select action is pressed.',
                    },
                    {
                        name: 'priceCaption',
                        type: 'string',
                        default: "'/fortnight'",
                        description:
                            'Caption rendered after each price, e.g. the billing frequency.',
                    },
                ]}
            />
        </Section>

        <Section id="guidelines" title="Guidelines">
            <DoDontGrid>
                <Do note="Limit the row to three or four tiers, make the recommended choice obvious with a badge and border, and align feature rows so plans read as a comparison.">
                    <div className="flex gap-3">
                        <span className="rounded-lg border border-cool-paper-200 dark:border-charcoal px-3 py-2 text-body-small text-grey dark:text-light-grey">
                            Bronze
                        </span>
                        <span className="rounded-lg border border-cyan px-3 py-2 text-body-small font-semibold text-navy dark:text-white">
                            Silver
                        </span>
                        <span className="rounded-lg border border-cool-paper-200 dark:border-charcoal px-3 py-2 text-body-small text-grey dark:text-light-grey">
                            Gold
                        </span>
                    </div>
                </Do>
                <Dont note="Don't show more than four tiers or leave features misaligned — comparison breaks down and no option stands out as recommended.">
                    <div className="flex flex-wrap gap-2">
                        <span className="rounded-lg border border-cool-paper-200 dark:border-charcoal px-2 py-1 text-caption text-grey dark:text-light-grey">
                            Tier 1
                        </span>
                        <span className="rounded-lg border border-cool-paper-200 dark:border-charcoal px-2 py-1 text-caption text-grey dark:text-light-grey">
                            Tier 2
                        </span>
                        <span className="rounded-lg border border-cool-paper-200 dark:border-charcoal px-2 py-1 text-caption text-grey dark:text-light-grey">
                            Tier 3
                        </span>
                        <span className="rounded-lg border border-cool-paper-200 dark:border-charcoal px-2 py-1 text-caption text-grey dark:text-light-grey">
                            Tier 4
                        </span>
                        <span className="rounded-lg border border-cool-paper-200 dark:border-charcoal px-2 py-1 text-caption text-grey dark:text-light-grey">
                            Tier 5
                        </span>
                    </div>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default Page
