import { SpecGroup } from '../primitives/Specifications'

export const ctaDefaultSpecs: SpecGroup[] = [
    {
        title: 'Default State',
        dimensions: [
            { label: 'Padding', token: 'p-6', value: '24px', direction: 'all', type: 'padding' },
            { label: 'Border Radius', token: 'rounded-lg', value: '8px', type: 'border-radius' },
            { label: 'Background', token: 'bg-cool-paper', value: '#f5f5f5', type: 'color' },
            { label: 'Border', token: 'border', value: '1px solid #e0e0e0', type: 'color' },
            { label: 'Gap (items)', token: 'gap-4', value: '16px', direction: 'all', type: 'gap' },
        ],
    },
    {
        title: 'Heading',
        dimensions: [
            { label: 'Font Size', token: 'text-heading-sm', value: '20px', type: 'font-size' },
            { label: 'Font Weight', token: 'font-semibold', value: '600', type: 'font-size' },
            { label: 'Color', token: 'text-navy', value: '#001f3f', type: 'color' },
        ],
    },
]
