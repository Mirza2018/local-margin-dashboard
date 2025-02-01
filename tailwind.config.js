/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#F3F3F3",
        "secondary-color": "#F2C470",
        "base-color": "#0C0C0C",
        "highlight-color": "#FDFDFD",
        "input-color": "#0C0C0C",
      },
    },
  },
  plugins: [],
};
