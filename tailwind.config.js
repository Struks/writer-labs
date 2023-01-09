/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'cover': '#51463C',
      'page': '#E3D1BF',
      'page-special': '#D7C6B5',
      'default': '#2D2D2D',
    },
    extend: {
      transformOrigin: {
        'left-center' : 'left center'
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
    }
  ],
}
