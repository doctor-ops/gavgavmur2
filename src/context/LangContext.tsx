import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { translations, type Lang, type Translation } from '@/i18n/translations';

type LangContextValue = {
  lang: Lang;
  t: Translation;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ru');
  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'ru' ? 'en' : 'ru'));
  }, []);

  return (
    <LangContext.Provider value={{ lang, t: translations[lang], setLang, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}
