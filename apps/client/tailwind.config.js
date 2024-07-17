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
            DEFAULT: '#D70127'
          },
          blue: {
            DEFAULT: '#6558f5'
          },
          gray: {
            300: '#D9D9D9'
          }
        },
        borderRadius: {
          'xl': '14px',
          '3xl': '27.5px'
        }
      },
    },
    plugins: [],
  }
  