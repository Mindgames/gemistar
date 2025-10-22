/**
 * @fileoverview Accordion component built on top of Radix UI primitives.
 * @author Your Name
 */

'use client';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import * as React from 'react';

import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';

/**
 * Root Accordion component that wraps multiple AccordionItem components.
 *
 * This component provides the main container for accordion functionality,
 * managing the state of which items are open or closed. It supports single
 * or multiple item expansion modes.
 *
 * @component
 * @param {React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>} props - All props from Radix UI Accordion root
 * @returns {JSX.Element} The rendered accordion container
 *
 * @example
 * ```typescript
 * <Accordion type="single" collapsible>
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>Is it accessible?</AccordionTrigger>
 *     <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 *
 * @see {@link https://www.radix-ui.com/primitives/docs/components/accordion} - Radix UI Accordion documentation
 */
const Accordion = AccordionPrimitive.Root;

/**
 * Individual accordion item component.
 *
 * This component represents a single collapsible item within an accordion.
 * It must be used as a child of the Accordion component and can contain
 * an AccordionTrigger and AccordionContent.
 *
 * @component
 * @param {React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>} props - All props from Radix UI Accordion item
 * @param {React.Ref<React.ElementRef<typeof AccordionPrimitive.Item>>} ref - Forwarded ref
 * @returns {JSX.Element} The rendered accordion item
 *
 * @example
 * ```typescript
 * <AccordionItem value="item-1">
 *   <AccordionTrigger>Click me</AccordionTrigger>
 *   <AccordionContent>Hidden content</AccordionContent>
 * </AccordionItem>
 * ```
 */
const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('border-b', className)}
    {...props}
  />
));
AccordionItem.displayName = 'AccordionItem';

/**
 * Accordion trigger component that controls the expand/collapse state.
 *
 * This component serves as the clickable header for an accordion item.
 * When clicked, it toggles the visibility of the associated AccordionContent.
 * It includes a chevron icon that rotates to indicate the current state.
 *
 * @component
 * @param {React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>} props - All props from Radix UI Accordion trigger
 * @param {React.ReactNode} children - The content to display in the trigger
 * @param {React.Ref<React.ElementRef<typeof AccordionPrimitive.Trigger>>} ref - Forwarded ref
 * @returns {JSX.Element} The rendered accordion trigger
 *
 * @example
 * ```typescript
 * <AccordionTrigger className="text-lg font-semibold">
 *   How does it work?
 * </AccordionTrigger>
 * ```
 */
const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center justify-between py-4 font-medium transition-all cursor-pointer [&[data-state=open]>svg]:rotate-180',
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

/**
 * Accordion content component that contains the collapsible content.
 *
 * This component displays the content that is revealed when the associated
 * AccordionTrigger is clicked. It includes smooth animations for expanding
 * and collapsing with CSS transitions.
 *
 * @component
 * @param {React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>} props - All props from Radix UI Accordion content
 * @param {React.ReactNode} children - The content to display when expanded
 * @param {React.Ref<React.ElementRef<typeof AccordionPrimitive.Content>>} ref - Forwarded ref
 * @returns {JSX.Element} The rendered accordion content
 *
 * @example
 * ```typescript
 * <AccordionContent className="text-gray-600">
 *   <p>This content appears when the trigger is clicked.</p>
 *   <p>It can contain multiple paragraphs or any React components.</p>
 * </AccordionContent>
 * ```
 */
const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn('pb-4 pt-0', className)}>{children}</div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

/**
 * Exports all accordion components for use throughout the application.
 *
 * This module provides a complete accordion implementation built on top of
 * Radix UI primitives with consistent styling and TypeScript support.
 *
 * @example
 * ```typescript
 * import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
 *
 * function FAQSection() {
 *   return (
 *     <Accordion type="single" collapsible>
 *       <AccordionItem value="item-1">
 *         <AccordionTrigger>How do I get started?</AccordionTrigger>
 *         <AccordionContent>
 *           Follow our getting started guide to set up your account.
 *         </AccordionContent>
 *       </AccordionItem>
 *     </Accordion>
 *   );
 * }
 * ```
 */
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
