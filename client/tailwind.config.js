/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // COLORS PALETTE
        // Dark Colors
        'most-dark': "#461873",
        'more-dark': '#58148E',
        'dark': '#6910A8',
        // Primary Colors
        'primary': "#7209B7",
        'more-primary': '#9F21E3',
        // Light Colors
        'light': '#B333E9',
        'more-light': '#CB5DF1',
        'most-light': '#DC93F6',
        'vmost-light': '#EABFFA',

        // background color
        'bgColor':'#EEF8FF',
      }
    },
  },
  plugins: [],
}

