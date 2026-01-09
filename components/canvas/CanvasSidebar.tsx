'use client';

import Link from 'next/link';
import {
  Home,
  LayoutDashboard,
  Database,
  FlaskConical,
  Brain,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/shared/ui/tooltip';

const iconMap = {
  Home,
  LayoutDashboard,
  Database,
  FlaskConical,
  Brain,
  Settings,
  HelpCircle,
};

interface SidebarItem {
  id: string;
  icon: keyof typeof iconMap;
  label: string;
  href: string;
}

interface CanvasSidebarProps {
  navItems: SidebarItem[];
  utilityItems: SidebarItem[];
  activeItemId?: string;
}

export const CanvasSidebar = ({
  navItems,
  utilityItems,
  activeItemId = 'canvas',
}: CanvasSidebarProps) => {
  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 flex h-screen w-14 flex-col',
        'border-r border-gray-200 bg-white',
        'dark:border-gray-700 dark:bg-gray-800'
      )}
    >
      <div className="flex h-14 items-center justify-center border-b border-gray-200 dark:border-gray-700">
        <Link href="/" className="flex items-center justify-center group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-md transition-transform group-hover:scale-105">
            <span className="text-sm font-bold">FL</span>
          </div>
        </Link>
      </div>

      <nav className="flex flex-1 flex-col items-center gap-1 py-4">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive = item.id === activeItemId;

          return (
            <Tooltip key={item.id} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-xl transition-all',
                    isActive
                      ? 'bg-primary-100 text-primary-600 shadow-sm dark:bg-primary-900/50 dark:text-primary-400'
                      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-100'
                  )}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={8}>
                {item.label}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </nav>

      <div className="flex flex-col items-center gap-1 border-t border-gray-200 py-4 dark:border-gray-700">
        {utilityItems.map((item) => {
          const Icon = iconMap[item.icon];

          return (
            <Tooltip key={item.id} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-xl transition-colors',
                    'text-gray-500 hover:bg-gray-100 hover:text-gray-900',
                    'dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-100'
                  )}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={8}>
                {item.label}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </aside>
  );
};
