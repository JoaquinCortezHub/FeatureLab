'use client';

import { motion } from 'framer-motion';
import {
  MousePointer2,
  GitBranch,
  Sparkles,
  Layers,
  Zap,
  Brain,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard = ({ icon, title, description, delay = 0 }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        'group relative p-6 rounded-xl',
        'bg-slate-900/40 backdrop-blur-sm',
        'border border-white/5',
        'hover:border-primary-500/30',
        'transition-all duration-300',
        'motion-reduce:transition-none'
      )}
    >
      {/* Gradient border effect on hover */}
      <div
        className={cn(
          'absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100',
          'bg-gradient-to-r from-primary-500/20 via-secondary-500/20 to-cyan-500/20',
          'blur-sm -z-10',
          'transition-opacity duration-500',
          'motion-reduce:transition-none'
        )}
      />

      {/* Icon */}
      <div
        className={cn(
          'inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4',
          'bg-gradient-to-br from-primary-500/10 to-secondary-500/10',
          'border border-primary-500/20',
          'group-hover:border-primary-500/40',
          'transition-all duration-300',
          'motion-reduce:transition-none'
        )}
      >
        <div className="text-primary-400 group-hover:text-primary-300 transition-colors duration-300">
          {icon}
        </div>
      </div>

      {/* Content */}
      <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
      <p className="text-white/50 text-sm leading-relaxed min-w-0">
        {description}
      </p>
    </motion.div>
  );
};

export const FeaturesOption1 = () => {
  const t = useTranslations('features');

  const features = [
    {
      icon: <MousePointer2 className="h-5 w-5" />,
      title: t('dragDrop.title'),
      description: t('dragDrop.description'),
    },
    {
      icon: <GitBranch className="h-5 w-5" />,
      title: t('smartConnections.title'),
      description: t('smartConnections.description'),
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: t('aiInsights.title'),
      description: t('aiInsights.description'),
    },
    {
      icon: <Layers className="h-5 w-5" />,
      title: t('featureStats.title'),
      description: t('featureStats.description'),
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: t('instantCharts.title'),
      description: t('instantCharts.description'),
    },
    {
      icon: <Brain className="h-5 w-5" />,
      title: t('mlExport.title'),
      description: t('mlExport.description'),
    },
  ];

  return (
    <section id="features" className="relative py-24 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-medium uppercase tracking-wider mb-4">
              {t('label')}
            </span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-light text-white mb-4"
            style={{ textWrap: 'balance' } as React.CSSProperties}
          >
            {t('title')}{' '}
            <span
              className={cn(
                'inline-block bg-gradient-to-r from-primary-400 to-secondary-400',
                'bg-clip-text text-transparent'
              )}
            >
              {t('titleHighlight')}
            </span>
          </motion.h2>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
