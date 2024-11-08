import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        trands: {
          positive: '#96E6A1',
          negative: '#FF9494',
        },
        customGray: '#A6A6A6',
        customBlack: '#0D0D0D',
        customDarkerGray: '#1B1B1B',
        customDarkGray: '#161616',
        customBlue: '#436FE4',
      },
      fontSize: {
        xs: '8px',
        sm: '10px',
        md: '13px',
        xl: '21px',
        '4xl': '34px',
      },
      spacing: {
        8.5: '2.125rem', // 34px
      },
    },
  },
  plugins: [],
};
export default config;
