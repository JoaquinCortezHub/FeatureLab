'use client';

import { useState } from 'react';
import { motion, PanInfo } from 'framer-motion';
import {
  Sparkles,
  Link2,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  X,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { InsightNodeData, Position } from '@/components/canvas/models/canvas-types';

interface InsightNodeProps {
  node: InsightNodeData;
  isSelected?: boolean;
  onSelect?: (nodeId: string) => void;
  onPositionChange?: (nodeId: string, position: Position) => void;
  onDismiss?: (nodeId: string) => void;
  onApply?: (nodeId: string) => void;
}

const insightTypeConfig = {
  correlation: {
    icon: Link2,
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-700',
    iconColor: 'text-blue-500',
    accentColor: 'bg-blue-500',
  },
  pattern: {
    icon: TrendingUp,
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    borderColor: 'border-purple-200 dark:border-purple-700',
    iconColor: 'text-purple-500',
    accentColor: 'bg-purple-500',
  },
  anomaly: {
    icon: AlertTriangle,
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    borderColor: 'border-red-200 dark:border-red-700',
    iconColor: 'text-red-500',
    accentColor: 'bg-red-500',
  },
  suggestion: {
    icon: Lightbulb,
    bgColor: 'bg-amber-50 dark:bg-amber-900/20',
    borderColor: 'border-amber-200 dark:border-amber-700',
    iconColor: 'text-amber-500',
    accentColor: 'bg-amber-500',
  },
  warning: {
    icon: AlertTriangle,
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    borderColor: 'border-orange-200 dark:border-orange-700',
    iconColor: 'text-orange-500',
    accentColor: 'bg-orange-500',
  },
};

export const InsightNode = ({
  node,
  isSelected = false,
  onSelect,
  onPositionChange,
  onDismiss,
  onApply,
}: InsightNodeProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const config = insightTypeConfig[node.insightType];
  const InsightIcon = config.icon;

  const handleDragStart = () => setIsDragging(true);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    onPositionChange?.(node.id, {
      x: node.position.x + info.offset.x,
      y: node.position.y + info.offset.y,
    });
  };

  return (
    <motion.div
      className={cn(
        'absolute cursor-grab select-none',
        isDragging && 'cursor-grabbing z-50',
        isSelected && 'z-40'
      )}
      style={{ left: node.position.x, top: node.position.y }}
      drag
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={(e) => { e.stopPropagation(); onSelect?.(node.id); }}
      whileHover={{ scale: 1.01 }}
      whileDrag={{ scale: 1.03 }}
      layout
    >
      <motion.div
        className={cn(
          'rounded-xl border-2 shadow-md transition-colors',
          config.bgColor,
          config.borderColor,
          isSelected && 'ring-2 ring-offset-2 dark:ring-offset-gray-900',
          isSelected && node.insightType === 'correlation' && 'ring-blue-500',
          isSelected && node.insightType === 'pattern' && 'ring-purple-500',
          isSelected && node.insightType === 'suggestion' && 'ring-amber-500',
          isSelected && node.insightType === 'warning' && 'ring-orange-500',
          isDragging && 'shadow-xl'
        )}
        style={{ width: isExpanded ? 280 : 240 }}
        layout
      >
        <div className="flex items-start justify-between p-3">
          <div className="flex items-start gap-2">
            <div className={cn('mt-0.5 rounded-lg p-1.5', config.accentColor)}>
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <InsightIcon className={cn('h-3.5 w-3.5', config.iconColor)} />
                <span className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  AI Insight
                </span>
              </div>
              <h4 className="mt-0.5 font-semibold text-gray-900 dark:text-gray-100 leading-tight">
                {node.title}
              </h4>
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onDismiss?.(node.id); }}
            className="rounded p-0.5 text-gray-400 hover:bg-gray-200/50 hover:text-gray-600 dark:hover:bg-gray-700/50 dark:hover:text-gray-300"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="px-3 pb-3">
          <p className={cn(
            'text-sm text-gray-600 dark:text-gray-300 leading-relaxed',
            !isExpanded && 'line-clamp-2'
          )}>
            {node.description}
          </p>

          {node.description.length > 100 && (
            <button
              onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
              className="mt-1 text-xs font-medium text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </button>
          )}

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-16 rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className={cn('h-full rounded-full', config.accentColor)}
                  style={{ width: `${node.confidence * 100}%` }}
                />
              </div>
              <span className="text-xs text-gray-500">
                {Math.round(node.confidence * 100)}% conf.
              </span>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); onApply?.(node.id); }}
              className={cn(
                'flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors',
                'bg-white/50 text-gray-700 hover:bg-white dark:bg-gray-800/50 dark:text-gray-300 dark:hover:bg-gray-800'
              )}
            >
              Apply
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </motion.div>

      <div className="absolute -left-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-gray-300 bg-white dark:border-gray-500 dark:bg-gray-700" />
    </motion.div>
  );
};
