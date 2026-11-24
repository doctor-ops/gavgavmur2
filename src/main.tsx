import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async'; // Импортируем провайдер для SEO-тегов
import { LangProvider } from '@/context/LangContext'; // 1. ОБЯЗАТЕЛЬНО ИМПОРТИРУЕМ ПРОВАЙДЕР
import '@fontsource-variable/inter';
import '@fontsource-variable/manrope';
import './index.css';
import App from './App.tsx';
import { SITE_URL } from '@/seo/meta';

// www ведёт прямо на хостинг, где 301 не настроить, поэтому уводим на основной домен здесь.
// Приложение при этом не запускаем, чтобы Метрика не засчитала лишний просмотр.
const { hostname, pathname, search, hash } = window.location;

if (hostname === `www.${new URL(SITE_URL).hostname}`) {
  window.location.replace(SITE_URL + pathname + search + hash);
} else {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      {/* 
         Оборачиваем приложение в HelmetProvider, чтобы управлять мета-тегами на страницах.
      */}
      <HelmetProvider>
        {/* 
           2. Оборачиваем всё приложение в LangProvider.
           Теперь все компоненты внутри App смогут использовать useLang() и переводы.
        */}
        <LangProvider>
          <App />
        </LangProvider>
      </HelmetProvider>
    </StrictMode>
  );
}
