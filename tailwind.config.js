/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        //sans: ["Josefin Sans", "sans-serif"],
        //alata: ["Alata"],
        marck: ['Marck Script'],
      },
      listStyleType: {
        none: 'none',
        disc: 'disc',
        decimal: 'decimal',
        square: 'square',
        roman: 'upper-roman',
      },
      colors: {
        soilprimeGreen: '#2ea864',
        soilprimeLight: '#6eb58e',
      },
    },
  },
  plugins: [],
};
