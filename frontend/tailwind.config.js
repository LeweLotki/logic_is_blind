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
        },
        width: {
          '50': '12.5rem',
        }
      }
  },
  plugins: [],
};
