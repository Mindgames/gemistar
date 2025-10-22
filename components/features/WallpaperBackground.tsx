'use client';

import { useEffect, useRef } from 'react';
import { createScope, createTimeline, engine, spring } from 'animejs';
import type { Scope, Timeline } from 'animejs';

/**
 * Animated backdrop for the learn + features section.
 *
 * Mirrors the glowing gradients previously defined directly in
 * `ModernFeatures.tsx` but leverages anime.js so the effect can span
 * multiple sections without being clipped.
 */
export function WallpaperBackground() {
  const gradientRef = useRef<HTMLDivElement | null>(null);
  const sparkRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const scopeRef = useRef<Scope | null>(null);

  useEffect(() => {
    const scope = scopeRef.current ?? createScope();
    scopeRef.current = scope;

    const timeline = scope.keepTime(() => {
      const gradient = gradientRef.current;
      const sparks = sparkRefs.current.filter((el): el is HTMLSpanElement => Boolean(el));

      const tl = createTimeline({
        autoplay: true,
        defaults: {
          loop: true,
          alternate: true,
          ease: spring({ mass: 1.1, stiffness: 22, damping: 16 })
        }
      });

      if (gradient) {
        tl.set(gradient, {
          translateX: '-12%',
          translateY: '-26%',
          rotate: '-10deg',
          scale: 1.02
        });

        tl.add(gradient, {
          translateX: '12%',
          translateY: '8%',
          rotate: '14deg',
          scale: 1.08,
          duration: 18000
        });
      }

      const sparkConfigs = [
        {
          initial: { opacity: 0.28, translateX: -26, translateY: -34, scale: 0.92 },
          animated: { opacity: 0.58, translateX: 20, translateY: -8, scale: 1.08 },
          duration: 12000,
          position: 0
        },
        {
          initial: { opacity: 0.34, translateX: 14, translateY: -10, scale: 0.96 },
          animated: { opacity: 0.68, translateX: -18, translateY: 18, scale: 1.12 },
          duration: 10500,
          position: 1400
        },
        {
          initial: { opacity: 0.3, translateX: 6, translateY: 18, scale: 0.98 },
          animated: { opacity: 0.56, translateX: -20, translateY: -16, scale: 1.1 },
          duration: 12800,
          position: 2800
        }
      ] as const;

      sparks.forEach((spark, index) => {
        const config = sparkConfigs[index];
        if (!config) return;

        tl.set(spark, config.initial);
        tl.add(
          spark,
          {
            ...config.animated,
            duration: config.duration,
            ease: 'easeInOutSine'
          },
          config.position
        );
      });

      return tl;
    }) as Timeline;

    const previousPauseSetting = engine.pauseOnDocumentHidden;
    if (typeof window !== 'undefined') {
      engine.pauseOnDocumentHidden = false;
    }

    return () => {
      timeline?.cancel();
      engine.pauseOnDocumentHidden = previousPauseSetting;
      scope.revert();
      scopeRef.current = null;
    };
  }, []);

  const registerSpark = (index: number) => (el: HTMLSpanElement | null) => {
    sparkRefs.current[index] = el;
  };

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[48px]">
      <div
        ref={gradientRef}
        className="absolute left-1/2 top-[32%] h-[110vw] max-h-[52rem] w-[110vw] max-w-[58rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-45 blur-3xl"
        style={{
          background:
            'conic-gradient(from 40deg, rgba(236,72,153,0.28) 0deg, rgba(217,70,239,0.24) 140deg, rgba(244,114,182,0.22) 260deg, rgba(236,72,153,0.28) 360deg)'
        }}
      />

      <span
        ref={registerSpark(0)}
        className="absolute left-[10%] top-[28%] hidden h-48 w-48 rounded-full bg-[radial-gradient(circle_at_center,_rgba(236,72,153,0.38),_rgba(4,7,19,0)_72%)] blur-3xl sm:block"
      />
      <span
        ref={registerSpark(1)}
        className="absolute right-[12%] top-[36%] h-44 w-44 rounded-full bg-[radial-gradient(circle_at_center,_rgba(217,70,239,0.32),_rgba(4,7,19,0)_70%)] blur-3xl"
      />
      <span
        ref={registerSpark(2)}
        className="absolute right-[6%] bottom-[14%] h-60 w-60 rounded-full bg-[radial-gradient(circle_at_center,_rgba(244,114,182,0.32),_rgba(4,7,19,0)_74%)] blur-3xl"
      />
    </div>
  );
}
