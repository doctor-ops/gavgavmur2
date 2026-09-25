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
          {/* Dog care */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-honey flex items-center justify-center">
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
                    className="flex gap-4 p-5 rounded-2xl bg-base-surface border border-base-muted hover:border-honey/30 hover:shadow-md transition-all"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-honey-soft flex items-center justify-center">
                      <Icon className="w-6 h-6 text-honey" />
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

          {/* Cat care */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-ink flex items-center justify-center">
                <Cat className="w-6 h-6 text-honey" />
              </div>
              <h3 className="font-display font-bold text-2xl text-ink">{t.care.catTitle}</h3>
            </div>
            <div className="space-y-4">
              {t.care.catCards.map((card, i) => {
                const Icon = iconMap[card.icon] || Home;
                return (
                  <div
                    key={i}
                    className="flex gap-4 p-5 rounded-2xl bg-base-surface border border-base-muted hover:border-honey/30 hover:shadow-md transition-all"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-ink/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-ink" />
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
