import { Link } from 'react-router-dom';
import { Replace, ShieldAlert, Calculator, Wallet, Cpu, ArrowRight } from 'lucide-react';

const services = [
  {
    to: '/gadgets',
    icon: Cpu,
    title: 'Гаджеты для животных',
    desc: 'Умные кормушки, GPS-ошейники и автоматические лотки для питомцев',
    isAccent: true,
    color: 'bg-orange-100 text-orange-600', 
  },
  {
    to: '/tools/importozameshenie',
    icon: Replace,
    title: 'Импортозамещение',
    desc: 'Найдите российские альтернативы для иностранных кормов',
    isAccent: false,
    color: 'bg-blue-100 text-blue-600', 
  },
  {
    to: '/tools/allergens',
    icon: ShieldAlert,
    title: 'Аллерген-сканер',
    desc: 'Светофорный анализатор ингредиентов в составе корма',
    isAccent: false,
    color: 'bg-green-100 text-green-600', 
  },
  {
    to: '/tools/calories',
    icon: Calculator,
    title: 'Калькулятор калорий',
    desc: 'Рассчитайте суточную норму корма в ккал и граммах',
    isAccent: false,
    color: 'bg-purple-100 text-purple-600', 
  },
  {
    to: '/tools/budget',
    icon: Wallet,
    title: 'Калькулятор бюджета',
    desc: 'Стоимость содержания любимого питомца в месяц и в год',
    isAccent: false,
    color: 'bg-yellow-100 text-yellow-600', 
  },
];

export function SmartServices() {
  return (
    <section className="py-12 lg:py-24 bg-base-bg animate-fade-up overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-ink mb-3 break-words">
            Умные сервисы
          </h2>
          <p className="text-sm sm:text-base text-ink-light leading-relaxed">
            Интерактивные инструменты и калькуляторы, которые помогут выбрать гаджеты, проверить состав корма и рассчитать бюджет на питомца.
          </p>
        </div>

        {/* ИСПРАВЛЕНО: Безопасная сетка, которая гарантированно переходит в 1 колонку при сильном зуме */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.to}
                to={s.to}
                className={`group rounded-xl2 p-5 sm:p-6 border transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between w-full min-w-0 ${
                  s.isAccent
                    ? 'bg-base-surface text-ink border-base-muted md:col-span-2 lg:col-span-2 hover:border-accent/30 shadow-sm'
                    : 'bg-base-surface border-base-muted hover:border-accent/30 shadow-sm'
                }`}
              >
                <div className="relative z-10 w-full min-w-0">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform ${
                    s.isAccent
                      ? 'bg-accent text-brand shadow-md shadow-accent/20'
                      : `\${s.color} transition-colors`
                  }`}>
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  
                  <h3 className={`font-display font-bold text-lg sm:text-xl mb-2 break-words ${
                    s.isAccent ? 'text-ink' : 'text-ink group-hover:text-brand'
                  }`}>
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 text-ink-soft break-words">
                    {s.desc}
                  </p>
                </div>

                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold pt-2 mt-auto transition-colors text-accent group-hover:text-accent-light">
                  Открыть инструмент
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
