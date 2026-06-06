import Link from 'next/link'
import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import { PageHeader, StatusBadge } from '../../../styleguide-components/primitives'
import { hrefFor } from '../../../styleguide-components/designSystem.config'
import {
    componentCount,
    componentLayers,
} from '../../../styleguide-components/componentCatalog'

const toc = componentLayers.map(layer => ({
    id: layer.title.toLowerCase(),
    title: layer.title,
}))

const Components: NextPageWithLayout = () => (
    <DesignSystemLayout title="Components" toc={toc}>
        <PageHeader
            eyebrow="Components"
            title="Component library"
            intro={`The ${componentCount} components that make up the Bupa Aged Care experience, organised by atomic-design layer. Components marked "Stable" have a dedicated page with live examples; the rest are catalogued here while their pages are written.`}
        />

        {componentLayers.map(layer => (
            <section key={layer.title} id={layer.title.toLowerCase()} className="scroll-mt-24 mt-12">
                <h2 className="text-heading-l font-bold text-navy dark:text-white">
                    {layer.title}
                </h2>
                <p className="mt-2 mb-5 max-w-2xl text-grey dark:text-light-grey">
                    {layer.description}
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                    {layer.components.map(component => {
                        const inner = (
                            <>
                                <div className="flex items-center justify-between gap-2">
                                    <span className="font-semibold text-navy dark:text-white">
                                        {component.name}
                                    </span>
                                    <StatusBadge status={component.status} />
                                </div>
                                <p className="mt-1 text-body-small text-grey dark:text-light-grey">
                                    {component.description}
                                </p>
                                <code className="mt-2 block font-mono text-caption text-disabled-text break-all">
                                    {component.source}
                                </code>
                            </>
                        )
                        const baseClass =
                            'block rounded-xl border border-cool-paper-200 dark:border-charcoal p-5 bg-white dark:bg-cool-grey'
                        return component.docSlug ? (
                            <Link key={component.name} href={hrefFor(component.docSlug)}>
                                <a className={`${baseClass} hover:border-cyan transition-colors`}>
                                    {inner}
                                </a>
                            </Link>
                        ) : (
                            <div key={component.name} className={baseClass}>
                                {inner}
                            </div>
                        )
                    })}
                </div>
            </section>
        ))}
    </DesignSystemLayout>
)

export default Components
