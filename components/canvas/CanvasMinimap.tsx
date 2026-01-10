'use client';

import { useMemo } from 'react';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/shared/ui/button';
import {
  CanvasNodeData,
  CanvasViewport,
} from '@/components/canvas/models/canvas-types';

interface CanvasMinimapProps {
  nodes: CanvasNodeData[];
  viewport: CanvasViewport;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
  className?: string;
}

const MINIMAP_WIDTH = 200;
const MINIMAP_HEIGHT = 130;
const MINIMAP_PADDING = 12;

const NODE_WIDTHS: Record<string, number> = {
  dataset: 224,
  feature: 192,
  insight: 240,
  chart: 256,
  transformation: 200,
};

const NODE_HEIGHTS: Record<string, number> = {
  dataset: 160,
  feature: 160,
  insight: 180,
  chart: 200,
  transformation: 120,
};

export const CanvasMinimap = ({
  nodes,
  viewport,
  onZoomIn,
  onZoomOut,
  onResetView,
  className,
}: CanvasMinimapProps) => {
  const minimapData = useMemo(() => {
    if (nodes.length === 0) {
      return {
        scale: 1,
        offsetX: 0,
        offsetY: 0,
        nodeRects: [],
      };
    }

    const minX = Math.min(...nodes.map((n) => n.position.x)) - MINIMAP_PADDING;
    const minY = Math.min(...nodes.map((n) => n.position.y)) - MINIMAP_PADDING;
    const maxX = Math.max(
      ...nodes.map((n) => n.position.x + (NODE_WIDTHS[n.type] || 200))
    ) + MINIMAP_PADDING;
    const maxY = Math.max(
      ...nodes.map((n) => n.position.y + (NODE_HEIGHTS[n.type] || 150))
    ) + MINIMAP_PADDING;

    const contentWidth = maxX - minX;
    const contentHeight = maxY - minY;

    const scaleX = (MINIMAP_WIDTH - MINIMAP_PADDING * 2) / contentWidth;
    const scaleY = (MINIMAP_HEIGHT - MINIMAP_PADDING * 2) / contentHeight;
    const scale = Math.min(scaleX, scaleY, 0.12);

    const nodeRects = nodes.map((node) => ({
      id: node.id,
      x: (node.position.x - minX) * scale + MINIMAP_PADDING,
      y: (node.position.y - minY) * scale + MINIMAP_PADDING,
      width: (NODE_WIDTHS[node.type] || 200) * scale,
      height: (NODE_HEIGHTS[node.type] || 150) * scale,
      type: node.type,
    }));

    return {
      scale,
      offsetX: minX,
      offsetY: minY,
      nodeRects,
    };
  }, [nodes]);

  const nodeColors: Record<string, string> = {
    dataset: 'fill-primary-500',
    feature: 'fill-gray-500',
    insight: 'fill-purple-400',
    chart: 'fill-secondary-500',
    transformation: 'fill-amber-500',
  };

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 z-30 flex flex-col gap-2',
        className
      )}
    >
      <div
        className={cn(
          'overflow-hidden rounded-xl border shadow-lg',
          'border-white/10 bg-[#1E1E1E]'
        )}
      >
        <svg
          width={MINIMAP_WIDTH}
          height={MINIMAP_HEIGHT}
          className="bg-[#161616]"
        >
          <rect
            width={MINIMAP_WIDTH}
            height={MINIMAP_HEIGHT}
            className="fill-[#161616]"
          />

          {minimapData.nodeRects.map((rect) => (
            <rect
              key={rect.id}
              x={rect.x}
              y={rect.y}
              width={Math.max(rect.width, 3)}
              height={Math.max(rect.height, 2)}
              rx={1}
              className={nodeColors[rect.type] || 'fill-gray-400'}
            />
          ))}
        </svg>
      </div>

      <div
        className={cn(
          'flex items-center justify-between rounded-xl border px-2 py-1.5 shadow-sm',
          'border-white/10 bg-[#1E1E1E]'
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-white/70 hover:bg-white/10 hover:text-white"
          onClick={onZoomOut}
          title="Zoom out"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>

        <span className="min-w-12 text-center text-xs font-medium text-white/60">
          {Math.round(viewport.zoom * 100)}%
        </span>

        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-white/70 hover:bg-white/10 hover:text-white"
          onClick={onZoomIn}
          title="Zoom in"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>

        <div className="mx-1 h-4 w-px bg-white/10" />

        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-white/70 hover:bg-white/10 hover:text-white"
          onClick={onResetView}
          title="Reset view"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
