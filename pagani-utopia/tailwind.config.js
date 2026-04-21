/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#0A0A0A',
        surface: '#111111',
        gold: '#C9A84C',
        'gold-hi': '#E8C96A',
        cream: '#F5F0E8',
        crimson: '#8B1A2B',
        chrome: '#C8C8C8',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Helvetica Neue', 'Neue Haas Grotesk', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'Courier New', 'monospace'],
      },
      spacing: {
        'section': 'clamp(80px, 10vw, 160px)',
      },
      maxWidth: {
        'container': 'min(1440px, 94vw)',
      },
    },
  },
  plugins: [],
}
