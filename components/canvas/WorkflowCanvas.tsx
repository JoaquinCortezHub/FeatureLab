'use client';

import { useState, useRef, useCallback, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CanvasGrid } from '@/components/canvas/CanvasGrid';
import { CanvasViewport } from '@/components/canvas/models/canvas-types';

interface WorkflowCanvasProps {
  children: ReactNode;
  className?: string;
  onViewportChange?: (viewport: CanvasViewport) => void;
}

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 2;
const ZOOM_STEP = 0.1;

export const WorkflowCanvas = ({
  children,
  className,
  onViewportChange,
}: WorkflowCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewport, setViewport] = useState<CanvasViewport>({
    x: 0,
    y: 0,
    zoom: 1,
  });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  const updateViewport = useCallback(
    (newViewport: CanvasViewport) => {
      setViewport(newViewport);
      onViewportChange?.(newViewport);
    },
    [onViewportChange]
  );

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
        const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, viewport.zoom + delta));

        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;

          const zoomRatio = newZoom / viewport.zoom;
          const newX = mouseX - (mouseX - viewport.x) * zoomRatio;
          const newY = mouseY - (mouseY - viewport.y) * zoomRatio;

          updateViewport({ x: newX, y: newY, zoom: newZoom });
        }
      } else {
        updateViewport({
          ...viewport,
          x: viewport.x - e.deltaX,
          y: viewport.y - e.deltaY,
        });
      }
    },
    [viewport, updateViewport]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button === 1 || (e.button === 0 && e.altKey)) {
        e.preventDefault();
        setIsPanning(true);
        setPanStart({ x: e.clientX - viewport.x, y: e.clientY - viewport.y });
      }
    },
    [viewport]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isPanning) {
        updateViewport({
          ...viewport,
          x: e.clientX - panStart.x,
          y: e.clientY - panStart.y,
        });
      }
    },
    [isPanning, panStart, viewport, updateViewport]
  );

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  const handleZoomIn = useCallback(() => {
    const newZoom = Math.min(MAX_ZOOM, viewport.zoom + ZOOM_STEP);
    updateViewport({ ...viewport, zoom: newZoom });
  }, [viewport, updateViewport]);

  const handleZoomOut = useCallback(() => {
    const newZoom = Math.max(MIN_ZOOM, viewport.zoom - ZOOM_STEP);
    updateViewport({ ...viewport, zoom: newZoom });
  }, [viewport, updateViewport]);

  const handleResetView = useCallback(() => {
    updateViewport({ x: 0, y: 0, zoom: 1 });
  }, [updateViewport]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative h-full w-full overflow-hidden',
        'bg-gray-50 dark:bg-gray-900',
        isPanning ? 'cursor-grabbing' : 'cursor-default',
        className
      )}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <CanvasGrid />

      <motion.div
        className="absolute origin-top-left"
        style={{
          x: viewport.x,
          y: viewport.y,
          scale: viewport.zoom,
        }}
      >
        {children}
      </motion.div>

      <WorkflowCanvasContext.Provider
        value={{
          viewport,
          zoomIn: handleZoomIn,
          zoomOut: handleZoomOut,
          resetView: handleResetView,
        }}
      >
        {null}
      </WorkflowCanvasContext.Provider>
    </div>
  );
};

import { createContext, useContext } from 'react';

interface WorkflowCanvasContextValue {
  viewport: CanvasViewport;
  zoomIn: () => void;
  zoomOut: () => void;
  resetView: () => void;
}

const WorkflowCanvasContext = createContext<WorkflowCanvasContextValue | null>(null);

export const useWorkflowCanvas = () => {
  const context = useContext(WorkflowCanvasContext);
  if (!context) {
    throw new Error('useWorkflowCanvas must be used within WorkflowCanvas');
  }
  return context;
};

export { MIN_ZOOM, MAX_ZOOM };
