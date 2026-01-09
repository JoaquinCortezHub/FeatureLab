'use client';

import { useLocaleContext } from '@/components/providers/LocaleProvider';
import { cn } from '@/lib/utils';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher = ({ className }: LanguageSwitcherProps) => {
  const localeContext = useLocaleContext();

  // Don't render if context not available (before hydration)
  if (!localeContext) {
    return (
      <div className={cn('flex items-center gap-1.5', className)}>
        <Globe className="h-3.5 w-3.5 text-white/30" />
        <span className="text-xs text-white/40">EN</span>
      </div>
    );
  }

  const { locale, setLocale } = localeContext;

  const toggleLocale = () => {
    setLocale(locale === 'en' ? 'es' : 'en');
  };

  return (
    <button
      onClick={toggleLocale}
      className={cn(
        'flex items-center gap-1.5 px-2 py-1 rounded-md',
        'text-white/40 hover:text-white/80 hover:bg-white/5',
        'transition-all duration-200',
        className
      )}
      aria-label={`Switch to ${locale === 'en' ? 'Spanish' : 'English'}`}
    >
      <Globe className="h-3.5 w-3.5" />
      <span className="text-xs font-medium uppercase">{locale}</span>
    </button>
  );
};
