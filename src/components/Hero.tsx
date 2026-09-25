import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Search, Sparkles } from 'lucide-react';

export function Hero() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const q = query.trim().toLowerCase();
    const breedMatch = [
      'корги', 'овчарка', 'немецкая овчарка', 'лабрадор', 'чихуахуа', 'пудель',
      'сиба', 'сиба-ину', 'мейн-кун', 'сиамская', 'британская', 'сфинкс',
      'бенгальская', 'шотландская', 'вислоухая',
    ].find((b) => b.includes(q) || q.includes(b));
    if (breedMatch) {
      navigate('/wiki');
    } else {
      navigate('/tools/importozameshenie');
    }
  };

  return (
    <section className="relative overflow-hidden bg-brand text-white">
      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full -translate-y-1/3 translate-x-1/3 blur-2xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-light/20 rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left column */}
          <div>
            {/* Micro-banner */}
            <Link
              to="/tools/allergens"
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-soft/90 backdrop-blur text-sm font-medium mb-6 hover:bg-accent-soft transition-all hover:gap-3"
            >
              <Sparkles className="w-4 h-4 text-accent-dark" />
              <span className="text-accent-dark">Новинка: Сканер аллергенов в кормах 2026</span>
              <ArrowRight className="w-4 h-4 text-accent-dark group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <h1 className="font-display font-extrabold text-4xl lg:text-5xl xl:text-6xl leading-tight mb-5">
              ГавГавМур — экосистема заботы о ваших питомцах
            </h1>

            <p className="text-lg text-brand-soft leading-relaxed mb-8 max-w-xl">
              Умные калькуляторы кормления, каталог пород, аллерген-сканер и расчёт бюджета. Всё, чтобы ваш хвостик был счастлив и здоров.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Link
                to="/tools/calories"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-accent text-brand font-bold text-base hover:bg-accent-dark transition-all hover:scale-105 shadow-lg"
              >
                Рассчитать корм и бюджет
                <ArrowRight className="w-5 h-5" />
              <Link
                to="/tools/quiz" // ⬅️ Изменено здесь
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-transparent text-white font-semibold text-base hover:bg-white/10 transition-all border-2 border-white/40"
              >
                Подобрать питомца (Тест)
              </Link>
            </div>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="relative max-w-lg">
              <div className="flex items-center bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="pl-4 pr-2">
                  <Search className="w-5 h-5 text-ink-light" />
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Введите название корма или породу (например: Monge, Корги)..."
                  className="flex-1 py-3.5 text-sm text-ink placeholder-ink-light bg-transparent focus:outline-none"
                />
                <button
                  type="submit"
                  className="m-1.5 px-5 py-2.5 rounded-lg bg-accent text-brand font-semibold text-sm hover:bg-accent-dark transition-colors whitespace-nowrap"
                >
                  Найти
                </button>
              </div>
            </form>
          </div>

          {/* Right column — image */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/16466168/pexels-photo-16466168.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="Счастливая хозяйка с собакой и кошкой в саду"
                className="w-full h-[480px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand/40 via-transparent to-transparent" />
            </div>
            {/* Floating accent badge */}
            <div className="absolute -bottom-4 -left-4 rounded-2xl bg-accent text-brand px-5 py-3 shadow-xl">
              <div className="font-display font-extrabold text-lg leading-none">10к+</div>
              <div className="text-xs mt-0.5">оценок кормов</div>
            </div>
            <div className="absolute -top-4 -right-4 rounded-2xl bg-white text-brand px-5 py-3 shadow-xl">
              <div className="font-display font-extrabold text-lg leading-none">75к+</div>
              <div className="text-xs text-ink-light mt-0.5">пользователей</div>
            </div>
          </div>
        </div>

        {/* Stats bar — full width */}
        <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/15">
          <div>
            <div className="font-display font-extrabold text-2xl lg:text-3xl text-accent">12+</div>
            <div className="text-sm text-brand-soft mt-1">пород в каталоге</div>
          </div>
          <div>
            <div className="font-display font-extrabold text-2xl lg:text-3xl text-accent">4</div>
            <div className="text-sm text-brand-soft mt-1">умных калькулятора</div>
          </div>
          <div>
            <div className="font-display font-extrabold text-2xl lg:text-3xl text-accent">35+</div>
            <div className="text-sm text-brand-soft mt-1">ингредиентов в базе</div>
          </div>
        </div>
      </div>
    </section>
  );
}
