/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{mjs,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Noto Sans', 'sans serif'],
      default: ['Noto Sans', 'sans serif']
    },
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1600px'
    },
    extend: {
      fontFamily: {
        display: 'Josefin Sans'
      }
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}
