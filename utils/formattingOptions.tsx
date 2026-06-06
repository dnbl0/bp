import { INLINES, BLOCKS, Node } from '@contentful/rich-text-types'
import Link from 'next/link'

const baseUrl = process.env.NEXT_PUBLIC_DOMAIN
    ? `https://${process.env.NEXT_PUBLIC_DOMAIN}`
    : ''

export const formattingOptions = {
    renderNode: {
        [INLINES.HYPERLINK]: (node: Node, children: React.ReactNode) => (
            <Link href={node.data.uri}>
                {(!node.data.uri.startsWith(baseUrl) &&
                    !node.data.uri.startsWith('/') &&
                    !node.data.uri.startsWith('tel:')) ||
                node.data.uri.includes('#newtab') ? (
                    <a
                        className="underline"
                        href={node.data.uri.replace('#newtab', '')}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {children}
                    </a>
                ) : (
                    <a className="underline" href={node.data.uri}>
                        {children}
                    </a>
                )}
            </Link>
        ),
        [BLOCKS.PARAGRAPH]: (node: Node, children: React.ReactNode) => (
            <p className="my-2.5 whitespace-pre-line">{children}</p>
        ),
        [BLOCKS.HEADING_1]: (node: Node, children: React.ReactNode) => (
            <h1 className="text-heading-l font-medium mt-12 text-navy">
                {children}
            </h1>
        ),
        [BLOCKS.HEADING_2]: (node: Node, children: React.ReactNode) => (
            <h2 className="mb-3 text-heading-m font-medium text-navy">
                {children}
            </h2>
        ),
        [BLOCKS.HEADING_3]: (node: Node, children: React.ReactNode) => (
            <h3 className="text-heading-s font-medium text-navy">{children}</h3>
        ),
        [BLOCKS.UL_LIST]: (node: Node, children: React.ReactNode) => (
            <ul className="list-disc ml-6">{children}</ul>
        ),
    },
}

export const formattingOptionsForColouredCard = {
    renderNode: {
        [INLINES.HYPERLINK]: (node: Node, children: React.ReactNode) => (
            <Link href={node.data.uri}>
                {(!node.data.uri.startsWith(baseUrl) &&
                    !node.data.uri.startsWith('/') &&
                    !node.data.uri.startsWith('tel:')) ||
                node.data.uri.includes('#newtab') ? (
                    <a
                        className="underline"
                        href={node.data.uri.replace('#newtab', '')}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {children}
                    </a>
                ) : (
                    <a className="underline" href={node.data.uri}>
                        {children}
                    </a>
                )}
            </Link>
        ),
        [BLOCKS.PARAGRAPH]: (node: Node, children: React.ReactNode) => (
            <p className="my-2.5 whitespace-pre-line">{children}</p>
        ),
        [BLOCKS.HEADING_1]: (node: Node, children: React.ReactNode) => (
            <h1 className="text-heading-l font-medium mt-12 text-white">
                {children}
            </h1>
        ),
        [BLOCKS.HEADING_2]: (node: Node, children: React.ReactNode) => (
            <h2 className="mb-3 text-heading-m font-medium text-white">
                {children}
            </h2>
        ),
        [BLOCKS.HEADING_3]: (node: Node, children: React.ReactNode) => (
            <h3 className="text-heading-s font-medium text-white">
                {children}
            </h3>
        ),
        [BLOCKS.UL_LIST]: (node: Node, children: React.ReactNode) => (
            <ul className="list-disc ml-6">{children}</ul>
        ),
    },
}
