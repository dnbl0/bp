import { SpecGroup } from '../primitives/Specifications'

export const paginationDefaultSpecs: SpecGroup[] = [
    {
        title: 'Page Button (Inactive)',
        dimensions: [
            { label: 'Min Width', token: 'w-10', value: '40px', type: 'width' },
            { label: 'Height', token: 'h-10', value: '40px', type: 'height' },
            { label: 'Border Radius', token: 'rounded', value: '4px', type: 'border-radius' },
            { label: 'Font Size', token: 'text-body-small', value: '14px', type: 'font-size' },
            { label: 'Text Color', token: 'text-navy', value: '#001f3f', type: 'color' },
            { label: 'Background', token: 'bg-white', value: '#ffffff', type: 'color' },
            { label: 'Border', token: 'border', value: '1px solid #e0e0e0', type: 'color' },
        ],
    },
    {
        title: 'Page Button (Active)',
        dimensions: [
            { label: 'Background', token: 'bg-cyan', value: '#0079c8', type: 'color' },
            { label: 'Text Color', token: 'text-white', value: '#ffffff', type: 'color' },
            { label: 'Border', token: 'border-cyan', value: '1px solid #0079c8', type: 'color' },
        ],
    },
    {
        title: 'Gap Between Items',
        dimensions: [
            { label: 'Gap', token: 'gap-1', value: '4px', direction: 'all', type: 'gap' },
        ],
    },
]
