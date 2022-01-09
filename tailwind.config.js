/* eslint-disable no-undef */
module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            screens: {
                '2lg': '1150px'
                // => @media (min-width: 1150px) { ... }
            },
            keyframes: {
                pulse: {
                    '0%, 100%': { transform: 'scale(1, 1)' },
                    '50%': { transform: 'scale(1.1, 1.1)' }
                }
            },
            animation: {
                pulse: 'pulse 200ms ease-in-out'
            }
        }
    },
    plugins: [require('tailwind-scrollbar-hide')]
};
