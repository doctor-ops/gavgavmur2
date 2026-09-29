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
        <div className="flex items-center justify-between h-28">
          
          <Link to="/" className="flex items-center gap-4 group">
            <div className="relative">
              <img 
                src={`${import.meta.env.BASE_URL}logo-icon.png`} 
                alt="ГавГавМур" 
                className="h-[68px] w-auto object-contain brightness-0 invert transition-transform duration-300 group-hover:scale-110"
                style={{ filter: 'drop-shadow(0px 0px 1px rgba(255,255,255,0.8))' }} 
              />
            </div>

            <div className="flex flex-col leading-tight">
              <span className="font-display font-black text-3xl tracking-tighter text-white">
                ГавГавМур
              </span>
              <span className="text-xs font-medium text-brand-soft uppercase tracking-widest opacity-80">
                Счастье в четыре лапы
              </span>
            </div>
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
