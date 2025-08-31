export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Urbanist', 'sans-serif'],
      },
      colors: {
        'custom-blue': '#214ddb',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        pulseBorder: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(20,184,166,0.6)' },
          '50%': { boxShadow: '0 0 0 8px rgba(20,184,166,0)' },
        }
      },
      animation: {
        fadeInUp: 'fadeInUp 0.6s ease-out both',
        pulseBorder: 'pulseBorder 3s ease-in-out infinite'
      }
    },
  },
  plugins: [],
};
