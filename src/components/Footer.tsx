import { Link } from 'react-router-dom';
import { PawPrint } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-brand text-white pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
