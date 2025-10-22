/**
 * LoadingDots component that displays animated dots for loading states.
 *
 * This component renders three animated dots that pulse sequentially to indicate
 * that an operation is in progress. It supports two sizes: regular and large.
 *
 * @component
 * @param {Object} props - The component props
 * @param {'sm' | 'lg'} props.size - Size variant for the loading dots
 * @returns {JSX.Element} The rendered loading dots component
 *
 * @example
 * ```typescript
 * // Small loading dots
 * <LoadingDots size="sm" />
 *
 * // Large loading dots
 * <LoadingDots size="lg" />
 * ```
 *
 * @see {@link https://tailwindcss.com/docs/animation} - Tailwind CSS animation documentation
 */
const LoadingDots = ({ size }: { size: string }) => {
  const dotClasses = 'bg-zinc-200 rounded-full h-2 w-2';
  const largeDotClasses = 'bg-blue-800 rounded-full h-5 w-5';
  const animationBase = 'animate-animate-blink';

  const containerClasses = `inline-flex text-center items-center ${
    size === 'lg' ? 'gap-x-1.5' : 'gap-x-0.5'
  }`;

  return (
    <span className={containerClasses}>
      <span
        className={`${
          size === 'lg' ? largeDotClasses : dotClasses
        } ${animationBase}`}
        style={{ animationDelay: '0s' }}
      />
      <span
        className={`${
          size === 'lg' ? largeDotClasses : dotClasses
        } ${animationBase}`}
        style={{ animationDelay: '0.2s' }}
      />
      <span
        className={`${
          size === 'lg' ? largeDotClasses : dotClasses
        } ${animationBase}`}
        style={{ animationDelay: '0.4s' }}
      />
    </span>
  );
};

export default LoadingDots;