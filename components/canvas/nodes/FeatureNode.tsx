'use client';

import { motion } from 'framer-motion';
import { Hash, Type, Calendar, ToggleLeft, FileText, TrendingUp, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FeatureNodeData, Position, DataType } from '@/components/canvas/models/canvas-types';
import { useDraggableNode } from '@/components/canvas/hooks/useDraggableNode';
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
  /** @deprecated Position changes are now handled by DndCanvasProvider */
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
}: FeatureNodeProps) => {
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

  const typeConfig = dataTypeConfig[node.stats.dataType];
  const TypeIcon = typeConfig.icon;

  const importanceColor = node.importance
    ? node.importance > 0.7
      ? 'bg-green-500'
      : node.importance > 0.4
        ? 'bg-amber-500'
        : 'bg-gray-400'
    : 'bg-gray-300';

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
      whileHover={{ scale: isDragging ? 1 : 1.02 }}
      animate={{ scale: isDragging ? 1 : 1 }}
      {...listeners}
      {...attributes}
    >
      <div
        className={cn(
          'w-48 rounded-lg border shadow-sm transition-all',
          'bg-[#252525]',
          'border-white/10',
          isSelected && 'ring-2 ring-secondary-500 ring-offset-2 ring-offset-[#1E1E1E]'
        )}
      >
        <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-3 py-2">
          <div className="flex items-center gap-2">
            <TypeIcon className={cn('h-4 w-4', typeConfig.color)} />
            <span className="max-w-24 truncate font-medium text-white">
              {node.name}
            </span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded p-0.5 text-white/50 hover:bg-white/10 hover:text-white">
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
            <span className="text-white/60">{typeConfig.label}</span>
            <span className="text-white/80">
              {node.stats.uniqueValues.toLocaleString()} unique
            </span>
          </div>

          {node.stats.dataType === 'numeric' && (
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-white/40">Mean</span>
                <span className="font-mono text-white/80">
                  {node.stats.mean?.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Std</span>
                <span className="font-mono text-white/80">
                  {node.stats.stdDev?.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Min</span>
                <span className="font-mono text-white/80">
                  {node.stats.min?.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Max</span>
                <span className="font-mono text-white/80">
                  {node.stats.max?.toLocaleString()}
                </span>
              </div>
            </div>
          )}

          {node.stats.topCategories && (
            <div className="space-y-1">
              {node.stats.topCategories.slice(0, 2).map((cat) => (
                <div key={cat.name} className="flex items-center justify-between text-xs">
                  <span className="text-white/70">{cat.name}</span>
                  <span className="text-white/60">{cat.count.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}

          {node.importance !== undefined && (
            <div className="flex items-center gap-2 pt-1">
              <TrendingUp className="h-3 w-3 text-white/50" />
              <div className="flex-1 h-1.5 rounded-full bg-white/5">
                <div
                  className={cn('h-full rounded-full transition-all', importanceColor)}
                  style={{ width: `${node.importance * 100}%` }}
                />
              </div>
              <span className="text-xs font-medium text-white/70">
                {Math.round(node.importance * 100)}%
              </span>
            </div>
          )}

          {node.stats.missingPercent > 0 && (
            <div className="text-xs text-amber-300">
              {node.stats.missingPercent.toFixed(1)}% missing
            </div>
          )}
        </div>
      </div>

      <div className="absolute -left-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-white/20 bg-[#252525]" />
      <div className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-white/20 bg-[#252525]" />
    </motion.div>
  );
};
