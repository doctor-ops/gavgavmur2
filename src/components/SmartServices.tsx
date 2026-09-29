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
    <section className="py-16 lg:py-24 bg-base-bg animate-fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display font-extrabold text-3xl lg:text-4xl text-ink mb-3">Умные сервисы</h2>
          <p className="text-base text-ink-light leading-relaxed">Интерактивные инструменты и калькуляторы, которые помогут выбрать гаджеты, проверить состав корма и рассчитать бюджет на питомца.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.to}
                to={s.to}
                className="group rounded-xl2 p-6 border transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between bg-base-surface border-base-muted hover:border-accent/30 shadow-sm"
              >
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform ${
                    s.isAccent
                      ? 'bg-accent text-brand shadow-md shadow-accent/20'
                      : `${s.color} transition-colors`
                  }`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  
                  <h3 className={`font-display font-bold text-xl mb-2.5 ${
                    s.isAccent ? 'text-brand' : 'text-ink group-hover:text-brand'
                  }`}>
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-6 text-ink-soft">
                    {s.desc}
                  </p>
                </div>

                <span className="inline-flex items-center gap-1.5 text-sm font-bold pt-2 mt-auto transition-colors text-accent group-hover:text-accent-light">
                  {s.isAccent ? 'Подобрать гаджет' : 'Открыть инструмент'}
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
