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
];
