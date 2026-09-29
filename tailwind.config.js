/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // 60% — Тёплый, уютный фон (Warm Milk)
        base: {
          bg: '#FDFBF7',       // Настоящий Warm Milk: мягкий, молочно-белый
          surface: '#FFFFFF',  // Чистый белый для карточек (создает эффект многослойности)
          muted: '#EBE8E2',    // Тёплый серо-бежевый разделитель (вместо холодного Slate)
        },
        
        // Шрифты и текстовые оттенки (Глубокий графит)
        ink: {
          DEFAULT: '#1E293B', // Slate-800: основной текст
          soft: '#475569',    // Slate-600: второстепенный
          light: '#64748B',   // Slate-500: плейсхолдеры
        },
        
        // 30% — Брендовый (Глубокий графитовый/Черничный)
        brand: {
          DEFAULT: '#1E293B', // Slate-800
          light: '#334155',   // Slate-700
          dark: '#0F172A',    // Slate-900
          soft: '#94A3B8',    // Slate-400
        },
        
        // 10% — Акцент (Кораллово-оранжевый)
        accent: {
          DEFAULT: '#FF6B4A', 
          light: '#FF856B',   
          dark: '#E05333',    
          soft: '#FFEBE7',    
        },
        
        // Системные статусы
        success: {
          DEFAULT: '#4CAF50',
          light: '#E8F5E9',
          dark: '#388E3C',
        },
        warning: {
          DEFAULT: '#FF9800',
          light: '#FFF3E0',
          dark: '#F57C00',
        },
        error: {
          DEFAULT: '#F44336',
          light: '#FFEBEE',
          dark: '#D32F2F',
        },
      },
      fontFamily: {
        // Основной текст: Inter (эталон читаемости в IT)
        sans: ['Inter', 'system-ui', 'sans-serif'],
        // Заголовки: Plus Jakarta Sans (дружелюбный, современный, экспертный)
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
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
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
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
