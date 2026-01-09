'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';

interface WaitlistFormProps {
  variant?: 'default' | 'compact';
  className?: string;
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const WaitlistForm = ({
  variant = 'default',
  className,
}: WaitlistFormProps) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'duplicate'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateEmail(email)) {
        setStatus('error');
        setErrorMessage('Please enter a valid email');
        return;
      }

      setStatus('loading');

      try {
        const { error } = await supabase.from('waitlist_emails').insert({
          email: email.toLowerCase(),
        });

        if (error) {
          if (error.code === '23505') {
            setStatus('duplicate');
            setErrorMessage("You're already on the list");
          } else {
            setStatus('error');
            setErrorMessage('Something went wrong. Please try again.');
          }
          return;
        }

        setStatus('success');
        setEmail('');
      } catch (insertError) {
        console.error(insertError);
        setStatus('error');
        setErrorMessage('Something went wrong. Please try again.');
      }
    },
    [email]
  );

  const isCompact = variant === 'compact';

  return (
    <div className={cn('w-full', className)}>
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 py-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.1 }}
              className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-500/20"
            >
              <Check className="h-3 w-3 text-primary-400" />
            </motion.div>
            <span className="text-sm text-white/60">
              You&apos;re on the list. We&apos;ll be in touch.
            </span>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="w-full"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error' || status === 'duplicate') {
                      setStatus('idle');
                    }
                  }}
                  placeholder="you@company.com"
                  disabled={status === 'loading'}
                  className={cn(
                    'w-full bg-white/[0.03] border rounded-lg',
                    'text-white/90 placeholder:text-white/20',
                    'focus:outline-none focus:bg-white/[0.05]',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    'transition-all duration-200',
                    isCompact ? 'px-4 py-3 text-sm' : 'px-5 py-4 text-base',
                    status === 'error' || status === 'duplicate'
                      ? 'border-red-500/30'
                      : 'border-white/10 focus:border-white/20'
                  )}
                />
                {(status === 'error' || status === 'duplicate') && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute -bottom-6 left-0 text-xs text-red-400/80"
                  >
                    {errorMessage}
                  </motion.p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={status === 'loading' || !email}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={cn(
                  'flex items-center justify-center gap-2 rounded-lg font-medium',
                  'bg-gradient-to-r from-primary-500 to-secondary-500 text-white',
                  'hover:from-primary-600 hover:to-secondary-600',
                  'disabled:opacity-40 disabled:cursor-not-allowed',
                  'transition-all duration-200 shadow-lg shadow-primary-500/20',
                  isCompact ? 'px-5 py-3 text-sm' : 'px-6 py-4 text-base'
                )}
              >
                {status === 'loading' ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <span>Join waitlist</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {status !== 'success' && !isCompact && (
        <p className="mt-4 text-xs text-white/20">
          500+ data scientists on the waitlist
        </p>
      )}
    </div>
  );
};
