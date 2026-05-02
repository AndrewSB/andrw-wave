/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        msBold: ["var(--font-msbee-bold)", ...defaultTheme.fontFamily.sans],
        msRegular: [
          "var(--font-msbee-regular)",
          ...defaultTheme.fontFamily.sans,
        ],
        pressStart: [
          "var(--font-press-start-2p)",
          ...defaultTheme.fontFamily.sans,
        ],
      },
    },
  },
  plugins: [],
};
