import { SpecGroup } from '../primitives/Specifications'

export const footerDefaultSpecs: SpecGroup[] = [
    {
        title: 'Footer Container',
        dimensions: [
            { label: 'Padding (V)', token: 'py-8', value: '32px', direction: 'top', type: 'padding' },
            { label: 'Padding (H)', token: 'px-6', value: '24px', direction: 'left', type: 'padding' },
            { label: 'Background', token: 'bg-navy', value: '#001f3f', type: 'color' },
            { label: 'Text Color', token: 'text-white', value: '#ffffff', type: 'color' },
        ],
    },
    {
        title: 'Section',
        dimensions: [
            { label: 'Gap (items)', token: 'gap-4', value: '16px', direction: 'all', type: 'gap' },
        ],
    },
    {
        title: 'Link',
        dimensions: [
            { label: 'Font Size', token: 'text-body-small', value: '14px', type: 'font-size' },
            { label: 'Hover Color', token: 'text-cyan', value: '#0079c8', type: 'color' },
        ],
    },
]
