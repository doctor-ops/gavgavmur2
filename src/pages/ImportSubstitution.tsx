import { useState, useMemo } from 'react';
import { ToolLayout } from '@/components/ToolLayout';
import { foodAlternatives } from '@/data/foodAlternatives';
import { Search, Replace, MapPin, Tag, Info, X } from 'lucide-react';

export function ImportSubstitution() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Все');

  // 1. Функция нормализации для точного поиска (без учета регистра и пробелов)
  const normalize = (text: string) => text.toLowerCase().trim();

  // 2. Извлекаем все уникальные категории из базы данных для фильтра
  const categories = useMemo(() => {
    return ['Все', ...Array.from(new Set(foodAlternatives.map((f) => f.category)))];
  }, []);

  // 3. Оптимизированная фильтрация списка с использованием useMemo
  const filtered = useMemo(() => {
    return foodAlternatives.filter((f) => {
      const normQuery = normalize(query);
      
      const matchesQuery =
        normQuery === '' ||
        normalize(f.foreignBrand).includes(normQuery) ||
        f.russianAlternatives.some((a) => 
          normalize(a.name).includes(normQuery) || 
          normalize(a.brand).includes(normQuery)
        );
        
      const matchesCategory = category === 'Все' || f.//category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  return (
    <ToolLayout
      title="Импортозамещение кормов"
      subtitle="Найдите проверенные российские альтернативы для зарубежных брендов. База данных регулярно обновляется с учётом доступности на рынке."
    >
      {/* Панель поиска и фильтров */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8 animate-fade-in">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-light" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по импортному бренду или отечественному аналогу..."
            className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-base-muted bg-base-surface text-ink font-semibold text-sm placeholder-ink-light focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all shadow-sm"
          />
          {/* Кнопка очистки поиска (появляется только при наличии текста) */}
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-base-bg rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-ink-light hover:text-ink" />
            </button>
          )}
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-3.5 rounded-xl border border-base-muted bg-base-surface text-ink font-bold text-sm focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all shadow-sm cursor-pointer"
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Список результатов */}
      <div className="space-y-6 animate-fade-up">
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-base-surface rounded-xl2 border border-base-muted shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-base-bg mb-4">
              <Replace className="w-8 h-8 text-ink-light opacity-40" />
            </div>
            <p className="text-ink-soft font-bold text-lg">Ничего не найдено по вашему запросу</p>
            <p className="text-ink-light text-sm mt-2 max-w-xs mx-auto">
              Попробуйте изменить запрос или сбросить фильтр категорий.
            </p>
          </div>
        ) : (
          filtered.map((item) => (
            <div key={item.foreignBrand} className="rounded-xl2 bg-base-surface border border-base-muted overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
              
              {/* Шапка: Иностранный бренд */}
              <div className="flex items-center justify-between flex-wrap gap-4 p-5 bg-brand text-white transition-colors group-hover:bg-brand-dark">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shadow-sm">
                    <Replace className="w-5 h-5 text-brand" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-display font-extrabold text-xl tracking-tight">{item.foreignBrand}</h3>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-soft mt-0.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Страна производства: {item.foreignCountry}</span>
                    </div>
                  </div>
                </div>
                
                <span className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm text-white text-[10px] font-extrabold uppercase tracking-wider border border-white/10">
                  {item.category}
                </span>
              </div>

              {/* Контейнер аналогов */}
              <div className="p-5 bg-base-surface">
                <div className="text-xs font-bold text-ink-light uppercase tracking-wider mb-3.5 font-display">
                  Доступные отечественные аналоги:
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {item.russianAlternatives.map((alt) => (
                    <div 
                      key={alt.name} 
                      className="p-4 rounded-xl bg-base-bg border border-base-muted/60 hover:border-accent/40 transition-all flex flex-col justify-between group/item hover:-translate-y-0.5"
                    >
                      <div className="mb-3">
                        <div className="flex items-start gap-2 mb-1.5">
                          <Tag className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />
                          <h4 className="font-bold text-sm text-ink group-hover/item:text-brand transition-colors leading-tight">
                            {alt.name}
                          </h4>
                        </div>
                        <div className="text-xs text-brand font-bold ml-6">{alt.brand}</div>
                      </div>
                      
                      <p className="text-xs text-ink-soft leading-relaxed bg-base-surface border border-base-muted/40 p-2.5 rounded-lg font-normal">
                        {alt.note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Информационный футер */}
      <div className="mt-8 flex items-start gap-3 rounded-xl bg-base-surface border border-base-muted p-5 shadow-sm">
        <Info className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
        <p className="text-sm text-ink-soft leading-relaxed font-normal">
          <span className="font-bold text-ink">Важная информация:</span> Представленные данные носят исключительно ознакомительный характер. База обновляется на основе отзывов ветеринарных диетологов и фактического наличия товаров на складах дистрибьюторов. Перед переводом питомца на новый рацион обязательно проконсультируйтесь со своим лечащим ветеринарным врачом.
        </p>
      </div>
    </ToolLayout>
  );
}
