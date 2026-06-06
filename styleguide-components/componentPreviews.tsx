import { ReactNode } from 'react'
import { cx } from '../utils/cx'
import { ImagePlaceholderIcon } from '../components/atoms/icons/ImagePlaceholderIcon'
import { PlayArrow } from '../components/atoms/icons/PlayArrow'
import { SearchIcon } from '../components/atoms/icons/SearchIcon'
import { ChevronRightIcon } from '../components/atoms/icons/ChevronRightIcon'
import { ChevronDownIcon } from '../components/atoms/icons/ChevronDownIcon'
import { CallNowIcon } from '../components/atoms/icons/CallNowIcon'
import { CallBackIcon } from '../components/atoms/icons/CallBackIcon'
import { ArrowUp } from '../components/atoms/icons/ArrowUp'
import { FacebookIcon } from '../components/atoms/icons/FacebookIcon'
import { InstagramIcon } from '../components/atoms/icons/InstagramIcon'
import { LinkedInIcon } from '../components/atoms/icons/LinkedInIcon'
import { YouTubeIcon } from '../components/atoms/icons/YouTubeIcon'
import { PersonIcon } from '../components/atoms/icons/PersonIcon'
import HomeIcon from '../components/atoms/icons/HomeIcon'
import { PulseLogo } from '../components/atoms/icons/PulseLogo'

/*
    Compact, static, NON-INTERACTIVE preview of each component, rendered as a
    thumbnail on the Components overview. Every overview card is an <a>, so these
    previews must not contain <a>/<button>/<input> (invalid nested interactives):
    "buttons", "tags" and "fields" are rendered as styled spans/divs.
*/

// ---- shared building blocks -------------------------------------------------

const Bar = ({ w = 'w-full', tone = 'bg-cool-paper-200' }: { w?: string; tone?: string }) => (
    <span className={cx('block h-2 rounded', w, tone)} />
)

const Lines = ({ rows = 3, className }: { rows?: number; className?: string }) => (
    <div className={cx('w-full space-y-1.5', className)}>
        {Array.from({ length: rows }).map((_, i) => (
            <Bar key={i} w={i === rows - 1 ? 'w-2/3' : 'w-full'} />
        ))}
    </div>
)

/** A button look-alike (inert span). */
const Btn = ({ children, variant, size = 'button--small' }: { children: ReactNode; variant?: string; size?: string }) => (
    <span className={cx('button', size, variant)}>{children}</span>
)

/** An input look-alike. */
const Field = ({ placeholder = '', icon, className }: { placeholder?: string; icon?: ReactNode; className?: string }) => (
    <div className={cx('flex items-center gap-2 w-full h-8 px-3 rounded-md bg-white border border-cool-paper-200', className)}>
        {icon}
        <span className="text-caption text-disabled-text truncate">{placeholder}</span>
    </div>
)

const Tagish = ({ children, bg, color }: { children: ReactNode; bg: string; color: string }) => (
    <span className="inline-block px-2 py-0.5 rounded text-caption" style={{ backgroundColor: bg, color }}>
        {children}
    </span>
)

const Frame = ({ className, children }: { className?: string; children?: ReactNode }) => (
    <div className={cx('flex items-center justify-center rounded-lg bg-cool-paper-100', className)}>
        {children ?? <ImagePlaceholderIcon className="w-8 h-8 fill-silver" />}
    </div>
)

const Grid12 = ({ splits }: { splits: number[] }) => (
    <div className="grid grid-cols-12 gap-1.5 w-full">
        {splits.map((s, i) => (
            <span
                key={i}
                className="h-9 rounded bg-cyan-50 border border-cyan/40 flex items-center justify-center text-caption font-mono text-cyan"
                style={{ gridColumn: `span ${s} / span ${s}` }}
            >
                {s}
            </span>
        ))}
    </div>
)

const Heading = ({ children = 'Heading', className }: { children?: ReactNode; className?: string }) => (
    <span className={cx('block font-semibold text-navy', className)}>{children}</span>
)

// ---- preview registry -------------------------------------------------------

export const componentPreviews: Record<string, ReactNode> = {
    // ---------- Atoms ----------
    Button: (
        <div className="flex flex-wrap gap-2 justify-center">
            <Btn>Primary</Btn>
            <Btn variant="button--secondary">Secondary</Btn>
            <Btn variant="button--ghost">Ghost</Btn>
        </div>
    ),
    Tag: (
        <div className="flex flex-wrap gap-2 justify-center">
            <Tagish bg="#e1fcfd" color="#008385">Wellbeing</Tagish>
            <Tagish bg="#f0f9ff" color="#0079c8">Nutrition</Tagish>
            <Tagish bg="#f8f7f4" color="#942151">Community</Tagish>
        </div>
    ),
    Section: (
        <div className="w-full max-w-[260px] rounded-lg bg-cool-paper-100 p-3 space-y-2">
            <Bar w="w-1/3" tone="bg-cyan/50" />
            <div className="grid grid-cols-2 gap-2">
                <div className="h-8 rounded bg-white border border-cool-paper-200" />
                <div className="h-8 rounded bg-white border border-cool-paper-200" />
            </div>
        </div>
    ),
    ResponsiveImage: <Frame className="w-40 h-24" />,
    RichTextContent: (
        <div className="w-full max-w-[240px] space-y-2">
            <Heading className="text-heading-s">Rich text</Heading>
            <Lines rows={3} />
        </div>
    ),
    FormSelector: (
        <div className="w-full max-w-[220px] space-y-2">
            <Field placeholder="Your name" />
            <Btn>Submit</Btn>
        </div>
    ),
    SmallSearchInput: (
        <div className="w-full max-w-[220px]">
            <Field placeholder="Search…" icon={<SearchIcon className="w-4 h-4 fill-grey" />} />
        </div>
    ),
    ShowMoreButton: (
        <Btn variant="button--ghost">
            <span>Show more</span>
            <ChevronDownIcon className="fill-current" />
        </Btn>
    ),
    BackToTop: (
        <span className="rounded-full bg-cyan p-3 inline-flex shadow">
            <ArrowUp className="fill-white w-5 h-5" />
        </span>
    ),
    FullScreenModal: (
        <div className="relative w-44 h-24 rounded-lg bg-navy/70 flex items-center justify-center">
            <div className="w-28 h-16 rounded-md bg-white shadow flex items-center justify-center">
                <Lines rows={2} className="px-3" />
            </div>
        </div>
    ),
    ErrorMessageWrapper: (
        <div className="w-full max-w-[220px] space-y-1.5">
            <div className="h-8 rounded-md bg-white border-2 border-error-red" />
            <span className="text-caption text-error-red">Please enter a valid value</span>
        </div>
    ),
    BelowHeader: (
        <div className="w-full max-w-[240px]">
            <div className="h-6 rounded-t-md bg-navy" />
            <div className="h-4" />
            <div className="rounded-md bg-cool-paper-100 p-2">
                <Lines rows={2} />
            </div>
        </div>
    ),
    HeaderStyle: (
        <div className="space-y-1.5 text-center">
            <span className="block text-heading-m font-bold text-navy">Aa</span>
            <span className="block text-heading-s font-semibold text-navy">Aa</span>
            <span className="block text-body font-medium text-navy">Aa</span>
        </div>
    ),

    // ---------- Molecules ----------
    HeroBanner: (
        <div className="w-full max-w-[260px] grid grid-cols-2 rounded-lg overflow-hidden bg-cyan">
            <div className="p-3 space-y-2">
                <span className="block text-body-small font-bold text-white">Feels like home</span>
                <Btn variant="button--inverse">Find a home</Btn>
            </div>
            <div className="bg-cyan-400 flex items-center justify-center">
                <ImagePlaceholderIcon className="w-8 h-8 fill-white/70" />
            </div>
        </div>
    ),
    AlgoliaSearch: (
        <div className="w-full max-w-[230px] space-y-2">
            <Field placeholder="Find a care home" icon={<SearchIcon className="w-4 h-4 fill-grey" />} />
            <div className="rounded-md bg-white border border-cool-paper-200 divide-y divide-cool-paper-200">
                <div className="p-2"><Bar w="w-3/4" /></div>
                <div className="p-2"><Bar w="w-1/2" /></div>
            </div>
        </div>
    ),
    Autocomplete: (
        <div className="w-full max-w-[220px] space-y-1">
            <Field placeholder="Sun…" icon={<SearchIcon className="w-4 h-4 fill-grey" />} />
            <div className="rounded-md bg-white border border-cool-paper-200 shadow p-2 space-y-1.5">
                <Bar w="w-full" /><Bar w="w-5/6" /><Bar w="w-2/3" />
            </div>
        </div>
    ),
    YouTubeVideo: (
        <div className="relative w-44 h-24 rounded-lg overflow-hidden bg-charcoal flex items-center justify-center">
            <span className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                <PlayArrow className="w-5 h-5 fill-navy" />
            </span>
        </div>
    ),
    CmsElement: (
        <div className="flex items-center gap-2 text-cyan">
            <span className="px-2 py-1 rounded bg-cool-paper-100 border border-cool-paper-200 font-mono text-caption text-grey">__typename</span>
            <ChevronRightIcon className="w-4 h-4 fill-cyan" />
            <span className="w-10 h-8 rounded bg-cyan-50 border border-cyan/40" />
        </div>
    ),
    AlertBlock: (
        <div className="w-full max-w-[260px] rounded-md bg-alert text-white text-caption font-semibold p-2 flex items-center justify-between">
            <span>Contact hours have changed</span>
            <span className="ml-2">✕</span>
        </div>
    ),
    CtaBlock: (
        <Btn size="">
            <span>Find a care home</span>
            <ChevronRightIcon />
        </Btn>
    ),
    AccordionBlock: (
        <div className="w-full max-w-[240px] rounded-md bg-white border border-cool-paper-200 divide-y divide-cool-paper-200">
            {['What is residential care?', 'How much does it cost?'].map((q, i) => (
                <div key={q} className="flex items-center justify-between p-2.5 text-body-small text-navy font-medium">
                    <span>{q}</span>
                    <span className={cx('accordion-state-icon', i === 0 && 'accordion-state-icon--open')} />
                </div>
            ))}
        </div>
    ),
    CardBlock: (
        <div className="w-full max-w-[220px] rounded-lg bg-white border border-cool-paper-200 p-3 space-y-2">
            <Heading className="text-heading-s">Card heading</Heading>
            <Lines rows={2} />
        </div>
    ),
    ColouredCardBlock: (
        <div className="w-full max-w-[220px] rounded-lg bg-cyan text-white p-3 space-y-2">
            <span className="block font-semibold">Support at home</span>
            <Bar w="w-full" tone="bg-white/40" />
            <Btn variant="button--secondary button--inverse">Learn more</Btn>
        </div>
    ),
    ContactCardBlock: (
        <div className="w-full max-w-[210px] rounded-lg bg-white shadow-depth-hover p-3 space-y-2">
            <span className="flex items-center gap-2 text-navy font-semibold text-body-small">
                <CallNowIcon className="w-4 h-4 fill-cyan" /> 1800 030 130
            </span>
            <Btn>Book a tour</Btn>
        </div>
    ),
    ImageCardBlock: (
        <div className="w-full max-w-[200px] rounded-lg bg-white shadow-depth-default overflow-hidden">
            <Frame className="h-16 rounded-none" />
            <div className="p-2.5 space-y-1.5">
                <Heading className="text-body-small">Respite care</Heading>
                <Bar w="w-2/3" />
            </div>
        </div>
    ),
    PromotionCardBlock: (
        <div className="w-full max-w-[240px] rounded-lg bg-cyan-50 border border-cyan p-3 flex gap-3 items-center text-navy">
            <CallBackIcon className="w-8 h-8 fill-cyan shrink-0" />
            <div className="space-y-1.5">
                <span className="block font-medium text-body-small">Not sure where to start?</span>
                <Bar w="w-3/4" />
            </div>
        </div>
    ),
    TestimonialCardBlock: (
        <div className="w-full max-w-[230px] rounded-lg bg-white border border-cool-paper-200 p-3 space-y-3">
            <p className="text-body-small text-grey">“The team made Mum feel at home from day one.”</p>
            <div>
                <span className="block font-semibold text-body-small">Sarah J.</span>
                <span className="block text-caption text-grey">Daughter of resident</span>
            </div>
        </div>
    ),
    VideoCardBlock: (
        <div className="relative w-44 h-24 rounded-lg overflow-hidden bg-charcoal flex items-center justify-center">
            <span className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                <PlayArrow className="w-5 h-5 fill-navy" />
            </span>
        </div>
    ),
    NearbyCardBlock: (
        <div className="w-full max-w-[210px] rounded-lg bg-white border border-cool-paper-200 p-3 flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center">
                <HomeIcon className="w-5 h-5 fill-cyan" />
            </span>
            <div className="space-y-1.5 flex-1">
                <Bar w="w-3/4" />
                <span className="block text-caption text-cyan font-semibold">2.3 km away</span>
            </div>
        </div>
    ),
    HeadingBlock: <span className="text-heading-l font-bold text-navy">Aged care</span>,
    ImageBlock: <Frame className="w-44 h-24" />,
    ImageGallery: (
        <div className="grid grid-cols-3 gap-1.5">
            {Array.from({ length: 6 }).map((_, i) => (
                <Frame key={i} className="w-12 h-12 rounded-md" />
            ))}
        </div>
    ),
    CarouselBlock: (
        <div className="w-full max-w-[230px] space-y-2">
            <Frame className="h-20" />
            <div className="flex justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan" />
                <span className="w-2 h-2 rounded-full bg-cool-paper-200" />
                <span className="w-2 h-2 rounded-full bg-cool-paper-200" />
            </div>
        </div>
    ),
    MarkdownBlock: (
        <div className="w-full max-w-[240px] space-y-2">
            <Heading className="text-heading-s">Markdown</Heading>
            <Lines rows={2} />
            <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cool-paper-200" /><Bar w="w-2/3" /></div>
        </div>
    ),
    RichTextBlock: (
        <div className="w-full max-w-[240px] space-y-2">
            <Heading className="text-heading-s">Rich text</Heading>
            <Lines rows={3} />
        </div>
    ),
    BreadCrumbsBlock: (
        <div className="flex items-center gap-2 text-caption text-navy flex-wrap justify-center">
            <span className="underline">Home</span>
            <ChevronRightIcon className="w-3 h-3 fill-navy" />
            <span className="underline">Victoria</span>
            <ChevronRightIcon className="w-3 h-3 fill-navy" />
            <span className="font-semibold">Sunshine</span>
        </div>
    ),
    TagsBlock: (
        <div className="flex flex-wrap gap-2 justify-center max-w-[240px]">
            <Tagish bg="#e1fcfd" color="#008385">Respite</Tagish>
            <Tagish bg="#f0f9ff" color="#0079c8">Dementia</Tagish>
            <Tagish bg="#f8f7f4" color="#942151">Allied health</Tagish>
            <Tagish bg="#f2f5f7" color="#00335b">Social</Tagish>
        </div>
    ),
    StickyBar: (
        <div className="w-44 h-24 rounded-lg bg-cool-paper-100 relative overflow-hidden">
            <div className="absolute bottom-0 inset-x-0 h-7 bg-navy flex items-center px-2 gap-2">
                <Bar w="w-1/2" tone="bg-white/40" />
                <span className="ml-auto"><Btn size="">Call</Btn></span>
            </div>
        </div>
    ),
    BlogBlock: (
        <div className="grid grid-cols-2 gap-2 max-w-[240px]">
            {[0, 1].map(i => (
                <div key={i} className="rounded-lg bg-white border border-cool-paper-200 overflow-hidden">
                    <Frame className="h-12 rounded-none" />
                    <div className="p-2"><Bar w="w-3/4" /></div>
                </div>
            ))}
        </div>
    ),
    PricingBlock: (
        <div className="w-full max-w-[220px] rounded-lg bg-white border border-cool-paper-200 p-3 space-y-2">
            {['Daily fee', 'Means-tested', 'Accommodation'].map(label => (
                <div key={label} className="flex justify-between text-caption">
                    <span className="text-grey">{label}</span>
                    <span className="font-semibold text-navy">$—</span>
                </div>
            ))}
        </div>
    ),
    PricingCalculatorBlock: (
        <div className="w-full max-w-[220px] space-y-2">
            <Field placeholder="$ Assets" />
            <div className="rounded-md bg-cyan-50 border border-cyan/40 p-2 text-center">
                <span className="text-caption text-grey">Estimated cost</span>
                <span className="block font-bold text-navy">$1,234 / wk</span>
            </div>
        </div>
    ),
    CalendlyBlock: (
        <div className="w-40 rounded-lg bg-white border border-cool-paper-200 p-2">
            <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 21 }).map((_, i) => (
                    <span key={i} className={cx('h-3.5 rounded-sm', i === 9 ? 'bg-cyan' : 'bg-cool-paper-100')} />
                ))}
            </div>
        </div>
    ),
    FormBlock: (
        <div className="w-full max-w-[220px] space-y-2">
            <Field placeholder="Name" />
            <Field placeholder="Email" />
            <Btn>Send enquiry</Btn>
        </div>
    ),
    AgedCareHomeMapBlock: (
        <div className="w-44 h-24 rounded-lg bg-cyan-50 border border-cool-paper-200 relative overflow-hidden">
            <span className="absolute left-6 top-6 w-3 h-3 rounded-full bg-cyan ring-2 ring-white" />
            <span className="absolute left-24 top-12 w-3 h-3 rounded-full bg-cyan ring-2 ring-white" />
            <span className="absolute left-16 top-4 w-3 h-3 rounded-full bg-fuchsia ring-2 ring-white" />
        </div>
    ),
    AgedCareNavigator: (
        <div className="w-full max-w-[230px] space-y-2">
            <div className="flex items-center gap-1.5">
                {[1, 2, 3].map(n => (
                    <span key={n} className={cx('flex-1 h-1.5 rounded-full', n === 1 ? 'bg-cyan' : 'bg-cool-paper-200')} />
                ))}
            </div>
            <div className="rounded-md bg-white border border-cool-paper-200 p-2 space-y-1.5">
                <Bar w="w-2/3" />
                <div className="flex gap-2"><Btn variant="button--secondary">Yes</Btn><Btn variant="button--secondary">No</Btn></div>
            </div>
        </div>
    ),
    SearchPageBlock: (
        <div className="w-full max-w-[230px] space-y-2">
            <Field placeholder="Search results" icon={<SearchIcon className="w-4 h-4 fill-grey" />} />
            <div className="space-y-1.5">
                <div className="rounded-md bg-white border border-cool-paper-200 p-2"><Bar w="w-3/4" /></div>
                <div className="rounded-md bg-white border border-cool-paper-200 p-2"><Bar w="w-1/2" /></div>
            </div>
        </div>
    ),

    // ---------- Sections ----------
    BasicHeroSection: (
        <div className="w-full max-w-[260px] rounded-lg bg-cyan text-white p-4 space-y-2">
            <span className="block font-bold">Aged care that feels like home</span>
            <Btn variant="button--inverse">Find a home</Btn>
        </div>
    ),
    ContactHeroSection: (
        <div className="w-full max-w-[260px] rounded-lg bg-cyan text-white p-4 space-y-2">
            <span className="block font-bold">Talk to our team</span>
            <div className="flex gap-2"><Btn variant="button--inverse">Call now</Btn><Btn variant="button--secondary button--inverse">Enquire</Btn></div>
        </div>
    ),
    SearchHomeHeroSection: (
        <div className="w-full max-w-[260px] rounded-lg bg-cyan p-4 space-y-2">
            <span className="block font-bold text-white">Find a care home</span>
            <Field placeholder="Suburb or postcode" icon={<SearchIcon className="w-4 h-4 fill-grey" />} />
        </div>
    ),
    ThreeColumnSearchHeroSection: (
        <div className="w-full max-w-[260px] rounded-lg bg-cyan p-3 space-y-2">
            <Field placeholder="Search" icon={<SearchIcon className="w-4 h-4 fill-grey" />} />
            <div className="grid grid-cols-3 gap-2">
                {[0, 1, 2].map(i => <div key={i} className="h-7 rounded bg-white/30" />)}
            </div>
        </div>
    ),
    BannerSection: (
        <div className="w-full max-w-[260px] rounded-lg bg-cyan-50 border border-cyan/40 p-3 flex items-center justify-between">
            <Bar w="w-1/2" tone="bg-cyan/40" />
            <Btn>Act now</Btn>
        </div>
    ),
    OneColumnSection: <Grid12 splits={[12]} />,
    TwoColumnSection: <Grid12 splits={[6, 6]} />,
    Section12: <Grid12 splits={[12]} />,
    Section6x6: <Grid12 splits={[6, 6]} />,
    Section4x8: <Grid12 splits={[4, 8]} />,
    Section4x4x4: <Grid12 splits={[4, 4, 4]} />,
    Section3x3x3x3: <Grid12 splits={[3, 3, 3, 3]} />,
    RegionListDetailSection: (
        <div className="w-full max-w-[240px] grid grid-cols-[1fr_1.4fr] gap-2">
            <div className="rounded-md bg-white border border-cool-paper-200 p-2 space-y-1.5">
                <Bar w="w-full" /><Bar w="w-3/4" /><Bar w="w-full" />
            </div>
            <Frame className="rounded-md" />
        </div>
    ),
    NavigationBar: (
        <div className="flex gap-1.5 rounded-md bg-cool-paper-100 p-1">
            <span className="px-2 py-1 rounded bg-white text-caption font-semibold text-cyan shadow-sm">Overview</span>
            <span className="px-2 py-1 rounded text-caption text-grey">Rooms</span>
            <span className="px-2 py-1 rounded text-caption text-grey">Fees</span>
        </div>
    ),

    // ---------- Organisms ----------
    Header: (
        <div className="w-full max-w-[260px] rounded-lg bg-white border border-cool-paper-200 flex items-center gap-2 px-3 h-11">
            <PulseLogo className="h-6 w-auto rounded" />
            <div className="hidden sm:flex gap-2 flex-1 text-caption text-navy font-medium">
                <span>Home</span><span>Care</span><span>About</span>
            </div>
            <span className="ml-auto"><Btn>Call</Btn></span>
        </div>
    ),
    Footer: (
        <div className="w-full max-w-[260px] rounded-lg bg-navy text-white p-3 space-y-2">
            <div className="grid grid-cols-3 gap-2">
                {[0, 1, 2].map(i => (
                    <div key={i} className="space-y-1">
                        <Bar w="w-2/3" tone="bg-white/50" />
                        <Bar w="w-full" tone="bg-white/20" />
                        <Bar w="w-3/4" tone="bg-white/20" />
                    </div>
                ))}
            </div>
            <div className="flex gap-2 pt-1 border-t border-white/30">
                <FacebookIcon className="w-4 h-4 fill-white" />
                <InstagramIcon className="w-4 h-4 fill-white" />
                <LinkedInIcon className="w-4 h-4 fill-white" />
                <YouTubeIcon className="w-4 h-4 fill-white" />
            </div>
        </div>
    ),
    PreviewEnabledNotification: (
        <div className="w-full max-w-[240px] rounded-md bg-warning-yellow/30 border border-warning-yellow text-grey text-caption font-semibold p-2 text-center">
            Preview mode is on
        </div>
    ),
    LinkHandler: (
        <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-cool-paper-100 flex items-center justify-center text-cyan font-mono text-caption">{'</>'}</span>
            <ChevronRightIcon className="w-4 h-4 fill-cyan" />
            <span className="w-8 h-8 rounded-full bg-cyan-50 flex items-center justify-center"><PersonIcon className="w-4 h-4 fill-cyan" /></span>
        </div>
    ),

    // ---------- Templates ----------
    PrimaryPageTemplate: (
        <div className="w-40 rounded-lg bg-white border border-cool-paper-200 overflow-hidden">
            <div className="h-4 bg-navy" />
            <div className="p-2 space-y-1.5">
                <div className="h-8 rounded bg-cyan-50" />
                <div className="grid grid-cols-2 gap-1.5">
                    <div className="h-6 rounded bg-cool-paper-100" />
                    <div className="h-6 rounded bg-cool-paper-100" />
                </div>
            </div>
            <div className="h-4 bg-navy" />
        </div>
    ),
    BlankLayout: (
        <div className="w-40 h-24 rounded-lg bg-white border-2 border-dashed border-cool-paper-200 flex items-center justify-center">
            <span className="text-caption text-disabled-text">Blank</span>
        </div>
    ),
}

/** Fallback when a component has no bespoke preview. */
export const GenericPreview = ({ name }: { name: string }) => (
    <span className="w-12 h-12 rounded-xl bg-cool-paper-200 flex items-center justify-center text-heading-m font-bold text-silver">
        {name.charAt(0)}
    </span>
)

/** The thumbnail canvas shown at the top of each overview card. */
export const ComponentThumbnail = ({ name }: { name: string }) => (
    <div className="h-36 overflow-hidden flex items-center justify-center px-5 bg-gradient-to-br from-cool-paper-50 to-cool-paper-100 border-b border-cool-paper-200 dark:border-charcoal pointer-events-none select-none">
        <div className="flex items-center justify-center scale-95">
            {componentPreviews[name] ?? <GenericPreview name={name} />}
        </div>
    </div>
)

/**
 * A larger framed version of a component's preview, shown as the hero visual at
 * the top of its dedicated documentation page (mirrors the overview thumbnail).
 */
export const ComponentHero = ({ name }: { name: string }) => (
    <div className="mt-6 rounded-xl border border-cool-paper-200 dark:border-charcoal overflow-hidden">
        <div className="min-h-[200px] flex items-center justify-center p-10 bg-gradient-to-br from-cool-paper-50 to-cool-paper-100 pointer-events-none select-none">
            <div className="scale-110">
                {componentPreviews[name] ?? <GenericPreview name={name} />}
            </div>
        </div>
    </div>
)
