/**
 * @fileoverview Alert component for displaying important messages and notifications.
 * @author Your Name
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

/**
 * Variant definitions for the Alert component using class-variance-authority.
 *
 * This object defines the CSS classes for different alert types and states.
 * It handles styling for default and destructive variants with proper
 * light and dark mode support.
 *
 * @internal
 */
const alertVariants = cva(
  'relative w-full rounded-lg border border-slate-200 p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-slate-950 dark:border-slate-800 dark:[&>svg]:text-slate-50',
  {
    variants: {
      variant: {
        default: 'bg-white text-slate-950 dark:bg-slate-950 dark:text-slate-50',
        destructive:
          'border-red-500/50 text-red-500 dark:border-red-500 [&>svg]:text-red-500 dark:border-red-900/50 dark:text-red-900 dark:dark:border-red-900 dark:[&>svg]:text-red-900'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

/**
 * Alert component for displaying important messages and notifications.
 *
 * This component provides a styled container for displaying alerts, warnings,
 * errors, and other important information to users. It supports different
 * variants and includes proper ARIA attributes for accessibility.
 *
 * The component automatically handles icon positioning and styling when
 * icons are included as children.
 *
 * @component
 * @param {React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>} props - HTML div attributes and variant props
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the underlying div element
 * @returns {JSX.Element} The rendered alert component
 *
 * @example
 * ```typescript
 * // Default alert
 * <Alert>
 *   <AlertCircle className="h-4 w-4" />
 *   <AlertTitle>Heads up!</AlertTitle>
 *   <AlertDescription>
 *     You can add components to your app using the cli.
 *   </AlertDescription>
 * </Alert>
 *
 * // Destructive alert
 * <Alert variant="destructive">
 *   <AlertCircle className="h-4 w-4" />
 *   <AlertTitle>Error</AlertTitle>
 *   <AlertDescription>
 *     Something went wrong. Please try again.
 *   </AlertDescription>
 * </Alert>
 * ```
 *
 * @see {@link AlertTitle} - Title component for alert headers
 * @see {@link AlertDescription} - Description component for alert content
 */
const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = 'Alert';

/**
 * Alert title component for displaying alert headings.
 *
 * This component provides the title/header for an alert. It should be used
 * as a child of the Alert component to provide a clear, accessible title
 * for the notification.
 *
 * @component
 * @param {React.HTMLAttributes<HTMLHeadingElement>} props - HTML heading attributes
 * @param {React.Ref<HTMLParagraphElement>} ref - Forwarded ref to the heading element
 * @returns {JSX.Element} The rendered alert title
 *
 * @example
 * ```typescript
 * <Alert>
 *   <AlertTitle className="text-lg font-semibold">
 *     Success!
 *   </AlertTitle>
 *   <AlertDescription>
 *     Your changes have been saved successfully.
 *   </AlertDescription>
 * </Alert>
 * ```
 */
const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('mb-1 font-medium leading-none tracking-tight', className)}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

/**
 * Alert description component for displaying alert content.
 *
 * This component provides the main content/description for an alert.
 * It should be used as a child of the Alert component to provide
 * detailed information about the notification or message.
 *
 * @component
 * @param {React.HTMLAttributes<HTMLParagraphElement>} props - HTML paragraph attributes
 * @param {React.Ref<HTMLParagraphElement>} ref - Forwarded ref to the paragraph element
 * @returns {JSX.Element} The rendered alert description
 *
 * @example
 * ```typescript
 * <Alert>
 *   <AlertTitle>Warning</AlertTitle>
 *   <AlertDescription className="text-sm">
 *     This action cannot be undone. This will permanently delete your account
 *     and remove your data from our servers.
 *   </AlertDescription>
 * </Alert>
 * ```
 */
const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';

/**
 * Exports all alert components for use throughout the application.
 *
 * This module provides a complete alert system with consistent styling,
 * accessibility features, and TypeScript support. The components work
 * together to create accessible, well-styled alert messages.
 *
 * @example
 * ```typescript
 * import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
 *
 * function NotificationArea() {
 *   return (
 *     <div className="space-y-4">
 *       <Alert>
 *         <AlertTitle>Success!</AlertTitle>
 *         <AlertDescription>
 *           Your settings have been saved successfully.
 *         </AlertDescription>
 *       </Alert>
 *
 *       <Alert variant="destructive">
 *         <AlertTitle>Error</AlertTitle>
 *         <AlertDescription>
 *           Something went wrong. Please try again.
 *         </AlertDescription>
 *       </Alert>
 *     </div>
 *   );
 * }
 * ```
 */
export { Alert, AlertTitle, AlertDescription };
