/*
    Verbatim brand copy, transcribed from the Bupa Brand Guidelines 2023 (v1).

    This is the single source of truth for the narrative brand pages (strategy,
    design principles, tone of voice). Keeping the copy here — rather than inline
    per page — means it can be audited against the PDF in one place and reused by
    the editorial primitives. Page numbers in comments reference the brand book.
*/
import { Principle } from '../primitives/BrandEditorial'

/* ---- Strategy (p.3) ----------------------------------------------------- */

/** Our purpose — the reason we exist. */
export const purpose =
    'Helping people live longer, healthier, happier lives, and making a better world.'

/** Our ambition — what we want to be. */
export const ambition =
    'To be the world’s most customer-centric healthcare company.'

/** Our values — how we think and act. */
export const values: { title: string; tagline: string; body: string }[] = [
    {
        title: 'Caring',
        tagline: 'Act with empathy and respect',
        body: 'We act with empathy and respect for our customers, our communities and each other.',
    },
    {
        title: 'Brave',
        tagline: 'Make new possibilities happen',
        body: 'We make new possibilities happen, taking on the challenges that make a real difference to health.',
    },
    {
        title: 'Responsible',
        tagline: 'Own your decisions and actions',
        body: 'We own our decisions and actions, and do what is right for the long term.',
    },
]

/* ---- Design principles (p.5) -------------------------------------------- */

export const designPrinciples: Principle[] = [
    {
        title: 'Start with a square',
        lead: 'The square makes us distinct. We use it with confidence in everything we do.',
        points: [
            'Message boxes are square',
            'Squares frame our images, can form part of our illustrations and help in templates and layouts',
        ],
    },
    {
        title: 'Blue is the glue',
        lead: 'We use blue consistently. It’s a simple way to visually connect our communications.',
        points: [
            'Message boxes are blue; we use touches of blue in our imagery',
            'We use blue in our type, illustrations and backgrounds',
            'Other colours should never overpower our blue',
        ],
    },
    {
        title: 'Less is more',
        lead: 'We make things easy for our audiences. Our communications should be single-minded and use as few words and graphic elements as possible.',
        points: [
            'Fewer, bigger, better',
            'Provide only the most useful, helpful information',
            'A clear message linked to one core visual, short headlines, no unnecessary copy or design elements',
            'Streamlining functionality simplifies navigation and helps user experience',
            'Air to breathe is critical',
        ],
    },
    {
        title: 'Keep it real',
        lead: 'We show we care by being authentic, warm, engaging and relatable. We invite people into our communications — we’re not cold or overly clinical.',
        points: [
            'We use an unscripted and unstaged style of imagery and relatable illustration topics',
            'We can be light-hearted when the time is right',
            'Photography is our first choice over illustration',
            'Images are cropped tightly to be personal and intimate',
        ],
    },
]

/** How the principles combine across real layouts (p.5–8). */
export const designInAction: string[] = [
    'Primary colours make relevant information easier to find — familiarity appeals to users.',
    'The blue square is incorporated into message boxes and illustrations.',
    'Illustration uses the primary palette supported by secondary colours.',
    'The secondary palette creates content hierarchy; Bupa Warm Grey is used as a background.',
    'Photography is authentic and tightly cropped, always with a touch of blue.',
    'Secondary colours highlight calls to action and create standout.',
]

/* ---- Tone of voice (p.62) ----------------------------------------------- */

/** The promise that frames the tone-of-voice principles. */
export const toneIntro =
    'We want all our communications to be helpful, straightforward, friendly and inviting. It helps us better connect with our audiences.'

export const tonePrinciples: Principle[] = [
    {
        title: 'Know our stuff',
        lead: 'Showing we know what we’re talking about helps people trust we’re experienced in providing the best services and quality of care.',
        points: [
            'Show that we’ve done our homework and understand our customer and their needs',
            'If you’re writing something persuasive, show what makes us good rather than just saying we’re good',
        ],
    },
    {
        title: 'Make things easy',
        lead: 'Healthcare can be complicated, confusing and difficult. So our language needs to be straightforward, clear and transparent.',
        points: [
            'Keep it short and snappy',
            'Use everyday words, not office-speak or jargon',
            'Swap abstract words for concrete words',
            'Keep each sentence to one thought',
        ],
    },
    {
        title: 'Show we care',
        lead: 'Our health is one of the most important things we have. Which is why our language needs to be warm, empathetic, and show that we care about our customers and employees.',
        points: [
            'Make sure it sounds natural when you read it out loud',
            'Make it human',
            'Contractions are a simple way to add warmth',
        ],
    },
    {
        title: 'Be light-hearted, when it’s right',
        lead: 'We’re credible experts in everything from dementia care to heart disease — so a touch of clever humour every now and then can help people feel more at ease, used carefully.',
        points: [
            'Aim for a wry smile, not a belly laugh',
            'Use clever, witty humour, not slapstick or lazy humour',
            'Don’t make jokes at other people’s expense',
        ],
    },
]

/** Questions to ask before you start writing (p.63). */
export const beforeYouWrite: string[] = [
    'Who are you talking to — are they new to Bupa? Do they understand the world of healthcare?',
    'What are they thinking, and what do they need to know?',
    'What’s the benefit for them, how do you want them to feel, and what do you want them to do?',
]

/** Reminders for while you’re writing (p.63). */
export const whileYouWrite: string[] = [
    'Keep each sentence to one thought; swap abstract words for concrete ones.',
    'Find natural ways to tie your language to health and care, without getting too repetitive.',
    'Use contractions and personal pronouns to add warmth and make it human.',
]

/** Office-speak → everyday word swaps (p.63). */
export const wordSwaps: { before: string; after: string }[] = [
    { before: 'Assist', after: 'Help' },
    { before: 'Ensure', after: 'Make sure' },
    { before: 'Commence', after: 'Start' },
    { before: 'Prior to', after: 'Before' },
    { before: 'PMI', after: 'Health Insurance' },
    { before: 'Self-pay', after: 'Pay as you go' },
    { before: 'It is / We are / There is', after: 'It’s / We’re / There’s' },
    { before: 'Facilitation', after: 'Facilitate' },
    { before: 'Customer engagement initiative', after: 'How we’ll talk and write to customers' },
]

/** Tone-in-action before/after rewrites (p.63–65). */
export const toneRewrites: { label: string; before: string; after: string }[] = [
    {
        label: 'Brochure',
        before: 'Our focus extends to cardiovascular disease management. Bupa health insurance members have access to the COACH Program following hospitalisation for a cardiac or stroke related illness. A qualified dietitian works closely with your doctor to identify steps they can take to reduce the likelihood of future complications…',
        after: 'When you’re recovering from a stroke or a heart attack, it’s natural to worry that it could happen again. If you have health insurance with us, you’ll have access to our COACH program. Our dietitians will work with your doctor to come up with a plan for your recovery. Then they’ll give you support over the phone to help you get better — and stay healthy.',
    },
    {
        label: 'Flyer',
        before: 'Dermatology appointments available. Speak to a receptionist who can assist with your booking.',
        after: 'Show your skin some extra care. Speak to reception about seeing a dermatologist sooner.',
    },
    {
        label: 'Insurance letter',
        before: 'If you are happy to renew, there’s nothing further you need to do because your health plan will renew automatically as per the date shown on your insurance certificate. Please be aware that the renewal terms offered are based on your circumstances as previously advised to us…',
        after: 'If you’re happy to renew your insurance you don’t have to do anything. Your plan will renew automatically on the date on your insurance certificate. We’ve based the terms on what you last told us about your situation. If that’s changed, please let us know straight away — otherwise it could affect your cover.',
    },
]

/** What changed across the rewrites (p.64). */
export const toneRewriteNotes =
    'What changed? We started with gentle observation, used inclusive pronouns and everyday language, kept it positive, and broke long sentences into shorter, more digestible ones.'

/* ---- Design toolkit ----------------------------------------------------- */

/** The accessibility "step system" pairing rules from the Colour section. */
export const colourStepRules: { row: string; pairing: string }[] = [
    { row: 'Row 9 / Bupa Navy', pairing: 'White or colours from row 4 or below' },
    { row: 'Row 8', pairing: 'White or colours from row 3 or below' },
    { row: 'Row 7', pairing: 'White or colours from row 2 or below' },
    { row: 'Row 6', pairing: 'White or colours from row 1' },
    { row: 'Row 5 / Core (e.g. Bupa Blue)', pairing: 'White only' },
    { row: 'Row 4', pairing: 'Black or colours from row 9' },
    { row: 'Row 3', pairing: 'Black or colours from row 8 or above' },
    { row: 'Row 2', pairing: 'Black or colours from row 7 or above' },
    { row: 'Row 1', pairing: 'Black or colours from row 6 or above' },
]

/** The four kinds of illustration. */
export const illustrationTypes: { title: string; body: string }[] = [
    {
        title: 'People',
        body: 'Built from a component library of heads, upper bodies, legs and accessories that can be modified and combined.',
    },
    {
        title: 'Objects',
        body: 'A library of object illustrations, used individually or combined into an object cluster, built from simple geometric shapes.',
    },
    {
        title: 'Scenes',
        body: 'Combine people and objects into a single illustration that tells one story. Keep scenes simple — less is more.',
    },
    {
        title: 'Explanatory',
        body: 'Fact-based, literal illustrations for processes, instructional and technical subjects. As simple and direct as possible.',
    },
]

/** How each palette applies to illustration. */
export const illustrationColourRules: { title: string; body: string }[] = [
    {
        title: 'Primary palette',
        body: 'The most prominent colours — illustrations should always include Bupa Blue.',
    },
    {
        title: 'Secondary palette',
        body: 'Should never overpower the primary palette. Don’t use colours from more than two different families together.',
    },
    {
        title: 'Neutral palette',
        body: 'Neutral colours can be used freely. Use white to lighten and create clear areas within an illustration.',
    },
    {
        title: 'Skin-tone palette',
        body: 'Specially developed to show diversity. Colours can also be used for objects, clothing, and so on.',
    },
]

/** What good photography looks like. */
export const photographyQualities: string[] = [
    'Authentic, natural and unstaged',
    'Observations in the moment',
    'Tighter crops to get closer to people and the moment',
    'Always have a touch of blue',
    'Real people with real expressions, not posed',
    'Highest quality',
]

/** The three header styles. */
export const headerStyles: { name: string; body: string }[] = [
    {
        name: 'Primary header',
        body: 'The standard header for most pages: Bupa logo, page name, search, menu, login and contact. Can carry the square or horizontal logo in the top-left, and may include a business-unit logo.',
    },
    {
        name: 'Secondary header',
        body: 'A lighter header for microsites and landing pages — typically a BU / service-area label and an optional tagline.',
    },
    {
        name: 'Neutral header',
        body: 'An exceptional style for pages that are not Bupa URLs, where we want to be seen as neutral.',
    },
]

/** Footer rules. */
export const footerRules: string[] = [
    'Footers can be Bupa Blue or Bupa Navy.',
    'Footers must contain copyright information, privacy and cookies, accessibility and legal notices.',
    'Links in desktop footers should be arranged in columns; mobile footers use accordions.',
    'Adding the Bupa logo is not mandatory but reinforces the brand — position it top-left for desktop, top-centred for mobile.',
    'If social media logos are used, place them lower-right for desktop; left, right or centred for mobile.',
]
