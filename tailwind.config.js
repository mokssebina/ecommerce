/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amazon_blue: {
          light: "#232F3E",
          DEFAULT: "#131921",
        },
        nude: {
          lightbrown: "rgba(209, 194, 184, 0.4)"
        },
        dark: {
          disabled: "rgba(0, 0, 0, 0.85)"
        }
      },
      backgroundImage: {
        'backdrop-image': "url('https://raw.githubusercontent.com/mokssebina/MMNT/master/vecteezy_geometric-oriental-tribal-ethnic-pattern-traditional_8570419.jpg')",
      },
      aspectRatio: {
        '3/4': '4 / 5',
        'banner': '16 / 5'
      },
      height: {
        custom: {
          height_banner: "34rem"
        },
      }
    },
  },
  plugins: [],
}

