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
          'afc-primary': '#D50A0A',
          'afc-secondary': '#FFFFFF',
          'nfc-primary': '#013369',
          'nfc-secondary': '#FFFFFF'
        }
      }
    },
    plugins: [],
  };