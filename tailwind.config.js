/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: { RobotoCondensed: 'Roboto Condensed' },
    },
    colors: {
      gray: { 100: "#818181", 200: "#333", 300: "#222" },
      white: "#fff",
      dirty_white: { 100: "#faf7f7", 200: "#d6d6d6" },
      cyan: "#14ffec",
      red: "#d4426c",
      green: "#25d971",
    },
    fontSize: {
      sm: "14px",
      md: "18px",
      lg: "24px",
      xl: "32px",
      base: "16px",
    },
    screens: {
      '2xl': { 'max': '1535px' },
      // => @media (max-width: 1535px) { ... }

      'xl': { 'max': '1279px' },
      // => @media (max-width: 1279px) { ... }

      'lg': { 'max': '1023px' },
      // => @media (max-width: 1023px) { ... }

      'md': { 'max': '767px' },
      // => @media (max-width: 767px) { ... }

      'sm': { 'max': '639px' },
      // => @media (max-width: 639px) { ... }

      'ssm': { 'max': '500px' },
      // => @media (max-width: 500px) { ... }
    }
  },

  plugins: [require('tailwind-scrollbar')],
}
