'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const chartData = [
  { value: 65, color: '#3b82f6' },
  { value: 85, color: '#8b5cf6' },
  { value: 72, color: '#06b6d4' },
  { value: 90, color: '#10b981' },
  { value: 68, color: '#f59e0b' },
  { value: 78, color: '#ef4444' },
];

export const HeroOption3 = () => {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Multi-color gradient background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
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
                  'inline-flex items-center gap-2 px-4 py-2 rounded-lg',
                  'bg-emerald-500/10',
                  'border border-emerald-500/30'
                )}
              >
                <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-xs text-emerald-400 font-medium">
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
              <span className="font-mono text-cyan-400">{t('title2')}</span>{' '}
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
                  'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white',
                  'hover:from-cyan-600 hover:to-emerald-600',
                  'transition-all duration-200 shadow-lg shadow-cyan-500/30',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black'
                )}
              >
                <span>{t('tryDemo')}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Chart Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-sm p-8">
              <div className="mb-6">
                <h3 className="text-white/80 font-medium mb-2">
                  Feature Impact Analysis
                </h3>
                <p className="text-white/40 text-sm">
                  Model accuracy improvement (%)
                </p>
              </div>

              {/* Bar Chart */}
              <div className="flex items-end justify-between gap-3 h-64">
                {chartData.map((bar, index) => (
                  <motion.div
                    key={index}
                    initial={{ height: 0 }}
                    animate={{ height: `${bar.value}%` }}
                    transition={{ duration: 0.8, delay: 0.4 + index * 0.1, ease: 'easeOut' }}
                    className="flex-1 rounded-t-lg relative group"
                    style={{ backgroundColor: bar.color, opacity: 0.7 }}
                  >
                    {/* Value label */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 + index * 0.1 }}
                      className="absolute -top-8 left-1/2 -translate-x-1/2 text-white/60 text-xs font-mono"
                    >
                      {bar.value}%
                    </motion.div>

                    {/* Hover effect */}
                    <div
                      className={cn(
                        'absolute inset-0 opacity-0 group-hover:opacity-30',
                        'transition-opacity duration-200'
                      )}
                      style={{ backgroundColor: bar.color }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* X-axis labels */}
              <div className="flex justify-between mt-4 text-xs text-white/30 font-mono">
                <span>age</span>
                <span>income</span>
                <span>credit</span>
                <span>debt</span>
                <span>emp</span>
                <span>time</span>
              </div>
            </div>

            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-emerald-500/20 rounded-3xl blur-2xl opacity-50 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
