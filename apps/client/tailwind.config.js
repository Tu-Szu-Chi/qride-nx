module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx}',
      './app/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#d3445b'
          },
          blue: {
            DEFAULT: '#6558f5'
          }
        }
      },
    },
    plugins: [],
  }
  