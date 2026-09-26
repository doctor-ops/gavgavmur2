import { useState, useMemo } from 'react';
import { ToolLayout } from '@/components/ToolLayout';
import { foodBrands } from '@/data/foodBrands';
import { Calculator, Flame, Scale } from 'lucide-react';

type AnimalType = 'dog' | 'cat';
type Activity = 'low' | 'moderate' | 'high';

const activityFactors: Record<Activity, number> = {
  low: 1.2,
  moderate: 1.6,
  high: 2.0,
};

export function CalorieCalculator() {
  const [animal, setAnimal] = useState<AnimalType>('dog');
  const [weight, setWeight] = useState(15);
  const [age, setAge] = useState(3);
  const [sterilized, setSterilized] = useState(false);
  const [activity, setActivity] = useState<Activity>('moderate');
  const [brandIdx, setBrandIdx] = useState(0);

  const rer = useMemo(() => Math.round(70 * Math.pow(weight, 0.75)), [weight]);
  const factor = useMemo(() => {
    let f = activityFactors[activity];
    if (sterilized) f -= 0.2;
    if (age > 7) f -= 0.2;
    if (age < 1) f += 0.3;
    return Math.max(f, 1.0);
  }, [activity, sterilized, age]);

  const der = Math.round(rer * factor);
  const selectedBrand = foodBrands[brandIdx];
  const gramsPerDay = Math.round((der / selectedBrand.kcalPer100g) * 100);
  const gramsPerMeal = Math.round(gramsPerDay / 2);

  return (
    <ToolLayout
      title="Калькулятор калорий"
      subtitle="Рассчитайте суточную норму калорий (RER/DER) для вашего питомца и переведите её в граммы выбранного корма."
    >
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Форма ввода данных */}
        <div className="rounded-2xl bg-base-surface border border-base-muted p-6 space-y-5 shadow-sm">
          {/* Тип животного */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-ink font-display">Тип животного</label>
            <div className="grid grid-cols-2 gap-2">
              {(['dog', 'cat'] as AnimalType[]).map((a) => (
                <button
                  key={a}
                  onClick={() => setAnimal(a)}
                  className={`py-3 rounded-xl text-sm font-bold transition-all ${
                    animal === a
                      ? 'bg-brand text-white shadow-md'
                      : 'bg-base-bg text-ink-light hover:bg-base-muted'
                  }`}
                >
                  {a === 'dog' ? 'Собака' : 'Кошка'}
                </button>
              ))}
            </div>
          </div>

          {/* Вес */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-bold text-ink font-display">Вес</label>
              <span className="text-sm font-bold text-brand">{weight} кг</span>
            </div>
            <input
              type="range"
              min={animal === 'dog' ? 1 : 2}
              max={animal === 'dog' ? 60 : 10}
              step={0.5}
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full accent-accent" // Используем коралловый акцент для слайдера
            />
            <div className="flex justify-between text-xs text-ink-light mt-1">
              <span>{animal === 'dog' ? '1 кг' : '2 кг'}</span>
              <span>{animal === 'dog' ? '60 кг' : '10 кг'}</span>
            </div>
          </div>

          {/* Возраст */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-bold text-ink font-display">Возраст</label>
              <span className="text-sm font-bold text-brand">{age} {age === 1 ? 'год' : age < 5 ? 'года' : 'лет'}</span>
            </div>
            <input
              type="range"
              min={0.5}
              max={20}
              step={0.5}
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full accent-accent"
            />
          </div>

          {/* Стерилизация */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-ink font-display">Стерилизация</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setSterilized(true)}
                className={`py-3 rounded-xl text-sm font-bold transition-all ${
                  sterilized ? 'bg-brand text-white shadow-md' : 'bg-base-bg text-ink-light hover:bg-base-muted'
                }`}
              >
                Да
              </button>
              <button
                onClick={() => setSterilized(false)}
                className={`py-3 rounded-xl text-sm font-bold transition-all ${
                  !sterilized ? 'bg-brand text-white shadow-md' : 'bg-base-bg text-ink-light hover:bg-base-muted'
                }`}
              >
                Нет
              </button>
            </div>
          </div>

          {/* Активность */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-ink font-display">Уровень активности</label>
            <div className="grid grid-cols-3 gap-2">
              {([
                { val: 'low' as Activity, label: 'Низкий' },
                { val: 'moderate' as Activity, label: 'Умеренный' },
                { val: 'high' as Activity, label: 'Высокий' },
              ]).map((a) => (
                <button
                  key={a.val}
                  onClick={() => setActivity(a.val)}
                  className={`py-3 rounded-xl text-sm font-bold transition-all ${
                    activity === a.val
                      ? 'bg-brand text-white shadow-md'
                      : 'bg-base-bg text-ink-light hover:bg-base-muted'
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          {/* Выбор корма */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-ink font-display">Корм</label>
            <select
              value={brandIdx}
              onChange={(e) => setBrandIdx(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-base-muted bg-base-bg text-ink focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all text-sm font-medium"
            >
              {foodBrands.map((b, i) => (
                <option key={b.name} value={i}>
                  {b.name} — {b.kcalPer100g} ккал/100г ({b.category})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Результаты */}
        <div className="space-y-4">
          {/* Блок с калориями: Премиальный темный стиль */}
          <div className="rounded-2xl bg-brand text-white p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
            
            <div className="flex items-center gap-2 mb-6 relative z-10">
              <Calculator className="w-5 h-5 text-accent" />
              <span className="text-sm font-bold text-brand-soft uppercase tracking-wider">Результат расчёта</span>
            </div>
            <div className="grid grid-cols-2 gap-4 relative z-10">
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm border border-white/5">
                <div className="text-xs text-brand-soft mb-1 font-medium">RER (базовый)</div>
                <div className="font-display font-extrabold text-2xl text-accent">{rer}</div>
                <div className="text-xs text-brand-soft">ккал/день</div>
              </div>
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm border border-white/5">
                <div className="text-xs text-brand-soft mb-1">DER (с поправками)</div>
                <div className="font-display font-extrabold text-2xl text-accent">{der}</div>
                <div className="text-xs text-brand-soft">ккал/день</div>
              </div>
            </div>
            <div className="mt-4 text-xs text-brand-soft leading-relaxed relative z-10">
              Коэффициент активности: <span className="font-bold text-white">×{factor.toFixed(1)}</span>
              {sterilized && ' · <span className="text-accent-light">−0.2 (стерилизация)</span>'}
              {age > 7 && ' · <span className="text-accent-light">−0.2 (пожилой возраст)</span>'}
              {age < 1 && ' · <span className="text-accent-light">+0.3 (молодое животное)</span>'}
            </div>
          </div>

          {/* Блок с граммовками: Коралловый акцент */}
          <div className="rounded-2xl bg-accent-soft border border-accent/30 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Scale className="w-5 h-5 text-accent-dark" />
              <span className="text-sm font-bold text-ink font-display">Граммовки: {selectedBrand.name}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/50 rounded-xl p-4 border border-white/50">
                <div className="text-xs text-ink-light mb-1 font-medium">В день</div>
                <div className="font-display font-extrabold text-2xl text-accent-dark">{gramsPerDay} г</div>
              </div>
              <div className="bg-white/50 rounded-xl p-4 border border-white/50">
                <div className="text-xs text-ink-light mb-1 font-medium">За 1 приём (2×/день)</div>
                <div className="font-display font-extrabold text-2xl text-accent-dark">{gramsPerMeal} г</div>
              </div>
            </div>
          </div>

          {/* Информация о корме */}
          <div className="rounded-2xl bg-base-surface border border-base-muted p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Flame className="w-5 h-5 text-brand" />
              <span className="text-sm font-bold text-ink font-display">О выбранном корме</span>
            </div>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-ink-soft leading-relaxed">
              <div className="flex justify-between border-b border-base-muted/40 pb-1">
                <span>Калорийность:</span>
                <span className="font-bold text-ink">{selectedBrand.kcalPer100g} ккал/100г</span>
              </div>
              <div className="flex justify-between border-b border-base-muted/40 pb-1">
                <span>Класс:</span>
                <span className="font-bold text-ink">{selectedBrand.category}</span>
              </div>
              <div className="flex justify-between border-b border-base-muted/40 pb-1">
                <span>Цена:</span>
                <span className="font-bold text-ink">~{selectedBrand.pricePerKg} ₽/кг</span>
              </div>
              <div className="flex justify-between border-b border-base-muted/40 pb-1">
                <span>За день:</span>
                <span className="font-bold text-accent-dark">~{Math.round((gramsPerDay / 1000) * selectedBrand.pricePerKg)} ₽</span>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="rounded-xl bg-warn-light p-4 text-sm text-warn-dark leading-relaxed border border-warn/20">
            Расчёт носит ознакомительный характер. Точные нормы кормления определяет ветеринар с учётом состояния здоровья питомца.
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
