import Link from 'next/link';
import { ThemeSwitch } from '@/components/shared/ThemeSwitch';
import { Button } from '@/components/shared/ui/button';
import { cn } from '@/lib/utils';

export const Header = ({ className }: { className?: string }) => {
  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'border-b border-gray-200/50 bg-white/80 backdrop-blur-lg',
        'dark:border-gray-800/50 dark:bg-gray-950/80',
        className
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 shadow-md transition-transform group-hover:scale-105">
            <span className="text-sm font-bold text-white">FL</span>
          </div>
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            FeatureLab
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="#features"
            className="text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            How it Works
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeSwitch />
          <Button asChild size="sm" className="hidden sm:flex">
            <Link href="/canvas">Open App</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
