module.exports = {
  purge: ['./dist/**/*.html', './*.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('tailwindcss-debug-screens')],
};
