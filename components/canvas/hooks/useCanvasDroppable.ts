'use client';

import { useDroppable } from '@dnd-kit/core';
import { useDndCanvas } from '@/components/canvas/DndCanvasProvider';
import { Position } from '@/components/canvas/models/canvas-types';

interface UseCanvasDroppableOptions {
  /** Unique identifier for the droppable area */
  id?: string;
  /** Whether dropping is disabled */
  disabled?: boolean;
}

interface UseCanvasDroppableReturn {
  /** Ref to attach to the droppable container */
  setNodeRef: (element: HTMLElement | null) => void;
  /** Whether a draggable is currently over this droppable */
  isOver: boolean;
  /** Whether this droppable is currently active (something is being dragged) */
  active: boolean;
  /** Convert screen coordinates to canvas coordinates (accounting for zoom) */
  screenToCanvas: (screenX: number, screenY: number) => Position;
}

/**
 * Hook for making the canvas a valid drop target.
 * Provides coordinate translation utilities for accurate positioning.
 *
 * @example
 * ```tsx
 * const { setNodeRef, isOver, active } = useCanvasDroppable();
 *
 * return (
 *   <div
 *     ref={setNodeRef}
 *     className={cn(
 *       'canvas-container',
 *       isOver && 'bg-primary/10', // Visual feedback when dragging over
 *     )}
 *   >
 *     {children}
 *   </div>
 * );
 * ```
 */
export function useCanvasDroppable({
  id = 'canvas-droppable',
  disabled = false,
}: UseCanvasDroppableOptions = {}): UseCanvasDroppableReturn {
  const { dragState, zoom } = useDndCanvas();

  const { setNodeRef, isOver } = useDroppable({
    id,
    disabled,
  });

  /**
   * Convert screen coordinates to canvas coordinates.
   * Useful for dropping new items from a toolbox onto the canvas.
   */
  const screenToCanvas = (screenX: number, screenY: number): Position => {
    // Divide by zoom to get canvas coordinates
    // When zoomed out (0.5x), a screen position of 100px = 200px canvas position
    return {
      x: screenX / zoom,
      y: screenY / zoom,
    };
  };

  return {
    setNodeRef,
    isOver,
    active: dragState.isDragging,
    screenToCanvas,
  };
}
