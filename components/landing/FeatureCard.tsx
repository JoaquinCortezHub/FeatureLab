'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: string;
  index?: number;
  className?: string;
}

export const FeatureCard = ({
  icon,
  title,
  description,
  highlight,
  index = 0,
  className,
}: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className={cn(
        'group relative overflow-hidden rounded-2xl p-6 md:p-8',
        'border border-white/10 bg-white/5 backdrop-blur-sm',
        'hover:border-white/20 hover:bg-white/[0.07]',
        'transition-colors duration-300',
        className
      )}
    >
      {/* Gradient hover effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-secondary-500/10" />
      </div>

      {/* Icon */}
      <div
        className={cn(
          'relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl',
          'bg-gradient-to-br from-primary-500/20 to-secondary-500/20',
          'border border-white/10'
        )}
      >
        <div className="text-primary-400">{icon}</div>
      </div>

      {/* Content */}
      <div className="relative">
        <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>

        {highlight && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary-500/10 px-3 py-1 text-xs font-medium text-primary-400">
            {highlight}
          </div>
        )}
      </div>

      {/* Corner accent */}
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-primary-500/10 to-transparent blur-2xl" />
    </motion.div>
  );
};

interface FeatureShowcaseProps {
  features: {
    icon: React.ReactNode;
    title: string;
    description: string;
    highlight?: string;
  }[];
  className?: string;
}

export const FeatureShowcase = ({
  features,
  className,
}: FeatureShowcaseProps) => {
  return (
    <div className={cn('grid gap-6 md:grid-cols-2 lg:grid-cols-3', className)}>
      {features.map((feature, index) => (
        <FeatureCard
          key={feature.title}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          highlight={feature.highlight}
          index={index}
        />
      ))}
    </div>
  );
};
