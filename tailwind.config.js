/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Rubik: ["Rubik", "sans"],
        Roboto: ["Roboto", "sans"],
      },
      spacing: {
        100: "600px",
        "9xl": "128rem",
      },
    },
  },
  plugins: [
    // ...
    require("tailwind-scrollbar"),
  ],
  variants: {
    width: ["responsive", "hover", "focus"],
  },
};
