import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import {
    HomePricingData,
    RoomPricingByState,
    Home,
    Room,
} from '../../../pages/api/home-pricing'
import {
    CmsGrid6X6,
    CmsResource,
    CmsResourceBoolean,
    CmsPricingCalculatorCard,
    Maybe,
    CmsGrid4X4X4,
    CmsResourceRichText,
} from '../../../types/contentful-cms-types'
import { FormSelector } from '../../atoms/FormSelector'
import { AccordionPanel } from './AccordionBlock/AccordionPanel'
import { MarkdownBlock } from './MarkdownBlock'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Document } from '@contentful/rich-text-types';

import {
    readResourceRichText,
    readResourceString,
} from '../../../lib/cmsResource'
import { ScrollTargetAnchor } from '../sections/NavigationBar/ScrollTargetAnchor'
import { addTagManagerEvent } from '../../../utils/tagManager'
import { formattingOptions } from '../../../utils/formattingOptions'
import CurrencyInput from 'react-currency-input-field'
import PricingCalculatorCard, { PricingCalculatorShowMore } from './PricingCalculatorCard'
import { RichTextContent } from '../../atoms/RichTextContent'

type PricingComponentProps = {
    careHomeName?: string
    pricingGrid?: CmsGrid6X6 | undefined
    careCostGrid?: CmsGrid4X4X4 | undefined
}

export const PricingComponent = (params: PricingComponentProps) => {
    const { pricingGrid, careCostGrid, careHomeName } = params

    const pricingGridContent1 =
        pricingGrid?.content1 as CmsPricingCalculatorCard
    const pricingGridContent2 =
        pricingGrid?.content2 as CmsPricingCalculatorCard
    const careCostGridContent1 =
        careCostGrid?.content1 as CmsPricingCalculatorCard
    const careCostGridContent2 =
        careCostGrid?.content2 as CmsPricingCalculatorCard
    const careCostGridContent3 =
        careCostGrid?.content3 as CmsPricingCalculatorCard

    //CMS Micro copy
    const [pricingHeader, setPricingHeader] = useState('')
    const [pricingIntro, setPricingIntro] = useState('')
    const [accommodationCostDisclaimer, setAccommodationCostDisclaimer] =
        useState<{ content: Document, anchorId: string } | string>('')

    const [paymentOptionsHeader, setPaymentOptionsHeader] = useState('')
    const [paymentOptionsContent, setPaymentOptionsContent] = useState('')

    const [calculatorSectionTitle, setCalculatorSectionTitle] = useState('')
    const [calculatorCostSectionTitle, setCalculatorCostSectionTitle] =
        useState('')

    const [sliderDescription, setSliderDescription] = useState('')
    const [careTypeResidential, setCareTypeResidential] = useState('')
    const [mpir, setMpir] = useState(7.9)

    const [roomPricing, setRoomPricing] = useState<RoomPricingByState>([])
    const [isLoading, setLoading] = useState(true)
    const [resourceSet, setResourceSet] = useState<
        (CmsResource | CmsResourceRichText | CmsResourceBoolean)[] | undefined
    >()

    const [selectedState, setSelectedState] = useState('NSW')
    const [selectedHome, setSelectedHome] = useState<Home>()
    const [selectedRoom, setSelectedRoom] = useState<Room>()
    const [selectedCareType, setSelectedCareType] = useState('Residential care')

    const [radPrice, setRadPrice] = useState<Maybe<number> | undefined>(0)
    const [radValue, setRadValue] = useState<number>(0)
    const [dapValue, setDapValue] = useState<number>(0)
    const [otherServiceCostHeader, setOtherServiceCostHeader] = useState('')
    const [otherServiceCostContent, setOtherServiceCostContent] = useState('')
    const [additionalServicesHeader, setAdditionalServicesHeader] = useState('')
    const [careCostTitle, setCareCostTitle] = useState('')
    const [accommodationSelectionDescription, setAccommodationSelectionDescription] = useState('')
    const [isCalculatorPage, setIsCalculatorPage] = useState(false);
    const sliderRef = useRef<HTMLInputElement>(null)
    const quoteText = readResourceString(resourceSet,'getQuoteText', '')

    const changeSlider = useCallback((value: number) => {
        if (value > radPrice!) {
            setRadValue(radPrice!)
        } else if (Number.isNaN(value)) {
            setRadValue(0)
        } else {
            setRadValue(value)
        }
        if (sliderRef.current) {
            const sliderProgress = (value / (radPrice! || 1)) * 100;
            sliderRef.current.style.background = `linear-gradient(to right, #0079c8 ${sliderProgress}%, #bfccd6 ${sliderProgress}%)`;
        }
    }, [radPrice])

    useEffect(() => {
        setLoading(true)
        const fetchUrl =
            '/api/home-pricing' + (careHomeName ? '?name=' + careHomeName : '')
        fetch(fetchUrl)
            .then(res => res.json())
            .then((data: HomePricingData) => {
                if (data.success) {
                    setRoomPricing(data.homes)
                    setSelectedState(
                        data.homes![0] ? data.homes![0].state! : 'NSW'
                    )
                    setSelectedHome(
                        data.homes![0] ? data.homes![0].homes![0] : undefined
                    )
                    setSelectedRoom(
                        data.homes![0]
                            ? data.homes![0].homes![0].rooms![0]
                            : undefined
                    )
                    setResourceSet(data.resources)
                }
                setLoading(false)
            })
    }, [careHomeName])

    useEffect(() => {
        if (
            roomPricing?.length &&
            roomPricing?.find(state => state.state == selectedState)
        ) {
            setSelectedHome(
                roomPricing?.find(state => state.state == selectedState)!
                    .homes![0]
            )
        }
    }, [selectedState, roomPricing])
    useEffect(() => {
        if (roomPricing?.length && selectedHome) {
            const state = roomPricing.find(
                state => state.state == selectedState
            )
            const home = state
                ? state.homes!.find(home => home.name == selectedHome.name)
                : selectedHome
            setSelectedRoom(home ? home.rooms![0] : selectedRoom)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedHome, roomPricing, selectedState])

    useEffect(() => {
        setRadPrice(selectedRoom?.radPrice)
        changeSlider(radValue!);
    }, [changeSlider, radValue, selectedRoom])
    useEffect(() => {
        if (resourceSet) {
            setPricingIntro(readResourceString(resourceSet, 'pricingIntro', ''))
            setPricingHeader(
                readResourceString(
                    resourceSet,
                    'pricingHeader',
                    ''
                )
            )
            setCalculatorSectionTitle(
                readResourceString(resourceSet, 'calculatorSectionTitle', '')
            )
            setCalculatorCostSectionTitle(
                readResourceString(
                    resourceSet,
                    'calculatorCostSectionTitle',
                    ''
                )
            )

            setPaymentOptionsHeader(
                readResourceString(resourceSet, 'paymentOptionsHeader', '')
            )
            setPaymentOptionsContent(
                readResourceString(resourceSet, 'paymentOptionsContent', '')
            )
            const accommodationCostDisclaimer = readResourceRichText(
                resourceSet,
                'accommodationCostDisclaimer',
                ''
            )
            typeof accommodationCostDisclaimer === 'object' ? setAccommodationCostDisclaimer(
                {
                    content: accommodationCostDisclaimer.value,
                    anchorId: accommodationCostDisclaimer.anchorId || ''
                }
            ) : setAccommodationCostDisclaimer('');

            setAccommodationSelectionDescription(
                readResourceString(resourceSet, 'accommodationSelectionDescription', '')
            )

            setSliderDescription(
                readResourceString(resourceSet, 'sliderDescription', '')
            )

            setOtherServiceCostHeader(
                readResourceString(resourceSet, 'otherServiceCostHeader', '')
            )
            setOtherServiceCostContent(
                readResourceString(resourceSet, 'otherServiceCostContent', '')
            )
            if (window.location.href.includes('aged-care-costs-calculator')) {
                setIsCalculatorPage(true);
            }
            setAdditionalServicesHeader(
                readResourceString(resourceSet, 'additionalServicesHeader', '')
            )
            setCareTypeResidential(
                readResourceString(resourceSet, 'careTypeResidential', '')
            )

            setSelectedCareType(careTypeResidential)
            setMpir(Number(readResourceString(resourceSet, 'mpir', '7.9')))
            setCareCostTitle(
                readResourceString(resourceSet, 'careCostTitle', '')
            )
        }
    }, [resourceSet, careTypeResidential])
    const countHomes = roomPricing?.reduce(
        (currentCount, row) => currentCount + row.homes!.length!,
        0
    )

    const getStateList = (roomPricing: RoomPricingByState) =>
        roomPricing?.map(el => el.state)

    const getHomeList = (
        roomPricing: RoomPricingByState,
        currentState: string
    ) => {
        return roomPricing
            ?.find(state => state.state == currentState)
            ?.homes?.map(el => el.name)
    }

    const getRoomList = (
        roomPricing: RoomPricingByState,
        currentState: string,
        currentHome: string
    ) => {
        return roomPricing
            ?.find(state => state.state == currentState)
            ?.homes?.find(home => home.name == currentHome)
            ?.rooms!.map(el => el.name)
    }

    const getHome = (
        roomPricing: RoomPricingByState,
        currentState: string,
        homeName: string
    ) => {
        return roomPricing
            ?.find(state => state.state == currentState)
            ?.homes?.find(el => el.name == homeName)
    }

    const getRoom = (
        roomPricing: RoomPricingByState,
        currentState: string,
        currentHome: string,
        roomName: string
    ) => {
        return roomPricing
            ?.find(state => state.state == currentState)
            ?.homes?.find(home => home.name == currentHome)
            ?.rooms!.find(el => el.name == roomName)
    }

    const changeHome = (opt: ChangeEvent<HTMLSelectElement>) => {
        setSelectedHome(getHome(roomPricing, selectedState, opt.target.value))
        addTagManagerEvent('pricing_card_interaction', {
            pricing_card_home: opt.target.value,
        })
    }

    const changeRoom = (opt: ChangeEvent<HTMLSelectElement>) => {
        const newRoom = getRoom(
            roomPricing,
            selectedState,
            selectedHome?.name!,
            opt.target.value
        )
        if (newRoom && newRoom.radPrice) {
            setSelectedRoom(newRoom)
            setRadPrice(newRoom.radPrice)
        }
        addTagManagerEvent('pricing_card_interaction', {
            pricing_card_room_type: opt.target.value,
        })
    }

    const calcDapValue = (rad: number) => {
        const dap = ((rad - radValue) * (mpir / 100)) / 365
        return dap
    }

    useEffect(() => {
        if (radPrice && radPrice < radValue) setRadValue(radPrice)
        if (radPrice && radPrice >= radValue)
            setDapValue(calcDapValue(radPrice))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [radPrice])

    useEffect(() => {
        setDapValue(calcDapValue(radPrice!))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [radValue])
    const renderPricingGrid = (hasContent?: boolean) => (
        <>
            <PricingCalculatorCard
                showMoreBtnText={String(
                    pricingGridContent1?.showMoreBtnText
                )}
                showMoreContent={hasContent && pricingGridContent1 && pricingGridContent1.showMoreText ? pricingGridContent1.showMoreText : ''}

                header={String(
                    pricingGridContent1?.header
                )}
                backgroundColour={
                    pricingGridContent1 && pricingGridContent1.backgroundColour ?
                        pricingGridContent1.backgroundColour! : 'bg-cyan'
                }
                subHeader={
                    pricingGridContent1 && pricingGridContent1.customSubHeader ? (
                        <div className="flex items-end h-full font-semibold text-xl text-center">
                            {String(
                                pricingGridContent1.customSubHeader
                            )}
                        </div>
                    ) : (
                        <div className="font-semibold  text-center">
                            <span className="text-2xl">

                                {`${radValue.toLocaleString(
                                    'en-US',
                                    {
                                        style: 'currency',
                                        currency: 'USD',
                                        minimumFractionDigits: 0,
                                    }
                                )}`}
                            </span>
                            <span className='text-heading-m align-super'>*</span></div>
                    )
                }
            />
            <PricingCalculatorCard
                showMoreBtnText={String(
                    pricingGridContent2?.showMoreBtnText
                )}
                showMoreContent={hasContent && pricingGridContent2 && pricingGridContent2.showMoreText ? pricingGridContent2.showMoreText : ''}

                header={String(
                    pricingGridContent2?.header
                )}
                backgroundColour={
                    pricingGridContent2 && pricingGridContent2.backgroundColour ?
                        pricingGridContent2.backgroundColour : 'bg-cyan'
                }
                subHeader={
                    pricingGridContent2 && pricingGridContent2.customSubHeader ? (
                        <div className="flex items-end h-full font-semibold text-xl">
                            {String(
                                pricingGridContent1.customSubHeader
                            )}
                        </div>
                    ) : (
                        <div className="text-center">
                            <div className="flex w-full font-semibold justify-center items-center">
                                {PricingDisplay(
                                    dapValue
                                )}
                                <span className="font-semibold text-xl">
                                    / day
                                </span>
                            </div>
                        </div>
                    )
                }
            />
        </>
    )

    return (
        <div className="pricing-component">
            {isLoading ? (
                <div>...Loading</div>
            ) : (
                <>
                    {pricingHeader && <h2 className="text-heading-m font-medium">
                        {pricingHeader}
                    </h2>}
                    {pricingIntro && <div className="pt-6 mb-6">
                        <MarkdownBlock content={pricingIntro} />
                    </div>}
                    {
                        <div>
                            <div
                                id="pricing-filter"
                                className="flex flex-col gap-6 mb-8"
                            >
                                <h2 className="text-heading-m font-medium">
                                    {readResourceString(
                                        resourceSet,
                                        'calculatorTitle',
                                        ''
                                    )}
                                </h2>
                                {calculatorSectionTitle && (
                                    <>
                                        <h4 className="text-heading-s font-medium">
                                            {calculatorSectionTitle}
                                        </h4>
                                        <div>
                                            {accommodationSelectionDescription}
                                        </div>
                                        <div className="flex flex-row gap-4 flex-wrap">
                                            {countHomes && countHomes > 1 && (
                                                <>
                                                    <div>
                                                        <div className="font-semibold text-grey mb-3">
                                                            State
                                                        </div>
                                                        <FormSelector
                                                            optionList={getStateList(
                                                                roomPricing
                                                            )}
                                                            defaultValue={
                                                                selectedState
                                                            }
                                                            onChange={opt => {
                                                                setSelectedState(
                                                                    opt.target
                                                                        .value
                                                                )

                                                                addTagManagerEvent(
                                                                    'pricing_card_interaction',
                                                                    {
                                                                        pricing_card_state:
                                                                            opt
                                                                                .target
                                                                                .value,
                                                                    }
                                                                )
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-grey mb-3">
                                                            Home
                                                        </div>
                                                        <FormSelector
                                                            optionList={getHomeList(
                                                                roomPricing,
                                                                selectedState
                                                            )}
                                                            onChange={opt =>
                                                                changeHome(opt)
                                                            }
                                                            defaultValue={
                                                                selectedHome?.name!
                                                            }
                                                        />
                                                    </div>
                                                </>
                                            )}

                                            <div>
                                                <div className="font-semibold text-grey mb-3">
                                                    Room type
                                                </div>
                                                <FormSelector
                                                    optionList={getRoomList(
                                                        roomPricing,
                                                        selectedState,
                                                        selectedHome?.name!
                                                    )}
                                                    onChange={opt =>
                                                        changeRoom(opt)
                                                    }
                                                />
                                            </div>

                                            <div>
                                                <div className="font-semibold text-grey mb-3">
                                                    Room cost
                                                </div>
                                                <div className="p-3.5 block border-cyan rounded border text-cyan font-bold">
                                                    {radPrice
                                                        ? radPrice.toLocaleString(
                                                            'en-US',
                                                            {
                                                                style: 'currency',
                                                                currency:
                                                                    'USD',
                                                                minimumFractionDigits: 0,
                                                            }
                                                        )
                                                        : '$0'}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                            {selectedCareType == careTypeResidential &&
                                calculatorCostSectionTitle && (
                                    <div id="pricing-slider" className="mb-4">
                                        <h4 className="text-heading-s pb-6 pt-4 font-medium">
                                            {calculatorCostSectionTitle}
                                        </h4>
                                        <div className="flex items-center">
                                            <div className="grow">
                                                <div className="pb-4">
                                                    {sliderDescription}
                                                </div>
                                                <div className="flex flex-row gap-4 pb-4 items-center">
                                                    <div className="font-semibold">
                                                        Your deposit:
                                                    </div>

                                                    <CurrencyInput
                                                        id="rad-value-input"
                                                        name="rad-value-input"
                                                        placeholder="$0"
                                                        prefix="$"
                                                        value={radValue === 0 ? '' : radValue}
                                                        decimalsLimit={0}
                                                        onValueChange={(
                                                            value
                                                        ) => changeSlider(Number(value))}
                                                        className="p-3.5 block border-cyan rounded border text-cyan max-w-[115px]"
                                                    />
                                                </div>
                                                <div className="relative">
                                                    <input
                                                        ref={sliderRef}
                                                        type="range"
                                                        className="slider my-3 block w-full accent-cyan bg-cool-paper-200 appearance-none rounded-lg h-2"
                                                        min={0}
                                                        max={
                                                            radPrice
                                                                ? radPrice
                                                                : 100000
                                                        }
                                                        onChange={e =>
                                                            changeSlider(
                                                                Number(e.target.value)
                                                            )
                                                        }
                                                        step={1}
                                                        value={radValue}
                                                    />
                                                </div>
                                                <div className="flex justify-between">
                                                    <div className="font-semibold">
                                                        $0
                                                    </div>
                                                    <div className="font-semibold">
                                                        $
                                                        {radPrice
                                                            ? radPrice.toLocaleString()
                                                            : '100,000'}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            {calculatorCostSectionTitle && pricingGrid && (
                                <ScrollTargetAnchor anchorId={pricingGrid?.anchorId || 'pricing-details'}>
                                    <div id="pricing-details">
                                        <div className="w-full gap-4 hidden xl:grid grid-cols-1 xl:grid-cols-2 min-w-[865px]">
                                            {renderPricingGrid()}
                                        </div>
                                        <div className="pt-4 w-full gap-4 xl:hidden grid grid-cols-1 xl:grid-cols-2">
                                            {renderPricingGrid(true)}
                                        </div>
                                        <div className="pb-2 gap-4 w-full hidden xl:grid grid-cols-1 xl:grid-cols-2 items-start min-w-[865px]">
                                            {[
                                                pricingGridContent1,
                                                pricingGridContent2,
                                            ].map((content, index) => (
                                                <PricingCalculatorShowMore
                                                    key={`pricing-learn-more-${index}`}
                                                    showMoreBtnText={String(
                                                        content && content.showMoreBtnText ? content.showMoreBtnText : ''
                                                    )}
                                                    showMoreContent={
                                                        content && content.showMoreText ? content.showMoreText : ''
                                                    }
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </ScrollTargetAnchor>
                            )}
                            <RichTextContent
                                json={
                                    typeof accommodationCostDisclaimer === 'object' && accommodationCostDisclaimer !== null
                                        ? accommodationCostDisclaimer.content
                                        : ''
                                }
                                isColouredCard
                            />
                            {paymentOptionsHeader && paymentOptionsContent && (
                                <div
                                    id="payment-options"
                                    className="mt-6 mb-10"
                                >
                                    <AccordionPanel
                                        header={paymentOptionsHeader}
                                        itemIndex={0}
                                    >
                                        <MarkdownBlock
                                            content={paymentOptionsContent}
                                        />
                                    </AccordionPanel>
                                </div>
                            )}
                            {careCostGrid && (
                                <ScrollTargetAnchor
                                    anchorId={careCostGrid?.anchorId || 'care-costs'}
                                >
                                    <h4 className="text-heading-s pb-6 font-medium">
                                        {careCostTitle}
                                    </h4>

                                    <div className="w-full hidden gap-4 grid-cols-12 2xl:grid [&>*]:col-span-4 min-w-[885px]">
                                        {[
                                            careCostGridContent1,
                                            careCostGridContent2,
                                            careCostGridContent3,
                                        ].map((content, index) => (
                                            <PricingCalculatorCard
                                                key={`care-cost-${index}`}
                                                header={String(content.header)}
                                                backgroundColour={
                                                    content.backgroundColour!
                                                }
                                                icon={content.icon}
                                                subHeader={
                                                    content.customSubHeader &&
                                                        Number(
                                                            content.customSubHeader
                                                        ) ? (
                                                        <div className="text-center flex text-xl items-center">
                                                            <span className="flex font-semibold ">
                                                                {PricingDisplay(
                                                                    Number(
                                                                        content.customSubHeader
                                                                    )
                                                                )}
                                                            </span>
                                                            <span className='font-semibold text-xl'>
                                                                / day
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center h-full font-semibold text-s">
                                                            {String(
                                                                content.customSubHeader
                                                            )}
                                                        </div>
                                                    )
                                                }
                                            />
                                        ))}
                                    </div>
                                    <div className="pb-2 w-full hidden gap-4 grid-cols-12 2xl:grid [&>*]:col-span-4 items-start min-w-[885px]">
                                        {[
                                            careCostGridContent1,
                                            careCostGridContent2,
                                            careCostGridContent3,
                                        ].map((content, index) => (
                                            <PricingCalculatorShowMore
                                                key={`care-learn-more-${index}`}
                                                showMoreBtnText={String(
                                                    content.showMoreBtnText
                                                )}
                                                showMoreContent={
                                                    content.showMoreText!
                                                }
                                            />
                                        ))}
                                    </div>
                                    <div
                                        className="pb-2 pt-4 w-full flex flex-col gap-4 grid-cols-12 2xl:hidden"
                                    >
                                        {[
                                            careCostGridContent1,
                                            careCostGridContent2,
                                            careCostGridContent3,
                                        ].map((content, index) => (
                                            <PricingCalculatorCard
                                                key={`care-cost-${index}`}
                                                showMoreBtnText={String(
                                                    content.showMoreBtnText
                                                )}
                                                showMoreContent={
                                                    content.showMoreText!
                                                }
                                                header={String(content.header)}
                                                backgroundColour={
                                                    content.backgroundColour!
                                                }
                                                icon={content.icon}
                                                subHeader={
                                                    content.customSubHeader &&
                                                        Number(
                                                            content.customSubHeader
                                                        ) ? (
                                                        <div className="text-center flex text-xl items-start justify-start">
                                                            <span className="flex items-baseline font-semibold">
                                                                {PricingDisplay(
                                                                    Number(
                                                                        content.customSubHeader
                                                                    )
                                                                )}
                                                            </span>
                                                            <span className='font-semibold text-xl'>
                                                                / day
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center justify-start h-full font-semibold text-s text-center ">
                                                            {String(
                                                                content.customSubHeader
                                                            )}
                                                        </div>
                                                    )
                                                }
                                            />
                                        ))}
                                    </div>
                                </ScrollTargetAnchor>
                            )}
                            {
                                quoteText.length > 0 && <div className="mt-4 text-s font-medium">
                                    {quoteText}
                                </div>
                            }
                            <ScrollTargetAnchor
                                anchorId={'other-service-costs'}
                            ></ScrollTargetAnchor>
                            {otherServiceCostHeader && otherServiceCostContent && (
                                <div id="other-service-costs" className="mt-8 mb-6">
                                    <div className="text-xl mb-6 text-navy font-medium">
                                        {otherServiceCostHeader}
                                    </div>
                                    <div>{otherServiceCostContent}</div>
                                </div>
                            )}

                            {!isCalculatorPage && selectedHome?.specialServicePackages && (
                                <ScrollTargetAnchor
                                    anchorId={'special-services'}
                                >
                                    <div
                                        id="special-services"
                                        className="bg-cyan-50 p-6 mb-6"
                                    >
                                        {documentToReactComponents(
                                            selectedHome.specialServicePackages,
                                            formattingOptions
                                        )}
                                    </div>
                                </ScrollTargetAnchor>
                            )}
                            {additionalServicesHeader &&
                                selectedHome?.additionalServices && (
                                    <div id="additional-services">
                                        <AccordionPanel
                                            header={additionalServicesHeader}
                                            itemIndex={0}
                                        >
                                            {documentToReactComponents(
                                                selectedHome.additionalServices,
                                                formattingOptions
                                            )}
                                        </AccordionPanel>
                                    </div>
                                )}
                        </div>
                    }
                </>
            )}
        </div>
    )
}

export const PricingDisplay = (priceValue: Maybe<number> | undefined) => {
    const numericPrice = Number(priceValue)
    if (isNaN(numericPrice)) return <div className="text-2xl ">0</div>
    else {
        const stringPrice = numericPrice.toFixed(2).toString().split('.')
        return (
            <div className="flex font-semibold">
                <span className="text-2xl">${stringPrice[0]}</span>
                <span className="text-sm pt-1.5 ml-1">.{stringPrice[1]}</span>
            </div>
        )
    }
}
