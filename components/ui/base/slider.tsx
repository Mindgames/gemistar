/**
 * Slider UI Component
 *
 * An accessible slider component built on top of Radix UI's Slider primitive.
 * Provides range input functionality with proper keyboard navigation, ARIA
 * attributes, and touch support for mobile devices.
 *
 * Features:
 * - Built on Radix UI for accessibility
 * - Customizable styling with Tailwind CSS
 * - TypeScript support with proper typing
 * - Keyboard navigation support
 * - Touch support for mobile
 * - Single and range value support
 * - Step and orientation options
 *
 * @example
 * ```typescript
 * import { Slider } from "@/components/ui/slider";
 *
 * function VolumeControl() {
 *   const [volume, setVolume] = useState([50]);
 *
 *   return (
 *     <div className="w-full max-w-sm">
 *       <label className="text-sm font-medium mb-2 block">
 *         Volume: {volume[0]}%
 *       </label>
 *       <Slider
 *         value={volume}
 *         onValueChange={setVolume}
 *         max={100}
 *         step={1}
 *         className="w-full"
 *       />
 *     </div>
 *   );
 * }
 *
 * function RangeSelector() {
 *   const [range, setRange] = useState([20, 80]);
 *
 *   return (
 *     <div className="w-full max-w-sm">
 *       <label className="text-sm font-medium mb-2 block">
 *         Price Range: ${range[0]} - ${range[1]}
 *       </label>
 *       <Slider
 *         value={range}
 *         onValueChange={setRange}
 *         min={0}
 *         max={100}
 *         step={5}
 *         className="w-full"
 *       />
 *     </div>
 *   );
 * }
 * ```
 */

'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/utils/cn';

/**
 * Slider component that provides accessible range input functionality.
 *
 * @component
 * @param {React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>} props - The component props from Radix UI
 * @param {React.Ref<React.ElementRef<typeof SliderPrimitive.Root>>} ref - Forwarded ref to the slider element
 * @returns {JSX.Element} The rendered slider component
 *
 * @example
 * ```typescript
 * const sliderRef = useRef<HTMLSpanElement>(null);
 *
 * <Slider
 *   ref={sliderRef}
 *   value={[50]}
 *   onValueChange={(value) => console.log(value)}
 *   min={0}
 *   max={100}
 *   step={1}
 *   disabled={false}
 *   className="w-64"
 * />
 * ```
 */
const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex w-full touch-none select-none items-center',
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
      <SliderPrimitive.Range className="absolute h-full bg-slate-900 dark:bg-slate-50" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-slate-900 bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-slate-50 dark:bg-slate-950 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
