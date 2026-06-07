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
    { id: 'browse', title: 'Topic browser' },
    { id: 'articles', title: 'Article list' },
    { id: 'api', title: 'Props' },
    { id: 'guidelines', title: 'Guidelines' },
]

const SearchIcon = () => (
    <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
    </svg>
)

const ChevronIcon = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="m9 18 6-6-6-6" />
    </svg>
)

const TopicIcon = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
)

const topics = [
    {
        title: 'Claims & payments',
        description: 'Submit a claim, track payments and update your bank details.',
        count: 12,
    },
    {
        title: 'My membership',
        description: 'Change your cover, add a dependant or update your details.',
        count: 9,
    },
    {
        title: 'Going to hospital',
        description: 'Check what’s covered, find an agreement hospital and plan ahead.',
        count: 7,
    },
    {
        title: 'Extras & wellbeing',
        description: 'Dental, optical, physio and the limits that apply to each.',
        count: 15,
    },
]

const articles = [
    'How do I make an extras claim online?',
    'What does my hospital cover include?',
    'Adding a partner or child to my policy',
    'Updating my bank or contact details',
    'Understanding waiting periods',
]

const TopicBrowserDemo = () => {
    const [query, setQuery] = useState('')
    const filtered = topics.filter(t =>
        t.title.toLowerCase().includes(query.toLowerCase())
    )
    return (
        <div className="w-full">
            <label className="relative block">
                <span className="sr-only">Search help articles</span>
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-grey dark:text-light-grey">
                    <SearchIcon />
                </span>
                <input
                    type="search"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search help articles"
                    className="w-full rounded-full border border-cool-paper-200 dark:border-charcoal bg-white dark:bg-grey py-2 pl-10 pr-4 text-body-small text-navy dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue"
                />
            </label>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {filtered.map(topic => (
                    <a
                        key={topic.title}
                        href="#"
                        className="block rounded-xl border border-cool-paper-200 dark:border-charcoal bg-white dark:bg-cool-grey p-4 shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue"
                    >
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-50 text-cyan">
                            <TopicIcon />
                        </span>
                        <span className="mt-3 block text-heading-s font-semibold text-navy dark:text-white">
                            {topic.title}
                        </span>
                        <span className="mt-1 block text-body-small text-grey dark:text-light-grey">
                            {topic.description}
                        </span>
                        <span className="mt-2 inline-flex items-center gap-1 text-body-small font-semibold text-cyan">
                            View {topic.count} articles
                            <ChevronIcon />
                        </span>
                    </a>
                ))}
                {filtered.length === 0 && (
                    <p className="text-body-small text-grey dark:text-light-grey">
                        No topics match “{query}”.
                    </p>
                )}
            </div>
        </div>
    )
}

const ArticleListDemo = () => (
    <div className="w-full max-w-md rounded-xl border border-cool-paper-200 dark:border-charcoal bg-white dark:bg-cool-grey overflow-hidden">
        <div className="border-b border-cool-paper-200 dark:border-charcoal px-4 py-3">
            <h3 className="text-heading-s font-semibold text-navy dark:text-white">
                Claims &amp; payments
            </h3>
        </div>
        <ul>
            {articles.map(article => (
                <li
                    key={article}
                    className="border-t border-cool-paper-200 dark:border-charcoal first:border-t-0"
                >
                    <a
                        href="#"
                        className="flex items-center justify-between gap-3 px-4 py-3 text-body-small text-navy dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue hover:bg-cool-paper-50 dark:hover:bg-grey"
                    >
                        <span>{article}</span>
                        <span className="flex-none text-grey dark:text-light-grey">
                            <ChevronIcon />
                        </span>
                    </a>
                </li>
            ))}
        </ul>
    </div>
)

const Page: NextPageWithLayout = () => (
    <DesignSystemLayout title="Help hub" toc={toc}>
        <PageHeader
            eyebrow="Composite patterns"
            title="Help hub"
            status="in-review"
            intro="A categorised help-article browser: a prominent search field paired with a grid of topic cards, plus a drill-down list of articles within a category. It lets people either jump straight to an answer or browse by subject."
        />

        <p className="text-grey dark:text-light-grey">
            This is a proposed pattern identified from the bupa.com.au audit. It
            is not yet a shipped component — this page is a reference spec for
            adoption.
        </p>

        <Section id="browse" title="Topic browser">
            <p className="text-grey dark:text-light-grey">
                Search sits at the top, followed by a card per category. Typing
                filters the visible topics by title so search and browse work
                together rather than as separate journeys.
            </p>
            <Example
                caption="Search filters a grid of topic cards"
                code={`const [query, setQuery] = useState('')
const filtered = topics.filter(t =>
  t.title.toLowerCase().includes(query.toLowerCase())
)

<label className="relative block">
  <span className="sr-only">Search help articles</span>
  <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-grey dark:text-light-grey">
    <SearchIcon />
  </span>
  <input
    type="search"
    value={query}
    onChange={e => setQuery(e.target.value)}
    placeholder="Search help articles"
    className="w-full rounded-full border border-cool-paper-200 dark:border-charcoal bg-white dark:bg-grey py-2 pl-10 pr-4 text-body-small text-navy dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue"
  />
</label>

<div className="mt-4 grid gap-3 sm:grid-cols-2">
  {filtered.map(topic => (
    <a key={topic.title} href="#" className="block rounded-xl border border-cool-paper-200 dark:border-charcoal bg-white dark:bg-cool-grey p-4 shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-50 text-cyan">
        <TopicIcon />
      </span>
      <span className="mt-3 block text-heading-s font-semibold text-navy dark:text-white">{topic.title}</span>
      <span className="mt-1 block text-body-small text-grey dark:text-light-grey">{topic.description}</span>
      <span className="mt-2 inline-flex items-center gap-1 text-body-small font-semibold text-cyan">
        View {topic.count} articles
        <ChevronIcon />
      </span>
    </a>
  ))}
</div>`}
            >
                <TopicBrowserDemo />
            </Example>
        </Section>

        <Section id="articles" title="Article list">
            <p className="text-grey dark:text-light-grey">
                Choosing a category opens a flat list of article links. Each row
                is a single tap target with a trailing chevron to signal it
                navigates onward.
            </p>
            <Example
                caption="A single category’s article list"
                code={`<div className="rounded-xl border border-cool-paper-200 dark:border-charcoal bg-white dark:bg-cool-grey overflow-hidden">
  <div className="border-b border-cool-paper-200 dark:border-charcoal px-4 py-3">
    <h3 className="text-heading-s font-semibold text-navy dark:text-white">Claims &amp; payments</h3>
  </div>
  <ul>
    {articles.map(article => (
      <li key={article} className="border-t border-cool-paper-200 dark:border-charcoal first:border-t-0">
        <a href="#" className="flex items-center justify-between gap-3 px-4 py-3 text-body-small text-navy dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue hover:bg-cool-paper-50 dark:hover:bg-grey">
          <span>{article}</span>
          <span className="flex-none text-grey dark:text-light-grey"><ChevronIcon /></span>
        </a>
      </li>
    ))}
  </ul>
</div>`}
            >
                <ArticleListDemo />
            </Example>
        </Section>

        <Section id="api" title="Props">
            <PropsTable
                label="Prop"
                rows={[
                    {
                        name: 'topics',
                        type: 'HelpTopic[]',
                        required: true,
                        description:
                            'The categories to render as cards, each with a title, description and article count.',
                    },
                    {
                        name: 'query',
                        type: 'string',
                        description:
                            'Controlled search term. Omit to let the hub manage its own search state.',
                    },
                    {
                        name: 'onQueryChange',
                        type: '(query: string) => void',
                        description:
                            'Called as the search term changes when search is controlled.',
                    },
                    {
                        name: 'onSelectTopic',
                        type: '(id: string) => void',
                        description:
                            'Called when a topic card is chosen, to load its article list.',
                    },
                    {
                        name: 'searchPlaceholder',
                        type: 'string',
                        default: "'Search help articles'",
                        description: 'Placeholder text for the search field.',
                    },
                ]}
            />
        </Section>

        <Section id="guidelines" title="Guidelines">
            <p className="text-grey dark:text-light-grey">
                Lead with the few topics that resolve most queries, and keep the
                hierarchy shallow so an answer is never more than a couple of
                taps away.
            </p>
            <DoDontGrid>
                <Do note="Surface popular topics first and pair search with browse, so people can either look something up or explore by category.">
                    <div className="w-44 rounded-xl border border-cool-paper-200 dark:border-charcoal bg-white dark:bg-cool-grey p-3">
                        <div className="flex items-center gap-2 rounded-full border border-cool-paper-200 dark:border-charcoal px-3 py-1 text-grey dark:text-light-grey">
                            <SearchIcon />
                            <span className="text-caption">Search</span>
                        </div>
                        <div className="mt-2 h-8 rounded-lg bg-cyan-50" />
                    </div>
                </Do>
                <Dont note="Don’t bury articles under deep nested menus — keep categories shallow and avoid forcing search as the only way in.">
                    <div className="w-44 space-y-1">
                        <div className="h-5 rounded bg-cool-paper-100 dark:bg-grey" />
                        <div className="ml-3 h-5 rounded bg-cool-paper-100 dark:bg-grey" />
                        <div className="ml-6 h-5 rounded bg-cool-paper-100 dark:bg-grey" />
                        <div className="ml-9 h-5 rounded bg-cool-paper-100 dark:bg-grey" />
                    </div>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default Page
