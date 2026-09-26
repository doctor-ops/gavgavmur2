/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // 60% — Абсолютно нейтральный, чистый фон (Warm Milk) + системные подложки
        base: {
          bg: '#F9F9FB',      // Warm Milk: основной фон сайта
          surface: '#FFFFFF', // Чистый белый для карточек и блоков
          muted: '#E2E8F0',   // Мягкий серый разделитель (в тон к Slate)
        },
        
        // Шрифты и текстовые оттенки (на базе Глубокого графитового/Черничного)
        ink: {
          DEFAULT: '#1E293B', // Основной текст: глубокий графитовый
          soft: '#475569',    // Второстепенный текст
          light: '#64748B',   // Мягкий Slate для подписей и плейсхолдеров
        },
        
        // 30% — Вторичный / Брендовый (Глубокий графитовый или Черничный)
        // Идеально для меню, шапки, футера и структурообразующих блоков
        brand: {
          DEFAULT: '#1E293B', // Черничный / Графитовый фон
          light: '#334155',   // Для ховеров и выделенных элементов меню
          dark: '#0F172A',    // Более глубокий оттенок для футера или плашек
          soft: '#94A3B8',    // Для контрастного текста внутри темных блоков (Header/Footer)
        },
        
        // 10% — Единый акцентный цвет для Главных Кнопок (Насыщенный кораллово-оранжевый)
        // Инструмент вашей монетизации и фокуса внимания. Только для CTA-элементов!
        accent: {
          DEFAULT: '#FF6B4A', // Кораллово-оранжевый
          light: '#FF856B',   // Для эффекта наведения (hover)
          dark: '#E05333',    // Для состояния нажатия (active)
          soft: '#FFEBE7',    // Нежная коралловая подложка для редких акцентов
        },
        
        // Системные статусы и валидация (остались нетронутыми для логики приложения)
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
