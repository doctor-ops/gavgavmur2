import type { ReactNode } from 'react';
import { Smartphone, ArrowRight } from 'lucide-react';
import { rustoreUrl, type AppPlacement } from '@/config/app';
import { reachGoal } from '@/lib/analytics';

interface StoreLinkProps {
  placement: AppPlacement;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

// Внешняя ссылка на RuStore с utm-метками и целью в Метрике.
export function RuStoreLink({ placement, className, children, onClick }: StoreLinkProps) {
  return (
    <a
      href={rustoreUrl(placement)}
      target="_blank"
      rel="noopener"
      className={className}
      onClick={() => {
        reachGoal('rustore_click', { placement });
        onClick?.();
      }}
    >
      {children}
    </a>
  );
}

interface BadgeProps {
  placement: AppPlacement;
  variant?: 'dark' | 'light';
  className?: string;
}

// Кнопка-бейдж «Скачать в RuStore».
export function RuStoreBadge({ placement, variant = 'dark', className = '' }: BadgeProps) {
  const colors =
    variant === 'dark'
      ? 'bg-ink text-white hover:bg-black border-white/10'
      : 'bg-white text-ink hover:bg-base-surface border-base-muted';
  return (
    <RuStoreLink
      placement={placement}
      className={`inline-flex items-center gap-3 px-4 py-2.5 rounded-xl border shadow-sm transition-all hover:-translate-y-0.5 ${colors} ${className}`}
    >
      <Smartphone className="w-6 h-6 shrink-0" />
      <span className="flex flex-col leading-tight text-left">
        <span className="text-[10px] font-medium uppercase tracking-wider opacity-70">Скачать в</span>
        <span className="text-base font-extrabold font-display">RuStore</span>
      </span>
    </RuStoreLink>
  );
}

interface PromoCardProps {
  placement: AppPlacement;
  title: string;
  text: string;
  points?: string[];
}

// Карточка-приглашение в приложение под результатами инструментов.
export function AppPromoCard({ placement, title, text, points }: PromoCardProps) {
  return (
    <aside className="mt-8 rounded-xl2 bg-brand text-white p-6 sm:p-7 shadow-xl relative overflow-hidden animate-fade-up">
      <div className="absolute -top-16 -right-16 w-56 h-56 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
      <div className="relative flex flex-col md:flex-row md:items-center gap-6">
        <div className="w-14 h-14 rounded-2xl bg-accent text-brand flex items-center justify-center shrink-0 shadow-md">
          <Smartphone className="w-7 h-7" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-display font-extrabold text-xl sm:text-2xl mb-2">{title}</h2>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed">{text}</p>
          {points && points.length > 0 && (
            <ul className="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-brand-soft">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-2">
                  <span className="text-accent font-bold">✓</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
          <RuStoreLink
            placement={placement}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-accent text-brand font-extrabold text-sm sm:text-base hover:bg-accent-light transition-all shadow-lg shadow-accent/20"
          >
            Скачать бесплатно
            <ArrowRight className="w-4 h-4" />
          </RuStoreLink>
          <span className="text-xs text-brand-soft">Android · RuStore</span>
        </div>
      </div>
    </aside>
  );
}
