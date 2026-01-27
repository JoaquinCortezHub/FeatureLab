'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
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
import { useDraggableNode } from '@/components/canvas/hooks/useDraggableNode';

interface InsightNodeProps {
  node: InsightNodeData;
  isSelected?: boolean;
  onSelect?: (nodeId: string) => void;
  /** @deprecated Position changes are now handled by DndCanvasProvider */
  onPositionChange?: (nodeId: string, position: Position) => void;
  onDismiss?: (nodeId: string) => void;
  onApply?: (nodeId: string) => void;
}

const insightTypeConfig = {
  correlation: {
    icon: Link2,
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    iconColor: 'text-blue-300',
    accentColor: 'bg-blue-400',
  },
  pattern: {
    icon: TrendingUp,
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    iconColor: 'text-purple-300',
    accentColor: 'bg-purple-400',
  },
  anomaly: {
    icon: AlertTriangle,
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    iconColor: 'text-red-300',
    accentColor: 'bg-red-400',
  },
  suggestion: {
    icon: Lightbulb,
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    iconColor: 'text-amber-200',
    accentColor: 'bg-amber-400',
  },
  warning: {
    icon: AlertTriangle,
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    iconColor: 'text-orange-200',
    accentColor: 'bg-orange-400',
  },
};

export const InsightNode = ({
  node,
  isSelected = false,
  onSelect,
  onDismiss,
  onApply,
}: InsightNodeProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    setNodeRef,
    listeners,
    attributes,
    isDragging,
    transform,
  } = useDraggableNode({
    id: node.id,
    position: node.position,
  });

  const config = insightTypeConfig[node.insightType];
  const InsightIcon = config.icon;

  return (
    <motion.div
      ref={setNodeRef}
      className={cn(
        'absolute cursor-grab select-none touch-none',
        isDragging && 'z-50 cursor-grabbing',
        isSelected && !isDragging && 'z-40'
      )}
      style={{
        left: node.position.x,
        top: node.position.y,
        transform,
      }}
      onClick={(e) => { e.stopPropagation(); onSelect?.(node.id); }}
      whileHover={{ scale: isDragging ? 1 : 1.01 }}
      animate={{ scale: isDragging ? 1 : 1 }}
      layout
      {...listeners}
      {...attributes}
    >
      <motion.div
        className={cn(
          'rounded-xl border-2 shadow-md transition-colors',
          config.bgColor,
          config.borderColor,
          isSelected && 'ring-2 ring-offset-2 ring-offset-[#1E1E1E]',
          isSelected && node.insightType === 'correlation' && 'ring-blue-500',
          isSelected && node.insightType === 'pattern' && 'ring-purple-500',
          isSelected && node.insightType === 'suggestion' && 'ring-amber-500',
          isSelected && node.insightType === 'warning' && 'ring-orange-500'
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
                <span className="text-xs font-medium uppercase tracking-wide text-white/60">
                  AI Insight
                </span>
              </div>
              <h4 className="mt-0.5 font-semibold leading-tight text-white">
                {node.title}
              </h4>
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onDismiss?.(node.id); }}
            className="rounded p-0.5 text-white/50 hover:bg-white/10 hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="px-3 pb-3">
          <p className={cn(
            'text-sm leading-relaxed text-white/80',
            !isExpanded && 'line-clamp-2'
          )}>
            {node.description}
          </p>

          {node.description.length > 100 && (
            <button
              onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
              className="mt-1 text-xs font-medium text-white/60 hover:text-white/80"
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </button>
          )}

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-16 rounded-full bg-white/10">
                <div
                  className={cn('h-full rounded-full', config.accentColor)}
                  style={{ width: `${node.confidence * 100}%` }}
                />
              </div>
              <span className="text-xs text-white/60">
                {Math.round(node.confidence * 100)}% conf.
              </span>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); onApply?.(node.id); }}
              className={cn(
                'flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors',
                'bg-white/10 text-white hover:bg-white/15'
              )}
            >
              Apply
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </motion.div>

      <div className="absolute -left-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-white/20 bg-[#252525]" />
    </motion.div>
  );
};
