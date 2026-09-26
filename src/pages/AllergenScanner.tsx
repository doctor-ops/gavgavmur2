import { useState } from 'react';
import { ToolLayout } from '@/components/ToolLayout';
import { ingredientDatabase, allergenLevelMeta, type AllergenLevel } from '@/data/allergens';
import { Search, ShieldAlert, CheckCircle2, AlertTriangle, XCircle, Info } from 'lucide-react';

const levelIcon: Record<AllergenLevel, typeof CheckCircle2> = {
  safe: CheckCircle2,
  trigger: AlertTriangle,
  danger: XCircle,
};

export function AllergenScanner() {
  const [input, setInput] = useState('');
  const [analyzed, setAnalyzed] = useState(false);

  const ingredients = input
    .split(/[,;\n]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  const results = ingredients.map((ing) => {
    const found = ingredientDatabase.find(
      (db) => db.name.toLowerCase() === ing.toLowerCase() || db.name.toLowerCase().includes(ing.toLowerCase())
    );
    return {
      name: ing,
      level: found?.level || ('safe' as AllergenLevel),
      note: found?.note || 'Не найден в базе — считайте безопасным, но уточните у ветеринара',
    };
  });

  const counts = {
    danger: results.filter((r) => r.level === 'danger').length,
    trigger: results.filter((r) => r.level === 'trigger').length,
    safe: results.filter((r) => r.level === 'safe').length,
  };

  const overall = counts.danger > 0 ? 'danger' : counts.trigger > 0 ? 'trigger' : 'safe';
  const overallMeta = allergenLevelMeta[overall];

  return (
    <ToolLayout
      title="Аллерген-сканер"
      subtitle="Введите состав корма с упаковки — сканер подсветит опасные ингредиенты (красный), триггеры (жёлтый) и безопасные (зелёный)."
    >
      {/* Input */}
      <div className="rounded-xl2 bg-base-surface border border-base-muted p-6 mb-6 shadow-sm">
        <label className="block text-sm font-bold text-ink mb-2 font-display">
          Состав корма (через запятую)
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Например: дегидрированное мясо курицы, рис, кукуруза, куриный жир, свёкла, томат..."
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-base-muted bg-base-bg text-ink placeholder-ink-light focus:outline-none focus:border-brand-light focus:ring-2 focus:ring-brand/10 transition-all resize-none text-sm leading-relaxed"
        />
        
        {/* 10% АКЦЕНТА: Конверсионная кнопка действия */}
        <button
          onClick={() => setAnalyzed(true)}
          disabled={ingredients.length === 0}
          className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-accent text-white font-bold text-sm hover:bg-accent-light active:bg-accent-dark shadow-sm hover:shadow transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-accent disabled:hover:shadow-none"
        >
          <Search className="w-4 h-4" />
          Анализировать состав
        </button>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-8">
        {(Object.keys(allergenLevelMeta) as AllergenLevel[]).map((level) => {
          const meta = allergenLevelMeta[level];
          const Icon = levelIcon[level];
          return (
            <div key={level} className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${meta.bg} border border-current/5`}>
              <Icon className={`w-4 h-4 ${meta.color}`} />
              <span className={`text-xs font-bold ${meta.color}`}>{meta.label}</span>
            </div>
          );
        })}
      </div>

      {/* Results */}
      {analyzed && results.length > 0 && (
        <div className="animate-fade-up">
          {/* Overall verdict */}
          <div className={`rounded-xl2 p-5 mb-6 ${overallMeta.bg} border border-current/10`}>
            <div className="flex items-center gap-3">
              <ShieldAlert className={`w-6 h-6 ${overallMeta.color}`} />
              <div>
                <div className={`font-display font-extrabold text-lg ${overallMeta.color}`}>
                  {overall === 'danger' && 'В составе есть опасные ингредиенты'}
                  {overall === 'trigger' && 'В составе есть потенциальные триггеры'}
                  {overall === 'safe' && 'Состав выглядит безопасным'}
                </div>
                <div className="text-xs font-medium text-ink-soft mt-0.5">
                  Найдено: <span className="font-bold">{counts.danger}</span> опасных · <span className="font-bold">{counts.trigger}</span> триггеров · <span className="font-bold">{counts.safe}</span> безопасных
                </div>
              </div>
            </div>
          </div>

          {/* Ingredient chips */}
          <div className="flex flex-wrap gap-2.5">
            {results.map((r, i) => {
              const meta = allergenLevelMeta[r.level];
              const Icon = levelIcon[r.level];
              return (
                <div
                  key={i}
                  className={`group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl ${meta.bg} border border-current/10 cursor-help transition-all hover:scale-[1.02]`}
                  title={r.note}
                >
                  <Icon className={`w-4 h-4 ${meta.color}`} />
                  <span className={`text-sm font-semibold ${meta.color}`}>{r.name}</span>
                  
                  {/* Всплывающая подсказка — стилизована под ink (30% бренда) */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 hidden group-hover:block z-20 w-64 p-3.5 rounded-xl bg-brand text-white text-xs leading-relaxed shadow-xl whitespace-normal pointer-events-none animate-scale-in">
                    <p className="font-medium">{r.note}</p>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-brand" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Информационная плашка */}
          <div className="mt-8 flex items-start gap-3 rounded-xl bg-base-surface border border-base-muted p-4 shadow-sm">
            <Info className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
            <p className="text-sm text-ink-soft leading-relaxed">
              Наведите курсор на ингредиент, чтобы увидеть подробное пояснение. Сканер использует внутреннюю базу из <span className="font-bold text-ink">{ingredientDatabase.length}</span> компонентов.
              Если какой-то ингредиент не распознан — он помечается как безопасный по умолчанию, но мы рекомендуем дополнительно проконсультироваться с ветеринаром.
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
