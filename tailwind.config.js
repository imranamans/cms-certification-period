module.exports = {
  purge: {
    enabled: false,
    content: ['./index.html', './main.js', './src/**/*.{vue,js,ts,jsx,tsx}', './index.css']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
