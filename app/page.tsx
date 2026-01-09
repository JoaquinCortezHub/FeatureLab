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
import { cn } from '@/lib/utils';
import { Header } from '@/components/shared/Header';
import { WaitlistForm } from '@/components/landing/WaitlistForm';
import { FloatingNodes } from '@/components/landing/FloatingNodes';
import { FaqAccordion, faqData } from '@/components/landing/FaqAccordion';
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
  const features = [
    {
      icon: <MousePointer2 className="h-5 w-5" />,
      title: 'Drag & Drop Canvas',
      description:
        'Move nodes around intuitively. Organize your workflow visually.',
    },
    {
      icon: <GitBranch className="h-5 w-5" />,
      title: 'Smart Connections',
      description:
        'Draw relationships between features. See correlation strength instantly.',
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: 'AI Insights',
      description:
        'Let AI surface patterns and anomalies you would have missed.',
    },
    {
      icon: <Layers className="h-5 w-5" />,
      title: 'Feature Stats',
      description:
        'Distributions, missing values, importance scores—all on canvas.',
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: 'Instant Charts',
      description:
        'Generate visualizations with one click. No code required.',
    },
    {
      icon: <Brain className="h-5 w-5" />,
      title: 'ML-Ready Export',
      description:
        'Export engineered features in formats ready for your stack.',
    },
  ];

  const steps = [
    {
      number: '01',
      icon: <Upload className="h-5 w-5" />,
      title: 'Upload',
      description: 'Drop your CSV. We parse instantly.',
    },
    {
      number: '02',
      icon: <Eye className="h-5 w-5" />,
      title: 'Explore',
      description: 'Create nodes. Draw connections. Discover.',
    },
    {
      number: '03',
      icon: <Download className="h-5 w-5" />,
      title: 'Export',
      description: 'Save insights. Build better models.',
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
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />
        
        {/* Very subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <svg className="w-full h-full">
            <defs>
              <pattern id="subtleGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#subtleGrid)" />
          </svg>
        </div>

        {/* Blurred gradient overlays throughout the page */}
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
                  Now in private beta
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1]"
              >
                Engineer
                <br />
                features{' '}
                <span className="font-normal italic bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                  visually
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
                className="mt-8 text-lg text-white/40 leading-relaxed max-w-md"
              >
                Stop guessing which features matter. Drag nodes, draw connections,
                and let AI discover patterns hiding in your data.
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
                  Try the demo
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <span className="text-xs text-white/20">No signup required</span>
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
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/20">Scroll</span>
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
                The problem
              </span>
              <h2 className="mt-6 text-3xl md:text-4xl font-light leading-tight">
                Feature engineering requires
                <br />
                <span className="text-white/40">expertise you don&apos;t have time for</span>
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
                Finding the right features for ML models requires domain expertise,
                endless experimentation, and manual correlation analysis. Hours spent
                writing scripts, running statistics, inspecting distributions—only to
                miss the obvious pattern hiding in plain sight.
              </p>
              <p className="mt-6 text-white/40 leading-relaxed">
                <span className="text-primary-400/80">FeatureLab</span> changes that. A visual canvas where you explore data
                intuitively, while AI surfaces the insights you&apos;d otherwise miss.
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
            <span className="text-xs uppercase tracking-[0.2em] text-secondary-400/60 font-medium">
              Capabilities
            </span>
            <h2 className="mt-6 text-3xl md:text-4xl font-light">
              Everything you need to{' '}
              <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                explore data
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-black p-8 md:p-10 group hover:bg-white/[0.02] transition-colors relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="mb-6 text-white/30 group-hover:text-primary-400 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium mb-2 group-hover:text-white transition-colors">{feature.title}</h3>
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
              Use cases
            </span>
            <h2 className="mt-6 text-3xl md:text-4xl font-light">
              Built for{' '}
              <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                different needs
              </span>
            </h2>
            <p className="mt-4 text-white/40 leading-relaxed">
              Whether you&apos;re new to a domain or racing against deadlines,
              FeatureLab adapts to your workflow.
            </p>
          </motion.div>

          <UserPersonas />
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-32 md:py-48 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl mb-20"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-primary-400/60 font-medium">
              How it works
            </span>
            <h2 className="mt-6 text-3xl md:text-4xl font-light">
              Three steps to{' '}
              <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                insights
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
            <span className="text-xs uppercase tracking-[0.2em] text-secondary-400/60 font-medium">
              FAQ
            </span>
            <h2 className="mt-6 text-3xl md:text-4xl font-light">
              Common{' '}
              <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                questions
              </span>
            </h2>
          </motion.div>

          <FaqAccordion items={faqData} />
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
              Ready to see what your
              <br />
              <span className="italic bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                data is hiding?
              </span>
            </h2>

            <p className="mt-8 text-white/40 max-w-md mx-auto">
              Join the waitlist and be among the first to experience
              visual feature engineering.
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
                  className="brightness-0 invert opacity-60"
                />
              </div>
              <span className="text-sm text-white/40">FeatureLab</span>
            </div>

            <div className="flex items-center gap-8 text-sm text-white/30">
              <Link href="/canvas" className="hover:text-primary-400 transition-colors">
                Demo
              </Link>
              <Link href="#features" className="hover:text-secondary-400 transition-colors">
                Features
              </Link>
              <Link href="#faq" className="hover:text-primary-400 transition-colors">
                FAQ
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
