import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BREEDS_DATABASE } from '@/data/breeds';
import { Filter, Dog, Cat, ArrowRight, Home as HomeIcon, Heart } from 'lucide-react';

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

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Шапка каталога */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Википедия пород</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Узнайте всё об особенностях характера, происхождении и требованиях к уходу за вашими будущими питомцами.
        </p>
      </div>

      {/* Панель фильтров */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm mb-10 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${activeFilter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
          >
            <Filter className="w-4 h-4" /> Все хвостики
          </button>
          <button
            onClick={() => setActiveFilter('dog')}
            className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${activeFilter === 'dog' ? 'bg-indigo-600 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
          >
            <Dog className="w-4 h-4" /> Собаки
          </button>
          <button
            onClick={() => setActiveFilter('cat')}
            className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${activeFilter === 'cat' ? 'bg-indigo-600 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
          >
            <Cat className="w-4 h-4" /> Кошки
          </button>
        </div>

        {/* Фильтр по темпераменту */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Характер:</span>
          <select
            value={activeTemp}
            onChange={(e) => setActiveTemp(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500"
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBreeds.map((breed) => (
            <div key={breed.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group">
              {/* Контейнер картинки переделан под отображение целиком с темным стильным фоном */}
              <div className="relative h-64 bg-slate-950 flex items-center justify-center border-b border-gray-100/10">
                <img
                  src={breed.image}
                  alt={breed.name}
                  className="max-w-full max-h-full object-contain group-hover:scale-[1.02] transition-all duration-300"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{breed.name}</h3>
                    <span className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                      {breed.temperament === 'active' ? 'Активный' : breed.temperament === 'calm' ? 'Спокойный' : breed.temperament === 'independent' ? 'Независимый' : 'Дружелюбный'}
                    </span>
                  </div>

                  {/* Вывод локализованных полей */}
                  <div className="space-y-1.5 text-xs text-gray-500 mb-4 bg-slate-50 p-3 rounded-xl border border-gray-100/60">
                    <div>📍 <span className="font-semibold text-gray-700">Происхождение:</span> {breed.origin}</div>
                    <div>⏳ <span className="font-semibold text-gray-700">Продолжительность жизни:</span> {breed.lifeSpan}</div>
                    <div>⚖️ <span className="font-semibold text-gray-700">Средний вес:</span> {breed.weight}</div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {breed.description}
                  </p>
                </div>

                <Link
                  to={`/wiki/${breed.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600 text-gray-700 font-semibold py-3 rounded-xl transition-all text-sm mt-auto"
                >
                  Подробнее о породе
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <p className="text-gray-500 font-medium text-lg">Породы с такими фильтрами не найдены.</p>
        </div>
      )}
    </div>
  );
}
