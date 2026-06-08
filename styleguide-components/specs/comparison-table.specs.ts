import { SpecGroup } from '../primitives/Specifications'

export const comparisonTableDefaultSpecs: SpecGroup[] = [
    {
        title: 'Table Container',
        dimensions: [
            { label: 'Overflow', token: 'overflow-x-auto', value: 'auto', type: 'padding' },
            { label: 'Border', token: 'border', value: '1px solid #e0e0e0', type: 'color' },
            { label: 'Border Radius', token: 'rounded-lg', value: '8px', type: 'border-radius' },
        ],
    },
    {
        title: 'Header Cell',
        dimensions: [
            { label: 'Padding', token: 'p-4', value: '16px', direction: 'all', type: 'padding' },
            { label: 'Background', token: 'bg-cool-paper', value: '#f5f5f5', type: 'color' },
            { label: 'Font Weight', token: 'font-semibold', value: '600', type: 'font-size' },
            { label: 'Border Bottom', token: 'border-b', value: '1px solid #e0e0e0', type: 'color' },
        ],
    },
    {
        title: 'Body Cell',
        dimensions: [
            { label: 'Padding', token: 'p-4', value: '16px', direction: 'all', type: 'padding' },
            { label: 'Border Bottom', token: 'border-b', value: '1px solid #e0e0e0', type: 'color' },
        ],
    },
]
