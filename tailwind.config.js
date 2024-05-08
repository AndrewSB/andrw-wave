/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        msBold: ["MSBee-Bold", ...defaultTheme.fontFamily.sans],
        msRegular: ["MSBee-Regular", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
