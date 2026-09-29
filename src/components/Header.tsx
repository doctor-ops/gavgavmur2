import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Главная' },
  { to: '/tools/importozameshenie', label: 'Импортозамещение' },
  { to: '/tools/allergens', label: 'Аллерген-сканер' },
  { to: '/tools/calories', label: 'Калории' },
  { to: '/tools/budget', label: 'Бюджет' },
  { to: '/wiki', label: 'Породы' },
  { to: '/gadgets', label: 'Гаджеты' }, 
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-brand text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Высота хедера h-24 (96px) для солидности бренда */}
        <div className="flex items-center justify-between h-24">
          
          <Link to="/" className="flex items-center group">
            {/* Высота логотипа h-20 (80px), чтобы он был заметным и читаемым */}
            <img 
              src={`${import.meta.env.BASE_URL}logo.png`} 
              alt="ГавГавМур" 
              className="h-20 w-auto object-contain brightness-0 invert transition-transform duration-300 group-hover:scale-105" 
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-accent text-brand shadow-sm'
                      : 'text-brand-soft hover:bg-brand-light hover:text-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden w-10 h-10 rounded-lg bg-brand-light flex items-center justify-center"
            aria-label="Меню"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden bg-brand-dark border-t border-brand-light px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive ? 'bg-accent text-brand' : 'text-brand-soft hover:bg-brand-light hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
