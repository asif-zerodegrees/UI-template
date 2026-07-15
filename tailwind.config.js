/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{pug,html,js}',
    './src/layouts/**/*.pug',
    './src/components/**/*.pug',
    './src/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        // RGB channels enable opacity modifiers (bg-paper/90, text-ink/60, …)
        paper: 'rgb(var(--color-paper-rgb) / <alpha-value>)',
        paper2: 'rgb(var(--color-paper2-rgb) / <alpha-value>)',
        ink: 'rgb(var(--color-ink-rgb) / <alpha-value>)',
        blueprint: 'rgb(var(--color-blueprint-rgb) / <alpha-value>)',
        blueprint2: 'rgb(var(--color-blueprint2-rgb) / <alpha-value>)',
        steel: 'rgb(var(--color-steel-rgb) / <alpha-value>)',
        signal: 'rgb(var(--color-signal-rgb) / <alpha-value>)',
        line: 'rgb(var(--color-line-rgb) / <alpha-value>)',
      },
      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-body)',
        sans: 'var(--font-body)',
        mono: 'var(--font-mono)',
      },
      fontSize: {
        'display-xl': [
          'clamp(2.75rem, 2rem + 4vw, 6rem)',
          { lineHeight: '0.96', letterSpacing: '-0.02em', fontWeight: '800' },
        ],
        'display-lg': [
          'clamp(2rem, 1.5rem + 2.5vw, 3.5rem)',
          { lineHeight: '1', letterSpacing: '-0.01em', fontWeight: '700' },
        ],
        h1: [
          'clamp(1.75rem, 1.5rem + 1.8vw, 2.75rem)',
          { lineHeight: '1.05', letterSpacing: '-0.01em', fontWeight: '700' },
        ],
        h2: [
          'clamp(1.5rem, 1.25rem + 1.2vw, 2.25rem)',
          { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '700' },
        ],
        h3: [
          'clamp(1.125rem, 1rem + 0.5vw, 1.5rem)',
          { lineHeight: '1.3', fontWeight: '600' },
        ],
        h4: [
          'clamp(1rem, 0.95rem + 0.35vw, 1.25rem)',
          { lineHeight: '1.35', fontWeight: '600' },
        ],
        h5: [
          'clamp(0.9375rem, 0.9rem + 0.2vw, 1.0625rem)',
          { lineHeight: '1.4', fontWeight: '600' },
        ],
        h6: [
          'clamp(0.875rem, 0.85rem + 0.15vw, 1rem)',
          { lineHeight: '1.45', letterSpacing: '0.02em', fontWeight: '600' },
        ],
        'body-lg': [
          'clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)',
          { lineHeight: '1.6', fontWeight: '400' },
        ],
        body: [
          'clamp(1rem, 0.95rem + 0.2vw, 1.125rem)',
          { lineHeight: '1.65', fontWeight: '400' },
        ],
        small: [
          'clamp(0.8125rem, 0.8rem + 0.1vw, 0.9375rem)',
          { lineHeight: '1.5', fontWeight: '400' },
        ],
        mono: [
          'clamp(0.75rem, 0.7rem + 0.1vw, 0.875rem)',
          { lineHeight: '1.4', letterSpacing: '0.08em', fontWeight: '500' },
        ],
      },
      padding: {
        'fluid-xs': 'clamp(0.5rem, 0.4rem + 0.5vw, 0.75rem)',
        'fluid-sm': 'clamp(0.75rem, 0.6rem + 0.8vw, 1.25rem)',
        'fluid-md': 'clamp(1rem, 0.75rem + 1.2vw, 1.75rem)',
        'fluid-lg': 'clamp(1.5rem, 1rem + 2vw, 2.5rem)',
        'fluid-xl': 'clamp(2rem, 1.25rem + 3vw, 3.5rem)',
      },
      margin: {
        'fluid-xs': 'clamp(0.5rem, 0.4rem + 0.5vw, 0.75rem)',
        'fluid-sm': 'clamp(0.75rem, 0.6rem + 0.8vw, 1.25rem)',
        'fluid-md': 'clamp(1rem, 0.75rem + 1.2vw, 1.75rem)',
        'fluid-lg': 'clamp(1.5rem, 1rem + 2vw, 2.5rem)',
        'fluid-xl': 'clamp(2rem, 1.25rem + 3vw, 3.5rem)',
      },
      gap: {
        'fluid-xs': 'clamp(0.5rem, 0.4rem + 0.5vw, 0.75rem)',
        'fluid-sm': 'clamp(0.75rem, 0.6rem + 0.8vw, 1.25rem)',
        'fluid-md': 'clamp(1rem, 0.75rem + 1.2vw, 1.75rem)',
        'fluid-lg': 'clamp(1.5rem, 1rem + 2vw, 2.5rem)',
        'fluid-xl': 'clamp(2rem, 1.25rem + 3vw, 3.5rem)',
      },
      borderRadius: {
        'fluid-sm': 'clamp(0.125rem, 0.1rem + 0.3vw, 0.375rem)',
        'fluid-md': 'clamp(0.25rem, 0.15rem + 0.5vw, 0.75rem)',
        'fluid-lg': 'clamp(0.5rem, 0.3rem + 0.8vw, 1.25rem)',
        'fluid-xl': 'clamp(0.75rem, 0.4rem + 1.2vw, 1.75rem)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        cardHover: 'var(--shadow-card-hover)',
      },
    },
  },
  plugins: [require('./tailwind.fluid.js')],
};
