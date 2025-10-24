import type { Config } from 'tailwindcss';

// We want each package to be responsible for its own content.
/** @type {import('tailwindcss').Config} */
const config: Omit<Config, 'content'> = {
  content: [
    './src/app/**/*.tsx',
    './src/components/**/*.tsx',
    './src/_components/**/*.tsx',
    '../../packages/ui/src/*{.js,.ts,.jsx,.tsx}',
    '../../packages/util/src/*{.js,.ts,.jsx,.tsx}',
    '../../packages/_util/src/*{.js,.ts,.jsx,.tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1677ff',
      },
    },
  },
  plugins: [],
};

export default config;
