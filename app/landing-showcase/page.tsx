'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { LandingShowcaseNav } from '@/components/landing/LandingShowcaseNav';
import { LandingShowcaseCard } from '@/components/landing/LandingShowcaseCard';

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function ShowcaseDirectoryPage() {
  const t = useTranslations('landingShowcase.directory');

  const options = [
    {
      id: 'option-1',
      href: '/landing-showcase/option-1',
      title: t('option1Title'),
      description: t('option1Description'),
      previewImage: '/static/showcase/option-1-preview.svg',
    },
    {
      id: 'option-2',
      href: '/landing-showcase/option-2',
      title: t('option2Title'),
      description: t('option2Description'),
      previewImage: '/static/showcase/option-2-preview.svg',
    },
    {
      id: 'option-3',
      href: '/landing-showcase/option-3',
      title: t('option3Title'),
      description: t('option3Description'),
      previewImage: '/static/showcase/option-3-preview.svg',
    },
    {
      id: 'option-4',
      href: '/landing-showcase/option-4',
      title: t('option4Title'),
      description: t('option4Description'),
      previewImage: '/static/showcase/option-4-preview.svg',
    },
  ];

  return (
    <>
      <LandingShowcaseNav variant="directory" />

      <div className="relative pt-24 pb-20 px-6">
        {/* Background gradient effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-secondary-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              {t('title')}
            </h1>
            <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </motion.div>

          {/* Cards Grid */}
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {options.map((option, index) => (
              <LandingShowcaseCard
                key={option.id}
                href={option.href}
                title={option.title}
                description={option.description}
                previewImage={option.previewImage}
                delay={index * 0.1}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}
