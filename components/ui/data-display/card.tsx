/**
 * Card UI Components
 *
 * A collection of card components for displaying content in a contained,
 * visually distinct manner. These components are commonly used for content
 * sections, forms, and information display throughout the application.
 *
 * Features:
 * - Built with proper TypeScript typing
 * - Consistent styling with Tailwind CSS
 * - Accessible with proper ARIA attributes
 * - Flexible composition with header, content, and footer sections
 *
 * @example
 * ```typescript
 * import {
 *   Card,
 *   CardContent,
 *   CardDescription,
 *   CardFooter,
 *   CardHeader,
 *   CardTitle,
 * } from "@/components/ui/card";
 *
 * function UserProfileCard() {
 *   return (
 *     <Card>
 *       <CardHeader>
 *         <CardTitle>Profile Information</CardTitle>
 *         <CardDescription>
 *           Manage your account details
 *         </CardDescription>
 *       </CardHeader>
 *       <CardContent>
 *         <p>Card content goes here...</p>
 *       </CardContent>
 *       <CardFooter>
 *         <Button>Save Changes</Button>
 *       </CardFooter>
 *     </Card>
 *   );
 * }
 * ```
 */

import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Main card container component that provides a contained content area.
 *
 * @component
 * @param {React.HTMLAttributes<HTMLDivElement>} props - Standard HTML div attributes
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the underlying div element
 * @returns {JSX.Element} The rendered card component
 *
 * @example
 * ```typescript
 * <Card className="w-96">
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Card content...</p>
 *   </CardContent>
 * </Card>
 * ```
 */
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-lg border bg-card text-card-foreground shadow-sm',
      className
    )}
    {...props}
  />
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'text-2xl font-semibold leading-tight tracking-tight',
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent
};
