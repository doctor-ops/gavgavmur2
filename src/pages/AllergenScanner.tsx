import { useState, useMemo } from 'react';
import { ToolLayout } from '@/components/ToolLayout';
import { ingredientDatabase, allergenLevelMeta, type AllergenLevel } from '@/data/allergens';
import { Search, ShieldAlert, CheckCircle2, AlertTriangle, XCircle, Info, HelpCircle } from 'lucide-react';
import petFoods from '@/data/petfood_ready.json';
import { ingredientTranslations } from '@/data/ingredient_translations';

type FoodRecord = {
  id?: string;
  name?: string;
  brand?: string;
  line?: string;
  search_tags?: string;
  ingredients?: string;
  quantity?: string;
};

const foods = petFoods as FoodRecord[];

function ingredientText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function productKey(item: FoodRecord): string {
  const brand = item.brand?.trim().toLowerCase() ?? '';
  const name = item.name?.trim().toLowerCase() ?? '';
  return `${brand}|${name}`;
}

const compositionByProduct = new Map<string, string>();
for (const item of foods) {
  const text = ingredientText(item.ingredients);
  const key = productKey(item);
  if (text && key !== '|' && !compositionByProduct.has(key)) {
    compositionByProduct.set(key, text);
  }
}

function compositionFor(item: FoodRecord): string {
  return ingredientText(item.ingredients) || compositionByProduct.get(productKey(item)) || '';
}

const levelIcon: Record<AllergenLevel, typeof CheckCircle2> = {
  safe: CheckCircle2,
  trigger: AlertTriangle,
  danger: XCircle,
  unknown: HelpCircle,
};

function normalize(text: string) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[()[\]{}]/g, '')
    .replace(/[*_]/g, '')
    .trim();
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const translationIndex = Object.keys(ingredientTranslations)
  .sort((a, b) => b.length - a.length)
  .map((foreign) => ({
    normalized: normalize(foreign),
    regex: new RegExp(escapeRegExp(foreign), 'gi'),
    translation: ingredientTranslations[foreign],
  }));

const translationByNormalized = new Map(
  Object.entries(ingredientTranslations).map(([key, value]) => [normalize(key), value])
);

const normalizedIngredients = ingredientDatabase.map((item) => ({
  ...item,
  normalized: normalize(item.name),
}));

function translateIngredient(text: string): string {
  const cleaned = text
    .replace(/\(\d+([.,]\d+)?%\)/g, '')
    .replace(/\d+([.,]\d+)?%/g, '')
    .replace(/[★☆*]/g, '')
    .trim();

  let resultText = cleaned;
  const normalizedInput = normalize(cleaned);

  for (const entry of translationIndex) {
    if (!normalizedInput.includes(entry.normalized)) continue;
    entry.regex.lastIndex = 0;
    resultText = resultText.replace(entry.regex, entry.translation);
  }

  if (resultText === cleaned) {
    return translationByNormalized.get(normalizedInput) ?? cleaned.replace(/[,.;]$/, '').trim();
  }

  return resultText.replace(/[,.;]$/, '').trim();
}

export function AllergenScanner() {
  const [input, setInput] = useState('');
  const [analyzed, setAnalyzed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [missingComposition, setMissingComposition] = useState(false);

  const filteredFoods = useMemo(() => {
    if (searchQuery.length < 2) return [];
    const query = searchQuery.toLowerCase();
    const seen = new Set<string>();
    const withComposition: FoodRecord[] = [];
    const withoutComposition: FoodRecord[] = [];

    for (const item of foods) {
      const matches =
        item.name?.toLowerCase().includes(query) ||
        item.brand?.toLowerCase().includes(query) ||
        item.line?.toLowerCase().includes(query) ||
        item.search_tags?.toLowerCase().includes(query);
      if (!matches) continue;

      const key = productKey(item);
      if (seen.has(key)) continue;
      seen.add(key);

      if (compositionFor(item)) withComposition.push(item);
      else if (withoutComposition.length < 10) withoutComposition.push(item);

      if (withComposition.length === 10) break;
    }

    return (withComposition.length > 0 ? withComposition : withoutComposition).slice(0, 10);
  }, [searchQuery]);

  const handleSelectFood = (food: FoodRecord) => {
    const text = compositionFor(food);
    setInput(text);
    setAnalyzed(text.length > 0);
    setMissingComposition(text.length === 0);
    setSearchQuery(food.name?.trim() || food.brand?.trim() || '');
    setShowSuggestions(false);
  };

  const ingredients = useMemo(() => {
    return input
      .split(/[,;\n]/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  }, [input]);

  const results = useMemo(() => {
    return ingredients.map((ing) => {
      const translatedName = translateIngredient(ing);
      const normalizedTranslated = normalize(translatedName);

      const found = normalizedIngredients.find((db) => {
        if (db.normalized === normalizedTranslated) return true;
        if (db.normalized.length > 3 && normalizedTranslated.includes(db.normalized)) return true;
        if (normalizedTranslated.length > 3 && db.normalized.includes(normalizedTranslated)) return true;
        return false;
      });

      return {
        name: translatedName,
        level: found?.level ?? ('unknown' as AllergenLevel),
        note: found?.note ?? 'Ингредиента нет в базе. Это не значит, что он безопасен — уточните состав у ветеринара.',
      };
    });
  }, [ingredients]);

  const counts = {
    danger: results.filter((r) => r.level === 'danger').length,
    trigger: results.filter((r) => r.level === 'trigger').length,
    unknown: results.filter((r) => r.level === 'unknown').length,
    safe: results.filter((r) => r.level === 'safe').length,
  };

  const overall: AllergenLevel =
    counts.danger > 0 ? 'danger' : counts.trigger > 0 ? 'trigger' : counts.unknown > 0 ? 'unknown' : 'safe';
  const overallMeta = allergenLevelMeta[overall];

  return (
    <ToolLayout
      title="Аллерген-сканер"
      subtitle="Введите состав корма с упаковки — сканер подсветит опасные ингредиенты (красный), триггеры (жёлтый) и безопасные (зелёный)."
    >
      <div className="rounded-xl2 bg-base-surface border border-base-muted p-6 mb-6 shadow-sm">
        <div className="mb-6 relative">
          <label className="block text-sm font-bold text-ink mb-2 font-display">
            Быстрый поиск по базе кормов
          </label>
          <div className="relative flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-ink-light" />
            <input 
              type="text" 
              placeholder="Например: Forza10, Purina..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
                setMissingComposition(false);
              }}
              onFocus={() => setShowSuggestions(true)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-base-muted bg-base-bg text-ink placeholder-ink-light focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all text-sm"
            />
          </div>

          {showSuggestions && filteredFoods.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-base-muted rounded-xl shadow-xl z-50 overflow-hidden animate-fade-up">
              {filteredFoods.map((food) => (
                <button
                  type="button"
                  key={`${productKey(food)}-${food.id ?? ''}`}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => handleSelectFood(food)}
                  className="w-full text-left px-4 py-3 hover:bg-base-surface cursor-pointer border-b border-base-muted last:border-none transition-colors flex justify-between items-center gap-3"
                >
                  <div className="text-sm">
                    <span className="font-bold text-brand">{food.brand}</span>
                    {food.line ? <span className="text-ink-soft ml-2">{food.line}</span> : null}
                    <span className="text-ink ml-2">{food.name}</span>
                  </div>
                  <span className="text-[10px] text-ink-light bg-base-bg px-2 py-1 rounded-md whitespace-nowrap">
                    {compositionFor(food) ? (food.quantity || 'есть состав') : 'нет состава'}
                  </span>
                </button>
              ))}
            </div>
          )}
          {missingComposition && (
            <p className="mt-2 text-xs text-ink-soft">
              У этого корма в базе нет состава. Вставьте его с упаковки вручную.
            </p>
          )}
        </div>

        <div className="relative">
          <label className="block text-sm font-bold text-ink mb-2 font-display">
            Состав корма (через запятую)
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Например: дегидрированное мясо курицы, рис, кукуруза, куриный жир, свёкла, томат..."
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-base-muted bg-base-bg text-ink placeholder-ink-light focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all resize-none text-sm leading-relaxed"
          />
        </div>
        
        <button
          onClick={() => setAnalyzed(true)}
          disabled={ingredients.length === 0}
          className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-accent text-brand font-bold text-sm hover:bg-accent-light active:bg-accent-dark shadow-sm hover:shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-accent disabled:hover:shadow-none"
        >
          <Search className="w-4 h-4" />
          Анализировать состав
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        {(Object.keys(allergenLevelMeta) as AllergenLevel[]).map((level) => {
          const meta = allergenLevelMeta[level];
          const Icon = levelIcon[level];
          return (
            <div key={level} className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${meta.bg} border border-current/10 transition-opacity hover:opacity-80`}>
              <Icon className={`w-4 h-4 ${meta.color} stroke-current stroke-[2.5px]`} />
              <span className={`text-xs font-bold ${meta.color}`}>{meta.label}</span>
            </div>
          );
        })}
      </div>

      {analyzed && results.length > 0 && (
        <div className="animate-fade-up">
          <div className={`rounded-xl2 p-5 mb-6 ${overallMeta.bg} border border-current/10 shadow-sm`}>
            <div className="flex items-center gap-3">
              <ShieldAlert className={`w-6 h-6 ${overallMeta.color} stroke-current stroke-[2.5px]`} />
              <div>
                <div className={`font-display font-extrabold text-lg ${overallMeta.color}`}>
                  {overall === 'danger' && 'В составе есть опасные ингредиенты'}
                  {overall === 'trigger' && 'В составе есть потенциальные триггеры'}
                  {overall === 'unknown' && 'Часть состава не распознана'}
                  {overall === 'safe' && 'Состав выглядит безопасным'}
                </div>
                <div className="text-xs font-medium text-ink-soft mt-0.5">
                  Найдено: <span className="font-bold text-ink">{counts.danger}</span> опасных · <span className="font-bold text-ink">{counts.trigger}</span> триггеров · <span className="font-bold text-ink">{counts.unknown}</span> неизвестных · <span className="font-bold text-ink">{counts.safe}</span> безопасных
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {results.map((r, i) => {
              const meta = allergenLevelMeta[r.level];
              const Icon = levelIcon[r.level];
              return (
                <div
                  key={i}
                  className={`group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl ${meta.bg} border border-current/10 cursor-help transition-all hover:scale-[1.02] shadow-sm`}
                  title={r.note}
                >
                  <Icon 
                    stroke="currentColor"
                    className={`w-4 h-4 ${meta.color} stroke-current stroke-[2.5px]`} 
                  />
                  <span className={`text-sm font-semibold ${meta.color}`}>{r.name}</span>
                  
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 hidden group-hover:block z-20 w-64 p-3.5 rounded-xl bg-brand text-white text-xs leading-relaxed shadow-xl whitespace-normal pointer-events-none animate-scale-in">
                    <p className="font-medium">{r.note}</p>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-brand" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex items-start gap-3 rounded-xl bg-base-surface border border-base-muted p-4 shadow-sm">
            <Info className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
            <p className="text-sm text-ink-soft leading-relaxed">
              Наведите курсор на ингредиент, чтобы увидеть подробное пояснение. Сканер автоматически переводит сложные иностранные термины и очищает состав от технических данных (процентов).
              Нераспознанный ингредиент не считается безопасным: его нужно сверить с ветеринаром.
            </p>
          </div>
        </div>
      )}

      {analyzed && results.length === 0 && (
        <div className="text-center py-16 bg-base-surface rounded-xl2 border border-base-muted shadow-sm">
          <Search className="w-12 h-12 mx-auto mb-4 text-ink-light opacity-40" />
          <p className="text-ink-soft font-medium">Введите текстовый состав корма для запуска глубокого анализа.</p>
        </div>
      )}
    </ToolLayout>
  );
}
