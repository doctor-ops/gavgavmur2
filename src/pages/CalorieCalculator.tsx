import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToolLayout } from '@/components/ToolLayout';
import { foodBrands, type FoodBrand } from '@/data/foodBrands';
import calorieFoods from '@/data/foodCalories.json';
import { ArrowRight, Calculator, Flame, Scale, Search, Wallet, X } from 'lucide-react';

type AnimalType = 'dog' | 'cat';
type Activity = 'low' | 'moderate' | 'high';

type CalorieFood = {
  id: string;
  brand: string;
  line?: string;
  name: string;
  kcalPer100g: number;
};

const foods = calorieFoods as CalorieFood[];

function foodTitle(food: CalorieFood) {
  let name = food.name.trim();
  const stripPrefix = (source: string, token?: string) => {
    const part = token?.trim();
    if (!part || part.toLowerCase() === 'unknown' || part.length < 2) return source;
    const escaped = part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const next = source.replace(new RegExp(`^${escaped}\\s*[-–—:·|/]*\\s*`, 'i'), '').trim();
    return next.length >= 2 ? next : source;
  };
  name = stripPrefix(name, food.brand);
  name = stripPrefix(name, food.line);
  name = stripPrefix(name, food.brand);
  return name;
}

const activityFactors: Record<Activity, number> = {
  low: 1.2,
  moderate: 1.6,
  high: 2.0,
};

function foldBrand(value: string) {
  return value.toLowerCase().replace(/['’`]/g, '').replace(/\s+/g, ' ').trim();
}

function priceBrandFor(food: CalorieFood | null, fallback: FoodBrand): FoodBrand {
  if (!food) return fallback;
  const name = foldBrand(food.brand);
  if (name.length < 2 || name === 'unknown') return fallback;

  const exact = foodBrands.find((brand) => foldBrand(brand.name) === name);
  if (exact) return exact;

  const foodStarts = foodBrands
    .filter((brand) => name.startsWith(`${foldBrand(brand.name)} `))
    .sort((a, b) => foldBrand(b.name).length - foldBrand(a.name).length);
  if (foodStarts[0]) return foodStarts[0];

  const catalogStarts = foodBrands
    .filter((brand) => foldBrand(brand.name).startsWith(`${name} `))
    .sort((a, b) => foldBrand(a.name).length - foldBrand(b.name).length);
  return catalogStarts[0] ?? fallback;
}

export function CalorieCalculator() {
  const [animal, setAnimal] = useState<AnimalType>('dog');
  const [weight, setWeight] = useState(15);
  const [age, setAge] = useState(3);
  const [sterilized, setSterilized] = useState(false);
  const [activity, setActivity] = useState<Activity>('moderate');
  // Используем имя бренда вместо индекса для стабильности данных
  const [selectedBrandName, setSelectedBrandName] = useState(foodBrands[0]?.name || '');
  const [foodQuery, setFoodQuery] = useState('');
  const [selectedFoodId, setSelectedFoodId] = useState('');
  const [showFoods, setShowFoods] = useState(false);
  const selectedLabel = useRef('');
  const ignoreSearchChange = useRef(false);

  // RER - Базовая энергия покоя
  const rer = useMemo(() => Math.round(70 * Math.pow(weight, 0.75)), [weight]);

  // DER - Суточная энергия с поправками
  const factor = useMemo(() => {
    let f = activityFactors[activity];
    if (sterilized) f -= 0.2;
    if (age > 7) f -= 0.2;
    if (age < 1) f += 0.3;
    return Math.max(f, 1.0);
  }, [activity, sterilized, age]);

  const der = Math.round(rer * factor);

  // Поиск выбранного бренда в базе
  const selectedBrand = useMemo(() => 
    foodBrands.find(b => b.name === selectedBrandName) || foodBrands[0], 
    [selectedBrandName]
  );

  const selectedFood = useMemo(
    () => foods.find((food) => food.id === selectedFoodId) ?? null,
    [selectedFoodId]
  );

  const foodMatches = useMemo(() => {
    const query = foodQuery.trim().toLowerCase();
    if (query.length < 2) return [];
    const tokens = query.split(/\s+/);
    return foods
      .filter((food) => {
        const haystack = `${food.brand} ${food.line ?? ''} ${food.name}`.toLowerCase();
        return tokens.every((token) => haystack.includes(token));
      })
      .slice(0, 8);
  }, [foodQuery]);

  const priceBrand = priceBrandFor(selectedFood, selectedBrand);
  const kcalPer100g = selectedFood?.kcalPer100g ?? selectedBrand.kcalPer100g;
  const portionTitle = selectedFood ? foodTitle(selectedFood) : selectedBrand.name;
  const gramsPerDay = Math.round((der / kcalPer100g) * 100);
  const gramsPerMeal = Math.round(gramsPerDay / 2);
  const rubPerDay = Math.round((gramsPerDay / 1000) * priceBrand.pricePerKg);
  const rubPerMonth = rubPerDay * 30;

  return (
    <ToolLayout
      title="Корм и бюджет"
      subtitle="Суточная порция в граммах и оценка расходов на корм. Цена берётся как средняя по марке, это не стоимость конкретной пачки."
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
              className="w-full accent-accent"
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

          <div className="space-y-2 relative">
            <label className="block text-sm font-bold text-ink font-display">Корм из базы</label>
            <div className="relative flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-ink-light" />
              <input
                type="text"
                value={foodQuery}
                placeholder="Название или бренд, например Felix"
                onChange={(event) => {
                  const next = event.target.value;
                  const inputType = (event.nativeEvent as InputEvent).inputType;
                  const userCleared = inputType === 'deleteContentBackward' || inputType === 'deleteContentForward';
                  if (ignoreSearchChange.current) return;
                  if (selectedLabel.current && next === '' && !userCleared) return;
                  selectedLabel.current = '';
                  setSelectedFoodId('');
                  setFoodQuery(next);
                  setShowFoods(true);
                }}
                onFocus={() => setShowFoods(true)}
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-base-muted bg-base-bg text-ink placeholder-ink-light focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all text-sm font-medium"
              />
              {foodQuery && (
                <button
                  type="button"
                  aria-label="Сбросить корм"
                  onClick={() => {
                    selectedLabel.current = '';
                    setFoodQuery('');
                    setSelectedFoodId('');
                    setShowFoods(false);
                  }}
                  className="absolute right-3 text-ink-light hover:text-ink"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {showFoods && foodMatches.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-base-muted rounded-xl shadow-xl z-50 overflow-hidden">
                {foodMatches.map((food) => (
                  <button
                    type="button"
                    key={food.id}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => {
                      const label = foodTitle(food);
                      ignoreSearchChange.current = true;
                      selectedLabel.current = label;
                      setSelectedFoodId(food.id);
                      setFoodQuery(label);
                      setShowFoods(false);
                      window.setTimeout(() => {
                        ignoreSearchChange.current = false;
                      }, 150);
                    }}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-base-bg border-b border-base-muted/40 last:border-b-0"
                  >
                    <span className="block font-medium text-ink">{foodTitle(food)}</span>
                    <span className="text-xs text-ink-light">{food.kcalPer100g} ккал/100г</span>
                  </button>
                ))}
              </div>
            )}
            <p className="text-xs text-ink-light leading-relaxed">
              {selectedFood
                ? `Порция считается по ${selectedFood.kcalPer100g} ккал/100г этого корма. Деньги — оценка по марке «${priceBrand.name}».`
                : 'Если корм не выбран, калории и цена берутся как среднее по выбранной марке.'}
            </p>
          </div>

          {/* Выбор корма */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-ink font-display">Среднее по бренду</label>
            <select
              value={selectedBrandName}
              onChange={(e) => setSelectedBrandName(e.target.value)}
              disabled={Boolean(selectedFood)}
              className="w-full px-4 py-3 rounded-xl border border-base-muted bg-base-bg text-ink focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all text-sm font-medium disabled:opacity-50"
            >
              {foodBrands.map((b) => (
                <option key={b.name} value={b.name}>
                  {b.name} — {b.kcalPer100g} ккал/100г ({b.category})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Результаты */}
        <div className="space-y-4">
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
            
            {/* ИСПРАВЛЕННЫЙ БЛОК ПОПРАВОК: теперь это JSX-элементы, а не строки с тегами */}
            <div className="mt-4 text-xs text-brand-soft leading-relaxed relative z-10">
              Коэффициент активности: <span className="font-bold text-white">×{factor.toFixed(1)}</span>
              {sterilized && <span className="ml-1 text-accent-light"> · −0.2 (стерилизация)</span>}
              {age > 7 && <span className="ml-1 text-accent-light"> · −0.2 (пожилой возраст)</span>}
              {age < 1 && <span className="ml-1 text-accent-light"> · +0.3 (молодое животное)</span>}
            </div>
          </div>

          <div className="rounded-2xl bg-accent-soft border border-accent/30 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Scale className="w-5 h-5 text-accent-dark" />
              <span className="text-sm font-bold text-ink font-display">Граммовки: {portionTitle}</span>
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

          <div className="rounded-2xl bg-base-surface border border-base-muted p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Wallet className="w-5 h-5 text-brand" />
              <span className="text-sm font-bold text-ink font-display">На корм</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-base-bg p-4 border border-base-muted">
                <div className="text-xs text-ink-light mb-1 font-medium">В день</div>
                <div className="font-display font-extrabold text-2xl text-ink">~{rubPerDay.toLocaleString('ru-RU')} ₽</div>
              </div>
              <div className="rounded-xl bg-base-bg p-4 border border-base-muted">
                <div className="text-xs text-ink-light mb-1 font-medium">В месяц</div>
                <div className="font-display font-extrabold text-2xl text-accent-dark">~{rubPerMonth.toLocaleString('ru-RU')} ₽</div>
              </div>
            </div>
            <p className="mt-3 text-xs text-ink-light leading-relaxed">
              ~{priceBrand.pricePerKg.toLocaleString('ru-RU')} ₽/кг · оценка по марке «{priceBrand.name}», не цена пачки.
              {priceBrand.category ? ` Класс: ${priceBrand.category}.` : ''}
            </p>
          </div>

          <div className="rounded-2xl bg-base-surface border border-base-muted p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Flame className="w-5 h-5 text-brand" />
              <span className="text-sm font-bold text-ink font-display">Калорийность</span>
            </div>
            <div className="flex justify-between text-sm text-ink-soft border-b border-base-muted/40 pb-1">
              <span>{selectedFood ? 'Этот корм' : 'Среднее по марке'}</span>
              <span className="font-bold text-ink">{kcalPer100g} ккал/100г</span>
            </div>
          </div>

          <Link
            to="/tools/budget"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-brand text-white font-bold text-sm hover:bg-brand-light transition-all"
          >
            <Wallet className="w-4 h-4" />
            Весь бюджет питомца
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="rounded-xl bg-warn-light p-4 text-sm text-warn-dark leading-relaxed border border-warn/20">
            Расчёт носит ознакомительный характер. Точные нормы кормления определяет ветеринар с учётом состояния здоровья питомца.
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
