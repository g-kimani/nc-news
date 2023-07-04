/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "yellow-theme": "#FEE715",
        charcoal: "#060918",
      },
    },
  },
  plugins: [],
  important: true,
};
