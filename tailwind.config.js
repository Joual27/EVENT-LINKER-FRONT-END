/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors : {
        'success-bg-green' : 'var(--success-bg-green)',
        'secondary-orange' : 'var(--secondary-orange)',
        'primary-color' : 'var(--primary-color)',
        'secondary-color' : 'var(--secondary-color)'
      }
    },
  },
  plugins: [],
}

