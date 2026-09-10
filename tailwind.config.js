/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0F2A4A",
        blue: "#1D5FCC",
        blueDeep: "#134594",
        teal: "#2BB8C4",
        tealDeep: "#1E8E97",
        sky: "#EAF1FC",
        paper: "#FAFBFD",
        ink: "#16233A",
        slate: "#5B6B84",
        line: "#DCE4F0",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
