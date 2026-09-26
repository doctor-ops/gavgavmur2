import React, { useState } from 'react';
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
    <section className="relative overflow-hidden bg-brand text-white animate-fade-in">
      {/* Мягкие декоративные бэкграунд-эффекты */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-light/20 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          
          {/* Левая колонка с текстом и действиями */}
          <div>
            {/* Микро-баннер новинки (10% Акцента) */}
            <Link
              to="/tools/allergens"
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-soft/90 backdrop-blur text-sm font-bold mb-6 hover:bg-accent-soft transition-all hover:gap-3"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-accent-dark">Новинка: Сканер аллергенов в кормах 2026</span>
              <ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <h1 className="font-display font-extrabold text-4xl lg:text-5xl xl:text-6xl leading-tight mb-5 tracking-tight">
              ГавГавМур — экосистема заботы о ваших питомцах
            </h1>

            <p className="text-lg text-brand-soft leading-relaxed mb-8 max-w-xl font-normal">
              Умные калькуляторы кормления, каталог пород, аллерген-сканер и расчёт бюджета. Всё, чтобы ваш хвостик был счастлив и здоров.
            </p>

            {/* Конверсионные кнопки действий */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {/* Главная CTA-кнопка (10% кораллового цвета) */}
              <Link
                to="/tools/calories"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-accent text-white font-extrabold text-base hover:bg-accent-light active:bg-accent-dark transition-all transform hover:-translate-y-0.5 shadow-lg shadow-accent/20"
              >
                Рассчитать корм и budget
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link
                to="/tools/quiz"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white/5 text-white font-bold text-base hover:bg-white/10 transition-all border-2 border-white/20 hover:border-white/40"
              >
                Подобрать питомца (Тест)
              </Link>
            </div>

            {/* Поисковая строка экосистемы */}
            <form onSubmit={handleSearch} className="relative max-w-lg">
              <div className="flex items-center bg-base-surface rounded-xl shadow-xl overflow-hidden p-1.5 border border-base-muted/30">
                <div className="pl-3 pr-2">
                  <Search className="w-5 h-5 text-ink-light" />
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Название корма или порода (Monge, Корги)..."
                  className="flex-1 py-2 px-1 text-sm text-ink placeholder-ink-light bg-transparent focus:outline-none font-semibold"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-brand text-white font-bold text-sm hover:bg-brand-light transition-colors whitespace-nowrap shadow-sm"
                >
                  Найти
                </button>
              </div>
            </form>
          </div>

          {/* Правая колонка с восстановленным оригинальным фото */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-xl2 overflow-hidden shadow-2xl border-4 border-white/5 group">
              <img
                src="https://pexels.com"
                alt="Счастливая хозяйка с английским сеттером и черно-белым котом в саду"
                className="w-full h-[500px] object-cover object-center group-hover:scale-[1.01] transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 via-transparent to-transparent pointer-events-none" />
            </div>
            
            {/* Всплывающие плашки статистики */}
            <div className="absolute -bottom-4 -left-4 rounded-xl bg-accent text-white px-5 py-3 shadow-xl transform hover:scale-105 transition-transform duration-300">
              <div className="font-display font-black text-xl leading-none">10к+</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-white/90 mt-1">оценок кормов</div>
            </div>
            
            <div className="absolute -top-4 -right-4 rounded-xl bg-base-surface text-ink px-5 py-3 shadow-xl border border-base-muted transform hover:scale-105 transition-transform duration-300">
              <div className="font-display font-black text-xl text-brand leading-none">75к+</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-ink-light mt-1">пользователей</div>
            </div>
          </div>

        </div>

        {/* Статистический блок (Нижняя линия) */}
        <div className="grid grid-cols-3 gap-6 mt-16 pt-8 border-t border-white/10">
          <div>
            <div className="font-display font-black text-2xl lg:text-3xl text-accent tracking-tight">12+</div>
            <div className="text-xs font-bold text-brand-soft uppercase tracking-wider mt-1">пород в каталоге</div>
          </div>
          <div>
            <div className="font-display font-black text-2xl lg:text-3xl text-accent tracking-tight">5</div>
            <div className="text-xs font-bold text-brand-soft uppercase tracking-wider mt-1">умных калькуляторов</div>
          </div>
          <div>
            <div className="font-display font-black text-2xl lg:text-3xl text-accent tracking-tight">35+</div>
            <div className="text-xs font-bold text-brand-soft uppercase tracking-wider mt-1">ингредиентов в базе</div>
          </div>
        </div>
      </div>
    </section>
  );
}
