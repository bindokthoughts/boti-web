import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  darkMode: 'class',
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
      animation: {
        'pulse-slow': 'pulse-slow 8s ease-in-out infinite',
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '0.8' },
        },
      },
      colors: {
        primary: {
          DEFAULT: '#0B1F4A',
          accent: '#3FE7F9',
        },
        secondary: '#3B4D91',
        highlight: '#7CF7E4',
        background: {
          DEFAULT: 'var(--color-background)',
          secondary: 'var(--color-background-secondary)',
        },
        surface: 'var(--color-surface)',
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
        },
        border: 'var(--color-border)',
        divider: 'var(--color-divider)',
      },
    },
  },
  plugins: [],
}

export default config