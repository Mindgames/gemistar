/**
 * Sends a page view event to Google Tag Manager (GTM).
 *
 * This function pushes a custom event to the Google Tag Manager dataLayer
 * for tracking page views and user interactions. It includes the current
 * URL and any additional properties passed in the props parameter.
 *
 * @param {Object} props - Additional properties to include in the event
 * @param {string} [props.*] - Any custom properties for the event
 * @returns {number|undefined} The length of the dataLayer array after push, or undefined if dataLayer is not available
 *
 * @example
 * ```typescript
 * // Basic page view tracking
 * gtmPageView({
 *   pageType: 'product',
 *   category: 'electronics'
 * });
 *
 * // Track with custom properties
 * gtmPageView({
 *   event: 'pageView',
 *   pageName: 'Product Detail',
 *   productId: '12345'
 * });
 * ```
 *
 * @see {@link https://developers.google.com/tag-platform/tag-manager/datalayer} - Google Tag Manager dataLayer Guide
 */
export const gtmPageView = (props: {
  [key: string]: any;
}): number | undefined => {
  return window.dataLayer?.push({
    event: 'cats',
    url: window.location.href,
    ...props
  });
};

/**
 * Tracks a purchase event for Facebook Pixel.
 *
 * This function sends a Purchase event to Facebook Pixel for conversion tracking.
 * It includes both a default tracking call and a custom call with the provided
 * currency and value. This is used for tracking e-commerce conversions and
 * measuring advertising effectiveness.
 *
 * @param {string} currency - The currency code (e.g., 'USD', 'EUR', 'GBP')
 * @param {number} value - The purchase value/amount
 * @returns {void}
 *
 * @example
 * ```typescript
 * // Track a $99.99 purchase in USD
 * fbqTrackPurchase('USD', 99.99);
 *
 * // Track a €50.00 purchase in EUR
 * fbqTrackPurchase('EUR', 50.00);
 * ```
 *
 * @see {@link https://developers.facebook.com/docs/facebook-pixel/implementation/conversion-tracking} - Facebook Pixel Conversion Tracking
 */
export const fbqTrackPurchase = (currency: string, value: number): void => {
  if (window.fbq) {
    window.fbq('track', 'Purchase', { value: 0.0, currency: 'USD' });
    window.fbq('track', 'Purchase', { currency, value });
  }
};
