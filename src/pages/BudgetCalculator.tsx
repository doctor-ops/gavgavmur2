import { useState, useMemo } from 'react';
import { ToolLayout } from '@/components/ToolLayout';
import { Wallet, Plus, Minus, TrendingUp } from 'lucide-react';

type AnimalType = 'dog' | 'cat';
type Size = 'small' | 'medium' | 'large';

interface CostCategory {
  key: string;
  label: string;
  monthly: number;
  icon: typeof Wallet;
}

const baseCosts: Record<AnimalType, Record<Size, CostCategory[]>> = {
  dog: {
    small: [
      { key: 'food', label: 'Корм', monthly: 2500, icon: Wallet },
      { key: 'vet', label: 'Ветеринария и прививки', monthly: 1500, icon: Wallet },
      { key: 'grooming', label: 'Груминг', monthly: 800, icon: Wallet },
      { key: 'insurance', label: 'Страховка', monthly: 600, icon: Wallet },
      { key: 'toys', label: 'Игрушки и амуниция', monthly: 500, icon: Wallet },
    ],
    medium: [
      { key: 'food', label: 'Корм', monthly: 4000, icon: Wallet },
      { key: 'vet', label: 'Ветеринария и прививки', monthly: 2000, icon: Wallet },
      { key: 'grooming', label: 'Груминг', monthly: 1200, icon: Wallet },
      { key: 'insurance', label: 'Страховка', monthly: 900, icon: Wallet },
      { key: 'toys', label: 'Игрушки и амуниция', monthly: 800, icon: Wallet },
    ],
    large: [
      { key: 'food', label: 'Корм', monthly: 7000, icon: Wallet },
      { key: 'vet', label: 'Ветеринария и прививки', monthly: 2800, icon: Wallet },
      { key: 'grooming', label: 'Груминг', monthly: 1800, icon: Wallet },
      { key: 'insurance', label: 'Страховка', monthly: 1200, icon: Wallet },
      { key: 'toys', label: 'Игрушки и амуниция', monthly: 1000, icon: Wallet },
    ],
  },
  cat: {
    small: [
      { key: 'food', label: 'Корм', monthly: 2000, icon: Wallet },
      { key: 'vet', label: 'Ветеринария и прививки', monthly: 1200, icon: Wallet },
      { key: 'grooming', label: 'Груминг', monthly: 500, icon: Wallet },
      { key: 'insurance', label: 'Страховка', monthly: 500, icon: Wallet },
      { key: 'toys', label: 'Игрушки и лоток', monthly: 600, icon: Wallet },
    ],
    medium: [
      { key: 'food', label: 'Корм', monthly: 3000, icon: Wallet },
      { key: 'vet', label: 'Ветеринария и прививки', monthly: 1500, icon: Wallet },
      { key: 'grooming', label: 'Груминг', monthly: 700, icon: Wallet },
      { key: 'insurance', label: 'Страховка', monthly: 600, icon: Wallet },
      { key: 'toys', label: 'Игрушки и лоток', monthly: 700, icon: Wallet },
    ],
    large: [
      { key: 'food', label: 'Корм', monthly: 4500, icon: Wallet },
      { key: 'vet', label: 'Ветеринария и прививки', monthly: 1800, icon: Wallet },
      { key: 'grooming', label: 'Груминг', monthly: 900, icon: Wallet },
      { key: 'insurance', label: 'Страховка', monthly: 700, icon: Wallet },
      { key: 'toys', label: 'Игрушки и лоток', monthly: 800, icon: Wallet },
    ],
  },
};

const sizeLabels: Record<AnimalType, Record<Size, string>> = {
  dog: { small: 'Маленькая (<10 кг)', medium: 'Средняя (10–25 кг)', large: 'Крупная (>25 кг)' },
  cat: { small: 'Маленькая (<3 кг)', medium: 'Средняя (3–5 кг)', large: 'Крупная (>5 кг)' },
};

export function BudgetCalculator() {
  const [animal, setAnimal] = useState<AnimalType>('dog');
  const [size, setSize] = useState<Size>('medium');
  const [customCosts, setCustomCosts] = useState<Record<string, number>>({});

  const categories = baseCosts[animal][size];
  const costs = categories.map((c) => ({
    ...c,
    monthly: customCosts[c.key] ?? c.monthly,
  }));

  const totalMonthly = useMemo(() => costs.reduce((sum, c) => sum + c.monthly, 0), [costs]);
  const totalAnnual = totalMonthly * 12;

  const adjustCost = (key: string, delta: number) => {
    setCustomCosts((prev) => ({
      ...prev,
      [key]: Math.max(0, (prev[key] ?? categories.find((c) => c.key === key)!.monthly) + delta),
    }));
  };

  return (
    <ToolLayout
      title="Калькулятор бюджета"
      subtitle="Рассчитайте ежемесячные и годовые расходы на содержание питомца по категориям: корм, ветеринария, груминг, страховка и амуниция."
    >
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="rounded-2xl bg-base-surface border border-base-muted p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-ink mb-2">Тип животного</label>
            <div className="grid grid-cols-2 gap-2">
              {(['dog', 'cat'] as AnimalType[]).map((a) => (
                <button
                  key={a}
                  onClick={() => { setAnimal(a); setCustomCosts({}); }}
                  className={`py-3 rounded-xl text-sm font-semibold transition-all ${
                    animal === a ? 'bg-brand text-white' : 'bg-base-bg text-ink-light hover:bg-base-muted'
                  }`}
                >
                  {a === 'dog' ? 'Собака' : 'Кошка'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink mb-2">Размер</label>
            <div className="grid grid-cols-3 gap-2">
              {(['small', 'medium', 'large'] as Size[]).map((s) => (
                <button
                  key={s}
                  onClick={() => { setSize(s); setCustomCosts({}); }}
                  className={`py-3 rounded-xl text-xs font-semibold transition-all ${
                    size === s ? 'bg-brand text-white' : 'bg-base-bg text-ink-light hover:bg-base-muted'
                  }`}
                >
                  {sizeLabels[animal][s].split(' ')[0]}
                </button>
              ))}
            </div>
            <div className="text-xs text-ink-light mt-2">{sizeLabels[animal][size]}</div>
          </div>

          {/* Cost adjustments */}
          <div className="space-y-3">
            <div className="text-sm font-semibold text-ink pt-2 border-t border-base-muted">Корректировка расходов (₽/мес)</div>
            {costs.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.key} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-base-bg border border-base-muted">
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-brand-soft flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-brand" />
                    </div>
                    <span className="text-sm text-ink truncate">{c.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => adjustCost(c.key, -100)}
                      className="w-8 h-8 rounded-lg bg-base-muted hover:bg-base-muted/70 flex items-center justify-center flex-shrink-0"
                    >
                      <Minus className="w-4 h-4 text-ink" />
                    </button>
                    <span className="font-semibold text-sm text-ink w-16 text-center">{c.monthly.toLocaleString()} ₽</span>
                    <button
                      onClick={() => adjustCost(c.key, 100)}
                      className="w-8 h-8 rounded-lg bg-brand-soft hover:bg-brand-soft/70 flex items-center justify-center flex-shrink-0"
                    >
                      <Plus className="w-4 h-4 text-brand" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="rounded-2xl bg-brand text-white p-6">
            <div className="flex items-center gap-2 mb-4">
              <Wallet className="w-5 h-5 text-accent" />
              <span className="text-sm font-semibold text-brand-soft">Итого</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-white/10 p-4">
                <div className="text-xs text-brand-soft mb-1">В месяц</div>
                <div className="font-display font-extrabold text-3xl text-accent">{totalMonthly.toLocaleString()}</div>
                <div className="text-xs text-brand-soft">рублей</div>
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                <div className="text-xs text-brand-soft mb-1">В год</div>
                <div className="font-display font-extrabold text-3xl text-accent">{totalAnnual.toLocaleString()}</div>
                <div className="text-xs text-brand-soft">рублей</div>
              </div>
            </div>
          </div>

          {/* Breakdown */}
          <div className="rounded-2xl bg-base-surface border border-base-muted p-5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-brand" />
              <span className="text-sm font-semibold text-ink">Структура расходов</span>
            </div>
            <div className="space-y-3">
              {costs.map((c) => {
                const pct = Math.round((c.monthly / totalMonthly) * 100);
                return (
                  <div key={c.key}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-ink">{c.label}</span>
                      <span className="text-ink-light font-medium">{pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-base-muted overflow-hidden">
                      <div
                        className="h-full bg-brand rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl bg-warn-light p-4 text-sm text-warn-dark leading-relaxed">
            Цены ориентировочные, на основе российского рынка 2025 года. Реальные расходы зависят от региона, класса корма и состояния здоровья питомца.
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
