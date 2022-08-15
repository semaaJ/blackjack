/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      width: {
        "gb": "1000px",
      },
      height: {
        "btn": "45px",
      },
      fontFamily: {
        roboto: ["Roboto"]
      }
    },
  },
  plugins: [],
}