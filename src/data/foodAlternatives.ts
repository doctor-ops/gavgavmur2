export interface FoodAlternative {
  foreignBrand: string;
  foreignCountry: string;
  category: string;
  russianAlternatives: { name: string; brand: string; note: string }[];
}

export const foodAlternatives: FoodAlternative[] = [
  {
    foreignBrand: 'Royal Canin',
    foreignCountry: 'Франция',
    category: 'Премиум',
    russianAlternatives: [
      { name: 'Best Dinner', brand: 'Завод «Морган»', note: 'Линейки для собак и кошек, премиум-класс' },
      { name: 'Probalance', brand: 'ООО «КормТех»', note: 'Сбалансированные рационы, доступная цена' },
      { name: 'Dr. Clauder', brand: 'Российская линейка', note: 'Немецкий рецепт, производство в РФ' },
    ],
  },
  {
    foreignBrand: 'Purina Pro Plan',
    foreignCountry: 'США / Франция',
    category: 'Премиум',
    russianAlternatives: [
      { name: 'Probalance', brand: 'ООО «КормТех»', note: 'Премиум по доступной цене' },
      { name: 'ВкусВилл', brand: 'ВкусВилл', note: 'Натуральные линейки для кошек и собак' },
      { name: 'Blitz', brand: 'ООО «КормТех»', note: 'Холистик-класс, беззерновые рационы' },
    ],
  },
  {
    foreignBrand: 'Acana / Orijen',
    foreignCountry: 'Канада',
    category: 'Холистик',
    russianAlternatives: [
      { name: 'Best Dinner Holistic', brand: 'Завод «Морган»', note: 'Высокое содержание мяса, беззерновые формулы' },
      { name: 'Blitz Classic', brand: 'ООО «КормТех»', note: 'Холистик, свежее мясо, без зерна' },
      { name: 'Sirius', brand: 'Sirius Pet', note: 'Супер-премиум, высокое содержание белка' },
    ],
  },
  {
    foreignBrand: 'Monge',
    foreignCountry: 'Италия',
    category: 'Супер-премиум',
    russianAlternatives: [
      { name: 'Savarro', brand: 'Savarro', note: 'Супер-премиум, без искусственных добавок' },
      { name: 'Best Dinner', brand: 'Завод «Морган»', note: 'Линейки супер-премиум для кошек и собак' },
      { name: 'Sirius', brand: 'Sirius Pet', note: 'Супер-премиум, натуральные ингредиенты' },
    ],
  },
  {
    foreignBrand: 'Go! Solutions',
    foreignCountry: 'Канада',
    category: 'Холистик',
    russianAlternatives: [
      { name: 'Blitz Holistic', brand: 'ООО «КормТех»', note: 'Беззерновые рационы, высокий белок' },
      { name: 'Best Dinner Holistic', brand: 'Завод «Морган»', note: 'Холистик-класс, беззерновые формулы' },
      { name: 'Sirius Holistic', brand: 'Sirius Pet', note: 'Беззерновые, высокое содержание мяса' },
    ],
  },
  {
    foreignBrand: 'Grandorf',
    foreignCountry: 'Италия',
    category: 'Супер-премиум',
    russianAlternatives: [
      { name: 'Sirius', brand: 'Sirius Pet', note: 'Супер-премиум, пробиотики в составе' },
      { name: 'Probalance', brand: 'ООО «КормТех»', note: 'Доступный супер-премиум' },
      { name: 'Savarro', brand: 'Savarro', note: 'Натуральный состав, без консервантов' },
    ],
  },
  {
    foreignBrand: 'Hills',
    foreignCountry: 'США',
    category: 'Премиум / Ветеринарная диета',
    russianAlternatives: [
      { name: 'Bliss', brand: 'ООО «КормТех»', note: 'Ветеринарные линейки для разных состояний' },
      { name: 'Probalance Vet', brand: 'ООО «КормТех»', note: 'Лечебные рационы' },
      { name: 'Best Dinner Vet', brand: 'Завод «Морган»', note: 'Ветеринарные диеты' },
    ],
  },
  {
    foreignBrand: 'Brit',
    foreignCountry: 'Чехия',
    category: 'Премиум',
    russianAlternatives: [
      { name: 'Probalance', brand: 'ООО «КормТех»', note: 'Премиум-класс, доступная цена' },
      { name: 'Best Dinner', brand: 'Завод «Морган»', note: 'Линейки для собак и кошек' },
      { name: 'Sirius', brand: 'Sirius Pet', note: 'Супер-премиум' },
    ],
  },
  // ==========================================================================
  // ДОПОЛНЕННЫЕ ДАННЫЕ
  // ==========================================================================
  {
    foreignBrand: 'Josera / Bosch',
    foreignCountry: 'Германия',
    category: 'Супер-премиум',
    russianAlternatives: [
      { name: 'Blitz', brand: 'ООО «КормТех»', note: 'Сбалансированные рационы с высоким качеством белка' },
      { name: 'Sirius', brand: 'Sirius Pet', note: 'Супер-премиум, натуральные ингредиенты' },
      { name: 'Best Dinner', brand: 'Завод «Морган»', note: 'Повседневные рационы супер-премиум класса' },
    ],
  },
  {
    foreignBrand: 'Zignature / Now Fresh',
    foreignCountry: 'США',
    category: 'Холистик',
    russianAlternatives: [
      { name: 'AlphaPet WOW', brand: 'AlphaPet', note: 'Беззерновой состав, высокое содержание мяса' },
      { name: 'Savita', brand: 'Savita', note: 'Натуральный состав, без искусственных добавок' },
      { name: 'Acari Ciar', brand: 'Acari Ciar', note: 'Холистик-линейка с высоким процентом белка' },
    ],
  },
  {
    foreignBrand: 'Purina One / Perfect Fit',
    foreignCountry: 'США / Европа',
    category: 'Премиум',
    russianAlternatives: [
      { name: 'Extra Meat', brand: 'Мираторг', note: 'Повышенное содержание мясных компонентов' },
      { name: 'Probalance', brand: 'ООО «КормТех»', note: 'Доступный премиум сбалансированного состава' },
      { name: 'Родные корма', brand: 'Родные корма', note: 'Доступный повседневный рацион' },
    ],
  },
  {
    // Добавляем Brit Care отдельно, так как это супер-премиум сегмент
    foreignBrand: 'Brit Care',
    foreignCountry: 'Чехия',
    category: 'Супер-премиум',
    russianAlternatives: [
      { name: 'Blitz Sensitive', brand: 'ООО «КормТех»', note: 'Гипоаллергенный состав для чувствительных животных' },
      { name: 'AlphaPet Superpremium', brand: 'AlphaPet', note: 'Сбалансированный состав, контроль минералов' },
      { name: 'Sirius', brand: 'Sirius Pet', note: 'Высококачественный белок, без лишних добавок' },
    ],
  },
  {
    foreignBrand: 'Wellness Core',
    foreignCountry: 'США',
    category: 'Холистик',
    russianAlternatives: [
      { name: 'Savarro Holistic', brand: 'Savarro', note: 'Беззерновая формула, натуральные ингредиенты' },
      { name: 'Best Dinner Holistic', brand: 'Завод «Морган»', note: 'Высокий процент мяса, без злаков' },
    ],
  },
];
