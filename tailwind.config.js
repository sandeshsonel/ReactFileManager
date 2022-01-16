module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#003300",
        secondary: "#406640",
      },
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      darkGreen: "#003300",
      lighGreen: "#406640",
      grey: "#C3C3C3",
    }),
    fontFamily: {
      inter: ["Inter", "sans-serif"],
    },
    fontWeight: {
      light: 300,
      reguler: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
      black: 800,
    },
    fontSize: {
      xs: ".75rem",
      sm: ".875rem",
      tiny: ".930rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
    },
    textColor: (theme) => ({
      ...theme("colors"),
      "dark-green": "#134213",
      "light-green": "#57EB57",
    }),
  },
  plugins: [],
};
