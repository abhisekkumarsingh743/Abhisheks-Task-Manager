/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // This enables toggling via a 'dark' class on <html>
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#0f172a',
        darkCard: '#1e293b',
      }
    },
  },
  plugins: [],
}