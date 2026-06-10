const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
    // Dark mode is scoped to the design system documentation (which toggles a
    // `dark` class on its own root). The marketing site never sets this class,
    // so enabling it here has no effect on production pages.
    darkMode: 'class',
    content: [
        './page/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './styleguide-components/**/*.{js,ts,jsx,tsx}',
    ],
    safelist: [
        'bg-cool-paper-100',
        'bg-warm-paper-100',
        'bg-cyan',
        'bg-cyan-400',
        'bg-cyan-50',
        'bg-teal',
        'list-disc',
        'whitespace-pre-line',
        'my-2.5',
        'my-5',
        'py-5',
        'py-8',
        'py-12',
        'bg-fuchsia',
        'bg-orange',
        'bg-green',
        'bg-purple',
    ],
    theme: {
        animationDelay: {
            0: '0ms',
            100: '100ms',
            200: '200ms',
            300: '300ms',
            400: '400ms',
            500: '500ms',
            1000: '1000ms',
            2000: '2000ms',
            3000: '3000ms',
            4000: '4000ms',
            5000: '5000ms',
        },
        fontFamily: {
            sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
        },
        fontSize: {
            // Names match design typography scale.
            'heading-xl': [
                'var(--font-size-4xl)',
                { lineHeight: 'var(--line-height-4xl)' },
            ],
            'heading-l': [
                'var(--font-size-3xl)',
                { lineHeight: 'var(--line-height-3xl)' },
            ],
            'heading-m': [
                'var(--font-size-2xl)',
                { lineHeight: 'var(--line-height-2xl)' },
            ],
            'heading-s': [
                'var(--font-size-xl)',
                { lineHeight: 'var(--line-height-xl)' },
            ],
            'heading': [
                'var(--font-size-lg)',
                { lineHeight: 'var(--line-height-lg)' },
            ],
            'body': [
                'var(--font-size-base)',
                { lineHeight: 'var(--line-height-base)' },
            ],
            'body-small': [
                'var(--font-size-sm)',
                { lineHeight: 'var(--line-height-sm)' },
            ],
            'caption': [
                'var(--font-size-xs)',
                { lineHeight: 'var(--line-height-xs)' },
            ],
            // Legacy names to for backwards compatability.
            '5xl': [
                'var(--font-size-5xl)',
                { lineHeight: 'var(--line-height-5xl)' },
            ],
            '4xl': [
                'var(--font-size-4xl)',
                { lineHeight: 'var(--line-height-4xl)' },
            ],
            '3xl': [
                'var(--font-size-3xl)',
                { lineHeight: 'var(--line-height-3xl)' },
            ],
            '2xl': [
                'var(--font-size-2xl)',
                { lineHeight: 'var(--line-height-2xl)' },
            ],
            'xl': [
                'var(--font-size-xl)',
                { lineHeight: 'var(--line-height-xl)' },
            ],
            'lg': [
                'var(--font-size-lg)',
                { lineHeight: 'var(--line-height-lg)' },
            ],
            'base': [
                'var(--font-size-base)',
                { lineHeight: 'var(--line-height-base)' },
            ],
            'sm': [
                'var(--font-size-sm)',
                { lineHeight: 'var(--line-height-sm)' },
            ],
            'xs': [
                'var(--font-size-xs)',
                { lineHeight: 'var(--line-height-xs)' },
            ],
        },
        colors: {
            'transparent': 'transparent',
            'current': 'currentColor',
            // ==== Primary Palette ====
            'cyan': {
                DEFAULT: '#0079c8',
                400: '#2595DC',
                50: '#F0F9FF',
            },
            // Updated to match the published brand-guidelines PDF (Bupa 2023 v1)
            'navy': '#0d1846',
            'warm-grey': '#f1efeb',
            'white': '#ffffff',
            'grey': '#333333',
            'cool-grey': '#24292E',
            'light-grey': '#BFCCD6',
            'lighter-grey': '#d1d5dc',
            'black': '#000000',
            // ==== Secondary Palette ====
            'purple': '#8a3ff5',
            'violet': '#a4219b',
            'fuchsia': '#d02670',
            'burgandy': '#942151',
            'orange': '#db3907',
            'teal': {
                // PDF lists Bupa Teal as #007d79; keep the 50 tint consistent.
                DEFAULT: '#007d79',
                50: '#e1fcfd',
            },
            'dark-green': '#18542c',
            'green': '#1b883c',
            'lime': '#678004',
            // ==== UI Palette ====
            'error-red': '#d90014',
            'warning-yellow': '#fdd835',
            'success-green': '#008a00',
            'focus-blue': '#a3dafd',
            'disabled': '#dadbdb',
            'disabled-text': '#757575',
            'alert': '#3552b5',
            'charcoal': '#292E39',
            'silver': '#607285',
            // ==== Background Palette ====
            'cool-paper-50': '#f3faff', 
            'cool-paper-100': '#f2f5f7',
            'cool-paper-200': '#bfccd6',
            'warm-paper-100': '#f8f7f4',
            'warm-paper-200': '#dddad2',
            // ==== BDS Palette ====
            'bds-padding': '#02fbce',
            'bds-margin': '#f3fe34',
        },
        boxShadow: {
            // Requested here -> https://iegroup.atlassian.net/browse/BVAC-18
            'DEFAULT': '0 2px 2px 0 rgba(191, 204, 214, 0.5)',
            // depth-default defined here: https://www.figma.com/file/iYWhlWxkIXlSYfdZUm8Zra/BVAC-UI-Kit?node-id=717%3A16599&t=dzvya7lnjV7DviyC-0
            'depth-default':
                '0px 0px 0px rgba(118, 114, 108, 0.25), 0px 0px 1px #76726C;',
            // depth-hover defined here: https://www.figma.com/file/iYWhlWxkIXlSYfdZUm8Zra/BVAC-UI-Kit?node-id=717%3A16599&t=dzvya7lnjV7DviyC-0
            'depth-hover':
                '0px 8px 8px rgba(118, 114, 108, 0.25), 0px 0px 1px rgba(118, 114, 108, 0.6)',
        },
        zIndex: {
            'ground': '0',
            'header': '100',
            'dropdown': '200',
            'sticky': '50',
            'fixed': '400',
            'modal-backdrop': '500',
            'modal': '600',
            'popover': '700',
            'tooltip': '800',
        },
        extend: {
            animation: {
                'spin-reverse': 'spin-reverse 3s linear infinite',
                'slide-in': 'slide-in 0.6s ease-out',
                'slide-out': 'slide-out 0.6s ease-out',
                'fade-in': 'fade-in 0.6s linear',
                'fade-in-fast': 'fade-in 0.2s linear',
                'fade-out': 'fade-out 0.6s linear',
                'fade-out-fast': 'fade-out 0.2s linear',
                'grow-down': 'grow-down 3s linear ease-in-out forwards',
                'shrink-up': 'shrink-up 0.3s linear ease-in-out forwards',
            },
            transitionProperty: {
                height: 'height',
            },
            dropShadow: {
                DEFAULT:
                    '0px 8px 8px rgba(118, 114, 108, 0.25), 0px 0px 1px rgba(118, 114, 108, 0.6)', // Used for BVAC-45
            },
            keyframes: {
                'slide-in': {
                    '0%': { transform: 'translateX(100%)' },
                    '80%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(0)' },
                },
                'slide-out': {
                    '0%': { transform: 'translateX(0)' },
                    '50%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(100%)' },
                },
                'grow-down': {
                    '0%': { maxHeight: '0' },
                    '100%': { maxHeight: '500px' },
                },
                'shrink-up': {
                    '0%': { maxHeight: '500px' },
                    '100%': { maxHeight: '0' },
                },
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'fade-out': {
                    '0%': { opacity: '1' },
                    '100%': { opacity: '0' },
                },
            },
            typography: {
                DEFAULT: {
                    css: {
                        li: {
                            p: {
                                margin: 0,
                            },
                        },
                    },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/container-queries'),
        plugin(function ({ addUtilities }) {
            addUtilities({
                '.animation-fill-none': {
                    animationFillMode: 'none',
                },
                '.animation-fill-forwards': {
                    animationFillMode: 'forwards',
                },
                '.animation-fill-backwards': {
                    animationFillMode: 'backwards',
                },
                '.animation-fill-both': {
                    animationFillMode: 'both',
                },
            })
        }),
        plugin(function ({ matchUtilities, theme }) {
            matchUtilities(
                {
                    'animation-delay': value => ({
                        animationDelay: value,
                    }),
                },
                { values: theme('animationDelay') }
            )
        }),
    ],
}
