export interface Breed {
  id: string;
  name: string;
  species: 'dog' | 'cat';
  origin: string;
  size: 'Маленький' | 'Средний' | 'Крупный' | 'Очень маленький';
  weightKg: string;
  lifespan: string;
  temperament: string;
  description: string;
  apartmentFriendly: boolean;
  hypoallergenic: boolean;
  goodWithKids: boolean;
  ratings: {
    shedding: number;
    activity: number;
    noise: number;
    trainability: number;
  };
  healthRisks: string[];
  image: string;
}

export const breeds: Breed[] = [
  {
    id: 'corgi',
    name: 'Корги',
    species: 'dog',
    origin: 'Уэльс, Великобритания',
    size: 'Маленький',
    weightKg: '10–14 кг',
    lifespan: '12–15 лет',
    temperament: 'Жизнерадостный, умный, общительный',
    description:
      'Корги — пастушья порода с большим сердцем. Несмотря на короткие лапки, очень энергичны и подвижны. Обожают людей, легко обучаются и становятся настоящими любимцами семьи.',
    apartmentFriendly: true,
    hypoallergenic: false,
    goodWithKids: true,
    ratings: { shedding: 4, activity: 4, noise: 3, trainability: 5 },
    healthRisks: ['Дисплазия тазобедренного сустава', 'Дегенеративная миелопатия', 'Проблемы с позвоночником'],
    image: 'corgi',
  },
  {
    id: 'german-shepherd',
    name: 'Немецкая овчарка',
    species: 'dog',
    origin: 'Германия',
    size: 'Крупный',
    weightKg: '30–40 кг',
    lifespan: '9–13 лет',
    temperament: 'Верный, смелый, уравновешенный',
    description:
      'Одна из самых универсальных пород. Служебные, сторожевые, поводыри и компаньоны. Немецкая овчарка отличается преданностью, интеллектом и работоспособностью.',
    apartmentFriendly: false,
    hypoallergenic: false,
    goodWithKids: true,
    ratings: { shedding: 5, activity: 5, noise: 4, trainability: 5 },
    healthRisks: ['Дисплазия тазобедренного и локтевого суставов', 'Дегенеративная миелопатия', 'Экзокринная недостаточность поджелудочной'],
    image: 'german-shepherd',
  },
  {
    id: 'labrador',
    name: 'Лабрадор-ретривер',
    species: 'dog',
    origin: 'Канада',
    size: 'Крупный',
    weightKg: '25–36 кг',
    lifespan: '10–14 лет',
    temperament: 'Добрый, ласковый, энергичный',
    description:
      'Лабрадор — чемпион по доброте. Идеален для семей с детьми, обожает воду и апортировку. Легко обучается, дружелюбен ко всем. Склонен к перееданию.',
    apartmentFriendly: false,
    hypoallergenic: false,
    goodWithKids: true,
    ratings: { shedding: 4, activity: 5, noise: 3, trainability: 5 },
    healthRisks: ['Дисплазия суставов', 'Ожирение', 'Прогрессирующая атрофия сетчатки'],
    image: 'labrador',
  },
  {
    id: 'chihuahua',
    name: 'Чихуахуа',
    species: 'dog',
    origin: 'Мексика',
    size: 'Очень маленький',
    weightKg: '1–3 кг',
    lifespan: '14–18 лет',
    temperament: 'Смелый, преданный, насторожённый',
    description:
      'Самая маленькая порода в мире с огромным характером. Чихуахуа предан одному хозяину, отлично чувствует себя в квартире. Нуждается в тёплой одежде зимой.',
    apartmentFriendly: true,
    hypoallergenic: false,
    goodWithKids: false,
    ratings: { shedding: 2, activity: 3, noise: 4, trainability: 3 },
    healthRisks: ['Гидроцефалия', 'Вывих коленной чашечки', 'Гипогликемия'],
    image: 'chihuahua',
  },
  {
    id: 'poodle',
    name: 'Пудель',
    species: 'dog',
    origin: 'Германия / Франция',
    size: 'Средний',
    weightKg: '15–25 кг',
    lifespan: '12–15 лет',
    temperament: 'Умный, активный, преданный',
    description:
      'Пудель — одна из самых умных пород. Гипоаллергенная шерсть делает его отличным выбором для аллергиков. Обожает воду и обучение трюкам.',
    apartmentFriendly: true,
    hypoallergenic: true,
    goodWithKids: true,
    ratings: { shedding: 1, activity: 4, noise: 3, trainability: 5 },
    healthRisks: ['Дисплазия тазобедренного сустава', 'Болезнь Аддисона', 'Прогрессирующая атрофия сетчатки'],
    image: 'poodle',
  },
  {
    id: 'shiba-inu',
    name: 'Сиба-ину',
    species: 'dog',
    origin: 'Япония',
    size: 'Средний',
    weightKg: '8–11 кг',
    lifespan: '12–15 лет',
    temperament: 'Независимый, преданный, активный',
    description:
      'Сиба-ину — японская порода с лисьей внешностью и кошачьей независимостью. Очень чистоплотна, преданна семье, но может быть упрямой.',
    apartmentFriendly: true,
    hypoallergenic: false,
    goodWithKids: false,
    ratings: { shedding: 4, activity: 4, noise: 2, trainability: 3 },
    healthRisks: ['Глаукома', 'Аллергии', 'Дисплазия тазобедренного сустава'],
    image: 'shiba-inu',
  },
  {
    id: 'maine-coon',
    name: 'Мейн-кун',
    species: 'cat',
    origin: 'США, штат Мэн',
    size: 'Крупный',
    weightKg: '4–8 кг',
    lifespan: '12–15 лет',
    temperament: 'Спокойный, дружелюбный, независимый',
    description:
      'Мейн-кун — крупнейшая домашняя кошка, «ласковый великан». Обладает собачьим характером: привязан к хозяину, любит воду и игры.',
    apartmentFriendly: true,
    hypoallergenic: false,
    goodWithKids: true,
    ratings: { shedding: 4, activity: 3, noise: 2, trainability: 3 },
    healthRisks: ['Гипертрофическая кардиомиопатия', 'Дисплазия тазобедренного сустава', 'Спинальная мышечная атрофия'],
    image: 'maine-coon',
  },
  {
    id: 'siamese',
    name: 'Сиамская',
    species: 'cat',
    origin: 'Таиланд',
    size: 'Средний',
    weightKg: '3–5 кг',
    lifespan: '15–20 лет',
    temperament: 'Разговорчивый, ласковый, общительный',
    description:
      'Сиамская кошка — интеллектуал и «болтун». Общается с хозяином звуками, требует внимания и не любит одиночество.',
    apartmentFriendly: true,
    hypoallergenic: false,
    goodWithKids: true,
    ratings: { shedding: 2, activity: 4, noise: 5, trainability: 4 },
    healthRisks: ['Амилоидоз', 'Прогрессирующая атрофия сетчатки', 'Астма'],
    image: 'siamese',
  },
  {
    id: 'british',
    name: 'Британская',
    species: 'cat',
    origin: 'Великобритания',
    size: 'Средний',
    weightKg: '4–7 кг',
    lifespan: '12–17 лет',
    temperament: 'Спокойный, сдержанный, независимый',
    description:
      'Британская короткошёрстная — аристократ с плюшевой шубкой. Спокойна, ненавязчива, отлично подходит для занятых людей.',
    apartmentFriendly: true,
    hypoallergenic: false,
    goodWithKids: true,
    ratings: { shedding: 3, activity: 2, noise: 1, trainability: 2 },
    healthRisks: ['Гипертрофическая кардиомиопатия', 'Поликистоз почек', 'Ожирение'],
    image: 'british',
  },
  {
    id: 'sphynx',
    name: 'Сфинкс',
    species: 'cat',
    origin: 'Канада',
    size: 'Средний',
    weightKg: '3–5 кг',
    lifespan: '12–16 лет',
    temperament: 'Ласковый, общительный, теплолюбивый',
    description:
      'Сфинкс — бесшерстная кошка с тёплой кожей. Очень ласкова, обожает людей и тепло. Требует особого ухода: регулярное купание, защита от солнца и холода.',
    apartmentFriendly: true,
    hypoallergenic: true,
    goodWithKids: true,
    ratings: { shedding: 1, activity: 4, noise: 3, trainability: 3 },
    healthRisks: ['Гипертрофическая кардиомиопатия', 'Врождённое облысение', 'Кожные инфекции'],
    image: 'sphynx',
  },
  {
    id: 'bengal',
    name: 'Бенгальская',
    species: 'cat',
    origin: 'США',
    size: 'Средний',
    weightKg: '4–7 кг',
    lifespan: '12–16 лет',
    temperament: 'Энергичный, умный, игривый',
    description:
      'Бенгальская кошка — экзотическая внешность с леопардовым окрасом. Очень активна, любит воду и игры. Нуждается в постоянной стимуляции.',
    apartmentFriendly: true,
    hypoallergenic: false,
    goodWithKids: true,
    ratings: { shedding: 2, activity: 5, noise: 3, trainability: 4 },
    healthRisks: ['Гипертрофическая кардиомиопатия', 'Прогрессирующая атрофия сетчатки', 'Воспалительные заболевания кишечника'],
    image: 'bengal',
  },
  {
    id: 'scottish-fold',
    name: 'Шотландская вислоухая',
    species: 'cat',
    origin: 'Шотландия',
    size: 'Средний',
    weightKg: '3–6 кг',
    lifespan: '12–15 лет',
    temperament: 'Спокойный, ласковый, любопытный',
    description:
      'Шотландская вислоухая — кошка с характерными загнутыми ушами. Спокойна, привязана к хозяину, отлично уживается с другими питомцами.',
    apartmentFriendly: true,
    hypoallergenic: false,
    goodWithKids: true,
    ratings: { shedding: 3, activity: 3, noise: 1, trainability: 3 },
    healthRisks: ['Остеохондродисплазия', 'Поликистоз почек', 'Гипертрофическая кардиомиопатия'],
    image: 'scottish-fold',
  },
];
