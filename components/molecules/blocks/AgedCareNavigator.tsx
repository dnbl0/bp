import Link from 'next/link'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { CmsAgedCareNavigator, CmsPromotionCard, CmsNavigatorResult, CmsNavigatorStep, CmsColouredCard } from '../../../types/contentful-cms-types'
import { cx } from '../../../utils/cx'
import { ResponsiveImage } from '../../atoms/ResponsiveImage'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { PromotionCardBlock } from './PromotionCardBlock'
import { ColouredCardBlock } from './ColouredCardBlock'
import { ChevronRightIcon } from '../../atoms/icons/ChevronRightIcon'
import { PencilIcon } from '../../atoms/icons/PencilIcon'
import { MarkdownBlock } from './MarkdownBlock'
import { formattingOptions } from '../../../utils/formattingOptions'
import { CtaBlock } from './CtaBlock'
import { useRouter } from 'next/router'
import { setBreadcrumbBackLink } from './BreadCrumbsBlock'


interface CtaProps {
    leftIsCancel?: boolean;
    leftText?: string;
    leftTarget?: number | string;
    rightText?: string;
    rightTarget?: number | string;
    leftDisabled?: boolean;
    rightDisabled?: boolean;
    hideIcons?: boolean;
    currentStep?: string;
    showLeftButton?: boolean;
}

interface BasicData {
    [key:string]: string;
}

interface OptionData {
    [key:string]: CmsNavigatorStep;
}

interface ResultData {
    result: CmsNavigatorResult;
    keys: BasicData;
}

const updateQueryString = (param: string, value: string) => {
    if ('URLSearchParams' in window) {
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set(param, value);

        setTimeout(() => {
            const historyState = JSON.parse(JSON.stringify({...window.history.state, as: newUrl.pathname + newUrl.search, asPath: newUrl.pathname + newUrl.search, url: newUrl }));
            window.history.replaceState(historyState, '', newUrl.href);
        });
    }
};

const addQueryStringsToLinks = (href: string, mainParams: BasicData) => {
    const hrefUrl = new URL(href, window.location.origin);
    const hrefUrlNormal = new URL(href, window.location.origin);
    const hashParams = new URLSearchParams(hrefUrl.hash.split('?')[1] || '');
    const hashPrefix = hrefUrl.hash.split('?')[0] || '';
    hashParams.set('NavigatorResults', '');
    hrefUrlNormal.searchParams.set('NavigatorResults', '');
    Object.entries(mainParams).map(([key, value]) => {
        hashParams.set(key, value);
        hrefUrlNormal.searchParams.set(key, value);
    });
    hrefUrl.hash = hashPrefix + (hashParams.toString() ? `?${hashParams.toString()}` : '');
    if (href.match(/.*zoho.*/)) {
        return hrefUrl.href;
    }
    return hrefUrlNormal.href;
};


const getQueryStringValues = () => {
    try{
        if ('URLSearchParams' in window) {
            const url = new URL(window.location.href)
            return url.searchParams;
        }
    } catch (e) {
        console.error('Error getting query string values', e);
    }
};

const dashText = (text?: string) => {
    return text?.toLowerCase().replace(/\s+/g, '-');
};

let loadTimeout: NodeJS.Timeout;

export const AgedCareNavigator = ({
    component,
}: {
    component: CmsAgedCareNavigator
}) => {
    const {
        introductionImage,
        introductionContent,
        introductionDisclaimer,
        introductionHighlight,
        introductionLeftButton,
        navigatorHeading,
        navigatorHeadingButtonIcon,
        navigatorHeadingButtonText,
        navigatorHeadingButtonUrl,
        navigatorStepsCollection,
    } = component;

    const router = useRouter();

    const [homepageUrl, setHomepageUrl] = useState('https://bupaagedcare.com.au');

    const [isNavigatorLoaded, setisNavigatorLoaded] = useState<boolean>(false);
    const [stepNames, setStepNames] = useState<string[]>(['Intro', 'Results']);
    const [currentStep, setCurrentStep] = useState<string>('');
    const [selectedOptions, setSelectedOptions] = useState<OptionData>({});
    const [optionNotice, setOptionNotice] = useState<CmsPromotionCard | null>(null);
    const [optionModalContent, setOptionModalContent] = useState<React.ReactNode>(null);
    const [resultKey, setResultKey] = useState<string>('');
    const [resultsData, setResultsData] = useState<ResultData[]>([]);
    const [resultsContent, setResultsContent] = useState<CmsNavigatorResult | null>(null);
    const [resultsCards, setResultsCards] = useState<CmsColouredCard[]>([]);
    const [showSummary, setShowSummary] = useState<React.ReactNode>(null);
    const [modifyStep, setModifyStep] = useState<string | null>(null);
    const [modifyOption, setModifyOption] = useState<CmsNavigatorStep | null>(null);
    
    const steps = navigatorStepsCollection?.items || [];
    const progressPercentage = currentStep !== null ? (stepNames.indexOf(currentStep) / steps.length) * 100 : 0;
   
    const defaultResults = {
        heading: 'Your results',
        description: 'Based on your responses, here are the next steps you can take to explore aged care options with us.'
    };

    const textModifier = (text: string) => {
        return text.replace(/(<<(.+)>>)/g, (_, ...args) => {
            const key = args[1].split('|')[0].trim();
            const keyIndex = Number(args[1].split('|')?.[1]?.trim()) || 1;
            const matchedOption = selectedOptions[key];
            const baseValue = matchedOption?.alternateHeading || matchedOption?.heading || '';
            const splitValue = baseValue.split('|');
            let value = splitValue[keyIndex - 1] || baseValue;
            const posiiton = args[2];
            if (posiiton === 0) {
                value = value[0]?.toUpperCase() + value.slice(1);
            }
            return value;
        });
    };

    const handleOptionClick = (optionName: string, stepName: string) => {
        const step = steps.find(s => s?.name === stepName);
        const option: CmsNavigatorStep = step?.stepOptionsCollection?.items.find(o => o?.name === optionName)!;
        const { notice, modalOverrideContent, modalOverrideCtasCollection } = option;
        if (modalOverrideContent) {
            setOptionModalContent(
                <>
                    <div>
                        {documentToReactComponents(modalOverrideContent.json, formattingOptions )}
                    </div>
                    <div className='flex justify-end gap-4'>                            
                        {modalOverrideCtasCollection?.items.map((cta) => 
                            cta && (
                                <CtaBlock key={cta.sys.id} component={cta} />
                            )
                        )}
                        <button className='button button--secondary' onClick={() => setOptionModalContent(null)}>Cancel</button>
                    </div>
                </>
            );
            return;
        }

        setOptionNotice(notice ?? null);
        setSelectedOptions((prev) => ({...prev, [stepName]: option}) );
    };

    const handleNavClick = (e: React.MouseEvent<HTMLButtonElement>, target: string) => {
        e.preventDefault();
       
        if (target === 'history') {
            console.warn('No target step specified for navigation');
            router.back();

            return;
        }

        const newTarget = target === 'Cancel' ? 'Results' : target;

        if (target === 'Cancel') {
            const newSelectedOptions = {...selectedOptions, [modifyStep!]: modifyOption! };
            updateQueryString(modifyStep!, modifyOption?.name || '');
            setSelectedOptions(newSelectedOptions);
        }

        setCurrentStep(newTarget);
        setOptionNotice(null);
    };

    const handleHideSummary = () => {
        setShowSummary(null);
        setModifyStep(null);
        setModifyOption(null);
    }

    const pickResultsContent = useCallback(() => {
        resultsData.forEach((resultData) => {
            const keys = resultData.keys;
            const isMatch = Object.entries(keys).every(([stepName, optionName]) => {
                return selectedOptions[stepName]?.name === optionName;
            });
            if (isMatch) {
                const result = resultData.result;
                if (result) {
                    setResultKey(result.name || '');
                    setResultsContent(result);
                    const optionResultCards = Object.values(selectedOptions).map((option) => {
                        const excludeMatchList = Object.entries(keys).map((ent) => ent.join("-")).join('--');
                        if (option.resultsContentExcludeList?.includes(excludeMatchList)) {
                            return undefined;
                        }

                        return option.resultContent ?? undefined
                    }).filter(Boolean);
                    const resultCards = result.resultsContentCollection?.items || [];
                    setResultsCards([...optionResultCards, ...resultCards] as CmsColouredCard[]);
                }
            }
        });
    }, [resultsData, selectedOptions]);

    const storeNavigatorState = useCallback(() => {
         if (!['Intro', 'Cancel', 'Results', ''].includes(currentStep)) {
            updateQueryString(currentStep, selectedOptions[currentStep]?.name || '');
        }
        if (currentStep === 'Results') {
            updateQueryString("Results", resultKey);
        }

        document.querySelectorAll('#navigator-top a').forEach((el) => {
            if (el.getAttribute('href')) {

                const currentSelectedOptions: BasicData = {};
                for (const opt in selectedOptions) {
                    const key: string = (opt || 'keyString');
                    currentSelectedOptions[key.toString()] = selectedOptions[key]?.name ?? '';
                }
                const newHref = addQueryStringsToLinks(el.getAttribute('href')!, currentSelectedOptions);
                newHref && el.setAttribute('href', newHref);
            }
        });

        const navigatorBreadcrumb = {
            title: 'Back to Navigate aged care',
            link: window.location.href,
            expiry: 2 // expiry on the second navigation event
        };
        setBreadcrumbBackLink('agedCareNavigator', navigatorBreadcrumb);
    }, [currentStep, selectedOptions, resultKey]);

    useEffect(() => {
        const windowWidth = window.innerWidth;
        if (currentStep !== '' && currentStep !== 'Intro' && windowWidth < 768) {
            setTimeout(() => {
                document.getElementById('navigator-top')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 0);
        }
    }, [currentStep]);

    useEffect(() => {
        pickResultsContent();
    }, [selectedOptions, pickResultsContent]);

    useEffect(() => {
        storeNavigatorState();
    }, [selectedOptions, currentStep, resultKey, storeNavigatorState]);

    useEffect(() => {
        const steps = component.navigatorStepsCollection?.items || [];
        const localStepNames = ['Intro', ...steps.map(step => step?.name || 'Step'), 'Results'];
        setStepNames(localStepNames);

        const results = component.navigatorResultsCollection?.items || [];
        const resultOptions = results.map((result) => {
            return result?.name?.split('--').reduce((acc, nameString) => {
                const parts = nameString.split('-');
                acc.keys[parts[0]] = parts[1];
                acc.result = result;
                return acc;
            }, {keys: {}, result} as ResultData)!
        });

        setResultsData(resultOptions);

        if (loadTimeout) clearTimeout(loadTimeout);

        loadTimeout = setTimeout(() => {
            if(document?.location) {
                setHomepageUrl(document.location.origin);
            }

            const queryMatchedOptions: OptionData = {};
            let nextStep = '';
            
            getQueryStringValues()?.forEach((value, key) => {
                const step = steps.find(s => s?.name === key);
                const option = step?.stepOptionsCollection?.items.find(o => o?.name === value);
                nextStep = !!step ? key : 'Intro';
                if (option) {
                    queryMatchedOptions[key] = option;
                    nextStep = localStepNames[localStepNames.indexOf(key) + 1] || 'Results';
                }
            });

            setSelectedOptions(queryMatchedOptions);

            if (Object.keys(queryMatchedOptions).length === steps.length) {
                setCurrentStep('Results');
            } else {
                setCurrentStep(nextStep || 'Intro');
            }

            setisNavigatorLoaded(true);
        }, 150);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [component]);

    const NavaigatorCtaRow = (props: CtaProps) => {
        const { leftText: leftLabel, rightText: rightLabel, hideIcons, leftTarget, rightTarget, leftDisabled, rightDisabled, leftIsCancel, showLeftButton = true } = props;
        const leftTargetStepName = typeof leftTarget === 'number' ? stepNames[leftTarget] : '';
        const leftNav = leftIsCancel ? 'Cancel' : leftTarget !== undefined ? leftTargetStepName : 'history';
        const rightTargetStepName = typeof rightTarget === 'number' ? stepNames[rightTarget] : '';
        const rightNav = rightTargetStepName;
        const leftText = leftLabel ?? 'Back';
        const rightText = rightLabel ?? 'Next';

        let leftURL = '';
        try {
            leftURL = new URL(leftTarget?.toString() ?? '').toString();
        } catch (e) {
        }

        let rightURL = '';
        try {
            rightURL = new URL(rightTarget?.toString() ?? '').toString();
        } catch (e) {
        }


        return (
            <div className='grow flex flex-row gap-4 sm:justify-end'>
                {showLeftButton && (
                    <>
                    {!!leftURL ? (
                        <a className={cx('button button--secondary max-sm:button--small  max-sm:!py-3 max-sm:!px-4 max-sm:grow text-center max-sm:justify-center')} 
                            href={leftURL}>
                            <ChevronRightIcon className={cx('inline-block transform fill-current', hideIcons ? 'hidden' : 'rotate-180')} />
                            {leftText}
                        </a>
                    ) : (
                        <button className={cx('button button--secondary max-sm:button--small  max-sm:!py-3 max-sm:!px-4 max-sm:grow text-center max-sm:justify-center')} 
                            onClick={(e) => handleNavClick(e, leftNav)} 
                            disabled={leftDisabled} 
                            data-link-type={`acn-step-${stepNames.indexOf(currentStep)}-${currentStep}-${dashText(leftText.toLowerCase())}`}>
                            <ChevronRightIcon className={cx('inline-block transform fill-current', hideIcons ? 'hidden' : 'rotate-180')} />
                            {leftText}
                        </button>
                    )}
                    </>
                )}
                {!!rightURL ? (
                    <a className={cx('button max-sm:button--small max-sm:!py-3 max-sm:!px-4 max-sm:grow text-center max-sm:justify-center', rightDisabled ? 'button-ghost' : 'button--primary')}
                        href={rightURL}>
                        <ChevronRightIcon className={cx('inline-block transform fill-current', hideIcons ? 'hidden' : '')} />
                        {rightText}
                    </a>
                ) : (
                    <button className={cx('button max-sm:button--small max-sm:!py-3 max-sm:!px-4 max-sm:grow text-center max-sm:justify-center', rightDisabled ? 'button-ghost' : 'button--primary')} 
                        onClick={(e) => handleNavClick(e, rightNav)} 
                        disabled={rightDisabled}  
                        data-link-type={`acn-step-${stepNames.indexOf(currentStep)}-${currentStep}-${dashText(rightText.toLowerCase())}`}>
                        {rightText}
                        <ChevronRightIcon className={cx('inline-block fill-current', hideIcons ? 'hidden' : '')} />
                    </button>
                )}
            </div>
        )
    };

    const isCurrentStep = (stepName: string) => stepName.toLowerCase() === currentStep.toLowerCase();
    const isModifyStep = (stepName: string) => modifyStep === stepName;

    return (
        <div className={cx(
            "px-4", 
            isCurrentStep('Intro') ? "py-10" : "pb-10",
            isNavigatorLoaded ? 'animate-fade-in-fast block' : 'animate-fade-out hidden'
        )} id="navigator-top" >
            {/* Introduction */}
            <div
                className={cx(
                    'max-w-3xl w-full mx-auto',
                    'text-navy p-8 rounded',
                    'flex flex-wrap gap-8',
                    'border border-cool-paper-200',
                    'bg-white',
                    'rounded-lg',
                    'flex-col md:flex-row',
                    isCurrentStep('Intro') ? 'animate-fade-in-fast block' : 'animate-fade-out hidden'
                )}
            >
                {introductionImage && <div className="grow w-full">
                    <ResponsiveImage image={introductionImage} layout="responsive" iconSize={introductionImage.width?.toString()} />
                </div>}
                <div className='grow w-full'>
                    {introductionContent && documentToReactComponents(introductionContent.json, formattingOptions)}
                </div>
                {introductionHighlight && <div className='grow w-full'><PromotionCardBlock component={introductionHighlight} /></div>}
                <NavaigatorCtaRow 
                    rightText="Get started"
                    rightTarget={1} 
                    leftTarget={introductionLeftButton?.toLowerCase() === 'home' ? homepageUrl : undefined}
                    leftText={introductionLeftButton?.toLowerCase() === 'home' ? 'Home' : undefined}
                    showLeftButton={introductionLeftButton?.toLowerCase() !== 'hidden'} 
                />
                {introductionDisclaimer && <div className="text-sm text-disabled-text sm:text-right w-full">
                    <MarkdownBlock content={introductionDisclaimer} />
                </div>}
            </div>

            {/* Heading */}
            <div className={cx("bg-cyan text-white -mx-4", isCurrentStep('Intro') || isCurrentStep('Results') ? 'animate-fade-out-fast hidden' : 'animate-fade-in-fast block')} >
                <div className="max-w-6xl w-full mx-auto py-10 px-4 flex flex-wrap gap-8">
                    <div className={cx(
                        'basis-full flex flex-col gap-4 grid-cols-12',
                        'md:grid',
                        '[&>*:nth-child(1)]:col-span-8',
                        '[&>*:nth-child(2)]:col-span-4'
                    )}>
                        <div className='text-3xl font-light'>{navigatorHeading}</div>
                        <div className={cx("text-left sm:ml-auto leading-8", !(isCurrentStep('Results') || !!modifyOption) ? 'animate-fade-in-fast block' : 'animate-fade-out hidden')}>
                            <span className='text-sm tracking-wider text-white/80'>Step {stepNames.indexOf(currentStep)} of {steps.length}</span>
                            <div className='w-36 h-3 bg-white/30 rounded-full relative overflow-hidden'>
                                <div className='absolut w-full left-0 bg-white h-full rounded-full transform transition-transform' style={{transform:`translateX(-${100 - progressPercentage}%)`}}></div>
                            </div>
                        </div>
                    </div>
                    {navigatorHeadingButtonUrl && 
                        <Link href={navigatorHeadingButtonUrl}>
                            <a className='button button--primary button--inverse inline-flex items-center justify-center text-left mx-auto sm:ml-0 bg-white cursor-pointer'
                                data-link-type={`cta-${dashText(navigatorHeadingButtonText ?? '')}`}>
                                {navigatorHeadingButtonIcon && 
                                    <ResponsiveImage                                
                                    image={{...navigatorHeadingButtonIcon, width: 40, height: 40}}
                                    layout="fixed"
                                    />
                                }
                                {navigatorHeadingButtonText}
                            </a>
                        </Link>
                    }
                </div>
            </div>
            

            {steps.map((step, index) => {
                if (!step) return null;
                const options = step.stepOptionsCollection?.items || [];
                const hasSelectedOption = selectedOptions.hasOwnProperty(step.name || '');
                const modifiedAndSelectedMatch = modifyOption?.name === selectedOptions?.[modifyStep ?? '']?.name;
                return (
                    <div key={step.sys.id} className={cx(
                        'max-w-6xl w-full mx-auto mt-10',
                        'text-navy sm:p-6 rounded',
                        'flex flex-wrap gap-8',
                        'flex-col md:flex-row',
                        isCurrentStep(step.name!) ? 'animate-fade-in-fast block' : 'animate-fade-out hidden'
                    )}>
                        <div className="flex flex-col gap-1">
                            <h2 className='w-full text-xl font-semibold'>{textModifier(step?.heading ?? '')}</h2>
                            {step.description && <div className='w-full mt-3'>{textModifier(step.description)}</div>}
                        </div>
                        <div className={cx("grid grid-cols-1 w-full gap-4", options.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-4')}>
                        {options.map((option) => {
                            if (!option) return null;
                            const isSelected = selectedOptions[step.name || '']?.name === option.name;
                            if (isSelected && option.notice && isCurrentStep(step.name!) && !optionNotice) {
                                setOptionNotice(option.notice);
                            }
                            return (
                                <button key={option.sys.id} className={cx(
                                    'flex flex-col justify-center items-center gap-2',
                                    'border-2',
                                    isSelected ? 'border-cyan' : 'border-cool-paper-200', 
                                    isSelected ? 'bg-cyan-50' : 'bg-white',
                                    'hover:bg-cool-paper-100 cursor-pointer',
                                    'rounded p-6 flex-grow text-center',
                                )} onClick={() => handleOptionClick(option.name!, step.name!)}>
                                    {option.icon &&
                                        <div className='w-16 min-h-16 pb-4 flex justify-center items-center'>
                                        <ResponsiveImage                                
                                        image={{...option.icon, width: 57, height: 57}}
                                        layout="intrinsic"
                                        />
                                        </div>
                                    }
                                    <div className='font-semibold text-body leading-6'>{option.heading}</div>
                                    {option.subHeading && <div className='text-sm text-navy'>{option.subHeading}</div>}
                                </button>
                            )
                        })}
                        </div>

                        {optionNotice && <div className='grow w-full animate-fade-in-fast'><PromotionCardBlock component={optionNotice} /></div>}

                        {!!modifyOption ? (
                            <NavaigatorCtaRow leftText='Cancel' leftIsCancel rightTarget={stepNames.length - 1} rightDisabled={modifiedAndSelectedMatch} rightText='Apply changes' hideIcons/>
                        ) : (
                            <NavaigatorCtaRow leftTarget={index} rightTarget={index + 2} rightDisabled={!hasSelectedOption} />
                        )}
                    </div>
                )}
            )}

            <div className={cx(isCurrentStep('Results') ? 'animate-fade-in-fast block' : 'animate-fade-out hidden')}>

                {resultsContent ? (
                    <Fragment>
                        <div className={cx("bg-cyan text-white -mx-4", isCurrentStep('Results') ? 'animate-fade-in-fast block' : 'animate-fade-out hidden')} >
                            <div className="max-w-6xl w-full mx-auto text-center py-10 px-4 flex flex-wrap gap-8">
                                <div className={cx(
                                    'basis-full flex flex-col gap-4 grid-cols-12',
                                    'md:grid',
                                    '[&>*:nth-child(1)]:col-span-8',
                                    '[&>*:nth-child(2)]:col-span-4'
                                )}>
                                    <div className='text-left text-3xl font-light'>{textModifier(resultsContent?.bannerTitle ?? '')}</div>                        
                                </div>
                                <div className={cx("flex gap-3 text-left items-stretch", isCurrentStep('Results') ? 'animate-fade-in-fast block' : 'animate-fade-out hidden')}>
                                    {resultsContent.bannerPrimaryCtaText && resultsContent?.bannerPrimaryCtaUrl && 
                                        <Link href={resultsContent.bannerPrimaryCtaUrl}>
                                            <a className='button button--primary button--inverse button--small inline-flex items-center justify-center mx-auto cursor-pointer'
                                                data-link-type={`cta-${dashText(resultsContent.bannerPrimaryCtaText)}`}>
                                                {navigatorHeadingButtonIcon && 
                                                    <ResponsiveImage                                
                                                    image={{...navigatorHeadingButtonIcon, width: 40, height: 40}}
                                                    layout="fixed"
                                                    />
                                                }
                                                {resultsContent.bannerPrimaryCtaText}
                                            </a>
                                        </Link>
                                    }
                                    {resultsContent.bannerSecondaryCtaText && resultsContent.bannerSecondaryCtaUrl && 
                                        <Link href={resultsContent.bannerSecondaryCtaUrl}>
                                            <a className='button button--primary button--inverse button--small inline-flex items-center justify-center mx-auto bg-white cursor-pointer'
                                                data-link-type={`cta-${dashText(resultsContent.bannerSecondaryCtaText)}`}>
                                                {resultsContent.bannerSecondaryCtaText}
                                            </a>
                                        </Link>
                                    }
                                </div>

                            </div>
                        </div>

                        <div className={cx(
                            'max-w-6xl w-full mx-auto mt-10',
                            'text-navy sm:p-6 rounded',
                            'flex flex-wrap gap-6',
                            'flex-col md:flex-row',
                            isCurrentStep('Results') ? 'animate-fade-in-fast block' : 'animate-fade-out hidden'
                        )}>
                                
                            <div className='w-full flex flex-col md:flex-row gap-2 sm:justify-between sm:items-center'>
                                <h2 className='w-full text-xl font-semibold mb-4 sm:mr-auto'>
                                    {resultsContent.heading}
                                </h2>

                                <div className="">
                                    <button className='button button--secondary whitespace-nowrap' data-link-type={'acn-edit-your-choices'} onClick={ () => setShowSummary(true)}>
                                        Edit your choices
                                        <span>
                                            <PencilIcon />
                                        </span>
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-2">
                                {resultsContent.description && <div className='w-full mb-4'>{resultsContent.description}</div>}                            
                            </div>

                            {/* <NavaigatorCtaRow leftTarget={steps.length - 1} rightTarget={0} /> */}
                            <div className={cx("grid grid-cols-1 w-full gap-4", resultsCards.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3')}>
                                {resultsCards.map((card, index) =>
                                    card ? <ColouredCardBlock key={index} component={card} /> : null
                                )}
                            </div>

                            {resultsContent.resultNotice && <div className='grow w-full'><PromotionCardBlock component={resultsContent.resultNotice} headingOverride={textModifier(resultsContent.resultNotice.heading ?? '')} /></div>}
                        </div>
                        
                    </Fragment>
                ) : (
                    <div className={cx(
                        'max-w-4xl w-full mx-auto mt-10',
                        'text-navy p-6 rounded',
                        'flex flex-wrap gap-6',
                        'flex-col md:flex-row',
                        isCurrentStep('Results') ? 'animate-fade-in-fast block' : 'animate-fade-out hidden'
                    )}>
                        <h2 className='w-full text-2xl font-semibold mb-4'>{defaultResults.heading}</h2>
                        {defaultResults.description && <div className='w-full mb-4'>{defaultResults.description}</div>}

                        <NavaigatorCtaRow leftTarget={steps.length - 1} rightTarget={0} />
                    </div>
                )}
            </div>

            {optionModalContent && 
                <div className='fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-modal-backdrop p-2'>
                    <div className='bg-white rounded-sm p-4 pt-14 sm:p-10 max-w-2xl w-full relative flex flex-col gap-10 max-h-[90vh] overflow-y-auto'>
                        <button className='absolute top-8 right-11 sm:top-11 sm:right-8 text-navy text-5xl font-thin leading-[0rem]' onClick={() => setOptionModalContent(null)}>×</button>
                        {optionModalContent}
                    </div>
                </div>
            }


            {showSummary && 
                <div className={cx(
                    'fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-modal-backdrop p-2', 
                    showSummary ? 'animate-fade-in-fast' : 'animate-fade-out'
                )}>
                    <div className='bg-white rounded-sm p-4 sm:p-10 max-w-4xl w-full relative flex flex-col gap-4 max-h-[90vh] overflow-y-auto'>
                        <button className='absolute top-0 right-2 sm:top-4 sm:right-4 text-navy text-5xl font-thin' onClick={handleHideSummary}>×</button>
                        <h3 className={cx('text-heading-s')}>
                            Edit your choices below
                        </h3>
                        <p className='text-body'>Change your selections and we&apos;ll update what you need to do next</p>
                        <div className='grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,_minmax(150px,_1fr))] flex-row gap-2'>
                            {steps.map((step, index) => {
                                if (!step) return null;
                                const selectedOption = selectedOptions[step.name || ''];
                                const stepName = step.name || '';
                                return (
                                    <button key={'summary-'+ step.sys.id} className={cx(
                                        'flex flex-col justify-center items-center gap-2',
                                        'border-2',
                                        isModifyStep(step.name!) ? 'border-cyan' : 'border-cool-paper-200', 
                                        isModifyStep(step.name!) ? 'bg-cyan-50' : 'bg-white',
                                        'hover:bg-cool-paper-100 cursor-pointer',
                                        'rounded p-6 flex-grow text-center',
                                    )} onClick={() => {
                                        setModifyStep(step.name!);
                                        setModifyOption(selectedOption);
                                    }}>
                                        {step.summaryImage &&
                                            <div className='w-16 min-h-16 py-4 flex justify-center items-center'>
                                            <ResponsiveImage                                
                                            image={{...step.summaryImage, width: 57, height: 57}}
                                            layout="intrinsic"
                                            />
                                            </div>
                                        }
                                        <div className='font-semibold text-body'>{step.summaryTitle}</div>
                                        {selectedOption && <div className='text-sm text-navy'>{selectedOption.resultTitle || selectedOption.heading }</div>}
                                    </button>
                                )})}
                        </div>
                        <div className='flex md:justify-end gap-4'>
                            <button className='button button--secondary' onClick={handleHideSummary}>Cancel</button>
                            <button className={cx('button button--primary')} disabled={!modifyStep} onClick={(e) => {
                                handleNavClick(e, modifyStep!);
                                setShowSummary(null);
                            }}>Edit selected</button>
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}
