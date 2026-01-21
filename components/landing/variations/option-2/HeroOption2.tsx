'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export const HeroOption2 = () => {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Minimal background accent */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 right-0 w-px h-1/3 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />
        <div className="absolute bottom-1/4 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-20 text-center">
        <motion.div
          initial="initial"
          animate="animate"
          transition={{ staggerChildren: 0.15 }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div variants={fadeIn} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1.5 rounded-md border border-cyan-500/30 text-cyan-400 text-xs font-medium uppercase tracking-wider">
              {t('badge')}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl lg:text-7xl font-medium text-white max-w-4xl mx-auto leading-tight"
            style={{ textWrap: 'balance' } as React.CSSProperties}
          >
            {t('title1')} <span className="text-cyan-400">{t('title2')}</span>{' '}
            {t('title3')}
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto leading-relaxed"
          >
            {t('description')}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="pt-4"
          >
            <Link
              href="/canvas"
              className={cn(
                'group inline-flex items-center gap-2 px-8 py-4 rounded-md',
                'bg-white text-black font-medium',
                'hover:bg-white/90',
                'transition-all duration-200',
                'touch-action-manipulation',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black'
              )}
            >
              <span>{t('tryDemo')}</span>
              <ArrowRight
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  'group-hover:translate-x-0.5',
                  'motion-reduce:transform-none'
                )}
              />
            </Link>

            <p className="mt-4 text-sm text-white/30">{t('noSignup')}</p>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className={cn(
              'w-px h-12 bg-gradient-to-b from-white/20 to-transparent',
              'motion-reduce:transition-none motion-reduce:transform-none'
            )}
          />
        </motion.div>
      </div>
    </section>
  );
};
