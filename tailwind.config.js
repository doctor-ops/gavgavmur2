/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          bg: '#F8F9FA',
          surface: '#FFFFFF',
          muted: '#E9ECEF',
        },
        ink: {
          DEFAULT: '#212529',
          soft: '#495057',
          light: '#6C757D',
        },
        brand: {
          DEFAULT: '#2B3A67',
          light: '#3D5283',
          dark: '#1E2A4D',
          soft: '#EBF1FA',
        },
        accent: {
          DEFAULT: '#FFC107',
          light: '#FFD54F',
          dark: '#FFB300',
          soft: '#FFF8E1',
        },
        safe: {
          DEFAULT: '#4CAF50',
          light: '#E8F5E9',
          dark: '#388E3C',
        },
        warn: {
          DEFAULT: '#FF9800',
          light: '#FFF3E0',
          dark: '#F57C00',
        },
        danger: {
          DEFAULT: '#F44336',
          light: '#FFEBEE',
          dark: '#D32F2F',
        },
        success: {
          DEFAULT: '#4CAF50',
          light: '#E8F5E9',
        },
        warning: {
          DEFAULT: '#FF9800',
          light: '#FFF3E0',
        },
        error: {
          DEFAULT: '#F44336',
          light: '#FFEBEE',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Manrope"', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl2': '16px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'slide-in': 'slideIn 0.4s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
