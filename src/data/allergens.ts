export type AllergenLevel = 'danger' | 'trigger' | 'safe';

export interface Ingredient {
  name: string;
  level: AllergenLevel;
  note: string;
}

export const ingredientDatabase: Ingredient[] = [
  { name: 'Кукуруза', level: 'trigger', note: 'Частый аллерген, источник пустых углеводов' },
  { name: 'Соя', level: 'trigger', note: 'Может вызывать аллергические реакции' },
  { name: 'Курица', level: 'danger', note: 'Самый частый белковый аллерген у собак и кошек' },
  { name: 'Пшеница', level: 'trigger', note: 'Глютен может вызывать непереносимость' },
  { name: 'Куриный жир', level: 'trigger', note: 'Может содержать белковые остатки куриного мяса' },
  { name: 'Говядина', level: 'danger', note: 'Один из частых аллергенов у собак' },
  { name: 'Молочная сыворотка', level: 'trigger', note: 'Лактоза — частый раздражитель' },
  { name: 'Дрожжи', level: 'safe', note: 'Источник витаминов группы B' },
  { name: 'Ячмень', level: 'safe', note: 'Хороший источник клетчатки' },
  { name: 'Овёс', level: 'safe', note: 'Лёгкоусвояемое зерно' },
  { name: 'Рис', level: 'safe', note: 'Гипоаллергенный злак, основа диетических кормов' },
  { name: 'Ягнёнок', level: 'safe', note: 'Гипоаллергенный белок, редко вызывает реакцию' },
  { name: 'Индейка', level: 'safe', note: 'Гипоаллергенный белок' },
  { name: 'Оленина', level: 'safe', note: 'Гипоаллергенный белок для чувствительных животных' },
  { name: 'Кролик', level: 'safe', note: 'Гипоаллергенный белок, основа элиминационных диет' },
  { name: 'Лосось', level: 'safe', note: 'Омега-3, гипоаллергенный белок' },
  { name: 'Сельдь', level: 'safe', note: 'Омега-3, редко вызывает аллергию' },
  { name: 'Тунец', level: 'safe', note: 'Хороший источник белка' },
  { name: 'Горох', level: 'safe', note: 'Источник растительного белка' },
  { name: 'Чечевица', level: 'safe', note: 'Гипоаллергенный источник углеводов' },
  { name: 'Батат', level: 'safe', note: 'Гипоаллергенный источник углеводов' },
  { name: 'Тыква', level: 'safe', note: 'Полезна для пищеварения' },
  { name: 'Морковь', level: 'safe', note: 'Источник бета-каротина' },
  { name: 'Яблоко', level: 'safe', note: 'Источник пектина и витаминов' },
  { name: 'Черника', level: 'safe', note: 'Антиоксиданты' },
  { name: 'Шиповник', level: 'safe', note: 'Витамин C' },
  { name: 'Льняное семя', level: 'safe', note: 'Омега-3 и омега-6' },
  { name: 'Рыбий жир', level: 'safe', note: 'Омега-3, полезен для кожи и шерсти' },
  { name: 'Яйцо', level: 'trigger', note: 'Может вызывать аллергию у некоторых животных' },
  { name: 'Сахар', level: 'danger', note: 'Не должен присутствовать в корме для животных' },
  { name: 'Соль', level: 'danger', note: 'Избыток опасен для животных' },
  { name: 'BHA', level: 'danger', note: 'Искусственный консервант, потенциально опасен' },
  { name: 'BHT', level: 'danger', note: 'Искусственный консервант, потенциально опасен' },
  { name: 'Этоксиквин', level: 'danger', note: 'Искусственный консервант, запрещён во многих странах' },
  { name: 'Токоферолы', level: 'safe', note: 'Натуральный консервант (витамин E)' },
  { name: 'Аскорбиновая кислота', level: 'safe', note: 'Натуральный консервант (витамин C)' },
  { name: 'Розмарин', level: 'safe', note: 'Натуральный консервант' },
];

export const allergenLevelMeta: Record<AllergenLevel, { label: string; color: string; bg: string; dot: string }> = {
  danger: { label: 'Опасно', color: 'text-danger-dark', bg: 'bg-danger-light', dot: 'bg-danger' },
  trigger: { label: 'Триггер', color: 'text-warn-dark', bg: 'bg-warn-light', dot: 'bg-warn' },
  safe: { label: 'Безопасно', color: 'text-safe-dark', bg: 'bg-safe-light', dot: 'bg-safe' },
};
