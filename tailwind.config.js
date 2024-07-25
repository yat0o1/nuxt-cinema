/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
      './components/**/*.{vue,js,ts}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './plugins/**/*.{js,ts}',
      './nuxt.config.{js,ts}',
      './src/**/*.css'
    ],
    theme: {
      extend: {
        colors: {
          lightBlue: '#4169E1',
          darkBlue: '#03455C',
        },
        fontFamily: {
          'rubik': ['Rubik', 'sans-serif']
        },
      },
    },
  }