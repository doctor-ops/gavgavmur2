import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface ToolLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export function ToolLayout({ title, subtitle, children }: ToolLayoutProps) {
  return (
    // Оборачиваем в div с bg-base-bg, чтобы страницы инструментов 
    // имели тот же уютный молочный фон, что и остальной сайт
    <div className="min-h-screen bg-base-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        
        <Link
          to="/"
          // Заменил hover:text-accent-dark на hover:text-accent для большей яркости
          // Добавил transition-all для плавности
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-accent transition-all group mb-6"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          На главную
        </Link>

        <h1 className="font-display font-extrabold text-3xl lg:text-4xl text-ink mb-3">
          {title}
        </h1>
        
        <p className="text-base text-ink-light leading-relaxed mb-10 max-w-2xl">
          {subtitle}
        </p>
        
        {/* Контент инструмента будет рендериться здесь */}
        <div className="relative">
          {children}
        </div>
      </div>
    </div>
  );
}
