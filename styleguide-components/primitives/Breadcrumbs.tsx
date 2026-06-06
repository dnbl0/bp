import Link from 'next/link'
import { ChevronRightIcon } from '../../components/atoms/icons/ChevronRightIcon'
import {
    allDocs,
    BASE_PATH,
    hrefFor,
    sectionTitleFor,
    SITE_TITLE,
} from '../designSystem.config'

const Separator = () => (
    <ChevronRightIcon className="w-2.5 h-2.5 fill-disabled-text flex-none" />
)

/**
 * The `Home → Section → Page` trail shown above each page, derived from the
 * page slug and the nav section that contains it.
 */
export const Breadcrumbs = ({ slug }: { slug: string }) => {
    // The introduction page is the root — no trail needed.
    if (!slug) return null

    const doc = allDocs.find(item => item.slug === slug)
    const section = sectionTitleFor(slug)
    const title = doc?.title ?? slug

    return (
        <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-caption text-grey dark:text-light-grey">
                <li>
                    <Link href={BASE_PATH}>
                        <a className="hover:text-cyan">{SITE_TITLE}</a>
                    </Link>
                </li>
                {section && (
                    <li className="flex items-center gap-2">
                        <Separator />
                        <span>{section}</span>
                    </li>
                )}
                <li className="flex items-center gap-2">
                    <Separator />
                    <span aria-current="page" className="font-semibold text-navy dark:text-white">
                        {title}
                    </span>
                </li>
            </ol>
        </nav>
    )
}
