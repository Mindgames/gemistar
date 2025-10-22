'use client';

import { useEffect } from 'react';
import Intercom from '@intercom/messenger-js-sdk';

/**
 * IntercomWidget component for initializing the Intercom chat widget.
 *
 * This component initializes the Intercom customer support widget using the
 * configured app ID. It renders no visible UI but sets up the chat functionality
 * that users can access through the Intercom interface.
 *
 * The widget is initialized once when the component mounts and provides
 * real-time customer support capabilities.
 *
 * @component
 * @returns {null} This component renders no UI, it only initializes the widget
 *
 * @example
 * ```typescript
 * // In a layout component
 * import IntercomWidget from '@/components/ui/IntercomWidget';
 *
 * function Layout() {
 *   return (
 *     <div>
 *       <IntercomWidget />
 *       // Rest of your layout
 *     </div>
 *   );
 * }
 * ```
 *
 * @see {@link https://developers.intercom.com/installing-intercom/web/installation/} - Intercom Web Installation Guide
 */
export default function IntercomWidget(): null {
  useEffect(() => {
    // TODO: Move app_id to environment variables
    Intercom({ app_id: 'imjixn9g' });
  }, []);

  return null;
}