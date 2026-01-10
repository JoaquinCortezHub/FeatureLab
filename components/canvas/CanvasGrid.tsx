'use client';

import { cn } from '@/lib/utils';

interface CanvasGridProps {
  className?: string;
}

export const CanvasGrid = ({ className }: CanvasGridProps) => {
  return (
    <>
      <div
        className={cn(
          'pointer-events-none absolute inset-0',
          'bg-[radial-gradient(circle,_rgba(255,255,255,0.25)_1px,_transparent_1px)]',
          'bg-[length:24px_24px]',
          className
        )}
      />
    </>
  );
};
