import { SpecGroup } from '../primitives/Specifications'

export const backToTopDefaultSpecs: SpecGroup[] = [
    {
        title: 'Default State',
        dimensions: [
            { label: 'Width', token: 'w-12', value: '48px', type: 'width' },
            { label: 'Height', token: 'h-12', value: '48px', type: 'height' },
            { label: 'Border Radius', token: 'rounded-full', value: '999px', type: 'border-radius' },
            { label: 'Background', token: 'bg-cyan', value: '#0079c8', type: 'color' },
            { label: 'Icon Color', token: 'text-white', value: '#ffffff', type: 'color' },
            { label: 'Icon Size', token: 'w-6 h-6', value: '24px', type: 'width' },
            { label: 'Shadow', token: 'shadow-lg', value: '0 10px 15px -3px rgba(0,0,0,0.1)', type: 'shadow' },
        ],
    },
    {
        title: 'Hover State',
        dimensions: [
            { label: 'Background', token: 'bg-cyan-hover', value: '#005497', type: 'color' },
        ],
    },
]
