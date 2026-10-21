import React, { useState, useMemo } from 'react';
import { ToolLayout } from '@/components/ToolLayout';
import { GADGETS_DATA, Gadget } from '@/data/gadgets';
import { ShoppingCart, X, Info } from 'lucide-react';

function mediaSrc(src: string) {
  if (/^https?:/i.test(src)) return src;
  return `${import.meta.env.BASE_URL}${src.replace(/^\//, '')}`;
}

function shopUrl(link?: string) {
  if (!link || !/^https:\/\//i.test(link)) return null;
  return link;
}

export const PetGadgets: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [selectedGadget, setSelectedGadget] = useState<Gadget | null>(null);

  const categories = useMemo(() => {
    return ['Все', ...Array.from(new Set(GADGETS_DATA.map((g) => g.category)))];
  }, []);

  const filteredGadgets = useMemo(() => {
    return selectedCategory === 'Все' 
      ? GADGETS_DATA 
      : GADGETS_DATA.filter(g => g.category === selectedCategory);
  }, [selectedCategory]);

  const purchaseUrl = shopUrl(selectedGadget?.link);

  return (
    <ToolLayout
      title="Гаджеты для питомцев"
      subtitle="Умные технологичные устройства, которые сделают уход за питомцем проще, а его жизнь — безопаснее и счастливее."
    >
      {/* Фильтры категорий */}
      {/* ИСПРАВЛЕНО: Добавлены flex-nowrap для удержания кнопок в линию, scrollbar-hidden и корректные отступы */}
      <div className="w-full overflow-x-auto pb-3 mb-8 flex items-center justify-start sm:justify-center gap-2 max-w-full no-scrollbar touch-pan-x flex-nowrap px-4 sm:px-0">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            {/* ИСПРАВЛЕНО: Добавлен flex-shrink-0, чтобы кнопки не сжимались, уменьшены паддинги на мобильных */}
            className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
              selectedCategory === cat 
                ? 'bg-brand text-white shadow-md scale-102' 
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
              <div className="relative aspect-square w-full bg-base-bg overflow-hidden border-b border-base-muted">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none" />
                <img 
                  src={mediaSrc(gadget.image)} 
                  alt={gadget.name}
                  loading="lazy"
                  decoding="async"
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
                
                <div className="flex items-center justify-between pt-4 border-t border-base-muted mt-auto gap-2">
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-[10px] text-ink-light font-bold uppercase tracking-tight">Цена:</span>
                    <span className="font-black text-sm sm:text-base text-ink font-display tracking-tight tabular-nums whitespace-nowrap overflow-hidden text-ellipsis">
                      {gadget.price}
                    </span>
                  </div>
                  <button 
                    onClick={() => setSelectedGadget(gadget)}
                    className="bg-brand text-white px-4 py-2 rounded-xl text-xs font-bold transition-all hover:bg-brand-dark"
                  >
                    Подробнее
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

      {/* МОДАЛЬНОЕ ОКНО С ПОЛНЫМ ОПИСАНИЕМ */}
      {selectedGadget && (
        /* ИСПРАВЛЕНО: Добавлен overflow-y-auto для оверлея, чтобы при 150% зуме на старых телефонах модалка прокручивалась скроллом */
        <div 
          className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-2 sm:p-4 bg-brand/60 backdrop-blur-sm overflow-y-auto"
          onClick={() => setSelectedGadget(null)}
        >
          <div 
            className="bg-base-surface w-full max-w-4xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden animate-scale-in relative flex flex-col md:flex-row my-auto max-h-none md:max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Кнопка закрытия */}
            <button 
              onClick={() => setSelectedGadget(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 p-2 bg-white/90 backdrop-blur-sm rounded-full text-ink hover:bg-white transition-colors shadow-md active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>
      
            {/* Левая часть: Большое фото */}
            {/* ИСПРАВЛЕНО: Ограничена максимальная высота картинки на телефонах до 40% от экрана, чтобы она не вытесняла текст */}
            <div className="w-full md:w-1/2 max-h-[40vh] md:max-h-none aspect-square md:aspect-auto bg-base-bg flex-shrink-0">
              <img 
                src={mediaSrc(selectedGadget.image)} 
                alt={selectedGadget.name}
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
      
            {/* Правая часть: Детали */}
            {/* ИСПРАВЛЕНО: flex-col теперь имеет фиксированную/максимальную высоту и не растягивается бесконечно */}
            <div className="w-full md:w-1/2 p-5 sm:p-8 flex flex-col max-h-[55vh] md:max-h-[90vh] bg-base-surface">
              
              {/* ВЕРХНЯЯ ЧАСТЬ: СКРОЛЛИРУЕМАЯ (Название, цена и описание) */}
              {/* ИСПРАВЛЕНО: overflow-y-auto добавлен только сюда. Кнопка ниже не скроллится! */}
              <div className="flex-1 overflow-y-auto pr-1 mb-4 min-h-0 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand bg-brand-soft/20 px-2 py-1 rounded font-display">
                    {selectedGadget.category}
                  </span>
                </div>
                
                <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-extrabold text-ink leading-tight break-words">
                  {selectedGadget.name}
                </h2>
                
                {/* Длинное описание: теперь скроллится только этот блок, если букв слишком много */}
                <div className="flex items-start gap-2 text-ink-soft leading-relaxed text-xs sm:text-sm font-normal pt-2">
                  <Info className="w-4 h-4 sm:w-5 sm:h-5 text-brand flex-shrink-0 mt-0.5" />
                  <p className="break-words">{selectedGadget.fullDescription}</p>
                </div>
              </div>
              
              {/* НИЖНЯЯ ЧАСТЬ: СТАТИЧНАЯ И ЗАКРЕПЛЕННАЯ (Цена и Кнопка покупки) */}
              {/* ИСПРАВЛЕНО: Этот блок всегда находится внизу экрана и виден без скролла */}
              <div className="pt-4 border-t border-base-muted flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-base-surface flex-shrink-0">
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] text-ink-light font-bold uppercase tracking-tight">Цена товара:</span>
                  <span className="text-xl sm:text-2xl font-display font-black text-accent-dark tracking-tight whitespace-nowrap">
                    {selectedGadget.price}
                  </span>
                </div>
            
                <div className="flex-1 sm:flex-initial">
                  {purchaseUrl ? (
                    <a
                      href={purchaseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:px-6 py-3 rounded-xl bg-accent text-brand font-extrabold text-sm sm:text-base shadow-lg hover:bg-accent-light transition-all transform active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                      <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                      Купить гаджет
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="w-full sm:px-6 py-3 rounded-xl bg-base-muted text-ink-soft font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 cursor-not-allowed whitespace-nowrap"
                    >
                      <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                      Нет ссылки
                    </button>
                  )}
                </div>
              </div>
            
            </div>
        </div>
      )}
    </ToolLayout>
  );
};
