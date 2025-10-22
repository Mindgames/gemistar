/**
 * Tooltip UI Components
 *
 * A collection of accessible tooltip components built on top of Radix UI's
 * Tooltip primitive. Provides contextual information that appears on hover
 * or focus, with proper keyboard navigation and screen reader support.
 *
 * Features:
 * - Built on Radix UI for accessibility
 * - Customizable positioning and styling
 * - TypeScript support with proper typing
 * - Keyboard navigation support
 * - Focus management
 * - Customizable delay and animation
 * - Screen reader friendly
 *
 * @example
 * ```typescript
 * import {
 *   Tooltip,
 *   TooltipContent,
 *   TooltipProvider,
 *   TooltipTrigger,
 * } from "@/components/ui/tooltip";
 *
 * function TooltipExample() {
 *   return (
 *     <TooltipProvider>
 *       <Tooltip>
 *         <TooltipTrigger asChild>
 *           <Button variant="outline">Hover me</Button>
 *         </TooltipTrigger>
 *         <TooltipContent>
 *           <p>This is a helpful tooltip!</p>
 *         </TooltipContent>
 *       </Tooltip>
 *     </TooltipProvider>
 *   );
 * }
 *
 * function ComplexTooltip() {
 *   return (
 *     <TooltipProvider delayDuration={200}>
 *       <Tooltip>
 *         <TooltipTrigger asChild>
 *           <div className="inline-block cursor-help border-b border-dashed border-current">
 *             Dashed text
 *           </div>
 *         </TooltipTrigger>
 *         <TooltipContent side="bottom" className="max-w-xs">
 *           <div className="space-y-1">
 *             <p className="font-semibold">Detailed Information</p>
 *             <p className="text-sm">
 *               This tooltip provides additional context about the dashed text.
 *             </p>
 *           </div>
 *         </TooltipContent>
 *       </Tooltip>
 *     </TooltipProvider>
 *   );
 * }
 * ```
 */

'use client';

import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from '@/lib/utils';

/**
 * Tooltip provider component that manages the tooltip state.
 *
 * Wraps the application or specific sections to provide tooltip context.
 * Can be configured with delay settings and other global options.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/tooltip} - Radix UI Tooltip documentation
 */
const TooltipProvider = TooltipPrimitive.Provider;

/**
 * Root tooltip component that manages the open/closed state.
 *
 * Controls the visibility of the tooltip content based on hover, focus,
 * or other trigger events.
 */
const Tooltip = TooltipPrimitive.Root;

/**
 * Tooltip trigger component that wraps the element that triggers the tooltip.
 *
 * Any interactive element can be wrapped with this component to show
 * a tooltip on hover or focus.
 */
const TooltipTrigger = TooltipPrimitive.Trigger;

/**
 * Tooltip content component that displays the tooltip text or content.
 *
 * Renders the actual tooltip with customizable positioning, styling,
 * and animations. Automatically positioned relative to the trigger.
 *
 * @component
 * @param {React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>} props - The component props from Radix UI
 * @param {React.Ref<React.ElementRef<typeof TooltipPrimitive.Content>>} ref - Forwarded ref to the content element
 * @returns {JSX.Element} The rendered tooltip content
 *
 * @example
 * ```typescript
 * <TooltipContent side="top" align="center" className="bg-black text-white">
 *   <p>Tooltip content goes here</p>
 * </TooltipContent>
 * ```
 */
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
