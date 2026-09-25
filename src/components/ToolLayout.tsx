import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface ToolLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export function ToolLayout({ title, subtitle, children }: ToolLayoutProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:text-accent-dark transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        На главную
      </Link>
      <h1 className="font-display font-extrabold text-3xl lg:text-4xl text-ink mb-3">{title}</h1>
      <p className="text-base text-ink-light leading-relaxed mb-10 max-w-2xl">{subtitle}</p>
      {children}
    </div>
  );
}
