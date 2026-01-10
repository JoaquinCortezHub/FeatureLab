'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Upload,
  Columns,
  ScatterChart,
  BarChart3,
  Grid3x3,
  BoxSelect,
  Sparkles,
  Link,
  Lightbulb,
  Scaling,
  Binary,
  Layers,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/shared/ui/input';
import { FloatingPanelItem } from '@/components/canvas/models/canvas-types';

interface FloatingPanelProps {
  items: FloatingPanelItem[];
  position: { x: number; y: number };
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (item: FloatingPanelItem) => void;
  className?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Upload,
  Columns,
  ScatterChart,
  BarChart3,
  Grid3x3,
  BoxSelect,
  Sparkles,
  Link,
  Lightbulb,
  Scaling,
  Binary,
  Layers,
};

const categoryColors: Record<string, string> = {
  Data: 'text-primary-300',
  Visualize: 'text-secondary-300',
  'AI Analysis': 'text-purple-300',
  Transform: 'text-amber-300',
};

export const FloatingPanel = ({
  items,
  position,
  isOpen,
  onClose,
  onSelectItem,
  className,
}: FloatingPanelProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = items.filter(
    (item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedItems = filteredItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, FloatingPanelItem[]>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.15 }}
          className={cn(
            'fixed z-50 w-72 overflow-hidden rounded-xl border shadow-2xl',
            'bg-[#1E1E1E] border-white/10',
            className
          )}
          style={{
            left: Math.min(position.x, window.innerWidth - 320),
            top: Math.min(position.y, window.innerHeight - 400),
          }}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <span className="font-semibold text-white">
              Add to Canvas
            </span>
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-white/50 hover:bg-white/5 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="p-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 pl-9 text-sm bg-white/5 border-white/10 text-white placeholder:text-white/30"
              />
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto px-3 pb-3">
            {Object.entries(groupedItems).map(([category, categoryItems]) => (
              <div key={category} className="mb-3">
                <div className={cn(
                  'mb-2 px-1 text-xs font-semibold uppercase tracking-wider',
                  categoryColors[category] || 'text-white/50'
                )}>
                  {category}
                </div>
                <div className="space-y-1">
                  {categoryItems.map((item) => {
                    const Icon = iconMap[item.icon] || Sparkles;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          onSelectItem(item);
                          onClose();
                        }}
                        className={cn(
                          'group flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-all',
                          'hover:bg-white/5',
                          'focus:outline-none focus:ring-2 focus:ring-primary-500/20'
                        )}
                      >
                        <div className={cn(
                          'mt-0.5 rounded-lg p-1.5 transition-colors',
                          'bg-white/5 group-hover:bg-white/10'
                        )}>
                          <Icon className="h-4 w-4 text-white/80" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-white text-sm">
                            {item.label}
                          </div>
                          {item.description && (
                            <div className="text-xs text-white/50 line-clamp-1">
                              {item.description}
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {filteredItems.length === 0 && (
              <div className="py-8 text-center">
                <p className="text-sm text-white/50">
                  No items found
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
