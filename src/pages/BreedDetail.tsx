import { Link, useParams } from 'react-router-dom';
import { BREEDS_DATABASE as breeds } from '@/data/breeds';
import { ArrowLeft, Dog, Cat, Ruler, MapPin, Heart, Home as HomeIcon, ShieldCheck, Baby, AlertTriangle, Calculator, Wallet } from 'lucide-react';

const ratingLabels: Record<string, string> = {
  shedding: 'Линька',
  activity: 'Активность',
  noise: 'Шум',
  trainability: 'Обучаемость',
};

export function BreedDetail() {
  const { id } = useParams<{ id: string }>();
  const breed = breeds.find((b) => b.id === id);

  if (!breed) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <p className="text-ink-light mb-4">Порода не найдена.</p>
        <Link to="/wiki" className="text-brand font-semibold hover:underline">← Вернуться к каталогу</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <Link
        to="/wiki"
        className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:text-accent-dark transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        К каталогу пород
      </Link>

      {/* Hero card */}
      <div className="rounded-2xl bg-base-surface border border-base-muted overflow-hidden mb-6">
        <div className="h-56 bg-brand-soft flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-soft to-accent-soft opacity-60" />
          <div className="relative w-24 h-24 rounded-2xl bg-white/70 flex items-center justify-center">
            {breed.species === 'dog' ? (
              <Dog className="w-12 h-12 text-brand" />
            ) : (
              <Cat className="w-12 h-12 text-brand" />
            )}
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
            <div>
              <h1 className="font-display font-extrabold text-3xl text-ink mb-1">{breed.name}</h1>
              <div className="flex items-center gap-2 text-sm text-ink-light">
                <MapPin className="w-4 h-4" />
                {breed.origin}
              </div>
            </div>
            <span className="px-4 py-2 rounded-full bg-brand text-white text-sm font-semibold">
              {breed.species === 'dog' ? 'Собака' : 'Кошка'}
            </span>
          </div>

          <p className="text-base text-ink-soft leading-relaxed mb-5">{breed.description}</p>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-base-bg p-3 text-center">
              <Ruler className="w-5 h-5 text-brand mx-auto mb-1" />
              <div className="text-xs text-ink-light">Размер</div>
              <div className="text-sm font-semibold text-ink">{breed.size}</div>
            </div>
            <div className="rounded-xl bg-base-bg p-3 text-center">
              <Heart className="w-5 h-5 text-brand mx-auto mb-1" />
              <div className="text-xs text-ink-light">Вес</div>
              <div className="text-sm font-semibold text-ink">{breed.weightKg}</div>
            </div>
            <div className="rounded-xl bg-base-bg p-3 text-center">
              <Dog className="w-5 h-5 text-brand mx-auto mb-1" />
              <div className="text-xs text-ink-light">Жизнь</div>
              <div className="text-sm font-semibold text-ink">{breed.lifespan}</div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {breed.apartmentFriendly && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-soft text-brand text-sm font-medium">
                <HomeIcon className="w-4 h-4" />Подходит для квартиры
              </span>
            )}
            {breed.hypoallergenic && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-safe-light text-safe-dark text-sm font-medium">
                <ShieldCheck className="w-4 h-4" />Гипоаллергенный
              </span>
            )}
            {breed.goodWithKids && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-soft text-accent-dark text-sm font-medium">
                <Baby className="w-4 h-4" />Хорошо с детьми
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Star Ratings */}
      <div className="rounded-2xl bg-base-surface border border-base-muted p-6 mb-6">
        <h2 className="font-display font-bold text-xl text-ink mb-4">Характеристики породы</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {Object.entries(breed.ratings).map(([key, val]) => (
            <div key={key}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm font-medium text-ink">{ratingLabels[key]}</span>
                <span className="text-sm font-semibold text-brand">{val}/5</span>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div
                    key={star}
                    className={`flex-1 h-2.5 rounded-full ${star <= val ? 'bg-accent' : 'bg-base-muted'}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Health risks */}
      <div className="rounded-2xl bg-danger-light border border-danger/20 p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-danger-dark" />
          <h2 className="font-display font-bold text-xl text-ink">Скрытые генетические риски здоровья</h2>
        </div>
        <div className="space-y-2">
          {breed.healthRisks.map((risk, i) => (
            <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/60">
              <span className="w-2 h-2 rounded-full bg-danger mt-1.5 flex-shrink-0" />
              <span className="text-sm text-ink-soft leading-relaxed">{risk}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-ink-light mt-4 leading-relaxed">
          Наличие генетической предрасположенности не означает, что питомец обязательно заболеет. Регулярные осмотры у ветеринара помогают выявить риски на ранней стадии.
        </p>
      </div>

      {/* CTA to calculators */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Link
          to="/tools/calories"
          className="group rounded-2xl bg-brand text-white p-5 flex items-center gap-4 hover:bg-brand-dark transition-colors"
        >
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
            <Calculator className="w-6 h-6 text-accent" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-sm">Рассчитать корм</div>
            <div className="text-xs text-brand-soft">Калькулятор калорий для {breed.name}</div>
          </div>
          <ArrowLeft className="w-5 h-5 rotate-180 text-accent group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link
          to="/tools/budget"
          className="group rounded-2xl bg-accent-soft border border-accent/30 p-5 flex items-center gap-4 hover:bg-accent-soft/70 transition-colors"
        >
          <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center flex-shrink-0">
            <Wallet className="w-6 h-6 text-accent-dark" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-sm text-ink">Рассчитать бюджет</div>
            <div className="text-xs text-ink-light">Стоимость содержания в месяц</div>
          </div>
          <ArrowLeft className="w-5 h-5 rotate-180 text-accent-dark group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
