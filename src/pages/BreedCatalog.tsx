import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BREEDS_DATABASE } from '@/data/breeds';
import { Dog, Cat, ArrowRight, Filter as FilterIcon } from 'lucide-react';

export function BreedCatalog() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'dog' | 'cat'>('all');
  const [activeTemp, setActiveTemp] = useState<string>('all');

  // Фильтрация данных на основе выбранных параметров
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
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in">
      {/* Шапка каталога */}
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold text-ink mb-3 font-display tracking-tight">Wikipedia пород</h1>
        <p className="text-ink-soft text-base leading-relaxed">
          Узнайте всё об особенностях характера, происхождении и требованиях к уходу за вашими будущими питомцами.
        </p>
      </div>

      {/* Панель фильтров — 30% Брендовые структуры */}
      <div className="bg-base-surface border border-base-muted rounded-xl2 p-5 shadow-sm mb-10 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 flex-1 sm:flex-none ${
              activeFilter === 'all' 
                ? 'bg-brand text-white shadow-sm' 
                : 'bg-base-bg text-ink-soft hover:bg-base-muted hover:text-ink'
            }`}
          >
            <FilterIcon className="w-4 h-4" /> Все хвостики
          </button>
          <button
            onClick={() => setActiveFilter('dog')}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 flex-1 sm:flex-none ${
              activeFilter === 'dog' 
                ? 'bg-brand text-white shadow-sm' 
                : 'bg-base-bg text-ink-soft hover:bg-base-muted hover:text-ink'
            }`}
          >
            <Dog className="w-4 h-4" /> Собаки
          </button>
          <button
            onClick={() => setActiveFilter('cat')}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 flex-1 sm:flex-none ${
              activeFilter === 'cat' 
                ? 'bg-brand text-white shadow-sm' 
                : 'bg-base-bg text-ink-soft hover:bg-base-muted hover:text-ink'
            }`}
          >
            <Cat className="w-4 h-4" /> Кошки
          </button>
        </div>

        {/* Фильтр по темпераменту */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-base-muted">
          <span className="text-xs font-bold text-ink-light uppercase tracking-wider font-display">Характер:</span>
          <select
            value={activeTemp}
            onChange={(e) => setActiveTemp(e.target.value)}
            className="bg-base-bg border border-base-muted rounded-xl px-3 py-2.5 text-sm font-semibold text-ink outline-none focus:border-brand-light transition-colors min-w-[160px]"
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
              className="bg-base-surface border border-base-muted rounded-xl2 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group hover:-translate-y-0.5"
            >
              
              {/* Контейнер изображения с эффектом размытия фона */}
              <div className="relative h-64 bg-brand-dark overflow-hidden flex items-center justify-center border-b border-base-muted">
                {/* Эффект размытого заднего плана под каждую породу */}
                <div 
                  className="absolute inset-0 bg-cover bg-center scale-110 blur-lg opacity-25 pointer-events-none group-hover:scale-115 transition-all duration-500"
                  style={{ backgroundImage: `url(${breed.image})` }}
                />
                <div className="absolute inset-0 bg-brand-dark/20" />

                {/* Основное четкое изображение по центру */}
                <img
                  src={breed.image}
                  alt={breed.name}
                  className="relative z-10 max-w-full max-h-full object-contain p-4 group-hover:scale-[1.03] transition-all duration-500"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="text-xl font-bold text-ink font-display line-clamp-1">{breed.name}</h3>
                    <span className="text-[10px] bg-brand-soft/30 text-brand px-2.5 py-1 rounded-md font-bold uppercase tracking-wider whitespace-nowrap">
                      {temperamentLabels[breed.temperament] || 'Дружелюбный'}
                    </span>
                  </div>

                  {/* Вывод локализованных полей на благородной подложке */}
                  <div className="space-y-1.5 text-xs text-ink-soft mb-4 bg-base-bg p-3.5 rounded-xl border border-base-muted/40 font-medium">
                    <div className="truncate"><span className="text-ink-light">📍 Происхождение:</span> {breed.origin}</div>
                    <div className="truncate"><span className="text-ink-light">⏳ Жизненный цикл:</span> {breed.lifeSpan}</div>
                    <div className="truncate"><span className="text-ink-light">⚖️ Средний вес:</span> {breed.weight}</div>
                  </div>

                  <p className="text-ink-soft text-sm leading-relaxed mb-6 line-clamp-3">
                    {breed.description}
                  </p>
                </div>

                {/* 10% АКЦЕНТА: Яркая целевая оранжевая кнопка перехода */}
                <Link
                  to={`/wiki/${breed.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-light active:bg-accent-dark text-white font-bold py-3.5 rounded-xl shadow-sm hover:shadow transition-all text-sm mt-auto"
                >
                  Подробнее о породе
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
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
  );
}
