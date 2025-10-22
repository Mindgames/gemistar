/**
 * Button UI Component
 *
 * A flexible and accessible button component built with class-variance-authority
 * for styling variants and Radix UI Slot for composition. Supports multiple
 * variants, sizes, loading states, and icon integration.
 *
 * Features:
 * - Multiple pre-defined variants (default, dark, light, destructive, outline, secondary, ghost, link)
 * - Multiple sizes (default, sm, lg, icon)
 * - Loading state with spinner
 * - Icon support with proper sizing
 * - TypeScript support with proper prop types
 * - Accessible with focus management and ARIA attributes
 * - Can be used as a button or polymorphic component via Slot
 *
 * @example
 * ```typescript
 * import { Button } from "@/components/ui/button";
 * import { Loader2 } from "lucide-react";
 *
 * function ActionButtons() {
 *   return (
 *     <div className="flex gap-2">
 *       <Button>Default Button</Button>
 *       <Button variant="destructive">Delete</Button>
 *       <Button variant="outline">Outline</Button>
 *       <Button variant="ghost">Ghost</Button>
 *       <Button size="sm">Small</Button>
 *       <Button size="lg">Large</Button>
 *       <Button size="icon">
 *         <Plus className="h-4 w-4" />
 *       </Button>
 *       <Button disabled>
 *         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
 *         Loading...
 *       </Button>
 *     </div>
 *   );
 * }
 * ```
 */

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Button variant styles using class-variance-authority.
 *
 * Provides consistent styling for different button types with support for
 * light and dark modes, hover states, focus management, and disabled states.
 */
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground border border-border/60 shadow-[0_8px_18px_rgba(12,12,12,0.16)] transition-shadow hover:bg-primary/85 hover:shadow-[0_12px_26px_rgba(12,12,12,0.22)] dark:border-border/40 dark:shadow-[0_6px_18px_rgba(0,0,0,0.28)] dark:hover:shadow-[0_8px_22px_rgba(0,0,0,0.36)]',
        dark: 'bg-black text-primary-foreground hover:bg-primary/90',
        light: 'bg-white text-[#0c0c0c] hover:bg-white/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

/**
 * Props interface for the Button component.
 *
 * @interface ButtonProps
 * @extends React.ButtonHTMLAttributes<HTMLButtonElement>
 * @extends VariantProps<typeof buttonVariants>
 *
 * @property {boolean} [asChild] - When true, renders as a Slot component for composition
 * @property {boolean} [loading] - Shows loading spinner and disables button when true
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

/**
 * Button component that provides a styled and accessible button element.
 *
 * @component
 * @param {ButtonProps} props - The component props
 * @param {React.Ref<HTMLButtonElement>} ref - Forwarded ref to the button element
 * @returns {JSX.Element} The rendered button component
 *
 * @example
 * ```typescript
 * const buttonRef = useRef<HTMLButtonElement>(null);
 *
 * <Button
 *   ref={buttonRef}
 *   variant="destructive"
 *   size="lg"
 *   onClick={handleDelete}
 *   disabled={isLoading}
 * >
 *   Delete Item
 * </Button>
 *
 * // As a link button
 * <Button variant="link" asChild>
 *   <Link href="/about">Learn More</Link>
 * </Button>
 * ```
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {children}
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
