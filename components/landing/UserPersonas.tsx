'use client';

import { motion } from 'framer-motion';
import { Briefcase, Rocket, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Persona {
  icon: React.ReactNode;
  role: string;
  context: string;
  challenge: string;
  solution: string;
  highlight: string;
}

const personas: Persona[] = [
  {
    icon: <Briefcase className="h-5 w-5" />,
    role: 'ML Engineer',
    context: 'New to the industry, tasked with improving an existing proprietary model',
    challenge:
      'Lacks domain expertise to identify which features matter most. Needs to quickly understand data relationships without weeks of research.',
    solution:
      'Uses FeatureLab to visually explore the database schema, discover correlations, and identify high-impact features in days instead of weeks.',
    highlight: 'Days instead of weeks',
  },
  {
    icon: <Rocket className="h-5 w-5" />,
    role: 'Data Scientist',
    context: 'At a fast-moving startup building a new product',
    challenge:
      'Needs to rapidly prototype and iterate on features. Can&apos;t afford to spend weeks on manual feature engineering when product requirements change weekly.',
    solution:
      'Leverages FeatureLab&apos;s visual canvas to experiment with different feature combinations, validate hypotheses quickly, and adapt to changing requirements in real-time.',
    highlight: 'Rapid iteration',
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    role: 'Product Analyst',
    context: 'Needs to understand user behavior patterns for product decisions',
    challenge:
      'Doesn&apos;t have deep ML expertise but needs to identify which user actions predict churn, conversion, or engagement to inform product strategy.',
    solution:
      'Uses FeatureLab&apos;s intuitive interface to explore user data visually, discover patterns with AI assistance, and communicate findings to stakeholders without writing code.',
    highlight: 'No coding required',
  },
];

interface PersonaCardProps {
  persona: Persona;
  index: number;
}

const PersonaCard = ({ persona, index }: PersonaCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative h-full rounded-xl border border-white/10 bg-white/[0.02] p-8 hover:bg-white/[0.03] hover:border-white/15 transition-all duration-300">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Icon */}
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border border-primary-500/20">
          <div className="text-primary-400">{persona.icon}</div>
        </div>

        {/* Role */}
        <div className="mb-2">
          <span className="text-xs uppercase tracking-[0.15em] text-primary-400/60 font-medium">
            {persona.role}
          </span>
        </div>

        {/* Context */}
        <p className="mb-4 text-sm text-white/60 leading-relaxed">
          {persona.context}
        </p>

        {/* Challenge */}
        <div className="mb-4 rounded-lg border border-white/5 bg-white/[0.01] p-4">
          <p className="text-xs uppercase tracking-wide text-white/40 font-medium mb-2">
            Challenge
          </p>
          <p className="text-sm text-white/50 leading-relaxed">
            {persona.challenge}
          </p>
        </div>

        {/* Solution */}
        <div className="rounded-lg border border-secondary-500/20 bg-secondary-500/[0.05] p-4">
          <p className="text-xs uppercase tracking-wide text-secondary-400/60 font-medium mb-2">
            Solution
          </p>
          <p className="text-sm text-white/70 leading-relaxed">
            {persona.solution}
          </p>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-secondary-500/10 px-3 py-1">
            <span className="text-xs font-medium text-secondary-400">
              {persona.highlight}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const UserPersonas = ({ className }: { className?: string }) => {
  return (
    <div className={cn('w-full', className)}>
      <div className="grid md:grid-cols-3 gap-6">
        {personas.map((persona, index) => (
          <PersonaCard key={persona.role} persona={persona} index={index} />
        ))}
      </div>
    </div>
  );
};
