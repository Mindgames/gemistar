type Price = {
  id?: string;
  product_id?: string;
  unit_amount?: number;
  currency?: string;
  [key: string]: unknown;
};

/**
 * Constructs the full URL for the application.
 *
 * This utility function builds the complete URL by checking environment variables
 * for the site URL, with fallback logic for different deployment environments.
 * It handles Vercel deployments, custom site URLs, and local development.
 *
 * @param {string} [path=''] - The path to append to the base URL
 * @returns {string} The complete URL with the path appended
 *
 * @example
 * ```typescript
 * // Get base URL
 * const baseUrl = getURL(); // 'https://example.com' or 'http://localhost:3000'
 *
 * // Get URL with path
 * const dashboardUrl = getURL('/dashboard'); // 'https://example.com/dashboard'
 *
 * // Get URL with nested path
 * const settingsUrl = getURL('/account/settings'); // 'https://example.com/account/settings'
 * ```
 */
export const getURL = (path: string = '') => {
  // Check if NEXT_PUBLIC_SITE_URL is set and non-empty. Set this to your site URL in production env.
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL &&
    process.env.NEXT_PUBLIC_SITE_URL.trim() !== ''
      ? process.env.NEXT_PUBLIC_SITE_URL
      : // If not set, check for NEXT_PUBLIC_VERCEL_URL, which is automatically set by Vercel.
        process?.env?.NEXT_PUBLIC_VERCEL_URL &&
          process.env.NEXT_PUBLIC_VERCEL_URL.trim() !== ''
        ? process.env.NEXT_PUBLIC_VERCEL_URL
        : // If neither is set, default to localhost for local development.
          'http://localhost:3000/';

  // Trim the URL and remove trailing slash if exists.
  url = url.replace(/\/+$/, '');
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`;
  // Ensure path starts without a slash to avoid double slashes in the final URL.
  path = path.replace(/^\/+/, '');

  // Concatenate the URL and the path.
  return path ? `${url}/${path}` : url;
};

/**
 * Sends a POST request to the specified URL with JSON data.
 *
 * This utility function handles HTTP POST requests with proper headers
 * and error handling. It's primarily used for payment-related operations
 * and other API calls that require sending data to external services.
 *
 * @param {Object} params - The request parameters
 * @param {string} params.url - The URL to send the POST request to
 * @param {Object} [params.data] - Optional data payload to send
 * @param {Price} [params.data.price] - Price object for payment operations
 * @returns {Promise<any>} The JSON response from the server
 *
 * @example
 * ```typescript
 * // Send price data for payment processing
 * const response = await postData({
 *   url: 'https://api.stripe.com/v1/prices',
 *   data: { price: priceObject }
 * });
 *
 * // Send without data
 * const response = await postData({
 *   url: 'https://api.example.com/webhook'
 * });
 * ```
 */
export const postData = async ({
  url,
  data
}: {
  url: string;
  data?: { price: Price };
}): Promise<any> => {
  const res = await fetch(url, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin',
    body: JSON.stringify(data)
  });

  return res.json();
};

/**
 * Converts Unix timestamp seconds to a Date object.
 *
 * This utility function creates a Date object from Unix timestamp seconds
 * (seconds since January 1, 1970 UTC). It's commonly used for converting
 * timestamps from APIs and databases to JavaScript Date objects.
 *
 * @param {number} secs - Unix timestamp in seconds
 * @returns {Date} The corresponding Date object
 *
 * @example
 * ```typescript
 * // Convert current timestamp
 * const now = Math.floor(Date.now() / 1000);
 * const date = toDateTime(now);
 *
 * // Convert specific timestamp
 * const specificDate = toDateTime(1640995200); // 2022-01-01 00:00:00 UTC
 * ```
 */
export const toDateTime = (secs: number): Date => {
  var t = new Date(+0); // Unix epoch start.
  t.setSeconds(secs);
  return t;
};

/**
 * Calculates the Unix timestamp for the end of a trial period.
 *
 * This utility function determines the end date of a subscription trial period
 * based on the number of trial days. It handles edge cases where trial days
 * might be null, undefined, or less than 2 days.
 *
 * @param {number | null | undefined} trialPeriodDays - Number of days in the trial period
 * @returns {number | undefined} Unix timestamp in seconds for trial end, or undefined if invalid
 *
 * @example
 * ```typescript
 * // 7-day trial ending 8 days from now
 * const trialEnd = calculateTrialEndUnixTimestamp(7);
 *
 * // No trial period
 * const noTrial = calculateTrialEndUnixTimestamp(1); // Returns undefined
 *
 * // Invalid trial period
 * const invalidTrial = calculateTrialEndUnixTimestamp(null); // Returns undefined
 * ```
 */
export const calculateTrialEndUnixTimestamp = (
  trialPeriodDays: number | null | undefined
) => {
  // Check if trialPeriodDays is null, undefined, or less than 2 days
  if (
    trialPeriodDays === null ||
    trialPeriodDays === undefined ||
    trialPeriodDays < 2
  ) {
    return undefined;
  }

  const currentDate = new Date(); // Current date and time
  const trialEnd = new Date(
    currentDate.getTime() + (trialPeriodDays + 1) * 24 * 60 * 60 * 1000
  ); // Add trial days
  return Math.floor(trialEnd.getTime() / 1000); // Convert to Unix timestamp in seconds
};

/**
 * Mapping of toast types to their corresponding query parameter keys.
 *
 * Used internally by toast redirect functions to map toast types to the
 * appropriate URL parameter names for status and error messages.
 *
 * @internal
 */
const toastKeyMap: { [key: string]: string[] } = {
  status: ['status', 'status_description'],
  error: ['error', 'error_description']
};

/**
 * Constructs a redirect URL with toast notification parameters.
 *
 * This utility function builds a URL path with toast-related query parameters
 * for displaying success or error messages after redirects. It handles parameter
 * sanitization, encoding, and proper URL construction.
 *
 * @param {string} path - The base path to redirect to
 * @param {string} toastType - Type of toast ('status' or 'error')
 * @param {string} toastName - The toast message title
 * @param {string} [toastDescription=''] - Optional toast message description
 * @param {boolean} [disableButton=false] - Whether to disable action buttons
 * @param {string} [arbitraryParams=''] - Additional query parameters to append
 * @returns {string} The complete redirect URL with toast parameters
 *
 * @example
 * ```typescript
 * // Success redirect with status message
 * const successUrl = getToastRedirect(
 *   '/dashboard',
 *   'status',
 *   'Payment Successful',
 *   'Your subscription has been activated'
 * );
 *
 * // Error redirect with error message
 * const errorUrl = getToastRedirect(
 *   '/pricing',
 *   'error',
 *   'Payment Failed',
 *   'Please try again or contact support',
 *   true,
 *   'ref=checkout'
 * );
 * ```
 */
const getToastRedirect = (
  path: string,
  toastType: string,
  toastName: string,
  toastDescription: string = '',
  disableButton: boolean = false,
  arbitraryParams: string = ''
): string => {
  const [nameKey, descriptionKey] = toastKeyMap[toastType];

  // Sanitize path by removing any existing toast-related query params
  const url = new URL(path, 'http://localhost'); // Base URL is required for parsing but not used
  toastKeyMap[toastType].forEach((key) => url.searchParams.delete(key));
  url.searchParams.delete('disable_button');

  // Reconstruct the path with existing non-toast params
  let redirectPath = url.pathname + url.search;

  // Add the toast-related params
  const separator = redirectPath.includes('?') ? '&' : '?';
  redirectPath += `${separator}${nameKey}=${encodeURIComponent(toastName)}`;

  if (toastDescription) {
    redirectPath += `&${descriptionKey}=${encodeURIComponent(toastDescription)}`;
  }

  if (disableButton) {
    redirectPath += `&disable_button=true`;
  }

  if (arbitraryParams) {
    redirectPath += `&${arbitraryParams}`;
  }

  return redirectPath;
};

/**
 * Constructs a redirect URL with success status toast parameters.
 *
 * Convenience wrapper around `getToastRedirect` for success/status messages.
 * This function automatically sets the toast type to 'status' for positive
 * user feedback after successful operations.
 *
 * @param {string} path - The base path to redirect to
 * @param {string} statusName - The success message title
 * @param {string} [statusDescription=''] - Optional success message description
 * @param {boolean} [disableButton=false] - Whether to disable action buttons
 * @param {string} [arbitraryParams=''] - Additional query parameters to append
 * @returns {string} The complete redirect URL with status toast parameters
 *
 * @example
 * ```typescript
 * // Success redirect after form submission
 * const redirectUrl = getStatusRedirect(
 *   '/dashboard',
 *   'Profile Updated',
 *   'Your profile has been successfully updated'
 * );
 *
 * // Success redirect with additional parameters
 * const redirectUrl = getStatusRedirect(
 *   '/settings',
 *   'Settings Saved',
 *   'Your preferences have been saved successfully',
 *   false,
 *   'section=notifications'
 * );
 * ```
 */
export const getStatusRedirect = (
  path: string,
  statusName: string,
  statusDescription: string = '',
  disableButton: boolean = false,
  arbitraryParams: string = ''
) =>
  getToastRedirect(
    path,
    'status',
    statusName,
    statusDescription,
    disableButton,
    arbitraryParams
  );

/**
 * Constructs a redirect URL with error toast parameters.
 *
 * Convenience wrapper around `getToastRedirect` for error messages.
 * This function automatically sets the toast type to 'error' for negative
 * user feedback when operations fail.
 *
 * @param {string} path - The base path to redirect to
 * @param {string} errorName - The error message title
 * @param {string} [errorDescription=''] - Optional error message description
 * @param {boolean} [disableButton=false] - Whether to disable action buttons
 * @param {string} [arbitraryParams=''] - Additional query parameters to append
 * @returns {string} The complete redirect URL with error toast parameters
 *
 * @example
 * ```typescript
 * // Error redirect after failed form submission
 * const redirectUrl = getErrorRedirect(
 *   '/signup',
 *   'Signup Failed',
 *   'Please check your information and try again'
 * );
 *
 * // Error redirect with retry option disabled
 * const redirectUrl = getErrorRedirect(
 *   '/login',
 *   'Login Failed',
 *   'Invalid credentials. Please try again.',
 *   true,
 *   'attempts=3'
 * );
 * ```
 */
export const getErrorRedirect = (
  path: string,
  errorName: string,
  errorDescription: string = '',
  disableButton: boolean = false,
  arbitraryParams: string = ''
) =>
  getToastRedirect(
    path,
    'error',
    errorName,
    errorDescription,
    disableButton,
    arbitraryParams
  );
