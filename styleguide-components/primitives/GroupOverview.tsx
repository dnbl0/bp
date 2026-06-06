import { ComponentGroup } from '../componentGroups'
import { PageHeader } from './PageHeader'

/** Renders a themed group page from its data: a header plus a card per component. */
export const GroupOverview = ({ group }: { group: ComponentGroup }) => (
    <>
        <PageHeader eyebrow={group.eyebrow} title={group.title} intro={group.intro} />
        <div className="space-y-4">
            {group.entries.map(entry => (
                <div
                    key={entry.name}
                    className="rounded-xl border border-cool-paper-200 dark:border-charcoal p-5 bg-white dark:bg-cool-grey"
                >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h2 className="text-heading-s font-semibold text-navy dark:text-white">
                            {entry.name}
                        </h2>
                        <code className="font-mono text-caption text-disabled-text break-all">
                            {entry.source}
                        </code>
                    </div>
                    <p className="mt-2 text-body-small text-grey dark:text-light-grey">
                        {entry.summary}
                    </p>
                    <p className="mt-2 text-body-small text-grey dark:text-light-grey">
                        <span className="font-semibold text-navy dark:text-white">
                            Integration:{' '}
                        </span>
                        {entry.note}
                    </p>
                </div>
            ))}
        </div>
    </>
)
