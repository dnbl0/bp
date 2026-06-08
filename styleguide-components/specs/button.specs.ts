import { SpecGroup } from '../primitives/Specifications'

/**
 * Visual design specifications for the Button component.
 * Covers standard (default), giant, and small sizes for the primary variant.
 */

export const buttonPrimaryStandardSpecs: SpecGroup[] = [
    {
        title: 'Default State',
        dimensions: [
            { label: 'Padding (V)', token: 'py-3', value: '12px', direction: 'top', type: 'padding' },
            { label: 'Padding (H)', token: 'px-6', value: '24px', direction: 'left', type: 'padding' },
            { label: 'Border Radius', token: 'rounded', value: '4px', type: 'border-radius' },
            { label: 'Font Size', token: 'text-base', value: '16px', type: 'font-size' },
            { label: 'Font Weight', token: 'font-semibold', value: '600', type: 'font-size' },
            { label: 'Line Height', token: 'leading-6', value: '24px', type: 'line-height' },
            { label: 'Background', token: 'bg-cyan', value: '#0079c8', type: 'color' },
            { label: 'Text Color', token: 'text-white', value: '#ffffff', type: 'color' },
            { label: 'Border', token: 'border-2', value: '2px transparent', type: 'padding' },
        ],
    },
    {
        title: 'Hover State',
        dimensions: [
            { label: 'Background', token: 'bg-cyan-hover', value: '#005497', type: 'color' },
        ],
    },
    {
        title: 'Active State',
        dimensions: [
            { label: 'Background', token: 'bg-cyan-active', value: '#00254f', type: 'color' },
        ],
    },
    {
        title: 'Disabled State',
        dimensions: [
            { label: 'Background', token: 'bg-disabled', value: '#e8e8e8', type: 'color' },
            { label: 'Text Color', token: 'text-disabled', value: '#999999', type: 'color' },
        ],
    },
]

export const buttonPrimaryGiantSpecs: SpecGroup[] = [
    {
        title: 'Default State',
        dimensions: [
            { label: 'Padding (V)', token: 'py-5', value: '20px', direction: 'top', type: 'padding' },
            { label: 'Padding (H)', token: 'px-10', value: '40px', direction: 'left', type: 'padding' },
            { label: 'Border Radius', token: 'rounded-lg', value: '8px', type: 'border-radius' },
            { label: 'Font Size', token: 'text-base', value: '16px', type: 'font-size' },
            { label: 'Background', token: 'bg-cyan', value: '#0079c8', type: 'color' },
        ],
    },
]

export const buttonPrimarySmallSpecs: SpecGroup[] = [
    {
        title: 'Default State',
        dimensions: [
            { label: 'Padding (V)', token: 'py-px', value: '3px', direction: 'top', type: 'padding' },
            { label: 'Padding (H)', token: 'px-3', value: '12px', direction: 'left', type: 'padding' },
            { label: 'Border Radius', token: 'rounded-sm', value: '2px', type: 'border-radius' },
            { label: 'Font Size', token: 'text-sm', value: '14px', type: 'font-size' },
            { label: 'Background', token: 'bg-cyan', value: '#0079c8', type: 'color' },
        ],
    },
]

export const buttonSecondaryStandardSpecs: SpecGroup[] = [
    {
        title: 'Default State',
        dimensions: [
            { label: 'Padding (V)', token: 'py-3', value: '12px', direction: 'top', type: 'padding' },
            { label: 'Padding (H)', token: 'px-6', value: '24px', direction: 'left', type: 'padding' },
            { label: 'Border Radius', token: 'rounded', value: '4px', type: 'border-radius' },
            { label: 'Font Size', token: 'text-base', value: '16px', type: 'font-size' },
            { label: 'Background', token: 'bg-white', value: '#ffffff', type: 'color' },
            { label: 'Text Color', token: 'text-navy', value: '#001f3f', type: 'color' },
            { label: 'Border', token: 'border-navy', value: '2px solid #001f3f', type: 'color' },
        ],
    },
]

export const buttonGhostStandardSpecs: SpecGroup[] = [
    {
        title: 'Default State',
        dimensions: [
            { label: 'Padding (V)', token: 'py-3', value: '12px', direction: 'top', type: 'padding' },
            { label: 'Padding (H)', token: 'px-6', value: '24px', direction: 'left', type: 'padding' },
            { label: 'Border Radius', token: 'rounded', value: '4px', type: 'border-radius' },
            { label: 'Font Size', token: 'text-base', value: '16px', type: 'font-size' },
            { label: 'Background', token: 'bg-transparent', value: 'transparent', type: 'color' },
            { label: 'Text Color', token: 'text-navy', value: '#001f3f', type: 'color' },
            { label: 'Border', token: 'border-none', value: 'none', type: 'color' },
        ],
    },
]
