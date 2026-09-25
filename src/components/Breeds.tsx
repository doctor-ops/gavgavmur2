import { useState } from 'react';
import { useLang } from '@/context/LangContext';
import { useReveal } from '@/hooks/useReveal';
import { Dog, Cat, MapPin, Heart, Ruler, Clock, Scissors } from 'lucide-react';

const breedImages: Record<string, string> = {
  'Корги': 'https://images.pexels.com/photos/14730839/pexels-photo-14730839.jpeg?auto=compress&cs=tinysrgb&w=940',
  'Немецкая овчарка': 'https://images.pexels.com/photos/33159007/pexels-photo-33159007.jpeg?auto=compress&cs=tinysrgb&w=940',
  'Лабрадор-ретривер': 'https://images.pexels.com/photos/36678949/pexels-photo-36678949.jpeg?auto=compress&cs=tinysrgb&w=940',
  'Чихуахуа': 'https://images.pexels.com/photos/27858151/pexels-photo-27858151.jpeg?auto=compress&cs=tinysrgb&w=940',
  'Мейн-кун': 'https://images.pexels.com/photos/19523234/pexels-photo-19523234.jpeg?auto=compress&cs=tinysrgb&w=940',
  'Сиамская': 'https://images.pexels.com/photos/33660000/pexels-photo-33660000.jpeg?auto=compress&cs=tinysrgb&w=940',
  'Британская': 'https://images.pexels.com/photos/14311615/pexels-photo-14311615.jpeg?auto=compress&cs=tinysrgb&w=940',
  'Сфинкс': 'https://images.pexels.com/photos/31644050/pexels-photo-31644050.jpeg?auto=compress&cs=tinysrgb&w=940',
  'Corgi': 'https://images.pexels.com/photos/14730839/pexels-photo-14730839.jpeg?auto=compress&cs=tinysrgb&w=940',
  'German Shepherd': 'https://images.pexels.com/photos/33159007/pexels-photo-33159007.jpeg?auto=compress&cs=tinysrgb&w=940',
  'Labrador Retriever': 'https://images.pexels.com/photos/36678949/pexels-photo-36678949.jpeg?auto=compress&cs=tinysrgb&w=940',
  'Chihuahua': 'https://images.pexels.com/photos/27858151/pexels-photo-27858151.jpeg?auto=compress&cs=tinysrgb&w=940',
  'Maine Coon': 'https://images.pexels.com/photos/19523234/pexels-photo-19523234.jpeg?auto=compress&cs=tinysrgb&w=940',
  'Siamese': 'https://images.pexels.com/photos/33660000/pexels-photo-33660000.jpeg?auto=compress&cs=tinysrgb&w=940',
  'British Shorthair': 'https://images.pexels.com/photos/14311615/pexels-photo-14311615.jpeg?auto=compress&cs=tinysrgb&w=940',
  'Sphynx': 'https://images.pexels.com/photos/31644050/pexels-photo-31644050.jpeg?auto=compress&cs=tinysrgb&w=940',
};

export function Breeds() {
  const { t, lang } = useLang();
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
    <section id="breeds" className="py-20 lg:py-28 bg-base-surface">
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
                  ? 'bg-ink text-white'
                  : 'bg-base-bg text-ink-soft hover:bg-base-muted border border-base-muted'
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
                className="group rounded-2xl overflow-hidden bg-base-bg border border-base-muted hover:shadow-xl hover:border-honey/30 transition-all hover:-translate-y-1"
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
                      cat ? 'bg-ink/90 text-honey' : 'bg-honey/90 text-white'
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
                      <Heart className="w-3.5 h-3.5 text-honey flex-shrink-0" />
                      <span className="text-ink-light font-semibold w-20">{t.breeds.traits.temperament}:</span>
                      <span className="text-ink-soft">{breed.temperament}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Ruler className="w-3.5 h-3.5 text-honey flex-shrink-0" />
                      <span className="text-ink-light font-semibold w-20">{t.breeds.traits.size}:</span>
                      <span className="text-ink-soft">{breed.size}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Clock className="w-3.5 h-3.5 text-honey flex-shrink-0" />
                      <span className="text-ink-light font-semibold w-20">{t.breeds.traits.lifespan}:</span>
                      <span className="text-ink-soft">{breed.lifespan}</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs">
                      <Scissors className="w-3.5 h-3.5 text-honey flex-shrink-0 mt-0.5" />
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
