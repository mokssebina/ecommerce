module.exports = {
  mode: "jit",
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        amazon_blue: {
          light: "#232F3E",
          DEFAULT: "#131921",
        },
        nude: {
          lightbrown: "rgba(209, 194, 184, 0.4)"
        }
      },
      backgroundImage: {
        'backdrop-image': "url('https://raw.githubusercontent.com/mokssebina/MMNT/master/vecteezy_geometric-oriental-tribal-ethnic-pattern-traditional_8570419.jpg')",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
