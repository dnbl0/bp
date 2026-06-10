import { NextPageWithLayout } from '../../../../types/nextLayout'
import { DesignSystemLayout } from '../../../../styleguide-components/DesignSystemLayout'
import { PageHeader, Section, SwatchGrid } from '../../../../styleguide-components/primitives'
import { colorGroups } from '../../../../styleguide-components/tokens'

const slugify = (value: string): string =>
    value.toLowerCase().replace(/[^a-z]+/g, '-').replace(/^-|-$/g, '')

const toc = colorGroups.map(group => ({ id: slugify(group.name), title: group.name }))

const Color: NextPageWithLayout = () => (
    <DesignSystemLayout title="Color tokens" toc={toc}>
        <PageHeader
            eyebrow="Design tokens"
            title="Color"
            status="stable"
            intro="Every colour in the Bupa palette as a Tailwind token. Values are read live from tailwind.config.js — use the token name as a Tailwind class prefix such as bg-, text-, border-, or fill-."
        />

        {colorGroups.map(group => (
            <Section key={group.name} id={slugify(group.name)} title={group.name}>
                <p className="text-grey dark:text-light-grey">{group.description}</p>
                <SwatchGrid group={group} />
            </Section>
        ))}
    </DesignSystemLayout>
)

export default Color
