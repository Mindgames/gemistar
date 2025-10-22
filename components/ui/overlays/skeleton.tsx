/**
 * Skeleton UI Component
 *
 * A placeholder component that displays a loading state animation while
 * content is being fetched or processed. Commonly used to improve perceived
 * performance by showing the structure of content before it's loaded.
 *
 * Features:
 * - Smooth pulse animation for loading indication
 * - Customizable styling with Tailwind CSS
 * - TypeScript support with proper HTML div attributes
 * - Accessible with proper ARIA attributes support
 * - Flexible sizing and positioning
 *
 * @example
 * ```typescript
 * import { Skeleton } from "@/components/ui/skeleton";
 *
 * function LoadingCard() {
 *   return (
 *     <div className="space-y-3">
 *       <Skeleton className="h-4 w-[250px]" />
 *       <Skeleton className="h-4 w-[200px]" />
 *       <div className="space-y-2">
 *         <Skeleton className="h-4 w-full" />
 *         <Skeleton className="h-4 w-full" />
 *         <Skeleton className="h-4 w-3/4" />
 *       </div>
 *     </div>
 *   );
 * }
 *
 * function ProfileSkeleton() {
 *   return (
 *     <div className="flex items-center space-x-4">
 *       <Skeleton className="h-12 w-12 rounded-full" />
 *       <div className="space-y-2">
 *         <Skeleton className="h-4 w-[250px]" />
 *         <Skeleton className="h-4 w-[200px]" />
 *       </div>
 *     </div>
 *   );
 * }
 *
 * function TableSkeleton() {
 *   return (
 *     <div className="space-y-3">
 *       {Array.from({ length: 5 }).map((_, i) => (
 *         <div key={i} className="flex items-center space-x-4">
 *           <Skeleton className="h-10 w-10 rounded-full" />
 *           <div className="space-y-2 flex-1">
 *             <Skeleton className="h-4 w-3/4" />
 *             <Skeleton className="h-3 w-1/2" />
 *           </div>
 *         </div>
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */

import { cn } from '@/lib/utils';

/**
 * Skeleton component that displays a loading placeholder animation.
 *
 * Creates a visual placeholder that mimics the structure of content while
 * it's being loaded, improving the user experience by showing that content
 * is coming rather than a blank space.
 *
 * @component
 * @param {React.HTMLAttributes<HTMLDivElement>} props - Standard HTML div attributes
 * @param {string} [className] - Additional CSS classes to apply
 * @returns {JSX.Element} The rendered skeleton component
 *
 * @example
 * ```typescript
 * // Basic usage
 * <Skeleton className="h-4 w-64" />
 *
 * // Custom styling
 * <Skeleton className="h-12 w-12 rounded-full bg-gray-200" />
 *
 * // With accessibility
 * <Skeleton
 *   className="h-4 w-32"
 *   aria-label="Loading content"
 *   role="progressbar"
 *   aria-valuenow={undefined}
 *   aria-valuemin={0}
 *   aria-valuemax={100}
 * />
 * ```
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  );
}

export { Skeleton };
