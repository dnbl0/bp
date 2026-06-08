import { SpecGroup } from '../primitives/Specifications'

export const skipLinksDefaultSpecs: SpecGroup[] = [
    {
        title: 'Skip Link (Inactive/Off-screen)',
        dimensions: [
            { label: 'Padding (V)', token: 'py-2', value: '8px', direction: 'top', type: 'padding' },
            { label: 'Padding (H)', token: 'px-4', value: '16px', direction: 'left', type: 'padding' },
            { label: 'Font Size', token: 'text-body-small', value: '14px', type: 'font-size' },
            { label: 'Text Color', token: 'text-white', value: '#ffffff', type: 'color' },
            { label: 'Background', token: 'bg-navy', value: '#001f3f', type: 'color' },
            { label: 'Position', token: 'position-fixed', value: '-top-12', type: 'padding' },
        ],
    },
    {
        title: 'Skip Link (Focused)',
        dimensions: [
            { label: 'Position', token: 'position-fixed', value: 'top-0', type: 'padding' },
            { label: 'Z-Index', token: 'z-50', value: '50', type: 'width' },
            { label: 'Text Decoration', token: 'underline', value: 'underline', type: 'color' },
        ],
    },
]
