import { SpecGroup } from '../primitives/Specifications'

export const testimonialDefaultSpecs: SpecGroup[] = [
    {
        title: 'Card Container',
        dimensions: [
            { label: 'Padding', token: 'p-6', value: '24px', direction: 'all', type: 'padding' },
            { label: 'Border Radius', token: 'rounded-lg', value: '8px', type: 'border-radius' },
            { label: 'Background', token: 'bg-white', value: '#ffffff', type: 'color' },
            { label: 'Border', token: 'border', value: '1px solid #e0e0e0', type: 'color' },
            { label: 'Shadow', token: 'shadow-sm', value: '0 1px 3px rgba(0,0,0,0.1)', type: 'shadow' },
        ],
    },
    {
        title: 'Quote Text',
        dimensions: [
            { label: 'Font Size', token: 'text-body', value: '16px', type: 'font-size' },
            { label: 'Line Height', token: 'leading-7', value: '28px', type: 'line-height' },
            { label: 'Color', token: 'text-grey', value: '#666666', type: 'color' },
            { label: 'Margin Bottom', token: 'mb-4', value: '16px', direction: 'bottom', type: 'margin' },
        ],
    },
]
