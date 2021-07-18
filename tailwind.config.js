module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        "header": "#131921",
        "icon" : "#cd9042",
        "product_btn" : "#f0c14b",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
