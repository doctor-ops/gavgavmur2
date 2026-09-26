import { useLang } from '@/context/LangContext';
import { useReveal } from '@/hooks/useReveal';
import { Footprints, Scissors, Stethoscope, Clock, Home, Cat, Dog } from 'lucide-react';

const iconMap: Record<string, typeof Footprints> = {
  Footprints,
  Scissors,
  Stethoscope,
  Clock,
  Home,
  Cat,
  Dog,
};

export function Care() {
  const { t } = useLang();
  const { ref, revealed } = useReveal<HTMLDivElement>();

  return (
    <section id="care" className="py-20 lg:py-28 bg-base-bg">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-reveal ${revealed ? 'revealed' : ''}`}
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-ink mb-4">
            {t.care.title}
          </h2>
          <p className="text-lg text-ink-light leading-relaxed">{t.care.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Dog care — Теплая гамма (Акцентная) */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              {/* Замена bg-honey на bg-accent */}
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shadow-sm">
                <Dog className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display font-bold text-2xl text-ink">{t.care.dogTitle}</h3>
            </div>
            <div className="space-y-4">
              {t.care.dogCards.map((card, i) => {
                const Icon = iconMap[card.icon] || Footprints;
                return (
                  <div
                    key={i}
                    // Замена hover:border-honey на hover:border-accent
                    className="flex gap-4 p-5 rounded-2xl bg-base-surface border border-base-muted hover:border-accent/30 hover:shadow-md transition-all"
                  >
                    {/* Замена bg-honey-soft на bg-accent-soft */}
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent-soft flex items-center justify-center">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-ink mb-1">{card.title}</h4>
                      <p className="text-sm text-ink-soft leading-relaxed">{card.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cat care — Сдержанная гамма (Брендовая) */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              {/* Используем bg-brand для кошек, чтобы создать визуальный контраст с собаками */}
              <div className="w-12 h-12 rounded-xl bg-brand flex items-center justify-center shadow-sm">
                <Cat className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display font-bold text-2xl text-ink">{t.care.catTitle}</h3>
            </div>
            <div className="space-y-4">
              {t.care.catCards.map((card, i) => {
                const Icon = iconMap[card.icon] || Home;
                return (
                  <div
                    key={i}
                    // Замена hover:border-honey на hover:border-brand
                    className="flex gap-4 p-5 rounded-2xl bg-base-surface border border-base-muted hover:border-brand/30 hover:shadow-md transition-all"
                  >
                    {/* Используем мягкий оттенок brand-soft или ink/10 */}
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-soft/20 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-brand" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-ink mb-1">{card.title}</h4>
                      <p className="text-sm text-ink-soft leading-relaxed">{card.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
