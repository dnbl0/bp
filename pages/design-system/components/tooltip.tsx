import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import { ComponentHero } from '../../../styleguide-components/componentPreviews'
import {
    PageHeader,
    Section,
    Example,
    PropsTable,
} from '../../../styleguide-components/primitives'
import { Tooltip } from '../../../components/atoms/Tooltip'

const toc = [
    { id: 'example', title: 'Example' },
    { id: 'props', title: 'Props' },
    { id: 'accessibility', title: 'Accessibility' },
]

const Page: NextPageWithLayout = () => (
    <DesignSystemLayout title="Tooltip" toc={toc}>
        <PageHeader
            eyebrow="Components · Atoms"
            title="Tooltip"
            status="stable"
            intro="An accessible hint that reveals supporting copy on hover and on keyboard focus. Used across product pages for fund-rule and pricing explanations, the trigger is a real button and the bubble is wired to it with aria-describedby."
        />

        <ComponentHero name="Tooltip" />

        <Section id="example" title="Example">
            <Example
                caption="Hover or focus the trigger"
                code={`<Tooltip content="The amount you agree to pay towards hospital costs before we contribute.">
  What is an excess?
</Tooltip>`}
            >
                <p className="text-grey dark:text-light-grey">
                    Choose your{' '}
                    <Tooltip content="The amount you agree to pay towards hospital costs before we contribute.">
                        excess
                    </Tooltip>{' '}
                    to adjust your premium.
                </p>
            </Example>
        </Section>

        <Section id="props" title="Props">
            <PropsTable
                rows={[
                    {
                        name: 'children',
                        type: 'ReactNode',
                        required: true,
                        description:
                            'The trigger the tooltip describes — usually text or an info icon.',
                    },
                    {
                        name: 'content',
                        type: 'ReactNode',
                        required: true,
                        description:
                            'The tooltip content. Keep it short; it is announced to screen readers.',
                    },
                    {
                        name: 'placement',
                        type: "'top' | 'bottom'",
                        description:
                            'Which side of the trigger the bubble appears on. Defaults to "top".',
                    },
                    {
                        name: 'label',
                        type: 'string',
                        description:
                            'Accessible label for the trigger when the children are an icon only.',
                    },
                ]}
            />
        </Section>

        <Section id="accessibility" title="Accessibility">
            <ul className="list-disc pl-5 space-y-2 text-grey dark:text-light-grey">
                <li>
                    The trigger is a real{' '}
                    <span className="font-mono">button</span>, so it is
                    reachable and operable by keyboard.
                </li>
                <li>
                    The bubble opens on both hover and focus and closes on blur,
                    so pointer and keyboard users get the same information.
                </li>
                <li>
                    Keep tooltip content brief and non-essential — never hide
                    information a user must have to complete a task.
                </li>
            </ul>
        </Section>
    </DesignSystemLayout>
)

export default Page
