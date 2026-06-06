import Link from 'next/link'
import { CmsTestimonialCard } from '../../../types/contentful-cms-types'
import { ResponsiveImage } from '../../atoms/ResponsiveImage'
import { RichTextContent } from '../../atoms/RichTextContent'

export const TestimonialCardBlock = ({
    component,
}: {
    component: CmsTestimonialCard
}) => {
    const {
        isBottom,
        icon,
        bodyRichText,
        from,
        title,
        locationHref,
        locationText,
    } = component

    return (
        <div className="p-6 rounded border-[1px] border-cool-paper-200 w-full">
            <div className="flex flex-col gap-6 h-full justify-center">
                <div>
                    <div>
                        {isBottom === null || isBottom ? (
                            <div className="text-left">
                                {icon && (
                                    <ResponsiveImage
                                        image={icon}
                                        layout="intrinsic"
                                    />
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center flex-nowrap">
                                {icon && (
                                    <div className=" h-[120px] w-[120px] md:h-24 md:w-24 lg:h-[120px] lg:w-[120px] rounded-full overflow-hidden ">
                                        <ResponsiveImage
                                            image={icon}
                                            layout="fill"
                                        />
                                    </div>
                                )}
                                <div className="ml-4 flex flex-col gap-2 items-start flex-1">
                                    {from && (
                                        <div className="font-semibold">
                                            {from}
                                        </div>
                                    )}
                                    {title && (
                                        <div className="font-semibold text-sm">
                                            {title}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="text-left">
                    {bodyRichText && (
                        <RichTextContent json={bodyRichText.json} />
                    )}
                </div>
                {isBottom === null || isBottom ? (
                    <div className="flex flex-col gap-[6px]">
                        {from && (
                            <div className="font-semibold text-left">
                                {from}
                            </div>
                        )}
                        {title && (
                            <div className="font-semibold text-sm">{title}</div>
                        )}
                    </div>
                ) : null}

                {locationHref && locationText && (
                    <div className="flex flex-row justify-start">
                        <Link href={locationHref}>
                            <a className="button button--tertiary underline font-normal p-0">
                                {locationText}
                            </a>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
