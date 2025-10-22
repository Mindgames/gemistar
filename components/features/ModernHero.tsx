'use client';

import { animate, createTimeline, random, set, stagger } from 'animejs';
import { useEffect, useRef } from 'react';

import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ModernHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const hero = sectionRef.current;
    if (!hero) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduceMotion.matches) {
      hero
        .querySelectorAll<HTMLElement>(
          '[data-hero-root],[data-hero-heading],[data-hero-cta]'
        )
        .forEach((element) => {
          element.style.opacity = '1';
          element.style.transform = 'none';
        });
      return undefined;
    }

    const contentRoot = hero.querySelector<HTMLElement>('[data-hero-root]');
    const heading = hero.querySelector<HTMLElement>('[data-hero-heading]');
    const ctas = hero.querySelectorAll<HTMLElement>('[data-hero-cta]');
    const sparkles = hero.querySelectorAll<HTMLElement>('[data-hero-spark]');
    const gradient = hero.querySelector<HTMLElement>('[data-hero-gradient]');
    const glow = glowRef.current;

    if (contentRoot) set(contentRoot, { opacity: 0 });
    if (heading) set(heading, { opacity: 0, translateY: 36 });
    if (ctas.length) set(ctas, { opacity: 0, translateY: 32 });
    if (gradient) {
      gradient.style.transform = 'rotate(0deg)';
      set(gradient, {
        scale: 0.92,
        rotate: '0deg'
      });
    }
    if (glow) set(glow, { scale: 0.9 });

    let sparkleLoop: ReturnType<typeof animate> | null = null;
    let gradientLoop: ReturnType<typeof animate> | null = null;

    const intro = createTimeline({
      defaults: {
        ease: 'outExpo',
        duration: 780
      },
      onComplete: () => {
        sparkleLoop?.play();
        gradientLoop?.play();
      }
    });

    if (contentRoot) {
      intro.add(contentRoot, { opacity: [0, 1], duration: 360 });
    }

    if (heading) {
      intro.add(
        heading,
        {
          opacity: [0, 1],
          translateY: [36, 0],
          duration: 760
        },
        '-=120'
      );
    }

    if (ctas.length) {
      intro.add(
        ctas,
        {
          opacity: [0, 1],
          translateY: [32, 0],
          duration: 640,
          delay: stagger(110)
        },
        '-=420'
      );
    }

    if (gradient) {
      intro.add(
        gradient,
        {
          scale: [0.92, 1],
          duration: 840
        },
        '-=620'
      );
    }

    if (glow) {
      intro.add(
        glow,
        {
          scale: [0.9, 1],
          duration: 760
        },
        '-=520'
      );
    }

    if (sparkles.length) {
      sparkleLoop = animate(sparkles, {
        keyframes: [
          {
            opacity: 0.25,
            scale: 1.05,
            translateX: () => random(-22, 22),
            translateY: () => random(-18, 18),
            duration: 2000
          },
          {
            opacity: 0.65,
            scale: 0.95,
            translateX: () => random(-22, 22),
            translateY: () => random(-18, 18),
            duration: 2000
          }
        ],
        ease: 'inOutSine',
        direction: 'alternate',
        loop: true,
        autoplay: false
      });
    }

    if (gradient) {
      gradientLoop = animate(gradient, {
        rotate: ['0deg', '360deg'],
        duration: 18000,
        ease: 'linear',
        loop: true,
        autoplay: false
      });
    }

    return () => {
      intro.pause();
      sparkleLoop?.pause();
      gradientLoop?.pause();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex w-full flex-col justify-center overflow-hidden bg-background pt-24 pb-16 sm:pt-28 sm:pb-20 md:min-h-[calc(100dvh-6rem)] lg:min-h-screen"
    >
      <noscript>
        <style>{`[data-hero-root],[data-hero-heading],[data-hero-cta]{opacity:1!important;transform:none!important;}`}</style>
      </noscript>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          data-hero-gradient
          className="absolute left-1/2 top-1/2 h-[120vw] max-h-[50rem] w-[120vw] max-w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl mix-blend-screen transition-transform sm:h-[90vw] sm:max-h-[46rem] sm:w-[90vw] sm:max-w-[48rem] lg:h-[60rem] lg:w-[60rem] dark:mix-blend-lighten"
          style={{
            background:
              'conic-gradient(from 0deg, rgba(236,72,153,0.46) 0deg, rgba(217,70,239,0.4) 140deg, rgba(244,114,182,0.42) 260deg, rgba(236,72,153,0.46) 360deg)'
          }}
        />
        <div
          ref={glowRef}
          className="absolute left-1/2 top-[18%] h-[80vw] max-h-[36rem] w-[80vw] max-w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,239,246,0.36),_rgba(255,255,255,0)_68%)] blur-3xl transition-opacity sm:h-[60vw] sm:max-h-[32rem] sm:w-[60vw] sm:max-w-[32rem] lg:h-[44rem] lg:w-[44rem] dark:bg-[radial-gradient(circle_at_center,_rgba(236,72,153,0.45),_rgba(4,7,19,0)_72%)]"
        />
        <span
          data-hero-spark
          className="absolute left-[9%] top-[26%] hidden h-40 w-40 rounded-full bg-[radial-gradient(circle_at_center,_rgba(253,216,242,0.34),_rgba(255,255,255,0)_72%)] blur-3xl sm:block dark:bg-[radial-gradient(circle_at_center,_rgba(236,72,153,0.42),_rgba(5,9,19,0)_72%)]"
        />
        <span
          data-hero-spark
          className="absolute right-[10%] top-[32%] h-36 w-36 rounded-full bg-[radial-gradient(circle_at_center,_rgba(254,205,239,0.32),_rgba(255,255,255,0)_70%)] blur-3xl sm:h-40 sm:w-40 dark:bg-[radial-gradient(circle_at_center,_rgba(217,70,239,0.4),_rgba(5,9,19,0)_70%)]"
        />
        <span
          data-hero-spark
          className="absolute right-[6%] bottom-[10%] h-48 w-48 rounded-full bg-[radial-gradient(circle_at_center,_rgba(254,215,242,0.28),_rgba(255,255,255,0)_70%)] blur-3xl sm:h-52 sm:w-52 dark:bg-[radial-gradient(circle_at_center,_rgba(244,114,182,0.4),_rgba(5,9,19,0)_70%)]"
        />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-6 sm:px-8 md:px-10">
        <div
          data-hero-root
          className="w-full space-y-10 text-left opacity-0 sm:space-y-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-1 text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground/90">
            Intent → Options → Confirm
          </div>
          <h1
            data-hero-heading
            className="text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]"
          >
            Gamistar — AI that turns intent into bets
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
            <strong>BetMate</strong> embeds as a chat widget inside your sportsbook or
            mobile app. Players ask for the bet, see ranked options, add to slip, and
            confirm — right in chat.
          </p>
          <p className="text-base text-muted-foreground/90 sm:text-lg">
            Ask the bet. See the options. Confirm — inside the chat view.
          </p>

          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
            <Button
              size="lg"
              variant="default"
              data-hero-cta
              asChild
              className="px-7 text-base font-semibold"
            >
              <a href="#contact">
                Book a Pilot
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              data-hero-cta
              asChild
              className="border-border/70 px-7 text-base font-semibold text-foreground hover:bg-primary/10"
            >
              <a href="#how-it-works">
                See How BetMate Works
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-muted-foreground">
              <span className="rounded-full border border-border/60 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground/90">
                Operator Logo — Placeholder
              </span>
              <span className="rounded-full border border-border/60 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground/90">
                Operator Logo — Placeholder
              </span>
              <span className="rounded-full border border-border/60 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground/90">
                Platform Partner — Placeholder
              </span>
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              Q4/Q1 pilot slots are limited.{' '}
              <a href="#contact" className="text-primary underline-offset-4 hover:underline">
                Contact →
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
