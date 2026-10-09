import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { BREEDS_DATABASE, breedPhoto, breedsMatching } from '@/data/breeds';
import { ArrowLeft, ArrowRight, Cat, Dog, Filter as FilterIcon, Search } from 'lucide-react';

const pageSize = 9;

export function BreedCatalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const breedQuery = searchParams.get('q')?.trim() ?? '';
  const requestedPage = Number(searchParams.get('page') ?? '1');
  const [activeFilter, setActiveFilter] = useState<'all' | 'dog' | 'cat'>('all');
  const [activeTemp, setActiveTemp] = useState<string>('all');
  const [draftQuery, setDraftQuery] = useState(breedQuery);
  const [searchHint, setSearchHint] = useState('');
  const listRef = useRef<HTMLDivElement>(null);
  const skipScroll = useRef(true);

  const setCatalogParams = (changes: { q?: string; page?: number }) => {
    const next = new URLSearchParams(searchParams);
    if ('q' in changes) {
      const value = changes.q?.trim() ?? '';
      if (value) next.set('q', value);
      else next.delete('q');
      next.delete('page');
    }
    if (changes.page !== undefined && !('q' in changes)) {
      if (changes.page <= 1) next.delete('page');
      else next.set('page', String(changes.page));
    }
    setSearchParams(next);
  };

  const filteredBreeds = useMemo(() => {
    const byQuery = breedQuery.length >= 3 ? breedsMatching(breedQuery) : BREEDS_DATABASE;
    return byQuery.filter(breed => {
      const matchesType = activeFilter === 'all' || breed.type === activeFilter;
      const matchesTemp = activeTemp === 'all' || breed.temperament === activeTemp;
      return matchesType && matchesTemp;
    });
  }, [breedQuery, activeFilter, activeTemp]);

  const pageCount = Math.max(1, Math.ceil(filteredBreeds.length / pageSize));
  const currentPage = Number.isFinite(requestedPage) && requestedPage > 0
    ? Math.min(Math.floor(requestedPage), pageCount)
    : 1;
  const pageStart = (currentPage - 1) * pageSize;
  const visibleBreeds = filteredBreeds.slice(pageStart, pageStart + pageSize);

  useEffect(() => {
    setDraftQuery(breedQuery);
  }, [breedQuery]);

  useEffect(() => {
    if (skipScroll.current) {
      skipScroll.current = false;
      return;
    }
    listRef.current?.scrollIntoView({ block: 'start' });
  }, [currentPage]);

  const temperamentLabels: Record<string, string> = {
    active: 'Активный',
    calm: 'Спокойный',
    independent: 'Независимый',
    friendly: 'Дружелюбный'
  };

  return (
    <div className="min-h-screen bg-base-bg px-4 py-12 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Шапка каталога */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h1 className="text-4xl font-extrabold text-ink mb-3 font-display tracking-tight">Wikipedia пород</h1>
          <p className="text-ink-light text-base leading-relaxed">
            Узнайте всё об особенностях характера, происхождении и требованиях к уходу за вашими будущими питомцами.
          </p>
          <p className="mt-4 text-sm font-semibold text-ink">
            {breedQuery.length >= 3
              ? `По запросу «${breedQuery}» найдено ${filteredBreeds.length}`
              : `В каталоге ${filteredBreeds.length}`}
            {breedQuery && (
              <button
                type="button"
                onClick={() => {
                  setDraftQuery('');
                  setSearchHint('');
                  setCatalogParams({ q: '' });
                }}
                className="ml-3 font-bold text-brand hover:text-brand-light"
              >
                Все породы
              </button>
            )}
          </p>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            const value = draftQuery.trim();
            if (value.length > 0 && value.length < 3) {
              setSearchHint('Введите хотя бы 3 буквы — поиск идёт по всему каталогу.');
              return;
            }
            setSearchHint('');
            setCatalogParams({ q: value });
          }}
          className="mb-6"
        >
          <div className="flex items-center bg-base-surface rounded-xl border border-base-muted shadow-sm p-1.5">
            <Search className="w-5 h-5 text-ink-light ml-3" />
            <input
              type="search"
              value={draftQuery}
              onChange={(event) => {
                setDraftQuery(event.target.value);
                setSearchHint('');
              }}
              placeholder="Порода во всём каталоге, например сфинкс"
              className="flex-1 py-2.5 px-3 text-sm text-ink placeholder-ink-light bg-transparent focus:outline-none font-semibold"
            />
            <button type="submit" className="px-5 py-2.5 rounded-lg bg-accent text-brand font-bold text-sm hover:bg-accent-light transition-colors">
              Найти
            </button>
          </div>
          {searchHint && <p className="mt-2 text-sm text-ink-light">{searchHint}</p>}
        </form>

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
                onClick={() => {
                  setActiveFilter(filter.id as 'all' | 'dog' | 'cat');
                  setCatalogParams({ page: 1 });
                }}
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
              onChange={(e) => {
                setActiveTemp(e.target.value);
                setCatalogParams({ page: 1 });
              }}
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
        <div ref={listRef} className="scroll-mt-32">
        {visibleBreeds.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleBreeds.map((breed) => (
              <div 
                key={breed.id} 
                className="bg-base-surface border border-base-muted rounded-xl2 overflow-hidden shadow-sm hover:shadow-xl hover:border-accent/30 transition-all flex flex-col group hover:-translate-y-1"
              >
                <div className="relative h-64 bg-brand-dark overflow-hidden flex items-center justify-center border-b border-base-muted">
                  <img
                    src={breedPhoto(breed.image)}
                    alt={breed.name}
                    loading="lazy"
                    decoding="async"
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

                    <div className="space-y-1.5 text-xs text-ink-soft mb-4 bg-base-bg p-3.5 rounded-xl border border-base-muted/60 font-medium">
                      <div className="truncate"><span className="text-ink-light">📍 Происхождение:</span> {breed.origin}</div>
                      <div className="truncate"><span className="text-ink-light">⏳ Жизненный цикл:</span> {breed.lifeSpan}</div>
                      <div className="truncate"><span className="text-ink-light">⚖️ Средний вес:</span> {breed.weight}</div>
                    </div>

                    <p className="text-ink-soft text-sm leading-relaxed mb-6 line-clamp-3">
                      {breed.description}
                    </p>
                  </div>

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
            <p className="text-ink-soft font-bold text-lg">
              {breedQuery ? `По запросу «${breedQuery}» породы не найдены.` : 'Породы с такими фильтрами не найдены.'}
            </p>
            <p className="text-ink-light text-sm mt-1">Попробуйте сбросить параметры фильтрации.</p>
          </div>
        )}
        {pageCount > 1 && (
          <nav aria-label="Страницы пород" className="mt-10 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setCatalogParams({ page: currentPage - 1 })}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-1 px-4 py-2.5 rounded-xl text-sm font-bold bg-base-surface border border-base-muted text-ink disabled:opacity-40"
            >
              <ArrowLeft className="w-4 h-4" /> Назад
            </button>
            {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
              <button
                type="button"
                key={page}
                onClick={() => setCatalogParams({ page })}
                aria-current={page === currentPage ? 'page' : undefined}
                className={`min-w-10 px-3 py-2.5 rounded-xl text-sm font-bold border ${
                  page === currentPage
                    ? 'bg-brand text-white border-brand'
                    : 'bg-base-surface text-ink border-base-muted hover:border-brand/30'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setCatalogParams({ page: currentPage + 1 })}
              disabled={currentPage === pageCount}
              className="inline-flex items-center gap-1 px-4 py-2.5 rounded-xl text-sm font-bold bg-base-surface border border-base-muted text-ink disabled:opacity-40"
            >
              Дальше <ArrowRight className="w-4 h-4" />
            </button>
          </nav>
        )}
        </div>
      </div>
    </div>
  );
}
