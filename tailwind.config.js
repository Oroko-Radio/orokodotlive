module.exports = {
  mode: 'jit',
  purge: ['components/**/*.tsx', 'pages/**/*.tsx', 'views/**/*.tsx'],
  darkMode: false,
  theme: {
    fontFamily: {
      sans: [
        'Public-Sans',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji',
      ],
      serif: [
        'Dozza-Regalic',
        'Georgia',
        'Cambria',
        'Times New Roman',
        'Times',
        'serif',
      ],
      heading: ['Digitalt'],
    },
    extend: {
      height: {
        hero: '50vh',
      },
      zIndex: {
        '-10': -10,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
