// Яндекс Метрика. Счётчик включается, только если при сборке задан VITE_YM_ID.
// Скрипт грузится отдельным файлом (без inline-кода), поэтому работает с CSP.

type YmFn = ((...args: unknown[]) => void) & { a?: unknown[]; l?: number };

declare global {
  interface Window {
    ym?: YmFn;
  }
}

const YM_ID = Number(import.meta.env.VITE_YM_ID) || 0;
let initialized = false;

export function initAnalytics(): void {
  if (!YM_ID || initialized || typeof window === 'undefined') return;
  initialized = true;

  if (!window.ym) {
    const stub: YmFn = function (...args: unknown[]) {
      (stub.a = stub.a || []).push(args);
    };
    stub.l = Date.now();
    window.ym = stub;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://mc.yandex.ru/metrika/tag.js';
  document.head.appendChild(script);

  // defer: true — просмотры страниц отправляем сами при смене маршрута (SPA).
  window.ym(YM_ID, 'init', {
    defer: true,
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
  });
}

export function trackPageView(url: string, referer?: string): void {
  if (!YM_ID) return;
  window.ym?.(YM_ID, 'hit', url, { title: document.title, referer });
}

export function reachGoal(goal: string, params?: Record<string, unknown>): void {
  if (!YM_ID) return;
  window.ym?.(YM_ID, 'reachGoal', goal, params);
}
