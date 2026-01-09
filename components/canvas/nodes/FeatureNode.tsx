'use client';

import { useState } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { Hash, Type, Calendar, ToggleLeft, FileText, TrendingUp, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FeatureNodeData, Position, DataType } from '@/components/canvas/models/canvas-types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shared/ui/dropdown-menu';

interface FeatureNodeProps {
  node: FeatureNodeData;
  isSelected?: boolean;
  onSelect?: (nodeId: string) => void;
  onPositionChange?: (nodeId: string, position: Position) => void;
  onVisualize?: (nodeId: string) => void;
}

const dataTypeConfig: Record<DataType, { icon: typeof Hash; color: string; label: string }> = {
  numeric: { icon: Hash, color: 'text-blue-500', label: 'Numeric' },
  categorical: { icon: Type, color: 'text-purple-500', label: 'Categorical' },
  datetime: { icon: Calendar, color: 'text-green-500', label: 'DateTime' },
  boolean: { icon: ToggleLeft, color: 'text-amber-500', label: 'Boolean' },
  text: { icon: FileText, color: 'text-pink-500', label: 'Text' },
};

export const FeatureNode = ({
  node,
  isSelected = false,
  onSelect,
  onPositionChange,
  onVisualize,
}: FeatureNodeProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const typeConfig = dataTypeConfig[node.stats.dataType];
  const TypeIcon = typeConfig.icon;

  const handleDragStart = () => setIsDragging(true);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    onPositionChange?.(node.id, {
      x: node.position.x + info.offset.x,
      y: node.position.y + info.offset.y,
    });
  };

  const importanceColor = node.importance
    ? node.importance > 0.7
      ? 'bg-green-500'
      : node.importance > 0.4
        ? 'bg-amber-500'
        : 'bg-gray-400'
    : 'bg-gray-300';

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
      whileHover={{ scale: 1.02 }}
      whileDrag={{ scale: 1.04 }}
    >
      <div
        className={cn(
          'w-48 rounded-lg border shadow-sm transition-all',
          'bg-white dark:bg-gray-800',
          'border-gray-200 dark:border-gray-600',
          isSelected && 'ring-2 ring-secondary-500 ring-offset-2 dark:ring-offset-gray-900',
          isDragging && 'shadow-lg'
        )}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-3 py-2 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <TypeIcon className={cn('h-4 w-4', typeConfig.color)} />
            <span className="font-medium text-gray-900 dark:text-gray-100 truncate max-w-24">
              {node.name}
            </span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded p-0.5 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                <MoreVertical className="h-3.5 w-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onVisualize?.(node.id)}>
                Visualize
              </DropdownMenuItem>
              <DropdownMenuItem>Find Correlations</DropdownMenuItem>
              <DropdownMenuItem>Transform</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-2 p-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500 dark:text-gray-400">{typeConfig.label}</span>
            <span className="text-gray-600 dark:text-gray-300">
              {node.stats.uniqueValues.toLocaleString()} unique
            </span>
          </div>

          {node.stats.dataType === 'numeric' && (
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Mean</span>
                <span className="font-mono text-gray-700 dark:text-gray-300">
                  {node.stats.mean?.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Std</span>
                <span className="font-mono text-gray-700 dark:text-gray-300">
                  {node.stats.stdDev?.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Min</span>
                <span className="font-mono text-gray-700 dark:text-gray-300">
                  {node.stats.min?.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Max</span>
                <span className="font-mono text-gray-700 dark:text-gray-300">
                  {node.stats.max?.toLocaleString()}
                </span>
              </div>
            </div>
          )}

          {node.stats.topCategories && (
            <div className="space-y-1">
              {node.stats.topCategories.slice(0, 2).map((cat) => (
                <div key={cat.name} className="flex items-center justify-between text-xs">
                  <span className="text-gray-600 dark:text-gray-400">{cat.name}</span>
                  <span className="text-gray-500">{cat.count.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}

          {node.importance !== undefined && (
            <div className="flex items-center gap-2 pt-1">
              <TrendingUp className="h-3 w-3 text-gray-400" />
              <div className="flex-1 h-1.5 rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className={cn('h-full rounded-full transition-all', importanceColor)}
                  style={{ width: `${node.importance * 100}%` }}
                />
              </div>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                {Math.round(node.importance * 100)}%
              </span>
            </div>
          )}

          {node.stats.missingPercent > 0 && (
            <div className="text-xs text-amber-600 dark:text-amber-400">
              {node.stats.missingPercent.toFixed(1)}% missing
            </div>
          )}
        </div>
      </div>

      <div className="absolute -left-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-gray-300 bg-white dark:border-gray-500 dark:bg-gray-700" />
      <div className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-gray-300 bg-white dark:border-gray-500 dark:bg-gray-700" />
    </motion.div>
  );
};
