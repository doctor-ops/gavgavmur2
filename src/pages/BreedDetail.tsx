import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { BREEDS_DATABASE } from '@/data/breeds';
import { ArrowLeft, Dog, Cat, Heart, ShieldCheck, HelpCircle } from 'lucide-react';

export function BreedDetail() {
  const { id } = useParams<{ id: string }>();

  // Находим нужную породу в базе по ID
  const breed = BREEDS_DATABASE.find((b) => b.id === id);

  // Если порода с таким ID не найдена в базе
  if (!breed) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center animate-fade-in">
        {/* Использована мягкая системная плашка предупреждения */}
        <div className="inline-flex p-4 bg-warn-light text-warn-dark rounded-full mb-4">
          <HelpCircle className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-ink mb-2 font-display">Порода не найдена</h2>
        <p className="text-ink-soft mb-6 text-sm">К сожалению, запрашиваемая страница питомца отсутствует в нашей базе данных.</p>
        
        {/* 10% АКЦЕНТА: Коралловая CTA-кнопка возврата */}
        <Link 
          to="/wiki" 
          className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light active:bg-accent-dark text-white font-bold px-6 py-3 rounded-xl shadow-sm hover:shadow transition-all text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Вернуться в каталог
        </Link>
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
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
      {/* Кнопка назад — аккуратный бренд-элемент */}
      <Link 
        to="/wiki" 
        className="inline-flex items-center gap-2 text-sm font-bold text-ink-soft hover:text-brand mb-8 transition-all bg-base-surface px-4 py-2.5 rounded-xl border border-base-muted shadow-sm hover:shadow"
      >
        <ArrowLeft className="w-4 h-4" /> К каталогу пород
      </Link>

      <div className="bg-base-surface rounded-xl2 border border-base-muted shadow-xl overflow-hidden">
        
        {/* Контейнер изображения с эффектом размытого заднего фона */}
        <div className="relative h-[350px] md:h-[450px] bg-brand-dark overflow-hidden flex items-center justify-center border-b border-base-muted">
          
          {/* Задний план: та же картинка, растянутая и размытая */}
          <div 
            className="absolute inset-0 bg-cover bg-center scale-110 blur-xl opacity-25 pointer-events-none"
            style={{ backgroundImage: `url(${breed.image})` }}
          />
          
          {/* Затенение поверх размытия для максимального контраста с заголовком */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/30 to-brand-dark/10" />

          {/* Передний план: оригинальное фото */}
          <img 
            src={breed.image} 
            alt={breed.name} 
            className="relative z-10 max-w-full max-h-full object-contain pointer-events-none p-4" 
          />

          {/* Плашка с названием и баджами */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white z-20">
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md text-xs font-bold uppercase tracking-wider border border-white/10">
                {breed.type === 'dog' ? <Dog className="w-3.5 h-3.5" /> : <Cat className="w-3.5 h-3.5" />}
                {breed.type === 'dog' ? 'Собаки' : 'Кошки'}
              </span>
              
              {/* Выделение характера оранжевым акцентом (10%) */}
              <span className="px-3 py-1.5 rounded-xl bg-accent text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                {temperamentLabels[breed.temperament] || 'Дружелюбный'}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-display">{breed.name}</h1>
          </div>
        </div>

        {/* Контентная часть */}
        <div className="p-6 md:p-8 bg-base-surface">
          
          {/* Сетка основных характеристик */}
          <h2 className="text-xl font-bold text-ink mb-4 flex items-center gap-2 font-display">
            <ShieldCheck className="w-5 h-5 text-brand" /> Основные характеристики
          </h2>
          
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
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

          {/* Подробное описание */}
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
  );
}
