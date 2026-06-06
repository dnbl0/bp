import Image from 'next/image'
import { Section } from './Section'

export const ErrorMessageWrapper = ({
    children,
}: {
    children?: React.ReactNode
}) => {
    return (
        <Section>
            <div className="bg-[#f7f5f2]">
                <div className="pt-[124px] pb-16">{children}</div>

                <div className="">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={'/images/landscape.svg'}
                        alt="background image"
                        width="1152"
                        height="148"
                        style={{ width: '100%' }}
                    />
                </div>
            </div>
        </Section>
    )
}
