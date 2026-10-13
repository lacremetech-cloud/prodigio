/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Charte PRODIGIO : noir profond, os chaud, or (identique à Instagram).
        ink: {
          DEFAULT: '#0A0A0B',
          soft: '#121214',
          line: '#26262A',
        },
        bone: {
          DEFAULT: '#F3EFE8',
          deep: '#E7E0D4',
        },
        gold: {
          DEFAULT: '#C9AE7C', // sur fond sombre
          deep: '#8A6F3E', // texte or sur fond clair (contraste AA)
        },
        mist: '#A9A6A0', // texte secondaire sur fond sombre
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        luxe: '0.38em',
        wideluxe: '0.22em',
      },
      transitionTimingFunction: {
        luxe: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'scroll-dot': {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '30%': { opacity: '1' },
          '100%': { transform: 'translateY(22px)', opacity: '0' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        'scroll-dot': 'scroll-dot 2.2s cubic-bezier(0.22, 1, 0.36, 1) infinite',
      },
    },
  },
  plugins: [],
}
