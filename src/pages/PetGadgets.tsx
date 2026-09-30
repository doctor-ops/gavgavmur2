import React, { useState, useMemo } from 'react';
import { ToolLayout } from '@/components/ToolLayout';
import { GADGETS_DATA } from '@/data/gadgets';
import { ShoppingCart } from 'lucide-react';

export const PetGadgets: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  
  const categories = useMemo(() => {
    return ['Все', ...Array.from(new Set(GADGETS_DATA.map((g) => g.category)))];
  }, []);

  const filteredGadgets = useMemo(() => {
    return selectedCategory === 'Все' 
      ? GADGETS_DATA 
      : GADGETS_DATA.filter(g => g.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <ToolLayout
      title="Гаджеты для питомцев"
      subtitle="Умные технологичные устройства, которые сделают уход за питомцем проще, а его жизнь — безопаснее и счастливее."
    >
      {/* Фильтры категорий */}
      <div className="flex justify-center gap-2 mb-12 overflow-x-auto pb-4 animate-fade-in">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap ${
              selectedCategory === cat 
                ? 'bg-brand text-white shadow-lg scale-105' 
                : 'bg-base-surface text-ink-soft border border-base-muted hover:bg-base-muted hover:text-ink'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Сетка товаров */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-up">
        {filteredGadgets.length > 0 ? (
          filteredGadgets.map(gadget => (
            <div 
              key={gadget.id} 
              className="group relative rounded-xl2 bg-base-surface border border-base-muted overflow-hidden shadow-sm hover:shadow-xl hover:border-accent/30 transition-all duration-300 flex flex-col hover:-translate-y-1"
            >
              {/* Контейнер изображения */}
              <div className="relative aspect-square w-full bg-base-bg overflow-hidden border-b border-base-muted">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none" />
                <img 
                  src={gadget.image} 
                  alt={gadget.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                />
                <div className="absolute top-3 left-3 z-20">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-white bg-brand/80 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/20 font-display">
                    {gadget.category}
                  </span>
                </div>
              </div>
              
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-bold text-lg text-ink mb-2 font-display line-clamp-2 min-h-[3.5rem] group-hover:text-brand transition-colors">
                  {gadget.name}
                </h3>
                <p className="text-ink-soft text-sm mb-6 flex-grow line-clamp-3 leading-relaxed font-normal">
                  {gadget.description}
                </p>
                
                {/* Футер с ценой и кнопкой действия */}
                <div className="flex items-center justify-between pt-4 border-t border-base-muted mt-auto">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-ink-light font-bold uppercase tracking-tight">Цена:</span>
                    <span className="font-black text-xl text-ink font-display tracking-tight tabular-nums">
                      {gadget.price}
                    </span>
                  </div>
                  <button 
                    className="bg-accent hover:bg-accent-light active:bg-accent-dark text-brand px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all transform active:scale-95 flex items-center gap-2"
                    onClick={() => window.open(gadget.link || '#', '_blank')}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Купить
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-base-surface rounded-xl2 border border-base-muted shadow-sm">
            <p className="text-ink-soft font-medium">В этой категории пока нет гаджетов</p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};
