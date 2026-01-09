import Link from 'next/link';
import Image from '@/components/shared/Image';

export const Footer = ({ className }: { className?: string }) => {
  return (
    <footer className={`border-t border-white/5 py-16 ${className || ''}`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <Image
                src="/static/header logo.png"
                alt="FeatureLab Logo"
                width={32}
                height={32}
                className="opacity-70"
              />
            </div>
            <span className="text-sm text-white/40 dark:text-white/40">
              FeatureLab
            </span>
          </div>

          <div className="flex items-center gap-8 text-sm text-white/30 dark:text-white/30">
            <Link
              href="/canvas"
              className="hover:text-primary-400 transition-colors"
            >
              Demo
            </Link>
            <Link
              href="/#features"
              className="hover:text-secondary-400 transition-colors"
            >
              Features
            </Link>
            <Link
              href="/#faq"
              className="hover:text-primary-400 transition-colors"
            >
              FAQ
            </Link>
          </div>

          <p className="text-xs text-white/20 dark:text-white/20">
            © {new Date().getFullYear()} FeatureLab
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
