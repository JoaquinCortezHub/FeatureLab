'use client';

import { Upload, Sparkles, Download, Save, Undo2, Redo2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/shared/ui/button';

interface CanvasTopBarProps {
  title: string;
  hasUnsavedChanges?: boolean;
  onImportData?: () => void;
  onGenerateInsights?: () => void;
  onExport?: () => void;
  onSave?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
}

export const CanvasTopBar = ({
  title,
  hasUnsavedChanges = false,
  onImportData,
  onGenerateInsights,
  onExport,
  onSave,
  onUndo,
  onRedo,
  canUndo = false,
  canRedo = false,
}: CanvasTopBarProps) => {
  return (
    <header
      className={cn(
        'fixed left-14 right-0 top-0 z-30 flex h-14 items-center justify-between px-4',
        'border-b border-white/10 bg-[#1E1E1E]/95 backdrop-blur-md'
      )}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold text-white">
            {title}
          </h1>
          {hasUnsavedChanges && (
            <span className="h-2 w-2 rounded-full bg-amber-400" title="Unsaved changes" />
          )}
        </div>

        <div className="flex items-center gap-1 border-l border-white/10 pl-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onUndo}
            disabled={!canUndo}
            className="h-8 w-8 text-white/70 hover:bg-white/10 hover:text-white disabled:text-white/20"
            title="Undo"
          >
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onRedo}
            disabled={!canRedo}
            className="h-8 w-8 text-white/70 hover:bg-white/10 hover:text-white disabled:text-white/20"
            title="Redo"
          >
            <Redo2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onImportData}
          className="gap-2 border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20"
        >
          <Upload className="h-4 w-4" />
          Import Data
        </Button>

        <Button
          variant="default"
          size="sm"
          onClick={onGenerateInsights}
          className="gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-sm hover:from-primary-500 hover:to-secondary-500/90"
        >
          <Sparkles className="h-4 w-4" />
          Generate Insights
        </Button>

        <div className="ml-2 flex items-center gap-1 border-l border-white/10 pl-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onExport}
            className="h-8 w-8 text-white/70 hover:bg-white/10 hover:text-white"
            title="Export"
          >
            <Download className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onSave}
            className="h-8 w-8 text-white/70 hover:bg-white/10 hover:text-white"
            title="Save"
          >
            <Save className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};
