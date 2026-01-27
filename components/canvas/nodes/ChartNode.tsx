'use client';

import { motion } from 'framer-motion';
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
import {
  ChartNodeData,
  Position,
} from '@/components/canvas/models/canvas-types';
import { useDraggableNode } from '@/components/canvas/hooks/useDraggableNode';
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
  /** @deprecated Position changes are now handled by DndCanvasProvider */
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
  onExpand,
}: ChartNodeProps) => {
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

  const renderChart = () => {
    switch (node.chartType) {
      case 'scatter':
        return (
          <ResponsiveContainer width="100%" height={140}>
            <ScatterChart margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="currentColor"
                className="text-white/10"
              />
              <XAxis
                type="number"
                dataKey="x"
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                className="text-white/50"
              />
              <YAxis
                type="number"
                dataKey="y"
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                className="text-white/50"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#252525',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '6px',
                  fontSize: '12px',
                }}
              />
              <Scatter data={node.data} fill={CHART_COLORS.primary}>
                {node.data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.approved
                        ? CHART_COLORS.success
                        : CHART_COLORS.warning
                    }
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        );

      case 'histogram':
        return (
          <ResponsiveContainer width="100%" height={140}>
            <BarChart
              data={node.data}
              margin={{ top: 10, right: 10, bottom: 0, left: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="currentColor"
                className="text-white/10"
                vertical={false}
              />
              <XAxis
                dataKey="range"
                tick={{ fontSize: 9 }}
                tickLine={false}
                axisLine={false}
                className="text-white/50"
              />
              <YAxis
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                className="text-white/50"
                width={30}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#252525',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '6px',
                  fontSize: '12px',
                }}
              />
              <Bar
                dataKey="count"
                fill={CHART_COLORS.secondary}
                radius={[4, 4, 0, 0]}
              />
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
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.(node.id);
      }}
      whileHover={{ scale: isDragging ? 1 : 1.01 }}
      animate={{ scale: isDragging ? 1 : 1 }}
      {...listeners}
      {...attributes}
    >
      <div
        className={cn(
          'w-64 overflow-hidden rounded-xl border shadow-md transition-all',
          'bg-[#252525]',
          'border-white/10',
          isSelected &&
            'ring-2 ring-secondary-500 ring-offset-2 ring-offset-[#1E1E1E]'
        )}
      >
        <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-3 py-2">
          <h4 className="text-sm font-medium text-white">{node.title}</h4>
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onExpand?.(node.id);
              }}
              className="rounded p-1 text-white/50 hover:bg-white/10 hover:text-white"
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded p-1 text-white/50 hover:bg-white/10 hover:text-white">
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

        <div className="p-2">{renderChart()}</div>
      </div>

      <div className="absolute -left-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-white/20 bg-[#252525]" />
    </motion.div>
  );
};
