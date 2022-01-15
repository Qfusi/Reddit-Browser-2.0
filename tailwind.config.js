/* eslint-disable no-undef */
module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            screens: {
                '2lg': '1150px'
            },
            gridTemplateColumns: {
                18: 'repeat(18, minmax(0, 1fr))',
                20: 'repeat(20, minmax(0, 1fr))',
                24: 'repeat(24, minmax(0, 1fr))'
            },
            gridColumn: {
                'span-17': 'span 17 / span 17',
                'span-19': 'span 19 / span 19',
                'span-23': 'span 23 / span 23'
            },
            animation: {
                pulse: 'pulse 200ms ease-in-out',
                'fade-in-right': 'fadeIn 0.2s ease-out',
                'fade-out-left': 'fadeOut 0.2s ease-out'
            },
            keyframes: {
                pulse: {
                    '0%, 100%': { transform: 'scale(1, 1)' },
                    '50%': { transform: 'scale(1.1, 1.1)' }
                },
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateX(-10px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' }
                },
                fadeOut: {
                    '0%': { opacity: '1', transform: 'translateX(0)' },
                    '100%': { opacity: '0', transform: 'translateX(-10px)' }
                }
            }
        }
    },
    plugins: [require('tailwind-scrollbar-hide')]
};
