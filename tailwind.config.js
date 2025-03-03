/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors : {
        'success-bg-green' : 'var(--success-bg-green)'
      }
    },
  },
  plugins: [],
}

