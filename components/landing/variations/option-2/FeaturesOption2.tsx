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

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
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
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      className="group p-6 space-y-3"
    >
      {/* Icon */}
      <div className="text-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
        {icon}
      </div>

      {/* Content */}
      <h3 className="text-white font-medium text-base">{title}</h3>
      <p className="text-white/30 text-sm leading-relaxed min-w-0">
        {description}
      </p>
    </motion.div>
  );
};

export const FeaturesOption2 = () => {
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
    <section id="features" className="relative py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2
            className="text-4xl md:text-5xl font-medium text-white mb-4"
            style={{ textWrap: 'balance' } as React.CSSProperties}
          >
            {t('title')} <span className="text-cyan-400">{t('titleHighlight')}</span>
          </h2>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12 border-t border-white/5 pt-12">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.05}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
