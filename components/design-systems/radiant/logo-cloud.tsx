import { clsx } from 'clsx';
import Image from 'next/image';

/**
 * LogoCloud component that displays a collection of company logos.
 *
 * This component renders a responsive grid of company logos including SavvyCal,
 * Laravel, Tuple, Transistor, and Statamic. The layout adapts to different screen
 * sizes with proper spacing and alignment.
 *
 * @component
 * @param {React.ComponentPropsWithoutRef<'div'>} props - Standard div props
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} The rendered logo cloud component
 *
 * @example
 * ```typescript
 * <LogoCloud className="my-8" />
 * ```
 *
 * @see {@link https://tailwindcss.com/docs/responsive-design} - Tailwind responsive design utilities
 */
export function LogoCloud({
  className,
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={clsx(
        className,
        'flex justify-between max-sm:mx-auto max-sm:max-w-md max-sm:flex-wrap max-sm:justify-evenly max-sm:gap-x-4 max-sm:gap-y-4',
      )}
    >
      <Image
        alt="SavvyCal"
        src="/logos/savvycal.svg"
        width={100}
        height={48}
        className="h-9 max-sm:mx-auto sm:h-8 lg:h-12"
      />
      <Image
        alt="Laravel"
        src="/logos/laravel.svg"
        width={100}
        height={48}
        className="h-9 max-sm:mx-auto sm:h-8 lg:h-12"
      />
      <Image
        alt="Tuple"
        src="/logos/tuple.svg"
        width={100}
        height={48}
        className="h-9 max-sm:mx-auto sm:h-8 lg:h-12"
      />
      <Image
        alt="Transistor"
        src="/logos/transistor.svg"
        width={100}
        height={48}
        className="h-9 max-sm:mx-auto sm:h-8 lg:h-12"
      />
      <Image
        alt="Statamic"
        src="/logos/statamic.svg"
        width={100}
        height={48}
        className="h-9 max-sm:mx-auto sm:h-8 lg:h-12"
      />
    </div>
  )
}
