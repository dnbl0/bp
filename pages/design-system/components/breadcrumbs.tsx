import { Fragment } from 'react'
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
    Anatomy,
} from '../../../styleguide-components/primitives'
import { ChevronRightIcon } from '../../../components/atoms/icons/ChevronRightIcon'

const trail = [
    { title: 'Home', link: '#' },
    { title: 'Aged care homes', link: '#' },
    { title: 'Victoria', link: '#' },
]

const toc = [
    { id: 'anatomy', title: 'Anatomy' },
    { id: 'example', title: 'Example' },
    { id: 'props', title: 'Props' },
    { id: 'behaviour', title: 'Behaviour' },
    { id: 'guidelines', title: 'Guidelines' },
]

const Breadcrumbs: NextPageWithLayout = () => (
    <DesignSystemLayout title="Breadcrumbs" toc={toc}>
        <PageHeader
            eyebrow="Components · Molecules"
            title="Breadcrumbs"
            status="stable"
            intro="A trail showing the current page's position in the site hierarchy, with the final crumb shown as the bold current page. Hidden on small screens to conserve space."
        />

        <ComponentHero name="BreadCrumbsBlock" />

        <Section id="anatomy" title="Anatomy">
            <Anatomy
                parts={[
                    { number: 1, name: 'Crumb link', description: 'A link to an ancestor page in the hierarchy.' },
                    { number: 2, name: 'Separator', description: 'A non-interactive divider between crumbs.' },
                    { number: 3, name: 'Current page', description: 'The final, non-linked crumb marking the current location.' },
                ]}
            >
                <div className="flex text-sm text-navy items-center flex-wrap">
                    {trail.map((crumb, index) => (
                        <Fragment key={index}>
                            <a className="underline hover:text-cyan" href={crumb.link}>
                                {crumb.title}
                            </a>
                            <ChevronRightIcon className="fill-navy mx-4 my-auto" />
                        </Fragment>
                    ))}
                    <span className="font-semibold">Sunshine Aged Care</span>
                </div>
            </Anatomy>
        </Section>

        <Section id="example" title="Example">
            <Example
                surface="tinted"
                code={`<div className="flex text-sm text-navy items-center flex-wrap">
  {trail.map((crumb, index) => (
    <Fragment key={index}>
      <a className="underline hover:text-cyan" href={crumb.link}>
        {crumb.title}
      </a>
      <ChevronRightIcon className="fill-navy mx-4 my-auto" />
    </Fragment>
  ))}
  <span className="font-semibold">Sunshine Aged Care</span>
</div>`}
            >
                <div className="flex text-sm text-navy items-center flex-wrap">
                    {trail.map((crumb, index) => (
                        <Fragment key={index}>
                            <a className="underline hover:text-cyan" href={crumb.link}>
                                {crumb.title}
                            </a>
                            <ChevronRightIcon className="fill-navy mx-4 my-auto" />
                        </Fragment>
                    ))}
                    <span className="font-semibold">Sunshine Aged Care</span>
                </div>
            </Example>
        </Section>

        <Section id="props" title="Props">
            <PropsTable
                rows={[
                    { name: 'breadcrumbs', type: 'BreadCrumb[]', description: 'Ordered ancestor crumbs, each with a title and link.' },
                    { name: 'title', type: 'string', required: true, description: 'The current page title; rendered bold and truncated at the first " |".' },
                ]}
            />
        </Section>

        <Section id="behaviour" title="Behaviour">
            <ul className="list-disc pl-5 space-y-2 text-grey dark:text-light-grey">
                <li>The trail is hidden below the <code className="font-mono text-cyan">md</code> breakpoint.</li>
                <li>“Back links” captured from previous pages are persisted in local storage and expire after a set number of navigations.</li>
                <li>The current page crumb is not a link.</li>
            </ul>
        </Section>

        <Section id="guidelines" title="Guidelines">
            <DoDontGrid>
                <Do note="Mirror the real site hierarchy and leave the current page as bold, non-clickable text.">
                    <div className="flex text-sm text-navy items-center flex-wrap">
                        <a className="underline hover:text-cyan" href="#">
                            Home
                        </a>
                        <ChevronRightIcon className="fill-navy mx-4 my-auto" />
                        <span className="font-semibold">Victoria</span>
                    </div>
                </Do>
                <Dont note="Don't make the current page a link or invent crumbs that don't match the page's actual path.">
                    <div className="flex text-sm text-navy items-center flex-wrap">
                        <a className="underline hover:text-cyan" href="#">
                            Home
                        </a>
                        <ChevronRightIcon className="fill-navy mx-4 my-auto" />
                        <a className="underline hover:text-cyan" href="#">
                            Victoria
                        </a>
                    </div>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default Breadcrumbs
