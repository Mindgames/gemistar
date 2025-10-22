import React from 'react';

/**
 * Props for the Video component.
 */
interface VideoProps {
  /** The source URL of the YouTube or Vimeo video. */
  src: string;
  /** The maximum width of the video container. Defaults to '100%'. */
  width?: string;
  /** Whether the video should autoplay. Defaults to false. */
  autoplay?: boolean;
}

/**
 * A component for embedding YouTube or Vimeo videos within MDX content.
 *
 * It takes a video URL and renders it in a responsive iframe, handling
 * the necessary URL transformations for embedding and autoplay.
 *
 * @param {VideoProps} props - The component props.
 * @returns {JSX.Element} The rendered video embed or an error message if the platform is unsupported.
 */
const Video: React.FC<VideoProps> = ({
  src,
  width = '100%',
  autoplay = false
}) => {
  const isYouTube = src.includes('youtube.com') || src.includes('youtu.be');
  const isVimeo = src.includes('vimeo.com');

  if (!isYouTube && !isVimeo) {
    return <p>Unsupported video platform</p>;
  }

  const autoplayParam = autoplay ? '1' : '0';
  const videoSrc = isYouTube
    ? `${src}${src.includes('?') ? '&' : '?'}autoplay=${autoplayParam}`
    : `${src}${src.includes('?') ? '&' : '?'}autoplay=${autoplayParam}`;

  return (
    <div
      className="border border-[#a6a8aa] rounded-lg shadow-md overflow-hidden"
      style={{ maxWidth: width }}
    >
      <iframe
        width="100%"
        height="315"
        src={videoSrc}
        title="Video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Video;
