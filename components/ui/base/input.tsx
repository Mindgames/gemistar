/**
 * Input UI Component
 *
 * A customizable input component that extends the native HTML input element
 * with consistent styling and additional props for form handling. Built with
 * TypeScript support and proper accessibility features.
 *
 * Features:
 * - Extends native HTML input attributes
 * - Consistent styling with Tailwind CSS
 * - TypeScript support with proper prop types
 * - Forwarded ref support for DOM manipulation
 * - Customizable with additional props like placeholder and maxLength
 *
 * @example
 * ```typescript
 * import { Input } from "@/components/ui/input";
 *
 * function ContactForm() {
 *   return (
 *     <form>
 *       <Input
 *         type="email"
 *         name="email"
 *         placeholder="Enter your email"
 *         required
 *       />
 *       <Input
 *         type="password"
 *         name="password"
 *         placeholder="Enter your password"
 *         maxLength={50}
 *       />
 *     </form>
 *   );
 * }
 * ```
 */

import * as React from 'react';

import { cn } from '@/utils/cn';

/**
 * Props interface for the Input component.
 *
 * @interface InputProps
 * @extends React.InputHTMLAttributes<HTMLInputElement>
 *
 * @property {string} [name] - Name attribute for form handling
 * @property {string} [defaultValue] - Default value for the input
 * @property {string} [placeholder] - Placeholder text
 * @property {number} [maxLength] - Maximum number of characters allowed
 */
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  defaultValue?: string;
  placeholder?: string;
  maxLength?: number;
}

/**
 * Input component that provides a styled form input element.
 *
 * @component
 * @param {InputProps} props - The component props
 * @param {React.Ref<HTMLInputElement>} ref - Forwarded ref to the input element
 * @returns {JSX.Element} The rendered input component
 *
 * @example
 * ```typescript
 * const emailInputRef = useRef<HTMLInputElement>(null);
 *
 * <Input
 *   ref={emailInputRef}
 *   type="email"
 *   name="email"
 *   placeholder="Enter your email"
 *   required
 *   className="border-red-500"
 * />
 * ```
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      name,
      defaultValue,
      placeholder,
      maxLength,
      ...props
    },
    ref
  ) => {
    return (
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        maxLength={maxLength}
        className={cn(
          'flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
