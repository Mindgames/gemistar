'use client';

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';

import { CookieConsent } from './cookie-consent';

interface CookieConsentContextType {
  hasConsent: boolean;
  hasAnalyticsConsent: boolean;
  hasAdvertisingConsent: boolean;
}

const CookieConsentContext = createContext<CookieConsentContextType>({
  hasConsent: false,
  hasAnalyticsConsent: false,
  hasAdvertisingConsent: false
});

/**
 * Hook to access cookie consent state
 */
export const useCookieConsent = () => useContext(CookieConsentContext);

interface CookieConsentProviderProps {
  children: ReactNode;
}

/**
 * Provider component for managing cookie consent state
 */
export function CookieConsentProvider({
  children
}: CookieConsentProviderProps) {
  const [consentState, setConsentState] = useState({
    hasConsent: false,
    hasAnalyticsConsent: false,
    hasAdvertisingConsent: false
  });

  useEffect(() => {
    // Check existing cookie consent on mount
    const cookieConsent = document.cookie
      .split('; ')
      .find((row) => row.startsWith('cookie-consent='));

    if (cookieConsent) {
      const [_, value] = cookieConsent.split('=');
      const parsedConsent = JSON.parse(decodeURIComponent(value));
      setConsentState(parsedConsent);
    }
  }, []);

  const handleAcceptAll = () => {
    const consent = {
      hasConsent: true,
      hasAnalyticsConsent: true,
      hasAdvertisingConsent: true
    };

    // Set cookie that expires in 1 year
    document.cookie = `cookie-consent=${encodeURIComponent(JSON.stringify(consent))}; max-age=${60 * 60 * 24 * 365}; path=/`;
    setConsentState(consent);
  };

  const handleAcceptNecessary = () => {
    const consent = {
      hasConsent: true,
      hasAnalyticsConsent: false,
      hasAdvertisingConsent: false
    };

    document.cookie = `cookie-consent=${encodeURIComponent(JSON.stringify(consent))}; max-age=${60 * 60 * 24 * 365}; path=/`;
    setConsentState(consent);
  };

  return (
    <CookieConsentContext.Provider value={consentState}>
      {children}
      <CookieConsent
        onAcceptAll={handleAcceptAll}
        onAcceptNecessary={handleAcceptNecessary}
      />
    </CookieConsentContext.Provider>
  );
}
