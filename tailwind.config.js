module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        accent1: '#073763'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
