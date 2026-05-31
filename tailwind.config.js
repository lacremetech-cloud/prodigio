/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Palette noir & blanc — aucune couleur d'accent, le contraste EST l'identité.
        ink: {
          DEFAULT: '#0a0a0a', // noir profond
          soft: '#111111', // noir légèrement adouci
        },
        paper: {
          DEFAULT: '#ffffff', // blanc pur
          soft: '#f7f7f5', // blanc cassé pour adoucir les grandes surfaces claires
        },
        smoke: {
          400: '#888888', // textes secondaires
          200: '#d8d8d8', // filets, bordures
        },
      },
      fontFamily: {
        // Serif éditoriale pour les titres, sans-serif raffinée pour le corps.
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', '"Cormorant Garamond"', 'serif'],
        sans: ['Jost', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        luxe: '0.35em', // capitales très espacées (logo, labels)
        wideluxe: '0.2em',
      },
      transitionTimingFunction: {
        // Courbe lente et posée, cinématographique.
        luxe: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'slow-zoom': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.12)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'slow-zoom': 'slow-zoom 18s ease-out forwards',
        'fade-up': 'fade-up 1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
    },
  },
  plugins: [],
}
