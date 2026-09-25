import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { breeds } from '@/data/breeds';
import { Filter, Dog, Cat, ArrowRight, Home as HomeIcon, Heart, Baby, Ruler, ShieldCheck } from 'lucide-react';

type Species = 'all' | 'dog' | 'cat';

export function BreedCatalog() {
  const [species, setSpecies] = useState<Species>('all');
  const [apartment, setApartment] = useState(false);
  const [hypoallergenic, setHypoallergenic] = useState(false);
  const [kids, setKids] = useState(false);

  const filtered = useMemo(() => {
    return breeds.filter((b) => {
      if (species !== 'all' && b.species !== species) return false;
      if (apartment && !b.apartmentFriendly) return false;
      if (hypoallergenic && !b.hypoallergenic) return false;
      if (kids && !b.goodWithKids) return false;
      return true;
    });
  }, [species, apartment, hypoallergenic, kids]);

  const speciesLabels: Record<Species, string> = {
    all: 'Все',
    dog: 'Собаки',
    cat: 'Кошки',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:text-accent-dark transition-colors mb-6"
      >
        <HomeIcon className="w-4 h-4" />
        На главную
      </Link>

      <h1 className="font-display font-extrabold text-3xl lg:text-4xl text-ink mb-3">Каталог пород</h1>
      <p className="text-base text-ink-light leading-relaxed mb-8 max-w-2xl">
        Подробные карточки пород собак и кошек с рейтингами линьки, активности, шума и обучаемости, а также скрытыми генетическими рисками.
      </p>

      {/* Filters */}
      <div className="rounded-2xl bg-base-surface border border-base-muted p-5 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-brand" />
          <span className="text-sm font-semibold text-ink">Фильтры</span>
        </div>
        <div className="flex flex-wrap gap-3">
          {/* Species */}
          <div className="flex gap-1.5 bg-base-bg rounded-xl p-1">
            {(['all', 'dog', 'cat'] as Species[]).map((s) => (
              <button
                key={s}
                onClick={() => setSpecies(s)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  species === s ? 'bg-brand text-white' : 'text-ink-light hover:text-ink'
                }`}
              >
                {s === 'all' && 'Все'}
                {s === 'dog' && <span className="inline-flex items-center gap-1.5"><Dog className="w-4 h-4" />Собаки</span>}
                {s === 'cat' && <span className="inline-flex items-center gap-1.5"><Cat className="w-4 h-4" />Кошки</span>}
              </button>
            ))}
          </div>

          {/* Toggles */}
          <button
            onClick={() => setApartment(!apartment)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
              apartment ? 'bg-brand-soft text-brand border-brand' : 'bg-base-bg text-ink-light border-base-muted hover:border-brand/30'
            }`}
          >
            <HomeIcon className="w-4 h-4" />
            Для квартиры
          </button>
          <button
            onClick={() => setHypoallergenic(!hypoallergenic)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
              hypoallergenic ? 'bg-brand-soft text-brand border-brand' : 'bg-base-bg text-ink-light border-base-muted hover:border-brand/30'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            Гипоаллергенные
          </button>
          <button
            onClick={() => setKids(!kids)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
              kids ? 'bg-brand-soft text-brand border-brand' : 'bg-base-bg text-ink-light border-base-muted hover:border-brand/30'
            }`}
          >
            <Baby className="w-4 h-4" />
            Дружат с детьми
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((breed) => (
          <Link
            key={breed.id}
            to={`/wiki/${breed.id}`}
            className="group rounded-2xl bg-base-surface border border-base-muted overflow-hidden hover:shadow-xl hover:border-accent/40 transition-all hover:-translate-y-1"
          >
            {/* Image placeholder */}
            <div className="h-40 bg-brand-soft flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-soft to-accent-soft opacity-60" />
              <div className="relative w-20 h-20 rounded-2xl bg-white/70 flex items-center justify-center">
                {breed.species === 'dog' ? (
                  <Dog className="w-10 h-10 text-brand" />
                ) : (
                  <Cat className="w-10 h-10 text-brand" />
                )}
              </div>
              <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/80 text-xs font-bold text-brand">
                {breed.size}
              </span>
            </div>

            <div className="p-5">
              <h3 className="font-display font-bold text-lg text-ink mb-1">{breed.name}</h3>
              <div className="flex items-center gap-1.5 text-xs text-ink-light mb-3">
                <Ruler className="w-3.5 h-3.5" />
                {breed.weightKg} · {breed.lifespan}
              </div>
              <p className="text-sm text-ink-light leading-relaxed mb-4 line-clamp-2">{breed.description}</p>

              {/* Mini ratings */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                {([
                  { label: 'Линька', val: breed.ratings.shedding },
                  { label: 'Активн.', val: breed.ratings.activity },
                  { label: 'Шум', val: breed.ratings.noise },
                  { label: 'Обуч.', val: breed.ratings.trainability },
                ]).map((r) => (
                  <div key={r.label} className="text-center">
                    <div className="flex justify-center gap-0.5 mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`w-1.5 h-1.5 rounded-full ${star <= r.val ? 'bg-accent' : 'bg-base-muted'}`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-ink-light">{r.label}</span>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {breed.apartmentFriendly && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-brand-soft text-brand text-[11px] font-medium">
                    <HomeIcon className="w-3 h-3" />Квартира
                  </span>
                )}
                {breed.hypoallergenic && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-safe-light text-safe-dark text-[11px] font-medium">
                    <ShieldCheck className="w-3 h-3" />Гипоаллерг.
                  </span>
                )}
                {breed.goodWithKids && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-accent-soft text-accent-dark text-[11px] font-medium">
                    <Heart className="w-3 h-3" />Детям
                  </span>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-base-muted flex items-center justify-between">
                <span className="text-sm font-semibold text-brand group-hover:text-accent-dark transition-colors">
                  Подробнее
                </span>
                <ArrowRight className="w-4 h-4 text-brand group-hover:translate-x-1 group-hover:text-accent-dark transition-all" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-ink-light">
          <Filter className="w-12 h-12 mx-auto mb-3 text-base-muted" />
          <p>Нет пород, подходящих под выбранные фильтры.</p>
        </div>
      )}
    </div>
  );
}
