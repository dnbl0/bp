import { marked } from 'marked'
import sanitizeHtml from 'sanitize-html'
import { cx } from '../../../utils/cx'

// NOTE: This component has been copied from an old project to act
// as a starting point. I'm not sure if it is a good fit for this project.
export const MarkdownBlock = ({
    content,
    className,
}: {
    content?: string
    className?: string
}) => {
    const baseUrl = process.env.NEXT_PUBLIC_DOMAIN
        ? `https://${process.env.NEXT_PUBLIC_DOMAIN}`
        : ''
    const renderer = {
        link(href: string | null, title: string | null, text: string) {
            const target =
                (!href?.startsWith(baseUrl) && !href?.startsWith('/')) ||
                href?.includes('#newtab')
                    ? 'target="_blank" rel="noreferrer"'
                    : ''
            return `<a href=${href!.replace(
                '#newtab',
                ''
            )} title=${title!} ${href!.replace('#newtab', '')} ${target}>
                    ${text}
                </a>`
        },
        heading(text: string, level: number) {
            const fontSizeClass = () => {
                switch (level) {
                    case 3:
                        return 'text-heading-s'
                    case 2:
                        return 'text-heading-m'
                    case 1:
                        return 'text-heading-l'
                    default:
                        return 'text-heading-m'
                }
            }
            return `
            <h${level} class="${fontSizeClass()} font-medium text-navy">
              ${text}
            </h${level}>`
        },
        list(body: string, ordered: boolean, start: number) {
            const listType = ordered
                ? `<ol start="${start}">${body}</ol>`
                : `<ul class="list-disc not-prose">${body}</ul>`
            return listType
        },
        listitem(text: string, task: boolean, checked: boolean) {
            return `
            <li><p class="my-2.5 whitespace-pre-line">${text}</p></li>`
        },
    }
    marked.use({ renderer })
    const markdown =
        content &&
        sanitizeHtml(marked.parse(content), {
            allowedClasses: {
                '*': [
                    'font-medium',
                    'text-heading-s',
                    'text-heading-m',
                    'text-heading-l',
                    'list-disc',
                    'ml-6',
                    'text-navy',
                    'whitespace-pre-line',
                    'my-2.5',
                    'not-prose',
                ],
            },
            allowedAttributes: {
                ol: ['start'],
                a: ['href', 'title', 'target'],
            },
        })
    return (
        <div
            className={cx('prose max-w-none', className)}
            dangerouslySetInnerHTML={{ __html: markdown || '' }}
        />
    )
}
