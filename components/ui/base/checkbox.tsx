/**
 * Checkbox UI Component
 *
 * A customizable checkbox component built on top of Radix UI's Checkbox primitive.
 * Provides accessible checkbox functionality with consistent styling and TypeScript
 * support for form handling.
 *
 * Features:
 * - Built on Radix UI for accessibility
 * - Customizable styling with Tailwind CSS
 * - TypeScript support with proper typing
 * - Focus management with ring styles
 * - Disabled state styling
 * - Checked/unchecked state management
 * - Custom check icon from Lucide React
 *
 * @example
 * ```typescript
 * import { Checkbox } from "@/components/ui/checkbox";
 *
 * function SettingsForm() {
 *   const [notifications, setNotifications] = useState(false);
 *   const [marketing, setMarketing] = useState(true);
 *
 *   return (
 *     <form>
 *       <div className="flex items-center space-x-2">
 *         <Checkbox
 *           id="notifications"
 *           checked={notifications}
 *           onCheckedChange={setNotifications}
 *         />
 *         <label htmlFor="notifications">Enable notifications</label>
 *       </div>
 *
 *       <div className="flex items-center space-x-2">
 *         <Checkbox
 *           id="marketing"
 *           checked={marketing}
 *           onCheckedChange={setMarketing}
 *         />
 *         <label htmlFor="marketing">Subscribe to marketing emails</label>
 *       </div>
 *
 *       <div className="flex items-center space-x-2">
 *         <Checkbox id="disabled" disabled />
 *         <label htmlFor="disabled">Disabled option</label>
 *       </div>
 *     </form>
 *   );
 * }
 * ```
 */

'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as React from 'react';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Checkbox component that provides accessible checkbox functionality.
 *
 * @component
 * @param {React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>} props - The component props from Radix UI
 * @param {React.Ref<React.ElementRef<typeof CheckboxPrimitive.Root>>} ref - Forwarded ref to the checkbox element
 * @returns {JSX.Element} The rendered checkbox component
 *
 * @example
 * ```typescript
 * const checkboxRef = useRef<HTMLButtonElement>(null);
 *
 * <Checkbox
 *   ref={checkboxRef}
 *   id="terms"
 *   checked={isChecked}
 *   onCheckedChange={setIsChecked}
 *   disabled={false}
 *   className="border-red-500 data-[state=checked]:bg-red-500"
 * />
 * ```
 */
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-current')}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
