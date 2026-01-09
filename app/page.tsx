'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Database,
  GitBranch,
  BarChart3,
  Zap,
  Brain,
  LineChart,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/shared/ui/button';
import { Header } from '@/components/shared/Header';
import { ThemeSwitch } from '@/components/shared/ThemeSwitch';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-br from-primary-100/40 via-secondary-100/30 to-transparent dark:from-primary-900/20 dark:via-secondary-900/10 rounded-full blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            className="text-center"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm text-primary-700 dark:border-primary-800 dark:bg-primary-900/30 dark:text-primary-300"
            >
              <Sparkles className="h-4 w-4" />
              AI-Powered Feature Engineering
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl"
            >
              Discover hidden patterns
              <span className="block mt-2 bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
                in your data
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400"
            >
              Stop guessing which features matter. Let AI analyze your datasets,
              find meaningful correlations, and suggest the best features for your
              machine learning models.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            >
              <Button asChild size="lg" className="gap-2 px-8">
                <Link href="/canvas">
                  Start Exploring
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8">
                <Link href="#how-it-works">See How It Works</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-20"
          >
            <div className={cn(
              'relative mx-auto max-w-4xl rounded-2xl border p-2 shadow-2xl',
              'border-gray-200 bg-gray-100',
              'dark:border-gray-800 dark:bg-gray-900'
            )}>
              <div className={cn(
                'rounded-xl border overflow-hidden',
                'border-gray-200 bg-white',
                'dark:border-gray-800 dark:bg-gray-950'
              )}>
                {/* Mock Canvas Preview */}
                <div className="relative h-80 md:h-96">
                  {/* Dotted grid background */}
                  <div
                    className={cn(
                      'absolute inset-0',
                      'bg-[radial-gradient(circle,_rgb(229_231_235)_1px,_transparent_1px)]',
                      'dark:bg-[radial-gradient(circle,_rgb(55_65_81)_1px,_transparent_1px)]',
                      'bg-[length:20px_20px]'
                    )}
                  />

                  {/* Mock nodes */}
                  <div className="absolute left-8 top-20 md:left-16 md:top-24">
                    <div className="w-36 rounded-lg border border-primary-300 bg-white p-3 shadow-lg dark:border-primary-700 dark:bg-gray-800">
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4 text-primary-500" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">Dataset</span>
                      </div>
                      <p className="mt-1.5 text-xs text-gray-500">10,847 rows</p>
                    </div>
                  </div>

                  <div className="absolute left-40 top-8 md:left-60 md:top-12">
                    <div className="w-32 rounded-lg border border-gray-200 bg-white p-3 shadow-md dark:border-gray-700 dark:bg-gray-800">
                      <div className="flex items-center gap-2">
                        <GitBranch className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">Income</span>
                      </div>
                      <div className="mt-2 h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                        <div className="h-full w-4/5 rounded-full bg-green-500" />
                      </div>
                    </div>
                  </div>

                  <div className="absolute right-8 top-16 md:right-20 md:top-20">
                    <div className="w-40 rounded-lg border-2 border-purple-300 bg-purple-50 p-3 shadow-md dark:border-purple-700 dark:bg-purple-900/30">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-purple-500" />
                        <span className="text-xs font-medium text-purple-700 dark:text-purple-300">AI Insight</span>
                      </div>
                      <p className="mt-1.5 text-xs text-purple-600 dark:text-purple-400">
                        Strong correlation (0.87)
                      </p>
                    </div>
                  </div>

                  <div className="absolute bottom-16 left-48 md:bottom-20 md:left-72">
                    <div className="w-36 rounded-lg border border-gray-200 bg-white p-2 shadow-md dark:border-gray-700 dark:bg-gray-800">
                      <BarChart3 className="h-16 w-full text-secondary-500" />
                    </div>
                  </div>

                  {/* Connection lines (simplified SVG) */}
                  <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
                    <path
                      d="M 160 100 Q 220 80 260 70"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-gray-300 dark:text-gray-600"
                    />
                    <path
                      d="M 260 90 Q 320 100 380 95"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray="6 4"
                      className="text-green-400"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Feature engineering, simplified
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Everything you need to transform raw data into powerful ML features.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Database,
                title: 'Visual Data Exploration',
                description:
                  'Upload your CSV and instantly see your data visualized on an interactive canvas.',
              },
              {
                icon: Brain,
                title: 'AI-Powered Insights',
                description:
                  'Let AI discover correlations, patterns, and anomalies you might have missed.',
              },
              {
                icon: LineChart,
                title: 'Smart Visualizations',
                description:
                  'Generate scatter plots, histograms, and correlation matrices with one click.',
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  'rounded-2xl border p-6',
                  'border-gray-200 bg-gray-50',
                  'dark:border-gray-800 dark:bg-gray-900'
                )}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 md:py-32 bg-gray-50 dark:bg-gray-900/50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              How it works
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              From raw data to actionable insights in three simple steps.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Upload Your Data',
                description: 'Drag and drop your CSV file. We instantly parse and preview your dataset.',
              },
              {
                step: '02',
                title: 'Explore Relationships',
                description: 'Create visualizations and let AI find correlations between your features.',
              },
              {
                step: '03',
                title: 'Export Insights',
                description: 'Save your findings and apply them to build better ML models.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <span className="text-6xl font-bold text-gray-100 dark:text-gray-800">
                  {item.step}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={cn(
              'relative overflow-hidden rounded-3xl p-8 md:p-16 text-center',
              'bg-gradient-to-br from-primary-500 to-secondary-500'
            )}
          >
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                Ready to explore your data?
              </h2>
              <p className="mt-4 text-lg text-white/80">
                Start discovering patterns and building better features today.
              </p>
              <Button
                asChild
                size="lg"
                className="mt-8 bg-white text-primary-600 hover:bg-gray-100"
              >
                <Link href="/canvas">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 dark:border-gray-800">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500">
                <span className="text-sm font-bold text-white">FL</span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">
                FeatureLab
              </span>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Built for data scientists, by data scientists.
            </p>

            <div className="flex items-center gap-4">
              <ThemeSwitch />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
