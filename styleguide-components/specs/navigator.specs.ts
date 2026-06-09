import { SpecGroup } from '../primitives/Specifications'

export const navigatorOptionButtonDefaultSpecs: SpecGroup[] = [
    {
        title: 'Default State (Vertical)',
        dimensions: [
            { label: 'Padding', token: 'p-[26px]', value: '26px', type: 'padding' },
            { label: 'Border', token: 'border-2 border-lighter-grey', value: '2px solid #d1d5dc', type: 'color' },
            { label: 'Background', token: 'bg-white', value: '#ffffff', type: 'color' },
            { label: 'Border Radius', token: 'rounded', value: '4px', type: 'border-radius' },
            { label: 'Icon Size', token: 'h-[57px] w-[57px]', value: '57×57px', type: 'font-size' },
            { label: 'Gap (icon→text)', token: 'gap-4', value: '16px', type: 'padding' },
        ],
    },
    {
        title: 'Selected State (Vertical)',
        dimensions: [
            { label: 'Border', token: 'border-2 border-cyan', value: '2px solid #0079c8', type: 'color' },
            { label: 'Background', token: 'bg-cyan-50', value: '#F0F9FF', type: 'color' },
            { label: 'Checkbox Size', token: 'h-4 w-4', value: '16×16px', type: 'font-size' },
            { label: 'Checkbox Color', token: 'bg-cyan', value: '#0079c8', type: 'color' },
        ],
    },
    {
        title: 'Typography',
        dimensions: [
            { label: 'Heading Weight', token: 'font-bold', value: '700', type: 'font-size' },
            { label: 'Heading Size', token: 'text-body', value: '16px', type: 'font-size' },
            { label: 'Heading Color', token: 'text-grey', value: '#333333', type: 'color' },
            { label: 'Description Size', token: 'text-body-small', value: '14px', type: 'font-size' },
            { label: 'Description Color', token: 'text-navy', value: '#00335B', type: 'color' },
        ],
    },
]

export const navigatorProgressSpecs: SpecGroup[] = [
    {
        title: 'Progress Bar',
        dimensions: [
            { label: 'Track Height', token: 'h-3', value: '12px', type: 'font-size' },
            { label: 'Track Color', token: 'bg-white/30', value: 'rgba(255,255,255,0.30)', type: 'color' },
            { label: 'Fill Color', token: 'bg-white', value: '#ffffff', type: 'color' },
            { label: 'Border Radius', token: 'rounded-full', value: '9999px', type: 'border-radius' },
            { label: 'Width', token: 'w-36', value: '144px', type: 'padding' },
        ],
    },
    {
        title: 'Label',
        dimensions: [
            { label: 'Font Size', token: 'text-sm', value: '14px', type: 'font-size' },
            { label: 'Color', token: 'text-white/80', value: 'rgba(255,255,255,0.80)', type: 'color' },
            { label: 'Letter Spacing', token: 'tracking-wider', value: '1px', type: 'padding' },
        ],
    },
]

export const navigatorResultCardSpecs: SpecGroup[] = [
    {
        title: 'Card',
        dimensions: [
            { label: 'Background', token: 'bg-warm-paper-100', value: '#f8f7f4', type: 'color' },
            { label: 'Border', token: 'border border-light-grey', value: '1px solid #BFCCD6', type: 'color' },
            { label: 'Border Radius', token: 'rounded-lg', value: '8px', type: 'border-radius' },
            { label: 'Padding', token: 'p-6', value: '24px', type: 'padding' },
        ],
    },
]

export const navigatorInformationPanelSpecs: SpecGroup[] = [
    {
        title: 'Panel',
        dimensions: [
            { label: 'Background', token: 'bg-cool-paper-50', value: '#f3faff', type: 'color' },
            { label: 'Border', token: 'border border-cyan', value: '1px solid #0079c8', type: 'color' },
            { label: 'Border Radius', token: 'rounded-lg', value: '8px', type: 'border-radius' },
            { label: 'Padding (desktop)', token: 'p-6', value: '24px', type: 'padding' },
            { label: 'Padding (mobile)', token: 'p-4', value: '16px', type: 'padding' },
        ],
    },
]
