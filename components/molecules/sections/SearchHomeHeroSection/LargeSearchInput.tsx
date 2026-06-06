import { NextRouter, useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useClickAway } from 'react-use'
import { cx } from '../../../../utils/cx'
import { firstValue } from '../../../../utils/firstValue'
import { addTagManagerEvent } from '../../../../utils/tagManager'
import { CloseIcon } from '../../../atoms/icons/CloseIcon'
import { SearchIcon } from '../../../atoms/icons/SearchIcon'
import {
    LocationSearchType,
    SEARCH_STRING_FIELD_NAME,
    SEARCH_TYPE_FIELD_NAME,
} from './constants'
import { LocationSearchOptions } from './LocationSearchOptions'
import { findHomes, useLocationSearchItems } from './useLocationSearchItems'
import { useGlobalPageData } from '../../../../hooks/useGlobalPageData'

export const LargeSearchInput = ({
    placeholder,
    searchButtonText,
    searchEndpoint,
}: {
    placeholder: string
    searchButtonText: string
    searchEndpoint: string
}) => {
    const router = useRouter()

    const inputElement = useRef<HTMLInputElement>(null)

    const [searchType, setSearchType] = useState<string | undefined>(
        firstValue(router.query[SEARCH_TYPE_FIELD_NAME])
    )

    const [searchString, setSearchString] = useState<string | undefined>(
        firstValue(router.query[SEARCH_STRING_FIELD_NAME])
    )

    const [focusedValue, setFocusedValue] = useState<string | undefined>()

    const [isDropDownExpanded, setIsDropDownExpanded] = useState(false)

    const locationSearchItems = useLocationSearchItems(
        isDropDownExpanded,
        searchString?.trim() || ''
    )

    const { agedCareHomesSummary = [] } = useGlobalPageData()

    useEffect(() => {
        if (focusedValue && inputElement.current) {
            const caretPosition = focusedValue.length
            inputElement.current.setSelectionRange(caretPosition, caretPosition)
        }
    }, [focusedValue])

    const formRef = useRef<HTMLFormElement>(null)

    useClickAway(formRef, () => {
        setIsDropDownExpanded(false)
    })

    return (
        <form
            ref={formRef}
            method="get"
            action={searchEndpoint}
            autoComplete="off"
            onSubmit={event => {
                event.preventDefault()
                const matchingHome = searchString
                    ? findHomes(searchString, agedCareHomesSummary)
                    : undefined
                if (
                    matchingHome &&
                    matchingHome.length > 0 &&
                    matchingHome[0].caption.toLowerCase() ==
                        searchString?.toLowerCase()
                ) {
                    submitSearch(
                        router,
                        matchingHome[0].code!,
                        undefined,
                        undefined
                    )
                } else {
                    submitSearch(
                        router,
                        searchEndpoint,
                        searchType,
                        searchString
                    )
                }
            }}
            onReset={event => {
                event.preventDefault
                setSearchString('')
                console.log(searchEndpoint)
                submitSearch(router, searchEndpoint, undefined, '', false)
            }}
        >
            <div
                className={cx(
                    'w-full flex flex-row',
                    'border-2 border-cool-paper-200 rounded-lg',
                    'focus-within:border-cyan',
                    isDropDownExpanded && 'rounded-bl-none'
                )}
            >
                <div className="relative grow">
                    <input
                        ref={inputElement}
                        name={SEARCH_STRING_FIELD_NAME}
                        className={cx(
                            'peer',
                            'block h-full w-full',
                            'py-2 px-2',
                            'rounded-lg',
                            'focus:outline-none'
                        )}
                        placeholder={placeholder}
                        onFocus={() => setIsDropDownExpanded(true)}
                        onChange={event => {
                            setSearchType(LocationSearchType.place)
                            setFocusedValue(undefined)
                            setSearchString(event.target.value)
                        }}
                        value={focusedValue || searchString || ''}
                    />
                    {isDropDownExpanded && (
                        <div
                            className={cx(
                                'bg-white rounded-b-lg',
                                'absolute -left-[2px] -right-[2px]',
                                'border-x-2 border-b-2 border-cool-paper-200',
                                'z-dropdown',
                                'peer-focus:border-cyan',
                                'overflow-hidden'
                            )}
                        >
                            <LocationSearchOptions
                                locationSearchItems={locationSearchItems}
                                onItemFocused={item => {
                                    setFocusedValue(item.caption)
                                }}
                                onItemSelected={item => {
                                    addTagManagerEvent('search', {
                                        search_location: item.caption,
                                    })
                                    setFocusedValue(undefined)
                                    setSearchString(item.caption)
                                    setSearchType(item.type)
                                    setIsDropDownExpanded(false)
                                    if (item.type === 'home' && item.code) {
                                        router.push(item.code)
                                    } else {
                                        submitSearch(
                                            router,
                                            searchEndpoint,
                                            item.type,
                                            item.caption
                                        )
                                    }
                                }}
                            />
                        </div>
                    )}
                </div>
                {searchString && !isDropDownExpanded && (
                    <div className={cx('px-2')}>
                        <button
                            className={cx(
                                'h-full',
                                'items-center',
                                'flex',
                                'm-0',
                                'p-0'
                            )}
                            type="reset"
                            title="Clear"
                        >
                            <CloseIcon
                                className={cx(
                                    'stroke-1',
                                    'w-5',
                                    'stroke-cool-paper-200',
                                    'fill-cool-paper-200'
                                )}
                            />
                        </button>
                    </div>
                )}

                <button
                    className={cx(
                        'button rounded-l-none rounded-r', // Set button style with some overrides
                        '-my-[2px] -mr-[2px]', // Adjust bounds to overlap border of parent element
                        'pl-3 pr-3 md:pl-4'
                    )}
                    type="submit"
                >
                    <div className="flex flex-row gap-2">
                        <div className="hidden sm:block font-medium">
                            {searchButtonText}
                        </div>
                        <span className="sr-only">{searchButtonText}</span>
                        <SearchIcon />
                    </div>
                </button>
            </div>
        </form>
    )
}

const submitSearch = (
    router: NextRouter,
    searchEndpoint: string,
    searchType: string | undefined,
    searchString: string | undefined,
    showAnchor: boolean = true
) => {
    const params = new URLSearchParams()
    const anchor = showAnchor ? '#aged-care-home-map' : '#home-search'
    if (searchType && searchString) {
        params.set(SEARCH_TYPE_FIELD_NAME, searchType)
        params.set(SEARCH_STRING_FIELD_NAME, searchString)
        router.push(`${searchEndpoint}?${params.toString()}${anchor}`)
    } else {
        router.push(searchEndpoint + anchor)
    }
}
