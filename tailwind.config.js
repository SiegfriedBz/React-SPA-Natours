/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#43a263',
          DEFAULT: '#55c57a',
          light: '#7ad197'
        },
        warning: {
          DEFAULT: '#ff7730'
        }
      }
    }
  },

  plugins: []
}
