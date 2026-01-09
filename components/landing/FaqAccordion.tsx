'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqItemProps {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

const FaqItemComponent = ({ item, isOpen, onToggle, index }: FaqItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="border-b border-white/5"
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-6 text-left group"
      >
        <span className="pr-8 text-white/80 group-hover:text-primary-400 transition-colors">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <Plus className={cn(
            "h-4 w-4 transition-colors",
            isOpen ? "text-primary-400" : "text-white/30 group-hover:text-primary-400/60"
          )} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-sm text-white/40 leading-relaxed max-w-2xl">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

interface FaqAccordionProps {
  items: FaqItem[];
  className?: string;
}

export const FaqAccordion = ({ items, className }: FaqAccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={cn('w-full', className)}>
      {items.map((item, index) => (
        <FaqItemComponent
          key={index}
          item={item}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
          index={index}
        />
      ))}
    </div>
  );
};

export const faqData: FaqItem[] = [
  {
    question: 'What is FeatureLab?',
    answer:
      'FeatureLab is a visual feature engineering tool for data scientists and ML engineers. It helps you explore datasets, discover correlations, and engineer features using an intuitive canvas interface—no coding required for the exploration phase.',
  },
  {
    question: 'How does AI insight generation work?',
    answer:
      'Our AI analyzes your dataset to detect correlations, identify potential predictors, spot anomalies, and suggest transformations. All insights come with confidence scores so you can prioritize what matters.',
  },
  {
    question: 'What file formats are supported?',
    answer:
      'Currently CSV files up to 10MB. We parse your data instantly and create an interactive preview. Excel, JSON, and database connections are on our roadmap.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Yes. Data is processed locally in your browser during exploration. When using AI features, data is transmitted securely and never stored after processing.',
  },
  {
    question: 'How much will it cost?',
    answer:
      "We're in private beta offering free early access to waitlist members. Pricing will be announced before general release, with significant discounts for early adopters.",
  },
  {
    question: 'When will it be available?',
    answer:
      "Public beta is targeted for Q2 2026. Join the waitlist for early access and to help shape the product with your feedback.",
  },
];
