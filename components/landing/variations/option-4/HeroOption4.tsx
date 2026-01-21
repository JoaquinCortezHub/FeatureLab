'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { HeroNodesOption4 } from './HeroNodesOption4';
import { WaitlistForm } from '@/components/landing/WaitlistForm';

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export const HeroOption4 = () => {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Custom positioned nodes in empty spaces */}
      <HeroNodesOption4 />

      {/* Minimal accent lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-px h-1/4 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />
        <div className="absolute bottom-1/3 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      </div>

      {/* Content - centered layout like Option 2 */}
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

          {/* Inline Waitlist Form */}
          <motion.div
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="pt-4 max-w-md mx-auto"
          >
            <WaitlistForm variant="compact" />
          </motion.div>

          {/* Small note */}
          <motion.p
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="text-sm text-white/30"
          >
            {t('noSignup')}
          </motion.p>
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
