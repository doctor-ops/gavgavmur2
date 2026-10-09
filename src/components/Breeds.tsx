import { useState } from 'react';
import { useLang } from '@/context/LangContext';
import { useReveal } from '@/hooks/useReveal';
import { Dog, Cat, MapPin, Heart, Ruler, Clock, Scissors } from 'lucide-react';
import { breedPhoto } from '@/data/breeds';

const breedImages: Record<string, string> = {
  'Корги': breedPhoto('breeds/corgi.webp'),
  'Немецкая овчарка': breedPhoto('breeds/german-shepherd.webp'),
  'Лабрадор-ретривер': breedPhoto('breeds/labrador.webp'),
  'Чихуахуа': breedPhoto('breeds/chihuahua.webp'),
  'Мейн-кун': breedPhoto('breeds/2a0fd047-378e-4452-a6e1-e090ea894e97.webp'),
  'Сиамская': breedPhoto('breeds/56bd1758-e9fc-4c52-b5bd-282cb4a1b476.webp'),
  'Британская': breedPhoto('breeds/3fe7ffc2-1815-4340-9992-856af6eaaa4f.webp'),
  'Сфинкс': breedPhoto('breeds/d87bdc29-66b3-47bf-b1dd-64cf839f1d1f.webp'),
  'Corgi': breedPhoto('breeds/corgi.webp'),
  'German Shepherd': breedPhoto('breeds/german-shepherd.webp'),
  'Labrador Retriever': breedPhoto('breeds/labrador.webp'),
  'Chihuahua': breedPhoto('breeds/chihuahua.webp'),
  'Maine Coon': breedPhoto('breeds/2a0fd047-378e-4452-a6e1-e090ea894e97.webp'),
  'Siamese': breedPhoto('breeds/56bd1758-e9fc-4c52-b5bd-282cb4a1b476.webp'),
  'British Shorthair': breedPhoto('breeds/3fe7ffc2-1815-4340-9992-856af6eaaa4f.webp'),
  'Sphynx': breedPhoto('breeds/d87bdc29-66b3-47bf-b1dd-64cf839f1d1f.webp'),
};

export function Breeds() {
  const { t } = useLang();
  const { ref, revealed } = useReveal<HTMLDivElement>();
  const [filter, setFilter] = useState<'all' | 'dogs' | 'cats'>('all');

  const dogBreeds = t.breeds.breedCards.slice(0, 4);
  const catBreeds = t.breeds.breedCards.slice(4, 8);

  const getFiltered = () => {
    if (filter === 'dogs') return dogBreeds;
    if (filter === 'cats') return catBreeds;
    return t.breeds.breedCards;
  };

  const isCat = (name: string) => {
    const catNames = ['Мейн-кун', 'Сиамская', 'Британская', 'Сфинкс', 'Maine Coon', 'Siamese', 'British Shorthair', 'Sphynx'];
    return catNames.includes(name);
  };

  return (
    <section id="breeds" className="py-20 lg:py-28 bg-base-bg">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-reveal ${revealed ? 'revealed' : ''}`}
      >
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-ink mb-4">
            {t.breeds.title}
          </h2>
          <p className="text-lg text-ink-light leading-relaxed">{t.breeds.subtitle}</p>
        </div>

        <div className="flex justify-center gap-2 mb-10">
          {[
            { key: 'all' as const, label: t.breeds.all, icon: null },
            { key: 'dogs' as const, label: t.breeds.dogs, icon: Dog },
            { key: 'cats' as const, label: t.breeds.cats, icon: Cat },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                filter === tab.key
                  ? 'bg-brand text-white shadow-md'
                  : 'bg-base-surface text-ink-soft hover:bg-base-muted border border-base-muted'
              }`}
            >
              {tab.icon && <tab.icon className="w-4 h-4" />}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {getFiltered().map((breed, i) => {
            const cat = isCat(breed.name);
            const img = breedImages[breed.name] || breedImages[t.breeds.breedCards[i].name];
            return (
              <div
                key={i}
                className="group rounded-2xl overflow-hidden bg-base-surface border border-base-muted hover:shadow-xl hover:border-accent/40 transition-all hover:-translate-y-1"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={img}
                    alt={breed.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                      cat ? 'bg-brand/90 text-accent' : 'bg-accent/90 text-white'
                    }`}>
                      {cat ? <Cat className="w-3 h-3" /> : <Dog className="w-3 h-3" />}
                      {cat ? t.breeds.cats : t.breeds.dogs}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-lg text-ink mb-1">{breed.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-ink-light mb-3">
                    <MapPin className="w-3 h-3" />
                    {breed.origin}
                  </div>
                  <p className="text-sm text-ink-soft leading-relaxed mb-4">{breed.description}</p>

                  <div className="space-y-2 pt-3 border-t border-base-muted">
                    <div className="flex items-center gap-2 text-xs">
                      <Heart className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                      <span className="text-ink-light font-semibold w-20">{t.breeds.traits.temperament}:</span>
                      <span className="text-ink-soft">{breed.temperament}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Ruler className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                      <span className="text-ink-light font-semibold w-20">{t.breeds.traits.size}:</span>
                      <span className="text-ink-soft">{breed.size}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Clock className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                      <span className="text-ink-light font-semibold w-20">{t.breeds.traits.lifespan}:</span>
                      <span className="text-ink-soft">{breed.lifespan}</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs">
                      <Scissors className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-ink-light font-semibold w-20 flex-shrink-0">{t.breeds.traits.care}:</span>
                      <span className="text-ink-soft">{breed.care}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
