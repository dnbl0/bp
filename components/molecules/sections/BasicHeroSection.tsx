import { CmsBasicHeroSection, Maybe } from '../../../types/contentful-cms-types'
import { cx } from '../../../utils/cx'
import { ChevronRightIcon } from '../../atoms/icons/ChevronRightIcon'
import { ResponsiveImage } from '../../atoms/ResponsiveImage'
import { Section } from '../../atoms/Section'
import { HeaderStyle } from '../../atoms/HeaderStyle'

export const BasicHeroSection = ({
    component,
}: {
    component: CmsBasicHeroSection
}) => {
    const {
        heading,
        subheading,
        image,
        buttonText,
        buttonHref,
        linkOpenNewTab,
        headerStyle,
    } = component
    const background = image && (
        <div
            className={cx(
                'h-full flex-row-reverse items-stretch',
                'hidden md:flex min-h-[400px]'
            )}
        >
            <div className="w-[50%]">
                <ResponsiveImage image={image} layout="fill" />
            </div>
        </div>
    )

    const headerSize = headerStyle ? headerStyle : 'H1'

    return (
        <div className="bg-cyan">
            {image && (
                <div className="md:hidden">
                    <ResponsiveImage image={image} layout="responsive" />
                </div>
            )}

            <Section fullBleed={background}>
                <div className="grid grid-cols-12 gap-4">
                    <div
                        className={cx(
                            'flex flex-col gap-4 text-white',
                            'col-span-12 md:col-span-6',
                            'pb-12 pt-8 md:py-24 pr-4'
                        )}
                    >
                        <div className={cx("flex gap-4", headerSize === 'H4' ? 'flex-col' : 'flex-col-reverse')}>
                            {heading && (
                                <HeaderStyle headerStyle={headerSize}>
                                    {heading}
                                </HeaderStyle>
                            )}
                            {subheading && (
                                <HeaderStyle headerStyle={headerSize === 'H2' ? 'H3' : 'H2'} className="text-heading-s">
                                    {subheading}
                                </HeaderStyle>
                            )}
                        </div>

                        {buttonText && buttonHref && (
                            <div className="flex">
                                <a
                                    href={buttonHref}
                                    target={
                                        linkOpenNewTab ? '_blank' : undefined
                                    }
                                    rel="noreferrer"
                                    className="button button--secondary button--inverse"
                                    data-link-type="full-banner"
                                >
                                    <span>{buttonText}</span>
                                    <ChevronRightIcon />
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </Section>
        </div>
    )
}
