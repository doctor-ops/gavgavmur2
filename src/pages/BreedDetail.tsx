import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { BREEDS_DATABASE, breedPhoto } from '@/data/breeds';
import { breedProfile } from '@/data/breedProfiles';
import {
  SIZE_LABELS,
  TEMPERAMENT_LABELS,
  breedBudget,
  breedFood,
  breedPhotoAlt,
  similarBreeds,
} from '@/lib/breedInfo';
import { ArrowLeft, ArrowRight, Dog, Cat, Heart, Lightbulb, PawPrint, ShieldCheck, HelpCircle, Smile, Utensils, Wallet } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppPromoCard } from '@/components/AppPromo';
import { absoluteUrl, breedMeta, breedPath, canonicalUrl } from '@/seo/meta';

export function BreedDetail() {
  const { id } = useParams<{ id: string }>();

  const breed = BREEDS_DATABASE.find((b) => b.slug === id);
  // Старые адреса вели по UUID.
  const oldBreed = breed ? undefined : BREEDS_DATABASE.find((b) => b.id === id);

  if (oldBreed) return <Navigate to={breedPath(oldBreed)} replace />;

  if (!breed) {
    return (
      // Обертка bg-base-bg для консистентности фона
      <div className="min-h-screen bg-base-bg flex items-center justify-center p-4">
        <Seo
          meta={{
            path: `/wiki/${id ?? ''}`,
            title: 'Порода не найдена | ГавГавМур',
            description: 'Запрашиваемая порода отсутствует в каталоге ГавГавМур.',
          }}
          noindex
        />
        <div className="max-w-xl mx-auto text-center animate-fade-in">
          <div className="inline-flex p-4 bg-warn-light text-warn-dark rounded-full mb-4">
            <HelpCircle className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-bold text-ink mb-2 font-display">Порода не найдена</h2>
          <p className="text-ink-soft mb-6 text-sm">К сожалению, запрашиваемая страница питомца отсутствует в нашей базе данных.</p>
          
          <Link 
            to="/wiki/" 
            // CTA: bg-accent + text-brand (премиальный стандарт)
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light active:bg-accent-dark text-brand font-bold px-6 py-3 rounded-xl shadow-sm hover:shadow transition-all text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Вернуться в каталог
          </Link>
        </div>
      </div>
    );
  }

  const profile = breedProfile(breed.slug);
  const calculations = [
    { title: 'Сколько корма нужно', icon: Utensils, cta: 'Рассчитать порцию', ...breedFood(breed) },
    { title: 'Сколько стоит содержание', icon: Wallet, cta: 'Настроить бюджет', ...breedBudget(breed) },
  ];
  const meta = breedMeta(breed);
  const isPuppy = breed.type === 'dog';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: absoluteUrl('/') },
      { '@type': 'ListItem', position: 2, name: 'Каталог пород', item: canonicalUrl('/wiki') },
      { '@type': 'ListItem', position: 3, name: breed.name, item: canonicalUrl(meta.path) },
    ],
  };

  return (
    // Оборачиваем в bg-base-bg для мягкого фона страницы
    <div className="min-h-screen bg-base-bg py-12 px-4 animate-fade-in">
      <Seo meta={meta} jsonLd={jsonLd} />
      <div className="max-w-4xl mx-auto">
        {/* Кнопка назад — аккуратный бренд-элемент */}
        <Link 
          to="/wiki/" 
          className="inline-flex items-center gap-2 text-sm font-bold text-ink-soft hover:text-brand mb-8 transition-all bg-base-surface px-4 py-2.5 rounded-xl border border-base-muted shadow-sm hover:shadow group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> К каталогу пород
        </Link>

        <div className="bg-base-surface rounded-xl2 border border-base-muted shadow-xl overflow-hidden">
          
          {/* Контейнер изображения с эффектом размытия */}
          <div className="relative h-[350px] md:h-[450px] bg-brand-dark overflow-hidden flex items-center justify-center border-b border-base-muted">
            <div 
              className="absolute inset-0 bg-cover bg-center scale-110 blur-xl opacity-30 pointer-events-none"
              style={{ backgroundImage: `url(${breedPhoto(breed.image)})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/30 to-brand-dark/10" />

            <img 
              src={breedPhoto(breed.image)} 
              alt={breedPhotoAlt(breed)}
              decoding="async"
              fetchPriority="high"
              className="relative z-10 max-w-full max-h-full object-contain pointer-events-none p-4 group-hover:scale-[1.03] transition-transform duration-500" 
            />

            {/* Плашка с названием и баджами */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white z-20">
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md text-xs font-bold uppercase tracking-wider border border-white/10">
                  {breed.type === 'dog' ? <Dog className="w-3.5 h-3.5" /> : <Cat className="w-3.5 h-3.5" />}
                  {breed.type === 'dog' ? 'Собаки' : 'Кошки'}
                </span>
                
                {/* Акцент: bg-accent + text-brand */}
                <span className="px-3 py-1.5 rounded-xl bg-accent text-brand text-xs font-bold uppercase tracking-wider shadow-sm">
                  {TEMPERAMENT_LABELS[breed.temperament]}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-display">{breed.name}</h1>
            </div>
          </div>

          {/* Контентная часть */}
          <div className="p-6 md:p-8 bg-base-surface">
            
            <h2 className="text-xl font-bold text-ink mb-4 flex items-center gap-2 font-display">
              <ShieldCheck className="w-5 h-5 text-brand" /> Основные характеристики
            </h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {/* Характеристики: bg-base-bg внутри белой карточки */}
              <div className="bg-base-bg border border-base-muted/60 p-4 rounded-xl">
                <div className="text-[10px] font-bold text-ink-light uppercase tracking-wider mb-1 font-display">📍 Происхождение</div>
                <div className="text-base font-bold text-ink">{breed.origin}</div>
              </div>
              <div className="bg-base-bg border border-base-muted/60 p-4 rounded-xl">
                <div className="text-[10px] font-bold text-ink-light uppercase tracking-wider mb-1 font-display">⏳ Срок жизни</div>
                <div className="text-base font-bold text-ink">{breed.lifeSpan}</div>
              </div>
              <div className="bg-base-bg border border-base-muted/60 p-4 rounded-xl">
                <div className="text-[10px] font-bold text-ink-light uppercase tracking-wider mb-1 font-display">⚖️ Средний вес</div>
                <div className="text-base font-bold text-ink">{breed.weight}</div>
              </div>
              <div className="bg-base-bg border border-base-muted/60 p-4 rounded-xl">
                <div className="text-[10px] font-bold text-ink-light uppercase tracking-wider mb-1 font-display">📏 Размер</div>
                <div className="text-base font-bold text-ink">{SIZE_LABELS[breed.size]}</div>
              </div>
              <div className="bg-base-bg border border-base-muted/60 p-4 rounded-xl">
                <div className="text-[10px] font-bold text-ink-light uppercase tracking-wider mb-1 font-display">🐾 Темперамент</div>
                <div className="text-base font-bold text-ink">{TEMPERAMENT_LABELS[breed.temperament]}</div>
              </div>
            </div>

            <div className="border-t border-base-muted pt-6">
              <h2 className="text-xl font-bold text-ink mb-3 flex items-center gap-2 font-display">
                <Heart className="w-5 h-5 text-brand" /> Описание породы
              </h2>
              <p className="text-ink-soft text-base leading-relaxed whitespace-pre-line font-normal">
                {breed.description}
              </p>
              {profile && <p className="text-ink-soft text-base leading-relaxed mt-3">{profile.about}</p>}
            </div>

            {profile && (
              <>
                <div className="border-t border-base-muted pt-6 mt-6">
                  <h2 className="text-xl font-bold text-ink mb-3 flex items-center gap-2 font-display">
                    <Smile className="w-5 h-5 text-brand" /> Характер
                  </h2>
                  <p className="text-ink-soft text-base leading-relaxed">{profile.character}</p>
                </div>
                <div className="border-t border-base-muted pt-6 mt-6">
                  <h2 className="text-xl font-bold text-ink mb-3 flex items-center gap-2 font-display">
                    <Lightbulb className="w-5 h-5 text-brand" /> Интересные факты
                  </h2>
                  <ul className="list-disc pl-5 space-y-2 text-ink-soft text-base leading-relaxed">
                    {profile.facts.map((fact) => (
                      <li key={fact}>{fact}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            <div className="grid md:grid-cols-2 gap-4 border-t border-base-muted pt-6 mt-6">
              {calculations.map(({ title, icon: Icon, text, href, cta }) => (
                <div key={title} className="bg-base-bg border border-base-muted/60 p-5 rounded-xl flex flex-col">
                  <h2 className="text-lg font-bold text-ink mb-2 flex items-center gap-2 font-display">
                    <Icon className="w-5 h-5 text-brand" /> {title}
                  </h2>
                  <p className="text-sm text-ink-soft leading-relaxed mb-4">{text}</p>
                  <Link to={href} className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-brand hover:text-brand-light">
                    {cta} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>

            <div className="border-t border-base-muted pt-6 mt-6">
              <h2 className="text-xl font-bold text-ink mb-4 flex items-center gap-2 font-display">
                <PawPrint className="w-5 h-5 text-brand" /> Похожие породы
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {similarBreeds(breed).map((other) => (
                  <Link key={other.slug} to={breedPath(other)} className="group rounded-xl border border-base-muted overflow-hidden bg-base-bg hover:shadow transition-shadow">
                    <img src={breedPhoto(other.image)} alt={breedPhotoAlt(other)} loading="lazy" decoding="async" className="w-full h-32 object-cover" />
                    <span className="block p-3 text-sm font-bold text-ink group-hover:text-brand">{other.name}</span>
                  </Link>
                ))}
              </div>
              <Link to="/tools/quiz/" className="mt-5 inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-brand font-bold px-5 py-3 rounded-xl text-sm transition-colors">
                Тест: подходит ли вам эта порода <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        <AppPromoCard
          placement="breed_detail"
          title={`Ветпаспорт для ${isPuppy ? 'щенка' : 'котёнка'} породы «${breed.name}»`}
          text={`Заведите профиль питомца в приложении ГавГавМур: график прививок с учётом возраста, напоминания об обработках и проверка корма на аллергены по фото.`}
          points={[
            'График вакцинации и напоминания',
            'Сканер состава корма камерой',
            'Карта ветклиник и груминга рядом',
            'Бесплатно, для Android',
          ]}
        />
      </div>
    </div>
  );
}
