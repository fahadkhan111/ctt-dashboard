/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        greyLight: '#f1f5f9',
        greyDark: '#e5ebf1',
        white: '#ffffff',
        red: '#fc1e00'
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}