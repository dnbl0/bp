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
    { id: 'facets', title: 'Facet checkboxes' },
    { id: 'applied', title: 'Applied filters' },
    { id: 'sort', title: 'Sort' },
    { id: 'api', title: 'Props' },
    { id: 'guidelines', title: 'Guidelines' },
]

const FACETS = [
    'Hospital',
    'Extras',
    'Combined',
    'Singles',
    'Couples',
    'Families',
]

const FilteringDemo = () => {
    const [selected, setSelected] = useState<string[]>(['Hospital'])
    const [sort, setSort] = useState('relevance')

    const toggle = (facet: string) =>
        setSelected(current =>
            current.includes(facet)
                ? current.filter(f => f !== facet)
                : [...current, facet]
        )

    return (
        <div className="w-full max-w-md">
            <fieldset className="rounded-lg border border-cool-paper-200 dark:border-charcoal bg-white dark:bg-cool-grey p-4">
                <legend className="px-1 text-body-small font-semibold text-navy dark:text-white">
                    Cover type
                </legend>
                <div className="mt-2 flex flex-col gap-2">
                    {FACETS.map(facet => (
                        <label
                            key={facet}
                            className="flex items-center gap-2 text-body-small text-grey dark:text-light-grey"
                        >
                            <input
                                type="checkbox"
                                checked={selected.includes(facet)}
                                onChange={() => toggle(facet)}
                                className="h-4 w-4 rounded border-cool-paper-200 text-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue"
                            />
                            {facet}
                        </label>
                    ))}
                </div>
            </fieldset>

            {selected.length > 0 && (
                <div
                    className="mt-4 flex flex-wrap gap-2"
                    aria-label="Applied filters"
                >
                    {selected.map(facet => (
                        <button
                            key={facet}
                            type="button"
                            onClick={() => toggle(facet)}
                            aria-label={`Remove ${facet} filter`}
                            className="inline-flex items-center gap-1 rounded-full border border-cyan bg-cyan-50 px-3 py-1 text-caption text-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue"
                        >
                            {facet}
                            <span aria-hidden="true">✕</span>
                        </button>
                    ))}
                </div>
            )}

            <label className="mt-4 flex items-center gap-2 text-body-small text-grey dark:text-light-grey">
                Sort by
                <select
                    value={sort}
                    onChange={e => setSort(e.target.value)}
                    className="rounded-lg border border-cool-paper-200 dark:border-charcoal bg-white dark:bg-cool-grey px-3 py-2 text-body-small text-navy dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue"
                >
                    <option value="relevance">Relevance</option>
                    <option value="price-asc">Price: low to high</option>
                    <option value="price-desc">Price: high to low</option>
                </select>
            </label>
        </div>
    )
}

const Page: NextPageWithLayout = () => (
    <DesignSystemLayout title="Filtering" toc={toc}>
        <PageHeader
            eyebrow="Primitives"
            title="Filtering"
            status="in-review"
            intro="Controls that refine a list of results: facet checkboxes to narrow by attribute, removable chips that summarise what is applied, and a sort order. Together they let people focus a long list without losing track of their choices."
        />

        <p className="text-grey dark:text-light-grey">
            This is a proposed primitive identified from patterns on
            bupa.com.au. It is not yet a shipped component — this page is a
            reference spec for adoption.
        </p>

        <Section id="facets" title="Facet checkboxes">
            <p className="text-grey dark:text-light-grey">
                A grouped set of checkboxes in a panel narrows results by a
                single attribute. Each option is a real checkbox wrapped in a{' '}
                <code className="font-mono text-cyan">label</code>, so the whole
                row is clickable and keyboard-operable. Ticking a facet adds a
                matching chip below.
            </p>
            <Example
                caption="A facet group wired to shared state"
                code={`const [selected, setSelected] = useState<string[]>(['Hospital'])

const toggle = (facet: string) =>
  setSelected(current =>
    current.includes(facet)
      ? current.filter(f => f !== facet)
      : [...current, facet]
  )

<fieldset className="rounded-lg border border-cool-paper-200 dark:border-charcoal bg-white dark:bg-cool-grey p-4">
  <legend className="px-1 text-body-small font-semibold text-navy dark:text-white">
    Cover type
  </legend>
  {FACETS.map(facet => (
    <label key={facet} className="flex items-center gap-2 text-body-small text-grey dark:text-light-grey">
      <input
        type="checkbox"
        checked={selected.includes(facet)}
        onChange={() => toggle(facet)}
        className="h-4 w-4 rounded border-cool-paper-200 text-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue"
      />
      {facet}
    </label>
  ))}
</fieldset>`}
            >
                <FilteringDemo />
            </Example>
        </Section>

        <Section id="applied" title="Applied filters">
            <p className="text-grey dark:text-light-grey">
                Every active facet is mirrored as a removable chip. Each chip is
                a <code className="font-mono text-cyan">button</code> with an{' '}
                <code className="font-mono text-cyan">aria-label</code> like
                “Remove Hospital filter”; pressing it clears the same shared
                state that drives the checkboxes, so the panel and the chips
                stay in sync.
            </p>
            <Example
                caption="Removable filter chips driven by the same state"
                code={`{selected.length > 0 && (
  <div className="flex flex-wrap gap-2" aria-label="Applied filters">
    {selected.map(facet => (
      <button
        key={facet}
        type="button"
        onClick={() => toggle(facet)}
        aria-label={\`Remove \${facet} filter\`}
        className="inline-flex items-center gap-1 rounded-full border border-cyan bg-cyan-50 px-3 py-1 text-caption text-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue"
      >
        {facet}
        <span aria-hidden="true">✕</span>
      </button>
    ))}
  </div>
)}`}
            >
                <FilteringDemo />
            </Example>
        </Section>

        <Section id="sort" title="Sort">
            <p className="text-grey dark:text-light-grey">
                Sorting is independent of filtering: a single native{' '}
                <code className="font-mono text-cyan">select</code> reorders the
                results without changing which are shown. A native control
                keeps keyboard and screen-reader behaviour for free.
            </p>
            <Example
                caption="A native select for sort order"
                code={`const [sort, setSort] = useState('relevance')

<label className="flex items-center gap-2 text-body-small text-grey dark:text-light-grey">
  Sort by
  <select
    value={sort}
    onChange={e => setSort(e.target.value)}
    className="rounded-lg border border-cool-paper-200 dark:border-charcoal bg-white dark:bg-cool-grey px-3 py-2 text-body-small text-navy dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue"
  >
    <option value="relevance">Relevance</option>
    <option value="price-asc">Price: low to high</option>
    <option value="price-desc">Price: high to low</option>
  </select>
</label>`}
            >
                <FilteringDemo />
            </Example>
        </Section>

        <Section id="api" title="Props">
            <PropsTable
                label="Prop"
                rows={[
                    {
                        name: 'facets',
                        type: 'string[]',
                        required: true,
                        description:
                            'The available filter options shown as checkboxes.',
                    },
                    {
                        name: 'selected',
                        type: 'string[]',
                        required: true,
                        description:
                            'Currently applied facets. Controlled by the parent and shared with the chips.',
                    },
                    {
                        name: 'onToggle',
                        type: '(facet: string) => void',
                        required: true,
                        description:
                            'Adds or removes a facet, called from a checkbox or a chip.',
                    },
                    {
                        name: 'sort',
                        type: 'string',
                        required: true,
                        description: 'The current sort key for the result list.',
                    },
                    {
                        name: 'onSortChange',
                        type: '(sort: string) => void',
                        required: true,
                        description: 'Called when the sort order changes.',
                    },
                ]}
            />
        </Section>

        <Section id="guidelines" title="Guidelines">
            <DoDontGrid>
                <Do note="Mirror every applied facet as a removable chip so people can see and clear filters in one place without reopening the panel.">
                    <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1 rounded-full border border-cyan bg-cyan-50 px-3 py-1 text-caption text-cyan">
                            Hospital <span aria-hidden="true">✕</span>
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full border border-cyan bg-cyan-50 px-3 py-1 text-caption text-cyan">
                            Families <span aria-hidden="true">✕</span>
                        </span>
                    </div>
                </Do>
                <Dont note="Don't apply filters only on a separate “Apply” step when results can update live — and never let the chips and checkboxes fall out of sync.">
                    <div className="flex gap-3">
                        <button type="button" className="button button--secondary">
                            Apply filters
                        </button>
                        <button type="button" className="button button--ghost">
                            Clear
                        </button>
                    </div>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default Page
