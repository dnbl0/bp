import { SpecGroup } from '../primitives/Specifications'

export const stepperDefaultSpecs: SpecGroup[] = [
    {
        title: 'Step Number (Inactive)',
        dimensions: [
            { label: 'Width', token: 'w-8', value: '32px', type: 'width' },
            { label: 'Height', token: 'h-8', value: '32px', type: 'height' },
            { label: 'Border Radius', token: 'rounded-full', value: '999px', type: 'border-radius' },
            { label: 'Font Size', token: 'text-body-small', value: '14px', type: 'font-size' },
            { label: 'Background', token: 'bg-cool-paper', value: '#f5f5f5', type: 'color' },
            { label: 'Text Color', token: 'text-grey', value: '#999999', type: 'color' },
            { label: 'Border', token: 'border-2', value: '2px solid #e0e0e0', type: 'color' },
        ],
    },
    {
        title: 'Step Number (Active)',
        dimensions: [
            { label: 'Background', token: 'bg-cyan', value: '#0079c8', type: 'color' },
            { label: 'Text Color', token: 'text-white', value: '#ffffff', type: 'color' },
            { label: 'Border', token: 'border-cyan', value: '2px solid #0079c8', type: 'color' },
        ],
    },
    {
        title: 'Connector Line',
        dimensions: [
            { label: 'Height', token: 'h-1', value: '2px', type: 'height' },
            { label: 'Background', token: 'bg-cool-paper', value: '#e0e0e0', type: 'color' },
        ],
    },
]
