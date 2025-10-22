import type { CSSProperties, ComponentPropsWithoutRef } from 'react';

import Link from 'next/link';
import React from 'react';
import { cn } from '@/lib/utils';

type BaseShimmerButtonProps = {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
};

type ButtonAsButtonProps = BaseShimmerButtonProps &
  ComponentPropsWithoutRef<'button'> & {
    href?: undefined;
  };

type ButtonAsLinkProps = BaseShimmerButtonProps &
  Omit<ComponentPropsWithoutRef<'a'>, 'href'> & {
    href: string;
  };

export type ShimmerButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

export const ShimmerButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ShimmerButtonProps
>(
  (
    {
      shimmerColor = '#ffffff',
      shimmerSize = '0.05em',
      shimmerDuration = '3s',
      borderRadius = '100px',
      background = 'rgba(0, 0, 0, 1)',
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Extract styles for the shimmer effect
    const shimmerStyles = {
      '--spread': '90deg',
      '--shimmer-color': shimmerColor,
      '--radius': borderRadius,
      '--speed': shimmerDuration,
      '--cut': shimmerSize,
      '--bg': background
    } as CSSProperties;

    // Common classes for both button and link
    const commonClasses = cn(
      'group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 text-white [background:var(--bg)] [border-radius:var(--radius)] dark:text-black',
      'transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px',
      className
    );

    // Create the inner content with all the shimmer effects
    const ShimmerContent = () => (
      <>
        {/* spark container */}
        <div
          className={cn(
            '-z-30 blur-[2px]',
            'absolute inset-0 overflow-visible [container-type:size]'
          )}
        >
          {/* spark */}
          <div className="absolute inset-0 h-[100cqh] animate-shimmer-slide [aspect-ratio:1] [border-radius:0] [mask:none]">
            {/* spark before */}
            <div className="absolute -inset-full w-auto rotate-0 animate-spin-around [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
          </div>
        </div>
        {children}

        {/* Highlight */}
        <div
          className={cn(
            'insert-0 absolute size-full',
            'rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#ffffff1f]',
            // transition
            'transform-gpu transition-all duration-300 ease-in-out',
            // on hover
            'group-hover:shadow-[inset_0_-6px_10px_#ffffff3f]',
            // on click
            'group-active:shadow-[inset_0_-10px_10px_#ffffff3f]'
          )}
        />

        {/* backdrop */}
        <div
          className={cn(
            'absolute -z-20 [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]'
          )}
        />
      </>
    );

    // Return either a button or a link based on whether href is provided
    if ('href' in props && props.href !== undefined) {
      // It's a link
      const {
        href,
        target,
        rel,
        onMouseEnter,
        onMouseLeave,
        onTouchStart,
        onTouchEnd,
        onFocus,
        onBlur,
        onKeyDown,
        onKeyUp,
        ...restProps
      } = props as ButtonAsLinkProps;

      return (
        <Link
          href={href}
          target={target}
          rel={rel}
          style={shimmerStyles}
          className={commonClasses}
          // @ts-ignore - Complex type compatibility issue with Next.js Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...(restProps as any)}
        >
          <ShimmerContent />
        </Link>
      );
    }

    // It's a button
    return (
      <button
        style={shimmerStyles}
        className={commonClasses}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...(props as ButtonAsButtonProps)}
      >
        <ShimmerContent />
      </button>
    );
  }
);

ShimmerButton.displayName = 'ShimmerButton';
