'use client';

import { motion } from 'framer-motion';
import {
  Database,
  Hash,
  Sparkles,
  AlertTriangle,
  TrendingUp,
  BarChart3,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Dataset Node - Main source node (left side)
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
        className="rounded-xl border border-primary-500/30 bg-slate-900/90 backdrop-blur-xl px-4 py-3 shadow-2xl shadow-primary-500/10"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500/20 text-primary-400">
            <Database className="h-4 w-4" />
          </div>
          <div>
            <p className="font-semibold text-white text-sm">
              Loan Applications
            </p>
            <p className="text-[10px] text-white/50">10.8k rows · 6 columns</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-amber-400/80 mb-2">
          <AlertTriangle className="h-3 w-3" />
          <span>234 missing · 12 dupes</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {['age', 'income', 'credit'].map((col) => (
            <span
              key={col}
              className="px-1.5 py-0.5 rounded bg-white/5 text-[9px] text-white/60"
            >
              {col}
            </span>
          ))}
          <span className="px-1.5 py-0.5 rounded bg-white/5 text-[9px] text-white/40">
            +3
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Feature Node - Shows column stats
const FeatureNode = ({
  label,
  stats,
  completion,
  missing,
  className,
  delay = 0,
  floatOffset = 6,
}: {
  label: string;
  stats: { mean: string; std: string };
  completion: number;
  missing: string;
  className?: string;
  delay?: number;
  floatOffset?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      className={cn('absolute', className)}
    >
      <motion.div
        animate={{ y: [0, -floatOffset, 0] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: delay * 2,
        }}
        className="rounded-lg border border-white/10 bg-slate-900/80 backdrop-blur-xl px-3 py-2.5 shadow-xl w-[130px]"
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
              className="h-full bg-emerald-500/70 rounded-full"
              style={{ width: `${completion}%` }}
            />
          </div>
          <span className="text-[9px] text-white/40">{completion}%</span>
        </div>
        <p className="text-[9px] text-amber-400/60 mt-1">{missing} missing</p>
      </motion.div>
    </motion.div>
  );
};

// AI Insight Card
const InsightCard = ({
  title,
  description,
  confidence,
  variant,
  className,
  delay = 0,
}: {
  title: string;
  description: string;
  confidence: number;
  variant: 'success' | 'info' | 'warning';
  className?: string;
  delay?: number;
}) => {
  const borderColors = {
    success: 'border-l-emerald-500',
    info: 'border-l-violet-500',
    warning: 'border-l-orange-500',
  };

  const iconColors = {
    success: 'text-emerald-400 bg-emerald-500/10',
    info: 'text-violet-400 bg-violet-500/10',
    warning: 'text-orange-400 bg-orange-500/10',
  };

  const barColors = {
    success: 'bg-emerald-500',
    info: 'bg-violet-500',
    warning: 'bg-orange-500',
  };

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
          'rounded-lg border border-white/10 border-l-2 bg-slate-900/90 backdrop-blur-xl px-3 py-2.5 shadow-xl w-[155px]',
          borderColors[variant],
        )}
      >
        <div className="flex items-center gap-2 mb-1.5">
          <div className={cn('p-1 rounded', iconColors[variant])}>
            {variant === 'success' && <TrendingUp className="h-3 w-3" />}
            {variant === 'info' && <Sparkles className="h-3 w-3" />}
            {variant === 'warning' && <AlertTriangle className="h-3 w-3" />}
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
              className={cn('h-full rounded-full', barColors[variant])}
            />
          </div>
          <span className="text-[9px] text-white/50">{confidence}%</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Mini Chart - Scatter Plot
const ScatterPlotMini = ({
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
    { x: 30, y: 42 },
    { x: 45, y: 28 },
    { x: 55, y: 22 },
    { x: 50, y: 30 },
    { x: 65, y: 18 },
    { x: 75, y: 15 },
    { x: 70, y: 20 },
    { x: 85, y: 12 },
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
        className="rounded-lg border border-white/10 bg-slate-900/80 backdrop-blur-xl p-2.5 shadow-xl w-[115px]"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] text-white/70">Income vs Credit</span>
          <BarChart3 className="h-3 w-3 text-white/30" />
        </div>
        <svg width="95" height="50" className="overflow-hidden">
          {/* Axes */}
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

          {/* Points */}
          {points.map((point, i) => (
            <motion.circle
              key={i}
              cx={point.x}
              cy={point.y}
              r="3"
              fill={i % 3 === 0 ? '#f59e0b' : '#22c55e'}
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

// Mini Bar Chart
const BarChartMini = ({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) => {
  const bars = [
    { height: 20 },
    { height: 32 },
    { height: 42 },
    { height: 38 },
    { height: 28 },
    { height: 15 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      className={cn('absolute', className)}
    >
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: delay * 2,
        }}
        className="rounded-lg border border-white/10 bg-slate-900/80 backdrop-blur-xl p-2.5 shadow-xl w-[115px]"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] text-white/70">Age Distribution</span>
          <BarChart3 className="h-3 w-3 text-white/30" />
        </div>
        <svg width="95" height="45" className="overflow-hidden">
          {bars.map((bar, i) => (
            <motion.rect
              key={i}
              x={5 + i * 15}
              y={45 - bar.height}
              width="11"
              height={bar.height}
              fill="#06b6d4"
              fillOpacity="0.7"
              rx="2"
              initial={{ height: 0, y: 45 }}
              animate={{ height: bar.height, y: 45 - bar.height }}
              transition={{ duration: 0.5, delay: delay + 0.3 + i * 0.08 }}
            />
          ))}
        </svg>
      </motion.div>
    </motion.div>
  );
};

// Connection Line
const ConnectionLine = ({
  d,
  delay = 0,
  color = 'default',
}: {
  d: string;
  delay?: number;
  color?: 'default' | 'primary' | 'success';
}) => {
  const strokeColors = {
    default: 'stroke-white/15',
    primary: 'stroke-primary-500/40',
    success: 'stroke-emerald-500/40',
  };

  return (
    <motion.path
      d={d}
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeDasharray="4 4"
      className={strokeColors[color]}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.5, delay, ease: 'easeInOut' }}
    />
  );
};

export const FloatingNodes = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'relative w-full aspect-square max-w-[600px] mx-auto',
        className,
      )}
    >
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        <svg className="w-full h-full">
          <defs>
            <pattern
              id="hero-grid"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 32 0 L 0 0 0 32"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl" />

      {/* Connection SVG Layer */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 600 600"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Dataset to Income */}
        <ConnectionLine
          d="M 140 240 Q 180 170 220 130"
          delay={0.6}
          color="primary"
        />

        {/* Dataset to Credit Score */}
        <ConnectionLine
          d="M 140 280 Q 180 340 220 380"
          delay={0.8}
          color="primary"
        />

        {/* Income to Strong Predictor */}
        <ConnectionLine
          d="M 330 130 Q 380 80 420 65"
          delay={1.0}
          color="success"
        />

        {/* Credit Score to Income-Age Pattern */}
        <ConnectionLine
          d="M 330 380 Q 380 340 420 300"
          delay={1.2}
          color="default"
        />

        {/* Strong Predictor to Scatter Plot */}
        <ConnectionLine
          d="M 540 100 Q 560 160 550 210"
          delay={1.4}
          color="success"
        />

        {/* Income-Age Pattern to Bar Chart */}
        <ConnectionLine
          d="M 540 340 Q 560 400 550 440"
          delay={1.6}
          color="default"
        />
      </svg>

      {/* Nodes - organized in clear columns to prevent overlap */}

      {/* Column 1: Dataset Source */}
      <DatasetNode className="left-[2%] top-[35%]" delay={0} />

      {/* Column 2: Feature Nodes */}
      <FeatureNode
        label="Income"
        stats={{ mean: '67.5k', std: '28.4k' }}
        completion={89}
        missing="0.4%"
        className="left-[33%] top-[12%]"
        delay={0.15}
        floatOffset={5}
      />

      <FeatureNode
        label="Credit Score"
        stats={{ mean: '698', std: '78' }}
        completion={94}
        missing="0.8%"
        className="left-[33%] top-[55%]"
        delay={0.25}
        floatOffset={7}
      />

      {/* Column 3: AI Insights */}
      <InsightCard
        title="Strong Predictor"
        description="Credit Score correlates 0.87 with approval"
        confidence={94}
        variant="success"
        className="left-[58%] top-[2%]"
        delay={0.35}
      />

      <InsightCard
        title="Income-Age Pattern"
        description="Income peaks at ages 45-55"
        confidence={78}
        variant="info"
        className="left-[58%] top-[42%]"
        delay={0.45}
      />

      {/* Column 4: Mini Charts */}
      <ScatterPlotMini className="left-[80%] top-[25%]" delay={0.55} />

      <BarChartMini className="left-[80%] top-[68%]" delay={0.65} />

      {/* Subtle animated particles */}
      {[
        { x: 18, y: 55 },
        { x: 52, y: 32 },
        { x: 76, y: 52 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white/20"
          style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        />
      ))}
    </div>
  );
};
