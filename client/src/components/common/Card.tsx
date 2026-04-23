import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/services/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, glass, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm transition-all duration-300',
          glass && 'bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl',
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';
