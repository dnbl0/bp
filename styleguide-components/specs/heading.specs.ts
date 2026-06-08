import { SpecGroup } from '../primitives/Specifications'

export const headingH1Specs: SpecGroup[] = [
    {
        title: 'Default State',
        dimensions: [
            { label: 'Font Size', token: 'text-heading-xl', value: '40px', type: 'font-size' },
            { label: 'Font Weight', token: 'font-bold', value: '700', type: 'font-size' },
            { label: 'Line Height', token: 'leading-10', value: '40px', type: 'line-height' },
            { label: 'Text Color', token: 'text-navy', value: '#001f3f', type: 'color' },
            { label: 'Margin Bottom', token: 'mb-4', value: '16px', direction: 'bottom', type: 'margin' },
        ],
    },
]

export const headingH2Specs: SpecGroup[] = [
    {
        title: 'Default State',
        dimensions: [
            { label: 'Font Size', token: 'text-heading-lg', value: '32px', type: 'font-size' },
            { label: 'Font Weight', token: 'font-bold', value: '700', type: 'font-size' },
            { label: 'Line Height', token: 'leading-9', value: '36px', type: 'line-height' },
            { label: 'Text Color', token: 'text-navy', value: '#001f3f', type: 'color' },
            { label: 'Margin Bottom', token: 'mb-3', value: '12px', direction: 'bottom', type: 'margin' },
        ],
    },
]

export const headingH3Specs: SpecGroup[] = [
    {
        title: 'Default State',
        dimensions: [
            { label: 'Font Size', token: 'text-heading-md', value: '24px', type: 'font-size' },
            { label: 'Font Weight', token: 'font-semibold', value: '600', type: 'font-size' },
            { label: 'Line Height', token: 'leading-8', value: '32px', type: 'line-height' },
            { label: 'Text Color', token: 'text-navy', value: '#001f3f', type: 'color' },
            { label: 'Margin Bottom', token: 'mb-2', value: '8px', direction: 'bottom', type: 'margin' },
        ],
    },
]
