'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { FloatingNodes } from '@/components/landing/FloatingNodes';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export const HeroOption1 = () => {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Large gradient background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary-500/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Gradient grid */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full">
          <defs>
            <pattern
              id="hero-grid-bold"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 48 0 L 0 0 0 48"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid-bold)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial="initial"
            animate="animate"
            transition={{ staggerChildren: 0.1 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
              <div
                className={cn(
                  'inline-flex items-center gap-2 px-4 py-2 rounded-full',
                  'bg-gradient-to-r from-primary-500/10 to-secondary-500/10',
                  'border border-primary-500/20',
                  'motion-reduce:transition-none'
                )}
              >
                <Sparkles className="h-3.5 w-3.5 text-primary-400" />
                <span className="text-xs text-white/70 font-medium">
                  {t('badge')}
                </span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-6xl lg:text-7xl font-light text-white"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              {t('title1')}{' '}
              <span
                className={cn(
                  'inline-block bg-gradient-to-r from-primary-400 via-secondary-400 to-cyan-400',
                  'bg-clip-text text-transparent'
                )}
              >
                {t('title2')}
              </span>{' '}
              {t('title3')}
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="text-lg md:text-xl text-white/60 max-w-xl leading-relaxed"
            >
              {t('description')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/canvas"
                className={cn(
                  'group inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-medium',
                  'bg-gradient-to-r from-primary-500 to-secondary-500 text-white',
                  'hover:from-primary-600 hover:to-secondary-600',
                  'transition-all duration-200 shadow-lg shadow-primary-500/30',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black'
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

              <Link
                href="#waitlist"
                className={cn(
                  'inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-medium',
                  'border border-white/20 text-white/80',
                  'hover:bg-white/5 hover:text-white',
                  'transition-all duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black'
                )}
              >
                <span>{t('noSignup')}</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Floating Nodes Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={cn(
              'relative',
              'motion-reduce:transition-none motion-reduce:transform-none'
            )}
          >
            <FloatingNodes className="max-w-[600px]" />

            {/* Gradient border effect */}
            <div
              className={cn(
                'absolute -inset-4 rounded-3xl opacity-30 blur-xl',
                'bg-gradient-to-r from-primary-500/40 via-secondary-500/40 to-cyan-500/40',
                'pointer-events-none'
              )}
            />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white/30 uppercase tracking-wider">
              {t('scroll')}
            </span>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className={cn(
                'w-px h-12 bg-gradient-to-b from-white/30 to-transparent',
                'motion-reduce:transition-none motion-reduce:transform-none'
              )}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
