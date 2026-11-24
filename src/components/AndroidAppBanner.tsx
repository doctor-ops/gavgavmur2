import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { RuStoreLink } from '@/components/AppPromo';

const STORAGE_KEY = 'ggm_app_banner_dismissed_at';
const HIDE_FOR_MS = 14 * 24 * 60 * 60 * 1000; // две недели после закрытия

function wasDismissedRecently(): boolean {
  try {
    const at = Number(localStorage.getItem(STORAGE_KEY));
    return Boolean(at) && Date.now() - at < HIDE_FOR_MS;
  } catch {
    return false;
  }
}

function remember(): void {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    /* localStorage недоступен — просто скрываем до перезагрузки */
  }
}

// Плашка внизу экрана только для Android: приложение есть только там.
export function AndroidAppBanner() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!/Android/i.test(navigator.userAgent) || wasDismissedRecently()) return;
    const timer = window.setTimeout(() => setVisible(true), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible || pathname.replace(/\/+$/, '') === '/app') return null;

  const close = () => {
    remember();
    setVisible(false);
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-3 animate-fade-up">
      <div className="max-w-xl mx-auto flex items-center gap-3 rounded-2xl bg-brand text-white shadow-2xl border border-white/10 p-3 pl-4">
        <img
          src={`${import.meta.env.BASE_URL}logo-icon.webp`}
          alt=""
          className="w-10 h-10 object-contain brightness-0 invert shrink-0"
        />
        <div className="flex-1 min-w-0 leading-tight">
          <div className="font-display font-extrabold text-sm">ГавГавМур для Android</div>
          <div className="text-xs text-brand-soft truncate">Ветпаспорт, напоминания и сканер корма по фото</div>
        </div>
        <RuStoreLink
          placement="android_banner"
          onClick={close}
          className="px-4 py-2 rounded-xl bg-accent text-brand font-extrabold text-sm shrink-0"
        >
          Открыть
        </RuStoreLink>
        <button
          type="button"
          onClick={close}
          aria-label="Закрыть"
          className="w-8 h-8 rounded-lg flex items-center justify-center text-brand-soft hover:text-white shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
