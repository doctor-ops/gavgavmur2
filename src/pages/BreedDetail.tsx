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
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="inline-flex p-4 bg-amber-50 text-amber-600 rounded-full mb-4">
          <HelpCircle className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Порода не найдена</h2>
        <p className="text-gray-500 mb-6">К сожалению, запрашиваемая страница питомца отсутствует в нашей базе данных.</p>
        <Link to="/wiki" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-all">
          <ArrowLeft className="w-4 h-4" /> Вернуться в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Кнопка назад */}
      <Link to="/wiki" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-indigo-600 mb-8 transition-all bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm">
        <ArrowLeft className="w-4 h-4" /> К каталогу пород
      </Link>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
        
        {/* Инновационный контейнер с эффектом размытого заднего фона */}
        <div className="relative h-[350px] md:h-[450px] bg-slate-950 overflow-hidden flex items-center justify-center">
          
          {/* 1. Задний план: та же картинка, растянутая и сильно размытая */}
          <div 
            className="absolute inset-0 bg-cover bg-center scale-110 blur-xl opacity-40 pointer-events-none"
            style={{ backgroundImage: `url(${breed.image})` }}
          />
          
          {/* Темное затенение поверх размытия для контраста с текстом */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-slate-950/10" />

          {/* 2. Передний план: четкое оригинальное фото без обрезки */}
          <img 
            src={breed.image} 
            alt={breed.name} 
            className="relative z-10 max-w-full max-h-full object-contain pointer-events-none p-2 animate-fade-in" 
          />

          {/* Плашка с названием и баджами поверх фото */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white z-20">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
                {breed.type === 'dog' ? <Dog className="w-3.5 h-3.5" /> : <Cat className="w-3.5 h-3.5" />}
                {breed.type === 'dog' ? 'Собаки' : 'Кошки'}
              </span>
              <span className="px-3 py-1 rounded-full bg-indigo-500 text-xs font-bold uppercase tracking-wider">
                {breed.temperament === 'active' ? 'Активный' : breed.temperament === 'calm' ? 'Спокойный' : breed.temperament === 'independent' ? 'Независимый' : 'Дружелюбный'}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight">{breed.name}</h1>
          </div>
        </div>

        {/* Контентная часть */}
        <div className="p-6 md:p-8">
          
          {/* Сетка основных характеристик */}
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-600" /> Основные характеристики
          </h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-slate-50 border border-gray-100 p-4 rounded-2xl">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">📍 Происхождение</div>
              <div className="text-base font-bold text-gray-800">{breed.origin}</div>
            </div>
            <div className="bg-slate-50 border border-gray-100 p-4 rounded-2xl">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">⏳ Срок жизни</div>
              <div className="text-base font-bold text-gray-800">{breed.lifeSpan}</div>
            </div>
            <div className="bg-slate-50 border border-gray-100 p-4 rounded-2xl">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">⚖️ Средний вес</div>
              <div className="text-base font-bold text-gray-800">{breed.weight}</div>
            </div>
          </div>

          {/* Подробное описание */}
          <div className="border-t border-gray-100 pt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Heart className="w-5 h-5 text-indigo-600" /> Описание породы
            </h2>
            <p className="text-gray-600 text-base leading-relaxed whitespace-pre-line">
              {breed.description}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
