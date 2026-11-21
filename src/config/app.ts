// Ссылка на мобильное приложение ГавГавМур в RuStore.
export const RUSTORE_URL = 'https://www.rustore.ru/catalog/app/com.gavgavmur';

// Места на сайте, откуда ведёт ссылка. Значение попадает в utm_content
// и в параметры цели Яндекс Метрики, чтобы сравнивать конверсию блоков.
export type AppPlacement =
  | 'header'
  | 'mobile_menu'
  | 'hero'
  | 'services'
  | 'footer'
  | 'android_banner'
  | 'allergen_result'
  | 'calorie_result'
  | 'breed_detail'
  | 'app_page';

export function rustoreUrl(placement: AppPlacement): string {
  const params = new URLSearchParams({
    utm_source: 'gavgavmur.ru',
    utm_medium: 'site',
    utm_campaign: 'app_promo',
    utm_content: placement,
  });
  return `${RUSTORE_URL}?${params.toString()}`;
}
