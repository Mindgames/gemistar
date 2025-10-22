import 'styles/main.css';

import type { Metadata, Viewport } from 'next';

import { Inter as FontSans } from 'next/font/google';
import { GoogleTagManager } from '@next/third-parties/google';
import type { PropsWithChildren } from 'react';
import { Suspense } from 'react';

import { CookieConsentProvider } from '@/components/providers/cookie-consent-provider';
import { Footer } from '@/components/design-systems/radiant/footer';
import { Navbar } from '@/components/design-systems/radiant/navbar';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/feedback/toasts/toaster';
import { cn } from '@/utils/cn';
import { getURL } from '@/utils/helpers';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0B0B0F' }
  ]
};

export const metadata: Metadata = {
  // Dynamic base (you already provide getURL())
  metadataBase: new URL(getURL()),
  applicationName: 'Gamistar',

  // Strong default + template for nested routes
  title: {
    default: 'Gamistar: AI Agent for your chats — win every conversation',
    template: '%s | Gamistar'
  },

  // ~159 chars for SERP (concise, benefit-led, no jargon)
  description:
    'Gamistar is an AI Agent that sits on top of your chats—drafts in your voice, remembers context, and schedules follow‑ups. Local‑first by default; no integrations.',

  // Helpful but not spammy
  keywords: [
    'Gamistar',
    'AI Agent',
    'DMs',
    'chat assistant',
    'reply in your voice',
    'follow-ups',
    'context-aware',
    'Chrome extension',
    'local-first',
    'productivity'
  ],

  // Basic authorship
  authors: [{ name: 'Gamistar' }],
  creator: 'Gamistar',
  publisher: 'Gamistar',

  // Safer referrer policy for analytics + privacy
  referrer: 'origin-when-cross-origin',

  // Icons (keep array style you used; added sizes/types)
  icons: [
    { rel: 'icon', url: '/favicon-gamistar.ico' },
    {
      rel: 'icon',
      url: '/favicon-32x32.png',
      type: 'image/png',
      sizes: '32x32'
    },
    {
      rel: 'icon',
      url: '/favicon-16x16.png',
      type: 'image/png',
      sizes: '16x16'
    },
    { rel: 'apple-touch-icon', url: '/apple-touch-icon.png', sizes: '180x180' }
  ],

  // PWA manifest (only if you have it)
  manifest: '/site.webmanifest',

  // Prevent iOS from auto-linking random numbers, etc.
  formatDetection: { email: false, address: false, telephone: false },

  // Explicit robots incl. Googlebot rich preview allowances
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },

  // Open Graph for rich shares
  openGraph: {
    type: 'website',
    url: 'https://gemistar.com',
    siteName: 'Gamistar',
    locale: 'en_US',
    title: 'Gamistar: AI Agent for your chats — win every conversation',
    description:
      'Gamistar is an AI Agent that sits on top of your chats—drafts in your voice, remembers context, and schedules follow‑ups. Local‑first by default; no integrations.',
    images: [
      {
        url: '/og_gamistar.png',
        width: 1200,
        height: 630,
        alt: 'Gamistar—AI Agent overlay that drafts in your voice and schedules follow‑ups'
      }
    ]
  },

  // Twitter Card (X)
  twitter: {
    card: 'summary_large_image',
    title: 'Gamistar: AI Agent for your chats — win every conversation',
    description:
      'Gamistar is an AI Agent that sits on top of your chats—drafts in your voice, remembers context, and schedules follow‑ups. Local‑first by default; no integrations.',
    images: ['/og_gamistar.png']
    // site: '@your_handle',      // add when ready
    // creator: '@your_handle'    // add when ready
  },

  // Nice-to-have for iOS PWA installs
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Gamistar'
  }
};
export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className="dark">
      <head>
        <GoogleTagManager gtmId="GTM-PBSS8DB6" />
      </head>
      <body
        className={cn(
          'min-h-screen bg-[#020009] font-sans antialiased text-white',
          fontSans.variable
        )}
      >
        <ThemeProvider>
          <CookieConsentProvider>
            <Navbar />
            <main
              id="skip"
              className="w-full overflow-x-hidden border-t-0"
            >
              {children}
            </main>
            <Footer />
            <Suspense>
              <Toaster />
            </Suspense>
          </CookieConsentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
