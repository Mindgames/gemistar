import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

/**
 * Props for the CookieConsent component
 */
interface CookieConsentProps {
  onAcceptAll: () => void;
  onAcceptNecessary: () => void;
  onManagePreferences?: () => void;
}

/**
 * A GDPR-compliant cookie consent banner component
 */
export function CookieConsent({
  onAcceptAll,
  onAcceptNecessary,
  onManagePreferences
}: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const hasConsent = document.cookie.includes('cookie-consent=');
    if (!hasConsent) {
      setIsVisible(true);

      // Add scroll event listener to automatically accept cookies
      const handleScroll = () => {
        const scrollThreshold = 100; // Pixels scrolled before accepting
        if (window.scrollY > scrollThreshold) {
          onAcceptAll();
          setIsVisible(false);
          window.removeEventListener('scroll', handleScroll);
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
    return undefined;
  }, [onAcceptAll]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 z-50 px-4 pb-4 sm:px-6 lg:px-8">
      <div className="animate-slide-up rounded-lg bg-card p-4 shadow-lg ring-1 ring-border max-w-xl">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <h2
              className="text-base font-semibold leading-6 text-card-foreground"
              id="cookie-banner-title"
            >
              We value your privacy
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We use cookies to enhance your browsing experience, serve
              personalized ads or content, and analyze our traffic. By clicking
              &quot;Accept All&quot; or continuing to scroll, you consent to our
              use of cookies.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                onClick={() => {
                  onAcceptAll();
                  setIsVisible(false);
                }}
                variant={'default'}
                className=""
              >
                Accept All
              </Button>
              {onManagePreferences && (
                <button
                  onClick={onManagePreferences}
                  className="rounded-md bg-background px-3 py-2 text-sm font-semibold text-foreground shadow-sm ring-1 ring-inset ring-border hover:bg-accent hover:text-accent-foreground"
                >
                  Manage Preferences
                </button>
              )}
              <button
                onClick={() => {
                  onAcceptNecessary();
                  setIsVisible(false);
                }}
                className="rounded-md bg-background px-3 py-2 text-sm font-semibold text-foreground shadow-sm ring-1 ring-inset ring-border hover:bg-accent hover:text-accent-foreground"
              >
                Reject Non-Essential
              </button>
            </div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="flex h-6 w-6 flex-none items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <span className="sr-only">Dismiss</span>
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
