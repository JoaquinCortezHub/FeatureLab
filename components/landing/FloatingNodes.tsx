'use client';

import { motion } from 'framer-motion';
import {
  Database,
  GitBranch,
  Sparkles,
  BarChart3,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NodeProps {
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  variant: 'primary' | 'feature' | 'insight' | 'chart';
  className?: string;
  delay?: number;
  floatOffset?: number;
  floatDuration?: number;
}

const FloatingNode = ({
  icon,
  label,
  sublabel,
  variant,
  className,
  delay = 0,
  floatOffset = 8,
  floatDuration = 4,
}: NodeProps) => {
  // Subtle color accents for key nodes
  const variantStyles = {
    primary: 'border-primary-500/20 bg-white/[0.03]',
    feature: 'border-white/10 bg-white/[0.03]',
    insight: 'border-secondary-500/20 bg-white/[0.03]',
    chart: 'border-white/10 bg-white/[0.03]',
  };

  const iconStyles = {
    primary: 'bg-primary-500/10 text-primary-400',
    feature: 'bg-white/5 text-white/50',
    insight: 'bg-secondary-500/10 text-secondary-400',
    chart: 'bg-white/5 text-white/50',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
      className={cn('absolute', className)}
    >
      <motion.div
        animate={{
          y: [0, -floatOffset, 0],
        }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: delay * 2,
        }}
        className={cn(
          'rounded-xl border backdrop-blur-xl px-4 py-3',
          'shadow-2xl shadow-black/20',
          'transition-all duration-300',
          variantStyles[variant]
        )}
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-lg',
              iconStyles[variant]
            )}
          >
            {icon}
          </div>
          <div>
            <p className="font-medium text-white/90 text-sm leading-tight">{label}</p>
            {sublabel && (
              <p className="text-xs text-white/40 mt-0.5">{sublabel}</p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ConnectionLine = ({
  d,
  delay = 0,
  color = 'default',
}: {
  d: string;
  delay?: number;
  color?: 'default' | 'primary' | 'secondary';
}) => {
  const strokeColors = {
    default: 'stroke-white/20',
    primary: 'stroke-primary-500/30',
    secondary: 'stroke-secondary-500/30',
  };

  return (
    <motion.path
      d={d}
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      className={strokeColors[color]}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 2, delay, ease: 'easeInOut' }}
    />
  );
};

export const FloatingNodes = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'relative w-full aspect-square max-w-[600px] mx-auto',
        className
      )}
    >
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Orbital rings */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="absolute inset-0"
      >
        <div className="absolute inset-[15%] rounded-full border border-white/[0.03]" />
        <div className="absolute inset-[30%] rounded-full border border-white/[0.03]" />
        <div className="absolute inset-[45%] rounded-full border border-white/[0.03]" />
      </motion.div>

      {/* Connection SVG Layer */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 600 600"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Dataset (48, 270) to Income (150, 150) */}
        <ConnectionLine
          d="M 48 270 Q 100 200 150 150"
          delay={0.8}
          color="primary"
        />
        
        {/* Dataset (48, 270) to Credit Score (150, 348) */}
        <ConnectionLine
          d="M 48 270 Q 100 320 150 348"
          delay={1.0}
          color="primary"
        />

        {/* Income (150, 150) to Strong Predictor (480, 90) */}
        <ConnectionLine
          d="M 150 150 Q 300 100 480 90"
          delay={1.2}
          color="default"
        />
        
        {/* Credit Score (150, 348) to Pattern Found (480, 252) */}
        <ConnectionLine
          d="M 150 348 Q 300 300 480 252"
          delay={1.4}
          color="secondary"
        />
        
        {/* Income (150, 150) to Pattern Found (480, 252) - cross connection */}
        <ConnectionLine
          d="M 150 150 Q 300 200 480 252"
          delay={1.3}
          color="default"
        />
        
        {/* Strong Predictor (480, 90) to Scatter Plot (552, 372) */}
        <ConnectionLine
          d="M 480 90 Q 520 220 552 372"
          delay={1.6}
          color="secondary"
        />
        
        {/* Pattern Found (480, 252) to Scatter Plot (552, 372) */}
        <ConnectionLine
          d="M 480 252 Q 520 310 552 372"
          delay={1.7}
          color="default"
        />
        
        {/* Credit Score (150, 348) to Scatter Plot (552, 372) - direct path */}
        <ConnectionLine
          d="M 150 348 Q 350 360 552 372"
          delay={1.5}
          color="primary"
        />
      </svg>

      {/* Floating Nodes - All connected in a cohesive graph */}
      
      {/* Left: Dataset (source) */}
      <FloatingNode
        icon={<Database className="h-4 w-4" />}
        label="Customer Dataset"
        sublabel="10,847 rows"
        variant="primary"
        className="left-[8%] top-[45%]"
        delay={0}
        floatOffset={6}
        floatDuration={5}
      />

      {/* Center-left: Features */}
      <FloatingNode
        icon={<GitBranch className="h-4 w-4" />}
        label="Income"
        sublabel="High importance"
        variant="feature"
        className="left-[25%] top-[25%]"
        delay={0.15}
        floatOffset={10}
        floatDuration={4.5}
      />

      <FloatingNode
        icon={<TrendingUp className="h-4 w-4" />}
        label="Credit Score"
        sublabel="0.87 correlation"
        variant="feature"
        className="left-[25%] top-[58%]"
        delay={0.25}
        floatOffset={8}
        floatDuration={5.5}
      />

      {/* Center-right: Insights */}
      <FloatingNode
        icon={<Sparkles className="h-4 w-4" />}
        label="Strong Predictor"
        sublabel="94% confidence"
        variant="insight"
        className="right-[20%] top-[15%]"
        delay={0.35}
        floatOffset={7}
        floatDuration={4}
      />

      <FloatingNode
        icon={<Zap className="h-4 w-4" />}
        label="Pattern Found"
        sublabel="Non-linear"
        variant="insight"
        className="right-[20%] top-[42%]"
        delay={0.45}
        floatOffset={9}
        floatDuration={5}
      />

      {/* Right: Chart (sink - all paths lead here) */}
      <FloatingNode
        icon={<BarChart3 className="h-4 w-4" />}
        label="Scatter Plot"
        sublabel="Income vs Score"
        variant="chart"
        className="right-[8%] top-[62%]"
        delay={0.55}
        floatOffset={6}
        floatDuration={4.8}
      />

      {/* Subtle glow points */}
      {[
        { x: 20, y: 50 },
        { x: 50, y: 20 },
        { x: 80, y: 45 },
        { x: 35, y: 75 },
        { x: 65, y: 80 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white/30"
          style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          animate={{
            opacity: [0.1, 0.4, 0.1],
            scale: [1, 1.2, 1],
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
