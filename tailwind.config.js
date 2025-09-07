/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: "#F5D38E",
          gold2: "#C08C3A",
          gold3: "#9C6A21",
          dark: "#0F1115",
          dark2: "#12161C",
          dark3: "#1B2028",
        }
      },
      fontFamily: {
        display: ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}