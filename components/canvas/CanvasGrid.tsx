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
          'bg-[radial-gradient(circle,_rgb(229_231_235)_1px,_transparent_1px)]',
          'dark:bg-[radial-gradient(circle,_rgb(55_65_81)_1px,_transparent_1px)]',
          'bg-[length:16px_16px]',
          className
        )}
      />
    </>
  );
};
