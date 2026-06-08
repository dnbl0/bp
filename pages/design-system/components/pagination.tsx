import { useState } from 'react'
import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import { ComponentHero } from '../../../styleguide-components/componentPreviews'
import {
    PageHeader,
    Section,
    Example,
    PropsTable,
    Do,
    Dont,
    DoDontGrid,
} from '../../../styleguide-components/primitives'
import { Pagination } from '../../../components/atoms/Pagination'

const toc = [
    { id: 'example', title: 'Example' },
    { id: 'props', title: 'Props' },
    { id: 'behaviour', title: 'Behaviour' },
    { id: 'guidelines', title: 'Guidelines' },
]

const PaginationDemo = () => {
    const [page, setPage] = useState(4)
    return (
        <div className="flex flex-col items-center gap-3">
            <Pagination page={page} totalPages={12} onPageChange={setPage} />
            <span className="text-sm text-grey dark:text-light-grey">
                Showing page {page} of 12
            </span>
        </div>
    )
}

const Page: NextPageWithLayout = () => (
    <DesignSystemLayout title="Pagination" toc={toc}>
        <PageHeader
            eyebrow="Components · Atoms"
            title="Pagination"
            status="stable"
            intro="Numbered page navigation for long listings such as search results and the health-information article hub. It truncates with ellipses around the current page and exposes previous/next controls."
        />

        <ComponentHero name="Pagination" />

        <Section id="example" title="Example">
            <Example
                caption="The current page is highlighted; first and last pages are always shown"
                code={`const [page, setPage] = useState(4)

<Pagination page={page} totalPages={12} onPageChange={setPage} />`}
            >
                <PaginationDemo />
            </Example>
        </Section>

        <Section id="props" title="Props">
            <PropsTable
                rows={[
                    {
                        name: 'page',
                        type: 'number',
                        required: true,
                        description: 'The current page, 1-indexed.',
                    },
                    {
                        name: 'totalPages',
                        type: 'number',
                        required: true,
                        description:
                            'The total number of pages. The component renders nothing when this is 1 or less.',
                    },
                    {
                        name: 'onPageChange',
                        type: '(page: number) => void',
                        required: true,
                        description:
                            'Called with the requested page when the user navigates.',
                    },
                    {
                        name: 'siblingCount',
                        type: 'number',
                        default: '1',
                        description:
                            'How many numbered links to show either side of the current page.',
                    },
                ]}
            />
        </Section>

        <Section id="behaviour" title="Behaviour">
            <ul className="list-disc pl-5 space-y-2 text-grey dark:text-light-grey">
                <li>
                    The first and last pages are always shown; the middle is
                    truncated with an ellipsis when it does not fit.
                </li>
                <li>
                    Previous/next controls disable at the start and end of the
                    range.
                </li>
                <li>
                    The active page carries{' '}
                    <span className="font-mono">
                        aria-current=&quot;page&quot;
                    </span>{' '}
                    and the nav is labelled for screen readers.
                </li>
            </ul>
        </Section>

        <Section id="guidelines" title="Guidelines">
            <DoDontGrid>
                <Do note="Use pagination for long listings so users can jump to first, last and nearby pages.">
                    <Pagination page={4} totalPages={12} onPageChange={() => {}} />
                </Do>
                <Dont note="Don't paginate a handful of results — show them all rather than spreading them over single-item pages.">
                    <Pagination page={1} totalPages={2} onPageChange={() => {}} />
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default Page
