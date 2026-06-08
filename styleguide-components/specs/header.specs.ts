import { SpecGroup } from '../primitives/Specifications'

export const headerDefaultSpecs: SpecGroup[] = [
    {
        title: 'Header Container',
        dimensions: [
            { label: 'Padding (V)', token: 'py-4', value: '16px', direction: 'top', type: 'padding' },
            { label: 'Padding (H)', token: 'px-6', value: '24px', direction: 'left', type: 'padding' },
            { label: 'Background', token: 'bg-white', value: '#ffffff', type: 'color' },
            { label: 'Border Bottom', token: 'border-b', value: '1px solid #e0e0e0', type: 'color' },
            { label: 'Position', token: 'sticky', value: 'top-0', type: 'padding' },
            { label: 'Z-Index', token: 'z-header', value: '100', type: 'width' },
        ],
    },
    {
        title: 'Logo',
        dimensions: [
            { label: 'Height', token: 'h-8', value: '32px', type: 'height' },
        ],
    },
    {
        title: 'Navigation Link',
        dimensions: [
            { label: 'Padding', token: 'px-4 py-2', value: '8px vertical', type: 'padding' },
            { label: 'Font Size', token: 'text-body-small', value: '14px', type: 'font-size' },
            { label: 'Text Color', token: 'text-navy', value: '#001f3f', type: 'color' },
        ],
    },
]
