/**
 * Textarea UI Component
 *
 * A customizable textarea component that extends the native HTML textarea element
 * with consistent styling and additional props for form handling. Built with
 * TypeScript support and proper accessibility features.
 *
 * Features:
 * - Extends native HTML textarea attributes
 * - Consistent styling with Tailwind CSS
 * - TypeScript support with proper prop types
 * - Forwarded ref support for DOM manipulation
 * - Dark mode support
 * - Focus management with ring styles
 * - Disabled state styling
 *
 * @example
 * ```typescript
 * import { Textarea } from "@/components/ui/textarea";
 *
 * function ContactForm() {
 *   return (
 *     <form>
 *       <Textarea
 *         name="message"
 *         placeholder="Enter your message..."
 *         rows={5}
 *         required
 *         className="resize-none"
 *       />
 *       <Textarea
 *         name="notes"
 *         placeholder="Additional notes (optional)"
 *         rows={3}
 *         maxLength={500}
 *       />
 *     </form>
 *   );
 * }
 * ```
 */

import * as React from 'react';

import { cn } from '@/utils/cn';

/**
 * Props interface for the Textarea component.
 *
 * @interface TextareaProps
 * @extends React.TextareaHTMLAttributes<HTMLTextAreaElement>
 *
 * @property {string} [name] - Name attribute for form handling
 * @property {string} [placeholder] - Placeholder text
 * @property {number} [rows] - Number of visible text lines
 * @property {number} [cols] - Number of visible character widths
 * @property {number} [maxLength] - Maximum number of characters allowed
 * @property {boolean} [required] - Whether the field is required
 * @property {boolean} [disabled] - Whether the textarea is disabled
 * @property {boolean} [readOnly] - Whether the textarea is read-only
 */
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

/**
 * Textarea component that provides a styled form textarea element.
 *
 * @component
 * @param {TextareaProps} props - The component props
 * @param {React.Ref<HTMLTextAreaElement>} ref - Forwarded ref to the textarea element
 * @returns {JSX.Element} The rendered textarea component
 *
 * @example
 * ```typescript
 * const textareaRef = useRef<HTMLTextAreaElement>(null);
 *
 * <Textarea
 *   ref={textareaRef}
 *   name="description"
 *   placeholder="Enter a detailed description..."
 *   rows={6}
 *   maxLength={1000}
 *   required
 *   className="border-red-500 focus-visible:ring-red-500"
 * />
 * ```
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
