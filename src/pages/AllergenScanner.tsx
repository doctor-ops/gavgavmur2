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
      <div className="rounded-2xl bg-base-surface border border-base-muted p-6 mb-6">
        <label className="block text-sm font-semibold text-ink mb-2">
          Состав корма (через запятую)
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Например: дегидрированное мясо курицы, рис, кукуруза, куриный жир, свёкла, томат..."
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-base-muted bg-base-bg text-ink placeholder-ink-light focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all resize-none"
        />
        <button
          onClick={() => setAnalyzed(true)}
          disabled={ingredients.length === 0}
          className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand text-white font-semibold text-sm hover:bg-brand-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Search className="w-4 h-4" />
          Анализировать
        </button>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-6">
        {(Object.keys(allergenLevelMeta) as AllergenLevel[]).map((level) => {
          const meta = allergenLevelMeta[level];
          const Icon = levelIcon[level];
          return (
            <div key={level} className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${meta.bg}`}>
              <Icon className={`w-4 h-4 ${meta.color}`} />
              <span className={`text-sm font-semibold ${meta.color}`}>{meta.label}</span>
            </div>
          );
        })}
      </div>

      {/* Results */}
      {analyzed && results.length > 0 && (
        <div className="animate-fade-up">
          {/* Overall verdict */}
          <div className={`rounded-2xl p-5 mb-6 ${overallMeta.bg} border border-current/10`}>
            <div className="flex items-center gap-3">
              <ShieldAlert className={`w-6 h-6 ${overallMeta.color}`} />
              <div>
                <div className={`font-display font-bold text-lg ${overallMeta.color}`}>
                  {overall === 'danger' && 'В составе есть опасные ингредиенты'}
                  {overall === 'trigger' && 'В составе есть потенциальные триггеры'}
                  {overall === 'safe' && 'Состав выглядит безопасным'}
                </div>
                <div className="text-sm text-ink-light">
                  {counts.danger} опасных · {counts.trigger} триггеров · {counts.safe} безопасных
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
                  className={`group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl ${meta.bg} border border-current/10 cursor-help`}
                  title={r.note}
                >
                  <Icon className={`w-4 h-4 ${meta.color}`} />
                  <span className={`text-sm font-medium ${meta.color}`}>{r.name}</span>
                  <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block z-10 w-56 p-3 rounded-xl bg-ink text-white text-xs leading-relaxed shadow-xl whitespace-normal">
                    {r.note}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex items-start gap-3 rounded-xl bg-base-surface border border-base-muted p-4">
            <Info className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
            <p className="text-sm text-ink-light leading-relaxed">
              Наведите курсор на ингредиент, чтобы увидеть пояснение. Сканер использует базу из {ingredientDatabase.length} ингредиентов.
              Если ингредиент не найден — он отмечен зелёным по умолчанию, но уточните его безопасность у ветеринара.
            </p>
          </div>
        </div>
      )}

      {analyzed && results.length === 0 && (
        <div className="text-center py-12 text-ink-light">
          <Search className="w-10 h-10 mx-auto mb-3 text-base-muted" />
          <p>Введите состав корма для анализа.</p>
        </div>
      )}
    </ToolLayout>
  );
}
