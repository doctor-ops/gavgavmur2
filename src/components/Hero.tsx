import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Search, Sparkles } from 'lucide-react';

export function Hero() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [heroImage] = useState(() => {
    const petImages = [
      `${import.meta.env.BASE_URL}hero-dog.jpg`,
      `${import.meta.env.BASE_URL}hero-cat.jpg`,
    ];
    return petImages[Math.floor(Math.random() * petImages.length)];
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const raw = query.trim();
    if (!raw) return;
    const { breedsMatching } = await import('@/data/breeds');
    const matches = breedsMatching(raw);
    if (matches.length === 1) {
      navigate(`/wiki/${matches[0].id}`);
      return;
    }
    if (matches.length > 1) {
      navigate(`/wiki?q=${encodeURIComponent(raw)}`);
      return;
    }
    navigate(`/tools/allergens?q=${encodeURIComponent(raw)}`);
  };

  return (
    <section className="relative overflow-hidden bg-brand text-white animate-fade-in w-full">
      {/* Декоративные фоновые элементы */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-light/20 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 xl:py-28 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-16 items-center w-full">
          
          {/* Левая текстовая колонка */}
          <div className="z-10 w-full min-w-0 flex flex-col items-start">
            
            {/* Кнопка о сканере аллергенов: теперь крупнее на десктопе (lg:text-base) */}
            <Link 
              to="/tools/allergens" 
              className="group inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 lg:px-5 lg:py-2.5 rounded-full bg-accent-soft/90 backdrop-blur text-xs sm:text-sm lg:text-base font-bold mb-6 hover:bg-accent-soft transition-all hover:gap-3 max-w-full"
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-accent shrink-0" />
              <span className="text-accent-dark break-words">Новинка: Сканер аллергенов в кормах 2026</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-accent group-hover:translate-x-0.5 transition-transform shrink-0" />
            </Link>

            {/* Главный заголовок: идеальный баланс от мобильных (text-3xl) до ультра-широких мониторов (xl:text-7xl) */}
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight sm:leading-tight lg:leading-tight mb-5 tracking-tight text-white max-w-2xl">
              ГавГавМур — экосистема заботы о ваших питомцах
            </h1>

            {/* Описание под заголовком */}
            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-white/80 leading-relaxed sm:leading-loose mb-8 max-w-xl font-normal">
              Умные калькуляторы кормления, каталог пород, аллерген-сканер и расчёт бюджета. Всё, чтобы ваш хвостик был счастлив и здоров.
            </p>

            {/* Блок кнопок: на мобильных в стек во всю ширину, начиная с планшетов inline */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full sm:w-auto">
              <Link 
                to="/tools/calories" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-4 lg:px-8 lg:py-5 rounded-xl bg-accent text-brand font-extrabold text-base lg:text-lg hover:bg-accent-light active:bg-accent-dark transition-all transform hover:-translate-y-0.5 shadow-lg shadow-accent/20 text-center"
              >
                <span>Рассчитать корм и бюджет</span>
                <ArrowRight className="w-5 h-5 lg:w-6 sm:h-6 shrink-0" />
              </Link>
              <Link 
                to="/tools/quiz" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 lg:px-8 lg:py-5 rounded-xl bg-white/5 text-white/80 font-bold text-base lg:text-lg hover:bg-white/10 transition-all border-2 border-white/30 hover:border-white/60 text-center"
              >
                Подобрать питомца
              </Link>
            </div>

            {/* Поисковая строка */}
            <form onSubmit={handleSearch} className="relative max-w-lg w-full">
              <div className="flex items-center bg-base-surface rounded-xl shadow-xl overflow-hidden p-1.5 border border-base-muted/30 w-full">
                <div className="pl-3 pr-1 sm:pl-4 sm:pr-2">
                  <Search className="w-5 h-5 text-ink-light" />
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Название корма или порода..."
                  className="flex-1 min-w-0 py-2 px-1 text-sm lg:text-base text-ink placeholder-ink-light bg-transparent focus:outline-none font-semibold"
                />
                <button 
                  type="submit" 
                  className="px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg bg-accent text-brand font-bold text-sm lg:text-base hover:bg-accent-light transition-colors shadow-sm shrink-0"
                >
                  Найти
                </button>
              </div>
            </form>
          </div>

          {/* Правая колонка с изображением (скрыта на мобильных, видна от lg: экрана) */}
          <div className="relative hidden lg:block w-full">
            <div className="relative rounded-xl2 overflow-hidden shadow-2xl border-4 border-white/5 bg-brand-light group aspect-[4/3] xl:aspect-[16/11]">
              <img
                src={heroImage}
                alt="Счастливый питомец"
                className="w-full h-full object-cover object-center group-hover:scale-[1.01] transition-transform duration-700 ease-out"
                fetchPriority="high"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Секция статистики внизу */}
        <div className="flex flex-wrap gap-8 sm:gap-16 mt-12 lg:mt-16 xl:mt-20 pt-8 border-t border-white/10">
          <div>
            <div className="font-display font-black text-2xl lg:text-3xl xl:text-4xl text-accent tracking-tight">152</div>
            <div className="text-xs lg:text-sm font-bold text-brand-soft uppercase tracking-wider mt-1">пород в каталоге</div>
          </div>
          <div>
            <div className="font-display font-black text-2xl lg:text-3xl xl:text-4xl text-accent tracking-tight">3 686</div>
            <div className="text-xs lg:text-sm font-bold text-brand-soft uppercase tracking-wider mt-1">кормов в базе</div>
          </div>
        </div>
      </div>
    </section>
  );
}
