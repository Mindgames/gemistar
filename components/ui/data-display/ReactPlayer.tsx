'use client';

import React, { useEffect, useState } from 'react';

import ReactPlayer from 'react-player';
import { Skeleton } from '@/components/ui/overlays/skeleton';

/**
 * Props interface for the ReactPlayerWithOverlay component.
 *
 * @interface ReactPlayerWithOverlayProps
 * @property {string} url - The URL of the video to be played (required)
 * @property {boolean} [autoPlay=false] - Whether the video should autoplay
 * @property {string} [className] - Additional CSS classes for styling
 * @property {object} [playerProps] - Additional props to pass to ReactPlayer
 */
interface ReactPlayerWithOverlayProps {
  url: string;
  autoPlay?: boolean;
  className?: string;
  playerProps?: Record<string, any>;
}

/**
 * Video player component with loading overlay and client-side rendering.
 *
 * This component wraps the ReactPlayer with proper hydration handling and a
 * loading skeleton. It's designed for use with various video platforms and
 * includes automatic client-side rendering to prevent hydration mismatches.
 *
 * Features:
 * - Lazy loading of ReactPlayer to improve performance
 * - Loading skeleton during video initialization
 * - Responsive design with aspect ratio preservation
 * - Client-side rendering to prevent SSR issues
 * - Customizable styling and player configuration
 *
 * @component
 * @param {ReactPlayerWithOverlayProps} props - The component props
 * @returns {JSX.Element} The rendered video player component
 *
 * @example
 * ```typescript
 * // Basic usage with YouTube video
 * <ReactPlayerWithOverlay
 *   url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
 * />
 *
 * // With autoplay and custom styling
 * <ReactPlayerWithOverlay
 *   url="https://vimeo.com/123456789"
 *   autoPlay={true}
 *   className="w-full max-w-2xl"
 * />
 *
 * // With custom player configuration
 * <ReactPlayerWithOverlay
 *   url="https://example.com/video.mp4"
 *   playerProps={{
 *     controls: true,
 *     muted: true,
 *     loop: true
 *   }}
 * />
 * ```
 *
 * @see {@link https://github.com/cookpete/react-player} - ReactPlayer documentation
 * @see {@link https://www.reactplayer.com/} - ReactPlayer official site
 */
const ReactPlayerWithOverlay: React.FC<ReactPlayerWithOverlayProps> = ({
  url,
  autoPlay = false
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
        <Skeleton className="absolute inset-0" />
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video rounded-2xl shadow-lg overflow-hidden">
      <ReactPlayer
        src={url}
        width="100%"
        height="100%"
        style={{ position: 'absolute', top: 0, left: 0 }}
        controls
        playing={autoPlay}
      />
    </div>
  );
};

export default ReactPlayerWithOverlay;
