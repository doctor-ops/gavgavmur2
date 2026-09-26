// src/pages/PetGadgets.tsx
import React, { useState } from 'react';

interface Gadget {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
}

const GADGETS_DATA: Gadget[] = [
  {
    id: 1,
    name: "Умная автоматическая кормушка",
    category: "Кормление",
    price: "5 490 ₽",
    image: "https://unsplash.com",
    description: "Управление со смартфона, настройка расписания автоматической подачи корма и размеров порций."
  },
  {
    id: 2,
    name: "GPS-трекер для ошейника",
    category: "Безопасность",
    price: "3 200 ₽",
    image: "https://unsplash.com",
    description: "Надежное отслеживание точного местоположения вашего питомца в приложении в реальном времени."
  }
];

export const PetGadgets: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const categories = ['Все', 'Кормление', 'Безопасность', 'Здоровье'];

  const filteredGadgets = selectedCategory === 'Все' 
    ? GADGETS_DATA 
    : GADGETS_DATA.filter(g => g.category === selectedCategory);

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto animate-fade-in">
      {/* Шапка раздела */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-4xl font-extrabold text-ink font-display tracking-tight mb-3">
          Гаджеты для питомцев
        </h1>
        <p className="text-base text-ink-soft leading-relaxed">
          Умные технологичные устройства, которые сделают уход за питомцем проще, а его жизнь — безопаснее и счастливее.
        </p>
      </div>
      
      {/* Фильтры категорий — 30% Брендовый стиль */}
      <div className="flex justify-center gap-2 mb-10 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm whitespace-nowrap transition-all ${
              selectedCategory === cat 
                ? 'bg-brand text-white shadow-md' 
                : 'bg-base-surface text-ink-soft border border-base-muted hover:bg-base-muted hover:text-ink'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Сетка товаров (60% Поверхность) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredGadgets.map(gadget => (
          <div 
            key={gadget.id} 
            className="border border-base-muted rounded-xl2 overflow-hidden shadow-sm hover:shadow-md transition-all bg-base-surface flex flex-col group hover:-translate-y-0.5"
          >
            <div className="relative aspect-video w-full bg-base-bg overflow-hidden border-b border-base-muted">
              <img 
                src={gadget.image} 
                alt={gadget.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            
            <div className="p-5 flex flex-col flex-grow">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand mb-1.5 font-display">
                {gadget.category}
              </span>
              <h3 className="font-bold text-lg text-ink mb-2 font-display line-clamp-2 min-h-[3.5rem]">
                {gadget.name}
              </h3>
              <p className="text-ink-soft text-sm mb-5 flex-grow line-clamp-3 leading-relaxed font-normal">
                {gadget.description}
              </p>
              
              {/* Конверсионный футер карточки (10% Акцент) */}
              <div className="flex items-center justify-between pt-4 border-t border-base-muted mt-auto">
                <span className="font-black text-xl text-ink font-display tracking-tight tabular-nums">
                  {gadget.price}
                </span>
                <button className="bg-accent hover:bg-accent-light active:bg-accent-dark text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:shadow transition-all transform active:scale-98">
                  Подробнее
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
