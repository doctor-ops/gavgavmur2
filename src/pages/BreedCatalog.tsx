import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BREEDS_DATABASE } from '@/data/breeds';
import { Dog, Cat, ArrowRight, Filter as FilterIcon } from 'lucide-react';

export function BreedCatalog() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'dog' | 'cat'>('all');
  const [activeTemp, setActiveTemp] = useState<string>('all');

  const filteredBreeds = useMemo(() => {
    return BREEDS_DATABASE.filter(breed => {
      const matchesType = activeFilter === 'all' || breed.type === activeFilter;
      const matchesTemp = activeTemp === 'all' || breed.temperament === activeTemp;
      return matchesType && matchesTemp;
    });
  }, [activeFilter, activeTemp]);

  const temperamentLabels: Record<string, string> = {
    active: 'Активный',
    calm: 'Спокойный',
    independent: 'Независимый',
    friendly: 'Дружелюбный'
  };

  return (
    // Добавляем bg-base-bg, чтобы каталог был на молочном фоне
    <div className="min-h-screen bg-base-bg px-4 py-12 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Шапка каталога */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h1 className="text-4xl font-extrabold text-ink mb-3 font-display tracking-tight">Wikipedia пород</h1>
          <p className="text-ink-light text-base leading-relaxed">
            Узнайте всё об особенностях характера, происхождении и требованиях к уходу за вашими будущими питомцами.
          </p>
        </div>

        {/* Панель фильтров */}
        <div className="bg-base-surface border border-base-muted rounded-xl2 p-5 shadow-sm mb-10 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {[
              { id: 'all', label: 'Все хвостики', icon: FilterIcon },
              { id: 'dog', label: 'Собаки', icon: Dog },
              { id: 'cat', label: 'Кошки', icon: Cat },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id as any)}
                className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 flex-1 sm:flex-none ${
                  activeFilter === filter.id 
                    ? 'bg-brand text-white shadow-md' 
                    : 'bg-base-bg text-ink-soft hover:bg-base-muted hover:text-ink'
                }`}
              >
                <filter.icon className="w-4 h-4" /> {filter.label}
              </button>
            ))}
          </div>

          {/* Фильтр по темпераменту */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-base-muted">
            <span className="text-xs font-bold text-ink-light uppercase tracking-wider font-display">Характер:</span>
            <select
              value={activeTemp}
              onChange={(e) => setActiveTemp(e.target.value)}
              className="bg-base-bg border border-base-muted rounded-xl px-3 py-2.5 text-sm font-semibold text-ink outline-none focus:border-brand transition-colors min-w-[160px]"
            >
              <option value="all">Любой темперамент</option>
              <option value="active">Активный</option>
              <option value="calm">Спокойный</option>
              <option value="independent">Независимый</option>
              <option value="friendly">Дружелюбный</option>
            </select>
          </div>
        </div>

        {/* Список карточек */}
        {filteredBreeds.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBreeds.map((breed) => (
              <div 
                key={breed.id} 
                // bg-base-surface для карточек на молочном фоне
                className="bg-base-surface border border-base-muted rounded-xl2 overflow-hidden shadow-sm hover:shadow-xl hover:border-accent/30 transition-all flex flex-col group hover:-translate-y-1"
              >
                
                {/* Контейнер изображения */}
                <div className="relative h-64 bg-brand-dark overflow-hidden flex items-center justify-center border-b border-base-muted">
                  <div 
                    className="absolute inset-0 bg-cover bg-center scale-110 blur-lg opacity-30 pointer-events-none group-hover:scale-125 transition-all duration-700"
                    style={{ backgroundImage: `url(${breed.image})` }}
                  />
                  <div className="absolute inset-0 bg-brand-dark/30" />

                  <img
                    src={breed.image}
                    alt={breed.name}
                    className="relative z-10 max-w-full max-h-full object-contain p-4 group-hover:scale-[1.03] transition-all duration-500"
                  />
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="relative z-10">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="text-xl font-bold text-ink font-display line-clamp-1">{breed.name}</h3>
                      <span className="text-[10px] bg-brand-soft/20 text-brand px-2.5 py-1 rounded-md font-bold uppercase tracking-wider whitespace-nowrap border border-brand/10">
                        {temperamentLabels[breed.temperament] || 'Дружелюбный'}
                      </span>
                    </div>

                    {/* Инфо-блок: bg-base-bg (молочный) внутри белой карточки */}
                    <div className="space-y-1.5 text-xs text-ink-soft mb-4 bg-base-bg p-3.5 rounded-xl border border-base-muted/60 font-medium">
                      <div className="truncate"><span className="text-ink-light">📍 Происхождение:</span> {breed.origin}</div>
                      <div className="truncate"><span className="text-ink-light">⏳ Жизненный цикл:</span> {breed.lifeSpan}</div>
                      <div className="truncate"><span className="text-ink-light">⚖️ Средний вес:</span> {breed.weight}</div>
                    </div>

                    <p className="text-ink-soft text-sm leading-relaxed mb-6 line-clamp-3">
                      {breed.description}
                    </p>
                  </div>

                  {/* CTA Кнопка: bg-accent + text-brand (премиальный стандарт) */}
                  <Link
                    to={`/wiki/${breed.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-light active:bg-accent-dark text-brand font-bold py-3.5 rounded-xl shadow-sm hover:shadow-md transition-all text-sm mt-auto"
                  >
                    Подробнее о породе
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-base-surface rounded-xl2 border border-base-muted shadow-sm">
            <p className="text-ink-soft font-bold text-lg">Породы с такими фильтрами не найдены.</p>
            <p className="text-ink-light text-sm mt-1">Попробуйте сбросить параметры фильтрации или выбрать другой темперамент.</p>
          </div>
        )}
      </div>
    </div>
  );
}
