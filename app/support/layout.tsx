/**
 * @file Provides the layout for the support pages.
 * @author Your Name
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Support',
    template: '%s | Gamistar'
  },
  description:
    'Find answers to your questions and learn how to get the most out of Gamistar.',
  robots: {
    index: true,
    follow: true
  },
  keywords: ['Gamistar', 'support', 'help center', 'customer support', 'AI assistant']
};

/**
 * Provides the layout for the support pages.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The children to render within the layout.
 * @returns {Promise<JSX.Element>} The rendered layout.
 */
export default function MdxLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <div className="prose prose-invert prose-lg mx-auto py-20">{children}</div>;
}
