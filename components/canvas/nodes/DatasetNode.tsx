'use client';

import { motion } from 'framer-motion';
import { Database, Table2, AlertTriangle, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DatasetNodeData, Position } from '@/components/canvas/models/canvas-types';
import { useDraggableNode } from '@/components/canvas/hooks/useDraggableNode';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shared/ui/dropdown-menu';

interface DatasetNodeProps {
  node: DatasetNodeData;
  isSelected?: boolean;
  onSelect?: (nodeId: string) => void;
  /** @deprecated Position changes are now handled by DndCanvasProvider */
  onPositionChange?: (nodeId: string, position: Position) => void;
  onExtractFeatures?: (nodeId: string) => void;
}

export const DatasetNode = ({
  node,
  isSelected = false,
  onSelect,
  onExtractFeatures,
}: DatasetNodeProps) => {
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

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

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
      {...listeners}
      {...attributes}
    >
      <div
        className={cn(
          'w-56 rounded-xl border-2 shadow-md transition-all',
          'bg-[#252525]',
          'border-white/10',
          isSelected && 'ring-2 ring-primary-500 ring-offset-2 ring-offset-[#1E1E1E]'
        )}
      >
        <div className="flex items-center justify-between rounded-t-lg bg-white/5 px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-500 text-white">
              <Database className="h-4 w-4" />
            </div>
            <span className="font-semibold text-white">
              {node.name}
            </span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded p-1 text-white/50 hover:bg-white/10 hover:text-white">
                <MoreVertical className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onExtractFeatures?.(node.id)}>
                Extract All Features
              </DropdownMenuItem>
              <DropdownMenuItem>View Sample Data</DropdownMenuItem>
              <DropdownMenuItem>Export Dataset</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-2 p-3">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-1.5 text-white/60">
              <Table2 className="h-3.5 w-3.5" />
              <span>{formatNumber(node.stats.rows)} rows</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/60">
              <span className="font-medium">{node.stats.columns}</span>
              <span>columns</span>
            </div>
          </div>

          {(node.stats.missingValues > 0 || node.stats.duplicates > 0) && (
            <div className="flex items-center gap-2 rounded-md border border-amber-500/20 bg-amber-500/10 px-2 py-1.5 text-xs text-amber-200">
              <AlertTriangle className="h-3.5 w-3.5" />
              <span>
                {node.stats.missingValues > 0 && `${formatNumber(node.stats.missingValues)} missing`}
                {node.stats.missingValues > 0 && node.stats.duplicates > 0 && ' · '}
                {node.stats.duplicates > 0 && `${node.stats.duplicates} dupes`}
              </span>
            </div>
          )}

          <div className="flex flex-wrap gap-1">
            {node.columns.slice(0, 4).map((col) => (
              <span
                key={col}
                className="rounded bg-white/5 px-1.5 py-0.5 text-xs text-white/70"
              >
                {col}
              </span>
            ))}
            {node.columns.length > 4 && (
              <span className="rounded bg-white/5 px-1.5 py-0.5 text-xs text-white/60">
                +{node.columns.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-primary-400 bg-[#252525]" />
    </motion.div>
  );
};
