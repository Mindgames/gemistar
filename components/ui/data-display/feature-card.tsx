import type React from 'react';
import { cn } from '@/lib/utils';

/**
 * Props interface for the FeatureCard component.
 *
 * @interface FeatureCardProps
 * @property {React.ReactNode} icon - Icon element to display at the top of the card
 * @property {string} title - Title text for the feature
 * @property {string} description - Description text explaining the feature
 * @property {string} [className] - Additional CSS classes for styling
 * @property {React.ReactNode} [children] - Optional additional content to render below description
 */
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

/**
 * Feature card component for displaying product features with visual appeal.
 *
 * This component renders a styled card with an icon, title, and description
 * to showcase product features in an attractive, consistent format. It includes
 * a shine border effect and supports both light and dark modes.
 *
 * Features:
 * - Consistent styling with rounded corners and borders
 * - Icon support for visual hierarchy
 * - Dark mode compatibility
 * - Shine border animation effect
 * - Responsive design with minimum height
 * - Optional additional content below description
 *
 * @component
 * @param {FeatureCardProps} props - The component props
 * @returns {JSX.Element} The rendered feature card component
 *
 * @example
 * ```typescript
 * import { FeatureCard } from '@/components/ui/feature-card';
 * import { Zap, Shield, Rocket } from 'lucide-react';
 *
 * function FeaturesSection() {
 *   return (
 *     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 *       <FeatureCard
 *         icon={<Zap className="w-6 h-6" />}
 *         title="Lightning Fast"
 *         description="Experience blazing fast performance with our optimized infrastructure."
 *       />
 *
 *       <FeatureCard
 *         icon={<Shield className="w-6 h-6" />}
 *         title="Enterprise Security"
 *         description="Bank-level security with end-to-end encryption and compliance standards."
 *       >
 *         <p className="text-sm text-gray-500 mt-4">
 *           SOC 2 Type II compliant
 *         </p>
 *       </FeatureCard>
 *
 *       <FeatureCard
 *         icon={<Rocket className="w-6 h-6" />}
 *         title="Scale Effortlessly"
 *         description="Handle millions of requests with our auto-scaling architecture."
 *         className="bg-gradient-to-br from-purple-50 to-pink-50"
 *       />
 *     </div>
 *   );
 * }
 * ```
 *
 * @see {@link https://ui.shadcn.com/components/card} - Card component inspiration
 * @see {@link https://github.com/magicuidesign/magicui} - Magic UI components
 */

export function FeatureCard({
  icon,
  title,
  description,
  className
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        'bg-card rounded-3xl p-8 flex flex-col gap-6',
        'border-2 border-border',
        'min-h-[320px]',
        className
      )}
    >
      <div className="w-10 h-10">{icon}</div>
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-card-foreground">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
