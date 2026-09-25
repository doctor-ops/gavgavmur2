export interface Breed {
  id: string;
  name: string;
  type: 'cat' | 'dog';
  temperament: 'active' | 'calm' | 'independent' | 'friendly';
  size: 'small' | 'medium' | 'large';
  description: string;
  image: string;
  lifeSpan: string;
  weight: string;
  origin: string;
}

export const BREEDS_DATABASE: Breed[] = [

  {
    id: "036feed0-da8a-42c9-ab9a-57449b530b13",
    name: "Аффенпинчер",
    type: "dog",
    temperament: "уверенный, любопытный, игривый",
    size: "small",
    description: "Аффенпинчер — это маленькая и игривая порода собак, которая изначально была выведена в Германии для охоты на мелкую дичь. Они умны, энергичны, ласковы и являются прекрасными собаками-компаньонами.",
    image: "https://images.dogapi.dog/21mg55zlym6nq3o6cm56v0itkdad",
    lifeSpan: "14–16 лет",
    weight: "4–6 кг",
    origin: "Германия"
  },
  {
    id: "dd9362cc-52e0-462d-b856-fccdcf24b140",
    name: "Афганская борзая",
    type: "dog",
    temperament: "достойный, отстраненный, независимый",
    size: "large",
    description: "Афганская борзая — крупная и элегантная порода собак, которая изначально была выведена в Афганистане для охоты на мелкую дичь. Они умны, независимы, атлетичны и являются прекрасными собаками-компаньонами.",
    image: "https://images.dogapi.dog/issmoegbcrewau20uk35f3ivs0nw",
    lifeSpan: "12–14 лет",
    weight: "23–27 кг",
    origin: "Афганистан"
  },
  {
    id: "1460844f-841c-4de8-b788-271aa4d63224",
    name: "Эйрдейл-терьер",
    type: "dog",
    temperament: "умный, смелый, уверенный",
    size: "medium",
    description: "Эйрдейл-терьер — крупная и мощная порода собак, которая изначально была выведена в Англии для охоты на мелкую дичь. Они умны, энергичны и решительны, и являются отличными охотничьими собаками.",
    image: "https://images.dogapi.dog/bcxbm3snnpr7p7cxexx47lqi56m7",
    lifeSpan: "12–14 лет",
    weight: "20–23 кг",
    origin: "Англия"
  },
  {
    id: "e7e99424-d514-4b56-9f0c-05736f6dd22d",
    name: "Акита-ину",
    type: "dog",
    temperament: "достойный, смелый, бдительный",
    size: "large",
    description: "Акита — крупная, мускулистая порода собак, зародившаяся в Японии. Они известны своей преданностью и мужеством.",
    image: "https://images.dogapi.dog/gm1pcg0vbtzer9ih4xcrmgkzzf80",
    lifeSpan: "10–14 лет",
    weight: "35–60 кг",
    origin: "Япония"
  },
  {
    id: "667c7359-a739-4f2b-abb4-98867671e375",
    name: "Аляскинский кли-кай",
    type: "dog",
    temperament: "бдительный, энергичный, любопытный",
    size: "small",
    description: "Аляскинский кли-кай — порода собак от маленького до среднего размера, разработанная на Аляске в 1970-х годах. Это активная и умная порода, преданная и дружелюбная.",
    image: "https://images.dogapi.dog/xdnhqya6l6s646eds3qfexmpv97a",
    lifeSpan: "12–15 лет",
    weight: "5–10 кг",
    origin: "США"
  },
  {
    id: "5328d59b-b4e4-48e9-98ec-0545c66c4385",
    name: "Аляскинский маламут",
    type: "dog",
    temperament: "ласковый, дружелюбный, преданный",
    size: "large",
    description: "Аляскинский маламут — крупная и мощная ездовая собака с Аляски. Они сильные и трудолюбивые, но при этом дружелюбные и преданные.",
    image: "https://images.dogapi.dog/wgt6d6ayxwc1l8n1qactqfb6dl17",
    lifeSpan: "10–14 лет",
    weight: "34–39 кг",
    origin: "США"
  },
  {
    id: "f72528b5-a5d7-4a17-b709-aba2db722307",
    name: "Американский булдог",
    type: "dog",
    temperament: "уверенный, защищающий, преданный",
    size: "large",
    description: "Американский булдог — крупная и мощная порода собак, которая изначально была выведена в США для работы на фермах. Они умны, преданны, склонны к защите и являются отличными сторожевыми собаками.",
    image: "https://images.dogapi.dog/aa5mbup4678gd2rt9bts1mlw3l3q",
    lifeSpan: "10–12 лет",
    weight: "25–50 кг",
    origin: "США"
  },
  {
    id: "4524645f-dda7-4031-9272-dee29f5f91ea",
    name: "Американский английский кунхаунд",
    type: "dog",
    temperament: "энергичный, милый, решительный",
    size: "large",
    description: "Американский английский кунхаунд — крупная и атлетичная порода собак, которая изначально была выведена в США для охоты на енотов. Они умны, энергичны и решительны.",
    image: "https://images.dogapi.dog/onvblmctp4y7d9h3t49xqnjnwh4i",
    lifeSpan: "12–14 лет",
    weight: "20–29 кг",
    origin: "США"
  },
  {
    id: "e1c0664d-aa61-4c85-970d-6c86ba197bee",
    name: "Американский эскимо",
    type: "dog",
    temperament: "умный, бдительный, дружелюбный",
    size: "medium",
    description: "Американский эскимо — порода собак от маленького до среднего размера с густой пушистой шерстью белого, кремового или песочного цвета. Известна своим интеллектом.",
    image: "https://images.dogapi.dog/2cbsj208ar51xaf5scapv425cco1",
    lifeSpan: "12–15 лет",
    weight: "9–20 кг",
    origin: "США"
  },
  {
    id: "8355b9c9-3724-477d-858a-c1c1c0f1743f",
    name: "Американский фоксхаунд",
    type: "dog",
    temperament: "независимый, решительный, добродушный",
    size: "large",
    description: "Американский фоксхаунд — крупная и атлетичная порода собак, которая изначально была выведена в США для охоты на лис. Они умны, энергичны и решительны.",
    image: "https://images.dogapi.dog/j17f71br0ieud05o0gqba0w5fd5u",
    lifeSpan: "11–13 лет",
    weight: "27–32 кг",
    origin: "США"
  },
  {
    id: "bba868bb-71ce-4e66-9970-861fb5af642f",
    name: "Американский бесшерстный терьер",
    type: "dog",
    temperament: "энергичный, бдительный, любопытный",
    size: "small",
    description: "Американский бесшерстный терьер — порода терьеров от маленького до среднего размера, зародившаяся в США. Это бесшерстная разновидность крысиного терьера.",
    image: "https://images.dogapi.dog/16ig6nl045xcpktek29bb3kkva4k",
    lifeSpan: "12–14 лет",
    weight: "5–7 кг",
    origin: "США"
  },
  {
    id: "7b1fef86-3fa7-4dd0-92d2-8d7a5524e844",
    name: "Американская леопардовая гончая",
    type: "dog",
    temperament: "выносливый, решительный, преданный",
    size: "large",
    description: "Американская леопардовая гончая — крупная, атлетичная порода собак, которая изначально была выведена для охоты. Они известны своей пятнистой шерстью и острым нюхом.",
    image: "https://images.dogapi.dog/910imsy08r01j39b21fqmytllcet",
    lifeSpan: "12–15 лет",
    weight: "20–34 кг",
    origin: "США"
  },
  {
    id: "30a056b8-2bbe-4aa9-b874-c511eb2ca775",
    name: "Американский стаффордширский терьер",
    type: "dog",
    temperament: "уверенный, добродушный, смелый",
    size: "medium",
    description: "Американский стаффордширский терьер — собака среднего размера, которая изначально выводилась для собачьих боев. Они умны, преданны и склонны к защите.",
    image: "https://images.dogapi.dog/t3uk9f9fjah8q695hm7ijm4wje3b",
    lifeSpan: "12–16 лет",
    weight: "18–40 кг",
    origin: "США"
  },
  {
    id: "46a95f0b-8b66-400d-8323-07084c36fcae",
    name: "Американский водяной спаниель",
    type: "dog",
    temperament: "умный, энергичный, ласковый",
    size: "medium",
    description: "Американский водяной спаниель — собака среднего размера, которая изначально была выведена в США для охоты на водоплавающую дичь.",
    image: "https://images.dogapi.dog/veaf40qcaqdi750rmfu8ximkqq71",
    lifeSpan: "12–14 лет",
    weight: "15–20 кг",
    origin: "США"
  },
  {
    id: "c94e50a5-f733-4b15-8b11-54598c949b6f",
    name: "Анатолийская овчарка",
    type: "dog",
    temperament: "бдительный, умный, спокойный",
    size: "large",
    description: "Анатолийская овчарка — крупная порода собак-пастухов, зародившаяся в Турции. Это мощная и атлетичная порода с длинной жесткой шерстью.",
    image: "https://images.dogapi.dog/xkqz82fjpyty95mgqcme1uoe55nb",
    lifeSpan: "11–13 лет",
    weight: "50–70 кг",
    origin: "Турция"
  },
  {
    id: "b56e4273-9ec0-4274-831d-b238225f8fb6",
    name: "Аппенцеллерский сенненхунд",
    type: "dog",
    temperament: "оживленный, бдительный, уверенный",
    size: "medium",
    description: "Аппенцеллерский сенненхунд — крупная порода горных собак из Швейцарии. Это мощная и атлетичная порода с густой двойной шерстью.",
    image: "https://images.dogapi.dog/67yrhuohul38sw8qugrica4y645h",
    lifeSpan: "12–15 лет",
    weight: "22–32 кг",
    origin: "Швейцария"
  },
  {
    id: "0543cf54-a255-402e-84e5-f440cc2a67cc",
    name: "Австралийский cattle dog",
    type: "dog",
    temperament: "бдительный, любопытный, умный",
    size: "medium",
    description: "Австралийский cattle dog — порода собак среднего размера, которая изначально была выведена в Австралии для выпаса и охраны скота.",
    image: "https://images.dogapi.dog/kvyorjfdviljjfa1f3bq8petjsb6",
    lifeSpan: "12–15 лет",
    weight: "15–23 кг",
    origin: "Австралия"
  },
  {
    id: "2adf5a19-028d-4993-8044-4571008b6d49",
    name: "Австралийский келпи",
    type: "dog",
    temperament: "бдительный, послушный, неутомимый",
    size: "medium",
    description: "Австралийский келпи — живая и умная пастушья собака из Австралии. Они активны, дружелюбны и преданы.",
    image: "https://images.dogapi.dog/3gl7iu0ssm14nhvxtu3yokfbkj3f",
    lifeSpan: "12–14 лет",
    weight: "16–20 кг",
    origin: "Австралия"
  },
  {
    id: "03269b7d-c5d6-4a8f-83d1-7a6180d40127",
    name: "Австралийская овчарка",
    type: "dog",
    temperament: "умный, энергичный, преданный",
    size: "medium",
    description: "Австралийская овчарка — собака среднего размера с двойной шерстью средней длины. Умная служебная собака, которая любит быть рядом с семьей.",
    image: "https://images.dogapi.dog/esvhl0omwg9nhe8dr1y70uotbwb9",
    lifeSpan: "12–15 лет",
    weight: "20–30 кг",
    origin: "США"
  },
  {
    id: "6e04f700-c307-4dd5-8d2f-fd346d949cd6",
    name: "Австралийский короткохвостый cattle dog",
    type: "dog",
    temperament: "бдительный, преданный, трудолюбивый",
    size: "medium",
    description: "Австралийский короткохвостый cattle dog — пастушья порода собак среднего размера с характерным коротким хвостом и гладкой густой шерстью.",
    image: "https://images.dogapi.dog/a0uh4km3pqj9vyftqlexde9tbd8h",
    lifeSpan: "12–15 лет",
    weight: "15–20 кг",
    origin: "Австралия"
  },
  {
    id: "4b3278eb-612a-4e87-b2ab-73174d039514",
    name: "Австралийский терьер",
    type: "dog",
    temperament: "бдительный, энергичный, смелый",
    size: "small",
    description: "Австралийский терьер — маленькая порода терьеров, зародившаяся в Австралии. Это компактная и живая порода с короткой жесткой шерстью.",
    image: "https://images.dogapi.dog/sy1284txtpzytvuqt7buornbwl4f",
    lifeSpan: "11–15 лет",
    weight: "6–7 кг",
    origin: "Австралия"
  },
  {
    id: "1ceaee48-1374-4b11-9c66-173cce6f5da5",
    name: "Азавак",
    type: "dog",
    temperament: "сдержанный, бдительный, независимый",
    size: "medium",
    description: "Азавак — небольшая и стройная порода собак, которая изначально была выведена в Африке для охоты и охраны. Они умны и атлетичны.",
    image: "https://images.dogapi.dog/sbljwlketls4opojox2wnhjg4709",
    lifeSpan: "12–14 лет",
    weight: "20–25 кг",
    origin: "Мали, Нигер, Буркина-Фасо"
  },
  {
    id: "cb71135b-596c-4943-892a-d0757da0297e",
    name: "Барбадо да Терсейра",
    type: "dog",
    temperament: "умный, преданный, веселый",
    size: "large",
    description: "Барбадо да Терсейра — крупная рабочая порода собак, зародившаяся на Азорских островах. Сильная порода с короткой жесткой шерстью.",
    image: "https://images.dogapi.dog/wwyxxktzimwjbdfyheltoeyhh7cc",
    lifeSpan: "12–15 лет",
    weight: "25–30 кг",
    origin: "Португалия"
  },
  {
    id: "4a230092-a25e-4efe-8240-a6693b5405f4",
    name: "Барбет",
    type: "dog",
    temperament: "дружелюбный, умный, радостный",
    size: "medium",
    description: "Барбет — древняя порода французских водяных собак. Активны, дружелюбны и очень умны. Обладают уникальной кудрявой шерстью.",
    image: "https://images.dogapi.dog/s3cgzu8qok2103nty1inmplvqH6j4",
    lifeSpan: "12–14 лет",
    weight: "18–27 кг",
    origin: "Франция"
  },
  {
    id: "edf3d596-e83b-4ba1-972b-d114a39cf3c",
    name: "Басенджи",
    type: "dog",
    temperament: "независимый, бдительный, энергичный",
    size: "small",
    description: "Басенджи — небольшая и ловкая порода собак, которая изначально была выведена в Африке для охоты на мелкую дичь. Умны и независимы.",
    image: "https://images.dogapi.dog/qv5lg4kf7x4jqp1gt263k8z5b3g9",
    lifeSpan: "14–16 лет",
    weight: "10–11 кг",
    origin: "Демократическая Республика Конго"
  },
  {
    id: "c052b615-9502-407f-b46a-845d246d9f22",
    name: "Бассет-фаве-де-бретань",
    type: "dog",
    temperament: "ласковый, игривый, смелый",
    size: "medium",
    description: "Бассет-фаве-де-бретань — маленькая и игривая порода собак, которая изначально была выведена во Франции для охоты на мелкую дичь.",
    image: "https://images.dogapi.dog/p0c14jbxgmru74bgi10ll9hnw66l",
    lifeSpan: "12–15 лет",
    weight: "14–19 кг",
    origin: "Франция"
  },
  {
    id: "3e4912ab-bf3c-40cd-8eb9-be1e5999179b",
    name: "Бассет-хаунд",
    type: "dog",
    temperament: "обаятельный, терпеливый, спокойный",
    size: "large",
    description: "Бассет-хаунд — маленькая и игривая порода собак, которая изначально была выведена во Франции для охоты на мелкую дичь.",
    image: "https://images.dogapi.dog/czki7jqk0p3lm7338gdd3ng5tmlx",
    lifeSpan: "12–14 лет",
    weight: "23–29 кг",
    origin: "Франция"
  },
  {
    id: "406e8454-d350-4187-9788-6d857ee52e06",
    name: "Баварская горная гончая",
    type: "dog",
    temperament: "умный, энергичный, решительный",
    size: "medium",
    description: "Баварская горная гончая — собака среднего размера, которая изначально была выведена в Германии для охоты на мелкую дичь.",
    image: "https://images.dogapi.dog/18de6euxz2v3nsw31hypqh74i68m",
    lifeSpan: "12–15 лет",
    weight: "20–30 кг",
    origin: "Германия"
  },
  {
    id: "d8621d92-6558-451c-8631-a32e767026a0",
    name: "Бигль",
    type: "dog",
    temperament: "любопытный, веселый, дружелюбный",
    size: "small",
    description: "Бигль — порода собак от маленького до среднего размера, которая изначально была выведена для охоты. Известны своим жизнерадостным нравом.",
    image: "https://images.dogapi.dog/ou1q9rowef3bqz03ra2jm2tbw0js",
    lifeSpan: "12–15 лет",
    weight: "9–14 кг",
    origin: "Англия"
  },
  {
    id: "62c29679-0420-4de6-ab88-2b3e99c22317",
    name: "Бородатая колли",
    type: "dog",
    temperament: "общительный, дружелюбный, уверенный",
    size: "medium",
    description: "Бородатая колли — пастушья собака среднего размера с лохматой густой двойной шерстью и характерной «бородой» вокруг морды.",
    image: "https://images.dogapi.dog/3ipjbj9uevnvcs80jekow571xxmq",
    lifeSpan: "12–14 лет",
    weight: "20–25 кг",
    origin: "Соединенное Королевство"
  }
];
