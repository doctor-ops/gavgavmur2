export interface FoodBrand {
  name: string;
  category: string;
  kcalPer100g: number;
  pricePerKg: number;
}

export const foodBrands: FoodBrand[] = [
  { name: 'Best Dinner Holistic', category: 'Холистик', kcalPer100g: 380, pricePerKg: 850 },
  { name: 'Blitz Classic', category: 'Холистик', kcalPer100g: 370, pricePerKg: 780 },
  { name: 'Sirius', category: 'Супер-премиум', kcalPer100g: 360, pricePerKg: 620 },
  { name: 'Probalance', category: 'Премиум', kcalPer100g: 340, pricePerKg: 350 },
  { name: 'Savarro', category: 'Супер-премиум', kcalPer100g: 365, pricePerKg: 690 },
  { name: 'Best Dinner', category: 'Премиум', kcalPer100g: 350, pricePerKg: 480 },
  { name: 'ВкусВилл', category: 'Премиум', kcalPer100g: 330, pricePerKg: 420 },
  { name: 'Dr. Clauder', category: 'Премиум', kcalPer100g: 345, pricePerKg: 400 },
];
