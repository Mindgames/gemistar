/**
 * @file GamistarBlack icon component.
 * @author Your Name
 */

'use client';
import React from 'react';

/**
 * Props for the GamistarBlack component.
 */
interface GamistarBlackProps extends React.SVGProps<SVGSVGElement> {
  /** The width of the icon. */
  width?: string | number;
  /** The height of the icon. */
  height?: string | number;
  /** Additional CSS classes for the icon. */
  className?: string;
}

/**
 * Renders the GamistarBlack icon.
 * @param {GamistarBlackProps} props - The component props.
 * @returns {JSX.Element} The GamistarBlack icon.
 */
const GamistarBlack: React.FC<GamistarBlackProps> = ({
  width = '1249',
  height = '1249',
  className,
  ...props
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 1249 1249"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <rect width="1249" height="1249" rx="346.944" fill="black" />
    <rect width="1249" height="1249" rx="346.944" fill="black" />
    <rect width="1249" height="1249" rx="346.944" fill="black" />
    <rect width="1249" height="1249" rx="346.944" fill="black" />
    <rect width="1249" height="1249" rx="346.944" fill="black" />
    <rect width="1249" height="1249" rx="346.944" fill="black" />
    <circle
      cx="384.169"
      cy="767.112"
      r="153.232"
      transform="rotate(-123.778 384.169 767.112)"
      stroke="white"
      strokeWidth="34.0515"
    />
    <circle
      cx="451.139"
      cy="714.125"
      r="238.361"
      transform="rotate(-123.778 451.139 714.125)"
      stroke="white"
      strokeWidth="34.0515"
    />
    <circle
      cx="521.897"
      cy="666.79"
      r="323.49"
      transform="rotate(-123.778 521.897 666.79)"
      stroke="white"
      strokeWidth="34.0515"
    />
    <circle
      cx="596.443"
      cy="625.123"
      r="408.618"
      transform="rotate(-123.778 596.443 625.123)"
      stroke="white"
      strokeWidth="34.0515"
    />
  </svg>
);

export default GamistarBlack;