/**
 * @fileoverview Text and typography components for consistent content styling.
 * @author Your Name
 */

import { clsx } from 'clsx';

/**
 * Props interface for heading components (Heading and Subheading).
 *
 * This interface extends the appropriate HTML element props and adds
 * options for customizing the element type and dark mode styling.
 *
 * @interface HeadingProps
 * @property {'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'} [as='h2'] - The HTML element to render as
 * @property {boolean} [dark=false] - Whether to use dark mode styling
 * @extends React.ComponentPropsWithoutRef<'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>
 *
 * @example
 * ```typescript
 * // H1 with dark mode styling
 * <Heading as="h1" dark={true}>Main Title</Heading>
 *
 * // Custom div element as heading
 * <Heading as="div" className="text-blue-600">Custom Heading</Heading>
 * ```
 */
type HeadingProps = {
  as?: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  dark?: boolean;
} & React.ComponentPropsWithoutRef<
  'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
>;

/**
 * Main heading component with responsive typography and dark mode support.
 *
 * This component provides a flexible heading solution with automatic responsive
 * sizing and dark mode styling. It defaults to H2 but can render as any heading
 * level or div element.
 *
 * @component
 * @param {HeadingProps} props - Heading component props
 * @returns {JSX.Element} The rendered heading element
 *
 * @example
 * ```typescript
 * // Default H2 heading
 * <Heading>Main Section Title</Heading>
 *
 * // H1 with custom styling
 * <Heading as="h1" className="text-center text-blue-600">
 *   Page Title
 * </Heading>
 *
 * // Dark mode heading
 * <Heading dark={true}>Dark Theme Title</Heading>
 *
 * // Custom element
 * <Heading as="div" className="text-3xl">Custom Styled Heading</Heading>
 * ```
 */
export function Heading({
  className,
  as: Element = 'h2',
  dark = false,
  ...props
}: HeadingProps) {
  return (
    <Element
      {...props}
      data-dark={dark ? 'true' : undefined}
      className={clsx(
        className,
        'text-pretty text-4xl font-medium tracking-tighter text-gray-950 data-[dark]:text-white sm:text-6xl'
      )}
    />
  );
}

/**
 * Subheading component for secondary headings with monospace styling.
 *
 * This component provides a distinctive subheading style with monospace font,
 * uppercase text, and letter spacing. It's ideal for section labels, badges,
 * or secondary navigation elements.
 *
 * @component
 * @param {HeadingProps} props - Subheading component props
 * @returns {JSX.Element} The rendered subheading element
 *
 * @example
 * ```typescript
 * // Default H2 subheading
 * <Subheading>Technical Details</Subheading>
 *
 * // H3 with custom styling
 * <Subheading as="h3" className="text-blue-600">
 *   Configuration
 * </Subheading>
 *
 * // Dark mode subheading
 * <Subheading dark={true}>System Status</Subheading>
 * ```
 */
export function Subheading({
  className,
  as: Element = 'h2',
  dark = false,
  ...props
}: HeadingProps) {
  return (
    <Element
      {...props}
      data-dark={dark ? 'true' : undefined}
      className={clsx(
        className,
        'font-mono text-xs/5 font-semibold uppercase tracking-widest text-gray-500 data-[dark]:text-gray-400'
      )}
    />
  );
}

/**
 * Lead paragraph component for introductory content.
 *
 * This component provides styling for lead paragraphs that introduce
 * sections or pages. It uses larger text size to create visual hierarchy
 * and draw attention to important introductory content.
 *
 * @component
 * @param {React.ComponentPropsWithoutRef<'p'>} props - HTML paragraph attributes
 * @returns {JSX.Element} The rendered lead paragraph
 *
 * @example
 * ```typescript
 * <Lead className="text-center">
 *   This introduction sets the context for the entire section and
 *   explains what users can expect to learn.
 * </Lead>
 * ```
 */
export function Lead({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'p'>) {
  return (
    <p
      className={clsx(className, 'text-2xl font-medium text-gray-500')}
      {...props}
    />
  );
}

/**
 * Exports all typography components for use throughout the application.
 *
 * This module provides a consistent set of typography components with
 * responsive design and dark mode support. The components work together
 * to create a cohesive visual hierarchy across the application.
 *
 * @example
 * ```typescript
 * import { Heading, Subheading, Lead } from '@/components/ui/text';
 *
 * function ContentSection() {
 *   return (
 *     <div>
 *       <Heading as="h1">Main Title</Heading>
 *       <Subheading>Technical Details</Subheading>
 *       <Lead>
 *         This introduction provides context for the section content.
 *       </Lead>
 *     </div>
 *   );
 * }
 * ```
 */
