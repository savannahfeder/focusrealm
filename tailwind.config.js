module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Abhaya Libre"', 'serif'],
      },
      colors: {
        'off-white-color': '#FFEFDB',
      },
      fontSize: {
        '1.5sm': '1.2rem', // 15px
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
