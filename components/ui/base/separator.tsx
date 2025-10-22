/**
 * Separator UI Component
 *
 * A visual separator component built on top of Radix UI's Separator primitive.
 * Used to create visual divisions between content sections, with support for
 * both horizontal and vertical orientations.
 *
 * Features:
 * - Built on Radix UI for accessibility
 * - Horizontal and vertical orientations
 * - Decorative and semantic separator options
 * - Customizable styling with Tailwind CSS
 * - TypeScript support with proper typing
 *
 * @example
 * ```typescript
 * import { Separator } from "@/components/ui/separator";
 *
 * function SettingsPanel() {
 *   return (
 *     <div className="space-y-4">
 *       <div>
 *         <h3 className="text-lg font-medium">Account Settings</h3>
 *         <p className="text-sm text-muted-foreground">
 *           Manage your account preferences
 *         </p>
 *       </div>
 *
 *       <Separator />
 *
 *       <div>
 *         <h3 className="text-lg font-medium">Privacy Settings</h3>
 *         <p className="text-sm text-muted-foreground">
 *           Control your privacy options
 *         </p>
 *       </div>
 *
 *       <Separator orientation="vertical" className="mx-4" />
 *
 *       <div className="flex space-x-4">
 *         <div className="flex-1">
 *           <h4>Left Section</h4>
 *         </div>
 *         <Separator orientation="vertical" />
 *         <div className="flex-1">
 *           <h4>Right Section</h4>
 *         </div>
 *       </div>
 *     </div>
 *   );
 * }
 * ```
 */

'use client';

import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';

import { cn } from '@/lib/utils';

/**
 * Separator component that creates visual divisions between content.
 *
 * @component
 * @param {React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>} props - The component props from Radix UI
 * @param {React.Ref<React.ElementRef<typeof SeparatorPrimitive.Root>>} ref - Forwarded ref to the separator element
 * @returns {JSX.Element} The rendered separator component
 *
 * @example
 * ```typescript
 * <Separator orientation="horizontal" className="my-4" />
 * <Separator orientation="vertical" className="mx-2 h-8" />
 * ```
 */
const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = 'horizontal', decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'shrink-0 bg-border',
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
        className
      )}
      {...props}
    />
  )
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
