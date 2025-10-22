import { Card, CardContent } from '@/components/ui/data-display/card';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Zap } from 'lucide-react';

/**
 * Props interface for the UpgradeBanner component.
 *
 * @interface UpgradeBannerProps
 * @property {string} [className] - Additional CSS classes for styling
 * @property {string} [title] - Custom title text for the banner
 * @property {string} [buttonText] - Custom text for the upgrade button
 * @property {string} [href] - Custom URL for the upgrade link (defaults to /account/billing)
 * @property {boolean} [showIcon] - Whether to show the Zap icon (defaults to true)
 */
interface UpgradeBannerProps {
  className?: string;
}

/**
 * Upgrade banner component to encourage users to upgrade their plan.
 *
 * This component displays a gradient-styled card with an upgrade call-to-action,
 * featuring an eye-catching design to promote plan upgrades. It includes a Zap
 * icon, compelling copy, and a direct link to the billing page.
 *
 * Features:
 * - Gradient background design for visual appeal
 * - Customizable text and styling
 * - Responsive layout with proper spacing
 * - Lightning bolt icon for emphasis
 * - Direct link to billing page
 *
 * @component
 * @param {UpgradeBannerProps} props - The component props
 * @returns {JSX.Element} The rendered upgrade banner component
 *
 * @example
 * ```typescript
 * // Basic usage
 * <UpgradeBanner />
 *
 * // Custom styling and text
 * <UpgradeBanner
 *   className="my-custom-class"
 *   title="Unlock premium features today!"
 *   buttonText="Upgrade Now"
 *   href="/pricing"
 * />
 *
 * // Minimal version without icon
 * <UpgradeBanner showIcon={false} />
 * ```
 *
 * @see {@link https://lucide.dev/icons/zap} - Zap icon from Lucide React
 * @see {@link https://ui.shadcn.com/components/card} - Card component documentation
 */
export default function UpgradeBanner({ className }: UpgradeBannerProps) {
  return (
    <Card
      className={`bg-gradient-to-r from-blue-900 to-blue-500 text-white ${className}`}
    >
      <CardContent className="flex items-center justify-between p-6">
        <div className="flex items-center gap-2">
          <Zap className="h-6 w-6" />
          <span className="text-lg font-medium">
            Upgrade to Pro to get more credits and grow engagement
          </span>
        </div>
        <Link href="/account/billing">
          <Button
            variant="secondary"
            className="bg-white text-blue-900 hover:bg-gray-100"
          >
            Upgrade Now
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
