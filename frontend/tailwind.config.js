/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ 
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ["Cambria", "serif"],
      },
      colors: {
        primary: "#4046ed",
        primary_light: "#7795f8",
      },
    },
  },
  plugins: [],
}

