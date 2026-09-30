export interface FoodBrand {
  name: string;
  category: string;
  kcalPer100g: number;
  pricePerKg: number;
  animalType: 'all' | 'собаки' | 'кошки'; // Добавлено для фильтрации
  country: string;                       // Добавлено для информации
  features: string[];                     // Добавлено для карточек товара
}

export const foodBrands: FoodBrand[] = [
  // ==========================================================================
  // 🌟 ХОЛИСТИК
  // ==========================================================================
  { name: 'Acana', category: 'Холистик', kcalPer100g: 390, pricePerKg: 1400, animalType: 'all', country: 'Канада', features: ['беззерновой', 'высокий белок', 'гипоаллергенный'] },
  { name: 'Orijen', category: 'Холистик', kcalPer100g: 410, pricePerKg: 1800, animalType: 'all', country: 'Канада', features: ['беззерновой', '85% мяса', 'биологически соответствующий'] },
  { name: 'Farmina N&D', category: 'Холистик', kcalPer100g: 385, pricePerKg: 1250, animalType: 'all', country: 'Италия', features: ['низкозерновой', 'натуральные антиоксиданты', 'высокая вкусовая привлекательность'] },
  { name: 'Zignature', category: 'Холистик', kcalPer100g: 370, pricePerKg: 1500, animalType: 'собаки', country: 'США', features: ['ограниченное число ингредиентов', 'беззерновой', 'гипоаллергенный'] },
  { name: 'Now Fresh', category: 'Холистик', kcalPer100g: 375, pricePerKg: 1300, animalType: 'all', country: 'Канада', features: ['свежее мясо', 'беззерновой', 'контроль веса'] },
  { name: 'Go! Solutions', category: 'Холистик', kcalPer100g: 395, pricePerKg: 1250, animalType: 'all', country: 'Канада', features: ['высокий белок', 'для чувствительного пищеварения', 'беззерновой'] },
  { name: 'Grandorf', category: 'Холистик', kcalPer100g: 395, pricePerKg: 1350, animalType: 'all', country: 'Бельгия', features: ['гипоаллергенный', 'пробиотики', '60% мяса'] },
  { name: 'Carnilove', category: 'Холистик', kcalPer100g: 385, pricePerKg: 1200, animalType: 'all', country: 'Чехия', features: ['беззерновой', 'дичь', 'лесные ягоды'] },
  { name: 'Ownat Just Grain Free', category: 'Холистик', kcalPer100g: 380, pricePerKg: 1100, animalType: 'all', country: 'Испания', features: ['беззерновой', 'свежее мясо', 'доступный холистик'] },
  { name: 'Craftia', category: 'Холистик', kcalPer100g: 390, pricePerKg: 1400, animalType: 'all', country: 'Сербия', features: ['свежее мясо', 'функциональные добавки', 'беззерновой'] },
  { name: 'Rawival', category: 'Холистик', kcalPer100g: 405, pricePerKg: 1600, animalType: 'all', country: 'Италия', features: ['сублимированное мясо', 'беззерновой', 'высокий протеин'] },
  { name: 'Elato', category: 'Холистик', kcalPer100g: 390, pricePerKg: 1150, animalType: 'all', country: 'Италия', features: ['правильное соотношение белков', 'беззерновой', 'женьшень'] },
  { name: 'Aray', category: 'Холистик', kcalPer100g: 385, pricePerKg: 1200, animalType: 'all', country: 'Италия', features: ['высокий процент мяса', 'беззерновой'] },
  { name: 'AlphaPet WOW Holistic', category: 'Холистик', kcalPer100g: 390, pricePerKg: 980, animalType: 'all', country: 'Россия', features: ['свежее мясо', 'беззерновой', 'высокая доля мясного белка'] },
  { name: 'Best Dinner Holistic', category: 'Холистик', kcalPer100g: 380, pricePerKg: 890, animalType: 'all', country: 'Россия', features: ['гипоаллергенный', 'беззерновой', 'профилактика МКБ'] },
  { name: 'Savita', category: 'Холистик', kcalPer100g: 385, pricePerKg: 920, animalType: 'all', country: 'Россия', features: ['беззерновой', 'овощи и травы', 'высокий процент белка'] },
  { name: 'Acari Ciar', category: 'Холистик', kcalPer100g: 380, pricePerKg: 880, animalType: 'all', country: 'Россия', features: ['натуральный состав', 'без химии', 'запеченные линейки'] },
  { name: 'Ajo Holistic', category: 'Холистик', kcalPer100g: 378, pricePerKg: 850, animalType: 'all', country: 'Россия', features: ['высокотехнологичный состав', 'без зерна'] },
  { name: 'Blitz Holistic', category: 'Холистик', kcalPer100g: 380, pricePerKg: 820, animalType: 'all', country: 'Россия', features: ['беззерновой', 'на основе рыбы или дичи'] },
  { name: 'Lapico', category: 'Холистик', kcalPer100g: 385, pricePerKg: 940, animalType: 'all', country: 'Россия', features: ['нутрицевтики', 'без искусственных добавок', 'цельное мясо'] },
  { name: 'Taiga', category: 'Холистик', kcalPer100g: 378, pricePerKg: 790, animalType: 'all', country: 'Россия', features: ['сибирские травы', 'без зерна', 'бюджетный холистик'] },
  { name: 'Genesis', category: 'Холистик', kcalPer100g: 385, pricePerKg: 950, animalType: 'all', country: 'Россия', features: ['высокое содержание белка', 'без зерна'] },

  // ==========================================================================
  // 🌟 СУПЕР-ПРЕМИУМ
  // ==========================================================================
  { name: 'Monge Natural Superpremium', category: 'Супер-премиум', kcalPer100g: 365, pricePerKg: 800, animalType: 'all', country: 'Италия', features: ['ксилоолигосахариды', 'монопротеиновые линейки', 'функциональный'] },
  { name: 'Brit Care', category: 'Супер-премиум', kcalPer100g: 360, pricePerKg: 760, animalType: 'all', country: 'Чехия', features: ['гипоаллергенный', 'расторопша', 'защита суставов'] },
  { name: 'Josera', category: 'Супер-премиум', kcalPer100g: 355, pricePerKg: 720, animalType: 'all', country: 'Германия', features: ['немецкое качество', 'без сои и пшеницы', 'легко усваивается'] },
  { name: 'Bosch', category: 'Супер-премиум', kcalPer100g: 350, pricePerKg: 690, animalType: 'собаки', country: 'Германия', features: ['проверенное качество', 'для крупных пород'] },
  { name: 'Sanabelle', category: 'Супер-премиум', kcalPer100g: 355, pricePerKg: 750, animalType: 'кошки', country: 'Германия', features: ['высокая вкусовая привлекательность', 'уход за шерстью'] },
  { name: 'Alleva Equilibrium', category: 'Супер-премиум', kcalPer100g: 365, pricePerKg: 820, animalType: 'all', country: 'Италия', features: ['парное мясо', 'фрукты и овощи', 'бережная обработка'] },
  { name: 'Leonardo', category: 'Супер-премиум', kcalPer100g: 360, pricePerKg: 840, animalType: 'кошки', country: 'Германия', features: ['криль', 'удаление комочков шерсти'] },
  { name: 'Belcando', category: 'Супер-премиум', kcalPer100g: 365, pricePerKg: 850, animalType: 'собаки', country: 'Германия', features: ['семена чиа', 'богат аминокислотами'] },
  { name: 'Arden Grange', category: 'Супер-премиум', kcalPer100g: 360, pricePerKg: 890, animalType: 'all', country: 'Великобритания', features: ['гипоаллергенный', 'нуклеотиды'] },
  { name: 'Mera', category: 'Супер-премиум', kcalPer100g: 358, pricePerKg: 740, animalType: 'all', country: 'Германия', features: ['защитная концепция MERA', 'без глютена'] },
  { name: 'Sirius', category: 'Супер-премиум', kcalPer100g: 360, pricePerKg: 640, animalType: 'all', country: 'Россия', features: ['пробиотики', 'эхинацея', 'хороший баланс цены/качества'] },
  { name: 'Savarro', category: 'Супер-премиум', kcalPer100g: 365, pricePerKg: 710, animalType: 'all', country: 'Россия', features: ['низкозерновой', 'дегидрированное мясо'] },
  { name: 'Blitz Sensitive', category: 'Супер-премиум', kcalPer100g: 355, pricePerKg: 670, animalType: 'all', country: 'Россия', features: ['ягненок и рис', 'для чувствительного ЖКТ'] },
  { name: 'Bowl Wow', category: 'Супер-премиум', kcalPer100g: 360, pricePerKg: 630, animalType: 'all', country: 'Россия', features: ['открытый состав', 'ветеринарный контроль', 'без искусственных красителей'] },
  { name: 'AlphaPet Superpremium', category: 'Супер-премиум', kcalPer100g: 350, pricePerKg: 610, animalType: 'all', country: 'Россия', features: ['натуральные ингредиенты', 'высокая усвояемость'] },
  { name: 'Belcorn', category: 'Супер-премиум', kcalPer100g: 355, pricePerKg: 440, animalType: 'all', country: 'Россия', features: ['бюджетный супер-премиум', 'без пшеницы'] },
  { name: 'Smarte', category: 'Супер-премиум', kcalPer100g: 365, pricePerKg: 530, animalType: 'all', country: 'Россия', features: ['оптимальный баланс нутриентов'] },
  { name: 'Award', category: 'Супер-премиум', kcalPer100g: 365, pricePerKg: 660, animalType: 'all', country: 'Россия', features: ['натуральные антиоксиданты', '30% мяса'] },
  { name: 'Delicana', category: 'Супер-премиум', kcalPer100g: 355, pricePerKg: 610, animalType: 'all', country: 'Россия', features: ['из сибирского сырья', 'поддержка иммунитета'] },
  { name: 'Lumi', category: 'Супер-премиум', kcalPer100g: 362, pricePerKg: 650, animalType: 'all', country: 'Россия', features: ['свежие ингредиенты', 'баланс микроэлементов'] },
  { name: 'Petvador', category: 'Супер-премиум', kcalPer100g: 368, pricePerKg: 750, animalType: 'all', country: 'Испания/Россия', features: ['гипоаллергенный', 'высокий процент мяса'] },

  // ==========================================================================
  // 🌟 ПРЕМИУМ
  // ==========================================================================
  { name: 'Royal Canin', category: 'Премиум', kcalPer100g: 350, pricePerKg: 850, animalType: 'all', country: 'Франция/Россия', features: ['ветеринарные линейки', 'породные линейки', 'высокая точность формул'] },
  { name: 'Purina Pro Plan', category: 'Премиум', kcalPer100g: 355, pricePerKg: 800, animalType: 'all', country: 'Франция/Россия', features: ['научно обоснованный', 'поддержка почек Optirenal', 'высокая поедаемость'] },
  { name: 'Hills Science Plan', category: 'Премиум', kcalPer100g: 345, pricePerKg: 950, animalType: 'all', country: 'Нидерланды/Чехия', features: ['клинически проверенные антиоксиданты', 'строгий контроль фосфора'] },
  { name: 'Brit Premium', category: 'Премиум', kcalPer100g: 340, pricePerKg: 580, animalType: 'all', country: 'Россия/Чехия', features: ['содержит соус', 'высокое содержание дегидрированного мяса'] },
  { name: 'Chicopee', category: 'Премиум', kcalPer100g: 345, pricePerKg: 540, animalType: 'all', country: 'Германия', features: ['без пшеницы', 'комплекс для кожи и шерсти'] },
  { name: 'Cat Chow / Dog Chow', category: 'Премиум', kcalPer100g: 340, pricePerKg: 490, animalType: 'all', country: 'Венгрия/Россия', features: ['натуральные травяные экстракты'] },
  { name: 'Probalance', category: 'Премиум', kcalPer100g: 340, pricePerKg: 370, animalType: 'all', country: 'Россия', features: ['мико карб', 'оптимальный баланс витаминов', 'народный выбор'] },
  { name: 'Best Dinner', category: 'Премиум', kcalPer100g: 350, pricePerKg: 490, animalType: 'all', country: 'Россия', features: ['профилактические линейки', 'хорошая поедаемость'] },
  { name: 'ВкусВилл', category: 'Премиум', kcalPer100g: 330, pricePerKg: 450, animalType: 'all', country: 'Россия', features: ['без консервантов', 'проверенные заводы'] },
  { name: 'Dr. Clauder', category: 'Премиум', kcalPer100g: 345, pricePerKg: 420, animalType: 'all', country: 'Германия/Россия', features: ['акцент на суставы'] },
  { name: 'Karmy', category: 'Премиум', kcalPer100g: 340, pricePerKg: 480, animalType: 'all', country: 'Россия', features: ['монопротеиновые линейки', 'без кукурузного глютена'] },
  { name: 'Мираторг Extra Meat', category: 'Премиум', kcalPer100g: 330, pricePerKg: 340, animalType: 'all', country: 'Россия', features: ['собственное мясное сырье', 'высокая доля свежего мяса'] },
  { name: 'Мясо-Мяу', category: 'Премиум', kcalPer100g: 330, pricePerKg: 320, animalType: 'кошки', country: 'Беларусь', features: ['доступная цена', 'мясные ингредиенты на первом месте'] },
  { name: 'Florida', category: 'Премиум', kcalPer100g: 350, pricePerKg: 520, animalType: 'all', country: 'Россия', features: ['ягоды и таурин', 'без искусственных красителей'] },
  { name: 'Leo & Lucy', category: 'Премиум', kcalPer100g: 345, pricePerKg: 540, animalType: 'all', country: 'Россия', features: ['экстракты био-трав', 'мясо и овощи'] },
  { name: 'Gemon', category: 'Премиум', kcalPer100g: 342, pricePerKg: 510, animalType: 'all', country: 'Италия', features: ['от Monge', 'гарантия европейского качества'] },

  // ==========================================================================
  // 🌟 ЭКОНОМ
  // ==========================================================================
  { name: 'Зоогурман', category: 'Эконом', kcalPer100g: 320, pricePerKg: 290, animalType: 'all', country: 'Россия', features: ['субпродукты', 'широкая линейка влажных кормов'] },
  { name: 'Pedigree', category: 'Эконом', kcalPer100g: 330, pricePerKg: 390, animalType: 'собаки', country: 'Россия', features: ['доступность', 'базовая поддержка пищеварения'] },
  { name: 'Whiskas', category: 'Эконом', kcalPer100g: 325, pricePerKg: 370, animalType: 'кошки', country: 'Россия', features: ['повсеместная доступность', 'привлекательный вкус'] },
  { name: 'Felix', category: 'Эконом', kcalPer100g: 325, pricePerKg: 380, animalType: 'кошки', country: 'Россия', features: ['акцент на паучи/влажный корм', 'яркие вкусы'] },
  { name: 'Родные корма', category: 'Эконом', kcalPer100g: 310, pricePerKg: 260, animalType: 'all', country: 'Россия', features: ['низкая цена', 'традиционные рецепты'] },
  { name: 'Kitekat', category: 'Эконом', kcalPer100g: 315, pricePerKg: 300, animalType: 'кошки', country: 'Россия', features: ['энергия для активных кошек'] },
  { name: 'Наша Марка', category: 'Эконом', kcalPer100g: 320, pricePerKg: 270, animalType: 'all', country: 'Россия', features: ['кукурузная база', 'минимальная цена'] },
  { name: 'Chappi', category: 'Эконом', kcalPer100g: 310, pricePerKg: 250, animalType: 'собаки', country: 'Россия', features: ['для крупных и средних собак на дачу'] },
  { name: 'Darling', category: 'Эконом', kcalPer100g: 315, pricePerKg: 290, animalType: 'all', country: 'Россия', features: ['базовый рацион от Purina'] },
  { name: 'Perfect Fit', category: 'Эконом', kcalPer100g: 335, pricePerKg: 440, animalType: 'all', country: 'Россия', features: ['верхний сегмент эконома', 'профилактика пяти систем здоровья'] },
];
