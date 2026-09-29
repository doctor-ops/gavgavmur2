import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LangProvider } from '@/context/LangContext'; // 1. ОБЯЗАТЕЛЬНО ИМПОРТИРУЕМ ПРОВАЙДЕР
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 
       2. Оборачиваем всё приложение в LangProvider.
       Теперь все компоненты внутри App смогут использовать useLang() и переводы.
    */}
    <LangProvider>
      <App />
    </LangProvider>
  </StrictMode>
);
