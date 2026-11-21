import { Link } from 'react-router-dom';
import {
  BookHeart,
  Bell,
  ScanLine,
  Calculator,
  MapPin,
  MessageCircle,
  WifiOff,
  Crown,
  Check,
} from 'lucide-react';
import { Seo } from '@/components/Seo';
import { RuStoreBadge, RuStoreLink } from '@/components/AppPromo';
import { RUSTORE_URL } from '@/config/app';
import { appJsonLd, findStaticPage } from '@/seo/meta';

const features = [
  {
    icon: BookHeart,
    title: 'Электронный ветпаспорт',
    text: 'Прививки и обработки от паразитов в одном месте. Записи доступны без интернета.',
  },
  {
    icon: Bell,
    title: 'График прививок и напоминания',
    text: 'Календарь вакцинации с учётом возраста питомца и напоминания о следующей процедуре.',
  },
  {
    icon: ScanLine,
    title: 'Сканер корма по фото',
    text: 'Наведите камеру на этикетку: приложение распознает состав и проверит его на аллергены из профиля питомца.',
  },
  {
    icon: Calculator,
    title: 'Калькулятор рациона',
    text: 'Суточная норма корма по весу, возрасту и активности.',
  },
  {
    icon: MapPin,
    title: 'Карта ветклиник и груминга',
    text: 'Ветклиники, груминг-салоны и зоогостиницы рядом. Геолокация нужна только на экране карты.',
  },
  {
    icon: MessageCircle,
    title: 'Справочный чат',
    text: 'Ответы на вопросы об уходе и поведении. Чат не ставит диагнозы и не заменяет ветеринара.',
  },
  {
    icon: WifiOff,
    title: 'Первая помощь офлайн',
    text: 'Памятка на случай экстренной ситуации работает даже без связи.',
  },
];

const free = [
  'Ветпаспорт и календарь прививок',
  'Напоминания',
  'Калькулятор рациона',
  'Несколько проверок корма и сообщений в чате в неделю',
];

const premium = [
  'Больше проверок корма сканером',
  'Больше сообщений в справочном чате',
  'Подписка на месяц или год',
  'Оплата через СБП и карты, включая МИР',
];

const faq = [
  {
    q: 'Приложение бесплатное?',
    a: 'Да. Ветпаспорт, напоминания и калькулятор бесплатны. Подписка «Премиум» только увеличивает лимит проверок корма и сообщений в чате.',
  },
  {
    q: 'Есть ли версия для iPhone?',
    a: 'Сейчас приложение доступно для Android 8.0 и новее в магазине RuStore. На iPhone можно пользоваться сервисами на этом сайте.',
  },
  {
    q: 'Чем приложение отличается от сайта?',
    a: 'На сайте состав корма нужно вводить текстом. В приложении достаточно сфотографировать этикетку, а проверка учитывает аллергии вашего питомца. Ещё в приложении есть ветпаспорт, напоминания о прививках и карта клиник.',
  },
  {
    q: 'Какие разрешения нужны?',
    a: 'Камера и фото — для сканера этикеток, местоположение — только для карты клиник. Фонового отслеживания нет.',
  },
];

export function AppLanding() {
  const meta = findStaticPage('/app')!;
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className="bg-base-bg animate-fade-in">
      <Seo meta={meta} jsonLd={[appJsonLd(RUSTORE_URL), faqJsonLd]} />

      <section className="bg-brand text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <span className="inline-block px-3 py-1 rounded-full bg-accent-soft/90 text-accent-dark text-xs font-bold mb-5">
            Бесплатно · Android · RuStore
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-5 max-w-3xl">
            {meta.h1}
          </h1>
          <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl mb-8">
            Ветпаспорт, график прививок с напоминаниями и сканер состава корма по фото этикетки — всегда в телефоне.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <RuStoreBadge placement="app_page" variant="light" />
            <Link to="/tools/allergens" className="text-sm font-bold text-brand-soft hover:text-white underline underline-offset-4">
              Попробовать сканер на сайте
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-ink mb-8">Что умеет приложение</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="rounded-xl2 bg-base-surface border border-base-muted p-5 shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-accent/15 text-brand flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-lg text-ink mb-1.5">{f.title}</h3>
                <p className="text-sm text-ink-soft leading-relaxed">{f.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 lg:pb-16">
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-ink mb-8">Бесплатно и «Премиум»</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl2 bg-base-surface border border-base-muted p-6 shadow-sm">
            <h3 className="font-display font-bold text-xl text-ink mb-4">Бесплатно</h3>
            <ul className="space-y-2">
              {free.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-ink-soft">
                  <Check className="w-4 h-4 text-brand mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl2 bg-brand text-white p-6 shadow-xl">
            <h3 className="font-display font-bold text-xl mb-4 flex items-center gap-2">
              <Crown className="w-5 h-5 text-accent" /> Премиум
            </h3>
            <ul className="space-y-2 mb-6">
              {premium.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-brand-soft">
                  <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <RuStoreLink
              placement="app_page"
              className="inline-flex items-center px-5 py-3 rounded-xl bg-accent text-brand font-extrabold text-sm hover:bg-accent-light transition-all"
            >
              Установить и попробовать
            </RuStoreLink>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-ink mb-6">Частые вопросы</h2>
        <div className="space-y-3">
          {faq.map((f) => (
            <details key={f.q} className="group rounded-xl bg-base-surface border border-base-muted p-5 shadow-sm">
              <summary className="font-display font-bold text-ink cursor-pointer list-none flex justify-between gap-4">
                {f.q}
                <span className="text-accent group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-sm text-ink-soft leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
        <div className="mt-10 text-center">
          <RuStoreBadge placement="app_page" />
        </div>
      </section>
    </div>
  );
}
