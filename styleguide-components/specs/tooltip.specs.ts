import { SpecGroup } from '../primitives/Specifications'

/**
 * Visual design specifications for the Tooltip component.
 */

export const tooltipDefaultSpecs: SpecGroup[] = [
    {
        title: 'Default State',
        dimensions: [
            { label: 'Padding (V)', token: 'py-2', value: '8px', direction: 'top', type: 'padding' },
            { label: 'Padding (H)', token: 'px-3', value: '12px', direction: 'left', type: 'padding' },
            { label: 'Border Radius', token: 'rounded-md', value: '6px', type: 'border-radius' },
            { label: 'Font Size', token: 'text-caption', value: '12px', type: 'font-size' },
            { label: 'Line Height', token: 'leading-4', value: '16px', type: 'line-height' },
            { label: 'Max Width', token: 'w-48', value: '192px', type: 'width' },
            { label: 'Background', token: 'bg-navy', value: '#001f3f', type: 'color' },
            { label: 'Text Color', token: 'text-white', value: '#ffffff', type: 'color' },
            { label: 'Arrow Size', token: 'arrow-size', value: '6px', type: 'width' },
            { label: 'Shadow', token: 'shadow-lg', value: '0 10px 15px -3px rgba(0,0,0,0.1)', type: 'shadow' },
        ],
    },
]
