/** @type {import('tailwindcss').Config} */
import containerQueries from '@tailwindcss/container-queries';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: {} },
  plugins: [containerQueries],
};
