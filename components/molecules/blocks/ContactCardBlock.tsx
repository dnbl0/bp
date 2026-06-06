import Link from 'next/link'
import { paramCase } from 'param-case'
import { CmsContactCard } from '../../../types/contentful-cms-types'
import { CallNowIcon } from '../../atoms/icons/CallNowIcon'
import { ChevronRightIcon } from '../../atoms/icons/ChevronRightIcon'
import { RichTextContent } from '../../atoms/RichTextContent'

const SECONDARY_BUTTON_SOLID = 'Solid'
const BUTTON_PINK = 'Pink'

export const ContactCardBlock = ({
    component,
}: {
    component: CmsContactCard
}) => {
    const {
        heading,
        heading2,
        phoneNumber,
        contactHours,
        street,
        suburb,
        stateOrTerritory,
        postcode,
        primaryCallToActionText,
        primaryCallToActionHref,
        primaryCallToActionColour,
        secondaryCallToActionText,
        secondaryCallToActionHref,
        secondaryCallToActionDropdownColour,
        secondaryCallToActionType,
        tertiaryCallToActionText,
        tertiaryCallToActionHref,
        extraContactHeading,
        extraContactPhoneNumber,
        directionLinkHref,
        directionLinkText,
        calendlyBooking,
        calendlyBookingText,
    } = component

    const calendlyPrefix = process.env.NEXT_PUBLIC_CALENDLY_PREFIX
        ? process.env.NEXT_PUBLIC_CALENDLY_PREFIX
        : ''
    return (
        <div className="bg-white rounded shadow-depth-hover flex flex-col">
            <div className="p-6 flex-grow">
                <div className="flex flex-col gap-3">
                    {(heading || heading2) && (
                        <h2 className="text-heading-s font-medium text-navy">
                            {heading && <div>{heading}</div>}
                            {heading2 && <div>{heading2}</div>}
                        </h2>
                    )}
                    {phoneNumber && (
                        <div className="flex flex-row justify-start">
                            <Link href={`tel:${phoneNumber}`}>
                                <a className="button button--tertiary gap-2 text-heading-s font-medium !pt-0 !pb-0">
                                    <span>
                                        <CallNowIcon />
                                    </span>
                                    <span>{phoneNumber}</span>
                                </a>
                            </Link>
                        </div>
                    )}
                    {contactHours?.json && (
                        <RichTextContent
                            json={contactHours.json}
                            // Setting `prose-p:m-0` is a hack to support multi-line text.
                            className="prose prose-p:m-0"
                        />
                    )}
                    <div className="flex flex-col gap-3">
                        {primaryCallToActionText && primaryCallToActionHref && (
                            <div className="">
                                <a
                                    className={`button button--primary justify-center ${
                                        primaryCallToActionColour ===
                                        BUTTON_PINK
                                            ? 'button--pink'
                                            : ''
                                    }`}
                                    href={primaryCallToActionHref}
                                    data-link-type={`cta-button-${paramCase(
                                        primaryCallToActionText
                                    )}`}
                                >
                                    <span>{primaryCallToActionText}</span>
                                </a>
                            </div>
                        )}
                        {secondaryCallToActionText &&
                            secondaryCallToActionHref && (
                                <div className="">
                                    <a
                                        className={`button button--secondary ${
                                            secondaryCallToActionType ===
                                            SECONDARY_BUTTON_SOLID
                                                ? 'button--secondary-solid'
                                                : 'button--secondary-outline'
                                        } ${
                                            secondaryCallToActionDropdownColour ===
                                            BUTTON_PINK
                                                ? 'button--secondary-pink'
                                                : ''
                                        } justify-center`}
                                        href={secondaryCallToActionHref}
                                        data-link-type={`cta-button-${paramCase(
                                            secondaryCallToActionText
                                        )}`}
                                    >
                                        <span>{secondaryCallToActionText}</span>
                                    </a>
                                </div>
                            )}
                    </div>
                    {calendlyBooking &&
                        calendlyBooking.dataUrl &&
                        calendlyBookingText && (
                            <div className="">
                                <a
                                    className="button button--secondary justify-center"
                                    href={calendlyBooking.dataUrl.replace(
                                        calendlyPrefix,
                                        '?calendly='
                                    )}
                                    data-link-type={`cta-button-${paramCase(
                                        calendlyBookingText
                                    )}`}
                                >
                                    <span>{calendlyBookingText}</span>
                                </a>
                            </div>
                        )}
                </div>
            </div>

            {(extraContactHeading ||
                extraContactHeading ||
                street ||
                suburb ||
                stateOrTerritory ||
                postcode ||
                directionLinkText ||
                directionLinkHref) && (
                <>
                    <div className="border-t border-light-grey"></div>
                    <div className="p-6">
                        <div className="flex flex-col gap-3">
                            {extraContactHeading && (
                                <h2 className="text-heading-s font-medium text-navy">
                                    {extraContactHeading}
                                </h2>
                            )}
                            {extraContactPhoneNumber && (
                                <div className="flex flex-row justify-start">
                                    <Link
                                        href={`tel:${extraContactPhoneNumber}`}
                                    >
                                        <a className="flex flex-row flex-nowrap items-center gap-2 text-heading-s font-medium text-grey hover:underline">
                                            <span>
                                                <CallNowIcon />
                                            </span>
                                            <span>
                                                {extraContactPhoneNumber}
                                            </span>
                                        </a>
                                    </Link>
                                </div>
                            )}
                            {street &&
                                suburb &&
                                stateOrTerritory &&
                                postcode &&
                                directionLinkText &&
                                directionLinkHref && (
                                    <>
                                        <div className="text-heading text-grey">
                                            <div>{street},</div>
                                            <div>
                                                {`${suburb} ${stateOrTerritory} ${postcode}`}
                                            </div>
                                        </div>
                                        <div className="flex flex-row justify-start items-center">
                                            <svg
                                                fill="rgba(0, 37, 78, 1)"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                width="24"
                                                height="24"
                                                focusable="false"
                                                className="pr-2"
                                            >
                                                <path
                                                    clip-rule="evenodd"
                                                    d="M5 9c0-3.87 3.13-7 7-7s7 3.13 7 7c0 5.25-7 13-7 13S5 14.25 5 9zm4.5 0a2.5 2.5 0 005 0 2.5 2.5 0 00-5 0z"
                                                ></path>
                                            </svg>

                                            <a
                                                href={directionLinkHref}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="button button--tertiary"
                                            >
                                                <span>{directionLinkText}</span>
                                                <span>
                                                    <ChevronRightIcon />
                                                </span>
                                            </a>
                                        </div>
                                    </>
                                )}
                        </div>
                    </div>
                </>
            )}
            {tertiaryCallToActionText && tertiaryCallToActionHref && (
                <div className="px-6 py-3 border-t border-t-cool-paper-200">
                    <div className="flex flex-row justify-start">
                        <a
                            className="button button--tertiary"
                            href={tertiaryCallToActionHref}
                            data-link-type={`cta-button-${paramCase(
                                tertiaryCallToActionText
                            )}`}
                        >
                            <span>{tertiaryCallToActionText}</span>
                            <span>
                                <ChevronRightIcon />
                            </span>
                        </a>
                    </div>
                </div>
            )}
        </div>
    )
}
