'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface StatProps {
  value: number;
  suffix?: string;
  label: string;
  color: string;
  delay?: number;
}

const AnimatedStat = ({ value, suffix = '', label, color, delay = 0 }: StatProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, value]);

  const formatter = new Intl.NumberFormat('en-US');

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <div className="mb-3">
        <span
          className={cn('text-5xl md:text-6xl font-light', color)}
          style={{ fontVariantNumeric: 'tabular-nums' }}
        >
          {formatter.format(count)}
          {suffix}
        </span>
      </div>
      <p className="text-white/40 text-sm">{label}</p>
    </motion.div>
  );
};

export const StatsCounterOption3 = () => {
  const stats = [
    {
      value: 500,
      suffix: '+',
      label: 'Data Scientists',
      color: 'text-blue-400',
    },
    {
      value: 10000,
      suffix: '+',
      label: 'Features Engineered',
      color: 'text-purple-400',
    },
    {
      value: 87,
      suffix: '%',
      label: 'Accuracy Improvement',
      color: 'text-cyan-400',
    },
    {
      value: 95,
      suffix: '%',
      label: 'Time Saved',
      color: 'text-emerald-400',
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden" aria-live="polite">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <AnimatedStat
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              color={stat.color}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
