/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,ejs}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f4f4",
          100: "#dfe8e8",
          200: "#c3d2d3",
          300: "#9ab5b7",
          400: "#66898d",
          500: "#273F42",
          600: "#203639",
          700: "#1b2c2f",
          800: "#152326",
          900: "#101a1c",
        },
      },
    },
  },
  plugins: [],
}
