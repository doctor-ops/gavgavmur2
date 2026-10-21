import { Link } from 'react-router-dom';
import { PawPrint, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-brand text-white pt-12 pb-6 lg:pt-16 lg:pb-8 mt-20 w-full border-t border-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Главная адаптивная сетка: 1 колонка на смартфонах, 2 на планшетах, 4 на десктопах */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 w-full pb-12">
          
          {/* Блок 1: Логотип и краткое описание */}
          <div className="flex flex-col items-start gap-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center shrink-0">
                <PawPrint className="w-5 h-5 text-brand" />
              </div>
              <span className="font-display font-extrabold text-lg tracking-tight">ГавГавМур</span>
            </div>
            <p className="text-xs sm:text-sm text-brand-soft leading-relaxed max-w-xs">
              Экосистема заботы о хвостатых друзьях. Умные калькуляторы, анализ составов и базы знаний.
            </p>
          </div>

          {/* Блок 2: Ссылки на сервисы */}
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-xs sm:text-sm mb-1 text-accent uppercase tracking-wider">Умные сервисы</h4>
            <ul className="space-y-2 text-sm text-brand-soft">
              <li><Link to="/tools/importozameshenie" className="hover:text-white transition-colors block py-0.5">Импортозамещение</Link></li>
              <li><Link to="/tools/allergens" className="hover:text-white transition-colors block py-0.5">Аллерген-сканер</Link></li>
              <li><Link to="/tools/calories" className="hover:text-white transition-colors block py-0.5">Калории</Link></li>
            </ul>
          </div>

          {/* Блок 3: Разделы сайта */}
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-xs sm:text-sm mb-1 text-accent uppercase tracking-wider">Разделы</h4>
            <ul className="space-y-2 text-sm text-brand-soft">
              <li><Link to="/wiki" className="hover:text-white transition-colors block py-0.5">Каталог пород</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors block py-0.5">Главная</Link></li>
            </ul>
          </div>

          {/* Блок 4: Контакты (Новый блок) */}
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-xs sm:text-sm mb-1 text-accent uppercase tracking-wider">Связаться с нами</h4>
            <div className="flex items-center gap-2 text-sm text-brand-soft group mt-1">
              <Mail className="w-4 h-4 text-accent shrink-0" />
              <a 
                href="mailto:info@gavgavmur.ru" 
                className="text-brand-soft hover:text-white transition-colors font-medium break-all"
              >
                info@gavgavmur.ru
              </a>
            </div>
          </div>

        </div>

        {/* Нижняя изолированная плашка с копирайтом */}
        <div className="pt-6 border-t border-brand-light w-full flex justify-center md:justify-between items-center">
          <div className="text-xs text-brand-soft/70 text-center md:text-left leading-relaxed">
            © {new Date().getFullYear()} ГавГавМур. Все права защищены.
          </div>
        </div>

      </div>
    </footer>
  );
}
