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
    image: "https://placeholder.com",
    description: "Управление со смартфона, настройка расписания и порций."
  },
  {
    id: 2,
    name: "GPS-трекер для ошейника",
    category: "Безопасность",
    price: "3 200 ₽",
    image: "https://placeholder.com",
    description: "Отслеживание местоположения питомца в реальном времени."
  },
  // Добавьте другие гаджеты по аналогии
];

export const PetGadgets: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const categories = ['Все', 'Кормление', 'Безопасность', 'Здоровье'];

  const filteredGadgets = selectedCategory === 'Все' 
    ? GADGETS_DATA 
    : GADGETS_DATA.filter(g => g.category === selectedCategory);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-slate-800">Гаджеты для питомцев</h1>
      
      {/* Фильтры категорий */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === cat 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Сетка товаров */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredGadgets.map(gadget => (
          <div key={gadget.id} className="border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col">
            <img src={gadget.image} alt={gadget.name} className="w-full h-48 object-cover bg-slate-50" />
            <div className="p-4 flex flex-col flex-grow">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-500 mb-1">{gadget.category}</span>
              <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-2">{gadget.name}</h3>
              <p className="text-slate-600 text-sm mb-4 flex-grow">{gadget.description}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="font-bold text-xl text-slate-900">{gadget.price}</span>
                <button className="bg-slate-900 hover:bg-slate-800 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors">
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
