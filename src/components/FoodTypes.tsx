import { useLang } from '@/context/LangContext';
import { useReveal } from '@/hooks/useReveal';
import { Wheat, Droplet, Beef, Check, X, Info, Scale } from 'lucide-react';

const iconMap: Record<string, typeof Wheat> = {
  Wheat,
  Droplet,
  Beef,
};

export function FoodTypes() {
  const { t, lang } = useLang();
  const { ref, revealed } = useReveal<HTMLDivElement>();
  const prosLabel = lang === 'ru' ? 'Плюсы' : 'Pros';
  const consLabel = lang === 'ru' ? 'Минусы' : 'Cons';

  return (
    // Изменено на bg-base-bg для мягкого входа в секцию
    <section id="food" className="py-20 lg:py-28 bg-base-bg">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-reveal ${revealed ? 'revealed' : ''}`}
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-ink mb-4">
            {t.food.title}
          </h2>
          <p className="text-lg text-ink-light leading-relaxed">{t.food.subtitle}</p>
        </div>

        {/* Food type comparison cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {t.food.types.map((type, i) => {
            const Icon = iconMap[type.icon] || Wheat;
            return (
              <div
                key={i}
                // Замена bg-base-bg на bg-base-surface (белый), чтобы карточка выделялась на молочном фоне
                className="rounded-2xl bg-base-surface border border-base-muted overflow-hidden hover:shadow-xl hover:border-accent/30 transition-all hover:-translate-y-1"
              >
                <div className="p-6 border-b border-base-muted">
                  {/* Замена bg-ink на bg-brand */}
                  <div className="w-14 h-14 rounded-xl bg-brand flex items-center justify-center mb-4">
                    {/* Замена text-honey на text-accent */}
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-ink mb-2">{type.name}</h3>
                  <p className="text-sm text-ink-soft leading-relaxed">{type.description}</p>
                </div>

                <div className="p-6 space-y-3">
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-bold text-success mb-2">
                      <Check className="w-4 h-4" />
                      {prosLabel}
                    </h4>
                    <ul className="space-y-1.5">
                      {type.pros.map((pro, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-ink-soft">
                          <span className="w-1.5 h-1.5 rounded-full bg-success mt-1.5 flex-shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-2 border-t border-base-muted">
                    <h4 className="flex items-center gap-2 text-sm font-bold text-error mb-2">
                      <X className="w-4 h-4" />
                      {consLabel}
                    </h4>
                    <ul className="space-y-1.5">
                      {type.cons.map((con, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-ink-soft">
                          <span className="w-1.5 h-1.5 rounded-full bg-error mt-1.5 flex-shrink-0" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Brand examples */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h3 className="font-display font-bold text-3xl text-ink mb-3">
              {t.food.brandsTitle}
            </h3>
            <p className="text-base text-ink-light leading-relaxed">{t.food.brandsSubtitle}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.food.brands.map((brand, i) => (
              <div
                key={i}
                // Замена bg-base-bg на bg-base-surface
                className="p-6 rounded-2xl bg-base-surface border border-base-muted hover:border-accent/30 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-display font-bold text-lg text-ink">{brand.name}</h4>
                  {/* Замена bg-honey-soft на bg-accent-soft и text-honey-dark на text-accent-dark */}
                  <span className="px-3 py-1 rounded-full bg-accent-soft text-accent-dark text-xs font-bold whitespace-nowrap">
                    {brand.category}
                  </span>
                </div>
                <p className="text-sm text-ink-soft leading-relaxed">{brand.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Feeding guide table */}
        <div className="mb-10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            {/* Замена bg-ink/5 на bg-brand/5 и text-honey на text-accent */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/5 text-ink text-sm font-semibold mb-4">
              <Scale className="w-4 h-4 text-accent" />
              {t.food.feedingGuideTitle}
            </div>
            <h3 className="font-display font-bold text-3xl text-ink mb-3">
              {t.food.feedingGuideTitle}
            </h3>
            <p className="text-base text-ink-light leading-relaxed">{t.food.feedingGuideSubtitle}</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-base-muted shadow-sm">
            <table className="w-full text-left">
              <thead>
                {/* Замена bg-ink на bg-brand */}
                <tr className="bg-brand text-white">
                  <th className="px-5 py-4 font-display font-semibold text-sm">{t.food.guideColumns.breed}</th>
                  <th className="px-5 py-4 font-display font-semibold text-sm">{t.food.guideColumns.weight}</th>
                  <th className="px-5 py-4 font-display font-semibold text-sm">{t.food.guideColumns.dry}</th>
                  <th className="px-5 py-4 font-display font-semibold text-sm">{t.food.guideColumns.wet}</th>
                </tr>
              </thead>
              <tbody>
                {t.food.feedingGuide.map((row, i) => (
                  <tr
                    key={i}
                    // Замена hover:bg-honey-soft на hover:bg-accent-soft
                    className={`${i % 2 === 0 ? 'bg-base-bg' : 'bg-base-surface'} border-t border-base-muted hover:bg-accent-soft/40 transition-colors`}
                  >
                    <td className="px-5 py-4 font-medium text-ink text-sm">{row.breed}</td>
                    <td className="px-5 py-4 text-ink-soft text-sm">{row.weight}</td>
                    <td className="px-5 py-4 text-ink-soft text-sm">
                      <span className="inline-flex items-center gap-1.5">
                        {/* Замена text-honey на text-accent */}
                        <Wheat className="w-3.5 h-3.5 text-accent" />
                        {row.dryAmount}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-ink-soft text-sm">
                      <span className="inline-flex items-center gap-1.5">
                        {/* Замена text-honey на text-accent */}
                        <Droplet className="w-3.5 h-3.5 text-accent" />
                        {row.wetAmount}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Disclaimer — Системный цвет warning остается без изменений */}
        <div className="rounded-2xl bg-warning-light border border-warning/30 p-6 flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-warning/15 flex items-center justify-center">
            <Info className="w-5 h-5 text-warning" />
          </div>
          <p className="text-sm text-ink-soft leading-relaxed">{t.food.disclaimer}</p>
        </div>
      </div>
    </section>
  );
}
