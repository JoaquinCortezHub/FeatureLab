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
        'border-r border-white/10 bg-[#1E1E1E]'
      )}
    >
      <div className="flex h-14 items-center justify-center border-b border-white/10">
        <Link href="/" className="flex items-center justify-center group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white shadow-sm transition-transform group-hover:scale-105">
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
                  ? 'bg-white/10 text-white shadow-sm border border-white/15'
                  : 'text-white/50 hover:bg-white/5 hover:text-white'
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

      <div className="flex flex-col items-center gap-1 border-t border-white/10 py-4">
        {utilityItems.map((item) => {
          const Icon = iconMap[item.icon];

          return (
            <Tooltip key={item.id} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-xl transition-colors',
                  'text-white/50 hover:bg-white/5 hover:text-white'
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
