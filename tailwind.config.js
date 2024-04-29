
module.exports = {
  content: ["./views/*.{ejs,html}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ]
};
