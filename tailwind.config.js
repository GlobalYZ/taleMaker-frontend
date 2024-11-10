/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#ffdc00",
        secondary: "#ffffff",
        accent: "#2c2c2c",
        "bg-primary": "#302e2e",
        "nav-primary": "#4b4b4b",
        "bg-secondary": "#d9d9d9",
        "text-primary-strong": "#000000",
        "text-primary-normal": "#1e1e1e",
        "text-primary-light": "#4a4a4a",
        "text-secondary": "#757575",
      },
    },
  },
  plugins: [],
};
