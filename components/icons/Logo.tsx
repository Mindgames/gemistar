/**
 * @file Logo icon component.
 * @author Your Name
 */

/**
 * Renders the Logo icon.
 * @param {React.SVGProps<SVGSVGElement>} props - The SVG props.
 * @returns {JSX.Element} The Logo icon.
 */
const Logo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="187"
    height="40"
    viewBox="0 0 187 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      y="0.0351334"
      width="39.9649"
      height="39.9649"
      rx="2.00405"
      fill="#0169AD"
    />
    <path
      d="M24.7483 21.1152L15.3692 31.6803L15.359 10.5618L24.7483 21.1152Z"
      fill="white"
    />
    <path
      d="M14.738 21.1223L5.35859 31.6878L5.34905 10.5693L14.738 21.1223Z"
      fill="white"
    />
    <path
      d="M34.7591 21.109L25.3807 31.6734L25.3691 10.5549L34.7591 21.109Z"
      fill="white"
    />
  </svg>
);

export default Logo;