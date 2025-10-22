/**
 * Progress UI Component
 *
 * A visual progress indicator component built on top of Radix UI's Progress primitive.
 * Used to show the completion status of tasks, file uploads, or other processes
 * with a visual progress bar.
 *
 * Features:
 * - Built on Radix UI for accessibility
 * - Customizable styling with Tailwind CSS
 * - TypeScript support with proper typing
 * - Animated progress transitions
 * - Determinate and indeterminate progress support
 * - Accessible with proper ARIA attributes
 *
 * @example
 * ```typescript
 * import { Progress } from "@/components/ui/progress";
 *
 * function FileUploadProgress() {
 *   const [progress, setProgress] = useState(0);
 *
 *   useEffect(() => {
 *     const timer = setTimeout(() => setProgress(75), 500);
 *     return () => clearTimeout(timer);
 *   }, []);
 *
 *   return (
 *     <div className="w-full max-w-sm">
 *       <div className="mb-2 flex justify-between text-sm">
 *         <span>Uploading file...</span>
 *         <span>{progress}%</span>
 *       </div>
 *       <Progress value={progress} className="w-full" />
 *     </div>
 *   );
 * }
 *
 * function MultiStepProgress() {
 *   const [currentStep, setCurrentStep] = useState(2);
 *   const totalSteps = 5;
 *   const progressValue = (currentStep / totalSteps) * 100;
 *
 *   return (
 *     <div className="w-full max-w-md">
 *       <div className="mb-2 flex justify-between text-sm">
 *         <span>Step {currentStep} of {totalSteps}</span>
 *         <span>{Math.round(progressValue)}%</span>
 *       </div>
 *       <Progress value={progressValue} className="w-full" />
 *       <p className="mt-2 text-sm text-muted-foreground">
 *         Processing your request...
 *       </p>
 *     </div>
 *   );
 * }
 * ```
 */

'use client';

import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as React from 'react';

import { cn } from '@/utils/cn';

/**
 * Progress component that displays a visual progress indicator.
 *
 * @component
 * @param {React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>} props - The component props from Radix UI
 * @param {React.Ref<React.ElementRef<typeof ProgressPrimitive.Root>>} ref - Forwarded ref to the progress element
 * @returns {JSX.Element} The rendered progress component
 *
 * @example
 * ```typescript
 * const progressRef = useRef<HTMLDivElement>(null);
 *
 * <Progress
 *   ref={progressRef}
 *   value={75}
 *   className="w-64 h-2"
 *   aria-label="Upload progress"
 * />
 * ```
 */
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      'relative h-4 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800',
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-blue-900 transition-all dark:bg-slate-50"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
