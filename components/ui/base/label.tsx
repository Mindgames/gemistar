/**
 * Label UI Component
 *
 * An accessible label component built on top of Radix UI's Label primitive.
 * Provides proper labeling for form controls with consistent styling and
 * TypeScript support.
 *
 * Features:
 * - Built on Radix UI for accessibility
 * - Customizable styling with class-variance-authority
 * - TypeScript support with proper typing
 * - Peer disabled state styling
 * - Proper form association with htmlFor attribute
 *
 * @example
 * ```typescript
 * import { Label } from "@/components/ui/label";
 * import { Input } from "@/components/ui/input";
 * import { Checkbox } from "@/components/ui/checkbox";
 *
 * function ContactForm() {
 *   return (
 *     <form>
 *       <div className="space-y-2">
 *         <Label htmlFor="email">Email Address</Label>
 *         <Input id="email" type="email" placeholder="Enter your email" />
 *       </div>
 *
 *       <div className="space-y-2">
 *         <Label htmlFor="message">Message</Label>
 *         <textarea
 *           id="message"
 *           className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
 *           placeholder="Enter your message"
 *         />
 *       </div>
 *
 *       <div className="flex items-center space-x-2">
 *         <Checkbox id="subscribe" />
 *         <Label htmlFor="subscribe">Subscribe to newsletter</Label>
 *       </div>
 *     </form>
 *   );
 * }
 * ```
 */

'use client';

import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

/**
 * Label variant styles using class-variance-authority.
 *
 * Provides consistent styling for labels with support for disabled peer states.
 */
const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
);

/**
 * Label component that provides accessible labeling for form controls.
 *
 * @component
 * @param {React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>} props - The component props
 * @param {React.Ref<React.ElementRef<typeof LabelPrimitive.Root>>} ref - Forwarded ref to the label element
 * @returns {JSX.Element} The rendered label component
 *
 * @example
 * ```typescript
 * const labelRef = useRef<HTMLLabelElement>(null);
 *
 * <Label
 *   ref={labelRef}
 *   htmlFor="username"
 *   className="text-red-500"
 * >
 *   Username (required)
 * </Label>
 * ```
 */
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
