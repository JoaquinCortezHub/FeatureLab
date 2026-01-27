'use client';

import { useDndCanvas } from '@/components/canvas/DndCanvasProvider';

/**
 * Visual feedback component that shows during drag operations.
 * Renders a very subtle overlay effect on the canvas when dragging.
 */
export function CanvasDragFeedback() {
  const { dragState } = useDndCanvas();

  // Disabled for now - keeping the component for future enhancements
  // The drag overlay itself provides sufficient visual feedback
  if (!dragState.isDragging) return null;

  return null;
}
