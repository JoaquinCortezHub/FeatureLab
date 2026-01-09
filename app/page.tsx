'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  MousePointer2,
  GitBranch,
  Sparkles,
  Upload,
  Eye,
  Download,
  Layers,
  Zap,
  Brain,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Header } from '@/components/shared/Header';
import { WaitlistForm } from '@/components/landing/WaitlistForm';
import { FloatingNodes } from '@/components/landing/FloatingNodes';
import { FaqAccordion } from '@/components/landing/FaqAccordion';
import { UserPersonas } from '@/components/landing/UserPersonas';
import Image from '@/components/shared/Image';

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

export default function LandingPage() {
  const t = useTranslations();

  const features = [
    {
      icon: <MousePointer2 className="h-5 w-5" />,
      title: t('features.dragDrop.title'),
      description: t('features.dragDrop.description'),
    },
    {
      icon: <GitBranch className="h-5 w-5" />,
      title: t('features.smartConnections.title'),
      description: t('features.smartConnections.description'),
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: t('features.aiInsights.title'),
      description: t('features.aiInsights.description'),
    },
    {
      icon: <Layers className="h-5 w-5" />,
      title: t('features.featureStats.title'),
      description: t('features.featureStats.description'),
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: t('features.instantCharts.title'),
      description: t('features.instantCharts.description'),
    },
    {
      icon: <Brain className="h-5 w-5" />,
      title: t('features.mlExport.title'),
      description: t('features.mlExport.description'),
    },
  ];

  const steps = [
    {
      number: '01',
      icon: <Upload className="h-5 w-5" />,
      title: t('howItWorks.upload.title'),
      description: t('howItWorks.upload.description'),
    },
    {
      number: '02',
      icon: <Eye className="h-5 w-5" />,
      title: t('howItWorks.explore.title'),
      description: t('howItWorks.explore.description'),
    },
    {
      number: '03',
      icon: <Download className="h-5 w-5" />,
      title: t('howItWorks.export.title'),
      description: t('howItWorks.export.description'),
    },
  ];

  const faqItems = [
    {
      question: t('faq.items.whatIs.question'),
      answer: t('faq.items.whatIs.answer'),
    },
    {
      question: t('faq.items.aiInsights.question'),
      answer: t('faq.items.aiInsights.answer'),
    },
    {
      question: t('faq.items.fileFormats.question'),
      answer: t('faq.items.fileFormats.answer'),
    },
    {
      question: t('faq.items.security.question'),
      answer: t('faq.items.security.answer'),
    },
    {
      question: t('faq.items.pricing.question'),
      answer: t('faq.items.pricing.answer'),
    },
    {
      question: t('faq.items.availability.question'),
      answer: t('faq.items.availability.answer'),
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white antialiased relative">
      <Header variant="dark" />

      {/* Subtle textured background */}
      <div className="fixed inset-0 -z-10 bg-black">
        {/* Very subtle noise texture */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNDAwIDQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZUZpbHRlcikiLz48L3N2Zz4=")`,
            backgroundSize: '200px 200px',
          }}
        />

        {/* Very subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <svg className="w-full h-full">
            <defs>
              <pattern
                id="subtleGrid"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 60 0 L 0 0 0 60"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#subtleGrid)" />
          </svg>
        </div>

        {/* Blurred white gradient overlays throughout the page - single color with varying opacity */}
        {/* Top left - hero area */}
        <div className="absolute top-0 left-0 w-[800px] h-[600px] bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-transparent rounded-full blur-[120px]" />

        {/* Top center - hero area */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-gradient-to-b from-white/[0.06] via-white/[0.03] to-transparent rounded-full blur-[100px]" />

        {/* Center right - features area */}
        <div className="absolute top-1/2 right-0 w-[700px] h-[600px] bg-gradient-to-l from-white/[0.05] via-white/[0.025] to-transparent rounded-full blur-[140px]" />

        {/* Center left - problem section */}
        <div className="absolute top-[60%] left-0 w-[600px] h-[500px] bg-gradient-to-r from-white/[0.05] via-white/[0.025] to-transparent rounded-full blur-[120px]" />

        {/* Bottom center - CTA area */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-t from-white/[0.06] via-white/[0.03] to-transparent rounded-full blur-[130px]" />

        {/* Bottom right - footer area */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-gradient-to-tl from-white/[0.04] via-white/[0.02] to-transparent rounded-full blur-[110px]" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="mx-auto max-w-7xl px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
            {/* Left column - Text */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={stagger}
              className="max-w-xl"
            >
              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary-400/60 font-medium">
                  <span className="w-8 h-px bg-gradient-to-r from-primary-500/40 to-secondary-500/40" />
                  {t('hero.badge')}
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1]"
              >
                {t('hero.title1')}
                <br />
                {t('hero.title2')}{' '}
                <span className="font-normal italic bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                  {t('hero.title3')}
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
                className="mt-8 text-lg text-white/40 leading-relaxed max-w-md"
              >
                {t('hero.description')}
              </motion.p>

              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
                id="waitlist"
                className="mt-12"
              >
                <WaitlistForm />
              </motion.div>

              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
                className="mt-8 flex items-center gap-8"
              >
                <Link
                  href="/canvas"
                  className="group flex items-center gap-2 text-sm text-white/50 hover:text-primary-400 transition-colors"
                >
                  {t('hero.tryDemo')}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <span className="text-xs text-white/20">
                  {t('hero.noSignup')}
                </span>
              </motion.div>
            </motion.div>

            {/* Right column - Visualization */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="relative lg:pl-8"
            >
              <FloatingNodes />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/20">
            {t('hero.scroll')}
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-12 bg-gradient-to-b from-primary-500/30 via-secondary-500/20 to-transparent"
          />
        </motion.div>
      </section>

      {/* Problem Section */}
      <section className="py-32 md:py-48">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs uppercase tracking-[0.2em] text-primary-400/60 font-medium">
                {t('problem.label')}
              </span>
              <h2 className="mt-6 text-3xl md:text-4xl font-light leading-tight">
                {t('problem.title')}
                <br />
                <span className="text-white/40">
                  {t('problem.titleHighlight')}
                </span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:pt-12"
            >
              <p className="text-white/40 leading-relaxed">
                {t('problem.description1')}
              </p>
              <p className="mt-6 text-white/40 leading-relaxed">
                <span className="text-primary-400/80">
                  {t('problem.productName')}
                </span>{' '}
                {t('problem.description2')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 md:py-48 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl mb-20"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-primary-400/60 font-medium">
              {t('features.label')}
            </span>
            <h2 className="mt-6 text-3xl md:text-4xl font-light">
              {t('features.title')}{' '}
              <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                {t('features.titleHighlight')}
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-8 md:p-10 group hover:bg-white/[0.02] transition-colors relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="mb-6 text-white/30 group-hover:text-primary-400 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium mb-2 group-hover:text-white transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* User Personas */}
      <section className="py-32 md:py-48 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl mb-20"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-primary-400/60 font-medium">
              {t('useCases.label')}
            </span>
            <h2 className="mt-6 text-3xl md:text-4xl font-light">
              {t('useCases.title')}{' '}
              <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                {t('useCases.titleHighlight')}
              </span>
            </h2>
            <p className="mt-4 text-white/40 leading-relaxed">
              {t('useCases.description')}
            </p>
          </motion.div>

          <UserPersonas />
        </div>
      </section>

      {/* How it Works */}
      <section
        id="how-it-works"
        className="py-32 md:py-48 border-t border-white/5"
      >
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl mb-20"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-primary-400/60 font-medium">
              {t('howItWorks.label')}
            </span>
            <h2 className="mt-6 text-3xl md:text-4xl font-light">
              {t('howItWorks.title')}{' '}
              <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                {t('howItWorks.titleHighlight')}
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-16 md:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group"
              >
                <span className="text-8xl font-extralight text-primary-500/[0.08] absolute -top-4 -left-2 group-hover:text-primary-500/[0.15] transition-colors">
                  {step.number}
                </span>
                <div className="relative pt-12">
                  <div className="mb-4 text-white/40 group-hover:text-primary-400 transition-colors">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                  <p className="text-sm text-white/40">{step.description}</p>
                </div>

                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-20 right-0 translate-x-1/2">
                    <ArrowRight className="w-4 h-4 text-primary-500/30 group-hover:text-primary-500/50 transition-colors" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 md:py-48 border-t border-white/5">
        <div className="mx-auto max-w-3xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-primary-400/60 font-medium">
              {t('faq.label')}
            </span>
            <h2 className="mt-6 text-3xl md:text-4xl font-light">
              {t('faq.title')}{' '}
              <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                {t('faq.titleHighlight')}
              </span>
            </h2>
          </motion.div>

          <FaqAccordion items={faqItems} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 md:py-48 border-t border-white/5">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-light leading-tight">
              {t('cta.title1')}
              <br />
              <span className="italic bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                {t('cta.title2')}
              </span>
            </h2>

            <p className="mt-8 text-white/40 max-w-md mx-auto">
              {t('cta.description')}
            </p>

            <div className="mt-12 max-w-md mx-auto">
              <WaitlistForm variant="compact" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <Image
                  src="/static/header logo.png"
                  alt="FeatureLab Logo"
                  width={32}
                  height={32}
                  className="opacity-70"
                />
              </div>
              <span className="text-sm text-white/40">FeatureLab</span>
            </div>

            <div className="flex items-center gap-8 text-sm text-white/30">
              <Link
                href="/canvas"
                className="hover:text-primary-400 transition-colors"
              >
                {t('footer.demo')}
              </Link>
              <Link
                href="#features"
                className="hover:text-secondary-400 transition-colors"
              >
                {t('footer.features')}
              </Link>
              <Link
                href="#faq"
                className="hover:text-primary-400 transition-colors"
              >
                {t('footer.faq')}
              </Link>
            </div>

            <p className="text-xs text-white/20">
              © {new Date().getFullYear()} FeatureLab
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
