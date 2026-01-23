'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Upload, Eye, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LandingShowcaseNav } from '@/components/landing/LandingShowcaseNav';
import { HeroOption2 } from '@/components/landing/variations/option-2/HeroOption2';
import { FeaturesOption2 } from '@/components/landing/variations/option-2/FeaturesOption2';
import { FaqAccordion } from '@/components/landing/FaqAccordion';
import { WaitlistForm } from '@/components/landing/WaitlistForm';

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export default function Option2Page() {
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
      <HeroOption2 />

      {/* Features */}
      <FeaturesOption2 />

      {/* How It Works */}
      <section id="how-it-works" className="relative py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2
              className="text-4xl md:text-5xl font-medium text-white"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              {tHowItWorks('title')}{' '}
              <span className="text-cyan-400">{tHowItWorks('titleHighlight')}</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="space-y-4"
              >
                <div className="text-white/10 text-6xl font-medium">
                  {step.number}
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-cyan-400">{step.icon}</div>
                  <h3 className="text-white font-medium text-lg">
                    {step.title}
                  </h3>
                </div>

                <p className="text-white/30 text-sm leading-relaxed min-w-0">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative py-32 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <FaqAccordion items={faqItems} />
        </div>
      </section>

      {/* CTA / Waitlist */}
      <section id="waitlist" className="relative py-32">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="space-y-8 text-center"
          >
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-medium text-white"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              {tCta('title1')}{' '}
              <span className="text-cyan-400">{tCta('title2')}</span>
            </h2>

            <p className="text-lg text-white/30 max-w-2xl mx-auto">
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
