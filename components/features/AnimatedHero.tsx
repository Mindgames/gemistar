'use client';

import { useEffect, useRef } from 'react';

import { animate } from 'animejs';
import type { DurationKeyframes } from 'animejs';

const blobPalette = [
  'radial-gradient(circle at 30% 30%, rgba(112,157,255,0.55), rgba(54,87,179,0.28) 55%, rgba(10,18,42,0) 80%)',
  'radial-gradient(circle at 70% 40%, rgba(98,143,255,0.55), rgba(70,110,210,0.28) 60%, rgba(18,28,60,0) 88%)',
  'radial-gradient(circle at 50% 60%, rgba(148,218,255,0.45), rgba(64,184,255,0.2) 55%, rgba(20,32,64,0) 85%)',
  'radial-gradient(circle at 45% 45%, rgba(120,215,255,0.5), rgba(70,180,240,0.24) 50%, rgba(16,28,64,0) 85%)',
  'radial-gradient(circle at 60% 60%, rgba(88,170,255,0.55), rgba(52,130,210,0.26) 55%, rgba(12,20,46,0) 90%)'
];

const blobPositions = [
  'top-[8%] left-[10%]',
  'top-[16%] right-[12%]',
  'bottom-[10%] left-[18%]',
  'bottom-[16%] right-[20%]',
  'top-[42%] left-[45%]'
];

const sparkPositions = [
  'top-[28%] left-[34%]',
  'top-[54%] left-[22%]',
  'top-[34%] right-[26%]',
  'bottom-[32%] left-[44%]',
  'bottom-[26%] right-[36%]',
  'top-[50%] right-[18%]'
];

const trailPositions = [
  'left-[18%] top-[25%] rotate-[18deg]',
  'left-[68%] top-[32%] -rotate-[14deg]',
  'left-[42%] bottom-[28%] rotate-[6deg]'
];

const randomBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const createBlobFrames = (): DurationKeyframes => [
  {
    x: randomBetween(-80, 80),
    y: randomBetween(-80, 80),
    scale: randomBetween(0.7, 1.05),
    rotate: randomBetween(-25, 25),
    opacity: randomBetween(0.4, 0.68)
  },
  {
    x: randomBetween(-220, 220),
    y: randomBetween(-220, 220),
    scale: randomBetween(0.9, 1.55),
    rotate: randomBetween(-55, 55),
    opacity: randomBetween(0.3, 0.6)
  }
];

const createSparkFrames = (): DurationKeyframes => [
  {
    x: randomBetween(-40, 40),
    y: randomBetween(-40, 40),
    scale: randomBetween(0.5, 1.2),
    opacity: randomBetween(0.18, 0.5)
  },
  {
    x: randomBetween(-90, 90),
    y: randomBetween(-90, 90),
    scale: randomBetween(0.65, 1.4),
    opacity: randomBetween(0.12, 0.45)
  }
];

const createTrailFrames = (): DurationKeyframes => [
  {
    translateX: randomBetween(-20, 20),
    translateY: randomBetween(-80, 80),
    opacity: randomBetween(0.1, 0.35),
    skewX: randomBetween(-6, 6)
  },
  {
    translateX: randomBetween(-80, 80),
    translateY: randomBetween(-120, 120),
    opacity: randomBetween(0.15, 0.4),
    skewX: randomBetween(-10, 10)
  }
];

const runLoopingAnimation = (
  createFrames: () => DurationKeyframes,
  options: {
    target: HTMLElement;
    baseDuration: number;
    delay?: number;
    multiplier?: number;
  }
) => {
  const { target, baseDuration, delay = 0, multiplier = 1 } = options;
  let control: ReturnType<typeof animate> | undefined;

  const play = () => {
    const computedDuration =
      randomBetween(baseDuration * 0.7, baseDuration * 1.3) * multiplier;
    control = animate(target, {
      keyframes: createFrames(),
      duration: computedDuration,
      ease: 'inOutSine',
      alternate: true,
      loop: 2,
      delay,
      onComplete: play
    });
  };

  play();

  return () => control?.cancel();
};

/**
 * Animated hero with energetic pink aurora and expressive particle system.
 */
export function AnimatedHero(): React.JSX.Element {
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return;

    const blobCleanups = Array.from(
      field.querySelectorAll<HTMLElement>('.hero-blob')
    ).map((element, index) =>
      runLoopingAnimation(createBlobFrames, {
        target: element,
        baseDuration: 9000 + index * 1500,
        delay: index * 260
      })
    );

    const sparkCleanups = Array.from(
      field.querySelectorAll<HTMLElement>('.hero-spark')
    ).map((element, index) =>
      runLoopingAnimation(createSparkFrames, {
        target: element,
        baseDuration: 4200 + index * 520,
        multiplier: 0.9
      })
    );

    const trailCleanups = Array.from(
      field.querySelectorAll<HTMLElement>('.hero-trail')
    ).map((element, index) =>
      runLoopingAnimation(createTrailFrames, {
        target: element,
        baseDuration: 7000 + index * 900,
        delay: index * 400
      })
    );

    const aurora = field.querySelector<HTMLElement>('.hero-aurora');
    const auroraControl = aurora
      ? animate(aurora, {
          rotateZ: 360,
          scale: [1, 1.08],
          duration: 24000,
          ease: 'linear',
          loop: true
        })
      : undefined;

    return () => {
      blobCleanups.forEach((cleanup) => cleanup());
      sparkCleanups.forEach((cleanup) => cleanup());
      trailCleanups.forEach((cleanup) => cleanup());
      auroraControl?.cancel();
    };
  }, []);

  return (
    <section className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-[#01010a] via-[#020414] to-[#010009] pt-28 pb-24">
      <div
        ref={fieldRef}
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -inset-[40%] rounded-full bg-[radial-gradient(circle,rgba(255,123,214,0.2),rgba(116,0,157,0.05),rgba(0,0,0,0))] opacity-75 blur-3xl" />
        <div
          className="hero-aurora absolute left-1/2 top-1/2 h-[115vmax] w-[115vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
          style={{
            background:
              'conic-gradient(from 120deg, rgba(255,117,209,0.5), rgba(146,77,255,0.35), rgba(20,7,40,0) 65%, rgba(255,117,209,0.5))'
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-b from-transparent via-[#03040f]/85 to-[#010006]" />

        {blobPositions.map((position, index) => (
          <span
            key={`blob-${position}`}
            className={`hero-blob absolute h-64 w-64 rounded-full blur-3xl ${position}`}
            style={{
              background: blobPalette[index % blobPalette.length],
              mixBlendMode: 'screen'
            }}
          />
        ))}

        {trailPositions.map((position, index) => (
          <span
            key={`trail-${position}`}
            className={`hero-trail absolute h-[22rem] w-[6rem] rounded-full ${position}`}
            style={{
              background:
                'linear-gradient(170deg, rgba(120,160,255,0.18), rgba(70,120,210,0.1) 42%, rgba(32,56,120,0.04) 88%)',
              mixBlendMode: 'screen',
              filter: 'blur(32px)'
            }}
          />
        ))}

        {sparkPositions.map((position, index) => (
          <span
            key={`spark-${position}`}
            className={`hero-spark absolute h-8 w-8 rounded-full ${position}`}
            style={{
              background:
                'radial-gradient(circle, rgba(255,255,255,0.85) 0%, rgba(160,190,255,0.22) 45%, rgba(0,0,0,0) 80%)',
              mixBlendMode: 'screen'
            }}
          />
        ))}
      </div>

      <div className="relative z-10 px-6 text-center">
        <h1 className="bg-gradient-to-br from-[#b2c8ff] via-[#f4f7ff] to-[#7081ff] bg-clip-text text-5xl font-semibold tracking-tight text-transparent drop-shadow-[0_0_18px_rgba(120,150,255,0.25)] sm:text-6xl md:text-7xl">
          Gamistar
        </h1>
      </div>
    </section>
  );
}
