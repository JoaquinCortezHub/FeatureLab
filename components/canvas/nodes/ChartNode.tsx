'use client';

import { useState } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { Maximize2, MoreVertical } from 'lucide-react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from 'recharts';
import { cn } from '@/lib/utils';
import { ChartNodeData, Position } from '@/components/canvas/models/canvas-types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shared/ui/dropdown-menu';

interface ChartNodeProps {
  node: ChartNodeData;
  isSelected?: boolean;
  onSelect?: (nodeId: string) => void;
  onPositionChange?: (nodeId: string, position: Position) => void;
  onExpand?: (nodeId: string) => void;
}

const CHART_COLORS = {
  primary: '#3b82f6',
  secondary: '#06b6d4',
  success: '#22c55e',
  warning: '#f59e0b',
  muted: '#9ca3af',
};

export const ChartNode = ({
  node,
  isSelected = false,
  onSelect,
  onPositionChange,
  onExpand,
}: ChartNodeProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = () => setIsDragging(true);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    onPositionChange?.(node.id, {
      x: node.position.x + info.offset.x,
      y: node.position.y + info.offset.y,
    });
  };

  const renderChart = () => {
    switch (node.chartType) {
      case 'scatter':
        return (
          <ResponsiveContainer width="100%" height={140}>
            <ScatterChart margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-gray-200 dark:text-gray-700" />
              <XAxis
                type="number"
                dataKey="x"
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                className="text-gray-400"
              />
              <YAxis
                type="number"
                dataKey="y"
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                className="text-gray-400"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--tooltip-bg, #fff)',
                  border: '1px solid var(--tooltip-border, #e5e7eb)',
                  borderRadius: '6px',
                  fontSize: '12px',
                }}
              />
              <Scatter data={node.data} fill={CHART_COLORS.primary}>
                {node.data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.approved ? CHART_COLORS.success : CHART_COLORS.warning}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        );

      case 'histogram':
        return (
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={node.data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-gray-200 dark:text-gray-700" vertical={false} />
              <XAxis
                dataKey="range"
                tick={{ fontSize: 9 }}
                tickLine={false}
                axisLine={false}
                className="text-gray-400"
              />
              <YAxis
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                className="text-gray-400"
                width={30}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--tooltip-bg, #fff)',
                  border: '1px solid var(--tooltip-border, #e5e7eb)',
                  borderRadius: '6px',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="count" fill={CHART_COLORS.secondary} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      default:
        return (
          <div className="flex h-32 items-center justify-center text-sm text-gray-400">
            Chart type not supported
          </div>
        );
    }
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
      whileDrag={{ scale: 1.02 }}
    >
      <div
        className={cn(
          'w-64 overflow-hidden rounded-xl border shadow-md transition-all',
          'bg-white dark:bg-gray-800',
          'border-gray-200 dark:border-gray-600',
          isSelected && 'ring-2 ring-secondary-500 ring-offset-2 dark:ring-offset-gray-900',
          isDragging && 'shadow-xl'
        )}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-3 py-2 dark:border-gray-700">
          <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
            {node.title}
          </h4>
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => { e.stopPropagation(); onExpand?.(node.id); }}
              className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <MoreVertical className="h-3.5 w-3.5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Change Chart Type</DropdownMenuItem>
                <DropdownMenuItem>Export Image</DropdownMenuItem>
                <DropdownMenuItem>View Full Data</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="p-2">
          {renderChart()}
        </div>
      </div>

      <div className="absolute -left-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-gray-300 bg-white dark:border-gray-500 dark:bg-gray-700" />
    </motion.div>
  );
};
