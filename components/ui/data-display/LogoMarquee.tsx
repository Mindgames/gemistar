import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Marquee } from '@/components/design-systems/magicui/marquee';
import type { PlatformLogo } from './platform-logos';
import { cn } from '@/lib/utils';
import { platformLogos } from './platform-logos';

/**
 * LogoMarquee component displaying animated social media platform logos.
 *
 * This component renders a scrolling marquee of social media platform logos
 * including Facebook, Instagram, LinkedIn, Telegram, WhatsApp, and X (Twitter).
 * The logos animate continuously across the screen to showcase platform integration
 * capabilities.
 *
 * @component
 * @param {Object} props - The component props
 * @param {string} [props.className] - Additional CSS classes for styling
 * @returns {JSX.Element} The rendered logo marquee component
 *
 * @example
 * ```typescript
 * import LogoMarquee from '@/components/ui/LogoMarquee';
 *
 * function PlatformShowcase() {
 *   return (
 *     <section className="py-8">
 *       <h3>Integrated Platforms</h3>
 *       <LogoMarquee className="mt-4" />
 *     </section>
 *   );
 * }
 * ```
 *
 * @see {@link https://nextjs.org/docs/api-reference/next/image} - Next.js Image component
 * @see {@link https://github.com/gazcn007/react-infinite-marquee} - Marquee component
 */

const LogoBadge = ({ name, shortName, icon, iconScale }: PlatformLogo) => {
  return (
    <div
      className={cn(
        'relative mx-3 flex h-10 w-[10rem] items-center justify-center gap-2.5  border-border bg-white/10 px-3.5 shadow-[0_14px_28px_rgba(12,12,12,0.22)] backdrop-blur-lg transition sm:mx-4 sm:h-12 sm:w-[11rem] sm:px-4 md:h-14 md:w-[12rem] dark:border-white/10 dark:bg-white/5'
      )}
    >
      <span className="sr-only">{name}</span>
      <span className="flex h-6 w-6 items-center justify-center sm:h-7 sm:w-7 md:h-8 md:w-8">
        <FontAwesomeIcon
          icon={icon}
          className="text-base text-white sm:text-lg"
          style={iconScale ? { transform: `scale(${iconScale})` } : undefined}
        />
      </span>
      <span className="text-sm font-medium tracking-tight text-white sm:text-base">
        {shortName ?? name}
      </span>
    </div>
  );
};

interface LogoMarqueeProps {
  className?: string;
}

export function LogoMarquee({ className }: LogoMarqueeProps = {}) {
  return (
    <div
      className={cn(
        'relative flex w-full flex-col items-center justify-center overflow-hidden py-12 sm:py-16',
        className
      )}
    >
      <h2 className="mb-6 text-center text-3xl font-semibold tracking-tight text-white sm:text-3xl">
        Works wherever you work
      </h2>
      <Marquee
        pauseOnHover={false}
        vertical={false}
        className="[--duration:80s]"
      >
        {platformLogos.map((logo) => (
          <LogoBadge key={logo.name} {...logo} />
        ))}
        {/* Duplicate for seamless looping if content is not wide enough */}
        {platformLogos.map((logo) => (
          <LogoBadge key={`${logo.name}-duplicate`} {...logo} />
        ))}
      </Marquee>
      {/* Gradient overlays for edge fade effect - theme aware */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
      >
        <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-background/60 via-background/20 to-transparent sm:w-24 lg:w-32" />
        <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-background/60 via-background/20 to-transparent sm:w-24 lg:w-32" />
      </div>
    </div>
  );
}
