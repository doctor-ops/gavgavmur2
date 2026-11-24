// Плагин сборки: для каждой страницы сайта создаёт свой index.html с правильными
// <title>, description, canonical, OG-тегами и базовым текстом внутри #root,
// а также генерирует sitemap.xml. Поисковики получают готовый HTML,
// а React при загрузке просто перерисовывает #root.
import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  STATIC_PAGES,
  absoluteUrl,
  appJsonLd,
  breedMeta,
  breedPath,
  canonicalUrl,
  type PageMeta,
} from './src/seo/meta';
import { BREEDS_DATABASE, type Breed } from './src/data/breeds';
import { breedProfile } from './src/data/breedProfiles';
import {
  SIZE_LABELS,
  TEMPERAMENT_LABELS,
  breedBudget,
  breedFood,
  breedPhotoAlt,
  similarBreeds,
} from './src/lib/breedInfo';
import { RUSTORE_URL } from './src/config/app';

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// JSON внутри <script> не должен содержать "</script>".
const safeJson = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c');

const mainLinks: Array<[string, string]> = [
  ['/tools/allergens/', 'Аллерген-сканер состава корма'],
  ['/tools/calories/', 'Калькулятор нормы корма'],
  ['/tools/importozameshenie/', 'Российские аналоги кормов'],
  ['/tools/budget/', 'Калькулятор бюджета на питомца'],
  ['/tools/quiz/', 'Тест: какую породу выбрать'],
  ['/wiki/', 'Каталог пород кошек и собак'],
  ['/gadgets/', 'Гаджеты для питомцев'],
  ['/app/', 'Мобильное приложение для Android'],
];

const linkList = (links: Array<[string, string]>) =>
  `<ul>${links.map(([href, label]) => `<li><a href="${escapeHtml(href)}">${escapeHtml(label)}</a></li>`).join('')}</ul>`;

function headTags(meta: PageMeta, jsonLd?: unknown): string {
  const url = canonicalUrl(meta.path);
  const image = absoluteUrl(meta.image ?? DEFAULT_OG_IMAGE);
  // data-rh="true" — эти теги потом подхватывает и заменяет react-helmet-async.
  const tags = [
    `<meta data-rh="true" name="description" content="${escapeHtml(meta.description)}" />`,
    `<link data-rh="true" rel="canonical" href="${escapeHtml(url)}" />`,
    `<meta data-rh="true" property="og:type" content="website" />`,
    `<meta data-rh="true" property="og:site_name" content="${SITE_NAME}" />`,
    `<meta data-rh="true" property="og:locale" content="ru_RU" />`,
    `<meta data-rh="true" property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta data-rh="true" property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta data-rh="true" property="og:url" content="${escapeHtml(url)}" />`,
    `<meta data-rh="true" property="og:image" content="${escapeHtml(image)}" />`,
    `<meta data-rh="true" name="twitter:card" content="summary_large_image" />`,
  ];
  if (jsonLd) tags.push(`<script data-rh="true" type="application/ld+json">${safeJson(jsonLd)}</script>`);
  return tags.join('\n  ');
}

function staticBody(meta: PageMeta): string {
  let extra = '';
  if (meta.path === '/wiki') {
    extra = linkList(BREEDS_DATABASE.map((b) => [breedPath(b), b.name]));
  } else if (meta.path === '/app') {
    extra = `<p><a href="${escapeHtml(RUSTORE_URL)}">Скачать ГавГавМур в RuStore</a></p>`;
  }
  return `<h1>${escapeHtml(meta.h1)}</h1><p>${escapeHtml(meta.description)}</p>${extra}${linkList(mainLinks)}`;
}

function breedBody(breed: Breed): string {
  const profile = breedProfile(breed.slug);
  if (!profile) throw new Error(`seo-prerender: нет описания породы «${breed.slug}»`);
  const food = breedFood(breed);
  const budget = breedBudget(breed);
  const p = (text: string) => `<p>${escapeHtml(text)}</p>`;
  const link = (href: string, label: string) =>
    `<p><a href="${escapeHtml(href)}">${escapeHtml(label)}</a></p>`;
  return [
    `<h1>${escapeHtml(breed.name)}</h1>`,
    `<img src="/${escapeHtml(breed.image)}" alt="${escapeHtml(breedPhotoAlt(breed))}" class="max-w-full max-h-[450px]" />`,
    p(breed.description),
    '<h2>Основные характеристики</h2><ul>',
    `<li>Происхождение: ${escapeHtml(breed.origin)}</li>`,
    `<li>Срок жизни: ${escapeHtml(breed.lifeSpan)}</li>`,
    `<li>Средний вес: ${escapeHtml(breed.weight)}</li>`,
    `<li>Размер: ${SIZE_LABELS[breed.size]}</li>`,
    `<li>Темперамент: ${TEMPERAMENT_LABELS[breed.temperament]}</li>`,
    '</ul>',
    '<h2>Описание породы</h2>',
    p(profile.about),
    '<h2>Характер</h2>',
    p(profile.character),
    '<h2>Интересные факты</h2>',
    `<ul>${profile.facts.map((fact) => `<li>${escapeHtml(fact)}</li>`).join('')}</ul>`,
    '<h2>Сколько корма нужно</h2>',
    p(food.text),
    link(food.href, 'Рассчитать порцию'),
    '<h2>Сколько стоит содержание</h2>',
    p(budget.text),
    link(budget.href, 'Настроить бюджет'),
    '<h2>Похожие породы</h2>',
    linkList(similarBreeds(breed).map((b) => [breedPath(b), b.name])),
    link('/tools/quiz/', 'Тест: подходит ли вам эта порода'),
    '<p><a href="/wiki/">Все породы</a> · <a href="/app/">Ветпаспорт в приложении ГавГавМур</a></p>',
  ].join('');
}

function breadcrumbs(breed: Breed, meta: PageMeta) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: absoluteUrl('/') },
      { '@type': 'ListItem', position: 2, name: 'Каталог пород', item: canonicalUrl('/wiki') },
      { '@type': 'ListItem', position: 3, name: breed.name, item: canonicalUrl(meta.path) },
    ],
  };
}

// Хостинг не позволяет настроить 301 через .htaccess, поэтому на старых адресах
// (по UUID) остаётся мгновенный meta refresh — Google считает его постоянным редиректом.
// no-referrer обязателен: CDN отвечает 403, если в Referer есть UUID.
function redirectPage(url: string, title: string): string {
  const href = escapeHtml(url);
  return `<!doctype html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(title)}</title>
  <meta name="referrer" content="no-referrer" />
  <meta http-equiv="refresh" content="0; url=${href}" />
  <link rel="canonical" href="${href}" />
</head>
<body><a href="${href}">${escapeHtml(title)}</a></body>
</html>
`;
}

function render(template: string, meta: PageMeta, body: string, jsonLd?: unknown): string {
  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(meta.title)}</title>`)
    .replace('<!--seo-->', headTags(meta, jsonLd))
    .replace('<!--prerender-->', `<div class="max-w-5xl mx-auto px-4 py-10">${body}</div>`);
}

export function seoPlugin(): Plugin {
  let outDir = 'dist';
  return {
    name: 'seo-prerender',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const templatePath = path.join(outDir, 'index.html');
      const template = fs.readFileSync(templatePath, 'utf8');

      const write = (pagePath: string, html: string) => {
        const dir = path.join(outDir, pagePath);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'index.html'), html);
      };

      const pages: PageMeta[] = [];

      for (const meta of STATIC_PAGES) {
        const jsonLd = meta.path === '/app' ? appJsonLd(RUSTORE_URL) : undefined;
        write(meta.path, render(template, meta, staticBody(meta), jsonLd));
        pages.push(meta);
      }

      const slugs = new Set<string>();
      for (const breed of BREEDS_DATABASE) {
        if (!/^[a-z0-9-]+$/.test(breed.slug) || slugs.has(breed.slug)) {
          throw new Error(`seo-prerender: неверный или повторный slug «${breed.slug}»`);
        }
        slugs.add(breed.slug);
        const meta = breedMeta(breed);
        write(meta.path, render(template, meta, breedBody(breed), breadcrumbs(breed, meta)));
        write(`/wiki/${breed.id}`, redirectPage(canonicalUrl(meta.path), meta.title));
        pages.push(meta);
      }

      const sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...pages.map(
          (p) =>
            `  <url><loc>${escapeHtml(canonicalUrl(p.path))}</loc>${p.updated ? `<lastmod>${p.updated}</lastmod>` : ''}<priority>${(p.priority ?? 0.5).toFixed(1)}</priority></url>`
        ),
        '</urlset>',
        '',
      ].join('\n');
      fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap);

      this.info?.(`seo-prerender: ${pages.length} страниц + sitemap.xml`);
    },
  };
}
