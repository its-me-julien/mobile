import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-aeonik-regular)', 'sans-serif'], // Default sans for regular text
        'aeonik-bold': ['var(--font-aeonik-bold)', 'sans-serif'], // Bold weight
        'aeonik-bold-italic': ['var(--font-aeonik-bold-italic)', 'sans-serif'], // Bold italic
        'aeonik-light': ['var(--font-aeonik-light)', 'sans-serif'], // Light weight
        'aeonik-light-italic': ['var(--font-aeonik-light-italic)', 'sans-serif'], // Light italic
        'aeonik-regular': ['var(--font-aeonik-regular)', 'sans-serif'], // Regular weight
        'aeonik-regular-italic': ['var(--font-aeonik-regular-italic)', 'sans-serif'], // Regular italic
      },
    },
  },
  plugins: [require('daisyui')],
};

export default config;
