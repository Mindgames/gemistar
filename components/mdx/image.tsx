import Image from 'next/image';
import React from 'react';

/**
 * Props for the MdxImage component.
 */
interface ImageProps {
  /** The source URL of the image. */
  src: string;
  /** The alternative text for the image, for accessibility. */
  alt: string;
  /** The width of the image as a string (e.g., '300px'). Defaults to '300px'. */
  width?: string;
  /** The height of the image as a string (e.g., '200px'). Defaults to '200px'. */
  height?: string;
  /** Whether to lazy load the image. Defaults to true. */
  lazyLoad?: boolean;
  /** An optional URL to link the image to. Opens in a new tab. */
  href?: string;
  /** Optional additional CSS classes to apply to the image. */
  className?: string;
}

/**
 * A wrapper component for the Next.js `Image` component, tailored for use in MDX files.
 *
 * It provides default dimensions, lazy loading, and an optional link wrapper.
 * This simplifies embedding responsive and optimized images within Markdown content.
 *
 * @param {ImageProps} props - The component props.
 * @returns {JSX.Element} The rendered image component, possibly wrapped in a link.
 */
const MdxImage: React.FC<ImageProps> = ({
  src,
  alt,
  width = '300px',
  height = '200px',
  lazyLoad = true,
  href,
  className
}) => {
  const imageElement = (
    <Image
      src={src}
      alt={alt}
      width={parseInt(width)}
      height={parseInt(height)}
      loading={lazyLoad ? 'lazy' : 'eager'}
      className={className}
    />
  );

  return (
    <div style={{ maxWidth: width }}>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {imageElement}
        </a>
      ) : (
        imageElement
      )}
    </div>
  );
};

export default MdxImage;
