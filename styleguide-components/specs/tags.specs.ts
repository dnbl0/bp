import { SpecGroup } from '../primitives/Specifications'

export const tagsContainerSpecs: SpecGroup[] = [
    {
        title: 'Tags Container',
        dimensions: [
            { label: 'Gap', token: 'gap-2', value: '8px', direction: 'all', type: 'gap' },
            { label: 'Flex Wrap', token: 'flex-wrap', value: 'wrap', type: 'padding' },
        ],
    },
    {
        title: 'Individual Tag',
        dimensions: [
            { label: 'Padding (V)', token: 'py-1', value: '4px', direction: 'top', type: 'padding' },
            { label: 'Padding (H)', token: 'px-2', value: '8px', direction: 'left', type: 'padding' },
            { label: 'Border Radius', token: 'rounded', value: '4px', type: 'border-radius' },
            { label: 'Font Size', token: 'text-caption', value: '12px', type: 'font-size' },
            { label: 'Background', token: 'bg-cool-paper', value: '#f5f5f5', type: 'color' },
        ],
    },
]
