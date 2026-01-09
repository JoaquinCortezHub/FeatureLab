'use client';

import { ReactNode } from 'react';
import { TooltipProvider } from '@/components/shared/ui/tooltip';
import { CanvasSidebar } from '@/components/canvas/CanvasSidebar';
import { CanvasTopBar } from '@/components/canvas/CanvasTopBar';
import {
  sidebarNavItems,
  sidebarUtilityItems,
} from '@/components/canvas/data/canvas-sample-data';

interface CanvasLayoutProps {
  children: ReactNode;
  title?: string;
  hasUnsavedChanges?: boolean;
  onImportData?: () => void;
  onGenerateInsights?: () => void;
  onExport?: () => void;
  onSave?: () => void;
}

export const CanvasLayout = ({
  children,
  title = 'Feature Explorer',
  hasUnsavedChanges = false,
  onImportData,
  onGenerateInsights,
  onExport,
  onSave,
}: CanvasLayoutProps) => {
  return (
    <TooltipProvider>
      <div className="h-screen w-full overflow-hidden bg-gray-50 dark:bg-gray-900">
        <CanvasSidebar
          navItems={sidebarNavItems}
          utilityItems={sidebarUtilityItems}
        />

        <CanvasTopBar
          title={title}
          hasUnsavedChanges={hasUnsavedChanges}
          onImportData={onImportData}
          onGenerateInsights={onGenerateInsights}
          onExport={onExport}
          onSave={onSave}
        />

        <main className="ml-14 mt-14 h-[calc(100vh-3.5rem)] overflow-hidden">
          {children}
        </main>
      </div>
    </TooltipProvider>
  );
};
