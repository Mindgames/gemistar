import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names with proper Tailwind CSS conflict resolution.
 *
 * This utility function combines multiple class name inputs using `clsx` for conditional
 * class logic and `tailwind-merge` to resolve conflicting Tailwind CSS classes.
 * It's the recommended way to handle dynamic class names in Tailwind CSS projects.
 *
 * @param {...ClassValue[]} inputs - Class name inputs (strings, conditionals, objects, arrays)
 * @returns {string} The merged and deduplicated class string
 *
 * @example
 * ```typescript
 * // Basic usage
 * cn("px-4", "py-2", "bg-blue-500")
 *
 * // Conditional classes
 * cn("px-4", isActive && "bg-blue-500", !isActive && "bg-gray-500")
 *
 * // Object syntax
 * cn("px-4", { "bg-blue-500": isActive, "bg-gray-500": !isActive })
 *
 * // Combining multiple inputs
 * cn("base-class", conditionalClasses, objectClasses, arrayClasses)
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
