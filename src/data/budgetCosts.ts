// Ориентировочные расходы, ₽/мес. Используются калькулятором бюджета и страницами пород.
export type AnimalType = 'dog' | 'cat';
export type BudgetSize = 'small' | 'medium' | 'large';

export interface CostCategory {
  key: string;
  label: string;
  monthly: number;
}

export const baseCosts: Record<AnimalType, Record<BudgetSize, CostCategory[]>> = {
  dog: {
    small: [
      { key: 'food', label: 'Корм', monthly: 2500 },
      { key: 'vet', label: 'Ветеринария и прививки', monthly: 1500 },
      { key: 'grooming', label: 'Груминг', monthly: 800 },
      { key: 'insurance', label: 'Страховка', monthly: 600 },
      { key: 'toys', label: 'Игрушки и амуниция', monthly: 500 },
    ],
    medium: [
      { key: 'food', label: 'Корм', monthly: 4000 },
      { key: 'vet', label: 'Ветеринария и прививки', monthly: 2000 },
      { key: 'grooming', label: 'Груминг', monthly: 1200 },
      { key: 'insurance', label: 'Страховка', monthly: 900 },
      { key: 'toys', label: 'Игрушки и амуниция', monthly: 800 },
    ],
    large: [
      { key: 'food', label: 'Корм', monthly: 7000 },
      { key: 'vet', label: 'Ветеринария и прививки', monthly: 2800 },
      { key: 'grooming', label: 'Груминг', monthly: 1800 },
      { key: 'insurance', label: 'Страховка', monthly: 1200 },
      { key: 'toys', label: 'Игрушки и амуниция', monthly: 1000 },
    ],
  },
  cat: {
    small: [
      { key: 'food', label: 'Корм', monthly: 2000 },
      { key: 'vet', label: 'Ветеринария и прививки', monthly: 1200 },
      { key: 'grooming', label: 'Груминг', monthly: 500 },
      { key: 'insurance', label: 'Страховка', monthly: 500 },
      { key: 'toys', label: 'Игрушки и лоток', monthly: 600 },
    ],
    medium: [
      { key: 'food', label: 'Корм', monthly: 3000 },
      { key: 'vet', label: 'Ветеринария и прививки', monthly: 1500 },
      { key: 'grooming', label: 'Груминг', monthly: 700 },
      { key: 'insurance', label: 'Страховка', monthly: 600 },
      { key: 'toys', label: 'Игрушки и лоток', monthly: 700 },
    ],
    large: [
      { key: 'food', label: 'Корм', monthly: 4500 },
      { key: 'vet', label: 'Ветеринария и прививки', monthly: 1800 },
      { key: 'grooming', label: 'Груминг', monthly: 900 },
      { key: 'insurance', label: 'Страховка', monthly: 700 },
      { key: 'toys', label: 'Игрушки и лоток', monthly: 800 },
    ],
  },
};

export const sizeLabels: Record<AnimalType, Record<BudgetSize, string>> = {
  dog: { small: 'Маленькая (<10 кг)', medium: 'Средняя (10–25 кг)', large: 'Крупная (>25 кг)' },
  cat: { small: 'Маленькая (<3 кг)', medium: 'Средняя (3–5 кг)', large: 'Крупная (>5 кг)' },
};
