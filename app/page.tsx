import { AnimatedHero } from '@/components/features/AnimatedHero';
import { getURL } from '@/utils/helpers';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: getURL('/')
  }
};

/**
 * Minimal landing page hero featuring Gemistar branding.
 */
async function LandingPage() {
  return <AnimatedHero />;
}

export default LandingPage;
