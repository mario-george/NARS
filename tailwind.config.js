/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        monster: ["Montserrat", "sans"],
        Rubik: ["Montserrat", "sans"],
        Roboto: ["Montserrat", "sans"],
      },
      spacing: {
        100: "600px",
        "9xl": "128rem",
      },
    },
    fontSize: {
      xs: "0.5rem",
      sm: "0.625rem",
      base: "0.75rem",
      md: "0.875rem",

      lg: "0.875rem",
      xl: "1rem",
      "2xl": "1.125rem",
      "3xl": "1.25rem",
      "4xl": "1.5rem",
      "5xl": "1.875rem",
      "6xl": "2.25rem",
    },
  },
  plugins: [
    // ...
    require("tailwind-scrollbar"),
  ],
  variants: {
    width: ["responsive", "hover", "focus"],
  },
});
