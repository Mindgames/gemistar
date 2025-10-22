'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

/**
 * Map component displaying an interactive world map with animated markers.
 *
 * This component renders a world map with animated location markers that appear
 * sequentially with a staggered animation. It's used to showcase global reach
 * and presence across different locations worldwide.
 *
 * @component
 * @returns {JSX.Element} The rendered map component with animated markers
 *
 * @example
 * ```typescript
 * import { Map } from '@/components/ui/radiant/map';
 *
 * function GlobalPresence() {
 *   return (
 *     <section>
 *       <h2>Global Reach</h2>
 *       <Map />
 *     </section>
 *   );
 * }
 * ```
 *
 * @see {@link https://www.framer.com/motion/} - Framer Motion animation library
 * @see {@link https://nextjs.org/docs/api-reference/next/image} - Next.js Image component
 */

/**
 * Marker component for individual location pins on the map.
 *
 * This component renders an animated marker pin with a custom avatar image.
 * The marker includes a shadow effect and animates in with a staggered delay.
 *
 * @component
 * @param {Object} props - The component props
 * @param {string} props.src - Path to the avatar image
 * @param {number} props.top - Top position of the marker (in pixels)
 * @param {number} props.offset - Horizontal offset from center (in pixels)
 * @param {number} props.delay - Animation delay in seconds
 * @returns {JSX.Element} The rendered marker component
 *
 * @example
 * ```typescript
 * <Marker
 *   src="/avatars/user.jpg"
 *   top={120}
 *   offset={50}
 *   delay={0.5}
 * />
 * ```
 */
function Marker({
  src,
  top,
  offset,
  delay
}: {
  src: string;
  top: number;
  offset: number;
  delay: number;
}) {
  return (
    <motion.div
      variants={{
        idle: { scale: 0, opacity: 0, rotateX: 0, rotate: 0, y: 0 },
        active: { y: [-20, 0, 4, 0], scale: [0.75, 1], opacity: [0, 1] }
      }}
      transition={{ duration: 0.25, delay, ease: 'easeOut' }}
      style={{ '--offset': `${offset}px`, top } as any}
      className="absolute left-[calc(50%+var(--offset))] size-[38px] drop-shadow-[0_3px_1px_rgba(0,0,0,.15)]"
    >
      <svg fill="none" viewBox="0 0 38 38" className="absolute size-full">
        <path
          d="M29.607 5.193c5.858 5.857 5.858 15.355 0 21.213l-9.9 9.9-.707.706-.708-.708-9.899-9.898c-5.857-5.858-5.857-15.356 0-21.213 5.858-5.858 15.356-5.858 21.214 0Z"
          className="fill-black/5"
        />
        <path
          d="m28.9 25.698-9.9 9.9-9.9-9.9C3.634 20.232 3.634 11.367 9.1 5.9 14.569.432 23.433.432 28.9 5.9c5.467 5.468 5.467 14.332 0 19.8Z"
          className="fill-white"
        />
      </svg>
      <Image
        alt="AI Copilot in any language"
        src={src}
        width={24}
        height={24}
        className="absolute left-[7px] top-[4px] size-6 rounded-full"
      />
    </motion.div>
  );
}

export function Map() {
  return (
    <div aria-hidden="true" className="relative size-full">
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_50%,transparent)]">
        <Image
          src="/map.png"
          alt=""
          fill
          priority={false}
          className="object-none object-[center_-75px]"
          sizes="(max-width: 768px) 100vw, 530px"
          quality={90}
        />
      </div>
      <div className="absolute inset-0">
        <Marker
          src="/images/map/hi-1.jpg"
          top={160}
          offset={-128}
          delay={0.15}
        />
        <Marker src="/images/map/hi-2.jpg" top={70} offset={-25} delay={0.1} />
        <Marker src="/images/map/hi-3.jpg" top={60} offset={-55} delay={0.1} />
        <Marker src="/images/map/hi-4.jpg" top={60} offset={10} delay={0.2} />
        <Marker src="/images/map/hi-5.jpg" top={70} offset={152} delay={0.2} />
        <Marker src="/images/map/hi-6.jpg" top={80} offset={-195} delay={0.3} />
        <Marker src="/images/map/hi-11.jpg" top={120} offset={65} delay={0.3} />
        <Marker src="/images/map/hi-8.jpg" top={110} offset={15} delay={0.4} />
        <Marker
          src="/images/map/hi-10.jpg"
          top={190}
          offset={-15}
          delay={0.4}
        />
      </div>
    </div>
  );
}
