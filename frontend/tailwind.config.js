module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', 
    './public/index.html'
  ],
  darkMode: "class",
  theme: {
      extend: {
        height: {
          '50': '12.5rem',
          '120': '30rem'
        },
        width: {
          '50': '12.5rem',
          '120': '30rem'
        },
        fontFamily: {
          montserrat: ['Montserrat', 'sans-serif'],
        },
        spacing: {
          '5': '1.25rem'
        }
      }
  },
  plugins: [],
};
