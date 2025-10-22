/**
 * @fileoverview Badge component for displaying status, labels, and counters.
 * @author Your Name
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

/**
 * Variant definitions for the Badge component using class-variance-authority.
 *
 * This object defines the CSS classes for different badge types and states.
 * It handles styling for default, secondary, destructive, and outline variants
 * with proper light and dark mode support.
 *
 * @internal
 */
const badgeVariants = cva(
  'inline-flex items-center rounded-full border border-slate-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:border-slate-800 dark:focus:ring-slate-300',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-slate-900 text-slate-50 hover:bg-slate-900/80 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/80',
        secondary:
          'border-transparent bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80',
        destructive:
          'border-transparent bg-red-500 text-slate-50 hover:bg-red-500/80 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/80',
        outline: 'border-border text-foreground dark:border-border dark:text-foreground'
     }
   },
    defaultVariants: {
      variant: 'default'
    }
  }
);

/**
 * Props interface for the Badge component.
 *
 * This interface extends the standard HTML div attributes and includes
 * variant props from the badgeVariants configuration. It provides
 * TypeScript support for all badge styling options.
 *
 * @interface BadgeProps
 * @extends React.HTMLAttributes<HTMLDivElement>
 * @extends VariantProps<typeof badgeVariants>
 *
 * @example
 * ```typescript
 * // Basic usage
 * <Badge>New</Badge>
 *
 * // With variant
 * <Badge variant="destructive">Error</Badge>
 *
 * // With custom styling
 * <Badge className="text-xs" variant="secondary">Beta</Badge>
 * ```
 */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * Badge component for displaying status, labels, and counters.
 *
 * This component provides a small, styled container for displaying
 * status indicators, labels, counters, or other small pieces of information.
 * It supports multiple variants and includes proper accessibility features.
 *
 * @component
 * @param {BadgeProps} props - Badge component props including variant and HTML attributes
 * @returns {JSX.Element} The rendered badge component
 *
 * @example
 * ```typescript
 * // Default badge
 * <Badge>New</Badge>
 *
 * // Secondary badge
 * <Badge variant="secondary">In Progress</Badge>
 *
 * // Destructive badge
 * <Badge variant="destructive">Error</Badge>
 *
 * // Outline badge
 * <Badge variant="outline">Optional</Badge>
 *
 * // With click handler
 * <Badge onClick={() => console.log('clicked')}>Clickable</Badge>
 * ```
 */
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

/**
 * Exports the Badge component and its variant configuration.
 *
 * This module provides a flexible badge system with multiple variants
 * for different use cases. The badgeVariants export allows for custom
 * styling while maintaining consistency with the design system.
 *
 * @example
 * ```typescript
 * import { Badge, badgeVariants } from '@/components/ui/badge';
 *
 * function StatusIndicator() {
 *   return (
 *     <div className="flex gap-2">
 *       <Badge variant="default">Active</Badge>
 *       <Badge variant="secondary">Pending</Badge>
 *       <Badge variant="destructive">Error</Badge>
 *     </div>
 *   );
 * }
 *
 * // Using badgeVariants for custom components
 * const customBadgeVariants = badgeVariants;
 * ```
 */
export { Badge, badgeVariants };
