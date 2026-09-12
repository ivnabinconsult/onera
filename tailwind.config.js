/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0F172A",
        blue: "#2563EB",
        blueDeep: "#60A5FA",
        accent: "#60A5FA",
        dark: "#09090B",
        teal: "#60A5FA",
        tealDeep: "#3B82F6",
        sky: "#F1F5F9",
        paper: "#FFFFFF",
        ink: "#111827",
        slate: "#64748B",
        line: "#E2E8F0",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
