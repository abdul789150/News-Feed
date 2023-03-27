/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/stories/**/*.{js,ts,jsx,tsx}',
    './src/App.js',
    './src/index.js'
  ],
  theme: {
    screens: {
      xs: '375px',
      sm: '600px',
      md: '900px',
      lg: '1200px',
      xl: '1536px',
    },
    extend: {
      fontFamily: {
        sans: [
          'Open Sans',
          'Helvetica',
          'Montserrat',
          'Roboto',
          'Lato',
          'sans-serif',
        ],
        serif: ['Garamond', 'serif'],
      },
      colors: {
        eucalyptus: '#2DA44E',
        white: '#ffffff',
        'dark-gunmetal': {
          light: '#64666D',
          DEFAULT: '#232631',
          dark: '#171920',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
};
