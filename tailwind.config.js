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
    }
  },
  plugins: [],
}
