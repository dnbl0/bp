import React from 'react'
import { addTagManagerEvent } from '../../../utils/tagManager'
import { ShowMoreButton } from '../../atoms/ShowMoreButton'
import { Maybe } from 'graphql/jsutils/Maybe'
import { CmsAsset } from '../../../types/contentful-cms-types'
import { cx } from '../../../utils/cx'
import { getBgColour } from '../../../utils/getBgColour'
import Image from 'next/image'
import { ResponsiveImage } from '../../atoms/ResponsiveImage'

type PricingCardProps = {
    header: string
    subHeader?: React.ReactNode
    showMoreBtnText?: string
    showMoreContent?: string
    icon?: Maybe<CmsAsset>
    backgroundColour?: string
}

const PricingCalculatorCard = ({
    backgroundColour,
    showMoreBtnText,
    showMoreContent,
    header,
    subHeader,
    icon,
}: PricingCardProps) => (
    <div
        className={cx(
            'flex flex-col h-full w-full border-b-[1px] border-l-[1px] border-r-[1px] border-cool-paper-200 ',
        )}
    >
        <div
            className={cx(
                'text-white flex w-full h-full items-start justify-start md:justify-center pt-2 pb-2',
                (backgroundColour && getBgColour(backgroundColour)) || 'bg-cyan'
            )}
        >

            <div >
                {icon && (
                    <ResponsiveImage image={{...icon, width: 64, height: 64}} layout="fixed" />
                )}
            </div>
            <div className="flex flex-col p-2 gap-1 justify-center ">
                <div className={`font-semibold text-[18px] text-start xl:text-left text-balance break-words`}>{header}</div>
                {subHeader}
            </div>
        </div>
        {showMoreContent &&
            <ShowMoreButton
                displayText={showMoreContent || ''}
                linkShowText={showMoreBtnText!}
                linkHideText={'Learn less'}
                onShow={() =>
                    addTagManagerEvent('pricing_card_learn_more', {
                        pricing_card_learn_more_type: 'Accommodation cost',
                    })
                }
            />
        }
    </div>
)

type PricingCardShowMoreProps = {
    showMoreBtnText: string
    showMoreContent: string
}

export const PricingCalculatorShowMore = ({
    showMoreBtnText,
    showMoreContent,
}: PricingCardShowMoreProps) => (
    <div
        className={cx(
            'flex flex-col w-full border-b-[1px] border-l-[1px] border-r-[1px] border-cool-paper-200',
        )}
    >
        <ShowMoreButton
            displayText={showMoreContent || ''}
            linkShowText={showMoreBtnText!}
            linkHideText={'Learn less'}
            onShow={() =>
                addTagManagerEvent('pricing_card_learn_more', {
                    pricing_card_learn_more_type: 'Accommodation cost',
                })
            }
        />
    </div>
)

export default PricingCalculatorCard
