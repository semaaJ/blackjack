/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      width: {
        "btn": "150px"
      },
      height: {
        "btn": "45px"
      }
    },
  },
  plugins: [],
}