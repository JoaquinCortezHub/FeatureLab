'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import {
  CanvasConnection as ConnectionType,
  CanvasNodeData,
  Position,
} from '@/components/canvas/models/canvas-types';

interface CanvasConnectionProps {
  connection: ConnectionType;
  nodes: CanvasNodeData[];
  isSelected?: boolean;
  onClick?: (connectionId: string) => void;
}

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

const connectionStyles = {
  'data-flow': {
    stroke: 'stroke-white/20',
    dashArray: '',
    opacity: 0.8,
  },
  'strong-correlation': {
    stroke: 'stroke-green-400',
    dashArray: '',
    opacity: 1,
  },
  'moderate-correlation': {
    stroke: 'stroke-blue-400',
    dashArray: '8 4',
    opacity: 0.9,
  },
  'weak-correlation': {
    stroke: 'stroke-white/25',
    dashArray: '4 4',
    opacity: 0.6,
  },
  'inverse-correlation': {
    stroke: 'stroke-red-400',
    dashArray: '8 4',
    opacity: 0.9,
  },
  'derives-from': {
    stroke: 'stroke-purple-400',
    dashArray: '4 2',
    opacity: 0.8,
  },
};

const getNodeDimensions = (node: CanvasNodeData) => ({
  width: NODE_WIDTHS[node.type] || 200,
  height: NODE_HEIGHTS[node.type] || 150,
});

const getOutputPoint = (node: CanvasNodeData): Position => {
  const dims = getNodeDimensions(node);
  return {
    x: node.position.x + dims.width,
    y: node.position.y + dims.height / 2,
  };
};

const getInputPoint = (node: CanvasNodeData): Position => {
  const dims = getNodeDimensions(node);
  return {
    x: node.position.x,
    y: node.position.y + dims.height / 2,
  };
};

const generateBezierPath = (start: Position, end: Position): string => {
  const dx = end.x - start.x;
  const controlPointOffset = Math.min(Math.abs(dx) * 0.5, 120);

  const cp1x = start.x + controlPointOffset;
  const cp1y = start.y;
  const cp2x = end.x - controlPointOffset;
  const cp2y = end.y;

  return `M ${start.x} ${start.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${end.x} ${end.y}`;
};

export const CanvasConnection = ({
  connection,
  nodes,
  isSelected = false,
  onClick,
}: CanvasConnectionProps) => {
  const sourceNode = nodes.find((n) => n.id === connection.sourceId);
  const targetNode = nodes.find((n) => n.id === connection.targetId);

  const pathData = useMemo(() => {
    if (!sourceNode || !targetNode) {
      return null;
    }

    const start = getOutputPoint(sourceNode);
    const end = getInputPoint(targetNode);

    return {
      path: generateBezierPath(start, end),
      start,
      end,
      midpoint: {
        x: (start.x + end.x) / 2,
        y: (start.y + end.y) / 2,
      },
    };
  }, [sourceNode, targetNode]);

  if (!pathData) {
    return null;
  }

  const style = connectionStyles[connection.type] || connectionStyles['data-flow'];

  return (
    <g
      className={cn(
        'cursor-pointer transition-opacity',
        isSelected ? 'opacity-100' : `opacity-${Math.round(style.opacity * 100)}`
      )}
      style={{ opacity: isSelected ? 1 : style.opacity }}
      onClick={() => onClick?.(connection.id)}
    >
      <path
        d={pathData.path}
        className={cn(
          'fill-none transition-all',
          style.stroke,
          isSelected ? 'stroke-[3px]' : 'stroke-2'
        )}
        strokeDasharray={style.dashArray}
        strokeLinecap="round"
      />

      <path
        d={pathData.path}
        className="fill-none stroke-transparent stroke-[14px]"
        strokeLinecap="round"
      />

      {connection.correlationValue !== undefined && (
        <g transform={`translate(${pathData.midpoint.x}, ${pathData.midpoint.y})`}>
          <rect
            x="-18"
            y="-10"
            width="36"
            height="20"
            rx="4"
            className="fill-[#252525]"
          />
          <text
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-white/70 text-xs font-medium"
            style={{ fontSize: '11px' }}
          >
            {connection.correlationValue.toFixed(2)}
          </text>
        </g>
      )}
    </g>
  );
};

interface CanvasConnectionsLayerProps {
  connections: ConnectionType[];
  nodes: CanvasNodeData[];
  selectedConnectionId?: string | null;
  onConnectionClick?: (connectionId: string) => void;
}

export const CanvasConnectionsLayer = ({
  connections,
  nodes,
  selectedConnectionId,
  onConnectionClick,
}: CanvasConnectionsLayerProps) => {
  const svgBounds = useMemo(() => {
    if (nodes.length === 0) {
      return { width: 1400, height: 800 };
    }

    const maxX = Math.max(
      ...nodes.map((n) => n.position.x + (NODE_WIDTHS[n.type] || 200))
    ) + 150;
    const maxY = Math.max(
      ...nodes.map((n) => n.position.y + (NODE_HEIGHTS[n.type] || 150))
    ) + 150;

    return {
      width: Math.max(maxX, 1400),
      height: Math.max(maxY, 800),
    };
  }, [nodes]);

  return (
    <svg
      className="pointer-events-none absolute left-0 top-0"
      width={svgBounds.width}
      height={svgBounds.height}
      style={{ overflow: 'visible' }}
    >
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            className="fill-white/40"
          />
        </marker>
      </defs>
      <g className="pointer-events-auto">
        {connections.map((connection) => (
          <CanvasConnection
            key={connection.id}
            connection={connection}
            nodes={nodes}
            isSelected={selectedConnectionId === connection.id}
            onClick={onConnectionClick}
          />
        ))}
      </g>
    </svg>
  );
};
