import Link from 'next/link'
import { NextPageWithLayout } from '../../types/nextLayout'
import { DesignSystemLayout } from '../../styleguide-components/DesignSystemLayout'
import { PageHeader, Section, StatusBadge } from '../../styleguide-components/primitives'
import {
    allDocs,
    DocStatus,
    hrefFor,
    navSections,
} from '../../styleguide-components/designSystem.config'

const STATUSES: DocStatus[] = ['stable', 'in-review', 'planned']

const counts = STATUSES.map(status => ({
    status,
    count: allDocs.filter(doc => (doc.status ?? 'stable') === status).length,
}))

const toc = [
    { id: 'summary', title: 'Summary' },
    { id: 'by-section', title: 'By section' },
]

const Status: NextPageWithLayout = () => (
    <DesignSystemLayout title="Component status" toc={toc}>
        <PageHeader
            eyebrow="Overview"
            title="Component status"
            status="stable"
            intro="A single view of every documented page and its maturity, generated directly from the navigation index. Use it to see coverage at a glance and to find what is still in review or planned."
        />

        <Section id="summary" title="Summary">
            <div className="grid grid-cols-3 gap-4">
                {counts.map(({ status, count }) => (
                    <div
                        key={status}
                        className="rounded-xl border border-cool-paper-200 dark:border-charcoal p-5 text-center"
                    >
                        <div className="text-heading-l font-bold text-navy dark:text-white">
                            {count}
                        </div>
                        <div className="mt-2 flex justify-center">
                            <StatusBadge status={status} />
                        </div>
                    </div>
                ))}
            </div>
        </Section>

        <Section id="by-section" title="By section">
            <div className="space-y-8">
                {navSections.map(section => (
                    <div key={section.title}>
                        <h3 className="text-heading-s font-semibold text-navy dark:text-white mb-2">
                            {section.title}
                        </h3>
                        <div className="overflow-x-auto rounded-lg border border-cool-paper-200 dark:border-charcoal">
                            <table className="w-full text-left border-collapse text-body-small">
                                <tbody>
                                    {section.items.map(item => (
                                        <tr
                                            key={item.slug || 'overview'}
                                            className="border-t border-cool-paper-200 dark:border-charcoal first:border-t-0"
                                        >
                                            <td className="px-4 py-3">
                                                <Link href={hrefFor(item.slug)}>
                                                    <a className="font-semibold text-navy dark:text-white hover:text-cyan">
                                                        {item.title}
                                                    </a>
                                                </Link>
                                            </td>
                                            <td className="px-4 py-3 text-grey dark:text-light-grey hidden sm:table-cell">
                                                {item.summary}
                                            </td>
                                            <td className="px-4 py-3 text-right whitespace-nowrap">
                                                <StatusBadge
                                                    status={item.status ?? 'stable'}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    </DesignSystemLayout>
)

export default Status
