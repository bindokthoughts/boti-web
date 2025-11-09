import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['SharpSansDisplayNo1', ...defaultTheme.fontFamily.sans],
        serif: ['SharpSansDisplayNo1', ...defaultTheme.fontFamily.serif],
        mono: ['SharpSansDisplayNo1', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
}

export default config