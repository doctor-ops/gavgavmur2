// Формулы кормления: общие для калькулятора и страниц пород.
export type AnimalType = 'dog' | 'cat';
export type Activity = 'low' | 'moderate' | 'high';

// Нестерилизованное взрослое животное; стерилизация снижает коэффициент на 0,2.
export const activityFactors: Record<AnimalType, Record<Activity, number>> = {
  dog: { low: 1.2, moderate: 1.6, high: 2.0 },
  cat: { low: 1.2, moderate: 1.4, high: 1.6 },
};

export const weightLimits: Record<AnimalType, { min: number; max: number }> = {
  dog: { min: 1, max: 90 },
  cat: { min: 1.5, max: 12 },
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
