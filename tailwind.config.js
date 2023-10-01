/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "var(--main_color)",
        "primary-contrary": "var(--contrary_main_color)",
        "primary-opacity": "var(--opacity_main_color)",
        "primary-scroll": "var(--scroll)",
        "scroll-hover": "var(--scroll_hover)"
      }
    },
  },
  plugins: [],
}