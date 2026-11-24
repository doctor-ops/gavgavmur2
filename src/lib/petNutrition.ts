// Формулы кормления: общие для калькулятора, страниц пород и текста методики.
// Коэффициенты — таблица AAHA 2021 (см. источники в src/data/toolContent.ts).
export type AnimalType = 'dog' | 'cat';
export type Activity = 'low' | 'moderate' | 'high';

// Нестерилизованное взрослое животное; стерилизация снижает коэффициент на 0,2.
export const activityFactors: Record<AnimalType, Record<Activity, number>> = {
  dog: { low: 1.4, moderate: 1.6, high: 1.8 },
  cat: { low: 1.2, moderate: 1.4, high: 1.6 },
};

export const STERILIZED_DELTA = 0.2;

// Вес щенков и котят — тоже, поэтому минимум 0,5 кг.
export const weightLimits: Record<AnimalType, { min: number; max: number }> = {
  dog: { min: 0.5, max: 90 },
  cat: { min: 0.5, max: 12 },
};

// Шаг ползунка в калькуляторе — 0,5 кг.
export function clampWeight(animal: AnimalType, weight: number): number {
  const { min, max } = weightLimits[animal];
  return Math.min(max, Math.max(min, Math.round(weight * 2) / 2));
}

// RER — энергия покоя, ккал/сутки.
export function restingEnergy(weight: number): number {
  return Math.round(70 * Math.pow(weight, 0.75));
}

// До года действует коэффициент роста: активность и стерилизация не учитываются.
export function isGrowing(ageMonths: number): boolean {
  return ageMonths < 12;
}

export function energyFactor(
  animal: AnimalType,
  ageMonths: number,
  activity: Activity,
  sterilized: boolean
): number {
  if (isGrowing(ageMonths)) {
    if (animal === 'cat') return 2.5;
    return ageMonths < 4 ? 3 : 2;
  }
  return activityFactors[animal][activity] - (sterilized ? STERILIZED_DELTA : 0);
}

export function dailyEnergy(
  animal: AnimalType,
  weight: number,
  ageMonths: number,
  activity: Activity,
  sterilized: boolean
): number {
  return Math.round(restingEnergy(weight) * energyFactor(animal, ageMonths, activity, sterilized));
}
