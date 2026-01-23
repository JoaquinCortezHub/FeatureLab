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

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  delay?: number;
}

const FeatureCard = ({ icon, title, description, color, delay = 0 }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      className="group p-6 rounded-xl border border-white/10 bg-slate-900/40 backdrop-blur-sm hover:border-white/20 transition-all duration-300"
    >
      {/* Icon with color */}
      <div
        className={cn(
          'inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4',
          `bg-${color}-500/10 border border-${color}-500/20`,
          color
        )}
      >
        {icon}
      </div>

      {/* Content */}
      <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
      <p className="text-white/50 text-sm leading-relaxed min-w-0">
        {description}
      </p>
    </motion.div>
  );
};

export const FeaturesOption3 = () => {
  const t = useTranslations('features');

  const features = [
    {
      icon: <MousePointer2 className="h-5 w-5" />,
      title: t('dragDrop.title'),
      description: t('dragDrop.description'),
      color: 'blue',
    },
    {
      icon: <GitBranch className="h-5 w-5" />,
      title: t('smartConnections.title'),
      description: t('smartConnections.description'),
      color: 'purple',
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: t('aiInsights.title'),
      description: t('aiInsights.description'),
      color: 'cyan',
    },
    {
      icon: <Layers className="h-5 w-5" />,
      title: t('featureStats.title'),
      description: t('featureStats.description'),
      color: 'emerald',
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: t('instantCharts.title'),
      description: t('instantCharts.description'),
      color: 'amber',
    },
    {
      icon: <Brain className="h-5 w-5" />,
      title: t('mlExport.title'),
      description: t('mlExport.description'),
      color: 'red',
    },
  ];

  return (
    <section id="features" className="relative py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-light text-white mb-4"
            style={{ textWrap: 'balance' } as React.CSSProperties}
          >
            {t('title')}{' '}
            <span className="font-mono text-cyan-400">{t('titleHighlight')}</span>
          </h2>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
