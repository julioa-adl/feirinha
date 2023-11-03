/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'market': "url('./src/assets/bg-market.png')",
        'market-75': "url('./src/assets/bg-market-75.png')",
      },
    },
  },
  plugins: [],
}

