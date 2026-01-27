'use client';

import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useMemo } from 'react';
import { useDndCanvas } from '@/components/canvas/DndCanvasProvider';
import { Position } from '@/components/canvas/models/canvas-types';

interface UseDraggableNodeOptions {
  id: string;
  position: Position;
  disabled?: boolean;
}

interface UseDraggableNodeReturn {
  /** Ref to attach to the draggable element */
  setNodeRef: (element: HTMLElement | null) => void;
  /** Event listeners to attach to the draggable element */
  listeners: ReturnType<typeof useDraggable>['listeners'];
  /** ARIA attributes for accessibility */
  attributes: ReturnType<typeof useDraggable>['attributes'];
  /** Whether this node is currently being dragged */
  isDragging: boolean;
  /** CSS transform string to apply during drag */
  transform: string | undefined;
  /** The current visual position (accounting for drag offset) */
  visualPosition: Position;
}

/**
 * Hook for making canvas nodes draggable with dnd-kit.
 * Handles zoom-adjusted transforms and provides visual position during drag.
 *
 * @example
 * ```tsx
 * const { setNodeRef, listeners, attributes, isDragging, transform, visualPosition } = useDraggableNode({
 *   id: node.id,
 *   position: node.position,
 * });
 *
 * return (
 *   <div
 *     ref={setNodeRef}
 *     style={{ left: visualPosition.x, top: visualPosition.y, transform }}
 *     {...listeners}
 *     {...attributes}
 *   >
 *     {children}
 *   </div>
 * );
 * ```
 */
export function useDraggableNode({
  id,
  position,
  disabled = false,
}: UseDraggableNodeOptions): UseDraggableNodeReturn {
  const { zoom } = useDndCanvas();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform: rawTransform,
    isDragging,
  } = useDraggable({
    id,
    disabled,
  });

  // Adjust transform by zoom level for visual feedback during drag
  // The actual position update happens in DndCanvasProvider.onDragEnd
  const adjustedTransform = useMemo(() => {
    if (!rawTransform) return null;
    return {
      ...rawTransform,
      x: rawTransform.x / zoom,
      y: rawTransform.y / zoom,
    };
  }, [rawTransform, zoom]);

  // CSS transform string for visual drag feedback
  const transform = useMemo(() => {
    return adjustedTransform ? CSS.Translate.toString(adjustedTransform) : undefined;
  }, [adjustedTransform]);

  // Calculate visual position during drag for components that need coordinates
  const visualPosition = useMemo<Position>(() => {
    if (!adjustedTransform) return position;
    return {
      x: position.x + adjustedTransform.x,
      y: position.y + adjustedTransform.y,
    };
  }, [position, adjustedTransform]);

  return {
    setNodeRef,
    listeners,
    attributes,
    isDragging,
    transform,
    visualPosition,
  };
}
