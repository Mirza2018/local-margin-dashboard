/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#F9FAFB",
        "secondary-color": "#F2C470",
        "base-color": "#0C0C0C",
        "highlight-color": "#FDFDFD",
        "input-color": "#0C0C0C",
      },
      fontFamily: {
        // For the static Sora files:
        sora: ["Sora", "sans-serif"],
        // For the variable font version:
        soraVariable: ["Sora Variable", "sans-serif"],
      },
    },
  },
  plugins: [],
};
