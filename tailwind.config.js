/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#446DE3",
        primaryDark: "#3A62E1",
        secondary: "#A0D7AB",
        secondaryDark: "#5E9942",
      },
    },
    fontFamily: {
      azeret: ["Azeret Mono", "sans-serif"],
      azo: ["azosansBold", "sans-serif"],
    },
    // screens: {
    //   sm: "500px",
    // },
  },
  plugins: [],
};
