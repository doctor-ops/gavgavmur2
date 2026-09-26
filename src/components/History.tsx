import { useLang } from '@/context/LangContext';
import { useReveal } from '@/hooks/useReveal';
import { Dog, Cat } from 'lucide-react';

export function History() {
  const { t } = useLang();
  const { ref, revealed } = useReveal<HTMLDivElement>();

  return (
    // Изменено на bg-base-bg (молочный), чтобы создать мягкую основу
    <section id="history" className="py-20 lg:py-28 bg-base-bg">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-reveal ${revealed ? 'revealed' : ''}`}
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-ink mb-4">
            {t.history.title}
          </h2>
          <p className="text-lg text-ink-light leading-relaxed">{t.history.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Карточка про собак: Белый фон + Коралловый акцент */}
          <div className="rounded-2xl bg-base-surface p-8 border border-base-muted hover:border-accent/40 transition-colors shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              {/* Замена bg-ink на bg-brand и text-honey на text-accent */}
              <div className="w-12 h-12 rounded-xl bg-brand flex items-center justify-center">
                <Dog className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display font-bold text-xl text-ink">{t.history.dogTitle}</h3>
            </div>
            <p className="text-ink-soft leading-relaxed">{t.history.dogText}</p>
          </div>

          {/* Карточка про кошек: Белый фон + Коралловый акцент */}
          <div className="rounded-2xl bg-base-surface p-8 border border-base-muted hover:border-accent/40 transition-colors shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-brand flex items-center justify-center">
                <Cat className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display font-bold text-xl text-ink">{t.history.catTitle}</h3>
            </div>
            <p className="text-ink-soft leading-relaxed">{t.history.catText}</p>
          </div>
        </div>

        {/* Таймлайн */}
        <div className="relative">
          {/* Линия таймлайна */}
          <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 bg-base-muted lg:-translate-x-1/2" />
          
          <div className="space-y-8">
            {t.history.timeline.map((item, i) => (
              <div
                key={i}
                className={`relative flex ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-start gap-6`}
              >
                {/* Точка на линии: Замена bg-honey на bg-accent */}
                <div className="absolute left-4 lg:left-1/2 w-4 h-4 rounded-full bg-accent border-4 border-base-bg lg:-translate-x-1/2 mt-6 z-10" />
                
                <div className={`flex-1 lg:flex-1 pl-12 lg:pl-0 ${i % 2 === 0 ? 'lg:pr-12 lg:text-right' : 'lg:pl-12'}`}>
                  {/* Карточка события: bg-base-surface (белый) для контраста с молочным фоном */}
                  <div className="rounded-2xl bg-base-surface p-6 border border-base-muted hover:shadow-lg hover:border-accent/30 transition-all">
                    {/* Бейдж эпохи: Замена bg-honey-soft на bg-accent-soft */}
                    <span className="inline-block px-3 py-1 rounded-full bg-accent-soft text-accent-dark text-xs font-bold mb-3">
                      {item.era}
                    </span>
                    <h4 className="font-display font-bold text-lg text-ink mb-2">{item.title}</h4>
                    <p className="text-sm text-ink-soft leading-relaxed">{item.text}</p>
                  </div>
                </div>
                <div className="hidden lg:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
