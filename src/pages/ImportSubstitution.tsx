import { useState } from 'react';
import { ToolLayout } from '@/components/ToolLayout';
import { foodAlternatives } from '@/data/foodAlternatives';
import { Search, Replace, MapPin, Tag } from 'lucide-react';

export function ImportSubstitution() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Все');

  const categories = ['Все', ...Array.from(new Set(foodAlternatives.map((f) => f.category)))];

  const filtered = foodAlternatives.filter((f) => {
    const matchesQuery =
      query === '' ||
      f.foreignBrand.toLowerCase().includes(query.toLowerCase()) ||
      f.russianAlternatives.some((a) => a.name.toLowerCase().includes(query.toLowerCase()));
    const matchesCategory = category === 'Все' || f.category === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <ToolLayout
      title="Импортозамещение"
      subtitle="Найдите российские альтернативы для зарубежных кормов. База обновляется с учётом доступности на российском рынке."
    >
      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-light" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по бренду корма..."
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-base-muted bg-base-surface text-ink placeholder-ink-light focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-3.5 rounded-xl border border-base-muted bg-base-surface text-ink focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-ink-light">
            <Replace className="w-12 h-12 mx-auto mb-3 text-base-muted" />
            <p>Ничего не найдено. Попробуйте изменить запрос.</p>
          </div>
        ) : (
          filtered.map((item) => (
            <div key={item.foreignBrand} className="rounded-2xl bg-base-surface border border-base-muted overflow-hidden">
              {/* Foreign brand header */}
              <div className="flex items-center justify-between flex-wrap gap-3 p-5 bg-brand text-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Replace className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg">{item.foreignBrand}</h3>
                    <div className="flex items-center gap-2 text-sm text-brand-soft">
                      <MapPin className="w-3.5 h-3.5" />
                      {item.foreignCountry}
                    </div>
                  </div>
                </div>
                <span className="px-3 py-1.5 rounded-full bg-accent text-brand text-xs font-bold">
                  {item.category}
                </span>
              </div>

              {/* Russian alternatives */}
              <div className="p-5">
                <div className="text-sm font-semibold text-ink mb-3">Российские альтернативы:</div>
                <div className="grid sm:grid-cols-3 gap-3">
                  {item.russianAlternatives.map((alt) => (
                    <div key={alt.name} className="p-4 rounded-xl bg-base-bg border border-base-muted hover:border-accent/40 transition-colors">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Tag className="w-4 h-4 text-brand" />
                        <h4 className="font-semibold text-sm text-ink">{alt.name}</h4>
                      </div>
                      <div className="text-xs text-brand font-medium mb-1.5">{alt.brand}</div>
                      <p className="text-xs text-ink-light leading-relaxed">{alt.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-8 rounded-xl bg-brand-soft p-5 text-sm text-ink-soft leading-relaxed">
        Информация носит ознакомительный характер. Перед сменой корма проконсультируйтесь с ветеринаром.
      </div>
    </ToolLayout>
  );
}
