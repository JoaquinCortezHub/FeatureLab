'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Upload, Eye, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LandingShowcaseNav } from '@/components/landing/LandingShowcaseNav';
import { HeroOption3 } from '@/components/landing/variations/option-3/HeroOption3';
import { StatsCounterOption3 } from '@/components/landing/variations/option-3/StatsCounterOption3';
import { FeaturesOption3 } from '@/components/landing/variations/option-3/FeaturesOption3';
import { FaqAccordion } from '@/components/landing/FaqAccordion';
import { WaitlistForm } from '@/components/landing/WaitlistForm';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function Option3Page() {
  const tHowItWorks = useTranslations('howItWorks');
  const tCta = useTranslations('cta');
  const tFaq = useTranslations('faq');

  const faqItems = [
    {
      question: tFaq('items.whatIs.question'),
      answer: tFaq('items.whatIs.answer'),
    },
    {
      question: tFaq('items.aiInsights.question'),
      answer: tFaq('items.aiInsights.answer'),
    },
    {
      question: tFaq('items.fileFormats.question'),
      answer: tFaq('items.fileFormats.answer'),
    },
    {
      question: tFaq('items.security.question'),
      answer: tFaq('items.security.answer'),
    },
    {
      question: tFaq('items.pricing.question'),
      answer: tFaq('items.pricing.answer'),
    },
    {
      question: tFaq('items.availability.question'),
      answer: tFaq('items.availability.answer'),
    },
  ];

  const steps = [
    {
      number: '01',
      icon: <Upload className="h-5 w-5" />,
      title: tHowItWorks('upload.title'),
      description: tHowItWorks('upload.description'),
      color: 'blue',
    },
    {
      number: '02',
      icon: <Eye className="h-5 w-5" />,
      title: tHowItWorks('explore.title'),
      description: tHowItWorks('explore.description'),
      color: 'purple',
    },
    {
      number: '03',
      icon: <Download className="h-5 w-5" />,
      title: tHowItWorks('export.title'),
      description: tHowItWorks('export.description'),
      color: 'cyan',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <LandingShowcaseNav variant="option" />

      {/* Hero */}
      <HeroOption3 />

      {/* Stats */}
      <StatsCounterOption3 />

      {/* Features */}
      <FeaturesOption3 />

      {/* How It Works */}
      <section id="how-it-works" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2
              className="text-4xl md:text-5xl font-light text-white"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              {tHowItWorks('title')}{' '}
              <span className="font-mono text-cyan-400">
                {tHowItWorks('titleHighlight')}
              </span>
            </h2>
          </motion.div>

          {/* Timeline visualization */}
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-cyan-500/30" />

            <div className="grid md:grid-cols-3 gap-8 relative">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="hidden lg:flex absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center w-4 h-4 rounded-full bg-slate-900 border-2 border-white/30 z-10" />

                  <div className="p-6 rounded-xl border border-white/10 bg-slate-900/40 backdrop-blur-sm">
                    <div
                      className={cn(
                        'text-6xl font-mono mb-4',
                        step.color === 'blue' && 'text-blue-500/20',
                        step.color === 'purple' && 'text-purple-500/20',
                        step.color === 'cyan' && 'text-cyan-500/20'
                      )}
                    >
                      {step.number}
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={cn(
                          'flex items-center justify-center w-10 h-10 rounded-lg',
                          step.color === 'blue' &&
                            'bg-blue-500/10 border border-blue-500/20 text-blue-400',
                          step.color === 'purple' &&
                            'bg-purple-500/10 border border-purple-500/20 text-purple-400',
                          step.color === 'cyan' &&
                            'bg-cyan-500/10 border border-cyan-500/20 text-cyan-400'
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
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative py-24">
        <div className="max-w-4xl mx-auto px-6">
          <FaqAccordion items={faqItems} />
        </div>
      </section>

      {/* CTA / Waitlist */}
      <section id="waitlist" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-emerald-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-light text-white"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              {tCta('title1')}{' '}
              <span className="font-mono text-cyan-400">{tCta('title2')}</span>
            </h2>

            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              {tCta('description')}
            </p>

            <div className="max-w-md mx-auto">
              <WaitlistForm />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer spacing */}
      <div className="py-12" />
    </div>
  );
}
