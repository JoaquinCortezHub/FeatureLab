'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from '@/components/shared/Image';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';

interface LandingShowcaseNavProps {
  className?: string;
  variant?: 'directory' | 'option';
}

const options = [
  { value: 'option-1', labelKey: 'option1Title' },
  { value: 'option-2', labelKey: 'option2Title' },
  { value: 'option-3', labelKey: 'option3Title' },
] as const;

export const LandingShowcaseNav = ({
  className,
  variant = 'option',
}: LandingShowcaseNavProps) => {
  const t = useTranslations('landingShowcase');
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentOption = options.find((opt) =>
    pathname?.includes(`/landing-showcase/${opt.value}`)
  );

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5',
        className
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Left: Back link or Logo */}
        <div className="flex items-center gap-4">
          {variant === 'option' ? (
            <Link
              href="/landing-showcase"
              className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-md px-2 py-1"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{t('navigation.backToDirectory')}</span>
            </Link>
          ) : (
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-md"
            >
              <div className="relative w-8 h-8 flex items-center justify-center">
                <Image
                  src="/static/header logo.png"
                  alt="FeatureLab Logo"
                  width={32}
                  height={32}
                  className="opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                FeatureLab
              </span>
            </Link>
          )}

          {/* Option Selector (only shown on option pages) */}
          {variant === 'option' && currentOption && (
            <div className="relative hidden sm:block">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setIsDropdownOpen(false);
                  }
                }}
                className={cn(
                  'flex items-center gap-2 px-3 py-1.5 rounded-md',
                  'text-sm text-white/60 hover:text-white hover:bg-white/5',
                  'transition-all duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'
                )}
                aria-label="Select landing page option"
                aria-expanded={isDropdownOpen}
              >
                <span>{t(`directory.${currentOption.labelKey}`)}</span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition-transform duration-200',
                    isDropdownOpen && 'rotate-180'
                  )}
                />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <>
                    {/* Backdrop */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsDropdownOpen(false)}
                    />

                    {/* Dropdown */}
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl overflow-hidden z-50"
                    >
                      {options.map((option) => (
                        <Link
                          key={option.value}
                          href={`/landing-showcase/${option.value}`}
                          onClick={() => setIsDropdownOpen(false)}
                          className={cn(
                            'block px-4 py-3 text-sm transition-colors',
                            'focus-visible:outline-none focus-visible:bg-white/10',
                            pathname?.includes(option.value)
                              ? 'bg-white/5 text-white'
                              : 'text-white/60 hover:bg-white/5 hover:text-white'
                          )}
                        >
                          {t(`directory.${option.labelKey}`)}
                        </Link>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Right: Language switcher */}
        <LanguageSwitcher />
      </div>
    </nav>
  );
};
