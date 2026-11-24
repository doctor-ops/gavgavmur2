// Расчётные блоки страницы породы. Нужны и в браузере, и в seo-plugin.ts,
// поэтому импорты только относительные.
import { BREEDS_DATABASE, type Breed } from '../data/breeds';
import { baseCosts, sizeLabels, type BudgetSize } from '../data/budgetCosts';
import { activityFactors, clampWeight, restingEnergy } from './petNutrition';

export const TEMPERAMENT_LABELS: Record<Breed['temperament'], string> = {
  active: 'Активный',
  calm: 'Спокойный',
  independent: 'Независимый',
  friendly: 'Дружелюбный',
};

export const SIZE_LABELS: Record<Breed['size'], string> = {
  small: 'Маленький',
  medium: 'Средний',
  large: 'Крупный',
};

function breedWeight(breed: Breed): { min: number; max: number; mid: number } {
  const numbers = (breed.weight.match(/\d+(?:,\d+)?/g) ?? []).map((n) => Number(n.replace(',', '.')));
  const min = numbers[0];
  const max = numbers[numbers.length - 1];
  return { min, max, mid: (min + max) / 2 };
}

export function similarBreeds(breed: Breed, count = 6): Breed[] {
  const weight = breedWeight(breed).mid;
  const distance = (other: Breed) =>
    (other.temperament === breed.temperament ? 0 : 1) +
    (other.size === breed.size ? 0 : 1) +
    Math.abs(Math.log(breedWeight(other).mid / weight)) * 1.5;
  return BREEDS_DATABASE.filter((other) => other.type === breed.type && other.slug !== breed.slug)
    .map((other) => ({ other, score: distance(other) }))
    .sort((a, b) => a.score - b.score)
    .slice(0, count)
    .map(({ other }) => other);
}

// Границы те же, что подписаны в калькуляторе бюджета.
function budgetSize(breed: Breed): BudgetSize {
  const { mid } = breedWeight(breed);
  const [small, medium] = breed.type === 'dog' ? [10, 25] : [3, 5];
  if (mid < small) return 'small';
  return mid <= medium ? 'medium' : 'large';
}

const spaced = (value: number) => String(value).replace(/\B(?=(\d{3})+$)/g, ' ');

export function breedFood(breed: Breed) {
  const { min, max, mid } = breedWeight(breed);
  const factor = activityFactors[breed.type].moderate;
  const kcal = (weight: number, k: number) => spaced(Math.round((restingEnergy(weight) * k) / 10) * 10);
  return {
    // От лёгкого стерилизованного животного до тяжёлого нестерилизованного.
    text: `Взрослому питомцу весом ${breed.weight} при умеренной активности нужно примерно ${kcal(min, factor - 0.2)}–${kcal(max, factor)} ккал в сутки. Нижняя граница — для стерилизованного с меньшим весом. Это ориентир, норму уточняет ветеринар.`,
    href: `/tools/calories/?animal=${breed.type}&weight=${clampWeight(breed.type, mid)}`,
  };
}

export function breedBudget(breed: Breed) {
  const size = budgetSize(breed);
  const monthly = baseCosts[breed.type][size].reduce((sum, item) => sum + item.monthly, 0);
  return {
    text: `Около ${spaced(monthly)} ₽ в месяц, или ${spaced(monthly * 12)} ₽ в год: корм, ветеринар, груминг, страховка и амуниция. Категория калькулятора — «${sizeLabels[breed.type][size]}», цены ориентировочные, 2025 год.`,
    href: `/tools/budget/?animal=${breed.type}&size=${size}`,
  };
}

export function breedPhotoAlt(breed: Breed): string {
  return `${breed.name} — порода ${breed.type === 'dog' ? 'собак' : 'кошек'}`;
}
