'use client';

import { motion } from 'framer-motion';
import { Upload, Sparkles, Database, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/shared/ui/button';

interface EmptyCanvasStateProps {
  onImportData: () => void;
  onLoadSample: () => void;
}

export const EmptyCanvasState = ({
  onImportData,
  onLoadSample,
}: EmptyCanvasStateProps) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg text-center"
      >
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
          <Sparkles className="h-10 w-10 text-primary-400" />
        </div>

        <h2 className="mb-3 text-2xl font-bold text-white">
          Discover patterns in your data
        </h2>

        <p className="mb-8 text-white/60">
          Upload your dataset and let AI help you find meaningful relationships,
          correlations, and insights for your ML models.
        </p>

        <div className="flex flex-col items-center gap-4">
          <Button
            size="lg"
            onClick={onImportData}
            className="gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600"
          >
            <Upload className="h-5 w-5" />
            Import Your Data
          </Button>

          <div className="flex items-center gap-2 text-sm text-white/50">
            <span>or</span>
            <button
              onClick={onLoadSample}
              className="flex items-center gap-1 font-medium text-primary-400 hover:text-primary-300"
            >
              Explore sample dataset
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-4">
          {[
            {
              icon: Database,
              title: 'Upload CSV',
              description: 'Import your dataset',
            },
            {
              icon: Sparkles,
              title: 'AI Analysis',
              description: 'Get instant insights',
            },
            {
              icon: ArrowRight,
              title: 'Build Models',
              description: 'Discover features',
            },
          ].map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className={cn(
                'rounded-xl border p-4 text-left',
                'border-white/10 bg-white/5'
              )}
            >
              <step.icon className="mb-2 h-6 w-6 text-white/60" />
              <h3 className="font-medium text-white">
                {step.title}
              </h3>
              <p className="text-sm text-white/50">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
