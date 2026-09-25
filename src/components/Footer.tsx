import { Link } from 'react-router-dom';
import { PawPrint, Send, Users } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-brand text-white pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Social Integration Blocks */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="rounded-2xl bg-brand-dark p-6 border border-brand-light hover:border-accent/50 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-[#229ED9] flex items-center justify-center">
                <Send className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg">Наш Telegram-канал</h3>
                <p className="text-sm text-brand-soft">Бот с умными калькуляторами прямо в Telegram</p>
              </div>
            </div>
            <p className="text-sm text-brand-soft mb-4 leading-relaxed">
              Подпишитесь, чтобы получать советы по уходу, новости и пользоваться калькуляторами кормления внутри мессенджера.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-brand font-semibold text-sm hover:bg-accent-dark transition-colors"
            >
              <Send className="w-4 h-4" />
              Открыть в Telegram
            </a>
          </div>

          <div className="rounded-2xl bg-brand-dark p-6 border border-brand-light hover:border-accent/50 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-[#4A76A8] flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg">Наша группа ВК</h3>
                <p className="text-sm text-brand-soft">Виджет сообщества ВКонтакте</p>
              </div>
            </div>
            <p className="text-sm text-brand-soft mb-4 leading-relaxed">
              Присоединяйтесь к нашему сообществу — конкурсы, советы заводчиков, истории владельцев и ответы ветеринаров.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-brand font-semibold text-sm hover:bg-accent-dark transition-colors"
            >
              <Users className="w-4 h-4" />
              Перейти в группу
            </a>
          </div>
        </div>

        {/* Footer links */}
        <div className="grid sm:grid-cols-3 gap-8 pb-8 border-t border-brand-light pt-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                <PawPrint className="w-5 h-5 text-brand" />
              </div>
              <span className="font-display font-extrabold text-lg">ГавГавМур</span>
            </div>
            <p className="text-sm text-brand-soft leading-relaxed">
              Счастье в четыре лапы — экосистема заботы о ваших питомцах: умные калькуляторы, каталог пород и советы ветеринаров.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3 text-accent">Умные сервисы</h4>
            <ul className="space-y-2 text-sm text-brand-soft">
              <li><Link to="/tools/importozameshenie" className="hover:text-white transition-colors">Импортозамещение</Link></li>
              <li><Link to="/tools/allergens" className="hover:text-white transition-colors">Аллерген-сканер</Link></li>
              <li><Link to="/tools/calories" className="hover:text-white transition-colors">Калькулятор калорий</Link></li>
              <li><Link to="/tools/budget" className="hover:text-white transition-colors">Калькулятор бюджета</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3 text-accent">Разделы</h4>
            <ul className="space-y-2 text-sm text-brand-soft">
              <li><Link to="/wiki" className="hover:text-white transition-colors">Каталог пород</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Главная</Link></li>
            </ul>
          </div>
        </div>

        <div className="text-center text-xs text-brand-soft pt-6 border-t border-brand-light">
          © 2025 ГавГавМур. Все права защищены. Информация носит ознакомительный характер.
        </div>
      </div>
    </footer>
  );
}
