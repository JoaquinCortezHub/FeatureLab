'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from '@/components/shared/Image';

interface LandingShowcaseCardProps {
  href: string;
  title: string;
  description: string;
  previewImage: string;
  className?: string;
  delay?: number;
}

export const LandingShowcaseCard = ({
  href,
  title,
  description,
  previewImage,
  className,
  delay = 0,
}: LandingShowcaseCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={cn('group', className)}
    >
      <Link
        href={href}
        aria-label={`View ${title} landing page design`}
        className={cn(
          'block relative rounded-xl overflow-hidden',
          'border border-white/10 bg-slate-900/40 backdrop-blur-sm',
          'transition-all duration-300',
          'hover:border-primary-500/40 hover:-translate-y-1',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
          'motion-reduce:transition-none motion-reduce:transform-none'
        )}
      >
        {/* Preview Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-800/50">
          <Image
            src={previewImage}
            alt={`${title} preview`}
            width={800}
            height={500}
            className={cn(
              'object-cover w-full h-full',
              'transition-all duration-500',
              'group-hover:scale-105',
              'motion-reduce:transform-none'
            )}
          />

          {/* Gradient overlay */}
          <div
            className={cn(
              'absolute inset-0',
              'bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent',
              'opacity-60 group-hover:opacity-40',
              'transition-opacity duration-300'
            )}
          />

          {/* View icon */}
          <div
            className={cn(
              'absolute top-4 right-4',
              'flex items-center justify-center',
              'w-8 h-8 rounded-full',
              'bg-white/10 backdrop-blur-sm border border-white/20',
              'opacity-0 group-hover:opacity-100',
              'transition-opacity duration-300'
            )}
          >
            <ArrowUpRight className="h-4 w-4 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3
            className={cn(
              'font-semibold text-white text-lg mb-2',
              'group-hover:text-primary-400',
              'transition-colors duration-300'
            )}
            style={{ textWrap: 'balance' } as React.CSSProperties}
          >
            {title}
          </h3>
          <p className="text-sm text-white/50 leading-relaxed min-w-0">
            {description}
          </p>
        </div>

        {/* Bottom border glow */}
        <div
          className={cn(
            'absolute bottom-0 left-0 right-0 h-px',
            'bg-gradient-to-r from-transparent via-primary-500/50 to-transparent',
            'opacity-0 group-hover:opacity-100',
            'transition-opacity duration-500'
          )}
        />
      </Link>
    </motion.div>
  );
};
