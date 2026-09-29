import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Search, Sparkles } from 'lucide-react';

export function Hero() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [heroImage, setHeroImage] = useState('');

  useEffect(() => {
    const petImages = [
      '/hero-dog.webp', 
      '/hero-cat.webp'  
    ];
    
    const randomIndex = Math.floor(Math.random() * petImages.length);
    setHeroImage(petImages[randomIndex]);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const q = query.trim().toLowerCase();
    const breedMatch = ['корги', 'овчарка', 'лабрадор', 'чихуахуа', 'пудель', 'сиба', 'мейн-кун', 'сиамская', 'британская', 'сфинкс'].find((b) => b.includes(q) || q.includes(b));
    if (breedMatch) { navigate('/wiki'); } else { navigate('/tools/importozameshenie'); }
  };

  if (!heroImage) return null;

  return (
    <section className="relative overflow-hidden bg-brand text-white animate-fade-in">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-light/20 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div className="z-10">
            <Link to="/tools/allergens" className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-soft/90 backdrop-blur text-sm font-bold mb-6 hover:bg-accent-soft transition-all hover:gap-3">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-accent-dark">Новинка: Сканер аллергенов в кормах 2026</span>
              <ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <h1 className="font-display font-extrabold text-4xl lg:text-5xl xl:text-6xl leading-tight mb-5 tracking-tight text-white">
              ГавГавМур — экосистема заботы о ваших питомцах
            </h1>

            <p className="text-lg lg:text-xl text-white/80 leading-loose mb-8 max-w-xl font-normal">
              Умные калькуляторы кормления, каталог пород, аллерген-сканер и расчёт бюджета. Всё, чтобы ваш хвостик был счастлив и здоров.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/tools/calories" className="flex-1 inline-flex items-center justify-center gap-3 px-8 py-5 rounded-xl bg-accent text-brand font-extrabold text-lg hover:bg-accent-light active:bg-accent-dark transition-all transform hover:-translate-y-0.5 shadow-lg shadow-accent/20 whitespace-nowrap">
                Рассчитать корм и бюджет
                <ArrowRight className="w-6 h-6" />
              </Link>
              <Link to="/tools/quiz" className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-5 rounded-xl bg-white/5 text-white/80 font-bold text-lg hover:bg-white/10 transition-all border-2 border-white/30 hover:border-white/60 whitespace-nowrap">
                Подобрать питомца
              </Link>
            </div>

            <form onSubmit={handleSearch} className="relative max-w-lg">
              <div className="flex items-center bg-base-surface rounded-xl shadow-xl overflow-hidden p-1.5 border border-base-muted/30">
                <div className="pl-4 pr-2">
                  <Search className="w-5 h-5 text-ink-light" />
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Название корма или порода..."
                  className="flex-1 py-2 px-1 text-sm text-ink placeholder-ink-light bg-transparent focus:outline-none font-semibold"
                />
                <button type="submit" className="px-6 py-2.5 rounded-lg bg-accent text-brand font-bold text-sm hover:bg-accent-light transition-colors whitespace-nowrap shadow-sm">
                  Найти
                </button>
              </div>
            </form>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative rounded-xl2 overflow-hidden shadow-2xl border-4 border-white/5 bg-brand-light group">
              <img
                src={heroImage}
                alt="Счастливый питомец"
                className="w-full h-[500px] object-cover object-center group-hover:scale-[1.01] transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 via-transparent to-transparent pointer-events-none" />
            </div>
            <div className="absolute -bottom-6 -left-4 rounded-xl bg-accent text-brand px-5 py-3 pb-4 shadow-xl transform hover:scale-105 transition-transform duration-300">
              <div className="font-display font-black text-xl leading-none">10к+</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-white mt-1">отзывов о кормах</div>
            </div>
            <div className="absolute -top-4 -right-4 rounded-xl bg-base-surface text-ink px-5 py-3 shadow-xl border border-base-muted transform hover:scale-105 transition-transform duration-300">
              <div className="font-display font-black text-xl text-brand leading-none">75к+</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-ink-light mt-1">счастливых хвостов</div>
            </div>
          </div>

        </div>

        <div className="grid grid-cols-3 gap-6 mt-16 pt-8 border-t border-white/10">
          <div className="text-center sm:text-left">
            <div className="font-display font-black text-2xl lg:text-3xl text-accent tracking-tight">12+</div>
            <div className="text-xs font-bold text-brand-soft uppercase tracking-wider mt-1">пород в каталоге</div>
          </div>
          <div className="text-center sm:text-left">
            <div className="font-display font-black text-2xl lg:text-3xl text-accent tracking-tight">5</div>
            <div className="text-xs font-bold text-brand-soft uppercase tracking-wider mt-1">умных калькуляторов</div>
          </div>
          <div className="text-center sm:text-left">
            <div className="font-display font-black text-2xl lg:text-3xl text-accent tracking-tight">35+</div>
            <div className="text-xs font-bold text-brand-soft uppercase tracking-wider mt-1">ингредиентов в базе</div>
          </div>
        </div>
      </div>
    </section>
  );
}
