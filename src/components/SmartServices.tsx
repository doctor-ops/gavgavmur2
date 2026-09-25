import { Link } from 'react-router-dom';
import { Replace, ShieldAlert, Calculator, Wallet, ArrowRight } from 'lucide-react';

const services = [
  {
    to: '/tools/importozameshenie',
    icon: Replace,
    title: 'Импортозамещение',
    desc: 'Найдите российские альтернативы для иностранных кормов',
    color: 'bg-brand-soft text-brand',
  },
  {
    to: '/tools/allergens',
    icon: ShieldAlert,
    title: 'Аллерген-сканер',
    desc: 'Светофорный анализатор ингредиентов в корме',
    color: 'bg-warn-light text-warn-dark',
  },
  {
    to: '/tools/calories',
    icon: Calculator,
    title: 'Калькулятор калорий',
    desc: 'Рассчитайте суточную норму корма в ккал и граммах',
    color: 'bg-safe-light text-safe-dark',
  },
  {
    to: '/tools/budget',
    icon: Wallet,
    title: 'Калькулятор бюджета',
    desc: 'Стоимость содержания питомца в месяц и в год',
    color: 'bg-accent-soft text-accent-dark',
  },
];

export function SmartServices() {
  return (
    <section className="py-16 lg:py-24 bg-base-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display font-extrabold text-3xl lg:text-4xl text-ink mb-3">
            Умные сервисы
          </h2>
          <p className="text-base text-ink-light leading-relaxed">
            Четыре интерактивных калькулятора, которые помогут выбрать корм, проверить состав и рассчитать бюджет на питомца.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.to}
                to={s.to}
                className="group rounded-2xl bg-base-surface border border-base-muted p-6 hover:shadow-xl hover:border-accent/40 transition-all hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-2xl ${s.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-display font-bold text-lg text-ink mb-2">{s.title}</h3>
                <p className="text-sm text-ink-light leading-relaxed mb-4">{s.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand group-hover:text-accent-dark transition-colors">
                  Открыть
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
