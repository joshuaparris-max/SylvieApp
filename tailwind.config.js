/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        pastel: {
          pink: '#fde8f3',
          blue: '#d6ebff',
          green: '#dff7e0',
          lavender: '#f1e4ff',
          peach: '#ffe4d9',
        },
      },
      boxShadow: {
        soft: '0 20px 45px rgba(124, 85, 153, 0.12)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        sparkle: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
          '100%': { opacity: '0', transform: 'scale(1.4)' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        sparkle: 'sparkle 1.2s ease-out infinite',
      },
    },
  },
  plugins: [],
}
