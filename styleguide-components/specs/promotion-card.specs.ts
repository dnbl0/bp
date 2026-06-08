import { SpecGroup } from '../primitives/Specifications'

export const promotionCardDefaultSpecs: SpecGroup[] = [
    {
        title: 'Card Container',
        dimensions: [
            { label: 'Padding', token: 'p-6', value: '24px', direction: 'all', type: 'padding' },
            { label: 'Border Radius', token: 'rounded-lg', value: '8px', type: 'border-radius' },
            { label: 'Background', token: 'bg-cool-paper-100', value: '#f9f9f9', type: 'color' },
            { label: 'Border', token: 'border', value: '1px solid #e0e0e0', type: 'color' },
        ],
    },
    {
        title: 'Heading',
        dimensions: [
            { label: 'Font Size', token: 'text-heading-sm', value: '20px', type: 'font-size' },
            { label: 'Font Weight', token: 'font-semibold', value: '600', type: 'font-size' },
            { label: 'Margin Bottom', token: 'mb-3', value: '12px', direction: 'bottom', type: 'margin' },
        ],
    },
]
