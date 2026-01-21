'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Upload, Eye, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LandingShowcaseNav } from '@/components/landing/LandingShowcaseNav';
import { HeroOption1 } from '@/components/landing/variations/option-1/HeroOption1';
import { FeaturesOption1 } from '@/components/landing/variations/option-1/FeaturesOption1';
import { UserPersonas } from '@/components/landing/UserPersonas';
import { FaqAccordion } from '@/components/landing/FaqAccordion';
import { WaitlistForm } from '@/components/landing/WaitlistForm';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Option1Page() {
  const tProblem = useTranslations('problem');
  const tUseCases = useTranslations('useCases');
  const tHowItWorks = useTranslations('howItWorks');
  const tCta = useTranslations('cta');

  const steps = [
    {
      number: '01',
      icon: <Upload className="h-5 w-5" />,
      title: tHowItWorks('upload.title'),
      description: tHowItWorks('upload.description'),
    },
    {
      number: '02',
      icon: <Eye className="h-5 w-5" />,
      title: tHowItWorks('explore.title'),
      description: tHowItWorks('explore.description'),
    },
    {
      number: '03',
      icon: <Download className="h-5 w-5" />,
      title: tHowItWorks('export.title'),
      description: tHowItWorks('export.description'),
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <LandingShowcaseNav variant="option" />

      {/* Hero */}
      <HeroOption1 />

      {/* Problem Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="space-y-6"
          >
            <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
              <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium uppercase tracking-wider">
                {tProblem('label')}
              </span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl lg:text-5xl font-light text-white"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              {tProblem('title')}{' '}
              <span
                className={cn(
                  'inline-block bg-gradient-to-r from-amber-400 to-orange-400',
                  'bg-clip-text text-transparent'
                )}
              >
                {tProblem('titleHighlight')}
              </span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="text-lg text-white/60 leading-relaxed"
            >
              {tProblem('description1')}
            </motion.p>

            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="text-lg text-white/60 leading-relaxed"
            >
              <span className="text-primary-400 font-semibold">
                {tProblem('productName')}
              </span>{' '}
              {tProblem('description2')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <FeaturesOption1 />

      {/* Use Cases / Personas */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
              <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium uppercase tracking-wider mb-4">
                {tUseCases('label')}
              </span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-light text-white mb-4"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              {tUseCases('title')}{' '}
              <span
                className={cn(
                  'inline-block bg-gradient-to-r from-emerald-400 to-cyan-400',
                  'bg-clip-text text-transparent'
                )}
              >
                {tUseCases('titleHighlight')}
              </span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="text-lg text-white/50 max-w-3xl mx-auto"
            >
              {tUseCases('description')}
            </motion.p>
          </motion.div>

          <UserPersonas />
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
              <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium uppercase tracking-wider mb-4">
                {tHowItWorks('label')}
              </span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-light text-white"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              {tHowItWorks('title')}{' '}
              <span
                className={cn(
                  'inline-block bg-gradient-to-r from-violet-400 to-purple-400',
                  'bg-clip-text text-transparent'
                )}
              >
                {tHowItWorks('titleHighlight')}
              </span>
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  'relative p-8 rounded-xl',
                  'bg-slate-900/40 backdrop-blur-sm',
                  'border border-white/5',
                  'motion-reduce:transition-none'
                )}
              >
                <div className="text-6xl font-light text-white/5 mb-4">
                  {step.number}
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={cn(
                      'flex items-center justify-center w-10 h-10 rounded-lg',
                      'bg-gradient-to-br from-violet-500/10 to-purple-500/10',
                      'border border-violet-500/20',
                      'text-violet-400'
                    )}
                  >
                    {step.icon}
                  </div>
                  <h3 className="text-white font-semibold text-xl">
                    {step.title}
                  </h3>
                </div>

                <p className="text-white/50 text-sm leading-relaxed min-w-0">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative py-24">
        <div className="max-w-4xl mx-auto px-6">
          <FaqAccordion />
        </div>
      </section>

      {/* CTA / Waitlist */}
      <section id="waitlist" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="space-y-8"
          >
            <motion.h2
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-light text-white"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              {tCta('title1')}{' '}
              <span
                className={cn(
                  'inline-block bg-gradient-to-r from-primary-400 via-secondary-400 to-cyan-400',
                  'bg-clip-text text-transparent'
                )}
              >
                {tCta('title2')}
              </span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="text-lg text-white/50 max-w-2xl mx-auto"
            >
              {tCta('description')}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="max-w-md mx-auto"
            >
              <WaitlistForm />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer spacing */}
      <div className="py-12" />
    </div>
  );
}
