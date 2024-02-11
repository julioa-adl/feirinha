/** @type {import('tailwindcss').Config} */
import formsPlugin from '@tailwindcss/forms';
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'market': "url('/src/assets/bg-market.svg')",
        'market-75': "url('/src/assets/bg-market-75.svg')",
      },
      keyframes: {
        shimmer: {
          '100%' : {transform: 'translateX(100%)'},
        },
        fadeIn: {
          '0%' : {opacity: '0'},
          '100%' : {opacity: '1'},
        },
      },
    },
  },
  plugins: [formsPlugin],
}

