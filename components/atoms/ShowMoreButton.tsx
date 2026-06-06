import { useState } from 'react'
import { cx } from '../../utils/cx'
import { MarkdownBlock } from '../molecules/blocks/MarkdownBlock'
import { ChevronDownIcon } from './icons/ChevronDownIcon'

interface ShowMoreTextProps {
    displayText: string
    linkShowText: string
    linkHideText: string
    onShow?: () => void
}

export const ShowMoreButton: React.FC<ShowMoreTextProps> = ({
    displayText,
    linkShowText,
    linkHideText,
    onShow,
}) => {
    const [showFull, setShowFull] = useState(false)
    return (
        <div className="flex flex-col items-center">
            {displayText.length && (
                <>
                    {showFull && <div className='p-6 w-full h-full'>
                        <MarkdownBlock content={displayText} className='break-words' />
                    </div>}

                    <button
                        className={`button button--ghost text-center`}
                        onClick={() => {
                            setShowFull(!showFull)
                            !showFull && onShow && onShow()
                        }}
                    >
                        <span>{showFull ? linkHideText : linkShowText}</span>
                        <span>
                            <ChevronDownIcon
                                className={cx(
                                    showFull && 'rotate-180',
                                    'fill-current'
                                )}
                            />
                        </span>
                    </button>
                </>
            )}
        </div>
    )
}
