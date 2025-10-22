'use client';

import * as React from 'react';
import { motion } from 'motion/react';

import { cn } from '@/lib/utils';

// Define interfaces for state properties
interface Disc {
  p: number;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface LinePoint {
  x: number;
  y: number;
}

interface Particle {
  x: number;
  sx: number;
  dx: number;
  y: number;
  vy: number;
  p: number;
  r: number;
  c: string;
}

interface ClipState {
  disc: Disc;
  i: number;
  path: Path2D;
}

interface RectState {
  width: number;
  height: number;
}

interface RenderState {
  width: number;
  height: number;
  dpi: number;
}

interface ParticleAreaState {
  sx: number;
  sw: number;
  ex: number;
  ew: number;
  h: number;
}

interface AnimationState {
  discs: Disc[];
  lines: LinePoint[][];
  particles: Particle[];
  clip: Partial<ClipState>;
  startDisc: Partial<Disc>;
  endDisc: Partial<Disc>;
  rect: RectState;
  render: RenderState;
  particleArea: Partial<ParticleAreaState>;
  linesCanvas: HTMLCanvasElement | null;
}

/**
 * Props for the HoleBackground component.
 */
type HoleBackgroundProps = React.ComponentProps<'div'> & {
  /** The color of the stroke for the lines and discs. Defaults to '#cdcdcd'. */
  strokeColor?: string;
  /** The number of lines to render in the animation. Defaults to 50. */
  numberOfLines?: number;
  /** The number of discs to render in the animation. Defaults to 50. */
  numberOfDiscs?: number;
  /** The RGB color of the particles. Defaults to a pale blue/white tone. */
  particleRGBColor?: [number, number, number];
};

/**
 * A complex, canvas-based animated background component that creates a "hole" or "vortex" effect.
 *
 * It renders a series of animated discs, lines, and particles that move to create a sense of depth and motion.
 * The animation is highly configurable through props, allowing for customization of colors, density, and speed.
 *
 * @param {HoleBackgroundProps} props - The component props for customization.
 * @returns {JSX.Element} The rendered canvas animation within a div container.
 */
function HoleBackground({
  strokeColor = '#cdcdcd', // Light grey for AI lab theme
  numberOfLines = 50,
  numberOfDiscs = 50,
  particleRGBColor = [200, 220, 255], // Pale blue/white tones for AI lab theme
  className,
  children,
  ...props
}: HoleBackgroundProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const animationFrameIdRef = React.useRef<number>(0);
  const stateRef = React.useRef<AnimationState>({
    discs: [],
    lines: [],
    particles: [],
    clip: {},
    startDisc: {},
    endDisc: {},
    rect: { width: 0, height: 0 },
    render: { width: 0, height: 0, dpi: 1 },
    particleArea: {},
    linesCanvas: null
  });

  // SLOWNESS FACTORS
  const DISC_SPEED = 0.0003; // was 0.001, now 3x slower
  const PARTICLE_VY_MIN = 0.15; // was 0.5, now ~3x slower
  const PARTICLE_VY_MAX = 0.33; // was 1, now ~3x slower
  const MOTION_BG_DURATION = 21; // was 7, now 3x slower

  const linear = React.useCallback((p: number) => p, []);
  const easeInExpo = React.useCallback(
    (p: number) => (p === 0 ? 0 : 2 ** (10 * (p - 1))),
    []
  );

  const tweenValue = React.useCallback(
    (start: number, end: number, p: number, ease: 'inExpo' | null = null) => {
      const delta = end - start;
      const easeFn = ease === 'inExpo' ? easeInExpo : linear;
      return start + delta * easeFn(p);
    },
    [easeInExpo, linear]
  );

  const tweenDisc = React.useCallback(
    (disc: Disc) => {
      const { startDisc, endDisc } = stateRef.current;
      if (
        startDisc &&
        typeof startDisc.x === 'number' &&
        typeof startDisc.y === 'number' &&
        typeof startDisc.w === 'number' &&
        typeof startDisc.h === 'number' &&
        endDisc &&
        typeof endDisc.x === 'number' &&
        typeof endDisc.y === 'number' &&
        typeof endDisc.w === 'number' &&
        typeof endDisc.h === 'number'
      ) {
        disc.x = tweenValue(startDisc.x, endDisc.x, disc.p);
        disc.y = tweenValue(startDisc.y, endDisc.y, disc.p, 'inExpo');
        disc.w = tweenValue(startDisc.w, endDisc.w, disc.p);
        disc.h = tweenValue(startDisc.h, endDisc.h, disc.p);
      }
    },
    [tweenValue]
  );

  const setSize = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    stateRef.current.rect = { width: rect.width, height: rect.height };
    stateRef.current.render = {
      width: rect.width,
      height: rect.height,
      dpi: window.devicePixelRatio || 1
    };
    canvas.width = stateRef.current.render.width * stateRef.current.render.dpi;
    canvas.height =
      stateRef.current.render.height * stateRef.current.render.dpi;
  }, []);

  const setDiscs = React.useCallback(() => {
    const { width, height } = stateRef.current.rect;
    stateRef.current.discs = [];
    // For hero: make the hole more central and larger
    stateRef.current.startDisc = {
      x: width * 0.5,
      y: height * 0.5,
      w: width * 0.85,
      h: height * 0.8
    };
    stateRef.current.endDisc = {
      x: width * 0.5,
      y: height * 1.05,
      w: 0,
      h: 0
    };
    let prevBottom = height;
    stateRef.current.clip = {};
    for (let i = 0; i < numberOfDiscs; i++) {
      const p = i / numberOfDiscs;
      const disc: Disc = { p, x: 0, y: 0, w: 0, h: 0 };
      tweenDisc(disc);
      const bottom = disc.y + disc.h;
      if (bottom <= prevBottom) {
        stateRef.current.clip = { disc: { ...disc }, i };
      }
      prevBottom = bottom;
      stateRef.current.discs.push(disc);
    }
    const clipPath = new Path2D();
    const disc = stateRef.current.clip.disc;
    if (disc) {
      clipPath.ellipse(disc.x, disc.y, disc.w, disc.h, 0, 0, Math.PI * 2);
      clipPath.rect(disc.x - disc.w, 0, disc.w * 2, disc.y);
      stateRef.current.clip.path = clipPath;
    }
  }, [numberOfDiscs, tweenDisc]);

  // Make lines lighter by using a lighter color and thinner line width
  const setLines = React.useCallback(() => {
    const { width, height } = stateRef.current.rect;
    stateRef.current.lines = [];
    const linesAngle = (Math.PI * 2) / numberOfLines;
    for (let i = 0; i < numberOfLines; i++) {
      stateRef.current.lines.push([]);
    }
    for (const disc of stateRef.current.discs) {
      for (let i = 0; i < numberOfLines; i++) {
        const angle = i * linesAngle;
        const p: LinePoint = {
          x: disc.x + Math.cos(angle) * disc.w,
          y: disc.y + Math.sin(angle) * disc.h
        };
        stateRef.current.lines[i].push(p);
      }
    }
    const offCanvas = document.createElement('canvas');
    offCanvas.width = width;
    offCanvas.height = height;
    const ctx = offCanvas.getContext('2d');
    if (!ctx || !stateRef.current.clip.path) return;

    // Use a lighter color for the lines (rgba with low alpha)
    // If strokeColor is already rgba, use it with lower alpha, else convert hex to rgba
    let lightLineColor: string;
    if (strokeColor.startsWith('rgba')) {
      // Replace the alpha value with 0.18
      lightLineColor = strokeColor.replace(
        /rgba\(([^,]+),([^,]+),([^,]+),[^)]+\)/,
        'rgba($1,$2,$3,0.18)'
      );
    } else if (strokeColor.startsWith('rgb')) {
      // Add alpha to rgb
      lightLineColor = strokeColor.replace(
        /rgb\(([^,]+),([^,]+),([^,]+)\)/,
        'rgba($1,$2,$3,0.18)'
      );
    } else if (strokeColor.startsWith('#')) {
      // Convert hex to rgba
      let hex = strokeColor.replace('#', '');
      if (hex.length === 3) {
        hex = hex
          .split('')
          .map((x) => x + x)
          .join('');
      }
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      lightLineColor = `rgba(${r},${g},${b},0.18)`;
    } else {
      // fallback
      lightLineColor = 'rgba(205,205,205,0.18)';
    }

    for (const line of stateRef.current.lines) {
      ctx.save();
      let lineIsIn = false;
      for (let j = 1; j < line.length; j++) {
        const p1 = line[j];
        const p0 = line[j - 1];
        if (
          !lineIsIn &&
          (ctx.isPointInPath(stateRef.current.clip.path, p1.x, p1.y) ||
            ctx.isPointInStroke(stateRef.current.clip.path, p1.x, p1.y))
        ) {
          lineIsIn = true;
        } else if (lineIsIn && stateRef.current.clip.path) {
          ctx.clip(stateRef.current.clip.path);
        }
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.strokeStyle = lightLineColor;
        ctx.lineWidth = 1; // thinner line for lighter effect
        ctx.stroke();
        ctx.closePath();
      }
      ctx.restore();
    }
    stateRef.current.linesCanvas = offCanvas;
  }, [numberOfLines, strokeColor]);

  const initParticle = React.useCallback(
    (start = false): Particle => {
      const particleArea = stateRef.current.particleArea;
      if (
        !particleArea ||
        typeof particleArea.sx !== 'number' ||
        typeof particleArea.sw !== 'number' ||
        typeof particleArea.ex !== 'number' ||
        typeof particleArea.ew !== 'number' ||
        typeof particleArea.h !== 'number'
      ) {
        // Return a default particle if area is not defined to prevent errors
        // This case should ideally be handled by ensuring setParticles runs first
        return {
          x: 0,
          sx: 0,
          dx: 0,
          y: 0,
          vy: 0,
          p: 0,
          r: 1,
          c: `rgba(${particleRGBColor[0]}, ${particleRGBColor[1]}, ${particleRGBColor[2]}, 1)`
        };
      }

      const sx = particleArea.sx + particleArea.sw * Math.random();
      const ex = particleArea.ex + particleArea.ew * Math.random();
      const dx = ex - sx;
      const y = start ? particleArea.h * Math.random() : particleArea.h;
      const r = 0.5 + Math.random() * 4;
      // Make vy slower
      const vy =
        PARTICLE_VY_MIN + Math.random() * (PARTICLE_VY_MAX - PARTICLE_VY_MIN);
      return {
        x: sx,
        sx,
        dx,
        y,
        vy,
        p: 0,
        r,
        c: `rgba(${particleRGBColor[0]}, ${particleRGBColor[1]}, ${particleRGBColor[2]}, ${Math.random()})`
      };
    },
    [particleRGBColor]
  );

  const setParticles = React.useCallback(() => {
    const { width, height } = stateRef.current.rect;
    stateRef.current.particles = [];
    const disc = stateRef.current.clip.disc;
    if (!disc) return;

    stateRef.current.particleArea = {
      sw: disc.w * 0.5,
      ew: disc.w * 2,
      h: height * 0.85
    };
    stateRef.current.particleArea.sx =
      (width - (stateRef.current.particleArea.sw ?? 0)) / 2;
    stateRef.current.particleArea.ex =
      (width - (stateRef.current.particleArea.ew ?? 0)) / 2;
    const totalParticles = 100;
    for (let i = 0; i < totalParticles; i++) {
      stateRef.current.particles.push(initParticle(true));
    }
  }, [initParticle]);

  const drawDiscs = React.useCallback(
    (ctx: CanvasRenderingContext2D) => {
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2;
      const outerDisc = stateRef.current.startDisc;
      if (
        !outerDisc ||
        typeof outerDisc.x !== 'number' ||
        typeof outerDisc.y !== 'number' ||
        typeof outerDisc.w !== 'number' ||
        typeof outerDisc.h !== 'number'
      )
        return;

      ctx.beginPath();
      ctx.ellipse(
        outerDisc.x,
        outerDisc.y,
        outerDisc.w,
        outerDisc.h,
        0,
        0,
        Math.PI * 2
      );
      ctx.stroke();
      ctx.closePath();

      const clipDisc = stateRef.current.clip.disc;
      if (!clipDisc) return;

      for (let i = 0; i < stateRef.current.discs.length; i++) {
        const disc = stateRef.current.discs[i];
        if (i % 5 !== 0) continue;
        if (disc.w < clipDisc.w - 5 && stateRef.current.clip.path) {
          ctx.save();
          ctx.clip(stateRef.current.clip.path);
        }
        ctx.beginPath();
        ctx.ellipse(disc.x, disc.y, disc.w, disc.h, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.closePath();
        if (disc.w < clipDisc.w - 5 && stateRef.current.clip.path) {
          ctx.restore();
        }
      }
    },
    [strokeColor]
  );

  const drawLines = React.useCallback((ctx: CanvasRenderingContext2D) => {
    if (stateRef.current.linesCanvas) {
      ctx.drawImage(stateRef.current.linesCanvas, 0, 0);
    }
  }, []);

  const drawParticles = React.useCallback((ctx: CanvasRenderingContext2D) => {
    if (!stateRef.current.clip.path) return;
    ctx.save();
    ctx.clip(stateRef.current.clip.path);
    for (const particle of stateRef.current.particles) {
      ctx.fillStyle = particle.c;
      ctx.beginPath();
      ctx.rect(particle.x, particle.y, particle.r, particle.r);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }, []);

  // Move discs in the other direction (reverse animation)
  const moveDiscs = React.useCallback(() => {
    for (const disc of stateRef.current.discs) {
      disc.p = (disc.p - DISC_SPEED + 1) % 1;
      tweenDisc(disc);
    }
  }, [tweenDisc]);

  // Move particles in the other direction (upwards to downwards)
  const moveParticles = React.useCallback(() => {
    const particleAreaH = stateRef.current.particleArea?.h;
    if (typeof particleAreaH !== 'number') return;

    for (let idx = 0; idx < stateRef.current.particles.length; idx++) {
      const particle = stateRef.current.particles[idx];
      particle.p = 1 - particle.y / particleAreaH;
      particle.x = particle.sx + particle.dx * particle.p;
      // Instead of moving up, move down
      particle.y += particle.vy;
      if (particle.y > particleAreaH) {
        stateRef.current.particles[idx] = initParticle(true);
        stateRef.current.particles[idx].y = 0;
      }
    }
  }, [initParticle]);

  const tick = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(stateRef.current.render.dpi, stateRef.current.render.dpi);
    moveDiscs();
    moveParticles();
    drawDiscs(ctx);
    drawLines(ctx);
    drawParticles(ctx);
    ctx.restore();
    animationFrameIdRef.current = requestAnimationFrame(tick);
  }, [moveDiscs, moveParticles, drawDiscs, drawLines, drawParticles]);

  const init = React.useCallback(() => {
    setSize();
    setDiscs();
    setLines();
    setParticles();
  }, [setSize, setDiscs, setLines, setParticles]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    init();
    tick();
    const handleResize = () => {
      setSize();
      setDiscs();
      setLines();
      setParticles();
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, [init, tick, setSize, setDiscs, setLines, setParticles]);

  return (
    <div
      data-slot="hole-background"
      className={cn(
        'relative size-full overflow-hidden',
        '',
        // Removed after:mix-blend-overlay for hero, and after background is more subtle
        '',
        className
      )}
      {...props}
    >
      {children}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block size-full dark:opacity-30 opacity-20"
      />
      <motion.div
        className={cn(
          'absolute top-[-71.5%] left-1/2 z-[3] w-[30%] h-[140%] rounded-b-full blur-3xl opacity-60 dark:opacity-40 [transform:translate3d(-50%,0,0)] [background-position:0%_0%] [background-size:100%_200%]',
          //   'dark:[background:linear-gradient(20deg,#E0F7FA,#FFFFFF20_16.5%,#B3E5FC_33%,#B3E5FC20_49.5%,#E0F7FA_66%,#E0F7FA60_85.5%,#FFFFFF_100%)_0_0%_/_100%_200%]',
          ''
        )}
        // Animate backgroundPosition in the other direction (down to up)
        animate={{ backgroundPosition: '0% -200%' }}
        transition={{
          duration: MOTION_BG_DURATION,
          ease: 'linear',
          repeat: Number.POSITIVE_INFINITY
        }}
      />
      <div className="absolute top-0 left-0 z-[7] size-full dark:[background:repeating-linear-gradient(transparent,transparent_1px,rgba(224,247,250,0.1)_1px,rgba(224,247,250,0.1)_2px)] opacity-80 dark:opacity-50" />
      {/* Subtle lines for tech feel */}
    </div>
  );
}

export { HoleBackground, type HoleBackgroundProps };
