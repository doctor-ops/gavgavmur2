export interface FoodBrand {
  name: string;
  category: string;
  kcalPer100g: number;
  pricePerKg: number;
}

export const foodBrands: FoodBrand[] = [
  // ==========================================================================
  // 🌟 ХОЛИСТИКИ (Высокий белок, высокая энергоемкость, премиум цена)
  // ==========================================================================
  { name: 'Best Dinner Holistic', category: 'Холистик', kcalPer100g: 380, pricePerKg: 850 },
  { name: 'Blitz Classic', category: 'Холистик', kcalPer100g: 370, pricePerKg: 780 },
  { name: 'AlphaPet WOW Holistic', category: 'Холистик', kcalPer100g: 390, pricePerKg: 950 },
  { name: 'Savita', category: 'Холистик', kcalPer100g: 385, pricePerKg: 900 },
  { name: 'Acari Ciar', category: 'Холистик', kcalPer100g: 380, pricePerKg: 880 },
  { name: 'Ajo', category: 'Холистик', kcalPer100g: 375, pricePerKg: 820 },

  // ==========================================================================
  // 🎖️ СУПЕР-ПРЕМИУМ (Сбалансированные рационы, средний/высокий ценник)
  // ==========================================================================
  { name: 'Sirius', category: 'Супер-премиум', kcalPer100g: 360, pricePerKg: 620 },
  { name: 'Savarro', category: 'Супер-премиум', kcalPer100g: 365, pricePerKg: 690 },
  { name: 'Blitz Sensitive', category: 'Супер-премиум', kcalPer100g: 355, pricePerKg: 650 },
  { name: 'Bowl Wow', category: 'Супер-премиум', kcalPer100g: 360, pricePerKg: 600 },
  { name: 'AlphaPet Superpremium', category: 'Супер-премиум', kcalPer100g: 350, pricePerKg: 580 },

  // ==========================================================================
  // 📦 ПРЕМИУМ (Повседневные корма, доступная цена)
  // ==========================================================================
  { name: 'Probalance', category: 'Премиум', kcalPer100g: 340, pricePerKg: 350 },
  { name: 'Best Dinner', category: 'Премиум', kcalPer100g: 350, pricePerKg: 480 },
  { name: 'ВкусВилл', category: 'Премиум', kcalPer100g: 330, pricePerKg: 420 },
  { name: 'Dr. Clauder', category: 'Премиум', kcalPer100g: 345, pricePerKg: 400 },
  { name: 'Karmy', category: 'Премиум', kcalPer100g: 340, pricePerKg: 450 },
  { name: 'Мираторг Extra Meat', category: 'Премиум', kcalPer100g: 330, pricePerKg: 320 },
  { name: 'Зоогурман', category: 'Премиум', kcalPer100g: 320, pricePerKg: 280 },
];
