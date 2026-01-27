'use client';

import { createContext, useContext, useState, useCallback, ReactNode, useMemo } from 'react';
import {
  DndContext,
  DragStartEvent,
  DragEndEvent,
  DragMoveEvent,
  PointerSensor,
  KeyboardSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { Position, CanvasNodeData } from '@/components/canvas/models/canvas-types';

interface DragState {
  isDragging: boolean;
  activeId: string | null;
  activeNode: CanvasNodeData | null;
  initialPosition: Position | null;
  currentOffset: Position | null;
}

interface DndCanvasContextValue {
  dragState: DragState;
  zoom: number;
}

const DndCanvasContext = createContext<DndCanvasContextValue | null>(null);

export function useDndCanvas() {
  const context = useContext(DndCanvasContext);
  if (!context) {
    throw new Error('useDndCanvas must be used within DndCanvasProvider');
  }
  return context;
}

interface DndCanvasProviderProps {
  children: ReactNode;
  zoom?: number;
  nodes?: CanvasNodeData[];
  onNodePositionChange?: (nodeId: string, position: Position) => void;
  getNodePosition?: (nodeId: string) => Position | undefined;
}

export function DndCanvasProvider({
  children,
  zoom = 1,
  nodes = [],
  onNodePositionChange,
  getNodePosition,
}: DndCanvasProviderProps) {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    activeId: null,
    activeNode: null,
    initialPosition: null,
    currentOffset: null,
  });

  // Configure sensors with optimized activation constraints for snappy response
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 3, // Reduced from 5px for quicker activation
    },
  });

  // TouchSensor for mobile with slight delay to prevent scroll conflicts
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 100,
      tolerance: 5,
    },
  });

  // KeyboardSensor enables accessibility - move nodes with arrow keys
  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(pointerSensor, touchSensor, keyboardSensor);

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const { active } = event;
      const nodeId = active.id as string;
      const position = getNodePosition?.(nodeId);
      const activeNode = nodes.find((n) => n.id === nodeId) || null;

      setDragState({
        isDragging: true,
        activeId: nodeId,
        activeNode,
        initialPosition: position || null,
        currentOffset: { x: 0, y: 0 },
      });
    },
    [getNodePosition, nodes]
  );

  const handleDragMove = useCallback(
    (event: DragMoveEvent) => {
      const { delta } = event;

      // Adjust delta by zoom level - when zoomed out, movements should be larger
      const adjustedDelta = {
        x: delta.x / zoom,
        y: delta.y / zoom,
      };

      setDragState((prev) => ({
        ...prev,
        currentOffset: adjustedDelta,
      }));
    },
    [zoom]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, delta } = event;
      const nodeId = active.id as string;

      // Adjust final position by zoom level
      const adjustedDelta = {
        x: delta.x / zoom,
        y: delta.y / zoom,
      };

      const initialPosition = getNodePosition?.(nodeId);

      if (initialPosition && onNodePositionChange) {
        const newPosition: Position = {
          x: initialPosition.x + adjustedDelta.x,
          y: initialPosition.y + adjustedDelta.y,
        };
        onNodePositionChange(nodeId, newPosition);
      }

      setDragState({
        isDragging: false,
        activeId: null,
        activeNode: null,
        initialPosition: null,
        currentOffset: null,
      });
    },
    [zoom, getNodePosition, onNodePositionChange]
  );

  const handleDragCancel = useCallback(() => {
    setDragState({
      isDragging: false,
      activeId: null,
      activeNode: null,
      initialPosition: null,
      currentOffset: null,
    });
  }, []);

  const contextValue = useMemo<DndCanvasContextValue>(
    () => ({
      dragState,
      zoom,
    }),
    [dragState, zoom]
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      modifiers={[restrictToWindowEdges]}
    >
      <DndCanvasContext.Provider value={contextValue}>
        {children}
      </DndCanvasContext.Provider>
    </DndContext>
  );
}
