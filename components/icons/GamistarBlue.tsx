'use client';
import React from 'react';

interface GamistarBlueProps extends React.SVGProps<SVGSVGElement> {
  width?: string | number;
  height?: string | number;
  className?: string;
}

const GamistarBlue: React.FC<GamistarBlueProps> = ({
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
    <rect width="1249" height="1249" rx="346.944" fill="url(#paint0_linear)" />
    <rect width="1249" height="1249" rx="346.944" fill="url(#paint1_linear)" />
    <rect width="1249" height="1249" rx="346.944" fill="url(#paint2_linear)" />
    <rect width="1249" height="1249" rx="346.944" fill="url(#paint3_linear)" />
    <rect width="1249" height="1249" rx="346.944" fill="#1C76E0" />
    <rect width="1249" height="1249" rx="346.944" fill="#1C76E0" />
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
    <defs>
      <linearGradient
        id="paint0_linear"
        x1="624.5"
        y1="0"
        x2="624.5"
        y2="1249"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1A73E8" />
        <stop offset="1" stopColor="#41C327" />
      </linearGradient>
      <linearGradient
        id="paint1_linear"
        x1="624.5"
        y1="0"
        x2="624.5"
        y2="1249"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1A73E8" />
        <stop offset="1" stopColor="#41C327" />
      </linearGradient>
      <linearGradient
        id="paint2_linear"
        x1="624.5"
        y1="0"
        x2="624.5"
        y2="1249"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1A73E8" />
        <stop offset="1" stopColor="#41C327" />
      </linearGradient>
      <linearGradient
        id="paint3_linear"
        x1="624.5"
        y1="0"
        x2="624.5"
        y2="1249"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1A73E8" />
        <stop offset="1" stopColor="#41C327" />
      </linearGradient>
    </defs>
  </svg>
);

export default GamistarBlue;