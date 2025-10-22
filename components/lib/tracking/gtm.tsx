'use client';

import { useEffect, useRef } from 'react';

import { sendGTMEvent } from '@next/third-parties/google';

/**
 * Props for the SendEvent component.
 */
interface SendEventProps {
  /** The name of the event to send. */
  event: string;
  /** The monetary value of the event. */
  value: string;
  /** The currency of the event value. Defaults to 'USD'. */
  currency?: string;
  /** The user's email address. */
  email?: string;
  /** The unique identifier for the transaction. */
  transaction_id?: string;
  /** An array of items associated with the event. */
  items?: Array<{
    item_id: string;
    item_name: string;
    price: number;
    quantity: number;
  }>;
  /** TikTok external ID for tracking. */
  tt_external_id?: string;
  /** TikTok content type for tracking. */
  tt_content_type?: string;
}

/**
 * A client component that sends tracking events to Facebook Pixel (fbq) and Google Tag Manager (GTM).
 *
 * This component is designed to be rendered on a page where a tracking event needs to be fired,
 * such as a purchase success page. It uses a `setInterval` to poll for the necessary props,
 * ensuring the event is fired only when all required data is available. This approach can be
 * useful when tracking scripts or data are loaded asynchronously.
 *
 * The event is fired only once and the interval is cleared upon success or component unmount.
 *
 * @param {SendEventProps} props - The props containing the event data.
 * @returns {null} This component does not render anything to the DOM.
 */
const SendEvent = (props: SendEventProps) => {
  const hasFired = useRef(false); // Ref to track if the event has been fired

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Check if all necessary values are present and if the event has not been fired yet
      if (
        !hasFired.current &&
        props.event &&
        props.value &&
        props.transaction_id
      ) {
        if (
          typeof window !== 'undefined' &&
          typeof window.fbq !== 'undefined'
        ) {
          window.fbq('track', 'Purchase', {
            value: parseFloat(props.value),
            currency: props.currency || 'USD'
          });

          sendGTMEvent({
            event: props.event,
            ecommerce: {
              transaction_id: props.transaction_id,
              value: parseFloat(props.value),
              currency: props.currency || 'USD',
              items: props.items || []
            },
            email: props.email || '',
            tt_external_id: props.tt_external_id || '',
            tt_content_type: props.tt_content_type || ''
          });

          hasFired.current = true; // Mark the event as fired
          clearInterval(intervalId); // Stop the interval once the event is fired
        }
      }
    }, 1000); // Check every second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [props]); // Dependency array to re-run effect if props change

  return null;
};

export { SendEvent };
