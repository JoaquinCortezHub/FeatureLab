'use client';

import { useState } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { Database, Table2, AlertTriangle, Copy, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DatasetNodeData, Position } from '@/components/canvas/models/canvas-types';
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
  onPositionChange?: (nodeId: string, position: Position) => void;
  onExtractFeatures?: (nodeId: string) => void;
}

export const DatasetNode = ({
  node,
  isSelected = false,
  onSelect,
  onPositionChange,
  onExtractFeatures,
}: DatasetNodeProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = () => setIsDragging(true);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    onPositionChange?.(node.id, {
      x: node.position.x + info.offset.x,
      y: node.position.y + info.offset.y,
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
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
    >
      <div
        className={cn(
          'w-56 rounded-xl border-2 shadow-md transition-all',
          'bg-white dark:bg-gray-800',
          'border-primary-300 dark:border-primary-600',
          isSelected && 'ring-2 ring-primary-500 ring-offset-2 dark:ring-offset-gray-900',
          isDragging && 'shadow-xl'
        )}
      >
        <div className="flex items-center justify-between rounded-t-lg bg-primary-50 px-3 py-2 dark:bg-primary-900/30">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-500 text-white">
              <Database className="h-4 w-4" />
            </div>
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {node.name}
            </span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded p-1 text-gray-500 hover:bg-primary-100 dark:hover:bg-primary-800">
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
            <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
              <Table2 className="h-3.5 w-3.5" />
              <span>{formatNumber(node.stats.rows)} rows</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
              <span className="font-medium">{node.stats.columns}</span>
              <span>columns</span>
            </div>
          </div>

          {(node.stats.missingValues > 0 || node.stats.duplicates > 0) && (
            <div className="flex items-center gap-2 rounded-md bg-amber-50 px-2 py-1.5 text-xs text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
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
                className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-400"
              >
                {col}
              </span>
            ))}
            {node.columns.length > 4 && (
              <span className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-500 dark:bg-gray-700">
                +{node.columns.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-primary-400 bg-white dark:border-primary-500 dark:bg-gray-700" />
    </motion.div>
  );
};
