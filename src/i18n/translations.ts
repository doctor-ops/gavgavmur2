export type Lang = 'ru' | 'en';

export type Translation = {
  nav: {
    history: string;
    quiz: string;
    breeds: string;
    care: string;
    food: string;
    contacts: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    secondaryCta: string;
    stat1: string;
    stat1label: string;
    stat2: string;
    stat2label: string;
    stat3: string;
    stat3label: string;
  };
  history: {
    title: string;
    subtitle: string;
    dogTitle: string;
    catTitle: string;
    timeline: { era: string; title: string; text: string }[];
    catText: string;
    dogText: string;
  };
  quiz: {
    title: string;
    subtitle: string;
    start: string;
    next: string;
    back: string;
    restart: string;
    resultTitle: string;
    resultDog: string;
    resultCat: string;
    resultDogDesc: string;
    resultCatDesc: string;
    recommendedBreeds: string;
    questions: {
      question: string;
      options: { text: string; type: 'dog' | 'cat' }[];
    }[];
  };
  breeds: {
    title: string;
    subtitle: string;
    dogs: string;
    cats: string;
    all: string;
    traits: {
      temperament: string;
      size: string;
      lifespan: string;
      care: string;
    };
    breedCards: {
      name: string;
      origin: string;
      temperament: string;
      size: string;
      lifespan: string;
      care: string;
      description: string;
    }[];
  };
  care: {
    title: string;
    subtitle: string;
    dogTitle: string;
    catTitle: string;
    dogCards: { icon: string; title: string; text: string }[];
    catCards: { icon: string; title: string; text: string }[];
  };
  food: {
    title: string;
    subtitle: string;
    types: {
      name: string;
      icon: string;
      pros: string[];
      cons: string[];
      description: string;
    }[];
    brandsTitle: string;
    brandsSubtitle: string;
    brands: {
      name: string;
      category: string;
      description: string;
    }[];
    feedingGuideTitle: string;
    feedingGuideSubtitle: string;
    feedingGuide: {
      breed: string;
      weight: string;
      dryAmount: string;
      wetAmount: string;
    }[];
    guideColumns: { breed: string; weight: string; dry: string; wet: string };
    disclaimer: string;
  };
  contacts: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    message: string;
    subject: string;
    subjects: string[];
    submit: string;
    success: string;
    successDesc: string;
    contactInfo: string;
    emailLabel: string;
    socialLabel: string;
    address: string;
    addressValue: string;
  };
  footer: {
    about: string;
    aboutText: string;
    links: string;
    contact: string;
    rights: string;
  };
};

const ru: Translation = {
  nav: {
    history: 'История',
    quiz: 'Тест',
    breeds: 'Породы',
    care: 'Уход',
    food: 'Корма',
    contacts: 'Контакты',
  },
  hero: {
    title: 'УсыХвост',
    subtitle:
      'Ваш путеводитель в мир кошек и собак — история приручения, подбор породы, советы по уходу и кормлению.',
    cta: 'Пройти тест',
    secondaryCta: 'Смотреть породы',
    stat1: '15 000+',
    stat1label: 'лет дружбы с собаками',
    stat2: '9 500+',
    stat2label: 'лет рядом с кошками',
    stat3: '400+',
    stat3label: 'пород в каталоге',
  },
  history: {
    title: 'История приручения',
    subtitle:
      'Путь от диких зверей к любимым членам семьи — как кошки и собаки стали нашими верными спутниками.',
    dogTitle: 'Собаки — первые друзья человека',
    catTitle: 'Кошки — путь к домашнему очагу',
    dogText:
      'Собаки стали первыми одомашненными животными. Их предки — волки — начали подходить к человеческим стоянкам в поисках остатков пищи. Постепенно возник взаимовыгодный союз: люди получали охрану и помощь на охоте, а волки — регулярную еду и тепло у костра. За тысячелетия совместной жизни отбор изменил не только внешность, но и характер — преданность, способность понимать команды и эмоциональную связь с человеком.',
    catText:
      'Кошки одомашнились сами. Когда люди перешли к земледелию, зернохранилища привлекли грызунов, а за ними — диких кошек. Людям было выгодно терпеть кошек рядом, и так началось сосуществование, в котором кошка сохранила независимость. В отличие от собак, кошки почти не изменились генетически — они остались ловцами, просто выбрали жить рядом с человеком.',
    timeline: [
      {
        era: '~15 000 лет назад',
        title: 'Первые шаги к дружбе',
        text:
          'Волки начинают подходить к стоянкам древних людей. Процесс одомашнивания запускается — самые дружелюбные особи получают пищу и защиту.',
      },
      {
        era: '~12 000 лет назад',
        title: 'Собаки-помощники',
        text:
          'Одомашненные волки становятся полноценными спутниками человека: помогают на охоте, охраняют лагерь, тянут нарты. Формируются первые типы собак.',
      },
      {
        era: '~9 500 лет назад',
        title: 'Кошки приходят в поселения',
        text:
          'На Ближнем Востоке, с развитием земледелия, кошки начинают жить рядом с людьми, охраняя зерно от грызунов. В Древнем Египте кошку обожествляют.',
      },
      {
        era: '~3 000 лет назад',
        title: 'Породное разнообразие',
        text:
          'Люди целенаправленно отбирают собак по рабочим качествам — так появляются гончие, борзые, пастушьи и сторожевые породы.',
      },
      {
        era: 'XIX век',
        title: 'Эпоха заводчиков',
        text:
          'Появляются первые клубы и стандарты пород. Собаки и кошки становятся не только помощниками, но и компаньонами, выставочными животными.',
      },
      {
        era: 'XX–XXI век',
        title: 'Члены семьи',
        text:
          'Питомцы переезжают в дома и квартиры, получают ветеринарное обслуживание, специализированное питание и статус полноправных членов семьи.',
      },
    ],
  },
  quiz: {
    title: 'Тест: Кто твой идеальный питомец?',
    subtitle:
      'Ответьте на несколько вопросов о вашем образе жизни — и мы подскажем, кто вам подойдёт: кошка или собака, а также порекомендуем породы.',
    start: 'Начать тест',
    next: 'Далее',
    back: 'Назад',
    restart: 'Пройти заново',
    resultTitle: 'Ваш результат',
    resultDog: 'Вам идеально подойдёт собака!',
    resultCat: 'Вам идеально подойдёт кошка!',
    resultDogDesc:
      'Вы активны, любите проводить время на свежем воздухе и готовы уделять питомцу много внимания. Собака станет для вас верным компаньоном и источником радости каждый день.',
    resultCatDesc:
      'Вы цените уют и спокойствие, у вас размеренный образ жизни. Кошка подарит вам теплоту и независимость — она будет рядом, не требуя постоянного внимания.',
    recommendedBreeds: 'Рекомендованные породы',
    questions: [
      {
        question: 'Как бы вы описали свой уровень активности?',
        options: [
          { text: 'Очень активный — спорт, походы, движение каждый день', type: 'dog' },
          { text: 'Умеренный — прогулки, иногда спорт', type: 'dog' },
          { text: 'Спокойный — предпочитаю отдых дома', type: 'cat' },
          { text: 'Нерегулярный — бывает по-разному', type: 'cat' },
        ],
      },
      {
        question: 'Где вы живёте?',
        options: [
          { text: 'Частный дом с участком', type: 'dog' },
          { text: 'Просторная квартира', type: 'dog' },
          { text: 'Небольшая квартира-студия', type: 'cat' },
          { text: 'Комната в общежитии / с соседями', type: 'cat' },
        ],
      },
      {
        question: 'Сколько свободного времени в день вы готовы уделять питомцу?',
        options: [
          { text: 'Больше 3 часов — готов(а) гулять и играть', type: 'dog' },
          { text: '1–3 часа — есть время на общение', type: 'dog' },
          { text: 'Менее 1 часа — работаю допоздна', type: 'cat' },
          { text: 'Нерегулярно — график плавающий', type: 'cat' },
        ],
      },
      {
        question: 'Как вы относитесь к ежедневным прогулкам в любую погоду?',
        options: [
          { text: 'Обожаю — дождь и снег не проблема', type: 'dog' },
          { text: 'Не против, но в плохую погоду лень', type: 'dog' },
          { text: 'Не хочу гулять каждый день', type: 'cat' },
          { text: 'Предпочитаю оставаться дома', type: 'cat' },
        ],
      },
      {
        question: 'Что для вас важнее в питомце?',
        options: [
          { text: 'Верность, преданность, совместные приключения', type: 'dog' },
          { text: 'Независимость, уют, спокойствие рядом', type: 'cat' },
          { text: 'Энергия, игривость, постоянное движение', type: 'dog' },
          { text: 'Мягкость, ласка, ненавязчивость', type: 'cat' },
        ],
      },
      {
        question: 'Есть ли у вас дети или другие животные дома?',
        options: [
          { text: 'Есть дети — нужен активный и добрый друг', type: 'dog' },
          { text: 'Есть другие питомцы', type: 'cat' },
          { text: 'Живу один / одна', type: 'cat' },
          { text: 'Часто бывают гости, нужна общительная собака', type: 'dog' },
        ],
      },
    ],
  },
  breeds: {
    title: 'Каталог пород',
    subtitle:
      'Подробные карточки популярных пород собак и кошек — характер, размеры, продолжительность жизни и особенности ухода.',
    dogs: 'Собаки',
    cats: 'Кошки',
    all: 'Все',
    traits: {
      temperament: 'Характер',
      size: 'Размер',
      lifespan: 'Продолжительность жизни',
      care: 'Уход',
    },
    breedCards: [
      {
        name: 'Корги',
        origin: 'Уэльс, Великобритания',
        temperament: 'Жизнерадостный, умный, общительный',
        size: 'Маленький (10–14 кг)',
        lifespan: '12–15 лет',
        care: 'Умеренный — нужна активность и уход за шерстью',
        description:
          'Корги — пастушья порода с большим сердцем. Несмотря на короткие лапки, очень энергичны и подвижны. Обожают людей, легко обучаются и становятся настоящими любимцами семьи.',
      },
      {
        name: 'Немецкая овчарка',
        origin: 'Германия',
        temperament: 'Верный, смелый, уравновешенный',
        size: 'Крупный (30–40 кг)',
        lifespan: '9–13 лет',
        care: 'Высокий — нужны нагрузки, дрессировка, уход за шерстью',
        description:
          'Одна из самых универсальных пород. Служебные, сторожевые, поводыри и компаньоны. Немецкая овчарка отличается преданностью, интеллектом и работоспособностью. Требует регулярной дрессировки и активных прогулок.',
      },
      {
        name: 'Лабрадор-ретривер',
        origin: 'Канада',
        temperament: 'Добрый, ласковый, энергичный',
        size: 'Крупный (25–36 кг)',
        lifespan: '10–14 лет',
        care: 'Умеренный — много движения, контроль питания',
        description:
          'Лабрадор — чемпион по доброте. Идеален для семей с детьми, обожает воду и апортировку. Легко обучается, дружелюбен ко всем. Склонен к перееданию, поэтому порции нужно контролировать.',
      },
      {
        name: 'Чихуахуа',
        origin: 'Мексика',
        temperament: 'Смелый, преданный, насторожённый',
        size: 'Очень маленький (1–3 кг)',
        lifespan: '14–18 лет',
        care: 'Низкий — компактный, но требует тепла и социализации',
        description:
          'Самая маленькая порода в мире с огромным характером. Чихуахуа предан одному хозяину, отлично чувствует себя в квартире. Нуждается в тёплой одежде зимой и бережном обращении.',
      },
      {
        name: 'Мейн-кун',
        origin: 'США, штат Мэн',
        temperament: 'Спокойный, дружелюбный, независимый',
        size: 'Крупный (4–8 кг)',
        lifespan: '12–15 лет',
        care: 'Умеренный — расчёсывание шерсти 2–3 раза в неделю',
        description:
          'Мейн-кун — крупнейшая домашняя кошка, «ласковый великан». Обладает собачьим характером: привязан к хозяину, любит воду и игры. Шерсть требует регулярного ухода, особенно в период линьки.',
      },
      {
        name: 'Сиамская',
        origin: 'Таиланд',
        temperament: 'Разговорчивый, ласковый, общительный',
        size: 'Средний (3–5 кг)',
        lifespan: '15–20 лет',
        care: 'Низкий — короткая шерсть, минимальный уход',
        description:
          'Сиамская кошка — интеллектуал и «болтун». Общается с хозяином звуками, требует внимания и не любит одиночество. Короткая шерсть почти не требует ухода, но нужен регулярный контакт с человеком.',
      },
      {
        name: 'Британская',
        origin: 'Великобритания',
        temperament: 'Спокойный, сдержанный, независимый',
        size: 'Средний (4–7 кг)',
        lifespan: '12–17 лет',
        care: 'Умеренный — уход за плюшевой шерстью, контроль питания',
        description:
          'Британская короткошёрстная — аристократ с плюшевой шубкой. Спокойна, ненавязчива, отлично подходит для занятых людей. Склонна к набору веса, поэтому важен сбалансированный рацион и игра.',
      },
      {
        name: 'Сфинкс',
        origin: 'Канада',
        temperament: 'Ласковый, общительный, теплолюбивый',
        size: 'Средний (3–5 кг)',
        lifespan: '12–16 лет',
        care: 'Высокий — купание, защита от холода и солнца',
        description:
          'Сфинкс — бесшерстная кошка с тёплой кожей. Очень ласкова, обожает людей и тепло. Требует особого ухода: регулярное купание, защита от прямого солнца и холода, контроль температуры в доме.',
      },
    ],
  },
  care: {
    title: 'Уход и кормление',
    subtitle:
      'Практические советы по уходу за собаками и кошками — от груминга до ветеринарных осмотров и распорядка дня.',
    dogTitle: 'Уход за собакой',
    catTitle: 'Уход за кошкой',
    dogCards: [
      {
        icon: 'Footprints',
        title: 'Прогулки и активность',
        text:
          'Собаке нужны 2–3 прогулки в день общей продолжительностью от 1,5 часов. Активным породам — бег, игры с мячом, плавание. Без должной нагрузки собака заскучает и начнёт портить вещи.',
      },
      {
        icon: 'Scissors',
        title: 'Груминг',
        text:
          'Расчёсывайте шерсть 2–3 раза в неделю, в период линьки — ежедневно. Купание раз в 1–2 месяца. Длинношёрстным породам нужна стрижка. Регулярно подстригайте когти и чистите уши.',
      },
      {
        icon: 'Stethoscope',
        title: 'Ветеринар и прививки',
        text:
          'Ежегодный осмотр, вакцинация от бешенства и инфекций. Обработка от блох и клещей в тёплый сезон. Контроль веса и зубов. После 7 лет — осмотры раз в полгода.',
      },
      {
        icon: 'Clock',
        title: 'Распорядок дня',
        text:
          'Кормление 2 раза в день в одно время. Утренняя и вечерняя прогулки. Время для игр и дрессировки. Собаки любят рутину — стабильность снижает стресс и укрепляет доверие.',
      },
    ],
    catCards: [
      {
        icon: 'Home',
        title: 'Пространство и лоток',
        text:
          'Кошке нужен тихий уголок с лежанкой, лоток в уединённом месте. Лоток убирайте ежедневно. Длинношёрстным и крупным кошкам — закрытые лотки большего размера.',
      },
      {
        icon: 'Scissors',
        title: 'Груминг',
        text:
          'Короткошёрстных расчёсывают раз в неделю, длинношёрстных — ежедневно. Купание по необходимости. Обязательно подстригайте когти и следите за зубами — кошки склонны к зубному камню.',
      },
      {
        icon: 'Stethoscope',
        title: 'Ветеринар и прививки',
        text:
          'Ежегодная вакцинация, осмотр и анализ кала. Стерилизация снижает риск онкологии. Кошки скрывают болезнь — при изменении поведения сразу обращайтесь к ветеринару.',
      },
      {
        icon: 'Cat',
        title: 'Игры и обогащение',
        text:
          'Кошке нужны игры 15–30 минут в день — удочки, лазеры, пищевые головоломки. Когтеточки на каждом этаже. Доступ к окну или вертикальным пространствам — кошки любят наблюдать сверху.',
      },
    ],
  },
  food: {
    title: 'Виды кормов',
    subtitle:
      'Сравнение типов питания для кошек и собак — плюсы, минусы и особенности каждого варианта.',
    types: [
      {
        name: 'Сухой корм',
        icon: 'Wheat',
        description:
          'Гранулы с балансом белков, жиров, углеводов, витаминов и минералов. Самый распространённый и удобный вариант повседневного питания.',
        pros: [
          'Удобно хранить и дозировать',
          'Помогает очищать зубы от налёта',
          'Дольше сохраняет свежесть в миске',
          'Экономичнее других видов',
        ],
        cons: [
          'Содержит мало влаги — нужен свободный доступ к воде',
          'Низкокачественные корма содержат много зерна',
          'Не все питомцы едят с удовольствием',
        ],
      },
      {
        name: 'Влажный корм / Консервы',
        icon: 'Droplet',
        description:
          'Паштеты, кусочки в соусе или желе. Содержат 70–85% влаги, ближе к естественному рациону. Отлично подходит для привередливых питомцев и животных с проблемами мочеиспускания.',
        pros: [
          'Высокое содержание влаги — профилактика МКБ',
          'Привлекательный вкус и аромат',
          'Легко переваривается, подходит пожилым',
          'Меньше углеводов, чем в сухом корме',
        ],
        cons: [
          'Дороже сухого корма при ежедневном использовании',
          'Быстро портится в миске',
          'Требует хранения в холодильнике после вскрытия',
        ],
      },
      {
        name: 'Натуральное питание',
        icon: 'Beef',
        description:
          'Рацион из натуральных продуктов: мясо, субпродукты, овощи, крупы, кисломолочные продукты. Требует расчёта баланса нутриентов и добавления витаминно-минеральных комплексов.',
        pros: [
          'Полный контроль над составом и качеством',
          'Отсутствие искусственных добавок',
          'Подходит питомцам с аллергией на промышленный корм',
          'Разнообразие рациона',
        ],
        cons: [
          'Требует времени на приготовление',
          'Сложно сбалансировать без консультации ветеринара',
          'Нужны витаминные добавки',
          'Не подходит для занятых хозяев',
        ],
      },
    ],
    brandsTitle: 'Примеры популярных кормов',
    brandsSubtitle:
      'Обзор проверенных брендов на рынке — от премиум-класса до холистик. Выбор зависит от породы, возраста и здоровья питомца.',
    brands: [
      {
        name: 'Acana / Orijen',
        category: 'Холистик',
        description:
          'Канадские корма с высоким содержанием свежего мяса (до 75–90%). Беззерновые формулы, биологически соответствующие рациону хищников. Премиум-сегмент.',
      },
      {
        name: 'Royal Canin',
        category: 'Премиум',
        description:
          'Французский бренд с линейками для конкретных пород и размеров. Научный подход к составу, специальные ветеринарные диеты. Широко доступен.',
      },
      {
        name: 'Purina Pro Plan',
        category: 'Премиум',
        description:
          'Американский бренд с формулами для разных жизненных этапов. Содержит пробиотики и оптимизированный белок. Хорошее соотношение цены и качества.',
      },
      {
        name: 'Monge',
        category: 'Супер-премиум',
        description:
          'Итальянский корм с натуральными ингредиентами. Без искусственных красителей и консервантов. Линейки для кошек и собак разных размеров.',
      },
      {
        name: 'Go! Solutions',
        category: 'Холистик',
        description:
          'Канадский беззерновой корм с высоким содержанием белка. Подходит питомцам с чувствительным пищеварением и аллергией на зерно.',
      },
      {
        name: 'Grandorf',
        category: 'Супер-премиум',
        description:
          'Итальянский бренд с беззерновыми и низкозерновыми линейками. Содержит пробиотики, омега-3 и омега-6. Популярен для кошек и мелких собак.',
      },
    ],
    feedingGuideTitle: 'Нормы кормления по весу',
    feedingGuideSubtitle:
      'Примерные суточные нормы для взрослых животных при умеренной активности. Точные порции зависят от калорийности корма — ориентируйтесь на упаковку.',
    feedingGuide: [
      {
        breed: 'Чихуахуа',
        weight: '1–3 кг',
        dryAmount: '25–55 г',
        wetAmount: '50–110 г',
      },
      {
        breed: 'Корги',
        weight: '10–14 кг',
        dryAmount: '120–170 г',
        wetAmount: '250–350 г',
      },
      {
        breed: 'Британская кошка',
        weight: '4–7 кг',
        dryAmount: '45–75 г',
        wetAmount: '90–150 г',
      },
      {
        breed: 'Сиамская / Сфинкс',
        weight: '3–5 кг',
        dryAmount: '35–60 г',
        wetAmount: '70–120 г',
      },
      {
        breed: 'Мейн-кун',
        weight: '4–8 кг',
        dryAmount: '50–90 г',
        wetAmount: '100–180 г',
      },
      {
        breed: 'Лабрадор-ретривер',
        weight: '25–36 кг',
        dryAmount: '280–380 г',
        wetAmount: '550–750 г',
      },
      {
        breed: 'Немецкая овчарка',
        weight: '30–40 кг',
        dryAmount: '320–420 г',
        wetAmount: '630–830 г',
      },
    ],
    guideColumns: {
      breed: 'Порода',
      weight: 'Вес',
      dry: 'Сухой корм / сутки',
      wet: 'Влажный корм / сутки',
    },
    disclaimer:
      'Внимание: вся информация в данном разделе носит исключительно ознакомительный характер. Точные нормы кормления, выбор бренда и диету должен определять ветеринарный врач с учётом индивидуальных особенностей вашего питомца — породы, возраста, веса, уровня активности и состояния здоровья.',
  },
  contacts: {
    title: 'Контакты и обратная связь',
    subtitle:
      'Есть вопрос или предложение? Напишите нам — мы отвечаем в течение 1–2 рабочих дней.',
    name: 'Ваше имя',
    email: 'Электронная почта',
    message: 'Сообщение',
    subject: 'Тема обращения',
    subjects: [
      'Общий вопрос',
      'Подбор породы',
      'Уход и кормление',
      'Сотрудничество',
      'Ошибка на сайте',
    ],
    submit: 'Отправить',
    success: 'Сообщение отправлено!',
    successDesc: 'Спасибо за обращение. Мы свяжемся с вами в ближайшее время.',
    contactInfo: 'Контактная информация',
    emailLabel: 'Электронная почта',
    socialLabel: 'Мы в соцсетях',
    address: 'Адрес',
    addressValue: 'г. Москва, ул. Хвостатая, д. 4, офис 2',
  },
  footer: {
    about: 'О проекте',
    aboutText:
      'УсыХвост — образовательный проект о кошках и собаках. Помогаем выбрать питомца, понять его потребности и обеспечить наилучший уход.',
    links: 'Разделы',
    contact: 'Контакты',
    rights: 'Все права защищены.',
  },
};

const en: Translation = {
  nav: {
    history: 'History',
    quiz: 'Quiz',
    breeds: 'Breeds',
    care: 'Care',
    food: 'Food',
    contacts: 'Contacts',
  },
  hero: {
    title: 'Whiskertails',
    subtitle:
      'Your guide to the world of cats and dogs — domestication history, breed matching, care and feeding tips.',
    cta: 'Take the quiz',
    secondaryCta: 'Browse breeds',
    stat1: '15,000+',
    stat1label: 'years of friendship with dogs',
    stat2: '9,500+',
    stat2label: 'years alongside cats',
    stat3: '400+',
    stat3label: 'breeds in the catalog',
  },
  history: {
    title: 'History of Domestication',
    subtitle:
      'The journey from wild animals to beloved family members — how cats and dogs became our faithful companions.',
    dogTitle: 'Dogs — humanity\'s first friends',
    catTitle: 'Cats — the path to the hearth',
    dogText:
      'Dogs were the first domesticated animals. Their ancestors — wolves — began approaching human camps seeking food scraps. A mutually beneficial alliance formed: humans gained guards and hunting partners, while wolves got regular food and warmth by the fire. Over millennia, selective breeding changed not just appearance but character — loyalty, ability to understand commands, and emotional bonding with humans.',
    catText:
      'Cats domesticated themselves. When humans turned to agriculture, granaries attracted rodents, which in turn drew wild cats. It was beneficial for humans to tolerate cats nearby, and so began a coexistence in which the cat retained its independence. Unlike dogs, cats changed little genetically — they remained hunters who simply chose to live alongside humans.',
    timeline: [
      {
        era: '~15,000 years ago',
        title: 'First steps toward friendship',
        text:
          'Wolves begin approaching ancient human camps. The domestication process begins — the friendliest individuals receive food and protection.',
      },
      {
        era: '~12,000 years ago',
        title: 'Dogs as helpers',
        text:
          'Domesticated wolves become full-fledged human companions: helping hunt, guarding camps, pulling sleds. The first dog types emerge.',
      },
      {
        era: '~9,500 years ago',
        title: 'Cats enter settlements',
        text:
          'In the Near East, with the rise of agriculture, cats begin living near humans, protecting grain from rodents. In Ancient Egypt, the cat is deified.',
      },
      {
        era: '~3,000 years ago',
        title: 'Breed diversity',
        text:
          'Humans deliberately select dogs for working qualities — giving rise to hounds, sighthounds, herding and guard breeds.',
      },
      {
        era: '19th century',
        title: 'The era of breeders',
        text:
          'The first breed clubs and standards appear. Dogs and cats become not just helpers but companions and show animals.',
      },
      {
        era: '20th–21st century',
        title: 'Family members',
        text:
          'Pets move into homes and apartments, receive veterinary care, specialized nutrition, and the status of full-fledged family members.',
      },
    ],
  },
  quiz: {
    title: 'Quiz: Who is your ideal pet?',
    subtitle:
      'Answer a few questions about your lifestyle — and we\'ll suggest whether a cat or a dog suits you best, with breed recommendations.',
    start: 'Start quiz',
    next: 'Next',
    back: 'Back',
    restart: 'Restart',
    resultTitle: 'Your result',
    resultDog: 'A dog is perfect for you!',
    resultCat: 'A cat is perfect for you!',
    resultDogDesc:
      'You are active, love spending time outdoors, and are ready to give a pet plenty of attention. A dog will be your loyal companion and a source of joy every day.',
    resultCatDesc:
      'You value coziness and calm, with a measured lifestyle. A cat will bring you warmth and independence — nearby without demanding constant attention.',
    recommendedBreeds: 'Recommended breeds',
    questions: [
      {
        question: 'How would you describe your activity level?',
        options: [
          { text: 'Very active — sports, hiking, movement every day', type: 'dog' },
          { text: 'Moderate — walks, occasional sports', type: 'dog' },
          { text: 'Calm — prefer relaxing at home', type: 'cat' },
          { text: 'Irregular — it varies', type: 'cat' },
        ],
      },
      {
        question: 'Where do you live?',
        options: [
          { text: 'House with a yard', type: 'dog' },
          { text: 'Spacious apartment', type: 'dog' },
          { text: 'Small studio apartment', type: 'cat' },
          { text: 'Shared room / roommates', type: 'cat' },
        ],
      },
      {
        question: 'How much free time per day can you dedicate to a pet?',
        options: [
          { text: 'More than 3 hours — ready to walk and play', type: 'dog' },
          { text: '1–3 hours — time to interact', type: 'dog' },
          { text: 'Less than 1 hour — work late', type: 'cat' },
          { text: 'Irregular — flexible schedule', type: 'cat' },
        ],
      },
      {
        question: 'How do you feel about daily walks in any weather?',
        options: [
          { text: 'Love it — rain and snow are no problem', type: 'dog' },
          { text: 'Don\'t mind, but lazy in bad weather', type: 'dog' },
          { text: 'Don\'t want to walk every day', type: 'cat' },
          { text: 'Prefer staying home', type: 'cat' },
        ],
      },
      {
        question: 'What matters most to you in a pet?',
        options: [
          { text: 'Loyalty, devotion, shared adventures', type: 'dog' },
          { text: 'Independence, coziness, calm presence', type: 'cat' },
          { text: 'Energy, playfulness, constant movement', type: 'dog' },
          { text: 'Softness, affection, unobtrusiveness', type: 'cat' },
        ],
      },
      {
        question: 'Do you have children or other pets at home?',
        options: [
          { text: 'Have children — need an active and kind friend', type: 'dog' },
          { text: 'Have other pets', type: 'cat' },
          { text: 'Live alone', type: 'cat' },
          { text: 'Frequent guests — need a sociable dog', type: 'dog' },
        ],
      },
    ],
  },
  breeds: {
    title: 'Breed Catalog',
    subtitle:
      'Detailed cards of popular dog and cat breeds — temperament, size, lifespan and care specifics.',
    dogs: 'Dogs',
    cats: 'Cats',
    all: 'All',
    traits: {
      temperament: 'Temperament',
      size: 'Size',
      lifespan: 'Lifespan',
      care: 'Care',
    },
    breedCards: [
      {
        name: 'Corgi',
        origin: 'Wales, UK',
        temperament: 'Cheerful, smart, sociable',
        size: 'Small (10–14 kg)',
        lifespan: '12–15 years',
        care: 'Moderate — needs activity and coat care',
        description:
          'Corgis are a herding breed with a big heart. Despite short legs, they are very energetic and agile. They love people, learn easily, and become true family favorites.',
      },
      {
        name: 'German Shepherd',
        origin: 'Germany',
        temperament: 'Loyal, brave, balanced',
        size: 'Large (30–40 kg)',
        lifespan: '9–13 years',
        care: 'High — needs exercise, training, coat care',
        description:
          'One of the most versatile breeds. Service, guard, guide and companion dogs. German Shepherds are known for loyalty, intelligence and work ethic. They require regular training and active walks.',
      },
      {
        name: 'Labrador Retriever',
        origin: 'Canada',
        temperament: 'Kind, affectionate, energetic',
        size: 'Large (25–36 kg)',
        lifespan: '10–14 years',
        care: 'Moderate — lots of movement, diet control',
        description:
          'The Labrador is the champion of kindness. Ideal for families with children, loves water and fetching. Easy to train, friendly to everyone. Prone to overeating, so portions must be controlled.',
      },
      {
        name: 'Chihuahua',
        origin: 'Mexico',
        temperament: 'Brave, devoted, alert',
        size: 'Very small (1–3 kg)',
        lifespan: '14–18 years',
        care: 'Low — compact, but needs warmth and socialization',
        description:
          'The smallest breed in the world with a huge personality. The Chihuahua is devoted to one owner, feels great in apartments. Needs warm clothes in winter and gentle handling.',
      },
      {
        name: 'Maine Coon',
        origin: 'USA, Maine',
        temperament: 'Calm, friendly, independent',
        size: 'Large (4–8 kg)',
        lifespan: '12–15 years',
        care: 'Moderate — brush coat 2–3 times a week',
        description:
          'The Maine Coon is the largest domestic cat, a "gentle giant." Has a dog-like character: attached to the owner, loves water and games. The coat requires regular care, especially during shedding.',
      },
      {
        name: 'Siamese',
        origin: 'Thailand',
        temperament: 'Talkative, affectionate, sociable',
        size: 'Medium (3–5 kg)',
        lifespan: '15–20 years',
        care: 'Low — short coat, minimal grooming',
        description:
          'The Siamese cat is an intellectual and a "talker." Communicates with the owner through sounds, needs attention and dislikes solitude. Short coat requires almost no care, but regular human contact is essential.',
      },
      {
        name: 'British Shorthair',
        origin: 'United Kingdom',
        temperament: 'Calm, reserved, independent',
        size: 'Medium (4–7 kg)',
        lifespan: '12–17 years',
        care: 'Moderate — plush coat care, diet control',
        description:
          'The British Shorthair is an aristocrat with a plush coat. Calm, unobtrusive, great for busy people. Prone to weight gain, so a balanced diet and play are important.',
      },
      {
        name: 'Sphynx',
        origin: 'Canada',
        temperament: 'Affectionate, sociable, heat-loving',
        size: 'Medium (3–5 kg)',
        lifespan: '12–16 years',
        care: 'High — bathing, protection from cold and sun',
        description:
          'The Sphynx is a hairless cat with warm skin. Very affectionate, loves people and warmth. Requires special care: regular bathing, protection from direct sun and cold, temperature control at home.',
      },
    ],
  },
  care: {
    title: 'Care & Feeding',
    subtitle:
      'Practical tips for caring for dogs and cats — from grooming to vet visits and daily routines.',
    dogTitle: 'Dog Care',
    catTitle: 'Cat Care',
    dogCards: [
      {
        icon: 'Footprints',
        title: 'Walks & Activity',
        text:
          'A dog needs 2–3 walks a day totaling at least 1.5 hours. Active breeds need running, ball games, swimming. Without proper exercise, a dog gets bored and starts destroying things.',
      },
      {
        icon: 'Scissors',
        title: 'Grooming',
        text:
          'Brush the coat 2–3 times a week, daily during shedding. Bathe once every 1–2 months. Long-haired breeds need trimming. Regularly trim nails and clean ears.',
      },
      {
        icon: 'Stethoscope',
        title: 'Vet & Vaccines',
        text:
          'Annual checkup, vaccination against rabies and infections. Flea and tick treatment in warm season. Weight and dental monitoring. After age 7, checkups every 6 months.',
      },
      {
        icon: 'Clock',
        title: 'Daily Routine',
        text:
          'Feed twice a day at the same time. Morning and evening walks. Time for play and training. Dogs love routine — stability reduces stress and builds trust.',
      },
    ],
    catCards: [
      {
        icon: 'Home',
        title: 'Space & Litter Box',
        text:
          'A cat needs a quiet corner with a bed, a litter box in a secluded spot. Clean the box daily. Long-haired and large cats need covered boxes of a larger size.',
      },
      {
        icon: 'Scissors',
        title: 'Grooming',
        text:
          'Brush short-haired cats once a week, long-haired cats daily. Bathe as needed. Always trim nails and watch teeth — cats are prone to tartar buildup.',
      },
      {
        icon: 'Stethoscope',
        title: 'Vet & Vaccines',
        text:
          'Annual vaccination, checkup and stool analysis. Spaying reduces cancer risk. Cats hide illness — if behavior changes, see a vet immediately.',
      },
      {
        icon: 'Cat',
        title: 'Play & Enrichment',
        text:
          'A cat needs 15–30 minutes of play daily — wands, lasers, food puzzles. Scratching posts on every floor. Access to windows or vertical spaces — cats love to observe from above.',
      },
    ],
  },
  food: {
    title: 'Types of Pet Food',
    subtitle:
      'A comparison of food types for cats and dogs — pros, cons and features of each option.',
    types: [
      {
        name: 'Dry Food',
        icon: 'Wheat',
        description:
          'Kibble with balanced proteins, fats, carbs, vitamins and minerals. The most common and convenient everyday food option.',
        pros: [
          'Convenient to store and portion',
          'Helps clean teeth from plaque',
          'Stays fresh longer in the bowl',
          'More economical than other types',
        ],
        cons: [
          'Low moisture — need free access to water',
          'Low-quality foods contain lots of grain',
          'Not all pets enjoy eating it',
        ],
      },
      {
        name: 'Wet Food / Canned',
        icon: 'Droplet',
        description:
          'Pâtés, pieces in sauce or jelly. Contains 70–85% moisture, closer to a natural diet. Great for picky eaters and pets with urinary issues.',
        pros: [
          'High moisture — prevents FLUTD',
          'Appealing taste and aroma',
          'Easy to digest, suitable for seniors',
          'Fewer carbs than dry food',
        ],
        cons: [
          'More expensive than dry food for daily use',
          'Spoils quickly in the bowl',
          'Requires refrigeration after opening',
        ],
      },
      {
        name: 'Natural Diet',
        icon: 'Beef',
        description:
          'A diet of natural products: meat, offal, vegetables, grains, dairy. Requires calculating nutrient balance and adding vitamin-mineral supplements.',
        pros: [
          'Full control over composition and quality',
          'No artificial additives',
          'Suitable for pets allergic to commercial food',
          'Diet variety',
        ],
        cons: [
          'Requires time to prepare',
          'Hard to balance without a vet consult',
          'Needs vitamin supplements',
          'Not suitable for busy owners',
        ],
      },
    ],
    brandsTitle: 'Popular Food Brands',
    brandsSubtitle:
      'An overview of trusted brands on the market — from premium to holistic. The choice depends on your pet\'s breed, age and health.',
    brands: [
      {
        name: 'Acana / Orijen',
        category: 'Holistic',
        description:
          'Canadian foods with high fresh meat content (up to 75–90%). Grain-free formulas, biologically appropriate diets for carnivores. Premium segment.',
      },
      {
        name: 'Royal Canin',
        category: 'Premium',
        description:
          'French brand with breed- and size-specific lines. Science-based formulation, specialized veterinary diets. Widely available.',
      },
      {
        name: 'Purina Pro Plan',
        category: 'Premium',
        description:
          'American brand with formulas for different life stages. Contains probiotics and optimized protein. Good value for money.',
      },
      {
        name: 'Monge',
        category: 'Super-premium',
        description:
          'Italian food with natural ingredients. No artificial colors or preservatives. Lines for cats and dogs of different sizes.',
      },
      {
        name: 'Go! Solutions',
        category: 'Holistic',
        description:
          'Canadian grain-free food with high protein content. Suitable for pets with sensitive digestion and grain allergies.',
      },
      {
        name: 'Grandorf',
        category: 'Super-premium',
        description:
          'Italian brand with grain-free and low-grain lines. Contains probiotics, omega-3 and omega-6. Popular for cats and small dogs.',
      },
    ],
    feedingGuideTitle: 'Feeding Amounts by Weight',
    feedingGuideSubtitle:
      'Approximate daily amounts for adult animals with moderate activity. Exact portions depend on food calorie content — check the packaging.',
    feedingGuide: [
      {
        breed: 'Chihuahua',
        weight: '1–3 kg',
        dryAmount: '25–55 g',
        wetAmount: '50–110 g',
      },
      {
        breed: 'Corgi',
        weight: '10–14 kg',
        dryAmount: '120–170 g',
        wetAmount: '250–350 g',
      },
      {
        breed: 'British Shorthair',
        weight: '4–7 kg',
        dryAmount: '45–75 g',
        wetAmount: '90–150 g',
      },
      {
        breed: 'Siamese / Sphynx',
        weight: '3–5 kg',
        dryAmount: '35–60 g',
        wetAmount: '70–120 g',
      },
      {
        breed: 'Maine Coon',
        weight: '4–8 kg',
        dryAmount: '50–90 g',
        wetAmount: '100–180 g',
      },
      {
        breed: 'Labrador Retriever',
        weight: '25–36 kg',
        dryAmount: '280–380 g',
        wetAmount: '550–750 g',
      },
      {
        breed: 'German Shepherd',
        weight: '30–40 kg',
        dryAmount: '320–420 g',
        wetAmount: '630–830 g',
      },
    ],
    guideColumns: {
      breed: 'Breed',
      weight: 'Weight',
      dry: 'Dry food / day',
      wet: 'Wet food / day',
    },
    disclaimer:
      'Attention: all information in this section is for informational purposes only. Exact feeding amounts, brand choice and diet should be determined by a veterinarian, taking into account your pet\'s individual characteristics — breed, age, weight, activity level and health status.',
  },
  contacts: {
    title: 'Contacts & Feedback',
    subtitle:
      'Have a question or suggestion? Write to us — we respond within 1–2 business days.',
    name: 'Your name',
    email: 'Email address',
    message: 'Message',
    subject: 'Subject',
    subjects: [
      'General question',
      'Breed selection',
      'Care & feeding',
      'Partnership',
      'Website error',
    ],
    submit: 'Send',
    success: 'Message sent!',
    successDesc: 'Thank you for reaching out. We will contact you shortly.',
    contactInfo: 'Contact information',
    emailLabel: 'Email',
    socialLabel: 'Follow us',
    address: 'Address',
    addressValue: 'Moscow, Khvostataya St., 4, office 2',
  },
  footer: {
    about: 'About',
    aboutText:
      'Whiskertails is an educational project about cats and dogs. We help you choose a pet, understand their needs, and provide the best care.',
    links: 'Sections',
    contact: 'Contacts',
    rights: 'All rights reserved.',
  },
};

export const translations: Record<Lang, Translation> = { ru, en };
