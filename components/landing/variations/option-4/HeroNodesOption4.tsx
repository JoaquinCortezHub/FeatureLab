'use client';

import { motion } from 'framer-motion';
import {
  Database,
  Hash,
  Sparkles,
  TrendingUp,
  BarChart3,
  GitBranch,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Dataset Node - represents data source
const DatasetNode = ({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay }}
      className={cn('absolute', className)}
    >
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className={cn(
          'rounded-xl border border-cyan-500/30 bg-slate-900/90 backdrop-blur-xl',
          'px-4 py-3 shadow-2xl shadow-cyan-500/10',
          'motion-reduce:transition-none motion-reduce:transform-none'
        )}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400">
            <Database className="h-4 w-4" />
          </div>
          <div>
            <p className="font-semibold text-white text-sm">Loan Applications</p>
            <p className="text-[10px] text-white/50">10.8k rows · 6 columns</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Feature Node - shows column stats
const FeatureNode = ({
  label,
  stats,
  completion,
  className,
  delay = 0,
}: {
  label: string;
  stats: { mean: string; std: string };
  completion: number;
  className?: string;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      className={cn('absolute', className)}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: delay * 2,
        }}
        className={cn(
          'rounded-lg border border-cyan-500/20 bg-slate-900/80 backdrop-blur-xl',
          'px-3 py-2.5 shadow-xl w-[130px]',
          'motion-reduce:transition-none motion-reduce:transform-none'
        )}
      >
        <div className="flex items-center gap-2 mb-2">
          <Hash className="h-3.5 w-3.5 text-cyan-400" />
          <span className="font-medium text-white/90 text-xs">{label}</span>
        </div>
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between text-white/50">
            <span>Mean</span>
            <span className="text-white/70 font-mono">{stats.mean}</span>
          </div>
          <div className="flex justify-between text-white/50">
            <span>Std</span>
            <span className="text-white/70 font-mono">{stats.std}</span>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-cyan-500/70 rounded-full"
              style={{ width: `${completion}%` }}
            />
          </div>
          <span className="text-[9px] text-white/40">{completion}%</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

// AI Insight Card
const InsightCard = ({
  title,
  description,
  confidence,
  className,
  delay = 0,
}: {
  title: string;
  description: string;
  confidence: number;
  className?: string;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      className={cn('absolute', className)}
    >
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: delay * 1.5,
        }}
        className={cn(
          'rounded-lg border border-cyan-500/20 border-l-2 border-l-cyan-500',
          'bg-slate-900/90 backdrop-blur-xl px-3 py-2.5 shadow-xl w-[155px]',
          'motion-reduce:transition-none motion-reduce:transform-none'
        )}
      >
        <div className="flex items-center gap-2 mb-1.5">
          <div className="p-1 rounded bg-cyan-500/10">
            <Sparkles className="h-3 w-3 text-cyan-400" />
          </div>
          <span className="text-[9px] text-white/40 uppercase tracking-wider">
            AI Insight
          </span>
        </div>
        <p className="font-medium text-white/90 text-[11px] leading-tight mb-1">
          {title}
        </p>
        <p className="text-[9px] text-white/50 leading-relaxed line-clamp-2">
          {description}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${confidence}%` }}
              transition={{ duration: 1, delay: delay + 0.5 }}
              className="h-full rounded-full bg-cyan-500"
            />
          </div>
          <span className="text-[9px] text-white/50">{confidence}%</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Mini Chart
const MiniChart = ({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) => {
  const points = [
    { x: 15, y: 45 },
    { x: 25, y: 38 },
    { x: 35, y: 32 },
    { x: 45, y: 28 },
    { x: 55, y: 22 },
    { x: 65, y: 18 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      className={cn('absolute', className)}
    >
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: delay * 2,
        }}
        className={cn(
          'rounded-lg border border-cyan-500/20 bg-slate-900/80 backdrop-blur-xl',
          'p-2.5 shadow-xl w-[115px]',
          'motion-reduce:transition-none motion-reduce:transform-none'
        )}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] text-white/70">Income vs Credit</span>
          <BarChart3 className="h-3 w-3 text-cyan-400/50" />
        </div>
        <svg width="95" height="50" className="overflow-hidden">
          <line
            x1="8"
            y1="48"
            x2="92"
            y2="48"
            stroke="white"
            strokeOpacity="0.1"
            strokeWidth="1"
          />
          <line
            x1="8"
            y1="5"
            x2="8"
            y2="48"
            stroke="white"
            strokeOpacity="0.1"
            strokeWidth="1"
          />
          {points.map((point, i) => (
            <motion.circle
              key={i}
              cx={point.x}
              cy={point.y}
              r="3"
              fill="#06b6d4"
              fillOpacity="0.8"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: delay + 0.5 + i * 0.05 }}
            />
          ))}
        </svg>
      </motion.div>
    </motion.div>
  );
};

// Connection Node
const ConnectionNode = ({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      className={cn('absolute', className)}
    >
      <motion.div
        animate={{ y: [0, -5, 0], rotate: [0, 5, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={cn(
          'rounded-lg border border-cyan-500/20 bg-slate-900/80 backdrop-blur-xl',
          'p-3 shadow-xl',
          'motion-reduce:transition-none motion-reduce:transform-none'
        )}
      >
        <GitBranch className="h-8 w-8 text-cyan-400/60" />
      </motion.div>
    </motion.div>
  );
};

export const HeroNodesOption4 = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Top-left area */}
      <DatasetNode className="left-[8%] top-[15%]" delay={0.2} />

      {/* Top-center-right area */}
      <FeatureNode
        label="Income"
        stats={{ mean: '67.5k', std: '28.4k' }}
        completion={89}
        className="left-[45%] top-[8%]"
        delay={0.4}
      />

      {/* Top-far-right area */}
      <InsightCard
        title="Strong Predictor"
        description="Credit Score correlates 0.87 with approval"
        confidence={94}
        className="right-[8%] top-[12%]"
        delay={0.6}
      />

      {/* Bottom-left area */}
      <ConnectionNode className="left-[12%] bottom-[18%]" delay={0.8} />

      {/* Bottom-right area */}
      <MiniChart className="right-[10%] bottom-[15%]" delay={1.0} />

      {/* Subtle connection lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: -1 }}
      >
        <motion.path
          d="M 20% 20% Q 40% 15% 50% 12%"
          fill="none"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="4 4"
          className="stroke-cyan-500/10"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 1.2, ease: 'easeInOut' }}
        />
        <motion.path
          d="M 80% 15% Q 60% 30% 50% 40%"
          fill="none"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="4 4"
          className="stroke-cyan-500/10"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 1.4, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
};
