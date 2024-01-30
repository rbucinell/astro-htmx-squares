/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
      extend:{
        animation: {
          'spin-slow': 'spin 3s linear infinite',
        },
        colors:{
          'nfl-red': '#D50A0A',
          'nfl-blue': '#013369',
          'nfl-white': '#FFFFFF',
          'afc-primary': '#E31837',
          'afc-secondary': '#FFB81C',
          'nfc-primary': '#B3995D',
          'nfc-secondary': '#AA0000'
        }
      }
    },
    plugins: [],
  };