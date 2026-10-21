import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async'; // Импортируем провайдер для SEO-тегов
import { LangProvider } from '@/context/LangContext'; // 1. ОБЯЗАТЕЛЬНО ИМПОРТИРУЕМ ПРОВАЙДЕР
import './index.css';
import App from './App.tsx';

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
