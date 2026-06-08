import Link from 'next/link'
import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import { PageHeader, Section } from '../../../styleguide-components/primitives'
import { ComponentThumbnail } from '../../../styleguide-components/componentPreviews'
import { hrefFor } from '../../../styleguide-components/designSystem.config'
import {
    ComponentEntry,
    componentCount,
    componentLayers,
} from '../../../styleguide-components/componentCatalog'

/*
    The Aged Care component catalogue. It mirrors the WHOLE library by atomic
    layer (the same data the core overview uses), but routes each card to the
    right place: aged-care-specific components link to their deep-dive in this
    section, while shared components cross-link to their canonical core page —
    no content is duplicated. This gives the Aged Care brand full-coverage
    visibility of every component the live site is built from.
*/

interface Resolved {
    href: string
    /** True when the link leaves the Aged Care section for the core docs. */
    external: boolean
}

/**
 * An aged-care deep-dive wins; otherwise a docSlug already pointing into the
 * aged-care section counts as internal (the five repointed components); any
 * other docSlug is a cross-link out to core.
 */
const resolve = (component: ComponentEntry): Resolved | undefined => {
    const internalSlug =
        component.agedCareSlug ??
        (component.docSlug?.startsWith('aged-care/')
            ? component.docSlug
            : undefined)
    if (internalSlug) return { href: hrefFor(internalSlug), external: false }
    if (component.docSlug) return { href: hrefFor(component.docSlug), external: true }
    return undefined
}

const toc = componentLayers.map(layer => ({
    id: layer.title.toLowerCase(),
    title: layer.title,
}))

const Card = ({ component }: { component: ComponentEntry }) => {
    const resolved = resolve(component)
    const inner = (
        <>
            <ComponentThumbnail name={component.name} />
            <div className="p-5">
                <span className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-navy dark:text-white">
                        {component.name}
                    </span>
                    {resolved?.external && (
                        <span className="flex-none text-caption font-semibold text-cyan">
                            Core ↗
                        </span>
                    )}
                </span>
                <p className="mt-1 text-body-small text-grey dark:text-light-grey">
                    {component.description}
                </p>
            </div>
        </>
    )
    const baseClass =
        'block rounded-xl border border-cool-paper-200 dark:border-charcoal overflow-hidden bg-white dark:bg-cool-grey'

    if (!resolved) {
        return <div className={baseClass}>{inner}</div>
    }
    return (
        <Link href={resolved.href}>
            <a className={`${baseClass} hover:border-cyan transition-colors`}>
                {inner}
            </a>
        </Link>
    )
}

const AgedCareComponents: NextPageWithLayout = () => (
    <DesignSystemLayout title="Component library" toc={toc} wide>
        <PageHeader
            eyebrow="Aged Care"
            title="Component library"
            status="stable"
            intro={`Every one of the ${componentCount} components that make up the Bupa Aged Care experience, organised by atomic-design layer. Aged-care-specific components have a deep dive in this section; shared components link to their canonical page in the core library (marked “Core ↗”).`}
        />

        {componentLayers.map(layer => (
            <Section key={layer.title} id={layer.title.toLowerCase()} title={layer.title}>
                <p className="mb-5 max-w-2xl text-grey dark:text-light-grey">
                    {layer.description}
                </p>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {layer.components.map(component => (
                        <Card key={component.name} component={component} />
                    ))}
                </div>
            </Section>
        ))}
    </DesignSystemLayout>
)

export default AgedCareComponents
