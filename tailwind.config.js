/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FEF5EC',
          100: '#FDEAD9',
          200: '#FBD5B3',
          300: '#F9C18D',
          400: '#F7AC66',
          500: '#E67E22', // Primary orange
          600: '#D35400',
          700: '#A04000',
          800: '#6E2C00',
          900: '#3C1800',
        },
        secondary: {
          50: '#E8F4FB',
          100: '#D1E9F7',
          200: '#A3D3EF',
          300: '#75BEE7',
          400: '#47A8DF',
          500: '#3498DB', // Primary blue
          600: '#2874A6',
          700: '#1C5071',
          800: '#10303F',
          900: '#051015',
        },
        success: {
          500: '#10B981',
        },
        warning: {
          500: '#F59E0B',
        },
        error: {
          500: '#EF4444',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'bounce-subtle': 'bounceSlight 1s infinite',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        bounceSlight: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
};