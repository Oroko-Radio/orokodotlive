module.exports = {
  mode: "jit",
  content: [
    "components/**/*.tsx",
    "pages/**/*.tsx",
    "views/**/*.tsx",
    "app/**/*.tsx",
  ],
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
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1600px",
      "3xl": "2000px",
    },
    extend: {
      height: {
        18: "4.5rem",
        hero: "70vh",
        half: "50vh",
        forty: "40vh",
      },
      zIndex: {
        "-10": -10,
      },
      spacing: {
        18: "4.5rem",
        "-18": "-4.5rem",
        22: "5.2rem",
      },
      boxShadow: {
        "3xl": "0 20px 30px 0px rgba(0, 0, 0, 0.3)",
      },
      colors: {
        offBlack: "#2F2726",
        orokoYellow: "#FFC928",
        orokoRed: "#FF4948",
        orokoGray: "#F0F0F0",
        orokoOrange: "#FF6A37",
        orokoBlue: "#27ABFE",
        orokoGreen: "#339D43",
        orokoTransparentBlack: "rgba(0, 0, 0, 0.3)",
        orokoLightOrange: "#FFB53E",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
