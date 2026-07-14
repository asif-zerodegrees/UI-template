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
        paper: '#EAE6DC',
        paper2: '#F4F2EB',
        ink: '#1B1D1F',
        blueprint: '#2F4B7A',
        blueprint2: '#4A6FA8',
        steel: '#7A7F87',
        signal: '#D9A62E',
        line: '#C7C2B5',
      },
      fontFamily: {
        display: ['Big Shoulders Display', 'sans-serif'],
        body: ['IBM Plex Sans', 'sans-serif'],
        sans: ['IBM Plex Sans', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      // Mirrors src/styles/_typography.scss fluid scale
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
      boxShadow: {
        card: '0 1px 2px rgba(27,29,31,0.04), 0 8px 24px rgba(27,29,31,0.07)',
        cardHover: '0 2px 4px rgba(27,29,31,0.06), 0 16px 40px rgba(27,29,31,0.12)',
      },
    },
  },
  plugins: [],
};
