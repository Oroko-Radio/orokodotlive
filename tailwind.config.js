module.exports = {
  mode: "jit",
  purge: ["components/**/*.tsx", "pages/**/*.tsx", "views/**/*.tsx"],
  darkMode: false,
  theme: {
    fontFamily: {
      sans: [
        "Public-Sans",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
      serif: [
        "Dozza-Regalic",
        "Georgia",
        "Cambria",
        "Times New Roman",
        "Times",
        "serif",
      ],
      heading: ["Digitalt"],
    },
    transitionDuration: {
      DEFAULT: "200ms",
    },
    extend: {
      height: {
        18: "4.5rem",
        hero: "70vh",
      },
      zIndex: {
        "-10": -10,
      },
      colors: {
        offBlack: "#2F2726",
        orokoYellow: "#FFC928",
        orokoRed: "#FF4948",
        orokoGray: "#F0F0F0",
        orokoOrange: "#FF6A37",
        orokoBlue: "#27ABFE",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
