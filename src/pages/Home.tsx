import { Hero } from '@/components/Hero';
import { SmartServices } from '@/components/SmartServices';
import { Breeds } from '@/components/Breeds';
import { Care } from '@/components/Care';
import { FoodTypes } from '@/components/FoodTypes';
import { Contacts } from '@/components/Contacts';

export function Home() {
  return (
    // Оборачиваем в основной фон, чтобы избежать белых щелей между секциями 
    <div className="bg-base-bg">
      {/* 1. Первый экран: Эмоциональный захват и главный CTA */}
      <Hero />

      {/* 2. Быстрый доступ: Инструменты и калькуляторы (Конверсия) */}
      <SmartServices />

      {/* 3. Образовательный блок: Каталог пород (Интерес) */}
      <Breeds />

      {/* 4. Практические советы: Уход за питомцами (Польза) */}
      <Care />

      {/* 5. Экспертный блок: Питание и корма (Авторитет) */}
      <FoodTypes />

      {/* 6. Финальный шаг: Обратная связь (Лояльность) */}
      <Contacts />
    </div>
  );
}
