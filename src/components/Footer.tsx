import { Link } from 'react-router-dom';
import { PawPrint, Send, Users } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-brand text-white pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-brand font-semibold text-sm hover:bg-accent-light transition-colors">
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
            <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-brand font-semibold text-sm hover:bg-accent-light transition-colors">
              <Users className="w-4 h-4" />
              Перейти в группу
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pb-8 border-t border-brand-light pt-8">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
              <PawPrint className="w-5 h-5 text-brand" />
            </div>
            <span className="font-display font-extrabold text-lg">ГавГавМур</span>
          </div>

          <div className="flex gap-10">
            <div className="flex flex-col gap-2">
              <h4 className="font-semibold text-sm mb-2 text-accent uppercase tracking-wider">Умные сервисы</h4>
              <ul className="space-y-1 text-sm text-brand-soft">
                <li><Link to="/tools/importozameshenie" className="hover:text-white transition-colors">Импортозамещение</Link></li>
                <li><Link to="/tools/allergens" className="hover:text-white transition-colors">Аллерген-сканер</Link></li>
                <li><Link to="/tools/calories" className="hover:text-white transition-colors">Калории</Link></li>
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-semibold text-sm mb-2 text-accent uppercase tracking-wider">Разделы</h4>
              <ul className="space-y-1 text-sm text-brand-soft">
                <li><Link to="/wiki" className="hover:text-white transition-colors">Каталог пород</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Главная</Link></li>
              </ul>
            </div>
          </div>

          <div className="text-xs text-brand-soft opacity-60 text-center md:text-right">
            © 2025 ГавГавМур.<br />Все права защищены.
          </div>
        </div>
      </div>
    </footer>
  );
}
