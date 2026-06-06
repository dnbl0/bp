import Script from 'next/script'
import { CmsCalendlyBlock } from '../../../types/contentful-cms-types'

const defaultFormHeight = '700'

export const CalendlyBlock = ({
    component,
}: {
    component: CmsCalendlyBlock
}) => {
    const { dataUrl, height } = component
    const formHeight = (height ? height : defaultFormHeight) + 'px'

    return (
        !dataUrl ? null : (
            <>
                <div
                    className="calendly-inline-widget h-[700px]"
                    data-url={dataUrl}
                    style={{ minWidth: '320px', height: formHeight }}
                ></div>
                <Script
                    src="https://assets.calendly.com/assets/external/widget.js"
                    async={true}
                />
            </>
        )
    )
}
