/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      width: {
        "btn": "150px",
        "btn-small": "75px"
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