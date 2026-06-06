import { CheckCircleIcon } from '../atoms/icons/CheckCircle'
import { ClipboardIcon } from '../atoms/icons/Clipboard'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { useState } from 'react'

const CopyCode = ({
    children,
    title,
    inverseVariant = false,
}: {
    children: React.ReactNode
    title: string
    inverseVariant?: boolean
}) => {
    const [isCopied, setIsCopied] = useState(false)

    const copyText = renderToString(<React.Fragment>{children}</React.Fragment>)
    const copyMarkup = copyText.replace(/class/g, 'className')

    const copyToClipboard = () => {
        navigator.clipboard.writeText(copyMarkup)
        setIsCopied(true)
        setTimeout(() => {
            setIsCopied(false)
        }, 2000)
    }

    return (
        <div className="grid grid-rows-2">
            <div className="flex justify-between items-center">
                <h3
                    className={`text-lg font-semibold ${
                        inverseVariant ? 'text-white' : ''
                    }`}
                >
                    {title}
                </h3>
                <button
                    className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan hover:bg-cyan-dark"
                    onClick={copyToClipboard}
                >
                    {isCopied ? (
                        <CheckCircleIcon className="w-4 h-4 fill-white" />
                    ) : (
                        <ClipboardIcon className="w-4 h-4 fill-white" />
                    )}
                </button>
            </div>
            <div className="p-2">{children}</div>
        </div>
    )
}

export default CopyCode
