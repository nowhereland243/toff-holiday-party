/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rhodium: {
          orange: '#FF6B35',
          'orange-light': '#FF8C61',
          'orange-dark': '#E55A2B',
          dark: '#0A0A0A',
          'dark-secondary': '#1A1A1A',
          light: '#F5F5F5',
        },
      },
      fontFamily: {
        sans: ['Roboto', 'Inter', 'system-ui', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
