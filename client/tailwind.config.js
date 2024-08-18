/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyan: '#0ff0fc',
        gray: '#444444',
      },
    },
  },
  plugins: [],
}