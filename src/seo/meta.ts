// Общие SEO-данные. Используются и в браузере (react-helmet-async),
// и при сборке (vite.config.ts генерирует HTML для каждой страницы и sitemap.xml).
// Поэтому здесь только относительные импорты и никаких import.meta.env.

export const SITE_URL = 'https://gavgavmur.ru';
export const SITE_NAME = 'ГавГавМур';
export const DEFAULT_OG_IMAGE = '/hero-dog.jpg';

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  h1: string;
  image?: string;
  priority?: number;
  // Дата последнего реального изменения содержимого (для sitemap).
  updated?: string;
}

export const APP_DESCRIPTION =
  'Бесплатное приложение для владельцев собак и кошек: электронный ветпаспорт, график прививок с напоминаниями, сканер состава корма по фото этикетки, калькулятор рациона и карта ветклиник.';

export const STATIC_PAGES: PageMeta[] = [
  {
    path: '/',
    title: 'ГавГавМур — Экосистема заботы о питомцах: калькуляторы, корма и породы',
    h1: 'ГавГавМур — экосистема заботы о ваших питомцах',
    description:
      'Информационный портал о домашних животных ГавГавМур. Умные калькуляторы кормления, подробный каталог пород кошек и собак, сканер аллергенов в кормах и расчет бюджета.',
    priority: 1,
  },
  {
    path: '/tools/allergens',
    title: 'Аллерген-сканер: проверить состав корма для кошек и собак онлайн | ГавГавМур',
    h1: 'Аллерген-сканер состава корма',
    description:
      'Вставьте состав корма с упаковки или найдите корм в базе из 3 686 позиций: сканер подсветит опасные ингредиенты, триггеры аллергии и безопасные компоненты.',
    priority: 0.9,
  },
  {
    path: '/tools/calories',
    title: 'Калькулятор корма: суточная норма в граммах и ккал для собак и кошек | ГавГавМур',
    h1: 'Калькулятор нормы корма',
    description:
      'Рассчитайте суточную порцию корма для собаки или кошки в граммах и килокалориях и оцените расходы на корм в день и в месяц.',
    priority: 0.9,
  },
  {
    path: '/tools/importozameshenie',
    title: 'Российские аналоги импортных кормов для кошек и собак | ГавГавМур',
    h1: 'Импортозамещение кормов',
    description:
      'Подберите российскую альтернативу зарубежному корму для кошки или собаки. База аналогов регулярно обновляется с учётом доступности на рынке.',
    priority: 0.8,
  },
  {
    path: '/tools/budget',
    title: 'Сколько стоит содержать собаку или кошку: калькулятор бюджета | ГавГавМур',
    h1: 'Калькулятор бюджета на питомца',
    description:
      'Посчитайте ежемесячные и годовые расходы на питомца по категориям: корм, ветеринария, груминг, страховка и амуниция.',
    priority: 0.8,
  },
  {
    path: '/tools/quiz',
    title: 'Тест: какую породу собаки или кошки выбрать | ГавГавМур',
    h1: 'Тест совместимости с питомцем',
    description:
      'Ответьте на вопросы об образе жизни, и тест подскажет, какие породы кошек и собак вам подойдут.',
    priority: 0.7,
  },
  {
    path: '/wiki',
    updated: '2026-11-24',
    title: 'Каталог пород кошек и собак: 152 породы с фото и описанием | ГавГавМур',
    h1: 'Каталог пород кошек и собак',
    description:
      'Описания 152 пород кошек и собак: характер, размер, вес, продолжительность жизни и происхождение. Удобный поиск и фильтры.',
    priority: 0.8,
  },
  {
    path: '/gadgets',
    title: 'Гаджеты для кошек и собак: умные кормушки, GPS-трекеры, лотки | ГавГавМур',
    h1: 'Гаджеты для питомцев',
    description:
      'Обзор умных устройств для питомцев: автоматические кормушки, GPS-ошейники, самоочищающиеся лотки и другие гаджеты.',
    priority: 0.6,
  },
  {
    path: '/app',
    title: 'Приложение ГавГавМур для Android: ветпаспорт и сканер корма — скачать в RuStore',
    h1: 'Приложение ГавГавМур для собак и кошек',
    description: APP_DESCRIPTION + ' Скачайте бесплатно в RuStore.',
    priority: 0.9,
  },
];

export function findStaticPage(pathname: string): PageMeta | undefined {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return STATIC_PAGES.find((p) => p.path === normalized);
}

// Обновлять вручную при изменении данных о породах.
const BREEDS_UPDATED = '2026-11-24';

export interface BreedLike {
  slug: string;
  name: string;
  type: 'cat' | 'dog';
  description: string;
  image: string;
}

function clip(text: string, max: number): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,.;:—-]+$/, '') + '…';
}

export function breedPath(breed: { slug: string }): string {
  return `/wiki/${breed.slug}/`;
}

export function breedMeta(breed: BreedLike): PageMeta {
  const kind = breed.type === 'dog' ? 'собак' : 'кошек';
  return {
    path: breedPath(breed),
    updated: BREEDS_UPDATED,
    title: `${breed.name}: описание породы ${kind}, характер, вес и срок жизни | ГавГавМур`,
    h1: breed.name,
    description: clip(breed.description, 160),
    image: `/${breed.image}`,
    priority: 0.6,
  };
}

export function absoluteUrl(path: string): string {
  return path.startsWith('http') ? path : `${SITE_URL}${path}`;
}

// Каноничный адрес страницы. При сборке каждая страница кладётся в
// <путь>/index.html, а веб-сервер отдаёт такие папки по адресу со слешем,
// поэтому канонический URL тоже со слешем на конце.
export function canonicalUrl(path: string): string {
  const withSlash = path === '/' || path.endsWith('/') ? path : `${path}/`;
  return absoluteUrl(withSlash);
}

export function appJsonLd(installUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: 'ГавГавМур — для собак и кошек',
    operatingSystem: 'Android 8.0+',
    applicationCategory: 'LifestyleApplication',
    description: APP_DESCRIPTION,
    url: canonicalUrl('/app'),
    installUrl,
    downloadUrl: installUrl,
    image: absoluteUrl('/logo.png'),
    inLanguage: 'ru',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'RUB' },
  };
}
