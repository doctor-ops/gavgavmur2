import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { BREEDS_DATABASE } from '@/data/breeds';
import { ArrowLeft, Dog, Cat, Heart, ShieldCheck, HelpCircle } from 'lucide-react';

export function BreedDetail() {
  const { id } = useParams<{ id: string }>();

  const breed = BREEDS_DATABASE.find((b) => b.id === id);

  if (!breed) {
    return (
      // Обертка bg-base-bg для консистентности фона
      <div className="min-h-screen bg-base-bg flex items-center justify-center p-4">
        <div className="max-w-xl mx-auto text-center animate-fade-in">
          <div className="inline-flex p-4 bg-warn-light text-warn-dark rounded-full mb-4">
            <HelpCircle className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-bold text-ink mb-2 font-display">Порода не найдена</h2>
          <p className="text-ink-soft mb-6 text-sm">К сожалению, запрашиваемая страница питомца отсутствует в нашей базе данных.</p>
          
          <Link 
            to="/wiki" 
            // CTA: bg-accent + text-brand (премиальный стандарт)
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light active:bg-accent-dark text-brand font-bold px-6 py-3 rounded-xl shadow-sm hover:shadow transition-all text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Вернуться в каталог
          </Link>
        </div>
      </div>
    );
  }

  const temperamentLabels: Record<string, string> = {
    active: 'Активный',
    calm: 'Спокойный',
    independent: 'Независимый',
    friendly: 'Дружелюбный'
  };

  return (
    // Оборачиваем в bg-base-bg для мягкого фона страницы
    <div className="min-h-screen bg-base-bg py-12 px-4 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        {/* Кнопка назад — аккуратный бренд-элемент */}
        <Link 
          to="/wiki" 
          className="inline-flex items-center gap-2 text-sm font-bold text-ink-soft hover:text-brand mb-8 transition-all bg-base-surface px-4 py-2.5 rounded-xl border border-base-muted shadow-sm hover:shadow group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> К каталогу пород
        </Link>

        <div className="bg-base-surface rounded-xl2 border border-base-muted shadow-xl overflow-hidden">
          
          {/* Контейнер изображения с эффектом размытия */}
          <div className="relative h-[350px] md:h-[450px] bg-brand-dark overflow-hidden flex items-center justify-center border-b border-base-muted">
            <div 
              className="absolute inset-0 bg-cover bg-center scale-110 blur-xl opacity-30 pointer-events-none"
              style={{ backgroundImage: `url(${breed.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/30 to-brand-dark/10" />

            <img 
              src={breed.image} 
              alt={breed.name} 
              className="relative z-10 max-w-full max-h-full object-contain pointer-events-none p-4 group-hover:scale-[1.03] transition-transform duration-500" 
            />

            {/* Плашка с названием и баджами */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white z-20">
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md text-xs font-bold uppercase tracking-wider border border-white/10">
                  {breed.type === 'dog' ? <Dog className="w-3.5 h-3.5" /> : <Cat className="w-3.5 h-3.5" />}
                  {breed.type === 'dog' ? 'Собаки' : 'Кошки'}
                </span>
                
                {/* Акцент: bg-accent + text-brand */}
                <span className="px-3 py-1.5 rounded-xl bg-accent text-brand text-xs font-bold uppercase tracking-wider shadow-sm">
                  {temperamentLabels[breed.temperament] || 'Дружелюбный'}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-display">{breed.name}</h1>
            </div>
          </div>

          {/* Контентная часть */}
          <div className="p-6 md:p-8 bg-base-surface">
            
            <h2 className="text-xl font-bold text-ink mb-4 flex items-center gap-2 font-display">
              <ShieldCheck className="w-5 h-5 text-brand" /> Основные характеристики
            </h2>
            
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {/* Характеристики: bg-base-bg внутри белой карточки */}
              <div className="bg-base-bg border border-base-muted/60 p-4 rounded-xl">
                <div className="text-[10px] font-bold text-ink-light uppercase tracking-wider mb-1 font-display">📍 Происхождение</div>
                <div className="text-base font-bold text-ink">{breed.origin}</div>
              </div>
              <div className="bg-base-bg border border-base-muted/60 p-4 rounded-xl">
                <div className="text-[10px] font-bold text-ink-light uppercase tracking-wider mb-1 font-display">⏳ Срок жизни</div>
                <div className="text-base font-bold text-ink">{breed.lifeSpan}</div>
              </div>
              <div className="bg-base-bg border border-base-muted/60 p-4 rounded-xl">
                <div className="text-[10px] font-bold text-ink-light uppercase tracking-wider mb-1 font-display">⚖️ Средний вес</div>
                <div className="text-base font-bold text-ink">{breed.weight}</div>
              </div>
            </div>

            <div className="border-t border-base-muted pt-6">
              <h2 className="text-xl font-bold text-ink mb-3 flex items-center gap-2 font-display">
                <Heart className="w-5 h-5 text-brand" /> Описание породы
              </h2>
              <p className="text-ink-soft text-base leading-relaxed whitespace-pre-line font-normal">
                {breed.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
