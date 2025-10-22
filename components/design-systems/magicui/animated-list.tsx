'use client';

import { AnimatePresence, motion } from 'motion/react';
import React, {
  ComponentPropsWithoutRef,
  useEffect,
  useMemo,
  useState
} from 'react';

import { cn } from '@/lib/utils';

/**
 * A list item component that animates its appearance.
 * It uses a spring animation for a bouncy effect.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content of the list item.
 * @returns {JSX.Element} The animated list item.
 */
export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  const animations = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: 'spring' as const, stiffness: 350, damping: 40 }
  };

  return (
    <motion.div {...animations} layout className="mx-auto w-full">
      {children}
    </motion.div>
  );
}

/**
 * Props for the AnimatedList component.
 */
export interface AnimatedListProps extends ComponentPropsWithoutRef<'div'> {
  /** The child elements to be animated. */
  children: React.ReactNode;
  /** The delay in milliseconds between the appearance of each item. Defaults to 1000ms. */
  delay?: number;
}

/**
 * A component that animates a list of items, revealing them sequentially.
 * Each child is wrapped in an `AnimatedListItem` and appears with a configurable delay.
 *
 * @param {AnimatedListProps} props - The component props.
 * @returns {JSX.Element} The animated list.
 */
export const AnimatedList = React.memo(
  ({ children, className, delay = 1000, ...props }: AnimatedListProps) => {
    const [index, setIndex] = useState(0);
    const childrenArray = useMemo(
      () => React.Children.toArray(children),
      [children]
    );

    useEffect(() => {
      if (index < childrenArray.length - 1) {
        const timeout = setTimeout(() => {
          setIndex((prevIndex) => (prevIndex + 1) % childrenArray.length);
        }, delay);

        return () => clearTimeout(timeout);
      }
      return undefined;
    }, [index, delay, childrenArray.length]);

    const itemsToShow = useMemo(() => {
      const result = childrenArray.slice(0, index + 1).reverse();
      return result;
    }, [index, childrenArray]);

    return (
      <div
        className={cn(`flex flex-col items-center gap-4`, className)}
        {...props}
      >
        <AnimatePresence>
          {itemsToShow.map((item) => (
            <AnimatedListItem key={(item as React.ReactElement).key}>
              {item}
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    );
  }
);

AnimatedList.displayName = 'AnimatedList';
