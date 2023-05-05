/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      sm: ["14px", "20px"],
      base: ["16px", "24px"],
      lg: ["20px", "28px"],
      xl: ["24px", "32px"],
    },
    extend: {
      colors: {
        primary: {
          100: "#F4F4F4;",
          500: "#16ABF8;",
          black: "#111111;",
          customgray: "#888888;",
          customgray2: "#4A4A4A;",
          customwhite: "#F4F4F4;",
          customorange: "#ED4C5C;",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
